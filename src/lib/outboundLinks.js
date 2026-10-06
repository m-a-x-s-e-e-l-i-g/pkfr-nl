const INTERNAL_HOSTS = new Set(['pkfr.nl', 'www.pkfr.nl']);
export const OUTBOUND_UTM = {
    utm_source: 'pkfr.nl',
    utm_medium: 'referral',
    utm_campaign: 'community'
};

/** Tag navigation links only. Original source URLs stay clean in data and schema. */
export function outboundUrl(href, origin = 'https://www.pkfr.nl') {
    if (typeof href !== 'string' || !/^(?:https?:)?\/\//i.test(href)) return href;
    try {
        const url = new URL(href, origin);
        if (
            !['http:', 'https:'].includes(url.protocol) ||
            INTERNAL_HOSTS.has(url.hostname) ||
            url.host === new URL(origin).host ||
            /\.ics$/i.test(url.pathname) ||
            [...url.searchParams.keys()].some((key) =>
                /^(?:signature|sig|x-amz-signature|x-goog-signature)$/i.test(key)
            )
        )
            return href;

        let changed = false;
        for (const [key, value] of Object.entries(OUTBOUND_UTM)) {
            if (!url.searchParams.has(key)) {
                url.searchParams.set(key, value);
                changed = true;
            }
        }
        return changed ? url.href : href;
    } catch {
        return href;
    }
}

/**
 * Svelte action: decorate links after hydration, including translated HTML and
 * calendar descriptions. Observe later navigation/content without click hooks,
 * so copying links and opening them in another tab also use the tagged href.
 */
export function outboundLinks(node) {
    const origin = node.ownerDocument.location.origin;
    const decorate = (link) => {
        if (link.hasAttribute('download')) return;
        const href = link.getAttribute('href');
        const tracked = outboundUrl(href, origin);
        if (tracked !== href) link.setAttribute('href', tracked);
    };
    const decorateTree = (element) => {
        if (element.nodeType !== 1) return;
        if (element.matches('a[href]')) decorate(element);
        element.querySelectorAll('a[href]').forEach(decorate);
    };

    decorateTree(node);
    const observer = new MutationObserver((records) => {
        for (const record of records) {
            if (record.type === 'attributes') {
                if (record.target.matches('a[href]')) decorate(record.target);
            } else {
                record.addedNodes.forEach(decorateTree);
            }
        }
    });
    observer.observe(node, {
        subtree: true,
        childList: true,
        attributes: true,
        attributeFilter: ['href', 'download']
    });
    return { destroy: () => observer.disconnect() };
}

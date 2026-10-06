import sanitizeHtml from 'sanitize-html';

export function normalizeJam(item) {
    const start = item.start?.dateTime || item.start?.date;
    if (item.status === 'cancelled' || !item.id || !start || Number.isNaN(Date.parse(start)))
        return null;
    const rawEnd = item.end?.dateTime || item.end?.date;
    const end =
        rawEnd && !Number.isNaN(Date.parse(rawEnd)) && Date.parse(rawEnd) > Date.parse(start)
            ? rawEnd
            : null;
    const sanitizeOptions = {
        allowedTags: [
            'p',
            'br',
            'strong',
            'b',
            'em',
            'i',
            'u',
            'ul',
            'ol',
            'li',
            'a',
            'blockquote'
        ],
        allowedAttributes: { a: ['href', 'target', 'rel'] },
        allowedSchemes: ['http', 'https', 'mailto'],
        allowProtocolRelative: false,
        transformTags: {
            a: sanitizeHtml.simpleTransform('a', { target: '_blank', rel: 'noopener noreferrer' })
        }
    };
    // Linkify only text from already sanitized HTML, preserving existing links.
    // Doing this in textFilter would split URLs at HTML entities such as &amp;.
    let insideLink = false;
    const description = sanitizeHtml(item.description || '', sanitizeOptions)
        .split(/(<[^>]+>)/g)
        .map((part) => {
            if (part.startsWith('<')) {
                if (/^<a(?:\s|>)/i.test(part)) insideLink = true;
                if (/^<\/a>/i.test(part)) insideLink = false;
                return part;
            }
            return insideLink
                ? part
                : part.replace(/https?:\/\/[^\s<>]+/g, (url) => {
                      const link = url.replace(/[.,;!?)]+$/, '');
                      return `<a href="${link}" target="_blank" rel="noopener noreferrer">${link}</a>${url.slice(link.length)}`;
                  });
        })
        .join('');
    const safeDescription = sanitizeHtml(description, sanitizeOptions);
    const descriptionText = sanitizeHtml(
        safeDescription.replace(/<br\s*\/?\s*>|<\/(?:p|li|blockquote)>/gi, '\n'),
        {
            allowedTags: [],
            allowedAttributes: {}
        }
    )
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&nbsp;/g, ' ')
        .trim();
    return {
        id: item.id,
        title: item.summary?.trim() || 'Jam',
        start,
        end,
        allDay: Boolean(item.start.date),
        location: item.location?.trim() || '',
        description: safeDescription,
        descriptionText,
        excerpt: descriptionText.replace(/\s+/g, ' ').trim(),
        calendarUrl: /^https:\/\//.test(item.htmlLink || '') ? item.htmlLink : null
    };
}

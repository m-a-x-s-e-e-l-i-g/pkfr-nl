[![Netlify Status](https://api.netlify.com/api/v1/badges/dcc3a06f-99aa-4007-a795-5a0df889dced/deploy-status)](https://app.netlify.com/sites/pkfr/deploys)

# pkfr.nl — Parkour & Freerunning Netherlands 🚀🤸‍♀️

>A small, fast, community-driven site for parkour & freerunning in the Netherlands.

Live site

- [pkfr.nl](https://www.pkfr.nl/) 🌐
- [freerun-nederland.nl](https://www.freerun-nederland.nl/) 🌐

## Why this repo 📣

- **Everything in one place!** Central place for curated spots, jams, open-gym schedules and community links.
- **Easy quick access to the Dutch Freerun Community.** Lightning-fast frontend using SvelteKit and Tailwind; optimized for mobile first.
- **Always up to date!** Content is easy to update (Google Calendar for events, static files / JSON for spots and links).

## Highlights & features ✨

- 📍 Spots: curated spot lists and city resources with map links.
- 🗓️ Jams & Events: pulled from Google Calendar and displayed in the UI.
- 🏋️ Open Gyms: schedules synced from Google Calendar.
- 🧭 Tools: Gym Finder, Spot Map Finder and other small utilities.
- 🔗 Community Links: WhatsApp groups, Instagram, playlists and partner sites.
- 📨 User Contributions: Forms connected to Telegram for easy community input.
- 🍿 JUMPFLIX: A collection of documentaries and playlists related to parkour and freerunning.

## Quick start — developer 🔧

Follow these steps in PowerShell (Windows):

```powershell
npx degit https://github.com/m-a-x-s-e-e-l-i-g/pkfr-nl pkfr-nl
cd pkfr-nl
npm install
npm run dev -- --open
```

Notes

- You need Node.js + npm installed. The site uses the commands defined in `package.json`.
- Add credentials to a local `.env` (or `.env.local`) for any Google API keys or calendar IDs used by the app.

## Configuration & content locations 🔎

- Site text / navigation: `src/lib/config.js` — update titles, nav items and copy here.
- Components: `src/lib/components/` — modular Svelte components (Header, Footer, PlacelistFilter, InputCollector, calendar widgets).
- Static assets: `static/` and `build/` contain images and the production output.
- Data: calendars (Jams / Open Gyms) are configured via Google Calendar IDs and an API key (stored in env).

## Managing data (Jams / Open Gyms) 🗂️

- Events (Jams) and Open Gyms are managed in Google Calendar. The site reads calendar events via the configured calendar IDs.
- Home shows the first upcoming jam and the open gym sessions for today and tomorrow, using Dutch calendar-day boundaries. Both are loaded on the server with a five-minute cache; the open gym schedule refreshes when the Dutch date changes.
- `/jams` renders upcoming events on the server in chronological month groups. Each item has a shareable `/jams/{title}--{google-event-id}` detail page; title changes do not break existing links. Detail pages also remain available for past events.
- European and American cards link to `/jams/europe/{title}--{encoded-source-id}` and `/jams/america/{title}--{encoded-source-id}`, using the same detail component. Source IDs are UTF-8 hex encoded so punctuation in iCal UIDs is safe in routes. Titles can change without breaking a link. Details include full sanitized descriptions, maps, the original source and calendar actions.
- Events shown in an agenda or loaded as a detail page are saved to a site-wide Netlify Blobs archive. Saved past events remain available if the source removes them or is unavailable; upcoming events are always sourced from the live feed. Archive storage survives deploys and production/preview contexts are isolated. Events removed before they were ever captured cannot be recovered. Local Vite previews do not write to the cloud archive. Detail responses expose `x-pkfr-event-archive: stored` when preservation succeeded.
- Past details keep their own canonical URL and show a clear finished-event banner linking to the relevant upcoming agenda. Calendar-add actions are hidden for past events.
- `/jams/archive` lists captured past jams, with regional filters and pagination. The agendas link to this archive so past detail pages remain discoverable. It contains events captured by this site; it is not a complete historical import from external calendars.
- `/sitemap.xml` is generated at request time from the main routes, live jam agendas and captured past events. It is cached for five minutes and returns 503 rather than caching an incomplete sitemap during source/storage outages. `robots.txt` advertises the sitemap. Submit this URL in Google Search Console; the retired anonymous sitemap-ping build plugin has been removed.
- Shared SEO metadata supplies one description, a descriptive title, canonical URL and social-preview tags per page. Jam metadata includes the event date, location and past status. Error pages and alternate weekly/filter views are marked `noindex`; unfiltered archive pagination has its own canonical URL. Server-rendered content defaults to Dutch, and the document language follows the visitor's selected language.
- `/open-gyms` renders seven days of sessions on the server with previous/next navigation via `?week=N` (bounded to one year each way). It shares the calendar loader with the home page, retaining Dutch date/DST handling and separate five-minute caches for each date range.
- The jam pages use the existing `VITE_GOOGLE_API_KEY` and `VITE_JAM_CALENDAR_ID`. The server follows all result pages, expands recurring events within the next five years, and caches the overview for five minutes. Times are displayed in Europe/Amsterdam; all-day end dates remain exclusive when adding an event to your calendar.
- To update a jam or open gym, edit the event in the corresponding Google Calendar or open an issue/PR if you need help.

## Search and AI retrieval

- Public HTML includes schema.org WebSite/publisher metadata. Jam overview/archive pages describe their visible events with ItemList markup, and each detail route describes the actual Event (also for past events). No ticket prices, organizers, addresses or event edit dates are inferred. All-day schema end dates are inclusive; calendar-subscription end dates remain exclusive.
- `/api/jams` is a public versioned JSON snapshot of the Dutch agenda with Event fields, canonical detail URLs, all-day flags and `retrievedAt`. `/jams.md` exposes the same source snapshot as Markdown. Both use the same five-minute source cache as `/jams`; retrieval time is preserved on cache hits, and is not an event modification time. CDN copies may also be cached for five minutes. Calendar outages return 503 with `no-store`, not a misleading empty success response. Recurring events are expanded up to five years ahead.
- The HTML head links to the alternate JSON/Markdown representations. `/llms.txt` is a small, stable navigation index for tools that support the llms.txt proposal; it links to the live data rather than embedding a stale list of dates. It is optional discovery material, not an OpenAI requirement or ranking signal guaranteed by OpenAI.
- `robots.txt` explicitly permits `OAI-SearchBot` (ChatGPT Search) and `ChatGPT-User` (user-initiated retrieval), retaining the existing wildcard policy. GPTBot's separate training policy is unchanged. A successful request using these User-Agent strings checks public access, not real crawler IP reachability or search indexing. If site protection is introduced, check OpenAI's published crawler IP ranges as well: https://developers.openai.com/api/docs/bots.
- Search indexing and ChatGPT citation selection are outside this site's control. Keep the source calendar accurate, preserve canonical detail routes, and submit the sitemap to search engines. The visible source section identifies the community curator and contribution process.

## Build & deploy 🚀

- Build the site:

```powershell
npm run build
```

- Preview the production build locally:

```powershell
npm run preview
```

- Netlify is already configured for this project (see `netlify.toml`) — CI runs `npm run build` and publishes the `build/` output.

## Contributing 🤝

- Make contributions via PRs or open issues for content changes or code fixes.
- For content-only changes, edit the relevant JSON/JS under `src/lib/` or add assets to `static/`.
- For Jam, Open Gym, Spot contributions, please use the provided forms on the website.

## License & attribution 📝

- See `LICENSE` in the repository for the project license and attribution details.

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
- To update a jam or open gym, edit the event in the corresponding Google Calendar or open an issue/PR if you need help.

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
[![Netlify Status](https://api.netlify.com/api/v1/badges/dcc3a06f-99aa-4007-a795-5a0df889dced/deploy-status)](https://app.netlify.com/sites/freerunning-informatie/deploys)

## Quick Start
Clone or download [this repo](https://github.com/m-a-x-s-e-e-l-i-g/freerunning-informatie), then install the dependencies and run the dev server:

```
npx degit https://github.com/m-a-x-s-e-e-l-i-g/freerunning-informatie freerunning-informatie
cd freerunning-informatie
npm install
npm run dev -- --open
```

That should get a dev server up and running (assuming you have npm and Node installed already). Any saved changes to components and styles should auto-refresh blazingly fast.

You should add some credentials to the `.env` file. To guarantee everything functioning right.

## Managing Jams

Jams are added, updated or deleted via Google Calendar.
Please open up an issue or send me a message if information needs to be updated.

## Managing Open Gyms

Open Gyms are added, updated or deleted via Google Calendar.
Please open up an issue or send me a message if information needs to be updated.

## Adding new blog posts

Adding new blog posts is as simple as dropping a new `.md` file into `src/lib/posts`. New posts will automatically show up on the site, be added to the posts API, and any category pages.

If you want to use other frontmatter properties in the template (or just modify the layout), make changes in `src/routes/blog/[post]/+page.svelte`.

Also: while there's no link to it by default, `/blog/category` exists as an archive of all your post categories.

## Static files

Things that should just live in the site root of the finished site (like a `robots.txt` file, favicon, or maybe images) should go in the `static` folder. If you link to them, use the root path (e.g., `/images/my.png`, not `../static/images/my.png`).

## Building and deploying

The build command (from package.json) is simply:

```
npm run build
```

Use `npm run preview` _after_ a build to preview the built site.

## Deploy

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/m-a-x-s-e-e-l-i-g/freerunning-informatie)

[![Deploy to Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/m-a-x-s-e-e-l-i-g/freerunning-informatie)

## Currently available on
- https://www.freerunning-informatie.nl/
- https://www.pkfr.nl/
- https://cloudflare-ipfs.com/ipfs/QmTGXjqS16sjvVaxuxf48wCErZ7Q7T4Q2AxkHuSYVPZGxP
- https://freerunning-informatie.on.fleek.co/

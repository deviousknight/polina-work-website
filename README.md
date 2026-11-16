# Polina Pranowicz — React + Tailwind

A responsive recreation of https://polinapranowicz.wfolio.pro/ using React 19, Tailwind CSS 4, and Vite. Photos and fonts are stored in `public/` and served locally.

## Run

```sh
npm install
npm run dev
```

## Production

```sh
npm run build
npm run preview
```

Deploy the `dist/` directory to any static host. The former `/portfolio` URL redirects to `/#consultations`, including a generated static redirect page.

The site is adapted for a psychology practice: about, approach, consultation formats, common questions, and booking. The original portrait photographs and locally hosted fonts are retained. Photography portfolio content, placeholder branding, and generic social links have been removed. The first meeting is a free 15-minute introduction; an individual consultation lasts 50 minutes and costs 140 PLN.

## Cal.com booking

Visitors pick a meeting type above the inline calendar. Only the selected event is loaded:
- Standard consultation (50 minutes): https://cal.com/polina.pranovich/sesja
- Free introduction (15 minutes, requires confirmation): https://cal.com/polina.pranovich/15min

The default event URLs are in `src/booking.js`. Override them with `VITE_CAL_BOOKING_URL` and `VITE_CAL_INTRO_BOOKING_URL`, respectively, in `.env.local` for development or repository variables for GitHub Pages. Restart Vite or rebuild after changing the values.

Each event has a link to open Cal.com separately. If an event URL is invalid, visitors can contact Polina through WhatsApp. Configure duration, availability, and confirmation in Cal.com.

Official embed overview: https://cal.com/embed

## GitHub Pages

Repository: https://github.com/deviousknight/polina-work-website

The workflow in `.github/workflows/deploy.yml` builds and deploys the site after pushes to `main`. In repository **Settings → Pages → Build and deployment**, select **GitHub Actions** as the source.

Default production URL: https://deviousknight.github.io/polina-work-website/

`npm run build` and `npm run preview` use `/polina-work-website/`; `npm run dev` continues to serve `/`. The workflow obtains the deployment base path from GitHub Pages. For another host or a custom domain, set `VITE_BASE_PATH=/` at build time. Photos, fonts, navigation, and the legacy portfolio redirect respect the base path. The public Cal.com event URL is included in the build and requires no secrets.

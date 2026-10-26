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

The site is adapted for a psychology practice: about, approach, consultation formats, common questions, and booking. The original portrait photographs and locally hosted fonts are retained. Photography portfolio content, placeholder branding, and generic social links have been removed. The first meeting is a free 15-minute introduction; an individual consultation lasts 50 minutes and costs 140 PLN. Introduction booking uses a separate WhatsApp draft link; the Cal.com event duration is managed separately and was not modified as part of the website text update. No therapeutic modalities or additional credentials are invented.

## Cal.com booking

The booking section uses the official `@calcom/embed-react` inline calendar with a light month view. An external booking link and WhatsApp/Telegram contacts remain available if the widget is blocked. The supplied event https://cal.com/polina.pranovich/sesja is configured as the default. Its available slots have been verified. Changing the duration text on this website does not change the event settings in Cal.com. The former Google Calendar booking page is no longer embedded.

1. In Cal.com, create an individual event type, configure duration, availability, timezone, meeting location, and booking conditions.
2. Copy the public event URL, e.g. `https://cal.com/username/consultation`.
3. Set `defaultBookingUrl` in `src/booking.js` to publish it with the site, or override it with the public build variable `VITE_CAL_BOOKING_URL`. For local development, copy `.env.example` to `.env.local`, add the URL, and restart Vite. For GitHub Actions, configure the variable in the repository settings; rebuild after changing it.

If the Cal.com event URL is missing or invalid, contact-based booking is displayed. The 15-minute introductory meeting has a separate WhatsApp draft link so it cannot accidentally book a standard session slot. Google Calendar can still be connected privately inside Cal.com to block occupied times; that connection does not require website changes. Do not put API keys, access tokens, or private calendar URLs in `VITE_` variables.

Booking, availability, confirmations, and any enabled reminders are handled by Cal.com. Verify the actual event page before deployment. Do not create test appointments without the owner's approval.

Official embed overview: https://cal.com/embed

## GitHub Pages

Repository: https://github.com/deviousknight/polina-work-website

The workflow in `.github/workflows/deploy.yml` builds and deploys the site after pushes to `main`. In repository **Settings → Pages → Build and deployment**, select **GitHub Actions** as the source.

Default production URL: https://deviousknight.github.io/polina-work-website/

`npm run build` and `npm run preview` use `/polina-work-website/`; `npm run dev` continues to serve `/`. The workflow obtains the deployment base path from GitHub Pages. For another host or a custom domain, set `VITE_BASE_PATH=/` at build time. Photos, fonts, navigation, and the legacy portfolio redirect respect the base path. The public Cal.com event URL is included in the build and requires no secrets.

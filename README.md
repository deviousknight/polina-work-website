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

The site is adapted for a psychology practice: about, approach, consultation formats, common questions, and booking. The original portrait photographs and locally hosted fonts are retained. Photography portfolio content, placeholder branding, and generic social links have been removed. No rates, session lengths, therapeutic modalities, or additional credentials are invented.

## Google Calendar booking

The booking section embeds a Google Calendar appointment schedule and keeps WhatsApp/Telegram as fallback contacts. No API key, OAuth secret, backend, or public personal calendar is required.

The supplied booking schedule is configured as the default in `src/booking.js` and works in both development and production. `VITE_GOOGLE_BOOKING_URL` can override it for another deployment.

To replace the schedule:

1. In Google Calendar, create an **Appointment schedule**. Set duration, availability, timezone, meeting location, and booking conditions.
2. Copy its public booking-page link. For inline display, use the full `https://calendar.google.com/calendar/appointments/schedules/...` URL from **Sharing options → Website embed → Inline booking page**. A `https://calendar.app.google/...` short link opens externally instead.
3. Copy `.env.example` to `.env.local`, set `VITE_GOOGLE_BOOKING_URL` to that URL, and restart Vite. Rebuild before deployment; configure the same variable on your build host.

If no valid link is configured, the site shows an honest contact-based booking fallback and no invented availability. With a configured schedule, Google handles availability, booking, confirmation, and any enabled reminders. A permanent external booking link is available if the embed is blocked. Never put private calendar URLs, access tokens, or credentials in `VITE_` variables: these values are public.

Official setup: https://support.google.com/calendar/answer/10733297?hl=ru

Real availability and end-to-end booking must be checked with the owner's actual booking URL. Do not create a test appointment without the owner's approval.

## GitHub Pages

Repository: https://github.com/deviousknight/polina-work-website

The workflow in `.github/workflows/deploy.yml` builds and deploys the site after pushes to `main`. In repository **Settings → Pages → Build and deployment**, select **GitHub Actions** as the source.

Default production URL: https://deviousknight.github.io/polina-work-website/

`npm run build` and `npm run preview` use `/polina-work-website/`; `npm run dev` continues to serve `/`. The workflow obtains the deployment base path from GitHub Pages. For another host or a custom domain, set `VITE_BASE_PATH=/` at build time. Photos, fonts, navigation, and the legacy portfolio redirect respect the base path. The Google booking schedule is included in the build and requires no secrets.

// Public booking page only; no Google credentials are needed in the website.
export function getGoogleBooking(value = '') {
  try {
    const url = new URL(value.trim());
    if (url.protocol !== 'https:' || url.username || url.password || url.port) return null;
    if (url.hostname === 'calendar.google.com' && /^\/calendar\/appointments\/schedules\/[\w-]+\/?$/.test(url.pathname)) {
      const bookingUrl = `${url.origin}${url.pathname}`;
      return { bookingUrl, embedUrl: `${bookingUrl}?gv=true` };
    }
    // Google short links are supported as external links, never as iframe URLs.
    if (url.hostname === 'calendar.app.google' && /^\/[\w-]+\/?$/.test(url.pathname)) {
      return { bookingUrl: `${url.origin}${url.pathname}`, embedUrl: null };
    }
  } catch {
    // Missing or invalid configuration keeps the direct contact options visible.
  }
  return null;
}

const defaultBookingUrl = 'https://calendar.google.com/calendar/appointments/schedules/AcZssZ3-zQrxWCLF6P84nY8zNlpHO6E8F4WHI07qFywtpMj9miOwXBekJhMnQoRW-wZOpqm_OIlsBZB1';

export const googleBooking = getGoogleBooking(import.meta.env?.VITE_GOOGLE_BOOKING_URL || defaultBookingUrl);

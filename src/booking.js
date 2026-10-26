// Only a public Cal.com event URL belongs here; no API key is needed.
export function getCalBooking(value = '') {
  try {
    const url = new URL(value.trim());
    if (url.protocol !== 'https:' || url.hostname !== 'cal.com' || url.username || url.password || url.port) return null;
    const calLink = url.pathname.replace(/^\/+|\/+$/g, '');
    // Individual events: /username/event. Team events: /team/team-name/event.
    if (!/^(?:team\/)?[a-zA-Z0-9_-]+\/[a-zA-Z0-9_-]+$/.test(calLink)) return null;
    return { calLink, bookingUrl: `https://cal.com/${calLink}` };
  } catch {
    // A missing URL keeps contact-based booking available without fake slots.
  }
  return null;
}

const defaultBookingUrl = '';
export const calBooking = getCalBooking(import.meta.env?.VITE_CAL_BOOKING_URL || defaultBookingUrl);

// Keep the existing booking calendar operational until a real Cal.com event is configured.
const legacyGoogleUrl = 'https://calendar.google.com/calendar/appointments/schedules/AcZssZ3-zQrxWCLF6P84nY8zNlpHO6E8F4WHI07qFywtpMj9miOwXBekJhMnQoRW-wZOpqm_OIlsBZB1';
export const googleBooking = calBooking ? null : { bookingUrl: legacyGoogleUrl, embedUrl: `${legacyGoogleUrl}?gv=true` };

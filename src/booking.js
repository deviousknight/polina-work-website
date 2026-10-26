// Only a public Cal.com event URL belongs here; no API key is needed.
export function getCalBooking(value = '') {
  try {
    const url = new URL(value.trim());
    if (url.protocol !== 'https:' || url.hostname !== 'cal.com' || url.username || url.password || url.port) return null;
    const calLink = url.pathname.replace(/^\/+|\/+$/g, '');
    // Individual events: /username/event. Team events: /team/team-name/event.
    if (!/^(?:team\/)?[a-zA-Z0-9_.-]+\/[a-zA-Z0-9_-]+$/.test(calLink)) return null;
    return { calLink, bookingUrl: `https://cal.com/${calLink}` };
  } catch {
    // A missing URL keeps contact-based booking available without fake slots.
  }
  return null;
}

const defaultBookingUrl = 'https://cal.com/polina.pranovich/sesja';
export const calBooking = getCalBooking(import.meta.env?.VITE_CAL_BOOKING_URL || defaultBookingUrl);

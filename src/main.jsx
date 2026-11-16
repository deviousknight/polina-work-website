import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';
import { bookingOptions } from './booking';
import Cal from '@calcom/embed-react';
import { translations } from './translations';

const calEmbedConfig = { layout: 'month_view', theme: 'light' };

const baseUrl = import.meta.env.BASE_URL;
const language = document.documentElement.lang === 'pl' ? 'pl' : 'ru';
const languagePath = language === 'pl' ? `${baseUrl}pl/` : baseUrl;
const whatsapp = 'https://wa.me/48576292387';
const telegram = 'https://t.me/+48576292387';

function Icon({ name, className = '' }) {
  const paths = {
    arrow: <><path d="M12 4v16M5 13l7 7 7-7" /></>,
    chat: <><path d="M21 11.5a8.5 8.5 0 0 1-8.5 8.5H9l-5 3v-6a8.5 8.5 0 1 1 17-5.5Z" /><path d="M8 11h.01M12 11h.01M16 11h.01" /></>,
    whatsapp: <><path d="M20.5 11.6a8.5 8.5 0 0 1-12.4 7.5L3 20.5l1.4-5A8.5 8.5 0 1 1 20.5 11.6Z" /><path d="M8 7c-1 1-1 3 2 6s5 3 6 2l-2-2-1.5.5-3-3L10 9 8 7Z" /></>,
    telegram: <><path d="m3 11 18-7-4 17-6-5-3 3v-5L18 7 8 14l-5-3Z" /></>,
    close: <path d="m6 6 12 12M6 18 18 6" />,
    menu: <path d="M4 6h16M4 12h16M4 18h16" />,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M7 3v4M17 3v4M3 11h18M8 15h2M14 15h2" /></>,
  };
  return <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}

function Header({ t, session }) {
  const [scrolled, setScrolled] = useState(window.scrollY > 60);
  const [menu, setMenu] = useState(false);
  const [hash, setHash] = useState(window.location.hash);
  useEffect(() => {
    const update = () => setHash(window.location.hash);
    window.addEventListener('hashchange', update);
    return () => window.removeEventListener('hashchange', update);
  }, []);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);
  const solid = scrolled || menu;
  return <header className={`site-header ${solid ? 'solid' : ''}`}>
    <a href={`${languagePath}#main`} className="logo" aria-label={t.homeLabel}><span>{t.displayName}</span><small>{t.roleLocation}</small></a>
    <button className="menu-toggle md:hidden" aria-label={menu ? t.menuClose : t.menuOpen} aria-expanded={menu} onClick={() => setMenu(!menu)}><Icon name={menu ? 'close' : 'menu'} /></button>
    <nav aria-label={t.navLabel} className={`${menu ? 'flex' : 'hidden'} md:flex`}>
      {Object.entries(t.nav).map(([id, label]) => <a key={id} href={`${languagePath}#${id}`} onClick={() => setMenu(false)}>{label}</a>)}
    </nav>
    <div className="header-tools" role="group" aria-label={t.languageLabel}>
      {[['ru', 'Русский', baseUrl], ['pl', 'Polski', `${baseUrl}pl/`]].map(([code, label, path]) => (
        <a key={code} href={`${path}${hash === '#contact' && session === 'introduction' ? '?session=introduction' : ''}${hash}`} lang={code} hrefLang={code} aria-label={label} aria-current={language === code ? 'page' : undefined}>{code.toUpperCase()}</a>
      ))}
    </div>
  </header>;
}

function Footer({ t }) {
  return <footer className="px-6 pb-8 pt-10 text-center text-[13px] text-neutral-600">
    <div className="mb-5 flex justify-center gap-5">
      <a href={whatsapp} target="_blank" rel="noreferrer" aria-label="WhatsApp"><Icon name="whatsapp" /></a>
      <a href={telegram} target="_blank" rel="noreferrer" aria-label="Telegram"><Icon name="telegram" /></a>
    </div>
    <p>{t.footerRole}</p>
    <p className="mt-2 text-xs">{t.footerText}</p>
    <p className="mt-5 text-[11px]">© {new Date().getFullYear()} {t.displayName}</p>
  </footer>;
}

function Contact({ t, session, onSelect }) {
  const { title, note } = t.booking[session];
  const event = bookingOptions[session];
  const introductionBookingUrl = `${whatsapp}?text=${encodeURIComponent(t.introDraft)}`;
  return <section id="contact" className="page-container py-20 md:py-24" aria-labelledby="booking-title">
    <div className="mx-auto mb-10 max-w-[680px] text-center">
      <p className="eyebrow mb-5">{t.firstStep}</p>
      <h2 id="booking-title">{t.bookTitle}</h2>
      <p className="mt-6 text-sm leading-7 text-neutral-600">{t.bookingHint}</p>
    </div>
    <div role="group" aria-label={t.meetingFormat} className="booking-options mb-6 grid grid-cols-2 gap-3">
      {Object.entries(t.booking).map(([id, option]) => (
        <button key={id} type="button" aria-pressed={session === id} aria-controls="booking-calendar" onClick={() => onSelect(id)}>
          <span>{option.title}</span>
          <small>{option.details}</small>
        </button>
      ))}
    </div>
    <div id="booking-calendar" className="booking-shell">
      <div className="booking-toolbar"><div className="flex items-center gap-3"><Icon name="calendar" /><span>{title}</span></div><span className="text-xs text-neutral-500">{t.supportedLanguages}</span></div>
      {note && <p className="booking-note" role="status">{note}</p>}
      {event ? <>
        <div className="cal-booking" aria-label={`${t.calendarLabel}: ${title}`}>
          <Cal key={session} namespace={`psychology-${session}`} calLink={event.calLink} config={calEmbedConfig} style={{ width: '100%', minHeight: '700px', overflow: 'auto' }} />
        </div>
        <div className="booking-fallback"><p>{t.calendarFallback}</p><a className="text-link" href={event.bookingUrl} target="_blank" rel="noopener noreferrer">{t.openCal} ↗</a></div>
      </> : <div className="booking-empty text-center">
        <div className="booking-icon mx-auto mb-6"><Icon name="calendar" /></div>
        <h3>{t.manualTitle}</h3>
        <p>{t.manualText}</p>
        <a className="dark-button mt-7 inline-block" href={session === 'introduction' ? introductionBookingUrl : whatsapp} target="_blank" rel="noopener noreferrer">{t.manualCta} ↗</a>
      </div>}


    </div>
    <div className="booking-help mt-8 flex flex-col items-center justify-between gap-5 md:flex-row">
      <p className="text-center text-sm leading-7 text-neutral-600 md:text-left">{t.beforeBooking}<br />{t.contactHint}</p>
      <div className="flex flex-wrap justify-center gap-6 text-sm"><a className="text-link" href={whatsapp} target="_blank" rel="noopener noreferrer">WhatsApp ↗</a><a className="text-link" href={telegram} target="_blank" rel="noopener noreferrer">Telegram ↗</a></div>
    </div>
  </section>;
}

function ContactWidget({ t }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    function close(event) { if (event.key === 'Escape') setOpen(false); }
    function outside(event) { if (ref.current && !ref.current.contains(event.target)) setOpen(false); }
    document.addEventListener('keydown', close);
    document.addEventListener('pointerdown', outside);
    return () => { document.removeEventListener('keydown', close); document.removeEventListener('pointerdown', outside); };
  }, []);
  return <div ref={ref} className="fixed bottom-5 right-5 z-40 md:bottom-7 md:right-7">
    {open && <div className="mb-4 w-64 border border-neutral-100 bg-white p-6 shadow-xl" id="contact-options">
      <p className="mb-1 font-serif text-2xl">{t.displayName}</p><p className="mb-5 text-xs text-neutral-500">{t.roleLocation}</p>
      <a className="mb-3 flex items-center gap-3 text-sm" href={whatsapp} target="_blank" rel="noreferrer"><Icon name="whatsapp" /> WhatsApp</a>
      <a className="mb-3 flex items-center gap-3 text-sm" href={telegram} target="_blank" rel="noreferrer"><Icon name="telegram" /> Telegram</a>
      <a className="text-xs text-link" href="tel:+48576292387">+48 576 292 387</a>
    </div>}
    <button onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="contact-options" aria-label={open ? t.closeContact : t.openContact} className="ml-auto flex h-[60px] w-[60px] items-center justify-center rounded-full bg-neutral-900 text-white shadow-lg transition hover:bg-neutral-700"><Icon name={open ? 'close' : 'chat'} className="h-7 w-7" /></button>
  </div>;
}

function Consultations({ t, onSelect }) {
  return <section id="consultations" className="page-container py-20 md:py-24">
    <div className="mx-auto mb-12 max-w-[660px] text-center">
      <p className="eyebrow mb-5">{t.workFormat}</p>
      <h2>{t.consultationsTitle}</h2>
      <p className="mt-6 text-sm leading-7 text-neutral-600">{t.consultationsText}</p>
    </div>
    <div className="grid gap-6 md:grid-cols-2">
      <article className="consultation-card">
        <span className="eyebrow">{t.introLabel}</span>
        <h3>{t.booking.introduction.title}</h3>
        <div className="session-meta"><span>{t.introDuration}</span><span>{t.free}</span><span>{t.online}</span></div>
        <p>{t.introText}</p>
        <a className="text-link" href="#contact" onClick={() => onSelect('introduction')}>{t.introCta} ↗</a>
      </article>
      <article className="consultation-card">
        <span className="eyebrow">{t.sessionLabel}</span>
        <h3>{t.booking.consultation.title}</h3>
        <div className="session-price"><span>140 zł</span><small>{t.sessionDuration}</small></div>
        <p>{t.sessionText}</p>
        <a className="text-link" href="#contact" onClick={() => onSelect('consultation')}>{t.sessionCta} ↗</a>
      </article>
    </div>
  </section>;
}

function Questions({ t }) {
  return <section className="page-container py-16 md:py-20" aria-labelledby="questions-title">
    <div className="mx-auto max-w-[780px]"><p className="eyebrow mb-5">{t.beforeMeeting}</p><h2 id="questions-title" className="mb-9">{t.faqTitle}</h2>
      {t.questions.map(([question, answer]) => <details key={question} className="question"><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}
    </div>
  </section>;
}

function App() {
  const t = translations[language];
  const [session, setSession] = useState(() => new URLSearchParams(window.location.search).get('session') === 'introduction' ? 'introduction' : 'consultation');
  useEffect(() => {
    if (window.location.pathname.replace(/\/$/, '') === `${baseUrl}portfolio`) {
      window.history.replaceState(null, '', `${baseUrl}#consultations`);
    }
    const section = document.getElementById(window.location.hash.slice(1));
    section?.scrollIntoView({ behavior: 'instant' });
  }, []);
  return <>
    <a href="#main" className="skip-link">{t.skip}</a>
    <Header t={t} session={session} />
    <main id="main">

        <section className="hero relative flex min-h-[620px] items-center justify-center text-center text-white">
          <img className="absolute inset-0 h-full w-full object-cover" src={`${baseUrl}images/hero.jpg`} alt={t.heroAlt} fetchPriority="high" width="2520" height="1680" />
          <div className="absolute inset-0 bg-black/30" />
          <div className="hero-copy relative z-10 mx-auto max-w-[1000px] px-6"><p className="eyebrow mb-6 text-white/90">{t.heroByline}</p><h1>{t.heroTitle}</h1><p className="mx-auto mt-5 max-w-[650px] text-base leading-relaxed">{t.heroText}</p><a className="hero-cta mt-9 inline-flex items-center gap-6" href="#contact" onClick={() => setSession('consultation')}>{t.bookTitle} <span aria-hidden="true">↗</span></a></div>
          <a href="#about" className="absolute bottom-6 left-1/2 -translate-x-1/2 p-3 transition hover:translate-y-1" aria-label={t.aboutTitle}><Icon name="arrow" /></a>
        </section>
        <section id="about" className="about-grid mx-auto grid max-w-[828px] items-center gap-10 px-6 py-[60px] md:grid-cols-2 md:gap-[60px]">
          <div><h2 className="mb-5">{t.aboutTitle}</h2><div className="space-y-5 text-base leading-[1.5]">{t.biography.map(text => <p key={text}>{text}</p>)}</div></div>
          <img className="mx-auto w-full max-w-[420px]" src={`${baseUrl}images/about.jpg`} alt={t.aboutAlt} loading="lazy" width="720" height="1080" />
        </section>
        <div className="page-container"><hr /></div>
        <section id="approach" className="approach-section py-20 md:py-24">
          <div className="mx-auto max-w-[800px] px-6 text-center"><p className="eyebrow mb-6">{t.approachLabel}</p><h2>{t.approachTitle}</h2><p className="mx-auto mt-7 max-w-[620px] text-sm leading-7 text-neutral-600">{t.approachText}</p></div>
          <div className="page-container mt-14 grid gap-8 md:grid-cols-3 md:gap-12">{t.topics.map(([title, text]) => <div key={title} className="topic"><h3>{title}</h3><p>{text}</p></div>)}</div>
        </section>
        <div className="page-container"><hr /></div>
        <Consultations t={t} onSelect={setSession} />
        <Questions t={t} />
        <div className="page-container"><hr /></div>
        <Contact t={t} session={session} onSelect={setSession} />
        <div className="page-container"><hr /></div>

    </main>
    <Footer t={t} />
    <ContactWidget t={t} />

  </>;
}

createRoot(document.getElementById('root')).render(<App />);

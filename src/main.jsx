import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';
import { googleBooking } from './booking';

const baseUrl = import.meta.env.BASE_URL;
const whatsapp = 'https://wa.me/48576292387';
const telegram = 'https://t.me/+48576292387';
const biography = [
  'Здравствуйте, меня зовут Полина.',
  'Я психолог и работаю в Варшаве. Провожу индивидуальные консультации онлайн на русском и польском языках.',
  'Для меня психологическая консультация — это прежде всего пространство, где вам не нужно соответствовать чьим-либо ожиданиям. Здесь можно говорить о сложных чувствах, сомнениях, отношениях, тревогах и жизненных ситуациях так, как вам действительно хочется.',
  'В работе для меня важны уважение к вашей индивидуальности, внимательное отношение к вашему опыту и отсутствие осуждения. В работе мы вместе исследуем то, что происходит, ищем причины возникающих трудностей и способы справляться с ними.',
  'Я окончила магистратуру по психологии со специализацией в области клинической психологии, продолжаю профессиональное обучение и регулярно расширяю свои знания и практические навыки.',
  'Я особенно ценю честный и открытый диалог. Иногда первый шаг — это просто возможность наконец сказать вслух то, что долго оставалось внутри.',
  'Если вы чувствуете, что сейчас вам нужна поддержка, разобраться в происходящем можно начать с одной встречи.',
];

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

function Header() {
  const [scrolled, setScrolled] = useState(window.scrollY > 60);
  const [menu, setMenu] = useState(false);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);
  const solid = scrolled || menu;
  return <header className={`site-header ${solid ? 'solid' : ''}`}>
    <a href={`${baseUrl}#main`} className="logo" aria-label="Полина Pranowicz — на главную"><span>Polina Pranowicz</span><small>Психолог · Варшава и онлайн</small></a>
    <button className="menu-toggle md:hidden" aria-label={menu ? 'Закрыть меню' : 'Открыть меню'} aria-expanded={menu} onClick={() => setMenu(!menu)}><Icon name={menu ? 'close' : 'menu'} /></button>
    <nav aria-label="Основная навигация" className={`${menu ? 'flex' : 'hidden'} md:flex`}>
      {[['about', 'Обо мне'], ['approach', 'Мой подход'], ['consultations', 'Консультации'], ['contact', 'Записаться']].map(([id, label]) => <a key={id} href={`${baseUrl}#${id}`} onClick={() => setMenu(false)}>{label}</a>)}
    </nav>
  </header>;
}

function Footer() {
  return <footer className="px-6 pb-8 pt-10 text-center text-[13px] text-neutral-600">
    <div className="mb-5 flex justify-center gap-5">
      <a href={whatsapp} target="_blank" rel="noreferrer" aria-label="WhatsApp"><Icon name="whatsapp" /></a>
      <a href={telegram} target="_blank" rel="noreferrer" aria-label="Telegram"><Icon name="telegram" /></a>
    </div>
    <p>Polina Pranowicz · Психолог</p>
    <p className="mt-2 text-xs">Индивидуальные консультации на русском и польском языках</p>
    <p className="mt-5 text-[11px]">© {new Date().getFullYear()} Polina Pranowicz</p>
  </footer>;
}

function Contact() {
  const [frameFailed, setFrameFailed] = useState(false);
  return <section id="contact" className="page-container py-20 md:py-24" aria-labelledby="booking-title">
    <div className="mx-auto mb-10 max-w-[680px] text-center">
      <p className="eyebrow mb-5">Первый шаг</p>
      <h2 id="booking-title">Записаться на консультацию</h2>
      <p className="mt-6 text-sm leading-7 text-neutral-600">{googleBooking
        ? 'Выберите удобную дату и свободное время в календаре. Условия встречи и подтверждение записи появятся на странице бронирования Google.'
        : 'Чтобы узнать о свободном времени и договориться о встрече, напишите мне в WhatsApp или Telegram.'}</p>
    </div>
    <div className="booking-shell">
      <div className="booking-toolbar"><div className="flex items-center gap-3"><Icon name="calendar" /><span>Онлайн-консультация</span></div><span className="text-xs text-neutral-500">Русский / Polski</span></div>
      {googleBooking?.embedUrl && !frameFailed ? <>
        <iframe className="booking-frame" src={googleBooking.embedUrl} title="Выбрать свободное время и записаться на консультацию — Google Calendar" loading="lazy" referrerPolicy="strict-origin-when-cross-origin" onError={() => setFrameFailed(true)} />
        <div className="booking-fallback"><p>Если календарь не отображается, откройте страницу записи отдельно.</p><a className="text-link" href={googleBooking.bookingUrl} target="_blank" rel="noopener noreferrer">Открыть в Google Calendar ↗</a></div>
      </> : <div className="booking-empty text-center">
        <div className="booking-icon mx-auto mb-6"><Icon name="calendar" /></div>
        <h3>{googleBooking ? 'Выберите время в Google Calendar' : 'Запись по договорённости'}</h3>
        <p>{googleBooking ? 'Откройте страницу бронирования, чтобы посмотреть свободное время и выбрать встречу.' : 'Онлайн-календарь пока недоступен. Я помогу подобрать удобное время и отвечу на вопросы об условиях консультации.'}</p>
        {googleBooking ? <a className="dark-button mt-7 inline-block" href={googleBooking.bookingUrl} target="_blank" rel="noopener noreferrer">Выбрать дату и время ↗</a> : <a className="dark-button mt-7 inline-block" href={whatsapp} target="_blank" rel="noopener noreferrer">Обсудить время в WhatsApp ↗</a>}
      </div>}
    </div>
    <div className="booking-help mt-8 flex flex-col items-center justify-between gap-5 md:flex-row">
      <p className="text-center text-sm leading-7 text-neutral-600 md:text-left">Есть вопросы перед записью?<br />Напишите мне — обсудим организационные детали.</p>
      <div className="flex flex-wrap justify-center gap-6 text-sm"><a className="text-link" href={whatsapp} target="_blank" rel="noopener noreferrer">WhatsApp ↗</a><a className="text-link" href={telegram} target="_blank" rel="noopener noreferrer">Telegram ↗</a></div>
    </div>
  </section>;
}

function ContactWidget() {
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
      <p className="mb-1 font-serif text-2xl">Polina Pranowicz</p><p className="mb-5 text-xs text-neutral-500">Психолог · Варшава и онлайн</p>
      <a className="mb-3 flex items-center gap-3 text-sm" href={whatsapp} target="_blank" rel="noreferrer"><Icon name="whatsapp" /> WhatsApp</a>
      <a className="mb-3 flex items-center gap-3 text-sm" href={telegram} target="_blank" rel="noreferrer"><Icon name="telegram" /> Telegram</a>
      <a className="text-xs text-link" href="tel:+48576292387">+48 576 292 387</a>
    </div>}
    <button onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="contact-options" aria-label={open ? 'Закрыть контакты' : 'Открыть контакты'} className="ml-auto flex h-[60px] w-[60px] items-center justify-center rounded-full bg-neutral-900 text-white shadow-lg transition hover:bg-neutral-700"><Icon name={open ? 'close' : 'chat'} className="h-7 w-7" /></button>
  </div>;
}

function Consultations() {
  return <section id="consultations" className="page-container py-20 md:py-24">
    <div className="mx-auto mb-12 max-w-[660px] text-center">
      <p className="eyebrow mb-5">Формат работы</p>
      <h2>Пространство для разговора о вас</h2>
      <p className="mt-6 text-sm leading-7 text-neutral-600">Индивидуальные консультации онлайн на русском и польском языках. Можно начать с одной встречи и обсудить, какая поддержка вам сейчас нужна.</p>
    </div>
    <div className="grid gap-6 md:grid-cols-2">
      <article className="consultation-card">
        <span className="eyebrow">01 / Знакомство</span>
        <h3>Первая встреча</h3>
        <p>Возможность рассказать о том, что вас привело, задать вопросы и обсудить ожидания от нашей работы. Необязательно заранее точно формулировать свой запрос.</p>
        <a className="text-link" href="#contact">Обсудить встречу ↗</a>
      </article>
      <article className="consultation-card">
        <span className="eyebrow">02 / Диалог</span>
        <h3>Индивидуальная работа</h3>
        <p>Вместе исследуем ваши переживания, отношения и жизненные ситуации. Ищем причины возникающих трудностей и подходящие вам способы справляться с ними.</p>
        <a className="text-link" href="#contact">Узнать об условиях ↗</a>
      </article>
    </div>
  </section>;
}

function Questions() {
  const questions = [
    ['Нужно ли готовиться к первой встрече?', 'Вы можете заранее подумать, о чём хотелось бы поговорить, или начать с того, что волнует прямо сейчас. Необязательно подбирать правильные слова — разобраться в запросе можно вместе.'],
    ['На каком языке проходят консультации?', 'Я провожу индивидуальные консультации онлайн на русском и польском языках. При записи укажите, какой язык вам удобнее.'],
    ['Как узнать стоимость и выбрать время?', googleBooking ? 'Выберите свободное время в разделе «Записаться». Условия консультации указаны на странице бронирования Google. Если нужна помощь с записью, напишите мне в WhatsApp или Telegram.' : 'Напишите мне в WhatsApp или Telegram. До записи мы обсудим стоимость, удобное время и организационные условия встречи.'],
  ];
  return <section className="page-container py-16 md:py-20" aria-labelledby="questions-title">
    <div className="mx-auto max-w-[780px]"><p className="eyebrow mb-5">Перед встречей</p><h2 id="questions-title" className="mb-9">Частые вопросы</h2>
      {questions.map(([question, answer]) => <details key={question} className="question"><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}
    </div>
  </section>;
}

function App() {
  useEffect(() => {
    document.title = 'Полина Pranowicz — психолог в Варшаве и онлайн';
    if (window.location.pathname.replace(/\/$/, '') === `${baseUrl}portfolio`) {
      window.history.replaceState(null, '', `${baseUrl}#consultations`);
      document.getElementById('consultations')?.scrollIntoView();
    }
  }, []);
  return <>
    <a href="#main" className="skip-link">Перейти к содержимому</a>
    <Header />
    <main id="main">

        <section className="hero relative flex min-h-[620px] items-center justify-center text-center text-white">
          <img className="absolute inset-0 h-full w-full object-cover" src={`${baseUrl}images/hero.jpg`} alt="Психолог Polina Pranowicz" fetchPriority="high" width="2520" height="1680" />
          <div className="absolute inset-0 bg-black/30" />
          <div className="hero-copy relative z-10 mx-auto max-w-[1000px] px-6"><p className="eyebrow mb-6 text-white/90">Полина Pranowicz · Психолог</p><h1>О себе. О чувствах. О жизни.</h1><p className="mx-auto mt-5 max-w-[650px] text-base leading-relaxed">Психологическая помощь и поддержка в Варшаве и онлайн по всему миру</p><a className="hero-cta mt-9 inline-flex items-center gap-6" href="#contact">Записаться на консультацию <span aria-hidden="true">↗</span></a></div>
          <a href="#about" className="absolute bottom-6 left-1/2 -translate-x-1/2 p-3 transition hover:translate-y-1" aria-label="Обо мне"><Icon name="arrow" /></a>
        </section>
        <section id="about" className="about-grid mx-auto grid max-w-[828px] items-center gap-10 px-6 py-[60px] md:grid-cols-2 md:gap-[60px]">
          <div><h2 className="mb-5">Обо мне</h2><div className="space-y-5 text-base leading-[1.5]">{biography.map(text => <p key={text}>{text}</p>)}</div></div>
          <img className="mx-auto w-full max-w-[420px]" src={`${baseUrl}images/about.jpg`} alt="Полина — психолог в Варшаве" loading="lazy" width="720" height="1080" />
        </section>
        <div className="page-container"><hr /></div>
        <section id="approach" className="approach-section py-20 md:py-24">
          <div className="mx-auto max-w-[800px] px-6 text-center"><p className="eyebrow mb-6">Мой подход</p><h2>Место, где можно быть собой<br className="hidden md:block" /> и говорить о важном</h2><p className="mx-auto mt-7 max-w-[620px] text-sm leading-7 text-neutral-600">Уважение к вашей индивидуальности, внимательное отношение к вашему опыту и отсутствие осуждения — то, на что я опираюсь в работе. Мне важно слышать вас и быть в честном, открытом диалоге.</p></div>
          <div className="page-container mt-14 grid gap-8 md:grid-cols-3 md:gap-12">{[
            ['Чувства и тревоги', 'Когда сложно понять свои переживания, справиться с тревогой или найти внутреннюю опору.'],
            ['Отношения', 'Когда хочется разобраться в отношениях, своих потребностях и том, как говорить о них с другими.'],
            ['Жизненные перемены', 'Когда привычное меняется, предстоит выбор или нужна поддержка в непростой ситуации.'],
          ].map(([title, text]) => <div key={title} className="topic"><h3>{title}</h3><p>{text}</p></div>)}</div>
        </section>
        <div className="page-container"><hr /></div>
        <Consultations />
        <Questions />
        <div className="page-container"><hr /></div>
        <Contact />
        <div className="page-container"><hr /></div>

    </main>
    <Footer />
    <ContactWidget />

  </>;
}

createRoot(document.getElementById('root')).render(<App />);

import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';
import { calBooking } from './booking';
import Cal from '@calcom/embed-react';

const calEmbedConfig = { layout: 'month_view', theme: 'light' };

const baseUrl = import.meta.env.BASE_URL;
const whatsapp = 'https://wa.me/48576292387';
const telegram = 'https://t.me/+48576292387';
const introductionBookingUrl = `${whatsapp}?text=${encodeURIComponent('Здравствуйте! Хочу записаться на 15-минутную встречу-знакомство.')}`;
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
  return <section id="contact" className="page-container py-20 md:py-24" aria-labelledby="booking-title">
    <div className="mx-auto mb-10 max-w-[680px] text-center">
      <p className="eyebrow mb-5">Первый шаг</p>
      <h2 id="booking-title">Записаться на консультацию</h2>
      <p className="mt-6 text-sm leading-7 text-neutral-600">Индивидуальная консультация — 140 zł. Выберите удобную дату и свободное время в календаре. Первая встреча-знакомство — 15 минут бесплатно. Чтобы договориться о знакомстве, напишите мне.</p>
    </div>
    <div className="booking-shell">
      <div className="booking-toolbar"><div className="flex items-center gap-3"><Icon name="calendar" /><span>Онлайн-консультация</span></div><span className="text-xs text-neutral-500">Русский / Polski</span></div>
      {calBooking ? <>
        <div className="cal-booking" aria-label="Календарь записи на консультацию">
          <Cal key={calBooking.calLink} namespace="psychology-consultation" calLink={calBooking.calLink} config={calEmbedConfig} style={{ width: '100%', minHeight: '700px', overflow: 'auto' }} />
        </div>
        <div className="booking-fallback"><p>Если календарь не отображается, откройте страницу записи отдельно.</p><a className="text-link" href={calBooking.bookingUrl} target="_blank" rel="noopener noreferrer">Открыть в Cal.com ↗</a></div>
      </> : <div className="booking-empty text-center">
        <div className="booking-icon mx-auto mb-6"><Icon name="calendar" /></div>
        <h3>Запись по договорённости</h3>
        <p>Онлайн-календарь пока недоступен. Напишите мне, чтобы подобрать удобное время.</p>
        <a className="dark-button mt-7 inline-block" href={whatsapp} target="_blank" rel="noopener noreferrer">Обсудить время в WhatsApp ↗</a>
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
      <p className="mt-6 text-sm leading-7 text-neutral-600">Индивидуальные консультации онлайн на русском и польском языках. Начать можно с 15-минутной встречи-знакомства, а затем продолжить индивидуальную работу.</p>
    </div>
    <div className="grid gap-6 md:grid-cols-2">
      <article className="consultation-card">
        <span className="eyebrow">01 / Знакомство</span>
        <h3>Встреча-знакомство</h3>
        <div className="session-meta"><span>15 минут</span><span>Бесплатно</span><span>Онлайн</span></div>
        <p>Короткая первая встреча, чтобы познакомиться, задать вопросы и обсудить, с чем вам хотелось бы поработать. Можно понять, комфортно ли вам продолжать общение.</p>
        <a className="text-link" href={introductionBookingUrl} target="_blank" rel="noopener noreferrer">Записаться на знакомство ↗</a>
      </article>
      <article className="consultation-card">
        <span className="eyebrow">02 / Диалог</span>
        <h3>Индивидуальная консультация</h3>
        <div className="session-price"><span>140 zł</span><small>за сессию · 50 минут</small></div>
        <p>Вместе исследуем ваши переживания, отношения и жизненные ситуации. Ищем причины возникающих трудностей и подходящие вам способы справляться с ними.</p>
        <a className="text-link" href="#contact">Выбрать время консультации ↗</a>
      </article>
    </div>
  </section>;
}

function Questions() {
  const questions = [
    ['Как проходит встреча-знакомство?', 'Первая встреча длится 15 минут, проходит онлайн и бесплатна. Мы знакомимся, обсуждаем ваш запрос и вопросы о дальнейшей работе. Чтобы договориться о времени, нажмите «Записаться на знакомство» или напишите мне в WhatsApp либо Telegram.'],
    ['Нужно ли готовиться к первой встрече?', 'Вы можете заранее подумать, о чём хотелось бы поговорить, или начать с того, что волнует прямо сейчас. Необязательно подбирать правильные слова — разобраться в запросе можно вместе.'],
    ['На каком языке проходят консультации?', 'Я провожу индивидуальные консультации онлайн на русском и польском языках. При записи укажите, какой язык вам удобнее.'],
    ['Сколько стоит консультация?', 'Стоимость индивидуальной консультации — 140 zł за 50 минут. Первая 15-минутная встреча-знакомство бесплатна. Доступное время можно выбрать в разделе «Записаться». По организационным вопросам напишите мне в WhatsApp или Telegram.'],
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

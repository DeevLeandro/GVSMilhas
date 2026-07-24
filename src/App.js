import React, { useState, useEffect, useRef } from 'react';
import { sendEmail } from './Resend.js';

function useReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setOn(true); io.disconnect(); } },
      { threshold }
    );
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return [ref, on];
}

function Fade({ children, className = '', delay = 0 }) {
  const [ref, on] = useReveal();
  return (
    <div ref={ref} className={className} style={{
      opacity: on ? 1 : 0,
      transform: on ? 'none' : 'translateY(16px)',
      transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
    }}>
      {children}
    </div>
  );
}

function Modal({ src, onClose }) {
  useEffect(() => {
    const fn = e => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', fn);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', fn); document.body.style.overflow = ''; };
  }, [onClose]);
  return (
    <div className="modal" onClick={onClose}>
      <button className="modal__x" onClick={onClose}>✕</button>
      <img src={src} alt="" onClick={e => e.stopPropagation()} />
    </div>
  );
}

const TRIPS = [
  { route: 'Paris → Abu Dhabi',  cabin: 'First Class · EtiHad Airways',   pct: '74,38', orig: '', paid: '',  img: '/images/Itira.jpeg' },
  { route: 'Bangkok → Maldivas', cabin: 'First Class · Qatar Airways',   pct: '68,81', orig: '', paid: '', img: '/images/Doha.png' },
  { route: 'Guarulhos → Paris',  cabin: 'Business Class · Air France',   pct: '72,07', orig: '', paid: '', img: '/images/cliente-maldives.jpeg'  },
  { route: 'Paris → Doha → Bangkok', cabin: 'Business · First Class · Qatar Airways',   pct: '81,78', orig: '', paid: 'R$ 16.205,25',  img: '/images/Bankog.png'},
  { route: 'Singapura → Bangkok', cabin: 'Business · Singapore Airlines', pct: '45,84', orig: '', paid: '', img: '/images/cliente-singapore.jpeg' },
  { route: 'Istambul → Guarulhos',cabin: 'Business · Turkish Airlines',   pct: '85,95', orig: '', paid: '',  img: '/images/foto.jpeg'},
];

const HOTELS = [
  { name: 'Pullman Paris Tour Eiffel',     local: 'Pullman Paris Tour Eiffel · Paris',  pct: '50', orig: '', paid: '',  noites: '2 noites · Deluxe Suite',  img: '/images/Hotel-Paris.png'},
  { name: 'Rixos Premium Saadiyat Island', local: 'Rixos Premium Saadiyat Island · Abu Dhabi', pct: '46,72', orig: '', paid: '', noites: '7 noites · Deluxe Suite',     img: '/images/Hotel-Abu-Dhabi.jpeg'     },
  { name: 'Fairmont Doha',                 local: 'Fairmont Doha · Qatar',               pct: '48,40', orig: '', paid: '',  noites: '3 noites · Gold King ',        img: '/images/Fairmont-Doha.png'     },
];

const CASES = [
  { name: 'Cesar',     pct: 46, orig: 'R$ 310.297',   saved: 'R$ 142.232', img: '/images/resultadoCesar.jpeg' },
  { name: 'Marco',     pct: 38, orig: 'R$ 1.056.884', saved: 'R$ 401.108', img: '/images/resultadosMarco.jpeg'},
  { name: 'Guilherme', pct: 77, orig: 'R$ 655.031',   saved: 'R$ 507.294', img: '/images/resultadosGuilherme.jpeg'},
];

const PILLARS = [
  { n: '01', t: 'Análise de perfil', d: 'Estaremos sua frequência e estilo de viagens e indicaremos os cartões de crédito e programas ideais para maximizar suas milhas em cada rota.' },
  { n: '02', t: 'Planejamento de acúmulo', d: 'Cada destino tem um programa mais vantajoso. Direcionando para o programa certo, sua viagem pode custar apenas a taxa de embarque — e hotéis muito abaixo do valor comercial.' },
  { n: '03', t: 'Estratégia de multiplicação', d: 'Iremos definir o momento exato de transferências bonificadas e cadastros, inclusive em companhias aéreas mundiais. Aplicando corretamente, dobraremos o seu patrimônio em milhas.' },
  { n: '04', t: 'Emissões inteligentes', d: 'Utilizaremos programas internacionais que a maioria desconhece. Muitas vezes não recorremos a milhas nacionais — um dos principais hoje é um programa europeu de altíssimo rendimento.' },
  { n: '05', t: 'Gestão pós-emissão', d: 'Monitoramento de alterações de voo e resolução tudo diretamente com a companhia aérea. Nossos clientes nunca precisam solucionar esse tipo de problema.' },
  { n: '06', t: 'Monitoramento e oportunidades', d: 'Acúmulo contínuo de milhas internacionais com excelente custo por milheiro, com acesso a mais de 60 companhias parceiras no Brasil e no mundo.' },
];

export default function App() {
  const [scrolled,    setScrolled]    = useState(false);
  const [menuOpen,    setMenuOpen]    = useState(false);
  const [trip,        setTrip]        = useState(0);
  const [hotel,       setHotel]       = useState(0);
  const [viagens_tab, setViagensTab]  = useState('voos');
  const [lightbox,    setLightbox]    = useState(null);
  const [submitted,   setSubmitted]   = useState(false);
  const [sending,     setSending]     = useState(false);
  const [sendError,   setSendError]   = useState(false);
  const [form, setForm] = useState({ nome: '', telefone: '', email: '', gasto: '', viagens: '' });

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 48);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const openWA = (msg = 'Olá, gostaria de conhecer o serviço GVS Vip.') =>
    window.open(`https://wa.me/5547997202400?text=${encodeURIComponent(msg)}`, '_blank');

  const handleSubmit = async e => {
    e.preventDefault();
    setSending(true);
    setSendError(false);

    // 1. Abre WhatsApp imediatamente — não depende do email
    const waMsg = `Olá! Solicito uma análise gratuita.\n\nNome: ${form.nome}\nWhatsApp: ${form.telefone}\nE-mail: ${form.email}\nGasto mensal: ${form.gasto}\nViagens/ano: ${form.viagens}`;
    openWA(waMsg);

    // 2. Envia email em paralelo via Resend
    const result = await sendEmail(form);
    if (!result.ok) {
      // falha silenciosa — WhatsApp já foi aberto, não bloqueia o fluxo
      setSendError(true);
      console.warn('Email não enviado, mas WhatsApp foi aberto.');
    }

    setSending(false);
    setSubmitted(true);
    setForm({ nome: '', telefone: '', email: '', gasto: '', viagens: '' });
    setTimeout(() => setSubmitted(false), 8000);
  };

  return (
    <div className="app">

      {/* ── HEADER ── */}
      <header className={`hdr${scrolled ? ' hdr--s' : ''}`}>
        <div className="hdr__in">
          <a href="#" className="logo"
            onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); setMenuOpen(false); }}>
            <span className="logo__gvs">GVS</span>
            <span className="logo__dot">·</span>
            <span className="logo__milhas">Vip</span>
          </a>

          <button className={`burger${menuOpen ? ' open' : ''}`}
            onClick={() => setMenuOpen(v => !v)} aria-label="Menu">
            <span /><span /><span />
          </button>

          <nav className={`nav${menuOpen ? ' open' : ''}`}>
            <a href="#sobre"      className="nav__a" onClick={() => setMenuOpen(false)}>Sobre</a>
            <a href="#servico"    className="nav__a" onClick={() => setMenuOpen(false)}>Serviço</a>
            <a href="#pilares"    className="nav__a" onClick={() => setMenuOpen(false)}>Como atuamos</a>
            <a href="#viagens"    className="nav__a" onClick={() => setMenuOpen(false)}>Viagens</a>
            <a href="#resultados" className="nav__a" onClick={() => setMenuOpen(false)}>Resultados</a>
            <button className="nav__cta" onClick={() => { setMenuOpen(false); openWA(); }}>
              Falar agora
            </button>
          </nav>
        </div>
      </header>

      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero__photo-wrap">
          <img src="/images/Capa.png" alt="" className="hero__photo" />
          <div className="hero__mask" />
        </div>

        <div className="hero__content">
          <p className="hero__pre">Gestão de Milhas · Business &amp; First Class · Hotéis de Luxo</p>

          <h1 className="hero__h1">
            Economia <br />
            <span className="hero__h1--lt">Comprovada.</span><br />
            Nós cuidamos<br />
            <span className="hero__h1--lt">de tudo.</span>
          </h1>

          <p className="hero__sub">
            Gestão completa de pontos e milhas, reservas em Business e First Class,
            hotéis de luxo e suporte full-service. Nosso cliente apenas escolhe o destino e faz as malas.
          </p>

          <button className="hero__cta" onClick={() => openWA()}>
            Falar com o time agora
          </button>

          <div className="hero__proof">
            <span>+5 anos de atuação</span>
            <span className="hp__sep">·</span>
            <span>R$ 2M+ economizados</span>
            <span className="hp__sep">·</span>
            <span>Emissões Business &amp; First</span>
            <span className="hp__sep">·</span>
            <span>Resorts All Inclusive</span>
            <span className="hp__sep">·</span>
          </div>
        </div>

        <div className="hero__scroll-line" />
      </section>

      {/* ── SOBRE ── */}
      <section className="sec sec--off" id="sobre">
        <div className="wrap about">
          <Fade className="about__photo">
            <div className="about__frame">
              <img src="/images/Sobre.png" alt="Guilherme Vieira" loading="lazy" />
              <div className="about__frame-cap">
                <strong>Guilherme Vieira</strong>
                <span>Fundador · GVS Vip</span>
              </div>
            </div>
          </Fade>
          <Fade delay={0.1} className="about__copy">
            <p className="label">Fundador</p>
            <h2 className="h2">Guilherme Vieira</h2>
            <p className="about__p">
              Nascido em Balneário Camboriú e formado em Engenharia Civil, construimos nossa trajetória unindo visão estratégica, gestão e excelência em atendimento de alto padrão.
              Há mais de 5 anos atuamos como especialistas em emissões avançadas de passagens em Classe Executiva e Primeira Classe, gerenciando viagens para executivos, empresários e famílias de alto patrimônio que valorizam conforto, exclusividade e otimização inteligente de recursos.
              A GVS não é uma agência de viagens, somos um serviço privado com metodologia exclusiva de gestão estratégica de viagens. Ao se tornar cliente, você não contrata apenas emissões de passagens: você passa a contar com um departamento completo dedicado a cuidar de cada detalhe e planejamento, com todo o suporte e acompanhamento proximo e humanizado.
              Nossa missão é elevar o padrão das suas viagens, com muita eficiencia e exclusividade, utilizando nossa expertise em pontos e milhas, benefícios e oportunidades que normalmente não estão disponíveis ao público em geral.
            </p>
           <div className="about__stats">
              <div className="astat">
    <div className="astat__icon">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.1">
        <path d="M12 2.5l2.1 1.6 2.6-.3 1 2.4 2.3 1.2-.6 2.6.6 2.6-2.3 1.2-1 2.4-2.6-.3L12 21.5l-2.1-1.6-2.6.3-1-2.4-2.3-1.2.6-2.6-.6-2.6 2.3-1.2 1-2.4 2.6.3z"
              strokeLinejoin="round"/>
        <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
    <span className="astat__v">Economia Comprovada</span>
    <span className="astat__l">100% Business &amp; First Class.</span>
  </div>
  <div className="astat">
    <div className="astat__icon">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.1">
        <circle cx="12" cy="12" r="9"/>
        <path d="M15.5 8.5l-2 5-5 2 2-5z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
    <span className="astat__v">Estratégia Inteligente</span>
    <span className="astat__l">Faremos uma análise do seu perfil, com as melhores oportunidades do mercado.</span>
  </div>

  <div className="astat">
    <div className="astat__icon">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.1">
        <path d="M4 13v-1a8 8 0 0116 0v1" strokeLinecap="round"/>
        <rect x="2.5" y="13" width="4" height="6" rx="1.6"/>
        <rect x="17.5" y="13" width="4" height="6" rx="1.6"/>
        <path d="M19.5 19v.5a2.5 2.5 0 01-2.5 2.5h-2.5" strokeLinecap="round"/>
      </svg>
    </div>
    <span className="astat__v">Suporte Full-Service</span>
    <span className="astat__l">Do inicio ao fim da sua viagem, cuidaremos de tudo para você.</span>
  </div>

  <div className="astat">
    <div className="astat__icon">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.1">
        <path d="M6 3h12l3 5-9 13L3 8z" strokeLinejoin="round"/>
        <path d="M3 8h18M9 3l-3 5 6 13 6-13-3-5" strokeLinejoin="round"/>
      </svg>
    </div>
    <span className="astat__v">Acesso ao Melhor</span>
    <span className="astat__l">Parceiros exclusivos, acesso aos melhores hotéis do mundo.</span>
  </div>
</div>
            <button className="btn-dark" onClick={() => openWA()}>Falar com nossa equipe</button>
          </Fade>
        </div>
      </section>

      {/* ── SERVIÇO ── */}
      <section className="sec" id="servico">
        <div className="wrap">
          <Fade className="sec__head">
            <h2 className="h2">Não somos uma agência.<br /><em>Somos concierge vip.</em></h2>
            <p className="h2__sub">
              Ao se tornar cliente da GVS VIP, você passa a contar com um departamento privado de gestão de viagens, cuidaremos de cada etapa da sua jornada —
              desde as estratégias de pontos e milhas até seu retorno para casa.
            </p>
          </Fade>
          <p className="label">O que entregamos</p>
          <div className="services">
            {[
              {
                n: '01',
                t: 'Gestão de milhas',
                d: 'Indicaremos os melhores cartões, transferindo e maximizando seus pontos e milhas, nas melhores janelas, mantendo seu portfólio sempre otimizado.',
              },
              {
                n: '02',
                t: 'Voos Business & First',
                d: 'Emitimos suas passagens executivas e de primeira classe com o máximo de economia — sem você precisar pesquisar nada.',
              },
              {
                n: '03',
                t: 'Hotéis de Luxo',
                d: 'Reservas nas redes Fairmont, Raffles, Rixos, Mandarin Oriental, Hyatt, Pullman, Sofitel entre outros. Muitos não sabem mais milhas não utilizamos somente para voos.',
                highlight: true,
              },
              {
                n: '04',
                t: 'Suporte full-service',
                d: 'Uma equipe dedicada disponível para qualquer necessidade — mudanças de rota, upgrades, novas reservas, novos roteiros ou emergências, sempre com atendimento prioritário.',
              },
            ].map((s, i) => (
              <Fade key={i} delay={i * 0.07} className={`service${s.highlight ? ' service--hotel' : ''}`}>
                <span className="service__n">{s.n}</span>
                <h3 className="service__t">{s.t}</h3>
                <p className="service__d">{s.d}</p>
              </Fade>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMO ATUO / PILARES ── */}
      <section className="sec sec--off" id="pilares">
        <div className="wrap">
          <Fade className="sec__head">
            <p className="label">Como atuo</p>
            <h2 className="h2">Gestão de Milhas Premium é<br /><em>tempo livre para nossos clientes com muita economia e resultados que surpreendem.</em></h2>
            <p className="h2__sub">
              Nós cuidamos de toda a estrutura — planejamento, otimização e estratégias avançadas — para que você
              viva experiências memoráveis com seus pontos e milhas, sem precisar entender regras, programas,
              detalhes técnicos ou ler as entrelinhas de contrato. Seu tempo é o seu ativo mais valioso. Nossa missão é garantir que ele seja investido vivendo, enquanto nós cuidamos de todas as estratégias por trás de cada viagem.
              Apenas escolha o destino e faça as malas.
            </p>
          </Fade>

          <div className="pillars">
            {PILLARS.map((p, i) => (
              <Fade key={i} delay={i * 0.06} className="pillar">
                <span className="pillar__n">{p.n}</span>
                <div className="pillar__body">
                  <h3 className="pillar__t">{p.t}</h3>
                  <p className="pillar__d">{p.d}</p>
                </div>
              </Fade>
            ))}
          </div>

          <Fade delay={0.1}>
            <div className="pillars__close">
              <p>
                Clientes com perfil <strong>Black ou Infinite</strong> já têm um enorme potencial nas
                mãos. Mas, sem estratégia, grande parte desse valor se perde em resgates simples e
                decisões ineficientes. Com gestão profissional, você viaja em executiva pagando preço
                de econômica e se hospeda em hotel 5 estrelas pelo valor de um 3 ou 4 estrelas.
                Viajar bem não deveria ser complicado — e não é.
              </p>
              <button className="btn-dark" onClick={() => openWA()}>Quero essa gestão</button>
            </div>
          </Fade>
        </div>
      </section>

      {/* ── VIAGENS: VOOS & HOTÉIS ── */}
      <section className="sec sec--dark" id="viagens">
        <div className="wrap">
          <Fade className="sec__head">
            <p className="label label--dim">Exemplos reais · Voos e Hotéis</p>
            <h2 className="h2 h2--w">Economia comprovada<br /><em>em cada detalhe da viagem.</em></h2>
          </Fade>

          {/* Tabs */}
          <div className="vtabs">
            <button
              className={`vtab${viagens_tab === 'voos' ? ' vtab--active' : ''}`}
              onClick={() => setViagensTab('voos')}>
              <svg viewBox="0 0 24 24" fill="none" width="14" height="14">
                <path d="M21 16l-3-3H9l-3-9-2 .5 2.5 8.5H3l-1 2 4 1 1 4 2-1V17h9l3 3 2-1-2-3z" fill="currentColor" opacity=".7"/>
              </svg>
              Passagens aéreas
            </button>
            <button
              className={`vtab${viagens_tab === 'hoteis' ? ' vtab--active' : ''}`}
              onClick={() => setViagensTab('hoteis')}>
              <svg viewBox="0 0 24 24" fill="none" width="14" height="14">
                <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" stroke="currentColor" strokeWidth="1.8" fill="none"/>
                <path d="M9 22V12h6v10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
              Hotéis de luxo
            </button>
          </div>

          {/* Voos */}
          {viagens_tab === 'voos' && (
            <div className="trips">
              <div className="trips__nav">
                {TRIPS.map((t, i) => (
                  <button key={i}
                    className={`tn${trip === i ? ' active' : ''}`}
                    onClick={() => setTrip(i)}>
                    <span className="tn__route">{t.route}</span>
                    <span className="tn__cabin">{t.cabin}</span>
                  </button>
                ))}
              </div>
              <div className="trips__stage">
                {TRIPS.map((t, i) => (
                  <div key={i} className={`tp${trip === i ? ' active' : ''}`}>
                    <div className="tp__img" onClick={() => setLightbox(t.img)}>
                      <img src={t.img} alt={t.route} loading="lazy" />
                      <div className="tp__img-over" />
                      <span className="tp__badge">{t.pct}% off</span>
                    </div>
                    <div className="tp__info">
                      <p className="tp__cabin">{t.cabin}</p>
                      <h3 className="tp__route">{t.route}</h3>
                      <div className="tp__economy">
                        <div className="tp__tag">{t.pct}% off</div>
                      </div>
                      <button className="tp__cta" onClick={() => openWA(`Olá, quero uma viagem assim: ${t.route}`)}>
                        Quero este roteiro →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Hotéis */}
          {viagens_tab === 'hoteis' && (
            <div className="trips">
              <div className="trips__nav">
                {HOTELS.map((h, i) => (
                  <button key={i}
                    className={`tn${hotel === i ? ' active' : ''}`}
                    onClick={() => setHotel(i)}>
                    <span className="tn__route">{h.name}</span>
                    <span className="tn__cabin">{h.local}</span>
                  </button>
                ))}
              </div>
              <div className="trips__stage">
                {HOTELS.map((h, i) => (
                  <div key={i} className={`tp${hotel === i ? ' active' : ''}`}>
                    <div className="tp__img" onClick={() => setLightbox(h.img)}>
                      <img src={h.img} alt={h.name} loading="lazy" />
                      <div className="tp__img-over" />
                      <span className="tp__badge">{h.pct}% off</span>
                      <span className="tp__hotel-label">Hotel</span>
                    </div>
                    <div className="tp__info">
                      <p className="tp__cabin">{h.noites}</p>
                      <h3 className="tp__route">{h.name}</h3>
                      <p className="tp__local">{h.local}</p>
                      <div className="tp__economy">
                        <div className="tp__tag">{h.pct}% off</div>
                      </div>
                      <button className="tp__cta" onClick={() => openWA(`Olá, quero reservar um hotel assim: ${h.name} em ${h.local}`)}>
                        Quero este hotel →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── RESULTADOS ── */}
      <section className="sec" id="resultados">
        <div className="wrap">
          <Fade className="sec__head">
            <p className="label">Resultados de clientes</p>
            <h2 className="h2">Economia comprovada<br /><em>em números reais</em></h2>
          </Fade>

          <div className="cases">
            {CASES.map((c, i) => (
              <Fade key={i} delay={i * 0.08}>
                <div className="case" onClick={() => setLightbox(c.img)}>
                  <div className="case__img">
                    <img src={c.img} alt={c.name} loading="lazy" />
                    <div className="case__over">Ver →</div>
                  </div>
                  <div className="case__body">
                    <p className="case__name">{c.name}</p>
                    <div className="case__nums">
                      <span className="case__orig">{c.orig}</span>
                      <span>→</span>
                      <span className="case__saved">{c.saved}</span>
                    </div>
                    <div className="case__bar">
                      <div className="case__fill" style={{ width: `${c.pct}%` }} />
                    </div>
                    <p className="case__pct">{c.pct}% economizados</p>
                  </div>
                </div>
              </Fade>
            ))}
          </div>
        </div>
      </section>

      {/* ── GARANTIA ── */}
      <section className="garantia">
        <div className="wrap garantia__in">
          <div className="garantia__icon">
            <svg viewBox="0 0 24 24" fill="none" width="28" height="28">
              <path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.25C17.25 22.15 21 17.25 21 12V7L12 2z"
                stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" fill="none"/>
              <path d="M9 12l2 2 4-4" stroke="rgba(255,255,255,0.8)" strokeWidth="1.5"
                strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="garantia__body">
            <h3 className="garantia__title">Garantia Contratual de Resultado</h3>
            <p className="garantia__text">
              O risco é meu, não seu. Firmamos em contrato: <strong>se, em 12 meses, a economia que eu
              gerar para você não for, no mínimo, o dobro do valor investido na consultoria, devolvo
              100% do que você pagou.</strong> Você não está comprando uma promessa — está comprando um
              resultado garantido por escrito.
            </p>
            <p className="garantia__fine">Critério objetivo, métricas transparentes e auditáveis, sem letras miúdas. O risco financeiro é nosso.</p>
          </div>
        </div>
      </section>

      {/* ── CONTATO ── */}
      <section className="sec sec--dark" id="contato">
        <div className="wrap contact">
          <Fade className="contact__left">
            <p className="label label--dim">Acesso ao serviço</p>
            <h2 className="h2 h2--w">Diagnóstico<br /><em>gratuito e personalizado.</em></h2>
            <p className="contact__sub">
              Preencha o formulário. Um especialista analisa seu perfil e apresenta
              sua estratégia de economia em menos de 2 horas.
            </p>
            <div className="contact__items">
              <div className="ci">
                <span className="ci__n">01</span>
                <p>Você nos conta seus destinos e cartões</p>
              </div>
              <div className="ci">
                <span className="ci__n">02</span>
                <p>Nós montamos sua estratégia de pontos</p>
              </div>
              <div className="ci">
                <span className="ci__n">03</span>
                <p>Você embarca — voos e hotéis. Nós cuidamos de tudo</p>
              </div>
            </div>
            <p className="contact__note">
              Serviço disponível para gastos acima de <strong>R$ 15.000/mês</strong>
            </p>
          </Fade>

          <Fade delay={0.1} className="contact__form-wrap">
            {submitted ? (
              <div className="fsuccess">
                <div className="fsuccess__ring">✓</div>
                <h3>Recebemos.</h3>
                <p>Você será contactado em até 2 horas.</p>
                {sendError && (
                  <p className="fsuccess__warn">
                    (O WhatsApp foi aberto normalmente. O e-mail de confirmação pode não ter chegado — sem problema.)
                  </p>
                )}
              </div>
            ) : (
              <form className="form" onSubmit={handleSubmit}>
                <div className="ff">
                  <label>Nome completo</label>
                  <input name="nome" type="text" placeholder="Seu nome completo"
                    value={form.nome} onChange={e => setForm(p => ({ ...p, nome: e.target.value }))} required />
                </div>
                <div className="ff">
                  <label>WhatsApp (com DDD)</label>
                  <input name="telefone" type="tel" placeholder="(47) 99999-9999"
                    value={form.telefone} onChange={e => setForm(p => ({ ...p, telefone: e.target.value }))} required />
                </div>
                <div className="ff">
                  <label>E-mail</label>
                  <input name="email" type="email" placeholder="seu@email.com"
                    value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} required />
                </div>
                <div className="ff">
                  <label>Média de gastos mensal no cartão</label>
                  <select name="gasto" value={form.gasto}
                    onChange={e => setForm(p => ({ ...p, gasto: e.target.value }))} required>
                    <option value="">Selecione</option>
                    <option>R$ 15.000 – R$ 30.000</option>
                    <option>R$ 30.000 – R$ 50.000</option>
                    <option>R$ 50.000 – R$ 100.000</option>
                    <option>Acima de R$ 100.000</option>
                  </select>
                </div>
                <div className="ff">
                  <label>Viagens por ano</label>
                  <select name="viagens" value={form.viagens}
                    onChange={e => setForm(p => ({ ...p, viagens: e.target.value }))} required>
                    <option value="">Selecione</option>
                    <option>1 – 2 viagens</option>
                    <option>3 – 5 viagens</option>
                    <option>6 – 10 viagens</option>
                    <option>Mais de 10 viagens</option>
                  </select>
                </div>
                <button type="submit" className="form__btn" disabled={sending}>
                  {sending ? 'Enviando…' : 'Solicitar diagnóstico gratuito →'}
                </button>
                <p className="form__note">
                  Ou fale diretamente: <button type="button" className="form__wa" onClick={() => openWA()}>WhatsApp</button>
                </p>
              </form>
            )}
          </Fade>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <div className="footer__in">
          <div className="footer__left">
            <div className="logo logo--ft">
              <span className="logo__gvs">GVS</span>
              <span className="logo__dot">·</span>
              <span className="logo__milhas">Milhas</span>
            </div>
            <p>Concierge vip.<br />Voos Business &amp; First · Hotéis de Luxo.</p>
          </div>
          <div className="footer__links">
            <a href="#sobre">Sobre</a>
            <a href="#servico">Serviço</a>
            <a href="#pilares">Como atuo</a>
            <a href="#viagens">Viagens &amp; Hotéis</a>
            <a href="#resultados">Resultados</a>
          </div>
          <div className="footer__contact">
            <button onClick={() => openWA()}>WhatsApp: (47) 99720-2400</button>
            <button onClick={() => window.open('https://instagram.com/gvsvip', '_blank')}>Instagram: @gvsvip</button>
            <span>gvsmilhas@gmail.com</span>
          </div>
        </div>
        <div className="footer__btm">
          <p>© {new Date().getFullYear()} GVS Vip</p>
        </div>
      </footer>

      {/* ── LIGHTBOX ── */}
      {lightbox && <Modal src={lightbox} onClose={() => setLightbox(null)} />}

      {/* ── WA FAB ── */}
      <button className="wa" onClick={() => openWA()} aria-label="WhatsApp">
        <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>
      </button>
    </div>
  );
}
import React, { useState, useEffect } from 'react';

function App() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    cidade: '',
    servico: '',
    mensagem: '',
    gastoCartao: '',      // new field
    viagensPorAno: '',    // new field
    viajouExterior: ''    // new field
  });
  const [submitted, setSubmitted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Slides do carrossel - Luxo e Exclusividade
  const heroSlides = [
    {
      id: 1,
      title: 'Destinos que Inspiram',
      subtitle: 'Transforme suas milhas em experiências inesquecíveis nos destinos mais exclusivos do mundo.',
      image: '/images/QATAR.webp',
      cta: 'Solicitar Consultoria'
    },
    {
      id: 2,
      title: 'Voe em Primeira Classe',
      subtitle: 'Acesse o melhor da aviação mundial com até 80% de economia usando suas milhas.',
      image: '/images/PARIS.jpg',
      cta: 'Quero Voar com Luxo'
    },
    {
      id: 3,
      title: 'Sua Jornada Começa Aqui',
      subtitle: 'Gestão especializada de milhas para quem busca conforto, exclusividade e inteligência financeira.',
      image: '/images/DUBAI.jpg',
      cta: 'Falar com Especialista'
    },
    {
      id: 4,
      title: 'Experiências Únicas',
      subtitle: 'De hotéis 5 estrelas a pacotes premium, realizamos seus sonhos de viagem.',
      image: '/images/VENEZA.webp',
      cta: 'Descobrir Experiências'
    }
  ];

  // Destinos e Experiências Exclusivas
  const luxuryDestinations = [
    {
      id: 1,
      name: 'Paris: Oásis de Luxo',
      description: 'Voe de executiva para Paris e hospede-se em hotéis icônicos como o Ritz ou Four Seasons. Inclui passeios privativos e experiências gastronômicas exclusivas.',
      image: '/images/paris-luxury.png',
      tipo: 'Destino Exclusivo',
    },
    {
      id: 2,
      name: 'Maldivas: Paraíso Privado',
      description: 'Bangalôs sobre a água, traslados VIP e experiências submarinas. Voos em primeira classe com as melhores companhias aéreas.',
      image: '/images/maldives-luxury.jpg',
      tipo: 'Destino Exclusivo',
    },
    {
      id: 3,
      name: 'Suiça: Alpes Elegantes',
      description: 'Temporada de esqui em St. Moritz, hospedagem em chalés luxuosos e traslados de helicóptero. Experiência única para os mais exigentes.',
      image: '/images/swiss-alps.jpg',
      tipo: 'Destino Exclusivo',
    },
    {
      id: 4,
      name: 'Japão: Tradição e Modernidade',
      description: 'Roteiro exclusivo por Tóquio e Kyoto, hospedagem em ryokans tradicionais e experiências culturais privativas.',
      image: '/images/japan-luxury.jpg',
      tipo: 'Destino Exclusivo',
    },
    {
      id: 5,
      name: 'Qatar: Luxo no Oriente Médio',
      description: 'Explore Doha com estilo: hospedagem no St. Regis Doha, passeios pelo Souq Waqif, Museu de Arte Islâmica e jantar no deserto. Voe em primeira classe com a Qatar Airways.',
      image: '/images/QATAR.webp',
      tipo: 'Destino Exclusivo',
    },
    {
      id: 6,
      name: 'Dubai: Arquitetura e Opulência',
      description: 'Hospede-se no Burj Al Arab ou Atlantis The Palm, visite o Burj Khalifa, faça compras nos melhores shoppings e desfrute de experiências únicas no deserto.',
      image: '/images/DUBAI.jpg',
      tipo: 'Destino Exclusivo',
    },
  ];

  const testimonials = [
    {
      id: 1,
      name: 'Ricardo Albuquerque',
      text: 'A GVS Milhas transformou completamente minha forma de viajar. Conheci lugares que sempre sonhei pagando uma fração do valor. Atendimento impecável!',
      rating: 5,
      city: 'São Paulo',
      travel: 'Paris - Primeira Classe'
    },
    {
      id: 2,
      name: 'Patrícia Mendes',
      text: 'Nunca imaginei que poderia voar de primeira classe para as Maldivas. A equipe é extremamente competente e o resultado superou todas as expectativas.',
      rating: 5,
      city: 'Rio de Janeiro',
      travel: 'Maldivas - Primeira Classe'
    },
    {
      id: 3,
      name: 'Fernando Costa',
      text: 'Serviço de altíssimo nível. Me senti único e especial desde o primeiro contato. Recomendo a todos que buscam exclusividade e economia inteligente.',
      rating: 5,
      city: 'Brasília',
      travel: 'Suíça - Executiva'
    }
  ];

  // Equipe de Especialistas
  const teamMembers = [
    {
      id: 1,
      name: 'Guilherme Vieira',
      role: 'CEO & Especialista Sênior',
      description: 'Mais de 12 anos de experiência no mercado de programas de fidelidade. Especialista em estratégias de acúmulo acelerado e resgates de alto valor.',
      image: '/images/guilherme-vieira.jpeg',
      whatsapp: 'https://wa.me/5547997202400?text=Olá%20Guilherme%20gostaria%20de%20saber%20mais'
    },
    {
      id: 2,
      name: 'Ana Paula',
      role: 'Gestora de Experiências',
      description: 'Especialista em criar roteiros personalizados e experiências únicas para clientes de alta renda. Formada em Hotelaria Internacional.',
      image: '/images/ana-paula.jpeg',
      whatsapp: 'https://wa.me/5547997202400?text=Olá%20Ana%20gostaria%20de%20saber%20mais'
    },
  ];

  // Galeria de Experiências dos Clientes
  const galleryImages = [
    { id: 1, src: '/images/cliente-paris.jpeg', alt: 'FIRST QATAR', desc: 'FIRST QATAR', cliente: 'Economia total 68,81%' },
    { id: 2, src: '/images/cliente-maldives.jpeg', alt: 'BUSINESS AIR FRANCE', desc: 'BUSINESS AIR FRANCE', cliente: 'Economia total 72,07%' },
    { id: 3, src: '/images/cliente-swiss.jpeg', alt: 'BUSINESS TURKISH', desc: 'BUSINESS TURKISH', cliente: 'Economia total 85,95%' },
    { id: 4, src: '/images/cliente-singapore.jpeg', alt: 'BUSINESS SINGAPORE', desc: 'BUSINESS SINGAPORE', cliente: 'Economia total 45,84%' },
    { id: 5, src: '/images/cliente-italy.jpeg', alt: 'BUSINESS SUITE', desc: 'BUSINESS SUITE', cliente: 'Economia total 81,78%' },
    { id: 6, src: '/images/cliente-qatar.jpeg', alt: 'BUSINESS QATAR', desc: 'BUSINESS QATAR', cliente: 'Economia total 75,83%' },  
  ];

  // Verificar se está em dispositivo móvel
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Carrossel automático
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const handleNavClick = () => {
    if (isMobile) {
      setIsMenuOpen(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const whatsappMessage = `Olá, Guilherme Vieira! Vi o site da GVS Milhas e gostaria de uma consultoria exclusiva.%0A%0A` +
      `*Nome:* ${formData.nome}%0A` +
      `*E-mail:* ${formData.email}%0A` +
      `*Telefone:* ${formData.telefone}%0A` +
      `*Cidade:* ${formData.cidade || 'Não informada'}%0A` +
      `*Gasto mensal no cartão:* ${formData.gastoCartao || 'Não informado'}%0A` +
      `*Viagens por ano:* ${formData.viagensPorAno || 'Não informado'}%0A` +
      `*Já viajou para fora do país:* ${formData.viajouExterior || 'Não informado'}%0A` +
      `*Interesse:* ${formData.servico}%0A` +
      `*Mensagem:* ${formData.mensagem || 'Sem detalhes adicionais'}`;

    const whatsappNumber = '5547997202400';

    window.open(`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`, '_blank');

    setFormData({
      nome: '',
      email: '',
      telefone: '',
      cidade: '',
      servico: '',
      mensagem: '',
      gastoCartao: '',
      viagensPorAno: '',
      viajouExterior: ''
    });

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
    }, 5000);
  };

  const solicitarDestino = (destinoNome, destinoPreco) => {
    const whatsappMessage = `Olá, Guilherme! Vi no site o destino *${destinoNome}* (${destinoPreco}) e gostaria de mais informações sobre como posso realizar essa experiência usando minhas milhas. Podemos conversar?`;
    const whatsappNumber = '5547997202400';
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`, '_blank');
  };

  const openWhatsApp = () => {
    const whatsappMessage = `Olá, Guilherme! Gostaria de saber mais sobre como posso usar minhas milhas para viajar com luxo e economia.`;
    const whatsappNumber = '5547997202400';
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`, '_blank');
  };

  const openWhatsAppAna = () => {
    const whatsappMessage = `Olá, Ana! Gostaria de saber mais sobre como posso usar minhas milhas para viajar com luxo e economia.`;
    const whatsappNumber = '5547997202400';
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`, '_blank');
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    handleNavClick();
  };

  const openInstagram = () => {
    window.open('https://www.instagram.com/gvsvip', '_blank');
  };

  return (
    <div className="App">
      {/* Header */}
      <header className="header">
        <div className="container">
          <div className="logo-container">
            <div className="logo">
               <span>GVS Milhas - Gestão de Milhas</span> 
            </div>
          </div>
          
          <button 
            className={`menu-toggle ${isMenuOpen ? 'active' : ''}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
          
          <nav className={`nav ${isMenuOpen ? 'open' : ''}`}>
            <a href="#" onClick={(e) => { e.preventDefault(); scrollToTop(); handleNavClick(); }}>Início</a>
            <a href="#destinos" onClick={handleNavClick}>Destinos</a>
            <a href="#sobre" onClick={handleNavClick}>Sobre Nós</a>
            <a href="#equipe" onClick={handleNavClick}>Equipe</a>
            <a href="#galeria" onClick={handleNavClick}>Galeria</a>
            <a href="#depoimentos" onClick={handleNavClick}>Depoimentos</a>
            <a href="#contato" onClick={handleNavClick} className="nav-cta">Consultoria Gratuita</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-luxury">
        <div className="hero-background">
          {heroSlides.map((slide, index) => (
            <div
              key={slide.id}
              className={`hero-bg-layer ${index === currentSlide ? 'active' : ''}`}
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="hero-bg-overlay"></div>
            </div>
          ))}
        </div>

        <div className="hero-particles"></div>

        <div className="container hero-container">
          <div className="hero-content">

            <h1 className="hero-title">
              <span className="title-word">{heroSlides[currentSlide].title}</span>
            </h1>

            <p className="hero-description">
              {heroSlides[currentSlide].subtitle}
            </p>
            
            <div className="hero-quick-links">
              <div className="quick-link" onClick={() => solicitarDestino('Destinos de Luxo', 'Sob Consulta')}>
                <span className="quick-icon">✈️</span>
                <span>Destinos Exclusivos</span>
              </div>
              <div className="quick-link" onClick={() => solicitarDestino('Consultoria Premium', 'Sob Consulta')}>
                <span className="quick-icon">📊</span>
                <span>Consultoria</span>
              </div>
              <div className="quick-link" onClick={() => solicitarDestino('Primeira Classe', 'Sob Consulta')}>
                <span className="quick-icon">💎</span>
                <span>Primeira Classe</span>
              </div>
              <div className="quick-link" onClick={() => solicitarDestino('Pacotes Premium', 'Sob Consulta')}>
                <span className="quick-icon">🏆</span>
                <span>Pacotes Premium</span>
              </div>
            </div>

            <div className="hero-buttons">
              <a href="#contato" className="btn btn-primary" onClick={handleNavClick}>
                <span>✨</span>
                Começar Jornada
              </a>
              <button className="btn btn-secondary" onClick={openWhatsApp}>
                <span>💬</span>
                Falar no WhatsApp
              </button>
            </div>

            <div className="hero-stats">
              <div className="stat">
                <span className="stat-number">20+</span>
                <span className="stat-label">Clientes Satisfeitos</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat">
                <span className="stat-number">40+</span>
                <span className="stat-label">Destinos Exclusivos</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat">
                <span className="stat-number">R$ 800k+</span>
                <span className="stat-label">Economia Gerada</span>
              </div>
            </div>
          </div>
        </div>

        <button className="hero-control hero-control-prev" onClick={prevSlide}>
          <span>←</span>
        </button>
        <button className="hero-control hero-control-next" onClick={nextSlide}>
          <span>→</span>
        </button>

        <div className="hero-indicators">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentSlide ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>

        <div className="scroll-hint">
          <span>Explore</span>
          <div className="scroll-line"></div>
        </div>
      </section>

      {/* Destinos e Experiências */}
      <section id="destinos" className="section destinations">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Experiências Exclusivas</span>
            <h2 className="section-title">Destinos que Transformam</h2>
            <p className="section-subtitle">Descubra lugares extraordinários que suas milhas podem te levar</p>
          </div>

          <div className="destinations-grid">
            {luxuryDestinations.map(destiny => (
              <div key={destiny.id} className="destination-card">
                <div className="card-image">
                  <img src={destiny.image} alt={destiny.name} />
                  <div className="card-badge">{destiny.tipo}</div>
                </div>
                <div className="card-content">
                  <h3>{destiny.name}</h3>
                  <p>{destiny.description}</p>
                  <div className="card-footer">
                    <span className="price">{destiny.preco}</span>
                    <button 
                      className="btn-card"
                      onClick={() => solicitarDestino(destiny.name, destiny.preco)}
                    >
                      Quero Saber Mais
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sobre Nós */}
      <section id="sobre" className="section about">
        <div className="container">
          <div className="about-content">
            <div className="about-text">
              <span className="section-tag">Quem Somos</span>
              <h2 className="section-title">Sua Jornada Começa com a GVS Milhas</h2>
              <p>
                Fundada por <strong>Guilherme Vieira</strong>, a <strong>GVS Milhas</strong> nasceu da paixão por transformar milhas em experiências extraordinárias. 
                Atendemos um público seleto que busca o melhor do mundo através de uma gestão inteligente e personalizada.
              </p>
              <p>
                Nossa metodologia exclusiva combina análise estratégica de gastos, conhecimento profundo dos programas de fidelidade e uma curadoria 
                impecável de destinos e experiências. Resultado: você viaja em primeira classe, hospeda-se nos melhores hotéis do mundo e economiza 
                até 80% em comparação aos valores de mercado.
              </p>
              <div className="about-features">
                <div className="feature">
                  <span className="feature-icon">🎯</span>
                  <span>Estratégia Personalizada</span>
                </div>
                <div className="feature">
                  <span className="feature-icon">💎</span>
                  <span>Atendimento VIP</span>
                </div>
                <div className="feature">
                  <span className="feature-icon">✈️</span>
                  <span>Primeira Classe</span>
                </div>
                <div className="feature">
                  <span className="feature-icon">🏨</span>
                  <span>Hotéis 5 Estrelas</span>
                </div>
              </div>
              <div className="about-stats">
                <div className="stat-item">
                  <span className="stat-number">5+</span>
                  <span className="stat-label">Anos de Experiência</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">150+</span>
                  <span className="stat-label">Viagens Realizadas</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">100%</span>
                  <span className="stat-label">Clientes Satisfeitos</span>
                </div>
              </div>
            </div>
            <div className="about-image">
              <img src="/images/guilherme-vieira-about.jpeg" alt="Guilherme Vieira - GVS Milhas" />
              <div className="image-caption">Guilherme Vieira - Fundador</div>
            </div>
          </div>
        </div>
      </section>

      {/* Equipe */}
      <section id="equipe" className="section team">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Especialistas</span>
            <h2 className="section-title">Quem Faz Acontecer</h2>
            <p className="section-subtitle">Profissionais dedicados a transformar seus sonhos em realidade</p>
          </div>

          <div className="team-grid">
            {teamMembers.map(member => (
              <div key={member.id} className="team-card">
                <div className="team-image">
                  <img src={member.image} alt={member.name} />
                </div>
                <div className="team-info">
                  <h3>{member.name}</h3>
                  <p className="team-role">{member.role}</p>
                  <p className="team-description">{member.description}</p>
                  <button 
                    className="team-contact" 
                    onClick={() => window.open(member.whatsapp, '_blank')}
                  >
                    💬 Falar com {member.name.split(' ')[0]}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Galeria */}
      <section id="galeria" className="section gallery">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Memórias Inesquecíveis</span>
            <h2 className="section-title">Nossos Viagens pelo Mundo</h2>
            <p className="section-subtitle">Fotos reais de experiências que proporcionamos</p>
          </div>

          <div className="gallery-grid">
            {galleryImages.map(image => (
              <div key={image.id} className="gallery-item">
                <img src={image.src} alt={image.alt} />
                <div className="gallery-overlay">
                  <p className="gallery-desc">{image.desc}</p>
                  <p className="gallery-client">{image.cliente}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Depoimentos */}
      <section id="depoimentos" className="section testimonials">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Depoimentos</span>
            <h2 className="section-title">Quem Confia no Nosso Trabalho</h2>
            <p className="section-subtitle">Histórias reais de clientes que transformaram suas milhas em experiências únicas</p>
          </div>

          <div className="testimonials-grid">
            {testimonials.map(testimonial => (
              <div key={testimonial.id} className="testimonial-card">
                <div className="testimonial-quote">“</div>
                <p className="testimonial-text">{testimonial.text}</p>
                <div className="testimonial-rating">
                  {'★'.repeat(testimonial.rating)}
                </div>
                <div className="testimonial-author">
                  <strong>{testimonial.name}</strong>
                  <span>{testimonial.city}</span>
                  <span className="testimonial-travel">{testimonial.travel}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contato */}
      <section id="contato" className="section contact">
        <div className="container">
          <div className="contact-wrapper">
            <div className="contact-info">
              <span className="section-tag">Comece Agora</span>
              <h2>Transforme suas Milhas em Experiências</h2>
              <p>Preencha o formulário e receba uma consultoria gratuita para descobrir como podemos revolucionar sua forma de viajar.</p>
              <div className="contact-features">
                <div className="contact-feature">
                  <span>✓</span>
                  <span>Diagnóstico 100% Gratuito</span>
                </div>
                <div className="contact-feature">
                  <span>✓</span>
                  <span>Análise Personalizada</span>
                </div>
                <div className="contact-feature">
                  <span>✓</span>
                  <span>Sem Compromisso</span>
                </div>
              </div>
            </div>

            <div className="contact-form-wrapper">
              {submitted ? (
                <div className="success-message">
                  <div className="success-icon">✈️</div>
                  <h3>Solicitação Enviada!</h3>
                  <p>Em breve um de nossos especialistas entrará em contato.</p>
                  <p>Você será redirecionado para o WhatsApp.</p>
                </div>
              ) : (
                <form className="contact-form" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <input
                      type="text"
                      name="nome"
                      placeholder="Nome Completo"
                      value={formData.nome}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="email"
                      name="email"
                      placeholder="E-mail"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="tel"
                      name="telefone"
                      placeholder="WhatsApp"
                      value={formData.telefone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      name="cidade"
                      placeholder="Cidade"
                      value={formData.cidade}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  {/* New fields */}
                  <div className="form-group">
                    <input
                      type="text"
                      name="gastoCartao"
                      placeholder="Quanto você gasta por mês no cartão de crédito? (ex: R$ 5.000)"
                      value={formData.gastoCartao}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      name="viagensPorAno"
                      placeholder="Quantas viagens você faz por ano?"
                      value={formData.viagensPorAno}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <select
                      name="viajouExterior"
                      value={formData.viajouExterior}
                      onChange={handleChange}
                    >
                      <option value="">Já viajou para fora do país?</option>
                      <option value="Sim, já viajei">Sim, já viajei</option>
                      <option value="Não, ainda não viajei">Não, ainda não viajei</option>
                      <option value="Viajo frequentemente">Viajo frequentemente</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <select
                      name="servico"
                      value={formData.servico}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Qual seu principal interesse?</option>
                      <option value="Destinos de Luxo">Destinos de Luxo</option>
                      <option value="Consultoria de Milhas">Consultoria de Milhas</option>
                      <option value="Primeira Classe">Primeira Classe</option>
                      <option value="Pacotes Premium">Pacotes Premium</option>
                      <option value="Aprender sobre Milhas">Aprender sobre Milhas</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <textarea
                      name="mensagem"
                      placeholder="Conte-nos seu sonho de viagem..."
                      rows="4"
                      value={formData.mensagem}
                      onChange={handleChange}
                    ></textarea>
                  </div>
                  <button type="submit" className="btn btn-primary btn-full">
                    <span>✨</span> Solicitar Consultoria Gratuita
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <div className="logo">
               <span>GVS Milhas - Gestão de Milhas</span> 
              </div>
              <p>Transformando milhas em experiências extraordinárias desde 2020.</p>
              <div className="social-links">
                <button className="social-link" onClick={openInstagram}>📸 Instagram</button>
                <button className="social-link" onClick={openWhatsApp}>💬 WhatsApp</button>
              </div>
            </div>
            <div className="footer-links">
              <h4>Navegação</h4>
              <a href="#" onClick={(e) => { e.preventDefault(); scrollToTop(); }}>Início</a>
              <a href="#destinos" onClick={handleNavClick}>Destinos</a>
              <a href="#sobre" onClick={handleNavClick}>Sobre Nós</a>
              <a href="#equipe" onClick={handleNavClick}>Equipe</a>
              <a href="#galeria" onClick={handleNavClick}>Galeria</a>
              <a href="#contato" onClick={handleNavClick}>Contato</a>
            </div>
            <div className="footer-contact">
              <h4>Contato</h4>
              <p>💬 WhatsApp: (47) 99720-2400</p>
              <p>✉️ gvsmilhas@gmail.com</p>
              <p>📍 Brasil</p>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} GVS Milhas - Todos os direitos reservados.</p>
            <p>Gestão de Milhas para Clientes Exclusivos</p>
          </div>
        </div>
      </footer>

      {/* WhatsApp Float */}
      <div className="whatsapp-float">
        <button onClick={openWhatsApp}>
          <span>💬</span>
        </button>
      </div>
    </div>
  );
}

export default App;
import React, { useState, useEffect } from 'react';

// Componente Modal para visualizar imagens em tamanho maior
function ImageModal({ image, alt, onClose }) {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEsc);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  return (
    <div className="image-modal-overlay" onClick={onClose}>
      <div className="image-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="image-modal-close" onClick={onClose}>✕</button>
        <img src={image} alt={alt} />
        <p className="image-modal-caption">{alt}</p>
      </div>
    </div>
  );
}

function App() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    gastoCartao: '',
    viagensPorAno: '',
    usaMilhas: '',
    mensagem: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [selectedImage, setSelectedImage] = useState(null);

  // Depoimentos com foco em ROI e estratégia
  const testimonials = [
    {
      id: 1,
      name: 'Patrícia Mendes',
      photo: 'https://randomuser.me/api/portraits/women/2.jpg',
      text: 'Minha estratégia de acúmulo e resgate me gerou R$ 32.500 em ativos. Hoje viajo de primeira classe pagando 85% menos que o valor de mercado.',
      rating: 5,
      roi: 'ROI de 2.847%',
      result: 'R$ 32.500 economizados',
      location: 'Rio de Janeiro, RJ'
    },
    {
      id: 2,
      name: 'Fernando Costa',
      photo: 'https://randomuser.me/api/portraits/men/3.jpg',
      text: 'A gestão estratégica transformou meus gastos operacionais em ativos de alto valor. Mais de R$ 47.000 em economia real no último ano.',
      rating: 5,
      roi: 'ROI de 3.200%',
      result: 'R$ 47.000 economizados',
      location: 'Brasília, DF'
    },
    {
      id: 3,
      name: 'Ana Beatriz Silva',
      photo: 'https://randomuser.me/api/portraits/women/4.jpg',
      text: 'Meu portfólio de milhas passou a render como um investimento. 4 viagens internacionais com economia total de R$ 28.900.',
      rating: 5,
      roi: 'ROI de 2.150%',
      result: 'R$ 28.900 economizados',
      location: 'Belo Horizonte, MG'
    }
  ];

  // Viagens do dono com comparação real de preços
  const ownerTrips = [
    {
      id: 1,
      title: 'FIRST QATAR',
      destination: 'DOHA - PARIS',
      originalPrice: 'R$ 42.800',
      paidPrice: 'R$ 13.350',
      economy: '68,81%',
      description: 'Primeira Classe - Resgate estratégico',
      image: '/images/cliente-paris.jpeg',
      icon: '✈️'
    },
    {
      id: 2,
      title: 'BUSINESS AIR FRANCE',
      destination: 'PARIS - TOQUIO',
      originalPrice: 'R$ 38.500',
      paidPrice: 'R$ 10.750',
      economy: '72,07%',
      description: 'Business Class - Otimização de pontos',
      image: '/images/cliente-maldives.jpeg',
      icon: '✈️'
    },
    {
      id: 3,
      title: 'FIRST CLASS QATAR',
      destination: 'DOHA - MALDIVAS',
      originalPrice: 'R$ 45.200',
      paidPrice: 'R$ 8.230',
      economy: '81,78%',
      description: 'First Class - Estratégia avançada',
      image: '/images/cliente-italy.jpeg',
      icon: '✈️'
    },
    {
      id: 4,
      title: 'BUSINESS SINGAPORE',
      destination: 'SINGAPURA - SYDNEY',
      originalPrice: 'R$ 28.900',
      paidPrice: 'R$ 15.650',
      economy: '45,84%',
      description: 'Business Class - Acúmulo inteligente',
      image: '/images/cliente-singapore.jpeg',
      icon: '✈️'
    },
    {
      id: 5,
      title: 'BUSINESS TURKISH',
      destination: 'ISTAMBUL - MALDIVAS',
      originalPrice: 'R$ 36.700',
      paidPrice: 'R$ 5.160',
      economy: '85,95%',
      description: 'Business Class - Promoção relâmpago',
      image: '/images/cliente-swiss.jpeg',
      icon: '✈️'
    },
    {
      id: 6,
      title: 'BUSINESS QSUITE',
      destination: 'DOHA - LONDRES',
      originalPrice: 'R$ 52.300',
      paidPrice: 'R$ 9.530',
      economy: '81,78%',
      description: 'QSuite - Gestão de transferência',
      image: '/images/cliente-suite.jpeg',
      icon: '✈️'
    }
  ];

  // Casos reais de economia com comparação
  const economyCases = [
    {
      id: 1,
      title: 'Estratégia Cesar',
      originalPrice: 'R$ 310.297,77',
      economyPrice: 'R$ 142.232,77',
      economyPercent: '54,15%',
      description: 'Otimização de gastos do cartão',
      icon: '📊',
      image: '/images/resultadoCesar.jpeg'
    },
    {
      id: 2,
      title: 'Estratégia Marco',
      originalPrice: 'R$ 1.056.884,93',
      economyPrice: 'R$ 401.108,00',
      economyPercent: '62,07%',
      description: 'Resgate estratégico de pontos',
      icon: '📊',
      image: '/images/resultadosMarco.jpeg'
    },
    {
      id: 3,
      title: 'Estratégia Guilherme',
      originalPrice: 'R$ 655.031,31',
      economyPrice: 'R$ 507.294,87',
      economyPercent: '22,56%',
      description: 'Gestão completa de portfólio',
      icon: '📊',
      image: '/images/resultadosGuilherme.jpeg'
    }
  ];

  // Passos do Método GVS
  const howItWorksSteps = [
    {
      id: 1,
      title: 'Diagnóstico Financeiro',
      description: 'Análise completa do seu perfil de gastos e potencial de acúmulo',
      icon: '📊'
    },
    {
      id: 2,
      title: 'Arquitetura de Acúmulo',
      description: 'Criação de um sistema personalizado para multiplicar seus pontos',
      icon: '🎯'
    },
    {
      id: 3,
      title: 'Gestão de Portfólio',
      description: 'Acompanhamento e otimização contínua da sua estratégia',
      icon: '⚡'
    },
    {
      id: 4,
      title: 'Resgate Estratégico',
      description: 'Transformação de pontos em ativos de alto valor',
      icon: '💰'
    }
  ];

  // Perfil do público-alvo (filtro de alta renda)
  const targetAudience = [
    {
      id: 1,
      profile: 'Gasto mensal acima de R$ 15.000',
      description: 'Seu potencial de acúmulo é alto, mas você está deixando dinheiro na mesa',
      icon: '💳'
    },
    {
      id: 2,
      profile: 'Busca inteligência financeira',
      description: 'Quer transformar despesas operacionais em ativos estratégicos',
      icon: '🧠'
    },
    {
      id: 3,
      profile: 'Milhas acumuladas sem uso',
      description: 'Seus pontos expiram enquanto você poderia estar viajando de primeira classe',
      icon: '⏰'
    },
    {
      id: 4,
      profile: 'Quer maximizar ROI',
      description: 'Já usa milhas, mas quer otimizar cada ponto como um investimento',
      icon: '📈'
    }
  ];

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

    const whatsappMessage = `Olá! Gostaria de agendar minha análise estratégica de milhas.%0A%0A` +
      `*Nome:* ${formData.nome}%0A` +
      `*E-mail:* ${formData.email}%0A` +
      `*Telefone:* ${formData.telefone}%0A` +
      `*Gasto mensal no cartão:* ${formData.gastoCartao || 'Não informado'}%0A` +
      `*Viagens por ano:* ${formData.viagensPorAno || 'Não informado'}%0A` +
      `*Já utiliza estratégia de milhas?* ${formData.usaMilhas || 'Não informado'}%0A` +
      `*Mensagem:* ${formData.mensagem || 'Sem detalhes adicionais'}`;

    const whatsappNumber = '5547997202400';

    window.open(`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`, '_blank');

    setFormData({
      nome: '',
      email: '',
      telefone: '',
      gastoCartao: '',
      viagensPorAno: '',
      usaMilhas: '',
      mensagem: ''
    });

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
    }, 5000);
  };

  const openWhatsApp = () => {
    const whatsappMessage = `Olá! Quero agendar minha análise estratégica de milhas e começar a otimizar meus gastos.`;
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
              <span>GVS Milhas</span>
              <small>Gestão Estratégica de Milhas</small>
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
            <a href="#" onClick={(e) => { e.preventDefault(); scrollToTop(); handleNavClick(); }}>Inicio</a>
            <a href="#metodo" onClick={handleNavClick}>Método GVS</a>
            <a href="#perfil" onClick={handleNavClick}>Perfil</a>
            <a href="#estrategia" onClick={handleNavClick}>Cases</a>
            <a href="#autoridade" onClick={handleNavClick}>Autoridade</a>
            <a href="#resultados" onClick={handleNavClick}>ROI</a>
            <a href="#analise" onClick={handleNavClick} className="nav-cta">Análise Estratégica</a>
          </nav>
        </div>
      </header>

      {/* Hero Section - Foco em dinheiro e estratégia */}
      <section className="hero">
        <div className="hero-bg-overlay"></div>
        <div className="hero-pattern"></div>
        <div className="container hero-container">
          <div className="hero-content">
            <div className="hero-badge">
              <span className="badge-icon">🎯</span>
              <span>Estratégia Financeira | ROI Acima de 2.000%</span>
            </div>
            
            <h1 className="hero-title">
              Transforme seus gastos em <span className="highlight">ativos financeiros</span> e viaje pagando até <span className="highlight">80% menos</span>
            </h1>
            
            <p className="hero-description">
              Gestão estratégica de milhas para quem gasta acima de R$ 15.000/mês no cartão. 
              Transformamos suas despesas operacionais em um dos ativos mais rentáveis do mercado.
            </p>
            
            <div className="hero-buttons">
              <a href="#analise" className="btn btn-primary" onClick={handleNavClick}>
                <span>📊</span>
                Agendar Análise Estratégica
              </a>
              <button className="btn btn-secondary" onClick={openWhatsApp}>
                <span>💬</span>
                Consultoria Rápida
              </button>
            </div>

            <div className="hero-stats">
              <div className="stat">
                <span className="stat-number">R$ 2M+</span>
                <span className="stat-label">Economia Gerada</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat">
                <span className="stat-number">81%</span>
                <span className="stat-label">Economia Média</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat">
                <span className="stat-number">2.847%</span>
                <span className="stat-label">ROI Médio</span>
              </div>
            </div>
          </div>
          
          <div className="hero-visual">
            <div className="floating-card card-1">
              <span className="card-icon">📈</span>
              <div className="card-info">
                <strong>ROI Acumulado</strong>
                <span>+2.847%</span>
              </div>
            </div>
            <div className="floating-card card-2">
              <span className="card-icon">💳</span>
              <div className="card-info">
                <strong>Gastos Otimizados</strong>
                <span>+320% retorno</span>
              </div>
            </div>
            <div className="floating-card card-3">
              <span className="card-icon">🏦</span>
              <div className="card-info">
                <strong>Ativos Gerados</strong>
                <span>R$ 2M</span>
              </div>
            </div>
            <div className="hero-graph"></div>
          </div>
        </div>
        
        <div className="scroll-hint">
          <span>Descubra a estratégia</span>
          <div className="scroll-line"></div>
        </div>
      </section>

      {/* Método GVS - Mecanismo único */}
      <section id="metodo" className="section method">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Mecanismo Exclusivo</span>
            <h2 className="section-title">Método GVS de Gestão de Milhas</h2>
            <p className="section-subtitle">Um sistema financeiro que transforma gastos em ativos de alto valor</p>
          </div>

          <div className="method-diferential">
            <div className="diferential-card">
              <div className="diferential-icon">🔑</div>
              <h3>Diferencial do Método</h3>
              <p>Enquanto agências de viagens vendem passagens com milhas, nós construímos uma arquitetura financeira que multiplica seu patrimônio através de pontos.</p>
            </div>
          </div>

          <div className="steps-grid">
            {howItWorksSteps.map((step, index) => (
              <div key={step.id} className="step-card">
                <div className="step-number">{index + 1}</div>
                <div className="step-icon">{step.icon}</div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            ))}
          </div>

          <div className="method-compare">
            <div className="compare-card traditional">
              <h4>Abordagem Tradicional</h4>
              <ul>
                <li>❌ Foco em "viajar barato"</li>
                <li>❌ Sem estratégia de acúmulo</li>
                <li>❌ Milhas desperdiçadas</li>
                <li>❌ ROI abaixo de 500%</li>
              </ul>
            </div>
            <div className="compare-card gvs">
              <h4>Método GVS</h4>
              <ul>
                <li>✅ Gestão de ativos financeiros</li>
                <li>✅ Arquitetura de acúmulo</li>
                <li>✅ Otimização de cada ponto</li>
                <li>✅ ROI acima de 2.000%</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Perfil - Público de alta renda */}
      <section id="perfil" className="section for-who">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Público-Alvo</span>
            <h2 className="section-title">Para investidores inteligentes</h2>
            <p className="section-subtitle">Sua estratégia de milhas começa com o perfil certo</p>
          </div>

          <div className="profiles-grid">
            {targetAudience.map(profile => (
              <div key={profile.id} className="profile-card">
                <div className="profile-icon">{profile.icon}</div>
                <h3>{profile.profile}</h3>
                <p>{profile.description}</p>
              </div>
            ))}
          </div>

          <div className="qualification-banner">
            <p>⚠️ Análise estratégica disponível apenas para gastos mensais acima de <strong>R$ 15.000</strong> no cartão de crédito</p>
          </div>
        </div>
      </section>

      {/* Economia Real - Com comparação clara */}
      <section id="estrategia" className="section economy">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Cases de Estratégia</span>
            <h2 className="section-title">Economia real com gestão profissional</h2>
            <p className="section-subtitle">Resultados comprovados de clientes que aplicaram o Método GVS</p>
          </div>

          <div className="economy-grid">
            {economyCases.map(case_ => (
              <div key={case_.id} className="economy-card">
                <div className="economy-image">
                  <img src={case_.image} alt={case_.title} />
                  <div className="economy-icon-overlay">{case_.icon}</div>
                  <button 
                    className="economy-zoom-btn"
                    onClick={() => setSelectedImage(case_.image)}
                    aria-label="Ampliar imagem"
                  >
                    🔍
                  </button>
                </div>
                <h3>{case_.title}</h3>
                <div className="price-comparison">
                  <div className="price-item original">
                    <span className="price-label">Valor de mercado</span>
                    <span className="original-price">{case_.originalPrice}</span>
                  </div>
                  <div className="price-arrow">→</div>
                  <div className="price-item economy">
                    <span className="price-label">Com estratégia GVS</span>
                    <span className="economy-price">{case_.economyPrice}</span>
                  </div>
                </div>
                <div className="economy-badge">Economia de {case_.economyPercent}</div>
                <p>{case_.description}</p>
                <div className="savings-highlight">
                  <span className="savings-number">R$ {parseFloat(case_.economyPrice.replace('R$ ', '').replace(/\./g, '').replace(',', '.')) - parseFloat(case_.originalPrice.replace('R$ ', '').replace(/\./g, '').replace(',', '.')) < 0 ? 
                    (parseFloat(case_.originalPrice.replace('R$ ', '').replace(/\./g, '').replace(',', '.')) - parseFloat(case_.economyPrice.replace('R$ ', '').replace(/\./g, '').replace(',', '.'))).toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2})
                    : '0'}</span>
                  <span>economizados</span>
                </div>
              </div>
            ))}
          </div>

          <div className="economy-cta">
            <p>Descubra seu potencial de economia</p>
            <a href="#analise" className="btn btn-primary" onClick={handleNavClick}>
              Calcular ROI Potencial
            </a>
          </div>
        </div>
      </section>

      {/* Viagens do Dono - Prova de autoridade */}
      <section id="autoridade" className="section owner-trips">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Autoridade Comprovada</span>
            <h2 className="section-title">Guilherme Vieira: Estratégia em ação</h2>
            <p className="section-subtitle">Como aplico o Método GVS nas minhas próprias viagens</p>
          </div>

          <div className="owner-grid">
            {ownerTrips.map(trip => (
              <div key={trip.id} className="owner-card">
                <div className="owner-image">
                  <img src={trip.image} alt={trip.title} />
                  <div className="owner-badge">{trip.economy} OFF</div>
                  <button 
                    className="owner-zoom-btn"
                    onClick={() => setSelectedImage(trip.image)}
                    aria-label="Ampliar imagem"
                  >
                    🔍
                  </button>
                </div>
                <div className="owner-content">
                  <div className="owner-icon">{trip.icon}</div>
                  <h3>{trip.title}</h3>
                  <p className="owner-destination">{trip.destination}</p>
                  <p className="owner-description">{trip.description}</p>
                  <div className="owner-prices">
                    <div className="price-comparison-simple">
                      <span className="owner-original">{trip.originalPrice}</span>
                      <span className="price-arrow-small">→</span>
                      <span className="owner-paid">{trip.paidPrice}</span>
                    </div>
                  </div>
                  <div className="owner-economy">Economia real de {trip.economy}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="owner-quote">
            <p>"Milhas não são sobre viajar barato. São sobre inteligência financeira. Cada ponto é um ativo que precisa ser gerido como qualquer investimento do seu portfólio."</p>
            <span>- Guilherme Vieira, Fundador GVS Capital</span>
          </div>
        </div>
      </section>

      {/* Depoimentos - Foco em ROI */}
      <section id="resultados" className="section testimonials">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">ROI Comprovado</span>
            <h2 className="section-title">Resultados que transformam patrimônio</h2>
            <p className="section-subtitle">Clientes que multiplicaram seus ativos com estratégia</p>
          </div>

          <div className="testimonials-grid">
            {testimonials.map(testimonial => (
              <div key={testimonial.id} className="testimonial-card">
                <div className="testimonial-header">
                  <div className="testimonial-photo">
                    <img src={testimonial.photo} alt={testimonial.name} />
                  </div>
                  <div className="testimonial-info">
                    <h4>{testimonial.name}</h4>
                    <span className="testimonial-location">{testimonial.location}</span>
                  </div>
                </div>
                <div className="testimonial-quote">“</div>
                <p className="testimonial-text">{testimonial.text}</p>
                <div className="testimonial-rating">
                  {'★'.repeat(testimonial.rating)}
                </div>
                <div className="testimonial-results">
                  <span className="testimonial-roi">{testimonial.roi}</span>
                  <span className="testimonial-result">{testimonial.result}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

{/* Sobre Nós - Versão Estratégica */}
<section id="sobre" className="section about">
  <div className="container">
    <div className="section-header">
      <span className="section-tag">Quem Está Por Trás da Estratégia</span>
      <h2 className="section-title">Sua Jornada Começa com a GVS Milhas</h2>
      <p className="section-subtitle">
        Conheça a metodologia que está transformando gastos em ativos de alto valor
      </p>
    </div>

    <div className="about-content">
      <div className="about-text">
        <p>
          Fundada por <strong>Guilherme Vieira</strong>, a <strong>GVS Milhas</strong> nasceu da visão de que 
          milhas não são apenas pontos de programas de fidelidade, mas sim <strong>ativos financeiros estratégicos</strong> 
          que podem gerar retornos extraordinários quando gerenciados corretamente.
        </p>
        <p>
          Enquanto o mercado tradicional vende passagens "mais baratas", nós construímos uma <strong>arquitetura financeira 
          personalizada</strong> que transforma seus gastos operacionais em um dos investimentos mais rentáveis do mercado, 
          com ROI consistentemente acima de <strong>2.000%</strong> para nossos clientes.
        </p>
        <p>
          Nossa metodologia exclusiva combina análise estratégica de gastos, conhecimento profundo dos ecossistemas de pontos 
          e uma mentalidade de gestão de ativos que permite a você acessar experiências de primeira classe pagando uma fração 
          do valor de mercado.
        </p>

        <div className="about-features">
          <div className="feature">
            <span className="feature-icon">📊</span>
            <span>Arquitetura de Acúmulo</span>
          </div>
          <div className="feature">
            <span className="feature-icon">💎</span>
            <span>Gestão de Portfólio VIP</span>
          </div>
          <div className="feature">
            <span className="feature-icon">✈️</span>
            <span>Resgate Estratégico</span>
          </div>
          <div className="feature">
            <span className="feature-icon">📈</span>
            <span>ROI Acima de 2.000%</span>
          </div>
        </div>

        <div className="about-stats">
          <div className="stat-item">
            <span className="stat-number">5+</span>
            <span className="stat-label">Anos de Estratégia</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">R$ 2M+</span>
            <span className="stat-label">Economia Gerada</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">100%</span>
            <span className="stat-label">ROI Positivo</span>
          </div>
        </div>

        <div className="about-cta">
          <a href="#analise" className="btn btn-primary" onClick={handleNavClick}>
            <span>🎯</span>
            Agende Sua Análise Estratégica
          </a>
        </div>
      </div>

      <div className="about-image">
        <img src="/images/guilherme-vieira-about.jpeg" alt="Guilherme Vieira - Fundador GVS Milhas" />
        <div className="image-caption">
          <strong>Guilherme Vieira</strong> | Fundador e Estrategista GVS
        </div>
        <div className="image-badge">
          <span>+2.847% ROI Médio</span>
        </div>
      </div>
    </div>
  </div>
   </section>
      {/* Formulário - Com escassez e filtro */}
      <section id="analise" className="section contact">
        <div className="container">
          <div className="contact-wrapper">
            <div className="contact-info">
              <span className="section-tag">Oportunidade Limitada</span>
              <h2>Análise Estratégica Gratuita</h2>
              <p>Descubra quanto você pode economizar com uma gestão profissional de milhas. Nossos especialistas em estratégia financeira analisarão seu perfil e potencial de ROI.</p>
              <div className="contact-features">
                <div className="contact-feature">
                  <span>✓</span>
                  <span>Diagnóstico completo de potencial</span>
                </div>
                <div className="contact-feature">
                  <span>✓</span>
                  <span>Arquitetura de acúmulo personalizada</span>
                </div>
                <div className="contact-feature">
                  <span>✓</span>
                  <span>Projeção de ROI detalhada</span>
                </div>
                <div className="contact-feature">
                  <span>✓</span>
                  <span>Análise sem compromisso</span>
                </div>
              </div>
              <div className="scarcity-badge">
                <span>⚠️ Apenas 5 análises gratuitas por dia</span>
              </div>
            </div>

            <div className="contact-form-wrapper">
              {submitted ? (
                <div className="success-message">
                  <div className="success-icon">✓</div>
                  <h3>Solicitação Enviada!</h3>
                  <p>Nossos especialistas em estratégia financeira analisarão seu perfil.</p>
                  <p>Você receberá contato em até 2 horas pelo WhatsApp.</p>
                </div>
              ) : (
                <form className="contact-form" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <input
                      type="text"
                      name="nome"
                      placeholder="Nome completo"
                      value={formData.nome}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="email"
                      name="email"
                      placeholder="E-mail profissional"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="tel"
                      name="telefone"
                      placeholder="WhatsApp com DDD"
                      value={formData.telefone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <select
                      name="gastoCartao"
                      value={formData.gastoCartao}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Gasto mensal no cartão de crédito *</option>
                      <option value="Até R$ 15.000">Até R$ 15.000</option>
                      <option value="R$ 15.000 - R$ 20.000">R$ 15.000 - R$ 20.000</option>
                      <option value="R$ 20.000 - R$ 30.000">R$ 20.000 - R$ 30.000</option>
                      <option value="R$ 30.000 - R$ 50.000">R$ 30.000 - R$ 50.000</option>
                      <option value="Acima de R$ 50.000">Acima de R$ 50.000</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <select
                      name="viagensPorAno"
                      value={formData.viagensPorAno}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Viagens internacionais por ano</option>
                      <option value="Nenhuma">Nenhuma</option>
                      <option value="1-2 viagens">1-2 viagens</option>
                      <option value="3-5 viagens">3-5 viagens</option>
                      <option value="6-10 viagens">6-10 viagens</option>
                      <option value="Mais de 10 viagens">Mais de 10 viagens</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <select
                      name="usaMilhas"
                      value={formData.usaMilhas}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Nível de conhecimento em milhas</option>
                      <option value="Não utilizo">Não utilizo milhas</option>
                      <option value="Uso básico">Uso básico, sem estratégia</option>
                      <option value="Uso intermediário">Já uso, mas quero otimizar</option>
                      <option value="Uso avançado">Uso estratégico, busco excelência</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <textarea
                      name="mensagem"
                      placeholder="Conte-nos seus objetivos com milhas..."
                      rows="3"
                      value={formData.mensagem}
                      onChange={handleChange}
                    ></textarea>
                  </div>
                  <button type="submit" className="btn btn-primary btn-full">
                    <span>📊</span> Solicitar Análise Estratégica
                  </button>
                  <p className="form-note">* Análise disponível apenas para gastos acima de R$ 15.000/mês</p>
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
                <span>GVS Milhas</span>
                <small>Gestão Estratégica de Milhas</small>
              </div>
              <p>Transformando gastos em ativos com inteligência financeira.</p>
              <div className="social-links">
                <button className="social-link" onClick={openInstagram}>📸 Instagram</button>
                <button className="social-link" onClick={openWhatsApp}>💬 WhatsApp</button>
              </div>
            </div>
            <div className="footer-links">
              <h4>Navegação</h4>
              <a href="#" onClick={(e) => { e.preventDefault(); scrollToTop(); }}>Home</a>
              <a href="#metodo" onClick={handleNavClick}>Método GVS</a>
              <a href="#perfil" onClick={handleNavClick}>Perfil</a>
              <a href="#estrategia" onClick={handleNavClick}>Cases</a>
              <a href="#autoridade" onClick={handleNavClick}>Autoridade</a>
              <a href="#resultados" onClick={handleNavClick}>ROI</a>
              <a href="#analise" onClick={handleNavClick}>Análise Estratégica</a>
            </div>
            <div className="footer-contact">
              <h4>Contato</h4>
              <p>💬 WhatsApp: (47) 99720-2400</p>
              <p>✉️ gvsmilhas@gmail.com</p>
              <p>📍 Brasil</p>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} GVS Milhas - Gestão Estratégica de Milhas</p>
            <p>Inteligência financeira aplicada ao mercado de pontos</p>
          </div>
        </div>
      </footer>

      {/* Modal de imagem ampliada */}
      {selectedImage && (
        <ImageModal 
          image={selectedImage} 
          alt="Resultado de estratégia GVS" 
          onClose={() => setSelectedImage(null)} 
        />
      )}

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
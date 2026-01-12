interface HeroSectionProps {
    onCtaClick: () => void
}

export default function HeroSection({ onCtaClick }: HeroSectionProps) {
    return (
        <section id="hero" className="hero">
            <div className="hero-content">
                <div className="hero-badge">
                    <span className="badge-pulse"></span>
                    <span className="badge-text">Material Exclusivo</span>
                </div>
                <h1 className="hero-title">
                    Receba grátis o mapa que lojistas usam para{' '}
                    <span className="highlight">faturar até 40% a mais</span>{' '}
                    sem gastar em tráfego.
                </h1>
                <p className="hero-subtitle">
                    Descubra como transformar clientes únicos em clientes recorrentes usando só WhatsApp.
                </p>
                <button id="cta-hero" className="cta-primary" onClick={onCtaClick}>
                    <span className="cta-arrow">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                            <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                    </span>
                    Quero o mapa gratuito
                </button>
                <div className="hero-trust">
                    <div className="trust-item">
                        <div className="trust-icon">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                        </div>
                        <span>100% Gratuito</span>
                    </div>
                    <div className="trust-item">
                        <div className="trust-icon">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                        </div>
                        <span>Acesso Imediato</span>
                    </div>
                    <div className="trust-item">
                        <div className="trust-icon">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                        </div>
                        <span>Método Comprovado</span>
                    </div>
                </div>
            </div>
        </section>
    )
}

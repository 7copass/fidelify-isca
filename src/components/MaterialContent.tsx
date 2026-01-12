import { useEffect, useState } from 'react'

// SVG Icons
const Icons = {
    arrow: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>,
    user: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>,
    enter: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path><polyline points="10 17 15 12 10 7"></polyline><line x1="15" y1="12" x2="3" y2="12"></line></svg>,
    cart: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>,
    exit: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>,
    sleep: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>,
    store: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>,
    phone: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>,
    bell: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>,
    gift: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="20 12 20 22 4 22 4 12"></polyline><rect x="2" y="7" width="20" height="5"></rect><line x1="12" y1="22" x2="12" y2="7"></line><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"></path><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"></path></svg>,
    refresh: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg>,
    dollar: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>,
    x: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>,
    check: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>,
    clipboard: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>,
    clock: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>,
    target: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>,
    trending: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>,
}

interface ChapterProps {
    number?: string
    label?: string
    title: string
    children: React.ReactNode
    className?: string
}

function Chapter({ number, label, title, children, className = '' }: ChapterProps) {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible(true)
                    }
                })
            },
            { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
        )

        const element = document.getElementById(`chapter-${number || label}`)
        if (element) observer.observe(element)

        return () => observer.disconnect()
    }, [number, label])

    return (
        <section
            id={`chapter-${number || label}`}
            className={`chapter ${className} ${isVisible ? 'visible' : ''}`}
        >
            <div className="container">
                {number && <div className="chapter-number">CAPÍTULO {number}</div>}
                {label && <h3 className="chapter-label">{label}</h3>}
                <h2 className="chapter-title">{title}</h2>
                <div className="chapter-content">
                    {children}
                </div>
            </div>
        </section>
    )
}

export default function MaterialContent() {
    const [checkedItems, setCheckedItems] = useState<boolean[]>([false, false, false, false])

    const handleCheckChange = (index: number) => {
        setCheckedItems(prev => {
            const newItems = [...prev]
            newItems[index] = !newItems[index]
            return newItems
        })
    }

    const checkedCount = checkedItems.filter(Boolean).length

    return (
        <main className="material-content">
            {/* Material Header */}
            <section className="material-header">
                <div className="container">
                    <div className="material-badge">MATERIAL EXCLUSIVO</div>
                    <h1 className="material-title">MAPA DO FATURAMENTO INVISÍVEL™</h1>
                    <p className="material-tagline">O dinheiro que sua loja perde todos os meses sem perceber</p>
                    <div className="material-divider"></div>
                    <h2 className="material-subtitle">Como recuperar até 40% do faturamento usando WhatsApp</h2>
                </div>
            </section>

            {/* Introdução */}
            <Chapter label="INTRODUÇÃO" title="O problema não é venda" className="intro">
                <p className="lead-text">Se sua loja vende, mas o faturamento não cresce como deveria, o problema não é venda.</p>
                <p className="highlight-text">É retorno.</p>
                <div className="insight-box">
                    <p>A maioria das lojas vive de cliente novo.</p>
                    <p><strong>As lojas que crescem vivem de cliente recorrente.</strong></p>
                    <p>E entre uma e outra existe um <span className="emphasis">buraco invisível de dinheiro</span>.</p>
                </div>
                <a href="https://wa.me/5511999999999?text=Olá!%20Quero%20ativar%20recompra%20automática%20na%20minha%20loja" className="cta-chapter" target="_blank" rel="noopener noreferrer">
                    <span className="cta-arrow">{Icons.arrow}</span>
                    Falar com a Fidelify e ativar recompra automática
                </a>
            </Chapter>

            {/* Capítulo 1 */}
            <Chapter number="1" title="O Inimigo Invisível">
                <p className="chapter-intro">Todo dia acontece isso:</p>
                <div className="flow-diagram">
                    <div className="flow-item"><span className="flow-icon-svg">{Icons.enter}</span><span>Cliente entra</span></div>
                    <div className="flow-arrow">→</div>
                    <div className="flow-item"><span className="flow-icon-svg">{Icons.cart}</span><span>Compra</span></div>
                    <div className="flow-arrow">→</div>
                    <div className="flow-item"><span className="flow-icon-svg">{Icons.exit}</span><span>Vai embora</span></div>
                    <div className="flow-arrow">→</div>
                    <div className="flow-item negative"><span className="flow-icon-svg">{Icons.sleep}</span><span>Esquece você</span></div>
                    <div className="flow-arrow">→</div>
                    <div className="flow-item negative"><span className="flow-icon-svg">{Icons.store}</span><span>Compra do concorrente</span></div>
                </div>
                <div className="warning-box">
                    <p>Você acha que perdeu uma venda.</p>
                    <p><strong>Na verdade, perdeu um cliente recorrente.</strong></p>
                </div>
                <a href="https://wa.me/5511999999999?text=Olá!%20Quero%20ativar%20recompra%20automática%20na%20minha%20loja" className="cta-chapter" target="_blank" rel="noopener noreferrer">
                    <span className="cta-arrow">{Icons.arrow}</span>
                    Quero ativar recompra automática na minha loja
                </a>
            </Chapter>

            {/* Capítulo 2 */}
            <Chapter number="2" title="Quanto dinheiro sua loja perde">
                <p className="chapter-intro">Existe uma regra simples:</p>
                <div className="rule-highlight">
                    <p>Lojas sem recompra automática perdem entre <strong>20% e 40%</strong> do faturamento todo mês.</p>
                </div>
                <div className="revenue-table-wrapper">
                    <table className="revenue-table">
                        <thead>
                            <tr>
                                <th>Faturamento mensal</th>
                                <th>Perda invisível</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr><td>R$ 10.000</td><td className="loss">R$ 2.000 a R$ 4.000</td></tr>
                            <tr><td>R$ 20.000</td><td className="loss">R$ 4.000 a R$ 8.000</td></tr>
                            <tr><td>R$ 50.000</td><td className="loss">R$ 10.000 a R$ 20.000</td></tr>
                            <tr><td>R$ 100.000</td><td className="loss">R$ 20.000 a R$ 40.000</td></tr>
                        </tbody>
                    </table>
                </div>
                <a href="https://wa.me/5511999999999?text=Olá!%20Quero%20parar%20de%20perder%20dinheiro" className="cta-chapter" target="_blank" rel="noopener noreferrer">
                    <span className="cta-arrow">{Icons.arrow}</span>
                    Quero parar de perder dinheiro
                </a>
            </Chapter>

            {/* Capítulo 3 */}
            <Chapter number="3" title="O que as grandes redes fazem">
                <div className="insight-box">
                    <p>As grandes não vendem melhor.</p>
                    <p><strong>Elas lembram melhor.</strong></p>
                </div>
                <p className="chapter-text">Elas possuem um sistema que:</p>
                <ul className="feature-list">
                    <li><span className="check-icon-svg">{Icons.check}</span>Registra o cliente</li>
                    <li><span className="check-icon-svg">{Icons.check}</span>Lembra ele de voltar</li>
                    <li><span className="check-icon-svg">{Icons.check}</span>Oferece algo relevante</li>
                    <li><span className="check-icon-svg">{Icons.check}</span>Gera recompra automática</li>
                </ul>
                <a href="https://wa.me/5511999999999?text=Olá!%20Quero%20esse%20sistema%20na%20minha%20loja" className="cta-chapter" target="_blank" rel="noopener noreferrer">
                    <span className="cta-arrow">{Icons.arrow}</span>
                    Quero esse sistema na minha loja
                </a>
            </Chapter>

            {/* Capítulo 4 */}
            <Chapter number="4" title="O Mapa da Recompra">
                <div className="recompra-flow">
                    <div className="flow-step"><div className="step-icon-svg">{Icons.user}</div><div className="step-label">Cliente</div></div>
                    <div className="flow-connector">→</div>
                    <div className="flow-step"><div className="step-icon-svg">{Icons.phone}</div><div className="step-label">WhatsApp</div></div>
                    <div className="flow-connector">→</div>
                    <div className="flow-step"><div className="step-icon-svg">{Icons.bell}</div><div className="step-label">Lembrete</div></div>
                    <div className="flow-connector">→</div>
                    <div className="flow-step"><div className="step-icon-svg">{Icons.gift}</div><div className="step-label">Oferta</div></div>
                    <div className="flow-connector">→</div>
                    <div className="flow-step"><div className="step-icon-svg">{Icons.cart}</div><div className="step-label">Compra</div></div>
                    <div className="flow-connector">→</div>
                    <div className="flow-step"><div className="step-icon-svg">{Icons.refresh}</div><div className="step-label">Retorno</div></div>
                    <div className="flow-connector">→</div>
                    <div className="flow-step highlight-step"><div className="step-icon-svg">{Icons.dollar}</div><div className="step-label">Caixa</div></div>
                </div>
                <a href="https://wa.me/5511999999999?text=Olá!%20Quero%20implantar%20esse%20mapa%20na%20minha%20empresa" className="cta-chapter" target="_blank" rel="noopener noreferrer">
                    <span className="cta-arrow">{Icons.arrow}</span>
                    Quero implantar esse mapa na minha empresa
                </a>
            </Chapter>

            {/* Capítulo 5 */}
            <Chapter number="5" title="O erro fatal da maioria das lojas">
                <div className="comparison-box">
                    <div className="comparison-item wrong">
                        <span className="comparison-icon-svg">{Icons.x}</span>
                        <p>Promoção sem sistema = <strong>sorte</strong></p>
                    </div>
                    <div className="comparison-item right">
                        <span className="comparison-icon-svg">{Icons.check}</span>
                        <p>Sistema = <strong>previsibilidade</strong></p>
                    </div>
                </div>
                <a href="https://wa.me/5511999999999?text=Olá!%20Quero%20sair%20da%20sorte%20e%20entrar%20no%20sistema" className="cta-chapter" target="_blank" rel="noopener noreferrer">
                    <span className="cta-arrow">{Icons.arrow}</span>
                    Quero sair da sorte e entrar no sistema
                </a>
            </Chapter>

            {/* Capítulo 6 */}
            <Chapter number="6" title="Diagnóstico rápido">
                <p className="chapter-intro">Marque o que sua loja já possui:</p>
                <div className="diagnostic-checklist">
                    {['Cadastro de clientes', 'Lembretes automáticos', 'Ofertas recorrentes', 'Retorno previsível'].map((item, index) => (
                        <label key={index} className="checklist-item">
                            <input
                                type="checkbox"
                                className="diagnostic-check"
                                checked={checkedItems[index]}
                                onChange={() => handleCheckChange(index)}
                            />
                            <span className="checkmark"></span>
                            <span className="checklist-text">{item}</span>
                        </label>
                    ))}
                </div>
                <div className={`diagnostic-result ${checkedCount >= 3 ? 'success' : ''}`}>
                    <p className="result-text">
                        Você tem <strong>{checkedCount} de 4</strong> — {checkedCount >= 3 ? 'Sua loja está no caminho certo!' : 'Você está perdendo dinheiro'}
                    </p>
                </div>
                <a href="https://wa.me/5511999999999?text=Olá!%20Quero%20meu%20diagnóstico%20com%20a%20Fidelify" className="cta-chapter" target="_blank" rel="noopener noreferrer">
                    <span className="cta-arrow">{Icons.arrow}</span>
                    Quero meu diagnóstico com a Fidelify
                </a>
            </Chapter>

            {/* Capítulo 7 */}
            <Chapter number="7" title="Como recuperar esse dinheiro">
                <p className="chapter-intro">Você precisa de:</p>
                <div className="requirements-grid">
                    <div className="requirement-card"><div className="requirement-icon-svg">{Icons.clipboard}</div><div className="requirement-label">Cadastro</div></div>
                    <div className="requirement-card"><div className="requirement-icon-svg">{Icons.clock}</div><div className="requirement-label">Lembrete automático</div></div>
                    <div className="requirement-card"><div className="requirement-icon-svg">{Icons.target}</div><div className="requirement-label">Oferta inteligente</div></div>
                    <div className="requirement-card"><div className="requirement-icon-svg">{Icons.trending}</div><div className="requirement-label">Retorno previsível</div></div>
                </div>
                <div className="conclusion-box">
                    <p>Isso é uma <strong>máquina de recompra</strong>.</p>
                </div>
                <a href="https://wa.me/5511999999999?text=Olá!%20Quero%20ativar%20máquina%20de%20recompra%20na%20minha%20loja" className="cta-chapter" target="_blank" rel="noopener noreferrer">
                    <span className="cta-arrow">{Icons.arrow}</span>
                    Ativar máquina de recompra na minha loja
                </a>
            </Chapter>

            {/* Capítulo 8 - CTA Final */}
            <Chapter number="8" title="Próximo Passo" className="cta-final">
                <div className="final-offer">
                    <p className="offer-question">Quer que eu calcule quanto sua loja pode recuperar por mês e te mostre como ativar isso em até 48h?</p>
                    <a href="https://wa.me/5511999999999?text=Olá!%20Quero%20falar%20com%20o%20time%20Fidelify" className="cta-final-button" target="_blank" rel="noopener noreferrer">
                        <span className="cta-arrow">{Icons.arrow}</span>
                        Falar com o time Fidelify no WhatsApp
                    </a>
                </div>
            </Chapter>
        </main>
    )
}

import { useState, ChangeEvent, FormEvent } from 'react'

interface LeadFormProps {
    onSubmit: (data: Record<string, string>) => void
    isSubmitting?: boolean
}

export default function LeadForm({ onSubmit, isSubmitting = false }: LeadFormProps) {
    const [formData, setFormData] = useState({
        nome: '',
        loja: '',
        email: '',
        whatsapp: '',
        faturamento: ''
    })

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target

        if (name === 'whatsapp') {
            let formatted = value.replace(/\D/g, '')
            if (formatted.length > 11) formatted = formatted.slice(0, 11)

            if (formatted.length > 6) {
                formatted = `(${formatted.slice(0, 2)}) ${formatted.slice(2, 7)}-${formatted.slice(7)}`
            } else if (formatted.length > 2) {
                formatted = `(${formatted.slice(0, 2)}) ${formatted.slice(2)}`
            } else if (formatted.length > 0) {
                formatted = `(${formatted}`
            }

            setFormData(prev => ({ ...prev, [name]: formatted }))
        } else if (name === 'loja') {
            let formatted = value
            if (!formatted.startsWith('@')) {
                formatted = '@' + formatted.replace('@', '')
            }
            setFormData(prev => ({ ...prev, [name]: formatted }))
        } else {
            setFormData(prev => ({ ...prev, [name]: value }))
        }
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        if (!isSubmitting) {
            onSubmit(formData)
        }
    }

    return (
        <form id="lead-form" className="lead-form" onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="nome">Seu nome</label>
                <input
                    type="text"
                    id="nome"
                    name="nome"
                    placeholder="Digite seu nome completo"
                    value={formData.nome}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="loja">@ da sua loja</label>
                <input
                    type="text"
                    id="loja"
                    name="loja"
                    placeholder="@sualoja"
                    value={formData.loja}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="email">Seu melhor e-mail</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="email@exemplo.com"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="whatsapp">WhatsApp</label>
                <input
                    type="tel"
                    id="whatsapp"
                    name="whatsapp"
                    placeholder="(00) 00000-0000"
                    value={formData.whatsapp}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="faturamento">Faturamento mensal</label>
                <select
                    id="faturamento"
                    name="faturamento"
                    value={formData.faturamento}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    required
                >
                    <option value="">Selecione uma faixa</option>
                    <option value="ate-10k">Até R$ 10.000</option>
                    <option value="10k-20k">R$ 10.000 a R$ 20.000</option>
                    <option value="20k-50k">R$ 20.000 a R$ 50.000</option>
                    <option value="50k-100k">R$ 50.000 a R$ 100.000</option>
                    <option value="acima-100k">Acima de R$ 100.000</option>
                </select>
            </div>
            <button type="submit" className="cta-primary cta-submit" disabled={isSubmitting}>
                {isSubmitting ? (
                    <>
                        <span className="spinner"></span>
                        Enviando...
                    </>
                ) : (
                    <>
                        <span className="cta-arrow">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                                <polyline points="12 5 19 12 12 19"></polyline>
                            </svg>
                        </span>
                        Acessar meu mapa gratuito
                    </>
                )}
            </button>
        </form>
    )
}

import { useState, useEffect } from 'react'
import LeadForm from './LeadForm'

interface ModalProps {
    isOpen: boolean
    onClose: () => void
    onSubmit: (data: Record<string, string>) => void
    isSubmitting?: boolean
}

export default function Modal({ isOpen, onClose, onSubmit, isSubmitting = false }: ModalProps) {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        if (isOpen) {
            setIsVisible(true)
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
        }

        return () => {
            document.body.style.overflow = ''
        }
    }, [isOpen])

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && !isSubmitting) onClose()
        }
        document.addEventListener('keydown', handleEscape)
        return () => document.removeEventListener('keydown', handleEscape)
    }, [onClose, isSubmitting])

    const handleOverlayClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget && !isSubmitting) onClose()
    }

    if (!isVisible && !isOpen) return null

    return (
        <div
            className={`modal-overlay ${isOpen ? 'active' : ''}`}
            onClick={handleOverlayClick}
        >
            <div className="modal">
                <button className="modal-close" onClick={onClose} disabled={isSubmitting}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
                <div className="modal-header">
                    <div className="modal-icon">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                            <line x1="12" y1="6" x2="12" y2="14"></line>
                            <line x1="8" y1="10" x2="16" y2="10"></line>
                        </svg>
                    </div>
                    <h2 className="modal-title">Quase lá!</h2>
                    <p className="modal-subtitle">Preencha os dados abaixo para liberar seu acesso ao Mapa do Faturamento Invisível</p>
                </div>
                <LeadForm onSubmit={onSubmit} isSubmitting={isSubmitting} />
            </div>
        </div>
    )
}

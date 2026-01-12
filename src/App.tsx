import { useState } from 'react'
import ThreeBackground from './components/ThreeBackground'
import HeroSection from './components/HeroSection'
import Modal from './components/Modal'
import MaterialContent from './components/MaterialContent'
import Footer from './components/Footer'

const WEBHOOK_URL = 'https://editor.leaderaperformance.com.br/webhook/isca'

function App() {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [showMaterial, setShowMaterial] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleFormSubmit = async (data: Record<string, string>) => {
        setIsSubmitting(true)

        try {
            // Enviar dados para o webhook
            await fetch(WEBHOOK_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nome: data.nome,
                    loja: data.loja,
                    email: data.email,
                    whatsapp: data.whatsapp,
                    faturamento: data.faturamento,
                    origem: 'Mapa do Faturamento Invisível',
                    data_captura: new Date().toISOString(),
                }),
            })

            console.log('Lead enviado com sucesso:', data)
        } catch (error) {
            console.error('Erro ao enviar lead:', error)
            // Continua mesmo com erro para não bloquear o usuário
        } finally {
            setIsSubmitting(false)
            setIsModalOpen(false)
            setShowMaterial(true)
            window.scrollTo({ top: 0, behavior: 'smooth' })
        }
    }

    return (
        <>
            <ThreeBackground />

            {!showMaterial && (
                <HeroSection onCtaClick={() => setIsModalOpen(true)} />
            )}

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleFormSubmit}
                isSubmitting={isSubmitting}
            />

            {showMaterial && (
                <>
                    <MaterialContent />
                    <Footer />
                </>
            )}
        </>
    )
}

export default App

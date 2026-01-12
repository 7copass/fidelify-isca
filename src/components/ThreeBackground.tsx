import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function ThreeBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        if (!canvasRef.current) return

        const canvas = canvasRef.current
        const scene = new THREE.Scene()
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
        const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })

        renderer.setSize(window.innerWidth, window.innerHeight)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        camera.position.z = 30

        // Colors
        const GOLD = 0xF59E0B
        const BLUE = 0x3B82F6

        // Particles
        const particlesGeometry = new THREE.BufferGeometry()
        const particleCount = 150
        const positions = new Float32Array(particleCount * 3)
        const colors = new Float32Array(particleCount * 3)

        for (let i = 0; i < particleCount * 3; i += 3) {
            positions[i] = (Math.random() - 0.5) * 80
            positions[i + 1] = (Math.random() - 0.5) * 80
            positions[i + 2] = (Math.random() - 0.5) * 40

            const isGold = Math.random() > 0.5
            if (isGold) {
                colors[i] = 0.96
                colors[i + 1] = 0.62
                colors[i + 2] = 0.04
            } else {
                colors[i] = 0.23
                colors[i + 1] = 0.51
                colors[i + 2] = 0.96
            }
        }

        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
        particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.15,
            vertexColors: true,
            transparent: true,
            opacity: 0.6,
            sizeAttenuation: true
        })

        const particles = new THREE.Points(particlesGeometry, particlesMaterial)
        scene.add(particles)

        // Floating Rings
        const rings: THREE.Mesh[] = []
        const ringGeometry = new THREE.TorusGeometry(4, 0.08, 16, 100)

        for (let i = 0; i < 3; i++) {
            const material = new THREE.MeshBasicMaterial({
                color: i === 1 ? GOLD : BLUE,
                transparent: true,
                opacity: 0.3 + (i * 0.1)
            })
            const ring = new THREE.Mesh(ringGeometry, material)
            ring.position.set(15, 5 - (i * 2), -10)
            ring.rotation.x = Math.PI * 0.3
            ring.rotation.y = i * 0.5
            rings.push(ring)
            scene.add(ring)
        }

        // Floating geometric shapes
        const shapes: THREE.Mesh[] = []
        const geometries = [
            new THREE.OctahedronGeometry(1, 0),
            new THREE.TetrahedronGeometry(1, 0),
            new THREE.IcosahedronGeometry(0.8, 0)
        ]

        for (let i = 0; i < 6; i++) {
            const geometry = geometries[i % geometries.length]
            const material = new THREE.MeshBasicMaterial({
                color: i % 2 === 0 ? GOLD : BLUE,
                wireframe: true,
                transparent: true,
                opacity: 0.4
            })
            const shape = new THREE.Mesh(geometry, material)
            shape.position.set(
                (Math.random() - 0.5) * 50,
                (Math.random() - 0.5) * 30,
                (Math.random() - 0.5) * 20 - 10
            )
            shape.userData = {
                rotationSpeed: {
                    x: (Math.random() - 0.5) * 0.01,
                    y: (Math.random() - 0.5) * 0.01
                },
                floatSpeed: Math.random() * 0.5 + 0.5,
                floatOffset: Math.random() * Math.PI * 2
            }
            shapes.push(shape)
            scene.add(shape)
        }

        // Mouse interaction
        let mouseX = 0
        let mouseY = 0
        let targetX = 0
        let targetY = 0

        const handleMouseMove = (e: MouseEvent) => {
            mouseX = (e.clientX / window.innerWidth) * 2 - 1
            mouseY = -(e.clientY / window.innerHeight) * 2 + 1
        }

        document.addEventListener('mousemove', handleMouseMove)

        // Animation
        const clock = new THREE.Clock()
        let animationId: number

        function animate() {
            animationId = requestAnimationFrame(animate)
            const elapsed = clock.getElapsedTime()

            targetX += (mouseX - targetX) * 0.02
            targetY += (mouseY - targetY) * 0.02

            particles.rotation.y = elapsed * 0.05 + targetX * 0.3
            particles.rotation.x = targetY * 0.2

            rings.forEach((ring, i) => {
                ring.rotation.z = elapsed * (0.1 + i * 0.05)
                ring.rotation.y = elapsed * 0.1 + i * 0.5
                ring.position.y = 5 - (i * 2) + Math.sin(elapsed + i) * 0.5
            })

            shapes.forEach((shape) => {
                shape.rotation.x += shape.userData.rotationSpeed.x
                shape.rotation.y += shape.userData.rotationSpeed.y
                shape.position.y += Math.sin(elapsed * shape.userData.floatSpeed + shape.userData.floatOffset) * 0.01
            })

            renderer.render(scene, camera)
        }

        // Handle resize
        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight
            camera.updateProjectionMatrix()
            renderer.setSize(window.innerWidth, window.innerHeight)
        }

        window.addEventListener('resize', handleResize)

        animate()

        // Cleanup
        return () => {
            cancelAnimationFrame(animationId)
            document.removeEventListener('mousemove', handleMouseMove)
            window.removeEventListener('resize', handleResize)
            renderer.dispose()
        }
    }, [])

    return <canvas ref={canvasRef} id="three-canvas" />
}

import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  opacity: number
  color: string
}

const COLORS = [
  'rgba(255,255,255,',
  'rgba(180,180,255,',
  'rgba(200,230,255,',
  'rgba(255,200,255,',
]

function randomBetween(a: number, b: number) {
  return a + Math.random() * (b - a)
}

export default function Antigravity() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: -9999, y: -9999 })
  const particlesRef = useRef<Particle[]>([])
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }
    const onMouseLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 }
    }
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseleave', onMouseLeave)

    // Spawn particles
    const spawnParticle = (): Particle => ({
      x: randomBetween(0, canvas.width),
      y: randomBetween(canvas.height * 0.4, canvas.height + 20),
      vx: randomBetween(-0.3, 0.3),
      vy: randomBetween(-0.4, -1.4),
      radius: randomBetween(1, 3.5),
      opacity: randomBetween(0.3, 0.9),
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    })

    const PARTICLE_COUNT = 160
    particlesRef.current = Array.from({ length: PARTICLE_COUNT }, () => {
      const p = spawnParticle()
      // Scatter initial positions across whole canvas
      p.y = randomBetween(-canvas.height, canvas.height)
      return p
    })

    let frameCount = 0

    const draw = () => {
      rafRef.current = requestAnimationFrame(draw)
      frameCount++

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Spawn a few new particles each frame to replace ones that left
      if (frameCount % 3 === 0 && particlesRef.current.length < PARTICLE_COUNT + 20) {
        particlesRef.current.push(spawnParticle())
      }

      const mouse = mouseRef.current
      const REPEL_RADIUS = 120
      const REPEL_STRENGTH = 2.5

      particlesRef.current = particlesRef.current.filter(p => {
        // Mouse repulsion
        const dx = p.x - mouse.x
        const dy = p.y - mouse.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < REPEL_RADIUS) {
          const force = (REPEL_RADIUS - dist) / REPEL_RADIUS
          p.vx += (dx / dist) * force * REPEL_STRENGTH * 0.05
          p.vy += (dy / dist) * force * REPEL_STRENGTH * 0.05
        }

        // Gentle drift / turbulence
        p.vx += randomBetween(-0.01, 0.01)
        p.vy -= randomBetween(0, 0.005) // extra antigravity nudge

        // Damping
        p.vx *= 0.99
        p.vy *= 0.99

        p.x += p.vx
        p.y += p.vy

        // Fade near top
        if (p.y < 80) {
          p.opacity -= 0.015
        }

        // Draw
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = p.color + Math.max(0, p.opacity) + ')'
        ctx.fill()

        // Keep particle if still visible and on screen horizontally
        return p.opacity > 0 && p.x > -20 && p.x < canvas.width + 20
      })
    }

    draw()

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ background: '#000' }}
    />
  )
}

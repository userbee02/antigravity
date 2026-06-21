import { useState } from 'react'
import AntigravityComponent from '@/components/Antigravity'
import './index.css'

export default function App() {
  const [fading, setFading] = useState(false)
  const [gone, setGone] = useState(false)

  const handleEnter = () => {
    setFading(true)
    setTimeout(() => setGone(true), 900)
  }

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative', background: '#000' }}>

      {/* Antigravity canvas centered in a fixed 1080x1080 box */}
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: '1080px', height: '1080px', position: 'relative' }}>
          <AntigravityComponent
            count={300}
            magnetRadius={10}
            ringRadius={10}
            waveSpeed={0.4}
            waveAmplitude={1}
            particleSize={2}
            lerpSpeed={0.1}
            color="#FF9FFC"
            autoAnimate={true}
            particleVariance={1}
            rotationSpeed={0}
            depthFactor={1}
            pulseSpeed={3}
            particleShape="capsule"
            fieldStrength={10}
          />
        </div>
      </div>

      {/* Splash overlay */}
      {!gone && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 10,
            background: '#000',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '2rem',
            transition: 'opacity 0.9s ease',
            opacity: fading ? 0 : 1,
            pointerEvents: fading ? 'none' : 'auto',
          }}
        >
          <h1 style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 900,
            fontSize: 'clamp(2.5rem, 10vw, 7rem)',
            letterSpacing: '0.25em',
            color: '#fff',
            textTransform: 'uppercase',
          }}>
            ANTIGRAVITY
          </h1>
          <button
            onClick={handleEnter}
            style={{
              background: 'transparent',
              border: '1px solid rgba(255,255,255,0.4)',
              color: '#fff',
              fontFamily: "'Inter', sans-serif",
              fontWeight: 500,
              fontSize: '0.85rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              padding: '0.75rem 2.5rem',
              cursor: 'pointer',
            }}
            onMouseEnter={e => {
              (e.target as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.9)'
              ;(e.target as HTMLButtonElement).style.background = 'rgba(255,255,255,0.05)'
            }}
            onMouseLeave={e => {
              (e.target as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.4)'
              ;(e.target as HTMLButtonElement).style.background = 'transparent'
            }}
          >
            Enter
          </button>
        </div>
      )}
    </div>
  )
}

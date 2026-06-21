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

      {/* Antigravity canvas */}
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
            padding: '1.5rem',
            textAlign: 'center',
            transition: 'opacity 1.2s ease-in-out',
            opacity: fading ? 0 : 1,
            pointerEvents: fading ? 'none' : 'auto',
          }}
        >
          <h1 style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 900,
            fontSize: 'clamp(3rem, 10vw, 8rem)',
            letterSpacing: '-0.02em',
            color: '#fff',
            textTransform: 'uppercase',
            marginBottom: '0.5rem',
            lineHeight: 1,
          }}>
            ANTIGRAVITY
          </h1>

          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 'clamp(1.25rem, 3vw, 2rem)',
            color: 'rgba(255,255,255,0.9)',
            marginBottom: '3rem',
          }}>
            React Bits
          </p>

          <button
            onClick={handleEnter}
            style={{
              padding: '1.25rem 2.5rem',
              background: '#fff',
              color: '#000',
              fontFamily: "'Inter', sans-serif",
              fontWeight: 600,
              fontSize: '1.25rem',
              borderRadius: '1rem',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
              transition: 'transform 0.3s ease',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.05)'
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)'
            }}
            onMouseDown={e => {
              (e.currentTarget as HTMLButtonElement).style.transform = 'scale(0.95)'
            }}
            onMouseUp={e => {
              (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.05)'
            }}
          >
            Activate Antigravity
          </button>
        </div>
      )}
    </div>
  )
}

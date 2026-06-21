import { useState } from 'react'
import Antigravity from './components/Antigravity'
import './index.css'

export default function App() {
  const [fading, setFading] = useState(false)
  const [gone, setGone] = useState(false)

  const handleEnter = () => {
    setFading(true)
    setTimeout(() => setGone(true), 900)
  }

  return (
    <div className="relative w-full h-full">
      {/* Background animation — always mounted so it's ready behind the splash */}
      <Antigravity />

      {/* Splash overlay */}
      {!gone && (
        <div
          className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-8"
          style={{
            background: '#000',
            transition: 'opacity 0.9s ease',
            opacity: fading ? 0 : 1,
            pointerEvents: fading ? 'none' : 'auto',
          }}
        >
          <h1
            style={{
              fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
              fontWeight: 900,
              fontSize: 'clamp(2.5rem, 10vw, 7rem)',
              letterSpacing: '0.25em',
              color: '#fff',
              textTransform: 'uppercase',
              userSelect: 'none',
            }}
          >
            ANTIGRAVITY
          </h1>

          <button
            onClick={handleEnter}
            style={{
              background: 'transparent',
              border: '1px solid rgba(255,255,255,0.4)',
              color: '#fff',
              fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
              fontWeight: 500,
              fontSize: '0.85rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              padding: '0.75rem 2.5rem',
              cursor: 'pointer',
              transition: 'border-color 0.2s, background 0.2s',
            }}
            onMouseEnter={e => {
              ;(e.target as HTMLButtonElement).style.borderColor =
                'rgba(255,255,255,0.9)'
              ;(e.target as HTMLButtonElement).style.background =
                'rgba(255,255,255,0.05)'
            }}
            onMouseLeave={e => {
              ;(e.target as HTMLButtonElement).style.borderColor =
                'rgba(255,255,255,0.4)'
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

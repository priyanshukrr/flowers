import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Sun, Heart, Sparkles, ArrowUp } from 'lucide-react';

export const ClosingScene: React.FC = () => {
  const [hasSentSunshine, setHasSentSunshine] = useState(false);

  const handleSendSunshine = () => {
    setHasSentSunshine(true);

    // Multi-stage golden fireworks and sunflower petal burst
    const end = Date.now() + 1000;
    const colors = ['#FFE042', '#FFB300', '#E8A928', '#F8D879', '#FF85A1'];

    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      id="closing-scene"
      style={{
        padding: '90px 24px 120px',
        textAlign: 'center',
        position: 'relative',
        zIndex: 10,
        background: 'linear-gradient(180deg, transparent 0%, rgba(248, 216, 121, 0.22) 100%)'
      }}
    >
      {/* Large Majestic Sunflower Graphic */}
      <div
        style={{
          width: '180px',
          height: '180px',
          margin: '0 auto 28px',
          position: 'relative'
        }}
      >
        <svg viewBox="0 0 200 200" style={{ width: '100%', height: '100%' }}>
          <defs>
            <radialGradient id="closing-disk-grad" cx="45%" cy="45%" r="55%">
              <stop offset="0%" stopColor="#7E472A" />
              <stop offset="100%" stopColor="#351C0C" />
            </radialGradient>
            <linearGradient id="closing-petal-grad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFE042" />
              <stop offset="50%" stopColor="#FFB300" />
              <stop offset="100%" stopColor="#E67E00" />
            </linearGradient>
          </defs>

          {/* Majestic Layered Petals */}
          <g>
            {[0, 20, 40, 60, 80, 100, 120, 140, 160, 180, 200, 220, 240, 260, 280, 300, 320, 340].map((deg) => (
              <path
                key={deg}
                d="M100 100 Q93 30 100 10 Q107 30 100 100"
                fill="url(#closing-petal-grad)"
                transform={`rotate(${deg} 100 100)`}
                opacity={deg % 40 === 0 ? 0.95 : 0.85}
              />
            ))}
          </g>

          <circle cx="100" cy="100" r="34" fill="url(#closing-disk-grad)" stroke="#FFAA00" strokeWidth="2.5" />
          <circle cx="95" cy="94" r="2" fill="#FFE042" opacity="0.7" />
          <circle cx="105" cy="96" r="2.2" fill="#E8A928" opacity="0.7" />
          <circle cx="100" cy="105" r="2" fill="#FFE042" opacity="0.6" />
        </svg>
      </div>

      {/* The 3 Poetic Closing Lines */}
      <div style={{ maxWidth: '680px', margin: '0 auto 32px' }}>
        <p
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(1.3rem, 3.5vw, 1.75rem)',
            fontStyle: 'italic',
            lineHeight: 1.7,
            color: 'var(--color-cocoa-deep)'
          }}
        >
          Somewhere, a sunflower is blooming.
          <br />
          Somewhere, the sun is shining.
          <br />
          And somewhere, there's a girl named Nikita who deserves a little extra happiness today.
        </p>
      </div>

      {/* Headline Her Name */}
      <h3
        style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(2.4rem, 6vw, 3.8rem)',
          fontWeight: 700,
          color: 'var(--color-cocoa-deep)',
          marginBottom: '36px'
        }}
      >
        Keep blooming, Nikita. 🌻
      </h3>

      {/* Interactive Sunshine Button */}
      <div style={{ marginBottom: '32px' }}>
        <button
          onClick={handleSendSunshine}
          className="btn-primary"
          style={{
            padding: '18px 40px',
            fontSize: '1.15rem'
          }}
        >
          <Sun size={20} />
          <span>Send a little sunshine ☀️</span>
        </button>
      </div>

      {/* Revealed Sunshine Pocket Note */}
      {hasSentSunshine && (
        <div
          style={{
            maxWidth: '540px',
            margin: '0 auto 40px',
            padding: '24px 28px',
            backgroundColor: 'rgba(255, 253, 249, 0.95)',
            border: '1.5px solid var(--color-sunflower)',
            borderRadius: '16px',
            boxShadow: 'var(--shadow-md)',
            animation: 'noteFloat 0.5s var(--ease-spring) forwards'
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-handwriting)',
              fontSize: '1.55rem',
              fontWeight: 600,
              color: 'var(--color-cocoa-deep)',
              lineHeight: 1.5,
              margin: 0
            }}
          >
            "Consider this your pocket-sized sunshine. Keep it for a cloudy day." 🌻💛
          </p>
        </div>
      )}

      {/* Back to Top Button */}
      <div style={{ marginTop: '20px' }}>
        <button
          onClick={scrollToTop}
          className="btn-secondary"
          style={{ fontSize: '0.9rem' }}
        >
          <ArrowUp size={16} />
          <span>Back to beginning</span>
        </button>
      </div>

      {/* Sweet small footer note */}
      <p
        style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '0.85rem',
          color: 'rgba(108, 75, 59, 0.6)',
          marginTop: '44px',
          letterSpacing: '0.04em'
        }}
      >
        A Little Universe for Nikita • Made with all the sunshine in the world 🌻
      </p>
    </footer>
  );
};

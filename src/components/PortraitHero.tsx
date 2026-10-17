import React, { useState, useEffect } from 'react';
import { Sun, Heart, Sparkles } from 'lucide-react';

export const PortraitHero: React.FC = () => {
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Gentle parallax effect for background floral doodles
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      setMouseOffset({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section
      id="portrait-hero"
      style={{
        padding: '90px 24px 60px',
        maxWidth: '1100px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 10
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '50px',
          alignItems: 'center'
        }}
      >
        {/* Left Column: Nikita's Authentic Portrait Mounted on Fine Botanical Journal Page */}
        <div style={{ position: 'relative', margin: '0 auto', width: '100%', maxWidth: '420px' }}>
          
          {/* Parallax Floating Botanical Doodles & Pressed Flowers behind */}
          <div
            style={{
              position: 'absolute',
              top: '-35px',
              left: '-30px',
              width: '85px',
              height: '85px',
              transform: `translate(${mouseOffset.x * 0.7}px, ${mouseOffset.y * 0.7}px) rotate(-12deg)`,
              transition: 'transform 0.2s ease-out',
              pointerEvents: 'none',
              zIndex: 3
            }}
          >
            <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%', filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.08))' }}>
              <path d="M50 50 Q45 15 50 5 Q55 15 50 50" fill="#F8D879" transform="rotate(0 50 50)" />
              <path d="M50 50 Q45 15 50 5 Q55 15 50 50" fill="#E8A928" transform="rotate(45 50 50)" />
              <path d="M50 50 Q45 15 50 5 Q55 15 50 50" fill="#F8D879" transform="rotate(90 50 50)" />
              <path d="M50 50 Q45 15 50 5 Q55 15 50 50" fill="#E8A928" transform="rotate(135 50 50)" />
              <path d="M50 50 Q45 15 50 5 Q55 15 50 50" fill="#F8D879" transform="rotate(180 50 50)" />
              <path d="M50 50 Q45 15 50 5 Q55 15 50 50" fill="#E8A928" transform="rotate(225 50 50)" />
              <path d="M50 50 Q45 15 50 5 Q55 15 50 50" fill="#F8D879" transform="rotate(270 50 50)" />
              <path d="M50 50 Q45 15 50 5 Q55 15 50 50" fill="#E8A928" transform="rotate(315 50 50)" />
              <circle cx="50" cy="50" r="14" fill="#6C4B3B" />
              <circle cx="50" cy="50" r="11" fill="#4E3427" />
            </svg>
          </div>

          <div
            style={{
              position: 'absolute',
              bottom: '-25px',
              right: '-25px',
              width: '75px',
              height: '75px',
              transform: `translate(${mouseOffset.x * -0.6}px, ${mouseOffset.y * -0.6}px) rotate(24deg)`,
              transition: 'transform 0.2s ease-out',
              pointerEvents: 'none',
              zIndex: 3
            }}
          >
            <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%' }}>
              <path d="M50 90 Q30 50 50 10 Q70 50 50 90" fill="#5A7E68" opacity="0.85" />
              <path d="M50 90 L50 10" stroke="#355943" strokeWidth="2" strokeDasharray="3 3" />
            </svg>
          </div>

          {/* The Mounted Editorial Frame */}
          <div className="portrait-mount">
            {/* Vintage Washi Tape Top Accent */}
            <div className="washi-tape tape-top-center" />

            <div className="portrait-frame">
              <img
                src="/nikita-portrait.jpg"
                alt="Nikita's beautiful warm smile"
                className="portrait-img"
                loading="eager"
              />
            </div>

            {/* Handwritten Annotation directly pinned under the portrait */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: '14px',
                padding: '0 4px'
              }}
            >
              <span className="handwritten-annotation">
                our little ray of sunshine ☀️
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '0.85rem',
                  fontStyle: 'italic',
                  color: 'var(--color-green-sage)'
                }}
              >
                plate no. 01 🌿
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Editorial Typography & Soulful Words */}
        <div style={{ padding: '0 10px' }}>
          
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              color: 'var(--color-sunflower)',
              marginBottom: '16px'
            }}
          >
            <Sun size={18} />
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontWeight: 600,
                fontSize: '0.85rem',
                textTransform: 'uppercase',
                letterSpacing: '0.18em',
                color: 'var(--color-green-deep)'
              }}
            >
              Sunflower Field Memoir
            </span>
          </div>

          <p
            style={{
              fontFamily: 'var(--font-handwriting)',
              fontSize: '1.85rem',
              color: 'var(--color-amber)',
              marginBottom: '10px',
              fontWeight: 600
            }}
          >
            Some people just make the world feel a little sunnier.
          </p>

          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(3.5rem, 8vw, 5.5rem)',
              fontWeight: 700,
              lineHeight: 0.95,
              color: 'var(--color-cocoa-deep)',
              letterSpacing: '-0.02em',
              marginBottom: '18px'
            }}
          >
            Nikita.
          </h2>

          <p
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(1.4rem, 3vw, 1.85rem)',
              fontStyle: 'italic',
              color: 'var(--color-green-deep)',
              marginBottom: '26px'
            }}
          >
            Keep blooming, always. 🌻
          </p>

          <div
            style={{
              width: '80px',
              height: '2px',
              background: 'linear-gradient(90deg, var(--color-sunflower), transparent)',
              marginBottom: '24px'
            }}
          />

          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '1.05rem',
              color: 'var(--color-cocoa)',
              lineHeight: 1.75,
              maxWidth: '480px',
              marginBottom: '28px'
            }}
          >
            Just like a sunflower naturally finds the golden light, your warmth and genuine smile brighten every space you enter. Here is a little sanctuary built to celebrate everything that makes you, you.
          </p>

          {/* Quick interactive shortcut down to the letter */}
          <a
            href="#sunshine-letter"
            className="btn-secondary"
            style={{ textDecoration: 'none' }}
          >
            <span>Read your heartfelt letter</span>
            <span>↓</span>
          </a>
        </div>
      </div>
    </section>
  );
};

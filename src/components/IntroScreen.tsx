import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { ArrowRight, Sparkles } from 'lucide-react';

interface IntroScreenProps {
  onOpen: () => void;
}

export const IntroScreen: React.FC<IntroScreenProps> = ({ onOpen }) => {
  const [isBlooming, setIsBlooming] = useState(false);

  const handleOpenClick = () => {
    setIsBlooming(true);

    // Burst of delicate golden petals and warm sunshine confetti
    confetti({
      particleCount: 50,
      spread: 75,
      origin: { y: 0.55 },
      colors: ['#FFE042', '#FFB300', '#E8A928', '#F8D879', '#FFF8E9'],
      gravity: 0.7,
      ticks: 150,
      scalar: 1.2
    });

    // Stagger transition so Nikita sees the blooming animation before reveal
    setTimeout(() => {
      onOpen();
    }, 900);
  };

  return (
    <section
      className={`intro-screen ${isBlooming ? 'blooming' : ''}`}
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '32px 24px',
        position: 'relative',
        zIndex: 10,
        transition: 'opacity 0.8s ease, transform 0.8s ease'
      }}
    >
      {/* Decorative botanical badge */}
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '6px 16px',
          borderRadius: '9999px',
          backgroundColor: 'rgba(255, 253, 249, 0.8)',
          border: '1px solid rgba(232, 169, 40, 0.3)',
          marginBottom: '28px',
          boxShadow: 'var(--shadow-sm)'
        }}
      >
        <Sparkles size={14} style={{ color: 'var(--color-sunflower)' }} />
        <span
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '0.85rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'var(--color-green-deep)'
          }}
        >
          Special Delivery • For Nikita
        </span>
      </div>

      {/* Illustrated Blooming Sunflower Centerpiece */}
      <div
        style={{
          width: '220px',
          height: '220px',
          margin: '0 auto 28px',
          position: 'relative',
          transition: 'transform 0.9s var(--ease-spring)',
          transform: isBlooming ? 'scale(1.22) rotate(15deg)' : 'scale(1) rotate(0deg)'
        }}
      >
        <svg
          viewBox="0 0 200 200"
          style={{ width: '100%', height: '100%', filter: 'drop-shadow(0 14px 28px rgba(232, 169, 40, 0.25))' }}
        >
          <defs>
            <linearGradient id="intro-petal-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF2A3" />
              <stop offset="50%" stopColor="#F8D879" />
              <stop offset="100%" stopColor="#E8A928" />
            </linearGradient>
            <radialGradient id="intro-disk-grad" cx="45%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#8C583B" />
              <stop offset="65%" stopColor="#5E3824" />
              <stop offset="100%" stopColor="#3B2012" />
            </radialGradient>
            <linearGradient id="intro-stem-grad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#5A7E68" />
              <stop offset="100%" stopColor="#355943" />
            </linearGradient>
          </defs>

          {/* Stem & Leaves */}
          <path
            d="M100 130 Q104 165 98 200"
            stroke="url(#intro-stem-grad)"
            strokeWidth="7"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M100 162 C78 152 64 168 76 182 C92 182 98 168 100 162 Z"
            fill="#497155"
            opacity="0.9"
          />
          <path
            d="M98 150 C120 138 134 154 122 168 C106 168 100 154 98 150 Z"
            fill="#3B7A37"
            opacity="0.9"
          />

          {/* Layer 1: Background Petals */}
          <g style={{ transformOrigin: '100px 100px', opacity: 0.9 }}>
            {[15, 45, 75, 105, 135, 165, 195, 225, 255, 285, 315, 345].map((angle, idx) => (
              <path
                key={`bg-${idx}`}
                d="M100 100 Q91 38 100 16 Q109 38 100 100"
                fill="url(#intro-petal-grad)"
                transform={`rotate(${angle} 100 100)`}
                style={{
                  transition: 'transform 0.6s var(--ease-spring)',
                  transformOrigin: '100px 100px',
                  transform: isBlooming ? `rotate(${angle} 100 100) scale(1.15)` : `rotate(${angle} 100 100) scale(0.95)`
                }}
              />
            ))}
          </g>

          {/* Layer 2: Foreground Golden Petals */}
          <g style={{ transformOrigin: '100px 100px' }}>
            {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, idx) => (
              <path
                key={`fg-${idx}`}
                d="M100 100 Q92 34 100 12 Q108 34 100 100"
                fill="url(#intro-petal-grad)"
                transform={`rotate(${angle} 100 100)`}
                style={{
                  transition: 'transform 0.6s var(--ease-spring)',
                  transformOrigin: '100px 100px',
                  transform: isBlooming ? `rotate(${angle} 100 100) scale(1.2)` : `rotate(${angle} 100 100) scale(1)`
                }}
              />
            ))}
          </g>

          {/* Textured Sunflower Disk Center */}
          <circle cx="100" cy="100" r="32" fill="url(#intro-disk-grad)" stroke="#E8A928" strokeWidth="2.5" />
          
          {/* Subtle Seed Spiral Accents */}
          <circle cx="95" cy="94" r="2" fill="#F8D879" opacity="0.65" />
          <circle cx="105" cy="95" r="2.2" fill="#E8A928" opacity="0.7" />
          <circle cx="97" cy="104" r="2" fill="#F8D879" opacity="0.6" />
          <circle cx="106" cy="106" r="1.8" fill="#FFE37A" opacity="0.75" />
          <circle cx="100" cy="90" r="1.6" fill="#F8D879" opacity="0.5" />
          <circle cx="90" cy="101" r="1.6" fill="#E8A928" opacity="0.5" />
        </svg>
      </div>

      {/* Opening Intro Texts */}
      <p
        style={{
          fontFamily: 'var(--font-handwriting)',
          fontSize: '1.75rem',
          color: 'var(--color-sunflower)',
          marginBottom: '10px',
          fontWeight: 600,
          letterSpacing: '0.02em'
        }}
      >
        A little something, just for you...
      </p>

      <h1
        style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(2.1rem, 5vw, 3.4rem)',
          fontWeight: 600,
          color: 'var(--color-cocoa-deep)',
          maxWidth: '680px',
          lineHeight: 1.25,
          marginBottom: '36px'
        }}
      >
        Made with sunshine, especially for Nikita 🌻
      </h1>

      {/* Interactive Button */}
      <button
        onClick={handleOpenClick}
        className="btn-primary"
        style={{
          fontSize: '1.15rem',
          padding: '18px 42px'
        }}
        disabled={isBlooming}
      >
        <span>Open your little surprise</span>
        <ArrowRight size={20} />
      </button>

      {/* Delicate bottom note */}
      <p
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '0.85rem',
          color: 'rgba(108, 75, 59, 0.65)',
          marginTop: '32px',
          letterSpacing: '0.05em'
        }}
      >
        Turn up your volume for the sweet melody 🎵
      </p>
    </section>
  );
};

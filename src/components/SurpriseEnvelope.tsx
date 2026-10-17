import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Mail, Heart, Sparkles } from 'lucide-react';

export const SurpriseEnvelope: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleEnvelopeClick = () => {
    if (!isOpen) {
      setIsOpen(true);
      confetti({
        particleCount: 45,
        spread: 70,
        origin: { y: 0.65 },
        colors: ['#FFE042', '#FFB300', '#E8A928', '#FF85A1', '#FFF8E9'],
        gravity: 0.75,
        ticks: 140
      });
    }
  };

  return (
    <section
      id="surprise-envelope"
      style={{
        padding: '80px 24px 90px',
        maxWidth: '850px',
        margin: '0 auto',
        textAlign: 'center',
        position: 'relative',
        zIndex: 10
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <span
          style={{
            fontFamily: 'var(--font-handwriting)',
            fontSize: '1.65rem',
            color: 'var(--color-sunflower)',
            fontWeight: 600,
            display: 'inline-block'
          }}
        >
          A secret keepsake for your journey...
        </span>
        <h2
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(2.3rem, 5vw, 3.4rem)',
            fontWeight: 600,
            color: 'var(--color-cocoa-deep)',
            marginTop: '4px'
          }}
        >
          One last little thing... ✉️
        </h2>
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.95rem',
            color: 'var(--color-cocoa)',
            marginTop: '6px'
          }}
        >
          {isOpen ? 'Folded with love for Nikita' : 'Click the envelope below to unfold this message'}
        </p>
      </div>

      {/* Envelope Interactive Unit */}
      <div className="envelope-wrapper">
        <div
          className={`envelope-box ${isOpen ? 'opened' : ''}`}
          onClick={handleEnvelopeClick}
          role="button"
          tabIndex={0}
          aria-label="Click to open the secret surprise envelope"
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleEnvelopeClick();
            }
          }}
        >
          {/* Triangular Folding Flap */}
          <div className="envelope-flap" />

          {/* Golden Seal on Flap */}
          {!isOpen && (
            <div
              style={{
                position: 'absolute',
                top: '75px',
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 6,
                background: 'radial-gradient(circle, #FFE042 0%, #E8A928 100%)',
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
                color: '#4E3427',
                fontSize: '18px'
              }}
            >
              🌻
            </div>
          )}

          {/* Envelope Body Graphics */}
          <div
            style={{
              position: 'absolute',
              bottom: '18px',
              left: '50%',
              transform: 'translateX(-50%)',
              fontFamily: 'var(--font-serif)',
              fontSize: '1.05rem',
              fontStyle: 'italic',
              color: 'var(--color-cocoa)',
              zIndex: 3
            }}
          >
            To: Nikita 🌻
          </div>
        </div>
      </div>

      {/* Unfolded Secret Paper Note */}
      {isOpen && (
        <div className="unfolded-secret-note">
          <div className="washi-tape tape-top-center" />

          <div style={{ marginBottom: '20px' }}>
            <span style={{ fontSize: '32px' }}>🌻</span>
          </div>

          <p
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(1.25rem, 3.2vw, 1.6rem)',
              lineHeight: 1.8,
              color: 'var(--color-cocoa-deep)',
              maxWidth: '560px',
              margin: '0 auto 24px',
              fontStyle: 'normal'
            }}
          >
            "If I could gift you one thing, it would be the ability to see yourself through the eyes of the people who appreciate you.
          </p>

          <p
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(1.25rem, 3.2vw, 1.6rem)',
              lineHeight: 1.8,
              color: 'var(--color-cocoa-deep)',
              maxWidth: '560px',
              margin: '0 auto 32px'
            }}
          >
            Maybe then you'd understand just how much sunshine you bring into the world. 🌻"
          </p>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '6px',
              marginTop: '16px'
            }}
          >
            <div
              style={{
                width: '60px',
                height: '1.5px',
                backgroundColor: 'rgba(232, 169, 40, 0.4)',
                marginBottom: '10px'
              }}
            />
            <span
              style={{
                fontFamily: 'var(--font-handwriting)',
                fontSize: '2rem',
                fontWeight: 700,
                color: 'var(--color-sunflower)',
                letterSpacing: '0.02em'
              }}
            >
              Stay golden, Nikita. ✨
            </span>
          </div>
        </div>
      )}
    </section>
  );
};

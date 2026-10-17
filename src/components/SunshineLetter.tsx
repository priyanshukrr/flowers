import React, { useState } from 'react';
import { Mail, Heart, Sparkles, Feather } from 'lucide-react';
import confetti from 'canvas-confetti';

export const SunshineLetter: React.FC = () => {
  const [isLetterOpen, setIsLetterOpen] = useState(true);
  const [highlighted, setHighlighted] = useState(false);

  const handleWaxSealClick = () => {
    confetti({
      particleCount: 30,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#E8A928', '#F8D879', '#FFE042', '#FFD1DC']
    });
    setHighlighted(true);
    setTimeout(() => setHighlighted(false), 1200);
  };

  const paragraphs = [
    {
      type: 'greeting',
      text: 'Dear Nikita,'
    },
    {
      type: 'body',
      text: 'You know how sunflowers always turn toward the sunlight?'
    },
    {
      type: 'body',
      text: "I think there's something beautiful about that — the way they keep reaching for the light, even after cloudy days."
    },
    {
      type: 'body',
      text: "And honestly, that's what makes sunflowers so special."
    },
    {
      type: 'emphasis',
      text: 'I hope life gives you a thousand little reasons to smile, people who make you feel appreciated, days that feel like sunshine, and dreams that grow bigger every time you believe in yourself.'
    },
    {
      type: 'body',
      text: 'May you always find your sunshine, even on the cloudy days.'
    },
    {
      type: 'body',
      text: 'And may you never forget how lovely it is to simply be YOU.'
    },
    {
      type: 'body',
      text: 'Keep smiling, keep growing, and keep blooming in your own beautiful way.'
    },
    {
      type: 'closing',
      text: 'With lots of warmth and sunshine,'
    },
    {
      type: 'signature',
      text: 'Someone who wanted to make you smile 🌻'
    }
  ];

  return (
    <section
      id="sunshine-letter"
      style={{
        padding: '70px 24px 90px',
        maxWidth: '900px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 10
      }}
    >
      {/* Section Header */}
      <div style={{ textAlign: 'center', marginBottom: '36px' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            color: 'var(--color-sunflower)',
            marginBottom: '8px'
          }}
        >
          <Feather size={18} />
          <span
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.85rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.18em',
              color: 'var(--color-green-deep)'
            }}
          >
            A Gentle Note
          </span>
        </div>
        <h2
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(2.2rem, 5vw, 3.2rem)',
            fontWeight: 600,
            color: 'var(--color-cocoa-deep)'
          }}
        >
          Words Straight from the Heart
        </h2>
        <p
          style={{
            fontFamily: 'var(--font-handwriting)',
            fontSize: '1.45rem',
            color: 'var(--color-amber)',
            marginTop: '4px'
          }}
        >
          on vintage handmade stationery 📜
        </p>
      </div>

      {/* Cream Stationery Letter Container */}
      <div className={`letter-stationery ${highlighted ? 'highlighted' : ''}`}>
        {/* Washi tape on stationery top corners */}
        <div className="washi-tape tape-top-left" />
        <div className="washi-tape tape-top-right" />

        {/* Interactive Gold Wax Seal */}
        <button
          onClick={handleWaxSealClick}
          className="wax-seal"
          title="Click the seal to sprinkle sunshine ✨"
          aria-label="Wax Seal with sunflower stamp"
          style={{
            cursor: 'pointer',
            transition: 'transform 0.3s var(--ease-spring)'
          }}
        >
          🌻
        </button>

        {/* Letter Text with Editorial Flow */}
        <div style={{ maxWidth: '640px', margin: '0 auto' }}>
          {paragraphs.map((para, idx) => {
            if (para.type === 'greeting') {
              return (
                <h3
                  key={idx}
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: 'clamp(1.9rem, 4vw, 2.4rem)',
                    fontWeight: 600,
                    color: 'var(--color-cocoa-deep)',
                    marginBottom: '26px'
                  }}
                >
                  {para.text}
                </h3>
              );
            }

            if (para.type === 'emphasis') {
              return (
                <div
                  key={idx}
                  style={{
                    margin: '28px 0',
                    padding: '20px 24px',
                    backgroundColor: 'rgba(248, 216, 121, 0.18)',
                    borderLeft: '3px solid var(--color-sunflower)',
                    borderRadius: '0 12px 12px 0'
                  }}
                >
                  <p
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '1.25rem',
                      fontStyle: 'italic',
                      lineHeight: 1.8,
                      color: 'var(--color-cocoa-deep)'
                    }}
                  >
                    "{para.text}"
                  </p>
                </div>
              );
            }

            if (para.type === 'closing') {
              return (
                <p
                  key={idx}
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '1.1rem',
                    color: 'var(--color-cocoa)',
                    marginTop: '36px',
                    marginBottom: '8px'
                  }}
                >
                  {para.text}
                </p>
              );
            }

            if (para.type === 'signature') {
              return (
                <p
                  key={idx}
                  style={{
                    fontFamily: 'var(--font-handwriting)',
                    fontSize: '1.85rem',
                    fontWeight: 700,
                    color: 'var(--color-sunflower)',
                    letterSpacing: '0.02em'
                  }}
                >
                  {para.text}
                </p>
              );
            }

            return (
              <p
                key={idx}
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '1.12rem',
                  lineHeight: 1.85,
                  color: 'var(--color-cocoa)',
                  marginBottom: '20px'
                }}
              >
                {para.text}
              </p>
            );
          })}
        </div>

        {/* Botanical watermark stamp in footer of letter */}
        <div
          style={{
            marginTop: '44px',
            paddingTop: '20px',
            borderTop: '1px dashed rgba(108, 75, 59, 0.2)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '0.85rem',
            color: 'var(--color-green-sage)',
            fontFamily: 'var(--font-serif)',
            fontStyle: 'italic'
          }}
        >
          <span>🌻 Crafted especially for Nikita</span>
          <span>Golden Hour Collection • 2026</span>
        </div>
      </div>
    </section>
  );
};

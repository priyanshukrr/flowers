import React, { useRef, useState } from 'react';
import confetti from 'canvas-confetti';

export const PersistentSignature: React.FC = () => {
  const [clickedCount, setClickedCount] = useState(0);
  const signatureRef = useRef<HTMLDivElement | null>(null);

  const handleSignatureClick = (e: React.MouseEvent<HTMLDivElement>) => {
    setClickedCount((prev) => prev + 1);

    // Calculate coordinates for localized confetti burst
    const rect = signatureRef.current?.getBoundingClientRect();
    const x = rect ? (rect.left + rect.width / 2) / window.innerWidth : 0.85;
    const y = rect ? (rect.top + rect.height / 2) / window.innerHeight : 0.9;

    // Burst golden sunflower petals & warm pink hearts
    confetti({
      particleCount: 28,
      spread: 60,
      startVelocity: 22,
      origin: { x, y },
      colors: ['#FFE042', '#FFB300', '#E8A928', '#FF85A1', '#FF4D6D', '#FFFDF9'],
      shapes: ['circle'],
      ticks: 120,
      gravity: 0.8,
      scalar: 1.1
    });
  };

  return (
    <aside
      ref={signatureRef}
      className="persistent-signature"
      onClick={handleSignatureClick}
      role="button"
      tabIndex={0}
      title="Click for a tiny burst of love & sunshine!"
      aria-label="Love you, mah baby ♡ - Personal signature message"
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleSignatureClick(e as unknown as React.MouseEvent<HTMLDivElement>);
        }
      }}
    >
      <span className="signature-flower" aria-hidden="true">🌻</span>
      <span className="signature-text">Love you, mah baby ♡</span>
      <span className="signature-heart" aria-hidden="true">💖</span>

      {clickedCount > 0 && (
        <span
          key={clickedCount}
          style={{
            position: 'absolute',
            top: '-24px',
            right: '12px',
            fontSize: '0.8rem',
            fontFamily: 'var(--font-handwriting)',
            color: '#E24A6F',
            fontWeight: 700,
            animation: 'noteFloat 1s ease-out forwards',
            pointerEvents: 'none'
          }}
        >
          + sunshine! ✨
        </span>
      )}
    </aside>
  );
};

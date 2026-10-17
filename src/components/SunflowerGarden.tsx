import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Flower2, Sparkles, CheckCircle2 } from 'lucide-react';

interface FlowerData {
  id: number;
  height: number; // Stem height in px
  stemCurve: string;
  headRotation: number;
  note: string;
  flowerSize: number;
  bloomDelay: string;
}

const FLOWERS: FlowerData[] = [
  {
    id: 1,
    height: 230,
    stemCurve: 'M40 0 Q32 110 40 230',
    headRotation: -6,
    flowerSize: 110,
    bloomDelay: '0s',
    note: 'You deserve all the happiness you give to others.'
  },
  {
    id: 2,
    height: 290,
    stemCurve: 'M40 0 Q48 140 40 290',
    headRotation: 8,
    flowerSize: 125,
    bloomDelay: '0.2s',
    note: 'May your dreams grow taller than these sunflowers.'
  },
  {
    id: 3,
    height: 340,
    stemCurve: 'M40 0 Q36 170 40 340',
    headRotation: 0,
    flowerSize: 140,
    bloomDelay: '0.4s',
    note: 'Never let the world dim your beautiful light.'
  },
  {
    id: 4,
    height: 270,
    stemCurve: 'M40 0 Q46 130 40 270',
    headRotation: -10,
    flowerSize: 120,
    bloomDelay: '0.1s',
    note: "Here's to little moments that become big memories."
  },
  {
    id: 5,
    height: 310,
    stemCurve: 'M40 0 Q30 150 40 310',
    headRotation: 5,
    flowerSize: 130,
    bloomDelay: '0.3s',
    note: 'Keep blooming, Nikita. Your season is coming.'
  }
];

export const SunflowerGarden: React.FC = () => {
  const [activeFlower, setActiveFlower] = useState<number | null>(3); // Default flower 3 open
  const [bloomedFlowers, setBloomedFlowers] = useState<Set<number>>(new Set([3]));

  const handleFlowerClick = (flower: FlowerData, e: React.MouseEvent) => {
    setActiveFlower(activeFlower === flower.id ? null : flower.id);
    
    // Add to bloomed set
    setBloomedFlowers((prev) => new Set([...prev, flower.id]));

    // Confetti particles rising from the flower position
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = rect.top / window.innerHeight;

    confetti({
      particleCount: 20,
      spread: 50,
      startVelocity: 18,
      origin: { x, y },
      colors: ['#FFE042', '#FFB300', '#E8A928', '#FFF8E9'],
      gravity: 0.8,
      ticks: 100
    });
  };

  return (
    <section
      id="sunflower-garden"
      style={{
        padding: '70px 20px 60px',
        maxWidth: '1150px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 10
      }}
    >
      {/* Garden Header */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            color: 'var(--color-sunflower)',
            marginBottom: '8px'
          }}
        >
          <Flower2 size={18} />
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
            Interactive Bloom Meadow
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
          Nikita's Sunflower Garden 🌻
        </h2>

        <p
          style={{
            fontFamily: 'var(--font-handwriting)',
            fontSize: '1.45rem',
            color: 'var(--color-amber)',
            marginTop: '6px'
          }}
        >
          Tap any sunflower to hear what it whispers to you
        </p>

        {/* Progress tracker */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            marginTop: '12px',
            padding: '4px 14px',
            borderRadius: '9999px',
            backgroundColor: 'rgba(255, 253, 249, 0.8)',
            border: '1px solid rgba(232, 169, 40, 0.3)',
            fontSize: '0.85rem',
            color: 'var(--color-cocoa)'
          }}
        >
          <CheckCircle2 size={14} style={{ color: 'var(--color-green-sage)' }} />
          <span>
            Flowers Bloomed: <strong>{bloomedFlowers.size} / 5</strong>
          </span>
        </div>
      </div>

      {/* Garden Beds Container */}
      <div className="garden-container">
        {/* Rich soil line */}
        <div className="garden-soil" />

        {FLOWERS.map((flower) => {
          const isSelected = activeFlower === flower.id;
          const isBloomed = bloomedFlowers.has(flower.id);

          return (
            <div
              key={flower.id}
              className="interactive-flower-unit"
              onClick={(e) => handleFlowerClick(flower, e)}
              style={{
                height: `${flower.height + flower.flowerSize / 2}px`
              }}
            >
              {/* Handwritten Note Bubble when flower is clicked */}
              {isSelected && (
                <div className="flower-note-bubble">
                  <p style={{ margin: 0, lineHeight: 1.35 }}>
                    "{flower.note}"
                  </p>
                  <span
                    style={{
                      display: 'block',
                      fontSize: '0.85rem',
                      color: 'var(--color-sunflower)',
                      marginTop: '6px'
                    }}
                  >
                    🌻 flower no. 0{flower.id}
                  </span>
                </div>
              )}

              {/* The Flower Head SVG */}
              <div
                style={{
                  width: `${flower.flowerSize}px`,
                  height: `${flower.flowerSize}px`,
                  position: 'relative',
                  zIndex: 2,
                  transition: 'transform 0.5s var(--ease-spring)',
                  transform: isSelected
                    ? `rotate(${flower.headRotation + 20}deg) scale(1.15)`
                    : `rotate(${flower.headRotation}deg) scale(1)`
                }}
              >
                <svg viewBox="0 0 160 160" style={{ width: '100%', height: '100%' }}>
                  <defs>
                    <radialGradient id={`flower-head-grad-${flower.id}`} cx="45%" cy="40%" r="60%">
                      <stop offset="0%" stopColor="#7E472A" />
                      <stop offset="70%" stopColor="#4A2612" />
                      <stop offset="100%" stopColor="#2D1508" />
                    </radialGradient>
                    <linearGradient id={`petal-color-${flower.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#FFF29E" />
                      <stop offset="50%" stopColor="#F8D879" />
                      <stop offset="100%" stopColor="#E8A928" />
                    </linearGradient>
                  </defs>

                  {/* Golden Petals in Circle */}
                  <g>
                    {[0, 24, 48, 72, 96, 120, 144, 168, 192, 216, 240, 264, 288, 312, 336].map((deg) => (
                      <path
                        key={deg}
                        d="M80 80 Q74 25 80 8 Q86 25 80 80"
                        fill={`url(#petal-color-${flower.id})`}
                        transform={`rotate(${deg} 80 80)`}
                        style={{
                          transition: 'all 0.4s ease',
                          transformOrigin: '80px 80px'
                        }}
                      />
                    ))}
                  </g>

                  {/* Seed Disc Center */}
                  <circle
                    cx="80"
                    cy="80"
                    r="25"
                    fill={`url(#flower-head-grad-${flower.id})`}
                    stroke="#E8A928"
                    strokeWidth="2"
                  />
                  {/* Glowing seed dots */}
                  <circle cx="75" cy="76" r="1.8" fill="#F8D879" opacity="0.7" />
                  <circle cx="85" cy="78" r="1.8" fill="#F8D879" opacity="0.6" />
                  <circle cx="80" cy="86" r="2" fill="#E8A928" opacity="0.75" />
                  <circle cx="86" cy="85" r="1.5" fill="#FFE37A" opacity="0.8" />
                </svg>
              </div>

              {/* Natural Green Stem with Leaves */}
              <div
                style={{
                  width: '80px',
                  height: `${flower.height}px`,
                  marginTop: `-${flower.flowerSize / 2}px`,
                  position: 'relative',
                  zIndex: 1
                }}
              >
                <svg
                  viewBox={`0 0 80 ${flower.height}`}
                  style={{ width: '100%', height: '100%', overflow: 'visible' }}
                >
                  {/* Stem */}
                  <path
                    d={flower.stemCurve}
                    stroke="#497155"
                    strokeWidth="6"
                    strokeLinecap="round"
                    fill="none"
                  />

                  {/* Left Botanical Leaf */}
                  <path
                    d={`M38 ${flower.height * 0.45} C15 ${flower.height * 0.4} 8 ${flower.height * 0.52} 22 ${flower.height * 0.58} C35 ${flower.height * 0.58} 38 ${flower.height * 0.48} 38 ${flower.height * 0.45} Z`}
                    fill="#355943"
                  />

                  {/* Right Botanical Leaf */}
                  <path
                    d={`M42 ${flower.height * 0.7} C65 ${flower.height * 0.65} 74 ${flower.height * 0.77} 60 ${flower.height * 0.82} C46 ${flower.height * 0.82} 42 ${flower.height * 0.73} 42 ${flower.height * 0.7} Z`}
                    fill="#5A7E68"
                  />
                </svg>
              </div>

              {/* Little ground tag indicator */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '2px',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  color: isBloomed ? 'var(--color-green-deep)' : 'var(--color-cocoa)',
                  background: isBloomed ? 'rgba(248, 216, 121, 0.4)' : 'rgba(255, 255, 255, 0.6)',
                  padding: '2px 8px',
                  borderRadius: '10px'
                }}
              >
                0{flower.id} 🌻
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

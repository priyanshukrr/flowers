import React, { useState } from 'react';
import { FloatingPetals } from './components/FloatingPetals';
import { PersistentSignature } from './components/PersistentSignature';
import { AudioPlayer } from './components/AudioPlayer';
import { IntroScreen } from './components/IntroScreen';
import { PortraitHero } from './components/PortraitHero';
import { SunshineLetter } from './components/SunshineLetter';
import { SunflowerGarden } from './components/SunflowerGarden';
import { SurpriseEnvelope } from './components/SurpriseEnvelope';
import { ClosingScene } from './components/ClosingScene';

export const App: React.FC = () => {
  const [hasEntered, setHasEntered] = useState(false);

  const handleOpenSurprise = () => {
    setHasEntered(true);
    // Smooth scroll down to portrait hero after reveal
    setTimeout(() => {
      const heroElement = document.getElementById('portrait-hero');
      if (heroElement) {
        heroElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="relative min-h-screen bg-[#FFF8E9]">
      {/* Subtle paper grain texture */}
      <div className="paper-grain-texture" />

      {/* Floating Canvas Petals & Golden Sun Motes */}
      <FloatingPetals />

      {/* Ambient Sunbeam Glow Effect in Upper Corner */}
      <div className="ambient-sunbeam" />

      {/* Soothing Melodic Audio Player Toggle */}
      <AudioPlayer />

      {/* 
        GLOBAL PERSISTENT SIGNATURE: "Love you, mah baby ♡"
        Fixed to the viewport and permanently visible across ALL pages & sections!
      */}
      <PersistentSignature />

      {/* Main Experience Flow */}
      {!hasEntered ? (
        <IntroScreen onOpen={handleOpenSurprise} />
      ) : (
        <main
          style={{
            animation: 'fadeInUp 1s ease-out forwards',
            opacity: 1
          }}
        >
          {/* Section 1: Nikita's Mounted Botanical Portrait */}
          <PortraitHero />

          {/* Section 2: Handwritten Cream Stationery Letter */}
          <SunshineLetter />

          {/* Section 3: 5 Interactive Blooming Sunflowers Garden */}
          <SunflowerGarden />

          {/* Section 4: Secret Unfolding Keepsake Envelope */}
          <SurpriseEnvelope />

          {/* Section 5: Poetic Closing Scene & Pocket Sunshine */}
          <ClosingScene />
        </main>
      )}
    </div>
  );
};

export default App;

import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';

export const AudioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const isPlayingRef = useRef(false);
  const intervalRef = useRef<number | null>(null);

  // Soothing pentatonic melody in D Major / G Major for peaceful sunshine vibes
  // Notes: D4, F#4, A4, B4, D5, E5, F#5, A5
  const notes = [293.66, 369.99, 440.0, 493.88, 587.33, 659.25, 739.99, 880.0];
  const melody = [
    0, 2, 4, 3, 5, 4, 2, 1,
    0, 3, 2, 4, 5, 3, 1, 0,
    2, 4, 6, 5, 4, 2, 3, 1,
    0, 2, 4, 5, 7, 5, 4, 2
  ];

  const playTone = (freq: number) => {
    if (!audioCtxRef.current) return;
    const ctx = audioCtxRef.current;
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    // Warm sine wave with subtle triangle overtone for music box/harp timbre
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, ctx.currentTime);

    const now = ctx.currentTime;
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.08, now + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.8);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 1.9);
  };

  const startMusic = () => {
    if (!audioCtxRef.current) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      audioCtxRef.current = new AudioContextClass();
    }

    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }

    let noteIndex = 0;
    isPlayingRef.current = true;
    setIsPlaying(true);

    // Initial note
    playTone(notes[melody[noteIndex % melody.length]]);

    intervalRef.current = window.setInterval(() => {
      if (!isPlayingRef.current) return;
      noteIndex++;
      const currentNote = notes[melody[noteIndex % melody.length]];
      playTone(currentNote);
    }, 620);
  };

  const stopMusic = () => {
    isPlayingRef.current = false;
    setIsPlaying(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const toggleMusic = () => {
    if (isPlaying) {
      stopMusic();
    } else {
      startMusic();
    }
  };

  useEffect(() => {
    return () => {
      isPlayingRef.current = false;
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  return (
    <button
      className="audio-toggle-btn"
      onClick={toggleMusic}
      aria-label={isPlaying ? 'Mute soothing melody' : 'Play soothing sunflower melody'}
      title={isPlaying ? 'Mute acoustic music' : 'Play peaceful acoustic melody'}
    >
      {isPlaying ? (
        <>
          <div className="sound-bars" aria-hidden="true">
            <span className="sound-bar active" />
            <span className="sound-bar active" />
            <span className="sound-bar active" />
            <span className="sound-bar active" />
          </div>
          <span style={{ fontWeight: 500 }}>Sound On</span>
        </>
      ) : (
        <>
          <Music size={15} style={{ color: 'var(--color-sunflower)' }} />
          <span>Play Melody</span>
        </>
      )}
    </button>
  );
};

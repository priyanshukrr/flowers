import React, { useEffect, useRef } from 'react';

interface Petal {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  angle: number;
  rotationSpeed: number;
  opacity: number;
  petalType: 'petal' | 'dust';
}

export const FloatingPetals: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const petalCount = window.innerWidth < 768 ? 22 : 45;
    const petals: Petal[] = [];

    for (let i = 0; i < petalCount; i++) {
      petals.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 9 + 6,
        speedY: Math.random() * 0.9 + 0.4,
        speedX: Math.sin(Math.random() * Math.PI) * 0.6 - 0.2,
        angle: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 1.5,
        opacity: Math.random() * 0.6 + 0.35,
        petalType: Math.random() > 0.4 ? 'petal' : 'dust'
      });
    }

    const drawPetal = (p: Petal) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.angle * Math.PI) / 180);
      ctx.globalAlpha = p.opacity;

      if (p.petalType === 'dust') {
        // Warm golden sunlight particle
        const dustGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, p.size / 2);
        dustGrad.addColorStop(0, '#FFE072');
        dustGrad.addColorStop(1, 'rgba(232, 169, 40, 0)');
        ctx.fillStyle = dustGrad;
        ctx.beginPath();
        ctx.arc(0, 0, p.size / 2.5, 0, Math.PI * 2);
        ctx.fill();
      } else {
        // Detailed soft sunflower petal
        const grad = ctx.createLinearGradient(0, -p.size, 0, p.size);
        grad.addColorStop(0, '#FFE37A');
        grad.addColorStop(0.5, '#F8D879');
        grad.addColorStop(1, '#E8A928');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.moveTo(0, -p.size * 1.3);
        ctx.bezierCurveTo(p.size * 0.6, -p.size * 0.6, p.size * 0.5, p.size * 0.6, 0, p.size * 1.2);
        ctx.bezierCurveTo(-p.size * 0.5, p.size * 0.6, -p.size * 0.6, -p.size * 0.6, 0, -p.size * 1.3);
        ctx.closePath();
        ctx.fill();

        // Delicate central vein
        ctx.strokeStyle = 'rgba(212, 136, 22, 0.4)';
        ctx.lineWidth = 0.75;
        ctx.beginPath();
        ctx.moveTo(0, -p.size * 0.9);
        ctx.lineTo(0, p.size * 0.8);
        ctx.stroke();
      }

      ctx.restore();
    };

    let time = 0;
    const render = () => {
      time += 0.01;
      ctx.clearRect(0, 0, width, height);

      petals.forEach((p) => {
        // Natural gentle swaying breeze motion
        p.y += p.speedY;
        p.x += p.speedX + Math.sin(time + p.y * 0.005) * 0.4;
        p.angle += p.rotationSpeed;

        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }
        if (p.x > width + 20) p.x = -20;
        if (p.x < -20) p.x = width + 20;

        drawPetal(p);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="petal-canvas" aria-hidden="true" />;
};

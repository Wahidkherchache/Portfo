import { useEffect, useRef } from 'react';

interface Line {
  x: number;
  y: number;
  len: number;
  speed: number;
  alpha: number;
}

const COUNT = 80;

export default function SpeedLines() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf = 0;
    let w = 0;
    let h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const lines: Line[] = Array.from({ length: COUNT }, () => makeLine());

    function makeLine(): Line {
      return {
        x: Math.random() * w,
        y: Math.random() * h,
        len: 20 + Math.random() * 120,
        speed: 2 + Math.random() * 9,
        alpha: 0.05 + Math.random() * 0.3,
      };
    }

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const l of lines) {
        const grad = ctx.createLinearGradient(l.x, l.y, l.x + l.len, l.y);
        grad.addColorStop(0, `rgba(220, 0, 0, 0)`);
        grad.addColorStop(0.5, `rgba(220, 0, 0, ${l.alpha})`);
        grad.addColorStop(1, `rgba(220, 0, 0, 0)`);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(l.x, l.y);
        ctx.lineTo(l.x + l.len, l.y);
        ctx.stroke();

        l.x += l.speed * 3;
        if (l.x > w + l.len) {
          l.x = -l.len;
          l.y = Math.random() * h;
        }
      }
      raf = requestAnimationFrame(draw);
    };

    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      raf = requestAnimationFrame(draw);
    } else {
      ctx.clearRect(0, 0, w, h);
    }

    window.addEventListener('resize', resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none opacity-70"
      aria-hidden
    />
  );
}

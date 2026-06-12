import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * AntigravityBackground — Glassmorphic dotted background with
 * anti-gravity floating particles. Toggled on/off via flag.
 *
 * Usage:
 *   <AntigravityBackground enabled={true} />
 *
 * The `enabled` prop controls rendering. Pass false to remove it.
 */

const DOT_COUNT = 60;
const COLORS = [
  'rgba(240,105,34,0.35)',
  'rgba(255,160,90,0.30)',
  'rgba(255,200,150,0.25)',
  'rgba(236,72,153,0.20)',
  'rgba(168,85,247,0.18)',
  'rgba(59,130,246,0.15)',
];

function randomBetween(a, b) {
  return a + Math.random() * (b - a);
}

function createDot() {
  return {
    x: Math.random() * 100,
    y: Math.random() * 100,
    r: randomBetween(2, 7),
    // anti-gravity drift (negative = upwards)
    vx: randomBetween(-0.15, 0.15),
    vy: randomBetween(-0.25, -0.04),
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    opacity: randomBetween(0.3, 0.9),
    pulse: randomBetween(0, Math.PI * 2),
    pulseSpeed: randomBetween(0.005, 0.02),
  };
}

export default function AntigravityBackground({ enabled = true }) {
  const canvasRef = useRef(null);
  const dotsRef = useRef([]);
  const animRef = useRef(null);

  // Initialise dots once
  useEffect(() => {
    if (!enabled) return;
    dotsRef.current = Array.from({ length: DOT_COUNT }, createDot);
  }, [enabled]);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = (canvas.width = canvas.offsetWidth);
    const H = (canvas.height = canvas.offsetHeight);

    ctx.clearRect(0, 0, W, H);

    dotsRef.current.forEach((d) => {
      // update position — anti-gravity floats upward
      d.x += d.vx;
      d.y += d.vy;
      d.pulse += d.pulseSpeed;

      // wrap around edges
      if (d.y < -2) d.y = 102;
      if (d.y > 102) d.y = -2;
      if (d.x < -2) d.x = 102;
      if (d.x > 102) d.x = -2;

      const cx = (d.x / 100) * W;
      const cy = (d.y / 100) * H;
      const currentR = d.r + Math.sin(d.pulse) * 1.5;
      const currentOpacity = d.opacity * (0.6 + 0.4 * Math.sin(d.pulse));

      // glow
      ctx.beginPath();
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, currentR * 3);
      grad.addColorStop(0, d.color.replace(/[\d.]+\)$/, `${currentOpacity * 0.5})`));
      grad.addColorStop(1, 'transparent');
      ctx.fillStyle = grad;
      ctx.arc(cx, cy, currentR * 3, 0, Math.PI * 2);
      ctx.fill();

      // dot
      ctx.beginPath();
      ctx.arc(cx, cy, currentR, 0, Math.PI * 2);
      ctx.fillStyle = d.color.replace(/[\d.]+\)$/, `${currentOpacity})`);
      ctx.fill();
    });

    // draw faint connecting lines between nearby dots
    for (let i = 0; i < dotsRef.current.length; i++) {
      for (let j = i + 1; j < dotsRef.current.length; j++) {
        const a = dotsRef.current[i];
        const b = dotsRef.current[j];
        const dx = ((a.x - b.x) / 100) * W;
        const dy = ((a.y - b.y) / 100) * H;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo((a.x / 100) * W, (a.y / 100) * H);
          ctx.lineTo((b.x / 100) * W, (b.y / 100) * H);
          ctx.strokeStyle = `rgba(240,105,34,${0.06 * (1 - dist / 120)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }

    animRef.current = requestAnimationFrame(draw);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    animRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animRef.current);
  }, [enabled, draw]);

  if (!enabled) return null;

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  );
}

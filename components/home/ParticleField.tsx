"use client";

import { useEffect, useRef } from "react";

interface Point {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
}

/**
 * Abstract WebGL-free "energy field" background: a lightweight canvas
 * particle/line network suggesting depth, current and connection — used in
 * place of a real 3D product model (none was supplied). Respects
 * prefers-reduced-motion and pauses when off-screen for performance.
 */
export function ParticleField({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let points: Point[] = [];
    let raf = 0;
    let visible = true;
    let mouseX = 0;
    let mouseY = 0;

    function resize() {
      if (!canvas) return;
      const rect = canvas.parentElement!.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      canvas!.style.width = `${width}px`;
      canvas!.style.height = `${height}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      const density = width < 640 ? 70 : width < 1024 ? 110 : 150;
      points = Array.from({ length: density }).map(() => ({
        x: Math.random() * width,
        y: Math.random() * height,
        z: Math.random(),
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
      }));
    }

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      const linkDist = width < 640 ? 90 : 130;

      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        p.x += p.vx + (mouseX - width / 2) * 0.00002 * (1 - p.z);
        p.y += p.vy + (mouseY - height / 2) * 0.00002 * (1 - p.z);

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        for (let j = i + 1; j < points.length; j++) {
          const q = points[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < linkDist) {
            const alpha = (1 - dist / linkDist) * 0.18 * (1 - (p.z + q.z) / 2.5);
            ctx.strokeStyle = `rgba(59, 91, 253, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
        }
      }

      for (const p of points) {
        const r = 1 + p.z * 1.6;
        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(10, 11, 13, ${0.12 + p.z * 0.25})`;
        ctx.fill();
      }
    }

    function loop() {
      if (visible) draw();
      raf = requestAnimationFrame(loop);
    }

    resize();
    if (reduceMotion) {
      draw();
    } else {
      loop();
    }

    const onResize = () => resize();
    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener("resize", onResize);
    if (!reduceMotion) window.addEventListener("mousemove", onMove);

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { threshold: 0 },
    );
    io.observe(canvas);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMove);
      io.disconnect();
    };
  }, []);

  return (
    <div className={className}>
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
}

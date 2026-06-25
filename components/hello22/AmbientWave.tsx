"use client";

import { useEffect, useRef } from "react";

/** Full-screen ambient background sine waves drawn on a canvas. */
export function AmbientWave() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let raf = 0;

    function resize() {
      w = canvas!.width = window.innerWidth * window.devicePixelRatio;
      h = canvas!.height = window.innerHeight * window.devicePixelRatio;
      canvas!.style.width = window.innerWidth + "px";
      canvas!.style.height = window.innerHeight + "px";
    }
    resize();
    window.addEventListener("resize", resize);

    const waves = [
      { amp: 70, freq: 0.0025, speed: 0.012, color: "rgba(44, 118, 237, 0.35)", offset: 0 },
      { amp: 45, freq: 0.004, speed: 0.01, color: "rgba(44, 118, 237, 0.18)", offset: 80 },
      { amp: 90, freq: 0.0018, speed: 0.007, color: "rgba(197, 245, 66, 0.10)", offset: 160 },
    ];

    let t = 0;
    function draw() {
      ctx!.clearRect(0, 0, w, h);
      const cy = h / 2;
      waves.forEach((wave) => {
        ctx!.beginPath();
        ctx!.strokeStyle = wave.color;
        ctx!.lineWidth = 1.5 * window.devicePixelRatio;
        for (let x = 0; x < w; x += 2) {
          const y =
            cy +
            Math.sin(x * wave.freq + t * wave.speed + wave.offset) * wave.amp * window.devicePixelRatio +
            Math.sin(x * wave.freq * 2.3 + t * wave.speed * 1.4) * wave.amp * 0.3 * window.devicePixelRatio;
          if (x === 0) ctx!.moveTo(x, y);
          else ctx!.lineTo(x, y);
        }
        ctx!.stroke();
      });
      t += 1;
      raf = requestAnimationFrame(draw);
    }
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      id="ambientWave"
      className="fixed inset-0 z-0 opacity-40 pointer-events-none"
    />
  );
}

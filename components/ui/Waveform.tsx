"use client";

import { motion } from "framer-motion";

/* Deterministic pseudo-random height so SSR and client render identically */
function barHeight(i: number, min: number, max: number) {
  const t = Math.abs(Math.sin(i * 12.9898) * 43758.5453) % 1;
  return min + t * (max - min);
}

type EqualizerBarsProps = {
  bars?: number;
  className?: string;
  barClassName?: string;
  active?: boolean;
  height?: number;
};

/* Small animated equalizer — the brand motif, used in labels, players, stats */
export function EqualizerBars({
  bars = 5,
  className = "",
  barClassName = "bg-primary",
  active = true,
  height = 14,
}: EqualizerBarsProps) {
  return (
    <span
      className={`flex items-end gap-[2px] ${className}`}
      style={{ height }}
      aria-hidden="true"
    >
      {Array.from({ length: bars }, (_, i) => {
        const h = barHeight(i, height * 0.35, height);
        return active ? (
          <motion.span
            key={i}
            className={`w-[3px] rounded-full ${barClassName}`}
            animate={{ height: [h * 0.4, h, h * 0.55, h * 0.9, h * 0.4] }}
            transition={{
              duration: 0.9 + (i % 3) * 0.2,
              repeat: Infinity,
              delay: i * 0.08,
              ease: "easeInOut",
            }}
          />
        ) : (
          <span
            key={i}
            className={`w-[3px] rounded-full ${barClassName}`}
            style={{ height: h * 0.5 }}
          />
        );
      })}
    </span>
  );
}

/* Full-width waveform strip used as a section divider */
export function WaveDivider({ className = "" }: { className?: string }) {
  const bars = 96;
  return (
    <div
      className={`pointer-events-none flex h-10 items-center justify-center gap-[3px] overflow-hidden px-4 ${className}`}
      aria-hidden="true"
    >
      {Array.from({ length: bars }, (_, i) => {
        // envelope: taller in the middle, fading to the edges
        const envelope = Math.sin((i / (bars - 1)) * Math.PI);
        const h = 3 + barHeight(i, 4, 26) * envelope;
        return (
          <motion.span
            key={i}
            className="w-[2px] shrink-0 rounded-full bg-primary/30"
            initial={{ scaleY: 0.3, opacity: 0.4 }}
            whileInView={{ scaleY: 1, opacity: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.008, ease: "easeOut" }}
            style={{ height: h }}
          />
        );
      })}
    </div>
  );
}

"use client";

import { useEffect, useRef } from "react";

type WaveformProps = {
  count: number;
  className?: string;
  barWidth: string;
  minH: number;
  rangeH: number;
  intervalMs: number;
  active?: boolean;
  idleHeight?: string;
  accentEvery?: (i: number) => boolean;
  baseColor?: string;
};

/** Animated bar waveform — mirrors the original hero/call visualizers. */
export function Waveform({
  count,
  className,
  barWidth,
  minH,
  rangeH,
  intervalMs,
  active = true,
  idleHeight,
  accentEvery,
  baseColor = "rgba(44, 118, 237, 0.35)",
}: WaveformProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const bars = Array.from(el.children) as HTMLElement[];
    if (!active) {
      bars.forEach((b) => (b.style.height = idleHeight ?? minH + "%"));
      return;
    }
    const set = () =>
      bars.forEach((b) => (b.style.height = minH + Math.random() * rangeH + "%"));
    set();
    const id = setInterval(set, intervalMs);
    return () => clearInterval(id);
  }, [active, count, intervalMs, minH, rangeH, idleHeight]);

  return (
    <div ref={ref} className={className}>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          style={{
            width: barWidth,
            flexShrink: 0,
            background: accentEvery?.(i) ? "var(--accent)" : baseColor,
            borderRadius: "999px",
            height: idleHeight ?? minH + "%",
            transition: "height 0.25s ease",
          }}
        />
      ))}
    </div>
  );
}

"use client";

import { Waveform } from "./Waveform";

export function Hero() {
  return (
    <section className="relative pt-44 pb-24 lg:pt-52 lg:pb-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        {/* Status pill */}
        <div className="flex justify-center mb-10 reveal">
          <div className="glass rounded-full px-4 py-1.5 flex items-center gap-3 text-xs">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-[var(--accent)] opacity-75 pulse-ring"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--accent)]"></span>
            </span>
            <span className="text-[var(--text-muted)]">22,418 calls happening right now</span>
          </div>
        </div>

        {/* Big "hello." */}
        <div className="text-center reveal">
          <h1 className="font-display text-[88px] sm:text-[140px] lg:text-[200px] leading-[0.85] font-light">
            <span className="font-italic grad-text">hello</span>
            <span className="accent-text">.</span>
          </h1>

          <p className="font-display text-3xl sm:text-5xl lg:text-6xl font-light tracking-tight leading-[1.05] mt-8 max-w-4xl mx-auto">
            I&apos;m your AI voice agent —{" "}
            <span className="font-italic text-[var(--accent-soft)]">ready to talk.</span>
          </p>

          <p className="mt-8 text-lg lg:text-xl text-[var(--text-muted)] max-w-2xl mx-auto leading-relaxed">
            hello22 builds voice agents that answer calls, book appointments, qualify leads, and resolve support —
            sounding unmistakably human, in 22+ languages, 24/7.
          </p>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
            <a href="#cta" className="btn-primary px-8 py-4 rounded-full text-sm flex items-center gap-2.5">
              Start free — 22 min setup
              <i className="fa-solid fa-arrow-right text-xs"></i>
            </a>
            <a href="#demo" className="btn-ghost px-8 py-4 rounded-full text-sm font-medium flex items-center gap-2.5">
              <i className="fa-solid fa-play text-[10px]"></i>
              Hear a live call
            </a>
          </div>
        </div>

        {/* Waveform visualizer */}
        <div className="mt-20 reveal">
          <div className="glass rounded-3xl p-6 lg:p-8 relative overflow-hidden">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full bg-gradient-to-br from-[var(--accent)] to-[#1b56b8] flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full bg-[var(--accent)] pulse-ring opacity-50"></div>
                  <i className="fa-solid fa-phone text-white text-xs relative"></i>
                </div>
                <div>
                  <div className="text-sm font-medium">Inbound call · Acme Dental</div>
                  <div className="text-xs text-[var(--text-muted)]">+1 (415) 555-0142 · 0:42</div>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="live-dot w-1.5 h-1.5 rounded-full bg-[var(--lime)]"></span>
                <span className="text-[var(--lime)] uppercase tracking-wider text-[10px]">Live</span>
              </div>
            </div>

            <Waveform
              count={80}
              className="h-24 flex items-center justify-center gap-[3px]"
              barWidth="3px"
              minH={20}
              rangeH={70}
              intervalMs={220}
              accentEvery={(i) => i % 5 === 0 || i % 7 === 0}
            />

            <div className="flex items-center justify-between mt-5 text-xs text-[var(--text-muted)]">
              <div className="flex items-center gap-4">
                <span><i className="fa-solid fa-language text-[var(--accent)] mr-1.5"></i>EN-US</span>
                <span><i className="fa-solid fa-clock text-[var(--accent)] mr-1.5"></i>220ms latency</span>
                <span><i className="fa-solid fa-microphone text-[var(--accent)] mr-1.5"></i>Voice: Aria</span>
              </div>
              <span className="font-mono">98.4% confidence</span>
            </div>
          </div>
        </div>

        {/* Mini stats */}
        <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-8 reveal">
          <div className="text-center lg:text-left">
            <div className="stat-num text-5xl text-white">22+</div>
            <div className="text-xs uppercase tracking-wider text-[var(--text-muted)] mt-2">Languages</div>
          </div>
          <div className="text-center lg:text-left">
            <div className="stat-num text-5xl text-white">
              220<span className="text-2xl text-[var(--text-muted)]">ms</span>
            </div>
            <div className="text-xs uppercase tracking-wider text-[var(--text-muted)] mt-2">Response latency</div>
          </div>
          <div className="text-center lg:text-left">
            <div className="stat-num text-5xl accent-text">99.2%</div>
            <div className="text-xs uppercase tracking-wider text-[var(--text-muted)] mt-2">Voice accuracy</div>
          </div>
          <div className="text-center lg:text-left">
            <div className="stat-num text-5xl text-white">22M+</div>
            <div className="text-xs uppercase tracking-wider text-[var(--text-muted)] mt-2">Calls / month</div>
          </div>
        </div>
      </div>
    </section>
  );
}

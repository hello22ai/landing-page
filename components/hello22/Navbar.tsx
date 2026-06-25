"use client";

import { useEffect, useState } from "react";
import { Logo } from "./Logo";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      id="navbar"
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={
        scrolled
          ? {
              background: "rgba(12, 11, 9, 0.85)",
              backdropFilter: "blur(20px)",
              borderBottom: "1px solid var(--border)",
            }
          : { background: "transparent", backdropFilter: "none", borderBottom: "none" }
      }
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-5 flex items-center justify-between">
        <a href="#" className="flex items-center group" aria-label="hello22.ai home">
          <Logo height={40} />
        </a>

        <div className="hidden lg:flex items-center gap-9">
          <a href="#demo" className="nav-link">Demo</a>
          <a href="#voices" className="nav-link">Voices</a>
          <a href="#features" className="nav-link">Features</a>
          <a href="#usecases" className="nav-link">Use cases</a>
          <a href="#pricing" className="nav-link">Pricing</a>
          <a href="#" className="nav-link">Docs</a>
        </div>

        <div className="flex items-center gap-3">
          <a href="#" className="hidden md:inline-block text-sm text-[var(--text-muted)] hover:text-white transition">
            Sign in
          </a>
          <a href="#cta" className="btn-primary nav-cta px-5 py-2.5 rounded-full text-sm flex items-center gap-2">
            Try free
            <i className="fa-solid fa-arrow-right text-[10px]"></i>
          </a>
        </div>
      </div>
    </nav>
  );
}

"use client";

import { useEffect } from "react";

/**
 * Observes every `.reveal` element on the page and adds `.in` when it scrolls
 * into view — the one-shot fade-up used across all sections.
 * Mirrors the original IntersectionObserver behaviour exactly.
 */
export function useReveal() {
  useEffect(() => {
    const reveals = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -60px 0px" }
    );
    reveals.forEach((r) => observer.observe(r));
    return () => observer.disconnect();
  }, []);
}

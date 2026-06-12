"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Why It Matters", href: "#problem" },
  { label: "Features", href: "#solution" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Industries", href: "#industries" },
  { label: "FAQ", href: "#faq" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-slate-200/70 bg-white/90 shadow-sm backdrop-blur-lg"
          : "bg-transparent"
      }`}
    >
      <nav
        className="container-site flex h-[4.5rem] items-center justify-between"
        aria-label="Main navigation"
      >
        <a href="#" className="flex items-center" aria-label="hello22 home">
          <img
            src={
              scrolled
                ? "/images/hello22-logo.svg"
                : "/images/hello22-logo-white.svg"
            }
            alt="hello22"
            className="h-9 w-auto"
          />
        </a>

        <div className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`relative text-sm font-medium transition-colors after:absolute after:-bottom-1.5 after:left-0 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:rounded-full after:bg-primary after:transition-transform after:duration-300 hover:text-primary hover:after:scale-x-100 ${
                scrolled ? "text-slate-600" : "text-slate-300"
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden lg:block">
          <a href="#consultation" className="btn-primary !px-5 !py-2.5 !text-sm">
            Get Free Consultation
          </a>
        </div>

        <button
          type="button"
          className={`lg:hidden ${scrolled ? "text-navy" : "text-white"}`}
          onClick={() => setMobileOpen((v) => !v)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Scroll progress */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-primary"
        style={{ scaleX: scrollYProgress, opacity: scrolled ? 1 : 0 }}
      />

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-b border-slate-200 bg-white shadow-xl lg:hidden"
          >
            <div className="container-site flex flex-col gap-1 py-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg px-3 py-3 text-base font-medium text-slate-700 transition-colors hover:bg-surface hover:text-primary"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#consultation"
                onClick={() => setMobileOpen(false)}
                className="btn-primary mt-3"
              >
                Get Free Consultation
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

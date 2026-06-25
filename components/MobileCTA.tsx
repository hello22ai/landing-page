"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function MobileCTA() {
  const [scrolled, setScrolled] = useState(false);
  const [formInView, setFormInView] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const form = document.getElementById("consultation");
    if (!form) return;
    const observer = new IntersectionObserver(
      ([entry]) => setFormInView(entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(form);
    return () => observer.disconnect();
  }, []);

  const visible = scrolled && !formInView;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-base/90 p-3 backdrop-blur lg:hidden"
        >
          <a href="#consultation" className="btn-primary w-full !py-3.5 !text-sm">
            Get Free Consultation
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

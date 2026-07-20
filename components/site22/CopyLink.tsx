"use client";

// Share row ka copy-link circle button (reference UI) — clipboard mein article URL,
// 1.6s ke liye green check dikhta hai.
import { useState } from "react";

export default function CopyLink({ url }: { url: string }) {
  const [done, setDone] = useState(false);
  return (
    <button
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(url);
          setDone(true);
          window.setTimeout(() => setDone(false), 1600);
        } catch { /* clipboard blocked — button no-op */ }
      }}
      aria-label={done ? "Link copied" : "Copy link"}
      title="Copy link"
      style={{ width: 38, height: 38, borderRadius: "50%", background: "var(--toggle-bg)", border: "1px solid var(--toggle-bd)", color: done ? "#1a9a5c" : "var(--mut)", cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}
    >
      <i className={`fa-solid ${done ? "fa-check" : "fa-link"}`} aria-hidden="true" />
    </button>
  );
}

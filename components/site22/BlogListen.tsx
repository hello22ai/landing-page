"use client";

// "Listen to this article" pill (client order 2026-07-20 evening — pehle skip hua tha,
// ab explicitly manga: "jisna read krna vo read krke, jisna sunna ha vo sunega").
// Article audio files exist nahi karti — browser ki speechSynthesis article ka text
// padhti hai. Edge/Windows par "Natural" voices milti hain, warna default en voice.
// Text sentence-wise ~280-char chunks mein queue hota hai — Chrome ka bug lambi single
// utterance ko ~15s par kaat deta hai.
import { useEffect, useState } from "react";
import { SUB } from "./PageShell";

export default function BlogListen({ text, mins }: { text: string; mins: number }) {
  const [state, setState] = useState<"idle" | "playing" | "paused">("idle");
  const [ok, setOk] = useState(false);

  useEffect(() => {
    setOk(typeof window !== "undefined" && "speechSynthesis" in window);
    return () => { try { window.speechSynthesis.cancel(); } catch { /* unsupported */ } };
  }, []);

  const start = () => {
    const synth = window.speechSynthesis;
    synth.cancel();
    const sentences = text.match(/[^.!?]+[.!?]+["')\]]?|\S[^.!?]*$/g) ?? [text];
    const chunks: string[] = [];
    let cur = "";
    for (const s of sentences) {
      if ((cur + s).length > 280 && cur) { chunks.push(cur); cur = s; }
      else cur += s;
    }
    if (cur.trim()) chunks.push(cur);
    // voices async load hoti hain — pehli call par empty ho to default voice se hi bolo
    const voices = synth.getVoices().filter((v) => v.lang.toLowerCase().startsWith("en"));
    const voice = voices.find((v) => /natural/i.test(v.name)) || voices.find((v) => v.lang === "en-AU") || voices[0];
    chunks.forEach((c, i) => {
      const u = new SpeechSynthesisUtterance(c);
      if (voice) u.voice = voice;
      u.rate = 1;
      if (i === chunks.length - 1) u.onend = () => setState("idle");
      synth.speak(u);
    });
    setState("playing");
  };

  const toggle = () => {
    const synth = window.speechSynthesis;
    if (state === "idle") start();
    else if (state === "playing") { synth.pause(); setState("paused"); }
    else { synth.resume(); setState("playing"); }
  };

  const stop = () => { window.speechSynthesis.cancel(); setState("idle"); };

  if (!ok) return null;
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 11, background: "var(--tx)", color: "var(--bg)", borderRadius: 999, padding: "7px 18px 7px 7px" }}>
      <button onClick={toggle} aria-label={state === "playing" ? "Pause narration" : "Listen to this article"} style={{ width: 38, height: 38, borderRadius: "50%", background: "#2c76ed", color: "#fff", border: "none", cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 13, flexShrink: 0 }}>
        <i className={`fa-solid ${state === "playing" ? "fa-pause" : "fa-play"}`} aria-hidden="true" style={state === "playing" ? undefined : { marginLeft: 2 }} />
      </button>
      <span style={{ fontFamily: SUB, fontWeight: 700, fontSize: 14.5 }}>{state === "paused" ? "Resume listening" : "Listen to this article"}</span>
      <span style={{ fontSize: 12.5, opacity: 0.65 }}>· {mins} min</span>
      {state !== "idle" && (
        <button onClick={stop} aria-label="Stop narration" style={{ width: 30, height: 30, borderRadius: "50%", background: "transparent", border: "1.5px solid currentColor", color: "inherit", opacity: 0.65, cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 10, flexShrink: 0 }}>
          <i className="fa-solid fa-stop" aria-hidden="true" />
        </button>
      )}
    </span>
  );
}

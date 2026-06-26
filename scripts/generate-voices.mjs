/**
 * Generate real, human-sounding audio with ElevenLabs and save the MP3s the
 * website plays on click.
 *
 *   ELEVENLABS_API_KEY=sk_xxx node scripts/generate-voices.mjs
 *
 * Writes:
 *   public/audio/voices/<name>.mp3   (21 voice-library samples)
 *   public/audio/demo/line-<n>.mp3   (6 live-demo conversation lines)
 *
 * Swap any `voiceId` with one from your ElevenLabs Voice Library to retune.
 */
import fs from "node:fs";
import path from "node:path";

const API = process.env.ELEVENLABS_API_KEY;
if (!API) {
  console.error("Missing ELEVENLABS_API_KEY. Set it, then re-run.");
  process.exit(1);
}

const MODEL = "eleven_multilingual_v2";
const VOICES_DIR = path.join(process.cwd(), "public", "audio", "voices");
const DEMO_DIR = path.join(process.cwd(), "public", "audio", "demo");
fs.mkdirSync(VOICES_DIR, { recursive: true });
fs.mkdirSync(DEMO_DIR, { recursive: true });

// hello22 voice library — keep these IDs in sync with VOICES in
// components/site22/Hello22Site.tsx (the `vid` field).
const VOICES = [
  { file: "sarah", voiceId: "EXAVITQu4vr4xnSDxMaL", text: "Hello, thank you for calling. You're in good hands — let's sort this out together." },
  { file: "aria", voiceId: "9BWtsMINqrJLrRacOk9x", text: "Hi there! I'd love to help you get that booked in right away." },
  { file: "roger", voiceId: "CwhRBWXzGAHq8TQ4Fs17", text: "Hey, no rush at all. I can take care of that for you right now." },
  { file: "laura", voiceId: "FGY2WhTYpPnrIDTdsKH5", text: "Oh, great timing! I can absolutely get that set up for you." },
  { file: "charlie", voiceId: "IKne3meq5aSn9XLyUdCD", text: "G'day! You've reached the front desk — happy to help however I can." },
  { file: "george", voiceId: "JBFqnCBsd6RMkjVDRZzb", text: "Good afternoon. Let me walk you through everything, step by step." },
  { file: "callum", voiceId: "N2lVS1w4EtoT3dr4eOWO", text: "Well now, you've called the right place. Let's get this handled." },
  { file: "river", voiceId: "SAz9YHcvj6GT2YYXdXww", text: "Hi, thanks for reaching out. I can look that up for you in just a moment." },
  { file: "liam", voiceId: "TX3LPaxmHKxFdv7VOQHJ", text: "Hey! Awesome to hear from you — let's get you taken care of fast." },
  { file: "charlotte", voiceId: "XB0fDUnXU5powFXDhCwa", text: "Hello, lovely to hear from you. Let me take care of that right away." },
  { file: "alice", voiceId: "Xb7hH8MSUJpSbSDYk0k2", text: "Hello, thank you for calling. How may I assist you this afternoon?" },
  { file: "matilda", voiceId: "XrExE9yKIg1WjnnlVkGX", text: "Hi! I can answer that for you — and book you in while we're at it." },
  { file: "will", voiceId: "bIHbv24MWmeRgasZH58o", text: "Hey, good to hear from you. We'll get this sorted, no worries." },
  { file: "jessica", voiceId: "cgSgspJ2msm6clMCkdW9", text: "Hi! So glad you called — let's get you all set up." },
  { file: "eric", voiceId: "cjVigY5qzO86Huf0OWal", text: "Thanks for calling. I'll make sure this is handled properly for you." },
  { file: "harry", voiceId: "SOYHLrjzK2X1ezoPC6cr", text: "You've reached the front desk. Tell me what you need — I'm on it." },
  { file: "chris", voiceId: "iP95p4xoKVk53GoZ742B", text: "Hey, what's up! I can get that booked for you real quick." },
  { file: "brian", voiceId: "nPczCjzI2devNBz1zQrb", text: "Hello there. I'd be glad to help you with that today." },
  { file: "daniel", voiceId: "onwK4e9ZLuTAKqWW03F9", text: "Good day. I can confirm your appointment and answer any questions." },
  { file: "lily", voiceId: "pFZP5JQG7iQjIQuC4Bku", text: "Hello, thanks so much for calling. Let me help you with that." },
  { file: "bill", voiceId: "pqHfZKP75CvOlQylNhV4", text: "Hi, thanks for calling. Rest assured, I'll take good care of this." },
];

// Live demo: caller = Sarah, agent = Aria (two distinct hello22 voices)
const SARAH = "EXAVITQu4vr4xnSDxMaL";
const ARIA = "9BWtsMINqrJLrRacOk9x";
const DEMO = [
  { file: "line-0", voiceId: SARAH, text: "Hi, I'd like to book a table for four this Friday evening." },
  { file: "line-1", voiceId: ARIA, text: "Of course! What time works best? We have openings at 7 PM or 9 PM." },
  { file: "line-2", voiceId: SARAH, text: "7 PM sounds perfect. Can we get a booth by the window?" },
  { file: "line-3", voiceId: ARIA, text: "Absolutely — I've reserved booth 4 by the window. Can I get a name for the booking?" },
  { file: "line-4", voiceId: SARAH, text: "Sarah Chen. C-H-E-N." },
  { file: "line-5", voiceId: ARIA, text: "Booked! Table for four under Sarah Chen, Friday at 7 PM, booth 4. You'll get a confirmation text shortly. Anything else?" },
];

async function tts(item, dir) {
  const res = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${item.voiceId}`, {
    method: "POST",
    headers: { "xi-api-key": API, "Content-Type": "application/json", Accept: "audio/mpeg" },
    body: JSON.stringify({ text: item.text, model_id: MODEL, voice_settings: { stability: 0.45, similarity_boost: 0.8 } }),
  });
  if (!res.ok) {
    console.error(`✗ ${item.file}: ${res.status} ${await res.text()}`);
    return false;
  }
  const buf = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(path.join(dir, `${item.file}.mp3`), buf);
  console.log(`✓ ${path.basename(dir)}/${item.file}.mp3 (${(buf.length / 1024).toFixed(0)} KB)`);
  return true;
}

for (const v of VOICES) { await tts(v, VOICES_DIR); }
for (const d of DEMO) { await tts(d, DEMO_DIR); }
console.log("\nDone. Hard-refresh the site to hear real voices.");

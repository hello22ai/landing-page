/**
 * Generate real, human-sounding audio with ElevenLabs and save the MP3s the
 * website plays on click.
 *
 *   ELEVENLABS_API_KEY=sk_xxx node scripts/generate-voices.mjs
 *
 * Writes:
 *   public/audio/voices/<name>.mp3   (12 voice-library samples)
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

// Well-known default ElevenLabs voices (replace freely):
const RACHEL = "21m00Tcm4TlvDq8ikWAM"; // warm female
const BELLA = "EXAVITQu4vr4xnSDxMaL"; // soft female
const ELLI = "MF3mGyEYCl7XYWbV9V6O"; // bright female
const DOMI = "AZnzlk1XvdvUeBnXmlld"; // confident female
const ANTONI = "ErXwobaYiN019PkySvjV"; // male
const ARNOLD = "VR6AewLTigWG4xSOukaG"; // male
const JOSH = "TxGEqnHWrfWFTfGW9XjX"; // male
const ADAM = "pNInz6obpgDQGcFmaJgB"; // male
const SAM = "yoZ06aMxZJJ28mfd3POQ"; // male

const VOICES = [
  { file: "emma", voiceId: RACHEL, text: "Hi there! Thanks for calling — I'd be happy to help you book that in." },
  { file: "jack", voiceId: ANTONI, text: "G'day, you've reached the front desk. How can I help you today?" },
  { file: "bruce", voiceId: ARNOLD, text: "No worries, mate. Let me get that sorted for you right now." },
  { file: "jordan", voiceId: JOSH, text: "Hey, great to hear from you. I can take care of that booking in a moment." },
  { file: "aimee", voiceId: ELLI, text: "Hi! Lovely to hear from you — let's get you all set up." },
  { file: "alice", voiceId: DOMI, text: "Hello, thank you for calling. How may I assist you this afternoon?" },
  { file: "charlie", voiceId: ADAM, text: "Good afternoon. I'd be delighted to help you with your enquiry." },
  { file: "joseph", voiceId: SAM, text: "Thanks for calling. I can confirm your appointment and answer any questions." },
  { file: "tyler", voiceId: JOSH, text: "Hey, what's up! I can get you booked in real quick — no problem at all." },
  { file: "lilian", voiceId: BELLA, text: "Hi, thanks so much for reaching out. Let me help you with that today." },
  { file: "ayana", voiceId: RACHEL, text: "Hello! I'd be glad to assist. Let me pull up your details now." },
  { file: "aria", voiceId: BELLA, text: "Hi, I'm Aria — your AI voice agent. I answer calls and book appointments around the clock." },
];

// Live demo: caller = Sarah (one female voice), agent = Aria (a distinct female voice)
const SARAH = ELLI;
const ARIA = BELLA;
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

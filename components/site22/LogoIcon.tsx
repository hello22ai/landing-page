// 3D-look animated logo icon — glossy ring + phone + pulsing voice-wave.
// Self-contained: keyframes + reduced-motion apne <style> me, isliye kisi bhi page pe kaam karta hai.
// Parent ki height follow karta hai (height:100%).
export function LogoIcon() {
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true" style={{ height: "100%", width: "auto", display: "block", overflow: "visible", filter: "drop-shadow(0 2px 3px rgba(15,52,120,.45))", flexShrink: 0 }}>
      <style>{`@keyframes h22lwk{0%,100%{transform:scaleX(.45)}50%{transform:scaleX(1)}}.h22lwr{transform-box:fill-box;transform-origin:100% 50%;animation:h22lwk 1.7s ease-in-out infinite}@media(prefers-reduced-motion:reduce){.h22lwr{animation:none}}`}</style>
      <defs>
        <linearGradient id="h22gi1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#4f8cf7" /><stop offset=".5" stopColor="#2469e6" /><stop offset="1" stopColor="#1747a8" />
        </linearGradient>
        <linearGradient id="h22gi2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#5f9afc" /><stop offset=".55" stopColor="#2c76ed" /><stop offset="1" stopColor="#1a52b4" />
        </linearGradient>
      </defs>
      {/* ring — left gap jahan se wave enter karti hai */}
      <path d="M 25.8 32 A 36 36 0 1 1 25.8 68" fill="none" stroke="url(#h22gi1)" strokeWidth="9.5" strokeLinecap="round" />
      {/* gloss highlight */}
      <path d="M 69.3 16.2 A 36 36 0 0 1 90.8 37.7" fill="none" stroke="rgba(255,255,255,.32)" strokeWidth="3" strokeLinecap="round" />
      {/* phone handset (FA phone glyph) */}
      <g transform="translate(33 27.5) scale(0.088)">
        <path fill="url(#h22gi2)" d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L192.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z" />
      </g>
      {/* animated voice wave — center se bahar symmetric stagger */}
      <g fill="url(#h22gi1)">
        <rect className="h22lwr" style={{ animationDelay: ".45s" }} x="15" y="19.8" width="6" height="6.4" rx="3" />
        <rect className="h22lwr" style={{ animationDelay: ".3s" }} x="10" y="28.8" width="11" height="6.4" rx="3.2" />
        <rect className="h22lwr" style={{ animationDelay: ".15s" }} x="4.5" y="37.8" width="16.5" height="6.4" rx="3.2" />
        <rect className="h22lwr" x="-1" y="46.8" width="22" height="6.4" rx="3.2" />
        <rect className="h22lwr" style={{ animationDelay: ".15s" }} x="4.5" y="55.8" width="16.5" height="6.4" rx="3.2" />
        <rect className="h22lwr" style={{ animationDelay: ".3s" }} x="10" y="64.8" width="11" height="6.4" rx="3.2" />
        <rect className="h22lwr" style={{ animationDelay: ".45s" }} x="15" y="73.8" width="6" height="6.4" rx="3" />
      </g>
    </svg>
  );
}

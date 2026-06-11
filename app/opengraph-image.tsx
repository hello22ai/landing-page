import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "hello22 — Never Miss Another Customer Call";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#0F172A",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "14px",
              background: "#FF631F",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontSize: "30px",
              fontWeight: 700,
            }}
          >
            ☎
          </div>
          <div style={{ color: "#fff", fontSize: "36px", fontWeight: 700 }}>hello22</div>
        </div>
        <div
          style={{
            marginTop: "48px",
            color: "#fff",
            fontSize: "84px",
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: "-2px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <span>Never miss another</span>
          <span style={{ color: "#FF631F" }}>customer call</span>
        </div>
        <div style={{ marginTop: "32px", color: "#94A3B8", fontSize: "30px" }}>
          AI Receptionist · 24/7 call answering · Appointment booking
        </div>
      </div>
    ),
    size
  );
}

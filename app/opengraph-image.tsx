import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Tomáš Regner — UX Designer & E-commerce konzultant";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 32,
          background: "#000",
          fontFamily: "Arial, Helvetica, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 160,
            height: 160,
            borderRadius: "50%",
            background: "#fff",
            color: "#000",
            fontSize: 64,
            fontWeight: 700,
          }}
        >
          TR
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 64,
            fontWeight: 700,
            color: "#fff",
          }}
        >
          Tomáš Regner
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 32,
            color: "#a1a1aa",
          }}
        >
          UX Designer &amp; E-commerce konzultant
        </div>
      </div>
    ),
    { ...size }
  );
}

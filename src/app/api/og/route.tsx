import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#fff",
        }}
      >
        <img
          width={320}
          height={320}
          src="https://portfolio.tokozzing.com/assets/logo_icon.svg"
          alt="TokozZing Logo"
        />
        <div style={{ fontSize: 60, fontWeight: 800, marginTop: 20 }}>
          Emily Kang
        </div>
        <div style={{ fontSize: 40, color: "#3F4450" }}>Front-End Developer</div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}

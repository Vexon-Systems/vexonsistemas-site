import { ImageResponse } from "next/og";

export const dynamic = "force-static";

export const alt = "Vexon — Sites, sistemas e soluções digitais em Ituiutaba";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "stretch",
          background: "#09090b",
          color: "white",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: "space-between",
          overflow: "hidden",
          padding: "76px",
          position: "relative",
          width: "100%",
        }}
      >
        <div style={{ background: "#b71f1e", height: "9px", left: "-110px", position: "absolute", top: "118px", transform: "rotate(-28deg)", width: "780px" }} />
        <div style={{ alignItems: "center", display: "flex", fontSize: 38, fontWeight: 800, letterSpacing: "0.16em" }}>VEXON</div>
        <div style={{ display: "flex", flexDirection: "column", gap: "22px", maxWidth: "930px" }}>
          <div style={{ color: "#fecaca", fontSize: 25, fontWeight: 700, letterSpacing: "0.12em" }}>TECNOLOGIA APLICADA A PROBLEMAS REAIS</div>
          <div style={{ fontSize: 72, fontWeight: 800, letterSpacing: "-0.06em", lineHeight: 1.02 }}>Sites, sistemas e soluções digitais para sua empresa crescer.</div>
        </div>
        <div style={{ color: "#d4d4d8", fontSize: 28 }}>Ituiutaba, Minas Gerais · Atendimento em todo o Brasil</div>
      </div>
    ),
    size,
  );
}

import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#111111",
          borderRadius: 6,
          color: "#f0ede6",
          fontSize: 22,
          fontStyle: "italic",
          fontFamily: "Georgia, serif",
        }}
      >
        Y
      </div>
    ),
    size,
  );
}

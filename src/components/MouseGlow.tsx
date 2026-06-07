"use client";

import { useEffect, useState } from "react";

export default function MouseGlow() {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const move = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <>
      {/* Large ambient glow */}
      <div
        style={{
          position: "fixed",
          left: pos.x - 200,
          top: pos.y - 200,
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(124,77,255,0.07) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 1,
          transition: "left 0.15s ease, top 0.15s ease",
        }}
      />
      {/* Small sharp dot */}
      <div
        style={{
          position: "fixed",
          left: pos.x - 4,
          top: pos.y - 4,
          width: "8px",
          height: "8px",
          borderRadius: "50%",
          background: "rgba(124,77,255,0.4)",
          pointerEvents: "none",
          zIndex: 2,
          transition: "left 0.05s ease, top 0.05s ease",
          boxShadow: "0 0 12px rgba(124,77,255,0.6)",
        }}
      />
    </>
  );
}

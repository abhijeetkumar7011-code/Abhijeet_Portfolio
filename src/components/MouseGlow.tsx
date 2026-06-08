"use client";

import { useEffect, useRef } from "react";

export default function MouseGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const dotRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Target positions (raw mouse)
    let mx = 0, my = 0;
    // Current lerped positions for glow
    let gx = 0, gy = 0;
    let raf: number;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;

      // Dot: update instantly via transform — zero React re-render
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mx - 5}px, ${my - 5}px, 0)`;
      }
    };

    // Smooth glow follows with lerp — runs on rAF, never blocks React
    const animate = () => {
      gx += (mx - gx) * 0.08;
      gy += (my - gy) * 0.08;

      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${gx - 200}px, ${gy - 200}px, 0)`;
      }

      raf = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      {/* Ambient glow — lerp-smoothed */}
      <div
        ref={glowRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(124,77,255,0.07) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 1,
          willChange: "transform",
        }}
      />

      {/* Sharp dot — instant */}
      <div
        ref={dotRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "10px",
          height: "10px",
          borderRadius: "50%",
          background: "rgba(124,77,255,0.5)",
          pointerEvents: "none",
          zIndex: 9999,
          willChange: "transform",
          boxShadow: "0 0 14px rgba(124,77,255,0.7)",
        }}
      />
    </>
  );
}

"use client";

import { useState } from "react";
import CardWrapper from "../CardWrapper";
import { projects } from "@/data/projects";

const ExternalLink = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>;
const Lock = () => <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>;
const ChevronLeft = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>;
const ChevronRight = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>;

const categories = ["All", "Architecture", "Healthcare", "CRM", "Analytics", "UI/UX"];

const categoryColors: Record<string, string> = {
  Architecture: "#a78bfa",
  Healthcare: "#34d399",
  CRM: "#60a5fa",
  Analytics: "#f97316",
  "UI/UX": "#f472b6",
};

const categoryBg: Record<string, string> = {
  Architecture: "rgba(167,139,250,0.15)",
  Healthcare: "rgba(52,211,153,0.12)",
  CRM: "rgba(96,165,250,0.12)",
  Analytics: "rgba(249,115,22,0.12)",
  "UI/UX": "rgba(244,114,182,0.12)",
};

// Local fallback images (used when a project has no image / broken link)
const defaults = ["/images/project/default.png", "/images/project/default2.png"];

export default function ProjectsCard() {
  const [active, setActive] = useState("All");

  const filtered = active === "All" ? projects : projects.filter(p => p.category === active);

  return (
    <>
      <style>{`
        .proj-scroll-wrap {
          overflow-x: auto;
          scrollbar-width: none;
          -ms-overflow-style: none;
          cursor: grab;
        }
        .proj-scroll-wrap:active { cursor: grabbing; }
        .proj-scroll-wrap::-webkit-scrollbar { display: none; }
        .proj-track {
          display: flex;
          gap: 16px;
          padding: 4px 2px 8px;
          min-width: 100%; width: 100%;
        }
        .proj-card-item {
          width: 240px;
          flex-shrink: 0;
          border-radius: 18px;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,0.07);
          background: var(--surface2);
          transition: all 0.35s ease;
          text-decoration: none;
          color: inherit;
          display: block;
        }
        .proj-card-item:hover {
          border-color: rgba(124,77,255,0.35);
          transform: translateY(-4px);
          box-shadow: 0 20px 50px rgba(0,0,0,0.5), 0 0 30px rgba(124,77,255,0.1);
        }
        .proj-filter-btn {
          padding: 5px 14px; border-radius: 8px;
          font-size: 12px; font-weight: 600;
          border: 1px solid; cursor: pointer;
          transition: all 0.25s; white-space: nowrap;
          font-family: var(--font-body);
        }
        .proj-scroll-btn {
          width: 32px; height: 32px; border-radius: 10px;
          border: 1px solid rgba(255,255,255,0.1);
          background: rgba(255,255,255,0.05);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; transition: all 0.25s; color: rgba(255,255,255,0.5);
          flex-shrink: 0;
        }
        .proj-scroll-btn:hover {
          border-color: rgba(124,77,255,0.4);
          background: rgba(124,77,255,0.1);
          color: #c4b5fd;
        }
        .proj-mockup-window {
          height: 135px;
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          padding: 0 12px;
          border-bottom: 1px solid rgba(255,255,255,0.03);
        }
        .proj-screenshot-img {
          width: 100%;
          height: 85%;
          object-fit: cover;
          object-position: top center;
          border-radius: 6px 6px 0 0;
          border: 1px solid rgba(255,255,255,0.08);
          border-bottom: none;
          box-shadow: 0 -4px 20px rgba(0,0,0,0.6);
          transition: transform 0.4s ease;
        }
        .proj-card-item:hover .proj-screenshot-img {
          transform: translateY(-2px) scale(1.02);
        }
      `}</style>

      <CardWrapper>
        {/* Original Header row and text typography */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 12, marginBottom: 18 }}>
          <div>
            <p className="section-label">Featured Work</p>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 700, marginTop: 8, letterSpacing: "-0.02em" }}>Recent Projects</h3>
          </div>
          {/* Scroll arrows */}
          <div style={{ display: "flex", gap: 6, alignItems: "center", marginTop: 4 }}>
            <button className="proj-scroll-btn" onClick={() => {
              const el = document.getElementById("proj-scroll");
              if (el) el.scrollBy({ left: -260, behavior: "smooth" });
            }}><ChevronLeft /></button>
            <button className="proj-scroll-btn" onClick={() => {
              const el = document.getElementById("proj-scroll");
              if (el) el.scrollBy({ left: 260, behavior: "smooth" });
            }}><ChevronRight /></button>
          </div>
        </div>

        {/* Original Filter chips styles */}
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 18 }}>
          {categories.map(cat => (
            <button key={cat} className="proj-filter-btn"
              onClick={() => setActive(cat)}
              style={{
                background: active === cat ? "rgba(124,77,255,0.2)" : "rgba(255,255,255,0.04)",
                borderColor: active === cat ? "rgba(124,77,255,0.5)" : "rgba(255,255,255,0.08)",
                color: active === cat ? "#c4b5fd" : "rgba(255,255,255,0.4)",
              }}>
              {cat}
            </button>
          ))}
        </div>

        {/* Horizontal scroll track wrapper */}
        <div className="proj-scroll-wrap" id="proj-scroll">
          <div className="proj-track">
            {filtered.map((project, index) => {
              const col = categoryColors[project.category] || "#a78bfa";
              const bg = categoryBg[project.category] || "rgba(124,77,255,0.15)";
              const href = project.projectUrl?.trim() ? project.projectUrl : "/not-found";

              // Local fallback image if project.image is missing/broken
              const fallbackImg = defaults[index % defaults.length];

              return (
                <a
                  key={project.title}
                  href={href || "#"}
                  onClick={e => { if (!href) e.preventDefault(); }}
                  target={href ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="proj-card-item"
                >
                  {/* Mockup Frame with Fancy Overlay textures */}
                  <div className="proj-mockup-window" style={{ background: `linear-gradient(135deg, ${bg}, rgba(0,212,255,0.05))` }}>
                    {/* Techno Grid Background Layer */}
                    <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.03) 1px,transparent 1px)", backgroundSize: "16px 16px" }} />
                    {/* Accent Neon Top glow bar */}
                    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${col}, transparent)` }} />

                    {/* Render actual project image, fallback to local default if missing/broken */}
                    <img
                      src={project.image || fallbackImg}
                      alt={project.title}
                      className="proj-screenshot-img"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = fallbackImg;
                      }}
                    />

                    {/* Gradient shade bottom masking blur */}
                    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 35, background: "linear-gradient(to top, var(--surface2), transparent)", zIndex: 2 }} />

                    {/* Action Live status absolute overlay tag */}
                    <div style={{ position: "absolute", top: 10, right: 10, zIndex: 3, display: "flex", alignItems: "center", gap: 4, padding: "3px 8px", borderRadius: 6, background: href ? "rgba(74,222,128,0.12)" : "rgba(255,255,255,0.07)", border: `1px solid ${href ? "rgba(74,222,128,0.25)" : "rgba(255,255,255,0.1)"}`, fontSize: 9, fontWeight: 700, color: href ? "#86efac" : "rgba(255,255,255,0.35)", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                      {href ? <><span style={{ width: 5, height: 5, borderRadius: "50%", background: "#4ade80", boxShadow: "0 0 5px #4ade80" }} /> Live</> : <><Lock /> Private</>}
                    </div>
                  </div>

                  {/* Body Content Blocks */}
                  <div style={{ padding: "14px 16px 16px" }}>
                    <div style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "3px 9px", borderRadius: 6, background: `${col}18`, border: `1px solid ${col}30`, fontSize: 10, fontWeight: 700, color: col, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 8 }}>
                      {project.category}
                    </div>

                    <h4 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 14, letterSpacing: "-0.01em", margin: "0 0 6px" }}>
                      {project.title}
                    </h4>

                    <p style={{ fontSize: 12, color: "rgba(255,255,255,0.38)", lineHeight: 1.6, margin: "0 0 10px" }}>
                      {(project as any).description || ""}
                    </p>

                    {/* Tech stacks Pills row */}
                    <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 10 }}>
                      {((project as any).tech || []).map((t: string) => (
                        <span key={t} style={{ padding: "2px 8px", borderRadius: 5, fontSize: 10, fontWeight: 600, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.4)" }}>{t}</span>
                      ))}
                    </div>

                    <span style={{ fontSize: 12, color: col, display: "flex", alignItems: "center", gap: 5 }}>
                      {href ? <><ExternalLink /> View Project</> : "Coming Soon →"}
                    </span>
                  </div>
                </a>
              );
            })}
          </div>
        </div>

        {/* Scroll hint indicator */}
        <p style={{ fontSize: 11, color: "rgba(255,255,255,0.2)", marginTop: 8, textAlign: "center" }}>
          ← Scroll to explore all projects →
        </p>
      </CardWrapper>
    </>
  );
}
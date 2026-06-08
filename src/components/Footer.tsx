"use client";

import { useState } from "react";

/* ── Custom SVG Icon Assets ── */
const Github = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>;
const Linkedin = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>;
const Twitter = () => <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>;
const MapPin = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>;
const Mail = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>;

const navLinks = [
  { label: "Home",     href: "#home",     icon: "🏠" },
  { label: "About",    href: "#about",    icon: "👤" },
  { label: "Skills",   href: "#skills",   icon: "✨" },
  { label: "Projects", href: "#projects", icon: "⬛" },
  { label: "Services", href: "#services", icon: "💼" },
  { label: "Contact",  href: "#contact",  icon: "💬" },
];

const services = [
  { label: "Web development",  color: "#378add" },
  { label: "Backend APIs",     color: "#7c4dff" },
  { label: "UI engineering",   color: "#1D9E75" },
  { label: "Cloud deploy",     color: "#BA7517" },
  { label: "SaaS products",    color: "#D4537E" },
  { label: "CRM systems",      color: "#888780" },
];

const socials = [
  { icon: <Github />,   label: "GitHub",   href: "https://github.com/abhijeetkumar7011" },
  { icon: <Linkedin />, label: "LinkedIn", href: "https://linkedin.com/in/abhijeetkumar7011" },
  { icon: <Twitter />,  label: "Twitter",  href: "https://twitter.com" },
];

function scrollTo(href: string) {
  const id = href.slice(1);
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
  else window.scrollTo({ top: 0, behavior: "smooth" });
}

export default function Footer() {
  return (
    <>
      <style>{`
        /* ── FUTURISTIC CORE STYLES ── */
        .cyber-panel {
          background: linear-gradient(145deg, rgba(10,18,42,0.6) 0%, rgba(4,8,18,0.95) 100%);
          border: 1px solid rgba(124,77,255,0.08);
          position: relative;
          overflow: hidden;
        }
        .cyber-panel::before {
          content: ''; position: absolute; top: 0; left: 0; width: 100%; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(124,77,255,0.3), transparent);
        }

        /* ── HIGH LEVEL ENHANCED VISUAL CTA ── */
        .footer-cta {
          background: linear-gradient(135deg, rgba(15, 11, 42, 0.85) 0%, rgba(4, 5, 15, 0.95) 100%);
          border: 1px solid rgba(124,77,255,0.25);
          border-left: 5px solid #7c4dff;
          border-radius: 24px; 
          padding: 40px;
          display: flex; 
          align-items: center;
          justify-content: space-between; 
          flex-wrap: wrap; 
          gap: 32px;
          margin-top: 80px; 
          margin-bottom: 30px;
          position: relative; 
          overflow: hidden;
          box-shadow: 0 30px 60px -20px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.05);
        }

        /* Tech Line Graphic Overlay */
        .footer-cta::after {
          content: ''; position: absolute; right: 0; bottom: 0; top: 0; width: 40%;
          background-image: radial-gradient(rgba(124,77,255,0.15) 1px, transparent 0);
          background-size: 16px 16px; opacity: 0.5; pointer-events: none;
        }

        .cta-graphic-stack {
          display: flex; gap: 12px; transform: rotate(-5deg); pointer-events: none;
        }
        @media(max-width: 840px) { .cta-graphic-stack { display: none; } }

        .cta-live-card {
          padding: 10px 16px; background: rgba(255,255,255,0.02); 
          border: 1px solid rgba(255,255,255,0.05); border-radius: 12px;
          font-size: 11px; font-weight: 700; color: rgba(255,255,255,0.6);
          box-shadow: 4px 4px 12px rgba(0,0,0,0.4); backdrop-filter: blur(4px);
        }

        /* ── NEON 3D CTA INTERACTION ── */
        .f3d-btn {
          position: relative;
          background: #7c4dff; color: #fff; border: none;
          border-radius: 12px; padding: 14px 28px;
          font-size: 14px; font-weight: 700; cursor: pointer;
          font-family: var(--font-body); display: flex; align-items: center; gap: 10px;
          white-space: nowrap; transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 0 0px transparent, 4px 4px 0px #3C3489;
          z-index: 2;
        }
        .f3d-btn:hover {
          transform: translate(2px, 2px);
          box-shadow: 0 0 20px rgba(124,77,255,0.4), 1px 1px 0px #3C3489;
        }
        .f3d-btn:active {
          transform: translate(4px, 4px);
          box-shadow: 0 0 0px transparent, 0px 0px 0px #3C3489;
        }

        /* ── GRID PATTERN INTEGRATION ── */
        .footer-grid {
          display: grid;
          grid-template-columns: 1.4fr 0.9fr 1fr 1.1fr;
          border-radius: 24px; overflow: hidden;
          box-shadow: 0 30px 60px -20px rgba(0,0,0,0.7);
        }
        @media(max-width:960px) { .footer-grid { grid-template-columns: 1fr 1fr; } }
        @media(max-width:580px) { .footer-grid { grid-template-columns: 1fr; } }

        .footer-col-f {
          padding: 36px 28px;
          border-right: 1px solid rgba(255,255,255,0.03);
          border-bottom: 1px solid rgba(255,255,255,0.03);
        }
        .footer-grid > div:nth-child(4) { border-right: none; }
        @media(max-width:960px) {
          .footer-col-f:nth-child(even) { border-right: none; }
        }

        /* ── CYBER LINK MOTORS ── */
        .social-matrix-btn {
          width: 40px; height: 40px; border-radius: 12px;
          border: 1px solid rgba(255,255,255,0.06);
          background: rgba(255,255,255,0.02);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; color: rgba(255,255,255,0.45);
          text-decoration: none; transition: all 0.2s;
          box-shadow: 2px 2px 0 rgba(0,0,0,0.4);
        }
        .social-matrix-btn:hover {
          background: rgba(124,77,255,0.1);
          border-color: rgba(124,77,255,0.3);
          color: #c4b5fd;
          transform: translateY(-2px);
          box-shadow: 0 5px 12px rgba(124,77,255,0.2), 2px 4px 0 rgba(0,0,0,0.5);
        }

        .nav-link-item {
          display: flex; align-items: center; gap: 10px;
          font-size: 13.5px; color: rgba(255,255,255,0.45);
          background: none; border: none; padding: 7px 0; cursor: pointer;
          font-family: var(--font-body); width: 100%; text-align: left;
          transition: all 0.2s;
        }
        .nav-link-item:hover { color: #ffffff; transform: translateX(4px); }
        .nav-link-item:hover .nav-ico-box { 
          background: rgba(124,77,255,0.15); 
          border-color: rgba(124,77,255,0.3);
          color: #c4b5fd;
        }

        .nav-ico-box {
          width: 24px; height: 24px; border-radius: 7px;
          border: 1px solid rgba(255,255,255,0.07);
          background: rgba(255,255,255,0.04);
          display: flex; align-items: center; justify-content: center; font-size: 13px;
          box-shadow: 2px 2px 0 rgba(0,0,0,0.2);
          transition: all 0.2s;
        }

        .svc-matrix-chip {
          display: inline-flex; align-items: center; gap: 6px;
          font-size: 11px; padding: 5px 10px; border-radius: 7px;
          border: 1px solid rgba(255,255,255,0.07);
          background: rgba(255,255,255,0.04); color: rgba(255,255,255,0.5);
          margin: 0 5px 6px 0; cursor: default; transition: all 0.2s;
          box-shadow: 2px 2px 0 rgba(0,0,0,0.25);
        }
        .svc-matrix-chip:hover {
          box-shadow: 1px 1px 0 rgba(0,0,0,0.25); 
          transform: translate(1px,1px);
          color: rgba(255,255,255,0.8);
        }

        .pulse-core {
          width: 6px; height: 6px; border-radius: 50%; background: #4ade80;
          box-shadow: 0 0 8px #4ade80; animation: glowPulse 2s infinite;
        }
        @keyframes glowPulse {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.2); opacity: 1; box-shadow: 0 0 14px #4ade80; }
        }
      `}</style>

      <footer>
        {/* Dynamic Graphic CTA Banner */}
        <div className="footer-cta">
          <div style={{ flex: "1 1 400px", zIndex: 2 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(124,77,255,0.12)", border: "1px solid rgba(124,77,255,0.25)", borderRadius: 99, padding: "5px 14px", fontSize: 12, fontWeight: 600, color: "#c4b5fd", marginBottom: 14 }}>
              <span className="pulse-core" />
              Available for new projects
            </div>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(24px, 2.8vw, 32px)", fontWeight: 900, margin: 0, letterSpacing: "-0.03em", color: "#fff", lineHeight: 1.2 }}>
              Ready to build something <span style={{ color: "#a78bfa", background: "linear-gradient(90deg, #c4b5fd, #7c4dff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>great?</span>
            </h3>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", marginTop: 8, margin: 0, maxWidth: "440px" }}>
              Let's turn your idea into an optimized, lightning-fast digital asset.
            </p>
          </div>

          {/* Graphical Interface Visual Showcase */}
          <div className="cta-graphic-stack">
            <div className="cta-live-card" style={{ borderLeft: "3px solid #61dafb" }}>
              <span style={{ color: "#61dafb" }}>✦ UI</span> Fast
            </div>
            <div className="cta-live-card" style={{ borderLeft: "3px solid #68d391", marginTop: "15px" }}>
              <span style={{ color: "#68d391" }}>⚙ Engine</span> Secure
            </div>
          </div>

          <a href="#contact" onClick={e => { e.preventDefault(); scrollTo("#contact"); }} style={{ textDecoration: "none" }}>
            <button className="f3d-btn">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
              Start a project
            </button>
          </a>
        </div>

        {/* Main Interface Mesh */}
        <div className="footer-grid cyber-panel">

          {/* Block 1: Identity */}
          <div className="footer-col-f">
            <div style={{ display: "inline-flex", alignItems: "center", marginBottom: 16 }}>
              <span style={{ background: "#7c4dff", color: "#fff", padding: "5px 12px", borderRadius: "8px 0 0 8px", fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 900, letterSpacing: "-0.02em", boxShadow: "2px 2px 0 #3C3489" }}>ABHI</span>
              <span style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", padding: "4px 12px", borderRadius: "0 8px 8px 0", fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 400, color: "rgba(255,255,255,0.4)", marginLeft: 1 }}>.DEV</span>
            </div>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", lineHeight: 1.75, margin: "0 0 20px", maxWidth: 240 }}>
              Full stack developer crafting elegant, high-performance digital products.
            </p>
            
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                { icon: <MapPin />, val: "Delhi, India · IST", col: "#f87171" },
                { icon: <Mail />, val: "abhijeetkumar7011@gmail.com", col: "#60a5fa" },
                { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>, val: "Replies within 24 hrs", col: "#4ade80" }
              ].map((c, idx) => (
                <div key={idx} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 12.5, color: "rgba(255,255,255,0.35)" }}>
                  <span style={{ width: 26, height: 26, borderRadius: 7, border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.05)", display: "flex", alignItems: "center", justifyContent: "center", color: c.col, boxShadow: "2px 2px 0 rgba(0,0,0,0.3)" }}>{c.icon}</span>
                  {c.val}
                </div>
              ))}
            </div>

            <div style={{ display: "flex", gap: 10, marginTop: 24 }}>
              {socials.map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="social-matrix-btn" title={s.label}>
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Block 2: Navigation */}
          <div className="footer-col-f">
            <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", margin: "0 0 16px" }}>Navigate</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {navLinks.map(l => (
                <button key={l.label} className="nav-link-item" onClick={() => scrollTo(l.href)}>
                  <span className="nav-ico-box">{l.icon}</span>
                  {l.label}
                  <span style={{ marginLeft: "auto", fontSize: 13, opacity: 0, transition: "all 0.18s", color: "#7c4dff" }} className="nav-arrow-f">›</span>
                </button>
              ))}
            </div>
          </div>

          {/* Block 3: Services */}
          <div className="footer-col-f">
            <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", margin: "0 0 16px" }}>Services</p>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {services.map(s => (
                <span key={s.label} className="svc-matrix-chip">
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: s.color }} />
                  {s.label}
                </span>
              ))}
            </div>
          </div>

          {/* Block 4: Telemetry Monitor */}
          <div className="footer-col-f">
            <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", margin: "0 0 16px" }}>Status</p>
            
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                { title: "Availability", value: "Open to hire", marker: <span className="pulse-core" /> },
                { title: "⚡ Response time", value: "Within 24 hours", color: "#fbbf24" },
                { title: "🌐 Time zone", value: "IST · UTC +5:30", color: "#60a5fa" },
              ].map((st, i) => (
                <div key={i} style={{ padding: "10px 13px", borderRadius: 10, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", boxShadow: "2px 2px 0 rgba(0,0,0,0.3)" }}>
                  <p style={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.28)", margin: "0 0 4px" }}>{st.title}</p>
                  <div style={{ fontSize: 13, fontWeight: 600, color: st.color || "rgba(255,255,255,0.75)", display: "flex", alignItems: "center", gap: 6 }}>
                    {st.marker}
                    {st.value}
                  </div>
                </div>
              ))}
              
              <div style={{ padding: "10px 13px", borderRadius: 10, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", boxShadow: "2px 2px 0 rgba(0,0,0,0.3)" }}>
                <p style={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.28)", margin: "0 0 4px" }}>🛠 Current stack</p>
                <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginTop: 4 }}>
                  {[
                    ["React", "rgba(97,218,251,0.12)", "#61dafb"],
                    ["Django", "rgba(9,121,75,0.12)", "#68d391"],
                    ["Next.js", "rgba(255,255,255,0.07)", "rgba(255,255,255,0.6)"]
                  ].map(([label, bg, color]) => (
                    <span key={label} style={{ fontSize: 10, padding: "2px 7px", borderRadius: 5, background: bg, color, border: `1px solid ${color}30`, fontWeight: 700 }}>{label}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Strip */}
        <div style={{ display: "flex", alignItems: "center", padding: "24px 0 10px", flexWrap: "wrap", gap: 16, justifyContent: "space-between" }}>
          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", gap: 5, margin: 0 }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M14.83 14.83A4 4 0 1 1 9.17 9.17"/></svg>
            {new Date().getFullYear()} Abhijeet Verma. All rights reserved.
          </p>
          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", gap: 4, margin: 0 }}>
            Built with&nbsp;<svg width="12" height="12" viewBox="0 0 24 24" fill="#f472b6"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>&nbsp;using Next.js &amp; Django
          </p>
          <button 
            style={{ width: 36, height: 36, borderRadius: 10, border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.04)", display: "flex", alignItems: "center", cursor: "pointer", color: "rgba(255,255,255,0.4)", transition: "all 0.15s", display: "flex", justifyContent: "center", alignItems: "center", boxShadow: "2px 2px 0 rgba(0,0,0,0.3)" }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            onMouseEnter={e => e.currentTarget.style.color = "#a78bfa"}
            onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.4)"}
            title="Back to top"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></svg>
          </button>
        </div>
      </footer>
    </>
  );
}
"use client";
import { useState } from "react";
import CardWrapper from "../CardWrapper";
import AboutModal from "./AboutModal";

/* ── Icons ── */
const MapPin = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>;
const Mail   = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>;
const Clock  = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>;
const Brief  = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg>;
const Zap    = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>;
const ExternalLink = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>;

export default function AboutCard() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <style>{`
        .ab-view-btn {
          display:inline-flex;align-items:center;gap:6px;
          font-size:13px;color:#a78bfa;background:none;border:none;
          cursor:pointer;padding:0;font-family:var(--font-body);
          transition:color 0.2s;
        }
        .ab-view-btn:hover{color:#c4b5fd;}
      `}</style>

      <CardWrapper>
        <div style={{ position:"absolute", top:-30, left:-30, width:120, height:120, borderRadius:"50%", background:"rgba(124,77,255,0.1)", filter:"blur(40px)", pointerEvents:"none" }} />
        <p className="section-label">About Me</p>
        <div style={{ marginTop:18, display:"flex", alignItems:"center", gap:14 }}>
          <div style={{ width:58, height:58, borderRadius:16, background:"linear-gradient(135deg, rgba(124,77,255,0.5), rgba(0,212,255,0.3))", border:"1px solid rgba(124,77,255,0.3)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:24, flexShrink:0 }}>
            👨‍💻
          </div>
          <div>
            <h3 style={{ fontFamily:"var(--font-display)", fontWeight:700, fontSize:17, letterSpacing:"-0.01em", margin:0 }}>Abhijeet Verma</h3>
            <p style={{ fontSize:12, color:"#a78bfa", marginTop:3 }}>Full Stack Developer</p>
          </div>
        </div>
        <p style={{ marginTop:16, fontSize:13, lineHeight:1.8, color:"rgba(255,255,255,0.42)" }}>
          I build modern web applications, scalable APIs, and polished interfaces that make digital products feel premium and intuitive.
        </p>
        <div style={{ marginTop:16, display:"flex", flexDirection:"column", gap:9 }}>
          {[
            { icon:<MapPin />, label:"Delhi, India",                   color:"#f87171" },
            { icon:<Mail />,   label:"abhijeetkumar7011@gmail.com",    color:"#60a5fa" },
            { icon:<Clock />,  label:"IST (UTC +5:30)",                color:"#34d399" },
            { icon:<Brief />,  label:"Open to Opportunities",          color:"#fbbf24" },
            { icon:<Zap />,    label:"Actively Learning & Exploring",  color:"#fbbf24" },
          ].map(item => (
            <div key={item.label} style={{ display:"flex", alignItems:"center", gap:10, fontSize:13, color:"rgba(255,255,255,0.48)" }}>
              <span style={{ color:item.color, display:"flex" }}>{item.icon}</span>
              {item.label}
            </div>
          ))}
        </div>
        {/* View More button */}
        <button className="ab-view-btn" style={{ marginTop:18 }} onClick={() => setOpen(true)}>
          View Full Profile <ExternalLink />
        </button>
      </CardWrapper>

      <AboutModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
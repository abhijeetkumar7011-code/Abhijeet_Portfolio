"use client";
import CardWrapper from "../CardWrapper";
import React from "react";

// Proper brand-colored SVG icons for each tech
// const icons: Record<string, JSX.Element> = {
const icons: Record<string, React.ReactNode> = {
  React: (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
      <circle cx="12" cy="12" r="2.5" fill="#61dafb"/>
      <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61dafb" strokeWidth="1.2" fill="none"/>
      <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61dafb" strokeWidth="1.2" fill="none" transform="rotate(60 12 12)"/>
      <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61dafb" strokeWidth="1.2" fill="none" transform="rotate(120 12 12)"/>
    </svg>
  ),
  "Next.js": (
    <svg viewBox="0 0 24 24" width="22" height="22">
      <circle cx="12" cy="12" r="11" fill="#fff" opacity="0.9"/>
      <path d="M8.5 7.5v9l7-4.5-7-4.5z" fill="#000"/>
    </svg>
  ),
  "Node.js": (
    <svg viewBox="0 0 24 24" width="22" height="22">
      <path d="M12 2L3 7v10l9 5 9-5V7L12 2z" fill="#68d391" opacity="0.9"/>
      <path d="M12 2L3 7l9 5 9-5-9-5z" fill="#4ade80"/>
    </svg>
  ),
  Python: (
    <svg viewBox="0 0 24 24" width="22" height="22">
      <path d="M12 2c-2.8 0-4.5 1.3-4.5 3v2h4.5v1H5.5C3.5 8 2 9.8 2 12s1.5 4 3.5 4h1v-2.5c0-1.5 1.2-2.5 3-2.5h5c1.5 0 2.5-1 2.5-2.5V5c0-1.7-1.7-3-5-3z" fill="#fde68a"/>
      <path d="M12 22c2.8 0 4.5-1.3 4.5-3v-2h-4.5v-1h6.5c2 0 3.5-1.8 3.5-4s-1.5-4-3.5-4h-1v2.5c0 1.5-1.2 2.5-3 2.5H9c-1.5 0-2.5 1-2.5 2.5V19c0 1.7 1.7 3 5 3z" fill="#60a5fa"/>
    </svg>
  ),
  PostgreSQL: (
    <svg viewBox="0 0 24 24" width="22" height="22">
      <ellipse cx="12" cy="7" rx="7" ry="4" fill="#60a5fa" opacity="0.85"/>
      <path d="M5 7v10c0 2.2 3.1 4 7 4s7-1.8 7-4V7" fill="none" stroke="#60a5fa" strokeWidth="1.5" opacity="0.85"/>
      <line x1="5" y1="12" x2="19" y2="12" stroke="#60a5fa" strokeWidth="1" opacity="0.5"/>
    </svg>
  ),
  AWS: (
    <svg viewBox="0 0 24 24" width="22" height="22">
      <path d="M7 14.5c-2.5-.8-4-2.5-4-4.5 0-2.5 2-4.5 4.5-4.5.3 0 .6 0 .9.1C9.2 3.8 10.9 3 13 3c3 0 5.5 2 5.9 4.7.1 0 .1 0 .1 0 2.2 0 3 1.8 3 3s-.8 3-3 3H17" fill="none" stroke="#fcd34d" strokeWidth="1.5" strokeLinecap="round"/>
      <polyline points="9 18 12 21 15 18" stroke="#fcd34d" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      <line x1="12" y1="14" x2="12" y2="21" stroke="#fcd34d" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  "TypeScript": (
    <svg viewBox="0 0 24 24" width="22" height="22">
      <rect x="2" y="2" width="20" height="20" rx="4" fill="#0170c6"/>
      <path d="M8 8h8v2H10v2h6v2H10v4H8V8Z" fill="#fff"/>
    </svg>
  ),
  JavaScript: (
    <svg viewBox="0 0 24 24" width="22" height="22">
      <rect x="2" y="2" width="20" height="20" rx="4" fill="#f7df1e"/>
      <path d="M9.5 7.5h2.3v9h-2.3v-4.9h-1.3v-1.8h1.3V7.5Zm5.7 0h1.7l1.4 5.5 1.4-5.5h1.7l-1.9 7.1h-1.5l-1.9-7.1Z" fill="#000"/>
    </svg>
  ),
  HTML: (
    <svg viewBox="0 0 24 24" width="22" height="22">
      <path d="M4 3h16l-1.4 16.4L12 21l-6.6-1.6L4 3Z" fill="#e34f26"/>
      <path d="M12 17.1l4.8-1.3 0.4-4.4H12v1.8h2.8l-0.2 2.6L12 15.3v1.8ZM12 7.7v1.8h4.4l-0.4 4.5H12v1.8h5.5L17.2 6H12Z" fill="#fff"/>
    </svg>
  ),
  CSS: (
    <svg viewBox="0 0 24 24" width="22" height="22">
      <path d="M4 3h16l-1.4 16.4L12 21l-6.6-1.6L4 3Z" fill="#1572b6"/>
      <path d="M12 17.1l4.8-1.3 0.4-4.4H12v1.8h2.8l-0.2 2.6L12 15.3v1.8ZM12 7.7v1.8h4.4l-0.4 4.5H12v1.8h5.5L17.2 6H12Z" fill="#33a9dc"/>
    </svg>
  ),
  "Tailwind CSS": (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
      <path d="M3 9c3-2 6-2 9 0s6 2 9 0" stroke="#38bdf8" strokeWidth="1.8" strokeLinecap="round"/>
      <path d="M3 15c3-2 6-2 9 0s6 2 9 0" stroke="#0ea5e9" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  ),
  Git: (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
      <circle cx="12" cy="4.5" r="1.5" fill="#f34f29"/>
      <circle cx="6.5" cy="10" r="1.5" fill="#f34f29"/>
      <circle cx="17.5" cy="10" r="1.5" fill="#f34f29"/>
      <path d="M12 6v3.5" stroke="#f34f29" strokeWidth="1.8" strokeLinecap="round"/>
      <path d="M12 9.5 6.5 10" stroke="#f34f29" strokeWidth="1.8" strokeLinecap="round"/>
      <path d="M12 9.5 17.5 10" stroke="#f34f29" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  ),
};

const techs = [
  { name:"React",      bg:"rgba(97,218,251,0.1)",  border:"rgba(97,218,251,0.2)"  },
  { name:"Next.js",    bg:"rgba(255,255,255,0.07)", border:"rgba(255,255,255,0.12)"},
  { name:"Node.js",    bg:"rgba(104,211,145,0.1)",  border:"rgba(104,211,145,0.2)" },
  { name:"Python",     bg:"rgba(253,230,138,0.08)", border:"rgba(253,230,138,0.18)"},
  { name:"PostgreSQL", bg:"rgba(96,165,250,0.1)",   border:"rgba(96,165,250,0.2)"  },
  { name:"AWS",        bg:"rgba(252,211,77,0.08)",  border:"rgba(252,211,77,0.18)" },
  { name:"TypeScript", bg:"rgba(1,112,198,0.1)",   border:"rgba(1,112,198,0.2)"  },
  { name:"JavaScript", bg:"rgba(247,223,30,0.1)",  border:"rgba(247,223,30,0.25)" },
  { name:"HTML",       bg:"rgba(227,79,38,0.1)",   border:"rgba(227,79,38,0.2)"  },
  { name:"CSS",        bg:"rgba(21,114,182,0.1)",  border:"rgba(21,114,182,0.2)" },
  { name:"Tailwind CSS", bg:"rgba(56,189,248,0.1)", border:"rgba(56,189,248,0.2)" },
  { name:"Git",        bg:"rgba(243,79,41,0.1)",   border:"rgba(243,79,41,0.2)" },
];

export default function TechStackCard() {
  return (
    <CardWrapper>
      <style>{`
        .tech-tile { padding:14px 10px; border-radius:14px; border:1px solid; display:flex; flex-direction:column; align-items:center; gap:8px; transition:all 0.3s ease; cursor:default; }
        .tech-tile:hover { transform:scale(1.06) translateY(-2px); box-shadow:0 8px 24px rgba(0,0,0,0.3); }
      `}</style>
      <p className="section-label">Tools</p>
      <h3 style={{ fontFamily:"var(--font-display)", fontSize:20, fontWeight:700, marginTop:8, marginBottom:18, letterSpacing:"-0.01em" }}>Tech I Use Daily</h3>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3, 1fr)", gap:10 }}>
        {techs.map(t => (
          <div key={t.name} className="tech-tile" style={{ background:t.bg, borderColor:t.border }}>
            {icons[t.name]}
            <span style={{ fontSize:11, fontWeight:600, color:"rgba(255,255,255,0.65)", letterSpacing:"0.02em" }}>{t.name}</span>
          </div>
        ))}
      </div>
    </CardWrapper>
  );
}

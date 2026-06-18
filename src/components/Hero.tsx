"use client";

import { useEffect, useRef, useState } from "react";
import CountUp from "react-countup";
import { motion } from "framer-motion";

/* ── SVG Icons ───────────────────────────────────── */
const IconCode = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
  </svg>
);
const IconBriefcase = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
  </svg>
);
const IconStar = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);
const IconArrowRight = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
);
const IconDownload = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
  </svg>
);
const IconMapPin = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
  </svg>
);

/* ── Particle canvas ─────────────────────────────── */
function ParticleField() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    let raf: number;
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener("resize", resize);
    const pts = Array.from({ length: 55 }, () => ({
      x: Math.random() * canvas.width, y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 1.4 + 0.3,
    }));
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = canvas.width; if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height; if (p.y > canvas.height) p.y = 0;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(167,139,250,0.5)"; ctx.fill();
      });
      for (let i = 0; i < pts.length; i++)
        for (let j = i + 1; j < pts.length; j++) {
          const d = Math.hypot(pts[i].x - pts[j].x, pts[i].y - pts[j].y);
          if (d < 90) {
            ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y);
            ctx.strokeStyle = `rgba(124,77,255,${0.1 * (1 - d / 90)})`; ctx.lineWidth = 0.5; ctx.stroke();
          }
        }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={ref} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }} />;
}

/* ── Typewriter ──────────────────────────────────── */
const roles = ["Full Stack Developer", "React & Next.js Developer", "Backend Developer", "UI Craftsman", "Tech Enthusiast", "Django Developer"];
function Typewriter() {
  const [idx, setIdx] = useState(0);
  const [txt, setTxt] = useState("");
  const [del, setDel] = useState(false);
  useEffect(() => {
    const target = roles[idx];
    let t: ReturnType<typeof setTimeout>;
    if (!del && txt.length < target.length) t = setTimeout(() => setTxt(target.slice(0, txt.length + 1)), 65);
    else if (!del && txt.length === target.length) t = setTimeout(() => setDel(true), 2200);
    else if (del && txt.length > 0) t = setTimeout(() => setTxt(s => s.slice(0, -1)), 32);
    else { setDel(false); setIdx(i => (i + 1) % roles.length); }
    return () => clearTimeout(t);
  }, [txt, del, idx]);
  return (
    <span style={{ color: "#a78bfa" }}>
      {txt}
      <span style={{ display: "inline-block", width: "2px", height: "1.1em", background: "#7c4dff", marginLeft: "3px", verticalAlign: "middle", animation: "blink 1s step-end infinite" }} />
    </span>
  );
}

/* ── Stats ───────────────────────────────────────── */
const stats = [
  { value: 2,   suffix: "+", label: "Years Exp.",  color: "#a78bfa" },
  { value: 7,  suffix: "+", label: "Projects",    color: "#60a5fa" },
  { value: 5,  suffix: "+", label: "Clients",     color: "#34d399" },
  { value: 100, suffix: "%", label: "Dedication",  color: "#f472b6" },
];

/* ── Hero ────────────────────────────────────────── */
export default function Hero() {
  return (
    <>
      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes heroFloat { 0%,100%{transform:translateY(0) rotate(-1deg)} 50%{transform:translateY(-12px) rotate(1deg)} }
        @keyframes ringPulse { 0%,100%{opacity:0.3;transform:scale(1)} 50%{opacity:0.65;transform:scale(1.04)} }
        @keyframes scanDown  { 0%{transform:translateY(-100%);opacity:0} 10%{opacity:1} 90%{opacity:1} 100%{transform:translateY(1200%);opacity:0} }
        @keyframes gradShift { 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }

        .hero-wrap {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
          margin-top: 10px;
        }
        @media (min-width: 1024px) {
          .hero-wrap {
            grid-template-columns: 1fr 420px;
            grid-template-rows: 1fr auto;
            grid-template-areas: "left visual" "stats visual";
            min-height: 520px;
          }
          .hero-left   { grid-area: left; }
          .hero-stats  { grid-area: stats; }
          .hero-visual { grid-area: visual; display: flex !important; }
        }

        .hero-name-grad {
          background: linear-gradient(135deg, #e0d7ff 0%, #a78bfa 35%, #60a5fa 65%, #f0abfc 100%);
          background-size: 300% 300%;
          animation: gradShift 5s ease infinite;
          -webkit-background-clip: text; background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .stat-pill {
          flex: 1; min-width: 100px;
          padding: 16px 18px;
          border-radius: 16px;
          background: rgba(13,19,40,0.8);
          border: 1px solid rgba(255,255,255,0.06);
          transition: border-color 0.3s, transform 0.3s;
          position: relative; overflow: hidden;
          backdrop-filter: blur(12px);
        }
        .stat-pill:hover { border-color: rgba(124,77,255,0.3); transform: translateY(-2px); }

        .hero-visual {
          display: none; position: relative;
          border-radius: 24px; overflow: hidden;
          background: linear-gradient(145deg, #080d1e, #0d1328);
          border: 1px solid rgba(124,77,255,0.15);
          flex-direction: column; align-items: center; justify-content: center;
          min-height: 480px;
        }
        .scan-line {
          position: absolute; left:0; right:0; height:1px;
          background: linear-gradient(90deg, transparent, rgba(124,77,255,0.5), rgba(0,212,255,0.3), transparent);
          animation: scanDown 4.5s ease-in-out infinite; pointer-events:none; z-index:5;
        }
        .orbit-ring {
          position: absolute; border-radius:50%;
          border: 1px solid rgba(124,77,255,0.18);
          left:50%; top:50%; transform:translate(-50%,-50%);
        }
        .glass-badge {
          position:absolute; padding:10px 14px; border-radius:12px;
          background:rgba(5,8,20,0.82); backdrop-filter:blur(20px);
          border:1px solid; z-index:20;
        }
        .tech-tag {
          padding: 4px 11px; border-radius: 7px; font-size: 11px; font-weight: 600;
          background: rgba(124,77,255,0.1); border: 1px solid rgba(124,77,255,0.2); color: #c4b5fd;
          display: flex; align-items: center; gap: 5px;
        }
      `}</style>

      <section className="hero-wrap">

        {/* ── LEFT ── */}
        <motion.div className="hero-left card"
          initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.65 }}
          style={{ padding:"20px 38px", display:"flex", flexDirection:"column", justifyContent:"center", gap:"22px" }}
        >
          <div style={{ position:"absolute", top:-50, left:-50, width:200, height:200, borderRadius:"50%", background:"rgba(124,77,255,0.1)", filter:"blur(70px)", pointerEvents:"none" }} />
          <div style={{ position:"absolute", bottom:-30, right:-30, width:160, height:160, borderRadius:"50%", background:"rgba(0,212,255,0.07)", filter:"blur(55px)", pointerEvents:"none" }} />

          {/* Badge */}
          <motion.div initial={{ opacity:0, x:-16 }} animate={{ opacity:1, x:0 }} transition={{ delay:0.2 }}>
            <div className="avail-badge" style={{ width:"fit-content" }}>
              <span className="glow-dot" />
              Available For Freelance
            </div>
          </motion.div>

          {/* Name */}
          <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.3 }}>
            <p style={{ fontFamily:"var(--font-display)", fontSize:"clamp(11px,1vw,13px)", fontWeight:700, letterSpacing:"0.22em", textTransform:"uppercase", color:"rgba(255,255,255,0.28)", margin:"0 0 6px" }}>Hello, I'm</p>
            <h1 style={{ fontFamily:"var(--font-display)", fontSize:"clamp(52px,7vw,80px)", fontWeight:800, lineHeight:0.92, letterSpacing:"-0.04em", margin:0 }}>
              <span className="hero-name-grad">Abhijeet</span>
              <br />
              <span style={{ color:"rgba(255,255,255,0.88)" }}>Verma</span>
            </h1>
          </motion.div>

          {/* Typewriter */}
          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.5 }}
            style={{ fontFamily:"var(--font-display)", fontSize:"clamp(15px,1.6vw,19px)", fontWeight:600, minHeight:"28px", display:"flex", alignItems:"center", gap:"8px" }}>
            <span style={{ color:"rgba(255,255,255,0.2)" }}>&lt;</span>
            <Typewriter />
            <span style={{ color:"rgba(255,255,255,0.2)" }}>/&gt;</span>
          </motion.div>

          {/* Bio */}
          <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.6 }}
            style={{ fontSize:"14px", lineHeight:1.75, color:"rgba(255,255,255,0.4)", maxWidth:"400px", margin:0 }}>
            Transforming ideas into elegant, high-performance digital products. Specialized in full-stack development with a strong eye for design and UX.
          </motion.p>

          {/* CTAs */}
          <motion.div initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.7 }}
            style={{ display:"flex", flexWrap:"wrap", gap:"10px" }}>
            <a href="#projects" style={{ textDecoration:"none" }}>
              <button className="btn-primary" style={{ fontSize:"13px", padding:"11px 26px", display:"flex", alignItems:"center", gap:"8px" }}>
                View My Work <IconArrowRight />
              </button>
            </a>
            <a href="/Abhijeet_Verma_CV.pdf" download="Abhijeet_Kumar_CV.pdf" style={{ textDecoration:"none" }}>
              <button className="btn-outline" style={{ fontSize:"13px", padding:"11px 26px", display:"flex", alignItems:"center", gap:"8px" }}>
                <IconDownload /> Download CV
              </button>
            </a>
          </motion.div>

          {/* Tech tags */}
          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.8 }}
            style={{ display:"flex", gap:"8px", flexWrap:"wrap" }}>
            {[
              { name:"React",      dot:"#61dafb" },
              { name:"Next.js",    dot:"#fff" },
              { name:"Django",    dot:"#68d391" },
              { name:"Python",     dot:"#fde68a" },
            ].map(t => (
              <span key={t.name} className="tech-tag">
                <span style={{ width:6, height:6, borderRadius:"50%", background:t.dot, boxShadow:`0 0 5px ${t.dot}`, flexShrink:0 }} />
                {t.name}
              </span>
            ))}
          </motion.div>
        </motion.div>

        {/* ── STATS ROW ── */}
        <motion.div className="hero-stats"
          initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.45 }}
          style={{ display:"flex", gap:"10px", flexWrap:"wrap" }}
        >
          {stats.map((s, i) => (
            <div key={s.label} className="stat-pill">
              <div style={{ position:"absolute", bottom:-10, right:-10, width:60, height:60, borderRadius:"50%", background:`${s.color}18`, filter:"blur(20px)", pointerEvents:"none" }} />
              <div style={{ fontFamily:"var(--font-display)", fontSize:"34px", fontWeight:800, lineHeight:1, color:s.color, textShadow:`0 0 20px ${s.color}60` }}>
                <CountUp end={s.value} duration={2.2} delay={0.5 + i * 0.1} />{s.suffix}
              </div>
              <p style={{ fontSize:"10px", color:"var(--muted)", marginTop:"5px", fontWeight:600, letterSpacing:"0.1em", textTransform:"uppercase" }}>
                {s.label}
              </p>
            </div>
          ))}
        </motion.div>

        {/* ── VISUAL ── */}
        <motion.div className="hero-visual"
          initial={{ opacity:0, x:24 }} animate={{ opacity:1, x:0 }} transition={{ duration:0.75, delay:0.15 }}
        >
          <ParticleField />
          <div className="scan-line" />

          {[240,330,430,540].map((sz, i) => (
            <div key={i} className="orbit-ring" style={{ width:sz, height:sz, animationDelay:`${i*0.4}s`, animation:`ringPulse ${3+i}s ease-in-out infinite ${i*0.4}s` }} />
          ))}

          <div style={{ position:"absolute", width:180, height:180, borderRadius:"50%", background:"radial-gradient(circle, rgba(124,77,255,0.2) 0%, transparent 70%)", filter:"blur(18px)", zIndex:1 }} />

          {/* Avatar */}
          <div style={{ position:"relative", zIndex:10, width:155, height:155, borderRadius:"50%", background:"radial-gradient(circle at 40% 35%, rgba(167,139,250,0.4), rgba(96,165,250,0.2))", border:"2px solid rgba(167,139,250,0.45)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:62, boxShadow:"0 0 50px rgba(124,77,255,0.35), inset 0 0 25px rgba(124,77,255,0.08)", animation:"heroFloat 7s ease-in-out infinite" }}>
            👨‍💻
          </div>

          {/* Bottom badge — building */}
          <div className="glass-badge" style={{ bottom:24, left:20, borderColor:"rgba(124,77,255,0.25)" }}>
            <p style={{ fontSize:"9px", color:"var(--muted)", letterSpacing:"0.1em", textTransform:"uppercase", margin:"0 0 3px", display:"flex", alignItems:"center", gap:5 }}>
              <IconBriefcase /> Currently Building
            </p>
            <p style={{ fontFamily:"var(--font-display)", fontWeight:700, fontSize:"13px", margin:0 }}>CRM · Tools</p>
          </div>

          {/* Top-right — status */}
          <div className="glass-badge" style={{ top:20, right:20, borderColor:"rgba(0,212,255,0.25)", display:"flex", alignItems:"center", gap:7 }}>
            <span style={{ width:6, height:6, borderRadius:"50%", background:"#00d4ff", boxShadow:"0 0 8px #00d4ff", flexShrink:0 }} />
            <span style={{ fontSize:"11px", color:"#67e8f9", fontWeight:600 }}>Open to work</span>
          </div>

          {/* Top-left — code snippet */}
          <div className="glass-badge" style={{ top:20, left:20, borderColor:"rgba(124,77,255,0.18)", fontFamily:"monospace", fontSize:"10.5px", lineHeight:1.7, color:"rgba(255,255,255,0.35)" }}>
            <span style={{ color:"#a78bfa" }}>const</span> dev = {`{`}<br />
            &nbsp;&nbsp;<span style={{ color:"#60a5fa" }}>name</span>: <span style={{ color:"#86efac" }}>"Abhijeet"</span>,<br />
            &nbsp;&nbsp;<span style={{ color:"#60a5fa" }}>rating</span>: <span style={{ color:"#fbbf24", display:"inline-flex", gap:1 }}>★★★★★</span><br />
            {`}`}
          </div>
        </motion.div>

      </section>
    </>
  );
}

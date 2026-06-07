"use client";
import CardWrapper from "../CardWrapper";

const Zap = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>;

const skills = [
  { name:"Python",     level:75, color:"#fde68a" },
  { name:"Django",     level:72, color:"#6ee7b7" },
  { name:"PostgreSQL", level:60, color:"#93c5fd" },
  { name:"React",      level:70, color:"#61dafb" },
  { name:"Next.js",    level:60, color:"#a78bfa" },
  { name:"JavaScript", level:70, color:"#68d391" },
  // { name:"TypeScript", level:88, color:"#60a5fa" },
  { name:"AWS",        level:50, color:"#fcd34d" },
  { name:"Git",        level:60, color:"#f87171" },
  // { name:"Docker",     level:78, color:"#38bdf8" },
  { name:"Tailwind",   level:45, color:"#a5b4fc" },
  { name:"Bootstrap",  level:50, color:"#fbbf24" },
  { name:"Redis",      level:55, color:"#f87171" },
  { name:"Celery",     level:60, color:"#6ee7b7" },

];

export default function SkillsCard() {
  return (
    <CardWrapper>
      <div style={{ position:"absolute", top:0, right:0, width:180, height:180, borderRadius:"50%", background:"rgba(0,212,255,0.05)", filter:"blur(60px)", pointerEvents:"none" }} />
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", flexWrap:"wrap", gap:8 }}>
        <div>
          <p className="section-label">Tech Stack</p>
          <h3 style={{ fontFamily:"var(--font-display)", fontSize:22, fontWeight:700, marginTop:8, letterSpacing:"-0.02em" }}>Skills & Technologies</h3>
        </div>
        <span style={{ fontSize:11, color:"var(--muted)", marginTop:4, display:"flex", alignItems:"center", gap:5 }}>
          <span style={{ color:"#fbbf24" }}><Zap /></span>{skills.length} tools mastered
        </span>
      </div>
      {/* Pills */}
      <div style={{ display:"flex", flexWrap:"wrap", gap:8, marginTop:20 }}>
        {skills.map(s => (
          <div key={s.name} className="skill-pill" style={{ display:"flex", alignItems:"center", gap:6 }}>
            <span style={{ width:6, height:6, borderRadius:"50%", background:s.color, boxShadow:`0 0 5px ${s.color}`, flexShrink:0 }} />
            {s.name}
          </div>
        ))}
      </div>
      {/* Bars */}
      <div style={{ marginTop:24, display:"flex", flexDirection:"column", gap:11 }}>
        {skills.slice(0,4).map(s => (
          <div key={s.name}>
            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:5 }}>
              <span style={{ fontSize:12, color:"rgba(255,255,255,0.6)", fontWeight:500, display:"flex", alignItems:"center", gap:6 }}>
                <span style={{ width:6, height:6, borderRadius:"50%", background:s.color }} />
                {s.name}
              </span>
              <span style={{ fontSize:11, color:s.color, fontWeight:700 }}>{s.level}%</span>
            </div>
            <div style={{ height:4, borderRadius:999, background:"rgba(255,255,255,0.06)", overflow:"hidden" }}>
              <div style={{ height:"100%", width:`${s.level}%`, borderRadius:999, background:`linear-gradient(90deg, ${s.color}99, ${s.color})`, boxShadow:`0 0 8px ${s.color}60` }} />
            </div>
          </div>
        ))}
      </div>
    </CardWrapper>
  );
}

"use client";
import CardWrapper from "../CardWrapper";

const Briefcase = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg>;

const timeline = [
  { year:"Dec 2025 — Present",  title:"Full Stack Dev",         company:"Freelance",               tag:"Active",  desc:"CRM, AI tools" },
  { year:"Oct 2024 — Present",  title:"Backend Developer",      company:"Crysta IVF",              tag:"Active", desc:"REST APIs, Postgres" },
  { year:"May 2025 — Oct 2025", title:"Frontend, Tech Support", company:"TrafikSol ITS Solutions", tag:"6 mos",   desc:"React, UI systems"  },
  { year:"Nov 2022 — Mar 2025", title:"Non-Tech Experience",    company:"Recruitement Agencies",  tag:"1.4 yrs", desc:"US Healthcare Recruiter" },
];

export default function ExperienceCard() {
  return (
    <CardWrapper>
      <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:4 }}>
        <p className="section-label">Experience</p>
      </div>
      <h3 style={{ fontFamily:"var(--font-display)", fontSize:20, fontWeight:700, marginTop:8, marginBottom:22, letterSpacing:"-0.01em" }}>Career Timeline</h3>
      <div>
        {timeline.map((item, i) => (
          <div key={item.year} className="timeline-item" style={{ paddingBottom: i === timeline.length-1 ? 0 : 22 }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:8 }}>
              <div>
                <p style={{ fontSize:10, color:"#a78bfa", fontWeight:700, letterSpacing:"0.08em", textTransform:"uppercase", margin:0, display:"flex", alignItems:"center", gap:5 }}>
                  <span style={{ color:"#7c4dff", display:"flex" }}><Briefcase /></span>
                  {item.year}
                </p>
                <h4 style={{ fontWeight:700, fontSize:14, marginTop:4, fontFamily:"var(--font-display)", margin:"4px 0 2px" }}>{item.title}</h4>
                <p style={{ fontSize:12, color:"var(--muted)", margin:0 }}>{item.company} · <span style={{ color:"rgba(255,255,255,0.3)" }}>{item.desc}</span></p>
              </div>
              {item.tag === "Active" ? (
                <span style={{ padding:"3px 9px", borderRadius:6, fontSize:10, fontWeight:700, letterSpacing:"0.06em", textTransform:"uppercase", background:"rgba(74,222,128,0.12)", color:"#86efac", border:"1px solid rgba(74,222,128,0.2)", flexShrink:0, display:"flex", alignItems:"center", gap:4 }}>
                  <span style={{ width:5, height:5, borderRadius:"50%", background:"#4ade80", boxShadow:"0 0 6px #4ade80" }} />
                  Active
                </span>
              ) : (
                <span style={{ padding:"3px 9px", borderRadius:6, fontSize:10, fontWeight:600, background:"rgba(255,255,255,0.04)", color:"var(--muted)", border:"1px solid rgba(255,255,255,0.07)", flexShrink:0 }}>{item.tag}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </CardWrapper>
  );
}

"use client";
import { useState } from "react";
import CardWrapper from "../CardWrapper";

/* ── Icons ── */
const MapPin = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>;
const Mail   = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>;
const Clock  = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>;
const Brief  = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg>;
const Zap    = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>;
const X      = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>;
const Github   = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/></svg>;
const Linkedin = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>;
const Twitter  = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.259 5.631 5.905-5.631zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>;
const Instagram = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" fill="none" stroke="currentColor" strokeWidth="2"/><circle cx="17.5" cy="6.5" r="1.5"/></svg>;
const ExternalLink = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>;

const skills = ["React","Next.js","Python","Django","Node.js","PostgreSQL","REST APIs","Docker","AWS","Git","TypeScript","Redis"];
const timeline = [
  { year:"Oct 2024 — Present", role:"Backend Developer",          company:"Crysta IVF",          color:"#4ade80" },
  { year:"Dec 2023 — Present", role:"Full Stack Developer",       company:"Freelance",            color:"#a78bfa" },
  { year:"May 2025 — Oct 2025",role:"Frontend Dev & Tech Support",company:"TrafikSol ITS",        color:"#60a5fa" },
];

export default function AboutCard() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <style>{`
        @keyframes ab-fadein { from{opacity:0;transform:scale(0.96)} to{opacity:1;transform:scale(1)} }
        .ab-modal-backdrop {
          position:fixed;inset:0;z-index:1000;
          background:rgba(0,0,0,0.75);backdrop-filter:blur(8px);
          display:flex;align-items:center;justify-content:center;padding:20px;
          animation: ab-fadein 0.25s ease;
        }
        .ab-modal {
          width:100%;max-width:760px;max-height:90vh;overflow-y:auto;
          background:linear-gradient(135deg,#0a0f1e,#080d1e);
          border:1px solid rgba(124,77,255,0.25);border-radius:24px;
          position:relative;
          scrollbar-width:none;
        }
        .ab-modal::-webkit-scrollbar{display:none}
        .ab-close-btn {
          position:sticky;top:16px;float:right;margin:16px 16px 0 0;
          width:36px;height:36px;border-radius:10px;
          background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);
          display:flex;align-items:center;justify-content:center;
          cursor:pointer;transition:all 0.2s;color:rgba(255,255,255,0.6);
          z-index:10;flex-shrink:0;
        }
        .ab-close-btn:hover{background:rgba(255,60,60,0.15);border-color:rgba(255,60,60,0.3);color:#f87171;}
        .ab-skill-tag {
          padding:5px 12px;border-radius:8px;font-size:12px;font-weight:600;
          background:rgba(124,77,255,0.1);border:1px solid rgba(124,77,255,0.2);
          color:#c4b5fd;transition:all 0.25s;cursor:default;
        }
        .ab-skill-tag:hover{background:rgba(124,77,255,0.2);border-color:rgba(124,77,255,0.4);transform:scale(1.04);}
        .ab-social-btn {
          display:flex;align-items:center;gap:8px;padding:10px 18px;
          border-radius:12px;border:1px solid rgba(255,255,255,0.08);
          background:rgba(255,255,255,0.04);font-size:13px;font-weight:600;
          cursor:pointer;transition:all 0.25s;text-decoration:none;
          font-family:var(--font-body);
        }
        .ab-social-btn:hover{border-color:rgba(124,77,255,0.4);background:rgba(124,77,255,0.1);transform:translateY(-2px);}
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

      {/* ── ABOUT MODAL ── */}
      {open && (
        <div className="ab-modal-backdrop" onClick={e => { if(e.target===e.currentTarget) setOpen(false); }}>
          <div className="ab-modal">
            <button className="ab-close-btn" onClick={() => setOpen(false)}><X /></button>

            {/* Header */}
            <div style={{ padding:"32px 32px 0", paddingTop:24 }}>
              {/* Banner gradient */}
              <div style={{ height:90, borderRadius:16, background:"linear-gradient(135deg,rgba(124,77,255,0.3),rgba(0,212,255,0.15))", marginBottom:0, position:"relative", overflow:"hidden", marginTop:8 }}>
                <div style={{ position:"absolute", inset:0, backgroundImage:"linear-gradient(rgba(255,255,255,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.04) 1px,transparent 1px)", backgroundSize:"20px 20px" }}/>
                {/* <div style={{ position:"absolute", right:24, top:16, fontSize:48 }}>👨‍💻</div> */}
              </div>

              {/* Avatar row */}
              <div style={{ display:"flex", alignItems:"flex-end", gap:16, marginTop:-75, padding:10 }}>
                <div style={{ width:64, height:64, borderRadius:18, background:"linear-gradient(135deg,rgba(124,77,255,0.6),rgba(0,212,255,0.4))", border:"3px solid #080d1e", display:"flex", alignItems:"center", justifyContent:"center", fontSize:28, flexShrink:0 }}>🧑‍💻</div>
                <div style={{ paddingBottom:8 }}>
                  <h2 style={{ fontFamily:"var(--font-display)", fontWeight:800, fontSize:22, letterSpacing:"-0.02em", margin:0 }}>Abhijeet Verma</h2>
                  <p style={{ fontSize:13, color:"#a78bfa", margin:"3px 0 0" }}>Full Stack Developer · Backend Specialist</p>
                </div>
                <div style={{ marginLeft:"auto", paddingBottom:12, display:"flex", gap:8 }}>
                  <div style={{ padding:"4px 12px", borderRadius:8, background:"rgba(74,222,128,0.1)", border:"1px solid rgba(74,222,128,0.25)", fontSize:11, color:"#86efac", fontWeight:700, display:"flex", alignItems:"center", gap:6 }}>
                    <span style={{ width:6, height:6, borderRadius:"50%", background:"#4ade80", boxShadow:"0 0 8px #4ade80" }}/>
                    Available
                  </div>
                </div>
              </div>
            </div>

            {/* Body */}
            <div style={{ padding:"24px 32px 32px", display:"flex", flexDirection:"column", gap:24 }}>

              {/* Bio */}
              <div>
                <p style={{ fontSize:13, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:"rgba(255,255,255,0.3)", marginBottom:10 }}>About</p>
                <p style={{ fontSize:14, lineHeight:1.85, color:"rgba(255,255,255,0.55)" }}>
                  Full Stack Developer with 2+ years of experience building scalable web applications, RESTful APIs, and modern UI systems. Currently working at <strong style={{ color:"#a78bfa" }}>Crysta IVF</strong> as Backend Developer and freelancing on SaaS products. Proficient in React, Next.js, Django, Python, and PostgreSQL. Passionate about clean architecture, performance optimization, and delivering premium user experiences.
                </p>
              </div>

              {/* Info grid */}
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
                {[
                  { icon:<MapPin />, label:"Location",  val:"Delhi, India",                 color:"#f87171" },
                  { icon:<Mail />,   label:"Email",     val:"abhijeetkumar7011@gmail.com",   color:"#60a5fa" },
                  { icon:<Clock />,  label:"Timezone",  val:"IST — UTC +5:30",              color:"#34d399" },
                  { icon:<Brief />,  label:"Status",    val:"Open to Opportunities",         color:"#fbbf24" },
                ].map(item => (
                  <div key={item.label} style={{ padding:"12px 14px", borderRadius:12, background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.06)" }}>
                    <p style={{ fontSize:10, color:"var(--muted)", textTransform:"uppercase", letterSpacing:"0.08em", margin:"0 0 5px", display:"flex", alignItems:"center", gap:5 }}>
                      <span style={{ color:item.color }}>{item.icon}</span>{item.label}
                    </p>
                    <p style={{ fontSize:13, fontWeight:600, color:"rgba(255,255,255,0.75)", margin:0 }}>{item.val}</p>
                  </div>
                ))}
              </div>

              {/* Experience Timeline */}
              <div>
                <p style={{ fontSize:13, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:"rgba(255,255,255,0.3)", marginBottom:14 }}>Experience</p>
                <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                  {timeline.map((item, i) => (
                    <div key={i} style={{ display:"flex", gap:14, alignItems:"flex-start", padding:"12px 14px", borderRadius:12, background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.06)" }}>
                      <div style={{ width:3, alignSelf:"stretch", borderRadius:2, background:item.color, flexShrink:0, marginTop:2 }}/>
                      <div>
                        <p style={{ fontSize:14, fontWeight:700, margin:0 }}>{item.role}</p>
                        <p style={{ fontSize:12, color:item.color, margin:"3px 0 4px" }}>{item.company}</p>
                        <p style={{ fontSize:11, color:"var(--muted)", margin:0 }}>{item.year}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Skills */}
              <div>
                <p style={{ fontSize:13, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:"rgba(255,255,255,0.3)", marginBottom:12 }}>Tech Stack</p>
                <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
                  {skills.map(s => <span key={s} className="ab-skill-tag">{s}</span>)}
                </div>
              </div>

              {/* Social links */}
              <div>
                <p style={{ fontSize:13, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:"rgba(255,255,255,0.3)", marginBottom:12 }}>Connect</p>
                <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
                  <a href="https://github.com/abhijeetkumar7011-code" target="_blank" rel="noopener noreferrer" className="ab-social-btn" style={{ color:"rgba(255,255,255,0.7)" }}>
                    <Github /> GitHub
                  </a>
                  <a href="https://www.linkedin.com/in/abhijeet-kumar-57b388232/https://www.linkedin.com/in/abhijeet-kumar-57b388232/" target="_blank" rel="noopener noreferrer" className="ab-social-btn" style={{ color:"#60a5fa" }}>
                    <Linkedin /> LinkedIn
                  </a>
                  <a href="https://www.instagram.com/u_know_its_abhijeet/" target="_blank" rel="noopener noreferrer" className="ab-social-btn" style={{ color:"#ec4899" }}>
                    <Instagram /> Instagram
                  </a>
                  
                  {/* <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="ab-social-btn" style={{ color:"#38bdf8" }}>
                    <Twitter /> Twitter
                  </a> */}
                  <a href="mailto:abhijeetkumar7011@gmail.com" className="ab-social-btn" style={{ color:"#34d399" }}>
                    <Mail /> Email Me
                  </a>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}
    </>
  );
}

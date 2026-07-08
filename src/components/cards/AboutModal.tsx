"use client";
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ── Icons ── */
const MapPin = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>;
const Mail   = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>;
const Clock  = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>;
const Brief  = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg>;
const X      = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>;
const Github   = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/></svg>;
const Linkedin = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>;
const Instagram = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" fill="none" stroke="currentColor" strokeWidth="2"/><circle cx="17.5" cy="6.5" r="1.5"/></svg>;

const skills = ["React","Next.js","Python","Django","Node.js","PostgreSQL","REST APIs","Docker","AWS","Git","TypeScript","Redis"];
const timeline = [
  { year:"Oct 2024 — Present", role:"Backend Developer",          company:"Crysta IVF",   color:"#4ade80" },
  { year:"Dec 2023 — Present", role:"Full Stack Developer",       company:"Freelance",     color:"#a78bfa" },
  { year:"May 2025 — Oct 2025",role:"Frontend Dev & Tech Support", company:"TrafikSol ITS", color:"#60a5fa" },
];

interface AboutModalProps {
  open: boolean;
  onClose: () => void;
}

export default function AboutModal({ open, onClose }: AboutModalProps) {
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = prev; };
    }
  }, [open]);

  return (
    <>
      <style>{`
        .gm-backdrop {
          position:fixed;inset:0;z-index:1000;
          background:rgba(6,8,18,0.65);backdrop-filter:blur(6px);
          display:flex;align-items:center;justify-content:center;padding:20px;
        }
        .gm-modal {
          width:100%;max-width:760px;max-height:90vh;overflow-y:auto;
          border-radius:28px;
          background: rgba(255,255,255,0.05);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border:1px solid rgba(255,255,255,0.12);
          box-shadow: 0 24px 70px rgba(0,0,0,0.55), inset 0 1px 1px rgba(255,255,255,0.08);
          position:relative;
          scrollbar-width:none;
        }
        .gm-modal::-webkit-scrollbar{display:none}

        @media (max-width:640px) {
          .gm-backdrop { padding:0; align-items:flex-end; }
          .gm-modal {
            max-width:100%; width:100%; height:92vh; max-height:92vh;
            border-radius:28px 28px 0 0;
          }
        }

        .gm-close-btn {
          position:sticky;top:16px;float:right;margin:16px 16px 0 0;
          width:38px;height:38px;border-radius:12px;
          background: rgba(255,255,255,0.08);
          backdrop-filter: blur(10px);
          border:1px solid rgba(255,255,255,0.15);
          display:flex;align-items:center;justify-content:center;
          cursor:pointer;transition:all 0.2s;color:rgba(255,255,255,0.7);
          z-index:10;flex-shrink:0;
        }
        .gm-close-btn:hover{background:rgba(255,60,60,0.15);border-color:rgba(255,90,90,0.3);color:#f87171;}

        .gm-banner {
          height:96px;border-radius:22px;position:relative;overflow:hidden;
          background: linear-gradient(135deg, rgba(124,77,255,0.35), rgba(0,212,255,0.18));
          backdrop-filter: blur(10px);
          border:1px solid rgba(255,255,255,0.15);
        }
        @media (max-width:640px){ .gm-banner{ height:70px; border-radius:20px; } }

        .gm-avatar {
          width:58px;height:58px;border-radius:20px;flex-shrink:0;
          background: rgba(255,255,255,0.1);
          backdrop-filter: blur(14px);
          display:flex;align-items:center;justify-content:center;font-size:28px;
          border:1px solid rgba(255,255,255,0.25);
          box-shadow: 0 8px 24px rgba(0,0,0,0.4), inset 0 1px 1px rgba(255,255,255,0.15);
          position:relative;
          z-index:2;
          margin-top:-34px;
        }
        @media (max-width:640px){ .gm-avatar{ width:44px;height:44px;font-size:22px;border-radius:16px;margin-top:-26px; } }

        .gm-pill {
          padding:5px 13px;border-radius:20px;font-size:11px;font-weight:700;
          background: rgba(74,222,128,0.12);
          backdrop-filter: blur(10px);
          border:1px solid rgba(74,222,128,0.35);
          color:#86efac;display:flex;align-items:center;gap:6px;white-space:nowrap;
        }
        @media (max-width:640px){ .gm-pill{ padding:4px 6px;font-size:10px; } }

        .gm-box {
          border-radius:16px;padding:13px 15px;
          background: rgba(255,255,255,0.04);
          backdrop-filter: blur(12px);
          border:1px solid rgba(255,255,255,0.1);
          transition: border-color 0.25s, background 0.25s;
        }
        .gm-box:hover{ border-color:rgba(255,255,255,0.2); background:rgba(255,255,255,0.06); }

        .gm-skill-tag {
          padding:6px 14px;border-radius:20px;font-size:12px;font-weight:600;
          background: rgba(124,77,255,0.12);
          backdrop-filter: blur(10px);
          border:1px solid rgba(124,77,255,0.3);
          color:#c4b5fd;cursor:default;transition:all 0.2s;
        }
        .gm-skill-tag:hover{ background:rgba(124,77,255,0.22); border-color:rgba(124,77,255,0.5); transform:translateY(-2px); }

        .gm-social-btn {
          display:flex;align-items:center;gap:8px;padding:10px 18px;
          border-radius:14px;border:1px solid rgba(255,255,255,0.12);
          background: rgba(255,255,255,0.04);
          backdrop-filter: blur(12px);
          font-size:13px;font-weight:600;cursor:pointer;text-decoration:none;
          font-family:var(--font-body);transition:all 0.2s;
        }
        .gm-social-btn:hover{ border-color:rgba(124,77,255,0.45); background:rgba(124,77,255,0.12); transform:translateY(-2px); }
      `}</style>

      <AnimatePresence>
        {open && (
          <motion.div
            className="gm-backdrop"
            onClick={e => { if (e.target === e.currentTarget) onClose(); }}
            initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} transition={{ duration:0.2 }}
          >
            <motion.div
              className="gm-modal"
              initial={{ opacity:0, scale:0.92, y:24 }}
              animate={{ opacity:1, scale:1, y:0 }}
              exit={{ opacity:0, scale:0.94, y:16 }}
              transition={{ type:"spring", stiffness:280, damping:26 }}
            >
              <button className="gm-close-btn" onClick={onClose}><X /></button>

              {/* Header */}
              <div style={{ padding:"28px 28px 0" }}>
                <div className="gm-banner" style={{ marginTop:8 }}>
                  <div style={{ position:"absolute", inset:0, backgroundImage:"linear-gradient(rgba(255,255,255,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.06) 1px,transparent 1px)", backgroundSize:"20px 20px" }}/>
                </div>

                {/* Avatar row */}
                <div style={{ display:"flex", alignItems:"flex-end", flexWrap:"wrap", gap:14, width:"100%", marginTop:"-70px", marginBottom:20, padding:"0 40px 0 10px" }}>
                  <div className="gm-avatar">🧑‍💻</div>
                  <div style={{ minWidth:0 }}>
                    <h2 style={{ fontFamily:"var(--font-display)", fontWeight:800, fontSize:"clamp(18px,4vw,22px)", letterSpacing:"-0.02em", margin:0 }}>Abhijeet Verma</h2>
                    <p style={{ fontSize:13, color:"#a78bfa", margin:"3px 0 0" }}>Backend Specialist</p>
                  </div>
                  <div className="gm-pill" style={{ marginLeft:"auto" }}>
                    <span style={{ width:6, height:6, borderRadius:"50%", background:"#4ade80", boxShadow:"0 0 8px #4ade80" }}/>
                    Available
                  </div>
                </div>
              </div>

              {/* Body */}
              <div style={{ padding:"22px 20px 28px", display:"flex", flexDirection:"column", gap:22 }}>

                {/* Bio */}
                <div>
                  <p style={{ fontSize:13, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:"rgba(255,255,255,0.3)", marginBottom:10 }}>About</p>
                  <p style={{ fontSize:14, lineHeight:1.85, color:"rgba(255,255,255,0.55)" }}>
                    Full Stack Developer with 2+ years of experience building scalable web applications, RESTful APIs, and modern UI systems. Currently working at <strong style={{ color:"#a78bfa" }}>Crysta IVF</strong> as Backend Developer and freelancing on SaaS products. Proficient in React, Next.js, Django, Python, and PostgreSQL. Passionate about clean architecture, performance optimization, and delivering premium user experiences.
                  </p>
                </div>

                {/* Info grid */}
                <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(150px, 1fr))", gap:10 }}>
                  {[
                    { icon:<MapPin />, label:"Location",  val:"Delhi, India",                 color:"#f87171" },
                    { icon:<Mail />,   label:"Email",     val:"abhijeetkumar7011@gmail.com",   color:"#60a5fa" },
                    { icon:<Clock />,  label:"Timezone",  val:"IST — UTC +5:30",              color:"#34d399" },
                    { icon:<Brief />,  label:"Status",    val:"Open to Opportunities",         color:"#fbbf24" },
                  ].map(item => (
                    <div key={item.label} className="gm-box">
                      <p style={{ fontSize:10, color:"var(--muted)", textTransform:"uppercase", letterSpacing:"0.08em", margin:"0 0 5px", display:"flex", alignItems:"center", gap:5 }}>
                        <span style={{ color:item.color }}>{item.icon}</span>{item.label}
                      </p>
                      <p style={{ fontSize:13, fontWeight:600, color:"rgba(255,255,255,0.85)", margin:0, wordBreak:"break-word" }}>{item.val}</p>
                    </div>
                  ))}
                </div>

                {/* Experience Timeline */}
                <div>
                  <p style={{ fontSize:13, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:"rgba(255,255,255,0.3)", marginBottom:14 }}>Experience</p>
                  <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                    {timeline.map((item, i) => (
                      <div key={i} className="gm-box" style={{ display:"flex", gap:14, alignItems:"flex-start" }}>
                        <div style={{ width:3, alignSelf:"stretch", borderRadius:2, background:item.color, flexShrink:0, marginTop:2, boxShadow:`0 0 8px ${item.color}80` }}/>
                        <div style={{ minWidth:0 }}>
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
                    {skills.map(s => <span key={s} className="gm-skill-tag">{s}</span>)}
                  </div>
                </div>

                {/* Social links */}
                <div>
                  <p style={{ fontSize:13, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:"rgba(255,255,255,0.3)", marginBottom:12 }}>Connect</p>
                  <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
                    <a href="https://github.com/abhijeetkumar7011-code" target="_blank" rel="noopener noreferrer" className="gm-social-btn" style={{ color:"rgba(255,255,255,0.7)" }}>
                      <Github /> GitHub
                    </a>
                    <a href="https://www.linkedin.com/in/abhijeet-kumar-57b388232/" target="_blank" rel="noopener noreferrer" className="gm-social-btn" style={{ color:"#60a5fa" }}>
                      <Linkedin /> LinkedIn
                    </a>
                    <a href="https://www.instagram.com/u_know_its_abhijeet/" target="_blank" rel="noopener noreferrer" className="gm-social-btn" style={{ color:"#ec4899" }}>
                      <Instagram /> Instagram
                    </a>
                    <a href="mailto:abhijeetkumar7011@gmail.com" className="gm-social-btn" style={{ color:"#34d399" }}>
                      <Mail /> Email Me
                    </a>
                  </div>
                </div>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
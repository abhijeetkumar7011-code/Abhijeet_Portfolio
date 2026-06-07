"use client";
import CardWrapper from "../CardWrapper";

const Github   = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/></svg>;
const Linkedin = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>;
const Twitter  = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.259 5.631 5.905-5.631zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>;
const Send     = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>;

const socials = [
  { icon:<Github />,   label:"GitHub",   href:"#", color:"rgba(255,255,255,0.7)" },
  { icon:<Linkedin />, label:"LinkedIn", href:"#", color:"#60a5fa" },
  { icon:<Twitter />,  label:"Twitter",  href:"#", color:"#38bdf8" },
];

export default function ContactCard() {
  return (
    <CardWrapper style={{ display:"flex", flexDirection:"column", justifyContent:"center" }}>
      <style>{`
        .social-btn-cc {
          display: flex; align-items: center; gap: 8px;
          padding: 8px 14px; border-radius: 10px;
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.04);
          font-size: 12px; font-weight: 600;
          color: rgba(255,255,255,0.5);
          cursor: pointer; transition: all 0.25s;
          text-decoration: none;
          font-family: var(--font-body);
        }
        .social-btn-cc:hover {
          border-color: rgba(124,77,255,0.4);
          background: rgba(124,77,255,0.08);
          color: #c4b5fd; transform: translateY(-1px);
        }
      `}</style>
      <div className="contact-gradient" />
      <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", width:200, height:200, borderRadius:"50%", background:"rgba(124,77,255,0.12)", filter:"blur(60px)", pointerEvents:"none" }} />

      <div style={{ position:"relative", zIndex:1 }}>
        <p className="section-label">Let's Build</p>
        <h3 style={{ fontFamily:"var(--font-display)", fontSize:30, fontWeight:800, marginTop:10, lineHeight:1.1, letterSpacing:"-0.03em" }}>
          Have an{" "}
          <span style={{ background:"linear-gradient(135deg, #a78bfa, #60a5fa)", WebkitBackgroundClip:"text", backgroundClip:"text", WebkitTextFillColor:"transparent" }}>idea?</span>
        </h3>
        <p style={{ marginTop:10, fontSize:13, color:"rgba(255,255,255,0.42)", lineHeight:1.7 }}>
          Let's turn your vision into a stunning, high-performance digital product.
        </p>
        <div style={{ display:"flex", gap:8, marginTop:18, flexWrap:"wrap" }}>
          {socials.map(s => (
            <a key={s.label} href={s.href} className="social-btn-cc skill-pill">
              <span style={{ color:s.color, display:"flex" }}>{s.icon}</span>
              {s.label}
            </a>
          ))}
        </div>
        <button className="btn-primary" style={{ marginTop:18, width:"100%", display:"flex", alignItems:"center", justifyContent:"center", gap:8 }}>
          <Send /> Contact Me
        </button>
      </div>
    </CardWrapper>
  );
}

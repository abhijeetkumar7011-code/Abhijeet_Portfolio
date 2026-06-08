"use client";
import { useState } from "react";
import CardWrapper from "../CardWrapper";

const Github   = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/></svg>;
const Linkedin = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>;
const Twitter  = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.259 5.631 5.905-5.631zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>;
const Send     = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>;
const X        = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>;
const User     = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
const Mail2    = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>;
const Msg      = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>;
const Check    = () => <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>;

const socials = [
  { icon:<Github />,   label:"GitHub",   href:"https://github.com",    color:"rgba(255,255,255,0.7)" },
  { icon:<Linkedin />, label:"LinkedIn", href:"https://linkedin.com",  color:"#60a5fa" },
  { icon:<Twitter />,  label:"Twitter",  href:"https://twitter.com",   color:"#38bdf8" },
];

const services = ["Web Development","Backend APIs","SaaS Product","UI / UX Design","Consultation","Other"];

export default function ContactCard() {
  const [open, setOpen]       = useState(false);
  const [sent, setSent]       = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm]       = useState({ name:"", email:"", service:"Web Development", message:"" });
  const [errors, setErrors]   = useState<Record<string,string>>({});

  const validate = () => {
    const e: Record<string,string> = {};
    if (!form.name.trim())    e.name    = "Name is required";
    if (!form.email.trim())   e.email   = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Invalid email";
    if (!form.message.trim()) e.message = "Message is required";
    return e;
  };

  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setErrors({}); setLoading(true);
    // Formspree endpoint
    try {
      await fetch("https://formspree.io/f/xwpkqvqo", {
        method:"POST",
        headers:{ "Content-Type":"application/json", "Accept":"application/json" },
        body: JSON.stringify({
          name:    form.name,
          email:   form.email,
          service: form.service,
          message: form.message,
          _replyto: form.email,
        }),
      });
    } catch(_) {}
    setLoading(false);
    setSent(true);
  };

  return (
    <>
      <style>{`
        @keyframes ct-fadein  { from{opacity:0;transform:scale(0.95)} to{opacity:1;transform:scale(1)} }
        @keyframes ct-success { 0%{transform:scale(0.5);opacity:0} 60%{transform:scale(1.1)} 100%{transform:scale(1);opacity:1} }
        @keyframes ct-confetti {
          0%   { transform:translateY(0) rotate(0deg); opacity:1; }
          100% { transform:translateY(-80px) rotate(720deg); opacity:0; }
        }
        .ct-backdrop {
          position:fixed;inset:0;z-index:1000;
          background:rgba(0,0,0,0.75);backdrop-filter:blur(8px);
          display:flex;align-items:center;justify-content:center;padding:20px;
          animation:ct-fadein 0.25s ease;
        }
        .ct-modal {
          width:100%;max-width:520px;
          background:linear-gradient(135deg,#0a0f1e,#08101e);
          border:1px solid rgba(124,77,255,0.25);border-radius:24px;
          overflow:hidden;position:relative;
        }
        .ct-field {
          width:100%;padding:12px 16px 12px 40px;
          background:rgba(255,255,255,0.04);
          border:1px solid rgba(255,255,255,0.08);
          border-radius:12px;color:#f0f0ff;
          font-size:14px;font-family:var(--font-body);
          outline:none;transition:border-color 0.25s,box-shadow 0.25s;
          box-sizing:border-box;
        }
        .ct-field:focus{border-color:rgba(124,77,255,0.5);box-shadow:0 0 0 3px rgba(124,77,255,0.1);}
        .ct-field::placeholder{color:rgba(255,255,255,0.25);}
        .ct-field.error{border-color:rgba(248,113,113,0.5);}
        .ct-field-wrap{position:relative;}
        .ct-field-icon{position:absolute;left:13px;top:50%;transform:translateY(-50%);color:rgba(255,255,255,0.3);pointer-events:none;display:flex;}
        .ct-select{appearance:none;cursor:pointer;}
        .ct-textarea{resize:none;height:100px;padding-top:12px;line-height:1.6;}
        .ct-textarea-wrap .ct-field-icon{top:14px;transform:none;}
        .ct-submit {
          width:100%;padding:14px;border-radius:14px;
          background:linear-gradient(135deg,#7c4dff,#5b21b6);
          border:1px solid rgba(124,77,255,0.4);
          color:#fff;font-size:14px;font-weight:700;
          font-family:var(--font-display);letter-spacing:0.02em;
          cursor:pointer;transition:all 0.3s;
          display:flex;align-items:center;justify-content:center;gap:8px;
        }
        .ct-submit:hover:not(:disabled){box-shadow:0 0 28px rgba(124,77,255,0.5),0 6px 20px rgba(0,0,0,0.4);transform:translateY(-2px);}
        .ct-submit:disabled{opacity:0.6;cursor:not-allowed;}
        .ct-error-msg{font-size:11px;color:#f87171;margin-top:4px;}
        .ct-success-wrap{display:flex;flex-direction:column;align-items:center;justify-content:center;padding:48px 32px;text-align:center;gap:16px;}
        .ct-check-circle{
          width:72px;height:72px;border-radius:50%;
          background:linear-gradient(135deg,rgba(74,222,128,0.2),rgba(74,222,128,0.05));
          border:2px solid rgba(74,222,128,0.4);
          display:flex;align-items:center;justify-content:center;color:#4ade80;
          animation:ct-success 0.6s cubic-bezier(0.34,1.56,0.64,1) both;
        }
        .ct-confetti-dot {
          position:absolute;width:8px;height:8px;border-radius:50%;
          animation:ct-confetti 1s ease forwards;
        }
        .social-btn-cc {
          display:flex;align-items:center;gap:8px;padding:8px 14px;border-radius:10px;
          border:1px solid rgba(255,255,255,0.08);background:rgba(255,255,255,0.04);
          font-size:12px;font-weight:600;color:rgba(255,255,255,0.5);
          cursor:pointer;transition:all 0.25s;text-decoration:none;font-family:var(--font-body);
        }
        .social-btn-cc:hover{border-color:rgba(124,77,255,0.4);background:rgba(124,77,255,0.08);color:#c4b5fd;transform:translateY(-1px);}
      `}</style>

      {/* ── CARD ── */}
      <CardWrapper style={{ display:"flex", flexDirection:"column", justifyContent:"center" }}>
        <div className="contact-gradient" />
        <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", width:200, height:200, borderRadius:"50%", background:"rgba(124,77,255,0.12)", filter:"blur(60px)", pointerEvents:"none" }} />
        <div style={{ position:"relative", zIndex:1 }}>
          <p className="section-label">Let's Build</p>
          <h3 style={{ fontFamily:"var(--font-display)", fontSize:30, fontWeight:800, marginTop:10, lineHeight:1.1, letterSpacing:"-0.03em" }}>
            Have an <span style={{ background:"linear-gradient(135deg,#a78bfa,#60a5fa)", WebkitBackgroundClip:"text", backgroundClip:"text", WebkitTextFillColor:"transparent" }}>idea?</span>
          </h3>
          <p style={{ marginTop:10, fontSize:13, color:"rgba(255,255,255,0.42)", lineHeight:1.7 }}>
            Let's turn your vision into a stunning, high-performance digital product.
          </p>
          <div style={{ display:"flex", gap:8, marginTop:18, flexWrap:"wrap" }}>
            {socials.map(s => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="social-btn-cc">
                <span style={{ color:s.color, display:"flex" }}>{s.icon}</span>
                {s.label}
              </a>
            ))}
          </div>
          <button className="btn-primary" onClick={() => { setOpen(true); setSent(false); }} style={{ marginTop:50, width:"100%", display:"flex", alignItems:"center", justifyContent:"center", gap:8 }}>
            <Send /> Contact Me
          </button>
        </div>
      </CardWrapper>

      {/* ── CONTACT MODAL ── */}
      {open && (
        <div className="ct-backdrop" onClick={e => { if(e.target===e.currentTarget) setOpen(false); }}>
          <div className="ct-modal">

            {/* Close */}
            <button onClick={() => setOpen(false)} style={{ position:"absolute", top:16, right:16, width:34, height:34, borderRadius:10, background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.1)", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", color:"rgba(255,255,255,0.5)", zIndex:10 }}><X /></button>

            {/* Top accent */}
            <div style={{ height:3, background:"linear-gradient(90deg,#7c4dff,#00d4ff,#f472b6)" }}/>

            {sent ? (
              /* ── SUCCESS STATE ── */
              <div className="ct-success-wrap" style={{ position:"relative", overflow:"hidden" }}>
                {/* confetti dots */}
                {[["#7c4dff","20%"],["#00d4ff","40%"],["#f472b6","60%"],["#4ade80","80%"],["#fbbf24","50%"]].map(([col,l],i)=>(
                  <div key={i} className="ct-confetti-dot" style={{ background:col, left:l, bottom:"30%", animationDelay:`${i*0.1}s` }}/>
                ))}
                <div className="ct-check-circle"><Check /></div>
                <div>
                  <h3 style={{ fontFamily:"var(--font-display)", fontSize:24, fontWeight:800, margin:"0 0 8px", letterSpacing:"-0.02em" }}>Message Sent! 🎉</h3>
                  <p style={{ fontSize:14, color:"rgba(255,255,255,0.45)", lineHeight:1.7, margin:0 }}>
                    Thanks for reaching out, <strong style={{ color:"#a78bfa" }}>{form.name.split(" ")[0]}</strong>!<br/>
                    I'll get back to you at <strong style={{ color:"#60a5fa" }}>{form.email}</strong> within 24 hours.
                  </p>
                </div>
                <button className="ct-submit" style={{ maxWidth:200 }} onClick={() => setOpen(false)}>Close</button>
              </div>
            ) : (
              /* ── FORM ── */
              <div style={{ padding:"28px 28px 32px" }}>
                {/* Header */}
                <div style={{ marginBottom:24 }}>
                  <h3 style={{ fontFamily:"var(--font-display)", fontSize:22, fontWeight:800, letterSpacing:"-0.02em", margin:"0 0 6px" }}>
                    Let's work together
                  </h3>
                  <p style={{ fontSize:13, color:"rgba(255,255,255,0.4)", margin:0 }}>
                    Fill in the details below and I'll get back within 24 hours.
                  </p>
                </div>

                <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
                  {/* Name */}
                  <div>
                    <div className="ct-field-wrap">
                      <span className="ct-field-icon"><User /></span>
                      <input className={`ct-field${errors.name?" error":""}`} placeholder="Your Name" value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} />
                    </div>
                    {errors.name && <p className="ct-error-msg">{errors.name}</p>}
                  </div>

                  {/* Email */}
                  <div>
                    <div className="ct-field-wrap">
                      <span className="ct-field-icon"><Mail2 /></span>
                      <input className={`ct-field${errors.email?" error":""}`} placeholder="Your Email" type="email" value={form.email} onChange={e=>setForm(f=>({...f,email:e.target.value}))} />
                    </div>
                    {errors.email && <p className="ct-error-msg">{errors.email}</p>}
                  </div>

                  {/* Service */}
                  <div className="ct-field-wrap">
                    <span className="ct-field-icon" style={{ top:"50%", transform:"translateY(-50%)" }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
                    </span>
                    <select className="ct-field ct-select" value={form.service} onChange={e=>setForm(f=>({...f,service:e.target.value}))}>
                      {services.map(s=><option key={s} value={s} style={{ background:"#0a0f1e" }}>{s}</option>)}
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <div className="ct-field-wrap ct-textarea-wrap">
                      <span className="ct-field-icon"><Msg /></span>
                      <textarea className={`ct-field ct-textarea${errors.message?" error":""}`} placeholder="Tell me about your project..." value={form.message} onChange={e=>setForm(f=>({...f,message:e.target.value}))} />
                    </div>
                    {errors.message && <p className="ct-error-msg">{errors.message}</p>}
                  </div>

                  {/* Submit */}
                  <button className="ct-submit" onClick={handleSubmit} disabled={loading}>
                    {loading ? (
                      <><span style={{ width:16,height:16,borderRadius:"50%",border:"2px solid rgba(255,255,255,0.3)",borderTopColor:"#fff",animation:"spin 0.8s linear infinite",display:"inline-block" }}/>Sending...</>
                    ) : (
                      <><Send /> Send Message</>
                    )}
                  </button>
                </div>

                {/* Social row */}
                <div style={{ marginTop:20, paddingTop:20, borderTop:"1px solid rgba(255,255,255,0.06)", display:"flex", alignItems:"center", gap:10, flexWrap:"wrap" }}>
                  <span style={{ fontSize:12, color:"rgba(255,255,255,0.3)" }}>Or connect:</span>
                  {socials.map(s=>(
                    <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" style={{ display:"flex", alignItems:"center", gap:6, padding:"5px 12px", borderRadius:8, border:"1px solid rgba(255,255,255,0.07)", background:"rgba(255,255,255,0.03)", fontSize:12, color:s.color, textDecoration:"none", transition:"all 0.2s" }}>
                      {s.icon}{s.label}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

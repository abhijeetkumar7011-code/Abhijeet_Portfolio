"use client";

import { useState, useEffect } from "react";

const links = [
  { label: "Home",       href: "#home" },
  { label: "About",      href: "#about" },
  { label: "Skills",     href: "#skills" },
  { label: "Projects",   href: "#projects" },
  { label: "Services",   href: "#services" },
  { label: "Contact",    href: "#contact" },
];

/* ── Hire Me Modal ── */
function HireMeModal({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({ name: "", email: "", budget: "", message: "" });
  const [status, setStatus] = useState<"idle"|"sending"|"success"|"error">("idle");

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) return;
    setStatus("sending");
    try {
      const res = await fetch("https://formsubmit.co/ajax/abhijeetkumar7011@gmail.com", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: `Hire Me Request from ${form.name}`,
          name: form.name,
          email: form.email,
          budget: form.budget || "Not specified",
          message: form.message,
          _captcha: "false",
        }),
      });
      if (res.ok) setStatus("success");
      else setStatus("error");
    } catch { setStatus("error"); }
  };

  return (
    <div style={{ position:"fixed", inset:0, zIndex:1000, display:"flex", alignItems:"center", justifyContent:"center", padding:"16px" }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <style>{`
        @keyframes modalIn { from { opacity:0; transform:scale(0.94) translateY(12px); } to { opacity:1; transform:scale(1) translateY(0); } }
        @keyframes successPop { 0%{transform:scale(0.8);opacity:0} 60%{transform:scale(1.1)} 100%{transform:scale(1);opacity:1} }
        .hire-backdrop { position:fixed; inset:0; background:rgba(3,5,15,0.85); backdrop-filter:blur(12px); }
        .hire-modal {
          position:relative; z-index:1; width:100%; max-width:500px;
          background:linear-gradient(145deg,#080d1e,#0a0f22);
          border:1px solid rgba(124,77,255,0.25); border-radius:24px;
          padding:36px; box-shadow:0 40px 100px rgba(0,0,0,0.6),0 0 60px rgba(124,77,255,0.1);
          animation:modalIn 0.35s cubic-bezier(0.34,1.56,0.64,1) forwards;
        }
        .hire-field {
          width:100%; background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.08);
          border-radius:12px; padding:12px 16px; color:#f0f0ff;
          font-family:var(--font-body); font-size:14px; outline:none; transition:all 0.25s;
          resize:none;
        }
        .hire-field::placeholder { color:rgba(255,255,255,0.2); }
        .hire-field:focus { border-color:rgba(124,77,255,0.5); background:rgba(124,77,255,0.06); box-shadow:0 0 0 3px rgba(124,77,255,0.08); }
        .hire-label { font-size:11px; font-weight:700; letter-spacing:0.1em; text-transform:uppercase; color:rgba(255,255,255,0.35); margin-bottom:7px; display:block; }
        .field-row { display:grid; grid-template-columns:1fr 1fr; gap:14px; }
        @media(max-width:480px) { .field-row { grid-template-columns:1fr; } }
      `}</style>

      <div className="hire-backdrop" onClick={onClose} />

      <div className="hire-modal">
        {/* Close */}
        <button onClick={onClose} style={{ position:"absolute", top:16, right:16, width:32, height:32, borderRadius:8, background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.1)", color:"rgba(255,255,255,0.5)", cursor:"pointer", fontSize:16, display:"flex", alignItems:"center", justifyContent:"center" }}>✕</button>

        {status === "success" ? (
          <div style={{ textAlign:"center", padding:"20px 0", animation:"successPop 0.5s ease forwards" }}>
            <div style={{ fontSize:56, marginBottom:16 }}>🎉</div>
            <h3 style={{ fontFamily:"var(--font-display)", fontSize:24, fontWeight:800, margin:"0 0 10px", background:"linear-gradient(135deg,#a78bfa,#60a5fa)", WebkitBackgroundClip:"text", backgroundClip:"text", WebkitTextFillColor:"transparent" }}>
              Message Sent!
            </h3>
            <p style={{ color:"rgba(255,255,255,0.45)", fontSize:14, lineHeight:1.7, margin:"0 0 24px" }}>
              Thanks for reaching out! I'll get back to you within <strong style={{ color:"#a78bfa" }}>24 hours</strong> ✨
            </p>
            <button className="btn-primary" onClick={onClose} style={{ padding:"10px 28px", fontSize:13 }}>
              Awesome, Close →
            </button>
          </div>
        ) : (
          <>
            {/* Header */}
            <div style={{ marginBottom:28 }}>
              <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:10 }}>
                <div style={{ width:36, height:36, borderRadius:10, background:"rgba(124,77,255,0.15)", border:"1px solid rgba(124,77,255,0.25)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:18 }}>💼</div>
                <p className="section-label" style={{ margin:0 }}>Let's Work Together</p>
              </div>
              <h2 style={{ fontFamily:"var(--font-display)", fontSize:26, fontWeight:800, margin:"0 0 6px", letterSpacing:"-0.02em" }}>
                Hire{" "}
                <span style={{ background:"linear-gradient(135deg,#a78bfa,#60a5fa)", WebkitBackgroundClip:"text", backgroundClip:"text", WebkitTextFillColor:"transparent" }}>Abhijeet</span>
              </h2>
              <p style={{ color:"rgba(255,255,255,0.35)", fontSize:13, margin:0, lineHeight:1.6 }}>
                Fill in the details and I'll get back to you within 24 hours.
              </p>
            </div>

            {/* Form */}
            <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
              <div className="field-row">
                <div>
                  <label className="hire-label">Your Name *</label>
                  <input className="hire-field" placeholder="John Doe" value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
                </div>
                <div>
                  <label className="hire-label">Email *</label>
                  <input className="hire-field" type="email" placeholder="you@email.com" value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
                </div>
              </div>

              <div>
                <label className="hire-label">Budget Range</label>
                <select className="hire-field" value={form.budget}
                  onChange={e => setForm(f => ({ ...f, budget: e.target.value }))}
                  style={{ appearance:"none", cursor:"pointer" }}>
                  <option value="" style={{ background:"#080d1e" }}>Select a range…</option>
                  <option value="< $500" style={{ background:"#080d1e" }}>Under $500</option>
                  <option value="$500–$1000" style={{ background:"#080d1e" }}>$500 – $1,000</option>
                  <option value="$1000–$3000" style={{ background:"#080d1e" }}>$1,000 – $3,000</option>
                  <option value="$3000+" style={{ background:"#080d1e" }}>$3,000+</option>
                  <option value="Open to discuss" style={{ background:"#080d1e" }}>Open to discuss</option>
                </select>
              </div>

              <div>
                <label className="hire-label">Project Details *</label>
                <textarea className="hire-field" rows={4} placeholder="Tell me about your project, timeline, and goals…"
                  value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} />
              </div>

              {status === "error" && (
                <p style={{ fontSize:12, color:"#f87171", background:"rgba(248,113,113,0.08)", border:"1px solid rgba(248,113,113,0.2)", padding:"10px 14px", borderRadius:10, margin:0 }}>
                  Something went wrong. Please email me directly at abhijeetkumar7011@gmail.com
                </p>
              )}

              <button className="btn-primary" onClick={handleSubmit} disabled={status === "sending"}
                style={{ width:"100%", display:"flex", alignItems:"center", justifyContent:"center", gap:8, fontSize:14, padding:"13px 28px", opacity: status==="sending" ? 0.7 : 1 }}>
                {status === "sending" ? (
                  <><span style={{ width:14, height:14, border:"2px solid rgba(255,255,255,0.3)", borderTopColor:"#fff", borderRadius:"50%", display:"inline-block", animation:"spin 0.7s linear infinite" }} /> Sending…</>
                ) : (
                  <>Send Message 🚀</>
                )}
              </button>
            </div>
          </>
        )}
      </div>

      <style>{`@keyframes spin { to { transform:rotate(360deg); } }`}</style>
    </div>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled]       = useState(false);
  const [active, setActive]           = useState("Home");
  const [menuOpen, setMenuOpen]       = useState(false);
  const [hireMeOpen, setHireMeOpen]   = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30);
      const sectionIds = ["home","about","skills","projects","services","contact"];
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && window.scrollY >= el.offsetTop - 120) { setActive(links[i].label); break; }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, item: typeof links[0]) => {
    e.preventDefault(); setActive(item.label); setMenuOpen(false);
    const el = document.getElementById(item.href.slice(1));
    if (el) el.scrollIntoView({ behavior:"smooth", block:"start" });
    else window.scrollTo({ top:0, behavior:"smooth" });
  };

  return (
    <>
      <style>{`
        .nav-link-item {
          position:relative; font-size:12px; font-weight:600; letter-spacing:0.1em;
          text-transform:uppercase; text-decoration:none; padding:6px 2px;
          color:rgba(255,255,255,0.42); transition:color 0.25s;
        }
        .nav-link-item::after { content:''; position:absolute; bottom:0; left:0; height:1px; width:0; background:linear-gradient(90deg,#7c4dff,#00d4ff); transition:width 0.3s ease; }
        .nav-link-item:hover { color:rgba(255,255,255,0.85); }
        .nav-link-item:hover::after { width:100%; }
        .nav-link-item.active { color:#c4b5fd; }
        .nav-link-item.active::after { width:100%; }

        .nav-desktop { display:none; align-items:center; gap:34px; }
        @media(min-width:1024px) { .nav-desktop { display:flex; } }

        .hire-btn {
          font-size:13px; padding:10px 22px; border-radius:10px; cursor:pointer; font-weight:700;
          background:linear-gradient(135deg,#7c4dff,#00d4ff);
          border:none; color:#fff; letter-spacing:0.03em;
          transition:all 0.25s; position:relative; overflow:hidden;
          box-shadow:0 0 20px rgba(124,77,255,0.3);
        }
        .hire-btn:hover { transform:translateY(-1px); box-shadow:0 6px 30px rgba(124,77,255,0.45); }
        .hire-btn:active { transform:translateY(0); }

        .mobile-menu {
          position:fixed; top:70px; left:0; right:0;
          background:rgba(3,5,15,0.92); backdrop-filter:blur(24px);
          border-bottom:1px solid rgba(124,77,255,0.15);
          padding:20px 24px 28px; display:flex; flex-direction:column; gap:4px;
          z-index:49; transform:translateY(-8px); opacity:0;
          transition:opacity 0.25s,transform 0.25s; pointer-events:none;
        }
        .mobile-menu.open { transform:translateY(0); opacity:1; pointer-events:all; }
        .mobile-link {
          display:block; padding:13px 16px; border-radius:12px; font-size:13px;
          font-weight:600; letter-spacing:0.08em; text-transform:uppercase;
          text-decoration:none; color:rgba(255,255,255,0.5); transition:all 0.2s;
        }
        .mobile-link:hover,.mobile-link.active { background:rgba(124,77,255,0.1); color:#c4b5fd; border-left:2px solid #7c4dff; padding-left:14px; }
        .burger { display:flex; flex-direction:column; gap:5px; cursor:pointer; padding:4px; }
        .burger span { display:block; width:22px; height:2px; background:rgba(255,255,255,0.6); border-radius:2px; transition:all 0.3s; transform-origin:center; }
        .burger.open span:nth-child(1) { transform:translateY(7px) rotate(45deg); }
        .burger.open span:nth-child(2) { opacity:0; transform:scaleX(0); }
        .burger.open span:nth-child(3) { transform:translateY(-7px) rotate(-45deg); }
        @media(min-width:1024px) { .burger { display:none; } }
      `}</style>

      {hireMeOpen && <HireMeModal onClose={() => setHireMeOpen(false)} />}

      <header style={{
        position:"sticky", top:0, zIndex:50,
        backdropFilter:"blur(28px)", WebkitBackdropFilter:"blur(28px)",
        background: scrolled ? "rgba(3,5,15,0.75)" : "rgba(3,5,15,0.2)",
        borderBottom: scrolled ? "1px solid rgba(124,77,255,0.12)" : "1px solid rgba(255,255,255,0.02)",
        transition:"all 0.35s ease",
      }}>
        <div style={{ maxWidth:"1280px", margin:"0 auto", padding:"0 24px", height:"70px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <a href="#home" onClick={e => handleClick(e, links[0])} style={{ textDecoration:"none", fontFamily:"var(--font-display)", fontWeight:800, fontSize:"19px", letterSpacing:"-0.01em", display:"flex", alignItems:"center", gap:"1px" }}>
            <span style={{ background:"linear-gradient(135deg,#7c4dff,#00d4ff)", WebkitBackgroundClip:"text", backgroundClip:"text", WebkitTextFillColor:"transparent" }}>ABHI</span>
            <span style={{ color:"rgba(255,255,255,0.3)", fontWeight:300 }}>.DEV</span>
          </a>

          <nav className="nav-desktop">
            {links.map(item => (
              <a key={item.label} href={item.href} onClick={e => handleClick(e, item)}
                className={`nav-link-item${active === item.label ? " active" : ""}`}>
                {item.label}
              </a>
            ))}
          </nav>

          <div style={{ display:"flex", alignItems:"center", gap:"14px" }}>
            <button className="hire-btn" onClick={() => setHireMeOpen(true)}>
              Hire Me ✦
            </button>
            <div className={`burger${menuOpen ? " open" : ""}`} onClick={() => setMenuOpen(o => !o)}>
              <span /><span /><span />
            </div>
          </div>
        </div>
      </header>

      <div className={`mobile-menu${menuOpen ? " open" : ""}`}>
        {links.map(item => (
          <a key={item.label} href={item.href} onClick={e => handleClick(e, item)}
            className={`mobile-link${active === item.label ? " active" : ""}`}>
            {item.label}
          </a>
        ))}
        <button className="hire-btn" style={{ marginTop:8 }} onClick={() => { setMenuOpen(false); setHireMeOpen(true); }}>
          Hire Me ✦
        </button>
      </div>
    </>
  );
}

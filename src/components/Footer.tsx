"use client";

const Github = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/></svg>;
const Linkedin = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>;
const Twitter = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.259 5.631 5.905-5.631zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>;

const navLinks = [
  { label: "Home",     href: "#home",     icon: "🏠" },
  { label: "About",    href: "#about",    icon: "👤" },
  { label: "Skills",   href: "#skills",   icon: "✨" },
  { label: "Projects", href: "#projects", icon: "⬛" },
  { label: "Services", href: "#services", icon: "💼" },
  { label: "Contact",  href: "#contact",  icon: "💬" },
];

const services = [
  { label: "Web development",  color: "#378add" },
  { label: "Backend APIs",     color: "#7c4dff" },
  { label: "UI engineering",   color: "#1D9E75" },
  { label: "Cloud deploy",     color: "#BA7517" },
  { label: "SaaS products",    color: "#D4537E" },
  { label: "CRM systems",      color: "#888780" },
];

const socials = [
  { icon: <Github />,   label: "GitHub",   href: "#" },
  { icon: <Linkedin />, label: "LinkedIn", href: "#" },
  { icon: <Twitter />,  label: "Twitter",  href: "#" },
];

function scrollTo(href: string) {
  const id = href.slice(1);
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
  else window.scrollTo({ top: 0, behavior: "smooth" });
}

export default function Footer() {
  return (
    <>
      <style>{`
        .f3d-btn {
          box-shadow: 3px 3px 0 #3C3489;
          transition: box-shadow 0.13s, transform 0.13s;
        }
        .f3d-btn:hover { box-shadow: 1px 1px 0 #3C3489; transform: translate(2px,2px); }
        .f3d-btn:active { box-shadow: 0px 0px 0 #3C3489; transform: translate(3px,3px); }

        .footer-cta {
          background: rgba(124,77,255,0.07);
          border: 1px solid rgba(124,77,255,0.2);
          border-left: 4px solid #7c4dff;
          border-radius: 18px;
          padding: 28px 32px;
          display: flex; align-items: center;
          justify-content: space-between; flex-wrap: wrap; gap: 20px;
          margin-top: 60px; margin-bottom: 20px;
        }
        .cta-avail-badge {
          display: inline-flex; align-items: center; gap: 6px;
          background: rgba(124,77,255,0.12);
          border: 1px solid rgba(124,77,255,0.25);
          border-radius: 999px; padding: 4px 14px;
          font-size: 12px; font-weight: 600; color: #c4b5fd;
          margin-bottom: 10px; width: fit-content;
        }
        .cta-avail-dot { width:6px; height:6px; border-radius:50%; background:#4ade80; box-shadow:0 0 6px #4ade80; }
        .cta-h { font-family: var(--font-display); font-size: clamp(20px,2.5vw,28px); font-weight: 800; margin: 0 0 6px; letter-spacing: -0.02em; }
        .cta-h span { color: #a78bfa; }
        .cta-sub { font-size: 13px; color: rgba(255,255,255,0.4); margin: 0; }
        .cta-start-btn {
          background: #7c4dff; color: #fff; border: none;
          border-radius: 12px; padding: 13px 26px;
          font-size: 14px; font-weight: 700; cursor: pointer;
          font-family: var(--font-body); display: flex; align-items: center; gap: 8px;
          white-space: nowrap;
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 1.5fr 1fr 1fr 1fr;
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 20px; overflow: hidden;
          background: rgba(8,13,30,0.9);
        }
        @media(max-width:900px) { .footer-grid { grid-template-columns: 1fr 1fr; } }
        @media(max-width:540px) { .footer-grid { grid-template-columns: 1fr; } }

        .footer-col-f {
          padding: 28px 24px;
          border-right: 1px solid rgba(255,255,255,0.05);
        }
        .footer-col-f:last-child { border-right: none; }
        @media(max-width:900px) {
          .footer-col-f { border-bottom: 1px solid rgba(255,255,255,0.05); }
          .footer-col-f:nth-child(even) { border-right: none; }
          .footer-col-f:nth-child(odd) { border-right: 1px solid rgba(255,255,255,0.05); }
        }

        .f-col-title {
          font-size: 10px; font-weight: 700; letter-spacing: 0.14em;
          text-transform: uppercase; color: rgba(255,255,255,0.3);
          margin: 0 0 18px; display: flex; align-items: center; gap: 6px;
        }

        .logo-block { display: inline-flex; align-items: center; margin-bottom: 14px; }
        .logo-purple {
          background: #7c4dff; color: #fff;
          padding: 4px 10px; border-radius: 8px 0 0 8px;
          font-family: var(--font-display); font-size: 18px; font-weight: 800; letter-spacing: -0.02em;
          box-shadow: 3px 3px 0 #3C3489;
        }
        .logo-ghost {
          background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1);
          padding: 4px 10px; border-radius: 0 8px 8px 0;
          font-family: var(--font-display); font-size: 18px; font-weight: 300;
          color: rgba(255,255,255,0.35); margin-left: 1px;
          box-shadow: 3px 3px 0 rgba(0,0,0,0.35);
        }
        .brand-bio-f { font-size: 13px; color: rgba(255,255,255,0.38); line-height: 1.7; margin: 0 0 18px; max-width: 200px; }

        .info-row-f {
          display: flex; align-items: center; gap: 9px;
          font-size: 12px; color: rgba(255,255,255,0.38); margin-bottom: 9px;
        }
        .info-icon-box {
          width: 26px; height: 26px; border-radius: 7px;
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.05);
          display: flex; align-items: center; justify-content: center; flex-shrink: 0;
          box-shadow: 2px 2px 0 rgba(0,0,0,0.3);
        }
        .info-icon-box svg { width: 13px; height: 13px; }

        .social-row-f { display: flex; gap: 8px; margin-top: 18px; }
        .social-f {
          width: 36px; height: 36px; border-radius: 10px;
          border: 1px solid rgba(255,255,255,0.1);
          background: rgba(255,255,255,0.05);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; color: rgba(255,255,255,0.5);
          text-decoration: none; transition: all 0.18s;
          box-shadow: 2px 2px 0 rgba(0,0,0,0.35);
        }
        .social-f:hover { box-shadow: 1px 1px 0 rgba(0,0,0,0.35); transform: translate(1px,1px); color: #fff; }

        .nav-f {
          display: flex; align-items: center; gap: 9px;
          font-size: 13px; color: rgba(255,255,255,0.42);
          background: none; border: none; padding: 5px 0; cursor: pointer;
          font-family: var(--font-body); width: 100%; text-align: left;
          transition: color 0.2s;
        }
        .nav-f:hover { color: #c4b5fd; }
        .nav-f:hover .nav-arrow-f { opacity: 1; transform: translateX(0); }
        .nav-icon-box {
          width: 24px; height: 24px; border-radius: 7px; flex-shrink: 0;
          border: 1px solid rgba(255,255,255,0.07);
          background: rgba(255,255,255,0.04);
          display: flex; align-items: center; justify-content: center; font-size: 13px;
          box-shadow: 2px 2px 0 rgba(0,0,0,0.2);
        }
        .nav-arrow-f {
          margin-left: auto; font-size: 13px; opacity: 0;
          transform: translateX(-5px); transition: all 0.18s; color: #7c4dff;
        }

        .svc-chip {
          display: inline-flex; align-items: center; gap: 6px;
          font-size: 11px; padding: 5px 10px; border-radius: 7px;
          border: 1px solid rgba(255,255,255,0.07);
          background: rgba(255,255,255,0.04);
          color: rgba(255,255,255,0.5);
          margin: 0 5px 6px 0;
          box-shadow: 2px 2px 0 rgba(0,0,0,0.25);
          transition: all 0.15s;
        }
        .svc-chip:hover { box-shadow: 1px 1px 0 rgba(0,0,0,0.25); transform: translate(1px,1px); }
        .svc-dot { width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0; }

        .stat-card-f {
          border-radius: 10px;
          border: 1px solid rgba(255,255,255,0.06);
          background: rgba(255,255,255,0.03);
          padding: 10px 13px; margin-bottom: 8px;
          box-shadow: 2px 2px 0 rgba(0,0,0,0.3);
        }
        .stat-lbl { font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(255,255,255,0.28); margin: 0 0 4px; }
        .stat-val { font-size: 13px; font-weight: 600; color: rgba(255,255,255,0.75); display: flex; align-items: center; gap: 6px; }
        .pulse-dot-f {
          width: 7px; height: 7px; border-radius: 50%;
          background: #4ade80; flex-shrink: 0;
          animation: fpulse 2s ease-in-out infinite;
        }
        @keyframes fpulse {
          0%,100% { box-shadow: 0 0 0 0 rgba(74,222,128,0.4); }
          50%      { box-shadow: 0 0 0 5px rgba(74,222,128,0); }
        }

        .footer-bottom-bar {
          display: flex; align-items: center; justify-content: space-between;
          padding: 18px 0 6px; flex-wrap: wrap; gap: 14px;
        }
        .footer-copy { font-size: 12px; color: rgba(255,255,255,0.22); display: flex; align-items: center; gap: 5px; }
        .footer-made { font-size: 12px; color: rgba(255,255,255,0.22); display: flex; align-items: center; gap: 5px; }
        .scroll-top-f {
          width: 36px; height: 36px; border-radius: 10px;
          border: 1px solid rgba(255,255,255,0.1);
          background: rgba(255,255,255,0.04);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; color: rgba(255,255,255,0.4);
          box-shadow: 2px 2px 0 rgba(0,0,0,0.3);
          transition: all 0.15s;
        }
        .scroll-top-f:hover { color: #a78bfa; box-shadow: 1px 1px 0 rgba(0,0,0,0.3); transform: translate(1px,1px); }
      `}</style>

      <footer>
        {/* CTA Strip */}
        <div className="footer-cta">
          <div>
            <div className="cta-avail-badge">
              <span className="cta-avail-dot" />
              Available for new projects
            </div>
            <h3 className="cta-h">Ready to build something <span>great?</span></h3>
            <p className="cta-sub">Let's turn your idea into a world-class digital product.</p>
          </div>
          <a href="#contact" onClick={e => { e.preventDefault(); scrollTo("#contact"); }} style={{ textDecoration: "none" }}>
            <button className="cta-start-btn f3d-btn">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
              Start a project
            </button>
          </a>
        </div>

        {/* Main Grid */}
        <div className="footer-grid">

          {/* Brand */}
          <div className="footer-col-f">
            <div className="logo-block">
              <span className="logo-purple">ABHI</span>
              <span className="logo-ghost">.DEV</span>
            </div>
            <p className="brand-bio-f">Full stack developer crafting elegant, high-performance digital products.</p>
            <div className="info-row-f">
              <span className="info-icon-box">
                <svg viewBox="0 0 24 24" fill="none" stroke="#f87171" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              </span>
              Delhi, India · IST
            </div>
            <div className="info-row-f">
              <span className="info-icon-box">
                <svg viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              </span>
              abhijeetkumar7011@gmail.com
            </div>
            <div className="info-row-f">
              <span className="info-icon-box">
                <svg viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              </span>
              Replies within 24 hrs
            </div>
            <div className="social-row-f">
              {socials.map(s => (
                <a key={s.label} href={s.href} className="social-f" title={s.label}>{s.icon}</a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="footer-col-f">
            <p className="f-col-title">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>
              Navigate
            </p>
            {navLinks.map(l => (
              <button key={l.label} className="nav-f" onClick={() => scrollTo(l.href)}>
                <span className="nav-icon-box">{l.icon}</span>
                {l.label}
                <span className="nav-arrow-f">›</span>
              </button>
            ))}
          </div>

          {/* Services */}
          <div className="footer-col-f">
            <p className="f-col-title">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
              Services
            </p>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {services.map(s => (
                <span key={s.label} className="svc-chip">
                  <span className="svc-dot" style={{ background: s.color }} />
                  {s.label}
                </span>
              ))}
            </div>
          </div>

          {/* Status */}
          <div className="footer-col-f">
            <p className="f-col-title">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
              Status
            </p>
            <div className="stat-card-f">
              <p className="stat-lbl">Availability</p>
              <div className="stat-val"><span className="pulse-dot-f" /> Open to hire</div>
            </div>
            <div className="stat-card-f">
              <p className="stat-lbl">⚡ Response time</p>
              <div className="stat-val" style={{ color: "#fbbf24" }}>Within 24 hours</div>
            </div>
            <div className="stat-card-f">
              <p className="stat-lbl">🌐 Time zone</p>
              <div className="stat-val" style={{ color: "#60a5fa" }}>IST · UTC +5:30</div>
            </div>
            <div className="stat-card-f">
              <p className="stat-lbl">🛠 Current stack</p>
              <div className="stat-val" style={{ gap: 5, flexWrap: "wrap" }}>
                {([ ["React","rgba(97,218,251,0.12)","#61dafb"], ["Django","rgba(9,121,75,0.12)","#68d391"], ["Next.js","rgba(255,255,255,0.07)","rgba(255,255,255,0.6)"] ] as [string,string,string][]).map(([label, bg, color]) => (
                  <span key={label} style={{ fontSize: 10, padding: "2px 7px", borderRadius: 5, background: bg, color, border: `1px solid ${color}30`, fontWeight: 700 }}>{label}</span>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="footer-bottom-bar">
          <p className="footer-copy">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M14.83 14.83A4 4 0 1 1 9.17 9.17"/></svg>
            {new Date().getFullYear()} Abhijeet Verma. All rights reserved.
          </p>
          <p className="footer-made">
            Built with&nbsp;
            <svg width="12" height="12" viewBox="0 0 24 24" fill="#f472b6"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
            &nbsp;using Next.js &amp; Django
          </p>
          <button className="scroll-top-f" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} title="Back to top">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></svg>
          </button>
        </div>
      </footer>
    </>
  );
}
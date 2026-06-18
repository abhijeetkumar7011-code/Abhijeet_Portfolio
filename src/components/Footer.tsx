"use client";

import { useState } from "react";

/* ── REFINED CUSTOM NAV ICONS (MODERN & FANCY LINE ART) ── */
const HomeIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const AboutIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const ProjectsIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
  </svg>
);

const SkillsIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

const ServicesIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);

const ContactIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const CustomPaperAirplane = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 2L2 10.5L9.75 14.25L22 2Z" />
    <path d="M22 2L14.25 22L10.5 13.5L22 2Z" />
    <path d="M9.75 14.25V19.5L12.5 16.5" />
  </svg>
);

const MailIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="3" />
    <path d="M22 6l-10 7L2 6" />
  </svg>
);

const MapPinIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const LogoGraphic = () => (
  <svg width="34" height="34" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 82L46 16C47.5 13 52.5 13 54 16L80 82H62L50 56H38L26 82H20ZM47 44L41 44L44 32L47 44Z" fill="url(#neonPurpleBlue)" />
    <defs>
      <linearGradient id="neonPurpleBlue" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#7042f8" />
        <stop offset="100%" stopColor="#00cbff" />
      </linearGradient>
    </defs>
  </svg>
);

export default function Footer() {
  return (
    <>
      <style>{`
        .img-footer-container {
          background-color: #03020c;
          color: #ffffff;
          font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          padding: 80px 4% 30px 4%;
          position: relative;
          overflow: hidden;
          border-top: 1px solid rgba(255, 255, 255, 0.02);
        }

        /* ── DESKTOP FIRST APPOACH RESTORED ── */
        .footer-main-layout {
          display: grid;
          grid-template-columns: 1.4fr 1fr 1fr 1.2fr;
          gap: 40px;
          max-width: 1300px;
          margin: 0 auto;
          position: relative;
          z-index: 5;
        }

        @media (max-width: 1024px) {
          .footer-main-layout { 
            grid-template-columns: 1.2fr 1fr 1fr;
            gap: 32px; 
          }
          .footer-main-layout > div:last-child {
            grid-column: span 3;
            margin-top: 12px;
          }
        }

        /* ── PERFECT MOBILE RESPONSIVE WITHOUT BREAKING DESKTOP ── */
        @media (max-width: 640px) {
          .footer-main-layout {
            display: grid;
            grid-template-columns: 1fr 1fr !important; /* Forces 2 columns layout on mobile */
            gap: 36px 16px !important;
          }
          
          /* Full width adjustments for Intro and Get In Touch blocks on mobile */
          .mobile-full-width {
            grid-column: span 2 !important;
          }
        }

        .cta-heading {
          font-size: clamp(34px, 3.8vw, 50px);
          font-weight: 800;
          line-height: 1.1;
          margin: 12px 0 24px 0;
          letter-spacing: -0.02em;
        }

        .glow-purple {
          color: #7042f8;
          text-shadow: 0 0 35px rgba(112, 66, 248, 0.5);
        }

        .col-title {
          font-size: 13px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: #7042f8;
          margin-bottom: 24px;
          position: relative;
          display: inline-block;
        }
        .col-title::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: -6px;
          width: 24px;
          height: 2px;
          background-color: #7042f8;
        }

        .connect-btn {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          border: 1px solid rgba(112, 66, 248, 0.4);
          background: rgba(112, 66, 248, 0.04);
          color: #ffffff;
          padding: 14px 30px;
          border-radius: 99px;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.08em;
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 0 20px rgba(112, 66, 248, 0.08);
        }
        .connect-btn:hover {
          background: #7042f8;
          border-color: #7042f8;
          box-shadow: 0 0 30px rgba(112, 66, 248, 0.4);
          transform: translateY(-3px);
        }
        .connect-btn svg {
          transition: transform 0.25s ease;
        }
        .connect-btn:hover svg {
          transform: translate(2px, -2px);
        }

        .link-item {
          display: flex;
          align-items: center;
          gap: 12px;
          color: #94a3b8;
          text-decoration: none;
          font-size: 14px;
          padding: 8px 0;
          transition: all 0.25s ease;
        }
        .link-item:hover {
          color: #ffffff;
          transform: translateX(5px);
        }
        .link-item svg {
          color: #6366f1;
          opacity: 0.7;
          transition: all 0.25s ease;
        }
        .link-item:hover svg {
          color: #7042f8;
          opacity: 1;
          transform: scale(1.15);
        }

        .contact-row {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 20px;
          color: #94a3b8;
          font-size: 14px;
        }
        .icon-badge {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: rgba(112, 66, 248, 0.1);
          border: 1px solid rgba(112, 66, 248, 0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #a78bfa;
          flex-shrink: 0;
          transition: all 0.2s ease;
        }
        .contact-row:hover .icon-badge {
          background: rgba(112, 66, 248, 0.2);
          border-color: rgba(112, 66, 248, 0.4);
          color: #ffffff;
        }

        /* ── PLANE IMAGE BASELINE ── */
        .vector-canvas {
          position: absolute;
          right: 22%;
          bottom: 12%;
          width: 520px; 
          height: 320px; 
          pointer-events: none;
          opacity: 0.75; 
          z-index: 1;
        }
        @media (max-width: 768px) {
          .vector-canvas { 
            right: 8%; 
            bottom: 22%;
            opacity: 0.65;
          } 
        }

        .bottom-branding-bar {
          max-width: 1300px;
          margin: 60px auto 0 auto;
          border-top: 1px solid rgba(255, 255, 255, 0.04);
          padding: 32px 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 24px;
          position: relative;
          z-index: 5;
        }
        .brand-divider {
          height: 32px;
          width: 1px;
          background: rgba(255, 255, 255, 0.08);
        }
        @media (max-width: 840px) {
          .bottom-branding-bar { flex-direction: column; text-align: center; }
          .brand-divider { display: none; }
        }

        .social-circle-btn {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, 0.06);
          background: rgba(255, 255, 255, 0.01);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #94a3b8;
          transition: all 0.25s;
          text-decoration: none;
        }
        .social-circle-btn:hover {
          border-color: #7042f8;
          color: #ffffff;
          background: rgba(112, 66, 248, 0.1);
          transform: translateY(-3px);
        }
      `}</style>

      <footer className="img-footer-container">
        
        <div className="footer-main-layout">
          
          {/* Column 1: Intro / CTA */}
          <div className="mobile-full-width">
            <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.15em", color: "#6366f1" }}>
              LET'S BUILD SOMETHING
            </span>
            <h2 className="cta-heading">
              Amazing<br />
              <span className="glow-purple">Together</span>
            </h2>
            <div style={{ width: "40px", height: "3px", background: "linear-gradient(90deg, #7042f8, transparent)", marginBottom: "26px", borderRadius: 2 }} />
            <p style={{ fontSize: "14px", color: "#94a3b8", lineHeight: "1.65", maxWidth: "290px", marginBottom: "30px" }}>
              I'm always open to discussing product design work or partnership opportunities.
            </p>
            <button className="connect-btn">
              <CustomPaperAirplane />
              LET'S CONNECT
            </button>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h4 className="col-title">Navigation</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              {[
                { label: "Home", component: <HomeIcon /> },
                { label: "About", component: <AboutIcon /> },
                { label: "Projects", component: <ProjectsIcon /> },
                { label: "Skills", component: <SkillsIcon /> },
                { label: "Services", component: <ServicesIcon /> },
                { label: "Contact", component: <ContactIcon /> }
              ].map((link) => (
                <a key={link.label} href={`#${link.label.toLowerCase()}`} className="link-item">
                  {link.component}
                  <span>{link.label}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Column 3: Quick Links */}
          <div>
            <h4 className="col-title">Quick Links</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              {["GitHub", "LinkedIn", "Resume", "Blog", "Testimonials"].map((label) => (
                <a key={label} href="#" className="link-item">
                  <span style={{ color: "#7042f8", fontSize: "15px", fontWeight: "300", lineHeight: "1" }}>&rsaquo;</span>
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Column 4: Get In Touch */}
          <div className="mobile-full-width">
            <h4 className="col-title">Get In Touch</h4>
            <div style={{ display: "flex", flexDirection: "column" }}>
              
              <div className="contact-row">
                <div className="icon-badge"><MailIcon /></div>
                <span>abhijeetkumar7011@gmail.com</span>
              </div>

              <div className="contact-row">
                <div className="icon-badge"><ContactIcon /></div>
                <span>+91 70115 17511</span>
              </div>

              <div className="contact-row">
                <div className="icon-badge"><MapPinIcon /></div>
                <span>Meerut, Uttar Pradesh, India</span>
              </div>

            </div>
          </div>

        </div>

        {/* ── BACKGROUND VECTOR CANVAS ── */}
        <div className="vector-canvas">
          <svg width="100%" height="100%" viewBox="0 0 500 300" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 260 C 120 250, 180 150, 240 180 C 320 220, 290 120, 390 90" stroke="rgba(112, 66, 248, 0.35)" strokeWidth="1.8" strokeDasharray="6 6" fill="none" />
            
            <g transform="translate(375, 55) rotate(-12) scale(1.8)"> 
              <polygon points="0,22 45,0 32,32 12,27" fill="#03020c" stroke="#7042f8" strokeWidth="1.6" style={{ filter: 'drop-shadow(0px 0px 14px rgba(112,66,248,0.75))' }} />
              <line x1="0" y1="22" x2="45" y2="0" stroke="#7042f8" strokeWidth="1.2" />
              <line x1="12" y1="27" x2="45" y2="0" stroke="#7042f8" strokeWidth="1.2" />
              <polygon points="12,27 20,24 18,34" fill="rgba(112, 66, 248, 0.45)" stroke="#7042f8" strokeWidth="1.2" />
            </g>

            <circle cx="460" cy="40" r="2" fill="#fff" opacity="0.4" />
            <circle cx="220" cy="110" r="1.5" fill="#00cbff" opacity="0.3" />
            <circle cx="310" cy="220" r="2.5" fill="#7042f8" opacity="0.4" />
          </svg>
        </div>

        {/* Branding Footer Bar */}
        <div className="bottom-branding-bar">
          
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <LogoGraphic />
            <div style={{ textAlign: "left" }}>
              <h4 style={{ margin: 0, fontSize: "15px", fontWeight: 700, letterSpacing: "-0.01em" }}>Abhijeet Verma</h4>
              <p style={{ margin: 0, fontSize: "11px", color: "#6366f1", marginTop: "2px", fontWeight: 500 }}>Full Stack Developer</p>
            </div>
          </div>

          <div className="brand-divider" />

          <div style={{ display: "flex", gap: "12px" }}>
            {[
              { label: "github", path: "M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" },
              { label: "linkedin", path: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z M2 9h4v12H2z M4 4a2 2 0 1 0 0 4 2 2 0 1 0 0-4z" },
              { label: "twitter", path: "M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" },
              { label: "instagram", path: "M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z M17.5 6.5h.01" }
            ].map((soc) => (
              <a key={soc.label} href="#" className="social-circle-btn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  {soc.label === "instagram" ? <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/> : null}
                  <path d={soc.path} />
                </svg>
              </a>
            ))}
          </div>

          <div className="brand-divider" />

          <div style={{ display: "flex", gap: "10px", alignItems: "flex-start", maxWidth: "260px", textAlign: "left" }}>
            <span style={{ fontSize: "28px", color: "#6366f1", lineHeight: "1", fontFamily: "serif", fontWeight: "bold" }}>“</span>
            <p style={{ margin: 0, fontSize: "12px", color: "#94a3b8", lineHeight: "1.5", fontStyle: "normal" }}>
              Code is structure, design is intelligence made visible.
            </p>
          </div>

        </div>

        <div style={{ textAlign: "center", fontSize: "12px", color: "#475569", marginTop: "24px", borderTop: "1px solid rgba(255, 255, 255, 0.02)", paddingTop: "20px" }}>
          <span>© 2026 Abhijeet Verma. All rights reserved. </span>
          <span style={{ marginLeft: "6px" }}>
            Built with <span style={{ color: "#7042f8" }}>♥</span> passion using Next.js &amp; Django
          </span>
        </div>

      </footer>
    </>
  );
}
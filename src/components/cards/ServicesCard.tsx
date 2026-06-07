"use client";
import CardWrapper from "../CardWrapper";

const Globe   = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>;
const Server  = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></svg>;
const Palette = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>;
const Cloud   = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></svg>;

const services = [
  { icon:<Globe />,   title:"Web Development",   desc:"Full-stack apps with Next.js & React", color:"rgba(124,77,255,0.15)", border:"rgba(124,77,255,0.28)", iconColor:"#a78bfa" },
  { icon:<Server />,  title:"Backend APIs",       desc:"Scalable REST & GraphQL services",    color:"rgba(0,212,255,0.1)",   border:"rgba(0,212,255,0.22)",  iconColor:"#67e8f9" },
  { icon:<Palette />, title:"UI Engineering",     desc:"Pixel-perfect, animated interfaces",  color:"rgba(255,60,172,0.1)", border:"rgba(255,60,172,0.22)", iconColor:"#f9a8d4" },
  { icon:<Cloud />,   title:"Cloud Deployment",   desc:"AWS, Vercel, Docker pipelines",       color:"rgba(251,191,36,0.08)",border:"rgba(251,191,36,0.2)",  iconColor:"#fcd34d" },
];

export default function ServicesCard() {
  return (
    <CardWrapper>
      <p className="section-label">Services</p>
      <h3 style={{ fontFamily:"var(--font-display)", fontSize:20, fontWeight:700, marginTop:10, marginBottom:18, letterSpacing:"-0.01em" }}>What I Do</h3>
      <div style={{ display:"flex", flexDirection:"column", gap:9 }}>
        {services.map(s => (
          <div key={s.title} className="service-row">
            <div className="service-icon" style={{ background:s.color, border:`1px solid ${s.border}`, color:s.iconColor }}>
              {s.icon}
            </div>
            <div>
              <p style={{ fontWeight:600, fontSize:14, margin:0 }}>{s.title}</p>
              <p style={{ fontSize:12, color:"var(--muted)", marginTop:2 }}>{s.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </CardWrapper>
  );
}

"use client";
import CardWrapper from "../CardWrapper";

const Quote = () => <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" opacity="0.15"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.598-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.598-3.996 5.849h3.983v10h-9.983z"/></svg>;

const Star = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="#fbbf24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>;

const testimonials = [
  { quote:"Abhijeet delivered exceptional work on our SaaS CRM. Clean code, great communication, and ahead of schedule.", author:"Sarah K.", role:"Founder, HealthTech Co.", avatar:"👩‍💼" },
  { quote:"One of the best developers I've worked with. He transformed our entire frontend in record time.", author:"Mark R.", role:"CTO, Startup", avatar:"👨‍💻" },
];

export default function TestimonialsCard() {
  return (
    <CardWrapper>
      <p className="section-label">Testimonials</p>
      <h3 style={{ fontFamily:"var(--font-display)", fontSize:20, fontWeight:700, marginTop:8, marginBottom:18, letterSpacing:"-0.01em" }}>What Clients Say</h3>
      <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
        {testimonials.map((t, i) => (
          <div key={i} style={{ padding:"16px", borderRadius:16, background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.06)", position:"relative" }}>
            <span style={{ position:"absolute", top:10, right:12, color:"#7c4dff" }}><Quote /></span>
            <p style={{ fontSize:13, lineHeight:1.75, color:"rgba(255,255,255,0.5)", fontStyle:"italic", margin:0 }}>{t.quote}</p>
            <div style={{ display:"flex", alignItems:"center", gap:10, marginTop:12 }}>
              <span style={{ fontSize:22 }}>{t.avatar}</span>
              <div style={{ flex:1 }}>
                <p style={{ fontWeight:600, fontSize:13, margin:0 }}>{t.author}</p>
                <p style={{ fontSize:11, color:"var(--muted)", margin:0 }}>{t.role}</p>
              </div>
              <div style={{ display:"flex", gap:2 }}>{Array(5).fill(0).map((_,i)=><Star key={i}/>)}</div>
            </div>
          </div>
        ))}
      </div>
    </CardWrapper>
  );
}

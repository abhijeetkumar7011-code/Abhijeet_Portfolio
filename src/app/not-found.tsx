"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

/* ─── Glitch 404 ─────────────────────────────────── */
function Glitch404() {
  const [g, setG] = useState(false);
  useEffect(() => {
    const id = setInterval(() => { setG(true); setTimeout(() => setG(false), 150); }, 3000);
    return () => clearInterval(id);
  }, []);
  const base: React.CSSProperties = {
    fontFamily: "'Syne', sans-serif", fontSize: "clamp(72px,11vw,130px)",
    fontWeight: 800, letterSpacing: "-0.05em", lineHeight: 1, display: "block",
  };
  const ghost: React.CSSProperties = {
    ...base, position: "absolute", inset: 0, opacity: g ? 0.75 : 0, transition: "none", mixBlendMode: "screen", pointerEvents: "none",
  };
  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <span style={{ ...base, background: "linear-gradient(135deg,#a78bfa,#60a5fa,#f0abfc)", WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>404</span>
      <span style={{ ...ghost, color: "#ff3cac", clipPath: "inset(30% 0 50% 0)", transform: g ? "translate(-5px,2px)" : "none" }}>404</span>
      <span style={{ ...ghost, color: "#00d4ff", clipPath: "inset(55% 0 15% 0)", transform: g ? "translate(4px,-3px)" : "none" }}>404</span>
    </div>
  );
}

/* ─── Flat 3D SVG Icons ──────────────────────────── */
// Flat 3D style: top face + side face + front face
function Icon3DRocket() {
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
      {/* exhaust glow */}
      <ellipse cx="32" cy="58" rx="8" ry="4" fill="#ff6b35" opacity="0.3"/>
      {/* flame */}
      <ellipse cx="32" cy="54" rx="5" ry="6" fill="url(#flame)"/>
      <defs>
        <radialGradient id="flame" cx="50%" cy="30%">
          <stop offset="0%" stopColor="#fbbf24"/>
          <stop offset="100%" stopColor="#ef4444" stopOpacity="0"/>
        </radialGradient>
      </defs>
      {/* body shadow side */}
      <path d="M36 48 L40 28 L38 22 L36 20 L36 48Z" fill="#5b21b6" opacity="0.6"/>
      {/* body front */}
      <path d="M28 48 L36 48 L40 28 L38 22 L32 8 L26 22 L24 28Z" fill="url(#rbody)"/>
      <defs>
        <linearGradient id="rbody" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#c4b5fd"/>
          <stop offset="100%" stopColor="#7c4dff"/>
        </linearGradient>
      </defs>
      {/* nose */}
      <path d="M32 8 L38 22 L26 22Z" fill="#a78bfa"/>
      {/* window */}
      <circle cx="32" cy="30" r="5" fill="url(#win)"/>
      <circle cx="32" cy="30" r="3.5" fill="#0ea5e9" opacity="0.8"/>
      <defs>
        <radialGradient id="win">
          <stop offset="0%" stopColor="#bae6fd"/>
          <stop offset="100%" stopColor="#0369a1"/>
        </radialGradient>
      </defs>
      <circle cx="33.5" cy="28.5" r="1" fill="white" opacity="0.6"/>
      {/* left fin */}
      <path d="M24 28 L18 38 L24 40Z" fill="#6d28d9"/>
      {/* right fin */}
      <path d="M40 28 L46 38 L40 40Z" fill="#5b21b6"/>
    </svg>
  );
}

function Icon3DGlobe() {
  return (
    <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
      {/* shadow */}
      <ellipse cx="26" cy="48" rx="12" ry="3" fill="#7c4dff" opacity="0.2"/>
      {/* sphere base */}
      <circle cx="26" cy="24" r="20" fill="url(#gbase)"/>
      <defs>
        <radialGradient id="gbase" cx="35%" cy="30%">
          <stop offset="0%" stopColor="#60a5fa"/>
          <stop offset="100%" stopColor="#1e3a8a"/>
        </radialGradient>
      </defs>
      {/* land masses flat */}
      <ellipse cx="20" cy="20" rx="7" ry="5" fill="#34d399" opacity="0.85" transform="rotate(-20 20 20)"/>
      <ellipse cx="31" cy="27" rx="5" ry="4" fill="#34d399" opacity="0.75" transform="rotate(15 31 27)"/>
      <ellipse cx="22" cy="30" rx="3" ry="2" fill="#86efac" opacity="0.6"/>
      {/* latitude lines */}
      <ellipse cx="26" cy="24" rx="20" ry="7" stroke="white" strokeWidth="0.5" strokeOpacity="0.2" fill="none"/>
      <ellipse cx="26" cy="17" rx="14" ry="5" stroke="white" strokeWidth="0.5" strokeOpacity="0.15" fill="none"/>
      {/* longitude */}
      <ellipse cx="26" cy="24" rx="6" ry="20" stroke="white" strokeWidth="0.5" strokeOpacity="0.15" fill="none"/>
      {/* highlight */}
      <circle cx="20" cy="17" r="5" fill="white" opacity="0.1"/>
      <circle cx="18" cy="15" r="2" fill="white" opacity="0.15"/>
      {/* ring */}
      <ellipse cx="26" cy="24" rx="22" ry="6" stroke="#a78bfa" strokeWidth="1.5" fill="none" opacity="0.5" transform="rotate(-25 26 24)"/>
    </svg>
  );
}

function Icon3DSatellite() {
  return (
    <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
      {/* shadow */}
      <ellipse cx="26" cy="49" rx="10" ry="3" fill="#7c4dff" opacity="0.2"/>
      {/* body top face */}
      <path d="M20 18 L32 18 L36 24 L24 24Z" fill="#a78bfa"/>
      {/* body front face */}
      <path d="M20 18 L24 24 L24 32 L20 26Z" fill="#6d28d9"/>
      {/* body right face */}
      <path d="M32 18 L36 24 L36 32 L32 26Z" fill="#5b21b6"/>
      {/* body bottom */}
      <path d="M24 32 L36 32 L36 26 L24 26Z" fill="#7c4dff"/>
      {/* solar panel left top */}
      <rect x="4" y="17" width="13" height="8" rx="1" fill="url(#sol1)" transform="rotate(-8 4 17)"/>
      {/* solar panel right top */}
      <rect x="35" y="17" width="13" height="8" rx="1" fill="url(#sol2)" transform="rotate(8 35 17)"/>
      <defs>
        <linearGradient id="sol1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fbbf24"/>
          <stop offset="50%" stopColor="#f97316"/>
          <stop offset="100%" stopColor="#7c3aed"/>
        </linearGradient>
        <linearGradient id="sol2" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#7c3aed"/>
          <stop offset="50%" stopColor="#f97316"/>
          <stop offset="100%" stopColor="#fbbf24"/>
        </linearGradient>
      </defs>
      {/* panel grid lines */}
      <line x1="9" y1="16" x2="10" y2="26" stroke="#fbbf24" strokeWidth="0.5" opacity="0.5"/>
      <line x1="13" y1="15" x2="14" y2="25" stroke="#fbbf24" strokeWidth="0.5" opacity="0.5"/>
      <line x1="39" y1="16" x2="40" y2="26" stroke="#fbbf24" strokeWidth="0.5" opacity="0.5"/>
      <line x1="43" y1="15" x2="44" y2="25" stroke="#fbbf24" strokeWidth="0.5" opacity="0.5"/>
      {/* antenna */}
      <line x1="28" y1="18" x2="28" y2="10" stroke="#c4b5fd" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="28" cy="9" r="2.5" fill="#00d4ff" stroke="#7c4dff" strokeWidth="1"/>
      {/* dish */}
      <path d="M22 34 Q26 38 30 34" stroke="#a78bfa" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <line x1="26" y1="32" x2="26" y2="37" stroke="#a78bfa" strokeWidth="1.5"/>
      {/* signal waves */}
      <circle cx="28" cy="9" r="5" stroke="#00d4ff" strokeWidth="0.5" fill="none" opacity="0.5"/>
      <circle cx="28" cy="9" r="8" stroke="#00d4ff" strokeWidth="0.5" fill="none" opacity="0.3"/>
    </svg>
  );
}

function Icon3DBlackHole() {
  return (
    <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
      {/* outer accretion disk back */}
      <ellipse cx="26" cy="26" rx="22" ry="7" fill="url(#disk_back)" transform="rotate(-15 26 26)"/>
      <defs>
        <radialGradient id="disk_back" cx="50%" cy="50%">
          <stop offset="0%" stopColor="#7c4dff" stopOpacity="0"/>
          <stop offset="60%" stopColor="#f97316" stopOpacity="0.6"/>
          <stop offset="100%" stopColor="#fbbf24" stopOpacity="0.2"/>
        </radialGradient>
      </defs>
      {/* event horizon */}
      <circle cx="26" cy="26" r="12" fill="url(#bh)"/>
      <defs>
        <radialGradient id="bh" cx="40%" cy="35%">
          <stop offset="0%" stopColor="#1a0030"/>
          <stop offset="100%" stopColor="#000"/>
        </radialGradient>
      </defs>
      {/* photon sphere ring */}
      <circle cx="26" cy="26" r="13.5" stroke="#a78bfa" strokeWidth="1" fill="none" opacity="0.5"/>
      {/* accretion disk front */}
      <ellipse cx="26" cy="30" rx="20" ry="5" fill="url(#disk_f)" transform="rotate(-15 26 30)"/>
      <defs>
        <radialGradient id="disk_f" cx="50%" cy="50%">
          <stop offset="0%" stopColor="#7c4dff" stopOpacity="0"/>
          <stop offset="50%" stopColor="#ff6b35" stopOpacity="0.9"/>
          <stop offset="100%" stopColor="#fbbf24" stopOpacity="0.4"/>
        </radialGradient>
      </defs>
      {/* highlight lens flare */}
      <circle cx="20" cy="20" r="2" fill="white" opacity="0.08"/>
    </svg>
  );
}

/* ─── Star Field Canvas ──────────────────────────── */
function Stars() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current!; const ctx = c.getContext("2d")!;
    c.width = window.innerWidth; c.height = window.innerHeight;
    const stars = Array.from({ length: 100 }, () => ({
      x: Math.random() * c.width, y: Math.random() * c.height,
      r: Math.random() * 1.1 + 0.2, phase: Math.random() * Math.PI * 2,
    }));
    let t = 0, raf: number;
    const draw = () => {
      t += 0.02; ctx.clearRect(0, 0, c.width, c.height);
      stars.forEach(s => {
        ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200,185,255,${0.15 + 0.4 * Math.abs(Math.sin(t + s.phase))})`;
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, []);
  return <canvas ref={ref} style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}/>;
}

/* ─── Scanline ───────────────────────────────────── */
const Scanline = () => (
  <div style={{ position:"fixed", inset:0, zIndex:1, pointerEvents:"none",
    background:"repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,0,0,0.04) 3px,rgba(0,0,0,0.04) 4px)" }} />
);

/* ─── Icons ──────────────────────────────────────── */
const HomeIco = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;
const ArrowIco = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>;

/* ─── Main ───────────────────────────────────────── */
export default function NotFound() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Mono:wght@400;500&family=DM+Sans:wght@400;500&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        html,body{height:100%;overflow:hidden}
        body{background:#03050f;color:#f0f0ff;font-family:'DM Sans',sans-serif}

        @keyframes nf-float{0%,100%{transform:translateY(0px) rotate(-1deg)}50%{transform:translateY(-10px) rotate(1deg)}}
        @keyframes nf-orbit{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}
        @keyframes nf-pulse{0%,100%{opacity:.4}50%{opacity:1}}
        @keyframes nf-flicker{0%,95%,100%{opacity:1}96%,99%{opacity:.5}}

        .nf-btn-primary{
          display:inline-flex;align-items:center;gap:9px;
          padding:11px 24px;border-radius:12px;
          background:linear-gradient(135deg,#7c4dff,#5b21b6);
          border:1px solid rgba(124,77,255,.5);
          color:#fff;font-family:'Syne',sans-serif;font-size:13px;font-weight:700;
          cursor:pointer;text-decoration:none;transition:all .3s;
          letter-spacing:.02em;position:relative;overflow:hidden;
        }
        .nf-btn-primary:hover{box-shadow:0 0 28px rgba(124,77,255,.55),0 6px 20px rgba(0,0,0,.4);transform:translateY(-2px)}
        .nf-btn-ghost{
          display:inline-flex;align-items:center;gap:9px;
          padding:11px 24px;border-radius:12px;
          background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.1);
          color:rgba(255,255,255,.65);font-family:'Syne',sans-serif;font-size:13px;font-weight:600;
          cursor:pointer;text-decoration:none;transition:all .3s;backdrop-filter:blur(12px);
        }
        .nf-btn-ghost:hover{border-color:rgba(124,77,255,.4);background:rgba(124,77,255,.08);color:#c4b5fd;transform:translateY(-2px)}

        .nf-card{
          background:rgba(8,13,30,.85);border:1px solid rgba(124,77,255,.15);
          border-radius:16px;backdrop-filter:blur(16px);
          transition:border-color .3s,transform .3s;
        }
        .nf-card:hover{border-color:rgba(124,77,255,.3);transform:translateY(-2px)}
      `}</style>

      <Stars/>
      <Scanline/>

      {/* ambient glows */}
      <div style={{position:"fixed",inset:0,background:"radial-gradient(ellipse 60% 50% at 50% 50%,rgba(124,77,255,.09) 0%,transparent 70%)",pointerEvents:"none",zIndex:0}}/>
      <div style={{position:"fixed",top:-80,left:-80,width:340,height:340,borderRadius:"50%",background:"rgba(124,77,255,.06)",filter:"blur(70px)",pointerEvents:"none",zIndex:0}}/>
      <div style={{position:"fixed",bottom:-60,right:-60,width:300,height:300,borderRadius:"50%",background:"rgba(0,212,255,.05)",filter:"blur(70px)",pointerEvents:"none",zIndex:0}}/>

      <main style={{
        position:"relative",zIndex:10,
        height:"100vh",width:"100vw",
        display:"grid",
        gridTemplateColumns:"1fr 1fr",
        alignItems:"center",
        padding:"0 5vw",
        gap:"40px",
        overflow:"hidden",
      }}>
        {/* mobile fallback */}
        <style>{`@media(max-width:768px){.nf-grid{grid-template-columns:1fr!important}.nf-right{display:none!important}}`}</style>

        {/* ── LEFT COLUMN ── */}
        <div className="nf-grid" style={{display:"contents"}}>
        <motion.div
          initial={{opacity:0,x:-30}} animate={{opacity:1,x:0}} transition={{duration:.7}}
          style={{display:"flex",flexDirection:"column",gap:"20px"}}
        >
          {/* Status pill */}
          <div style={{display:"flex",alignItems:"center",gap:8,width:"fit-content",padding:"5px 14px",borderRadius:8,background:"rgba(248,113,113,.08)",border:"1px solid rgba(248,113,113,.2)",fontFamily:"'DM Mono',monospace",fontSize:11,color:"#fca5a5",animation:"nf-flicker 6s infinite"}}>
            <span style={{width:6,height:6,borderRadius:"50%",background:"#f87171",boxShadow:"0 0 8px #f87171",animation:"nf-pulse 1.5s ease-in-out infinite"}}/>
            HTTP 404 — Route Not Found
          </div>

          {/* 404 glitch */}
          <Glitch404/>

          {/* Headline */}
          <div>
            <h2 style={{fontFamily:"'Syne',sans-serif",fontSize:"clamp(22px,3vw,34px)",fontWeight:800,letterSpacing:"-0.03em",lineHeight:1.15,background:"linear-gradient(135deg,#f0f0ff 40%,#a78bfa 80%)",WebkitBackgroundClip:"text",backgroundClip:"text",WebkitTextFillColor:"transparent"}}>
              Lost in the Void
            </h2>
            <p style={{fontSize:14,lineHeight:1.75,color:"rgba(255,255,255,.4)",marginTop:8,maxWidth:380}}>
              The page you're looking for drifted off into deep space. It may have moved, been deleted, or never existed in this dimension.
            </p>
          </div>

          {/* Code snippet */}
          <div style={{padding:"14px 18px",borderRadius:12,background:"rgba(8,13,30,.9)",border:"1px solid rgba(124,77,255,.15)",fontFamily:"'DM Mono',monospace",fontSize:11,lineHeight:1.8,color:"rgba(255,255,255,.3)"}}>
            <span style={{color:"#a78bfa"}}>const</span> page = <span style={{color:"#a78bfa"}}>await</span> router.resolve(<span style={{color:"#86efac"}}>req.url</span>);<br/>
            <span style={{color:"#f87171"}}>✗ PageNotFoundError</span> <span style={{color:"rgba(255,255,255,.2)"}}>→ status 404</span>
          </div>

          {/* Buttons */}
          <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
            <Link href="/" className="nf-btn-primary"><HomeIco/> Back to Home</Link>
            <Link href="/#projects" className="nf-btn-ghost"><ArrowIco/> View Projects</Link>
          </div>

          {/* Telemetry row */}
          <div style={{display:"flex",gap:20,flexWrap:"wrap",paddingTop:4}}>
            {[
              {label:"ERROR",val:"404",color:"#f87171"},
              {label:"STATUS",val:"LOST",color:"#fbbf24"},
              {label:"SIGNAL",val:"NONE",color:"#a78bfa"},
            ].map(item=>(
              <div key={item.label}>
                <p style={{fontFamily:"'DM Mono',monospace",fontSize:9,letterSpacing:".14em",textTransform:"uppercase",color:"rgba(255,255,255,.2)",marginBottom:3}}>{item.label}</p>
                <p style={{fontFamily:"'DM Mono',monospace",fontSize:12,fontWeight:500,color:item.color,textShadow:`0 0 10px ${item.color}60`}}>{item.val}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── RIGHT COLUMN ── */}
        <motion.div
          className="nf-right"
          initial={{opacity:0,x:30}} animate={{opacity:1,x:0}} transition={{duration:.7,delay:.15}}
          style={{display:"flex",flexDirection:"column",gap:"16px",alignItems:"stretch"}}
        >
          {/* Astronaut image — main focal point */}
          <motion.div
            animate={{y:[-8,8,-8]}} transition={{duration:6,repeat:Infinity,ease:"easeInOut"}}
            style={{position:"relative",borderRadius:24,overflow:"hidden",border:"1px solid rgba(124,77,255,.2)",aspectRatio:"16/9"}}
          >
            <img
              src="https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=640&q=80&auto=format&fit=crop"
              alt="Space"
              style={{width:"100%",height:"100%",objectFit:"cover",display:"block"}}
            />
            {/* gradient overlay */}
            <div style={{position:"absolute",inset:0,background:"linear-gradient(135deg,rgba(124,77,255,.35) 0%,rgba(0,212,255,.15) 100%)"}}/>
            <div style={{position:"absolute",inset:0,background:"linear-gradient(to top,rgba(3,5,15,.8) 0%,transparent 50%)"}}/>
            {/* floating badge on image */}
            <div style={{position:"absolute",bottom:14,left:14,padding:"8px 14px",borderRadius:10,background:"rgba(3,5,15,.8)",backdropFilter:"blur(16px)",border:"1px solid rgba(124,77,255,.25)"}}>
              <p style={{fontFamily:"'DM Mono',monospace",fontSize:10,color:"#a78bfa",margin:"0 0 2px",letterSpacing:".06em",textTransform:"uppercase"}}>Location</p>
              <p style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:12,margin:0}}>Deep Space · Sector 404</p>
            </div>
            {/* top-right signal badge */}
            <div style={{position:"absolute",top:14,right:14,display:"flex",alignItems:"center",gap:6,padding:"6px 12px",borderRadius:8,background:"rgba(3,5,15,.75)",backdropFilter:"blur(12px)",border:"1px solid rgba(248,113,113,.25)"}}>
              <span style={{width:5,height:5,borderRadius:"50%",background:"#f87171",boxShadow:"0 0 6px #f87171",animation:"nf-pulse 1.2s ease-in-out infinite"}}/>
              <span style={{fontFamily:"'DM Mono',monospace",fontSize:10,color:"#fca5a5"}}>NO SIGNAL</span>
            </div>
          </motion.div>

          {/* Bottom row: 3 icon cards */}
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12}}>

            {/* Rocket card */}
            <motion.div className="nf-card" style={{padding:"16px 12px",textAlign:"center"}}
              animate={{y:[-4,4,-4]}} transition={{duration:5,repeat:Infinity,ease:"easeInOut",delay:0}}>
              <div style={{display:"flex",justifyContent:"center",marginBottom:8}}><Icon3DRocket/></div>
              <p style={{fontFamily:"'DM Mono',monospace",fontSize:9,color:"rgba(255,255,255,.3)",letterSpacing:".08em",textTransform:"uppercase"}}>Launched</p>
              <p style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:13,color:"#a78bfa",marginTop:2}}>Into orbit</p>
            </motion.div>

            {/* Globe card */}
            <motion.div className="nf-card" style={{padding:"16px 12px",textAlign:"center"}}
              animate={{y:[4,-4,4]}} transition={{duration:5.5,repeat:Infinity,ease:"easeInOut",delay:.8}}>
              <div style={{display:"flex",justifyContent:"center",marginBottom:8}}><Icon3DGlobe/></div>
              <p style={{fontFamily:"'DM Mono',monospace",fontSize:9,color:"rgba(255,255,255,.3)",letterSpacing:".08em",textTransform:"uppercase"}}>Last seen</p>
              <p style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:13,color:"#60a5fa",marginTop:2}}>Unknown</p>
            </motion.div>

            {/* Satellite card */}
            <motion.div className="nf-card" style={{padding:"16px 12px",textAlign:"center"}}
              animate={{y:[-4,4,-4]}} transition={{duration:6,repeat:Infinity,ease:"easeInOut",delay:1.4}}>
              <div style={{display:"flex",justifyContent:"center",marginBottom:8}}><Icon3DSatellite/></div>
              <p style={{fontFamily:"'DM Mono',monospace",fontSize:9,color:"rgba(255,255,255,.3)",letterSpacing:".08em",textTransform:"uppercase"}}>Signal</p>
              <p style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:13,color:"#f87171",marginTop:2}}>Lost</p>
            </motion.div>

          </div>

          {/* Black hole card with image */}
          <div className="nf-card" style={{padding:"14px 16px",display:"flex",alignItems:"center",gap:14}}>
            <div style={{position:"relative",width:72,height:72,borderRadius:14,overflow:"hidden",flexShrink:0,border:"1px solid rgba(124,77,255,.2)"}}>
              <img
                src="https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=200&q=80&auto=format&fit=crop"
                alt="Galaxy"
                style={{width:"100%",height:"100%",objectFit:"cover"}}
              />
              <div style={{position:"absolute",inset:0,background:"rgba(124,77,255,.4)",mixBlendMode:"multiply"}}/>
            </div>
            <div style={{flex:1}}>
              <p style={{fontFamily:"'DM Mono',monospace",fontSize:9,color:"rgba(255,255,255,.25)",letterSpacing:".1em",textTransform:"uppercase",marginBottom:4}}>System status</p>
              <p style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:14,marginBottom:4}}>Page Singularity</p>
              <p style={{fontSize:11,color:"rgba(255,255,255,.35)",lineHeight:1.5}}>This route collapsed into a black hole. Navigate back to safety.</p>
            </div>
            <div style={{flexShrink:0}}><Icon3DBlackHole/></div>
          </div>

        </motion.div>
        </div>

      </main>
    </>
  );
}
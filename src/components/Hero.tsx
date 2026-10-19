"use client";

import { useEffect, useRef, useState } from "react";
import CountUp from "react-countup";

/* ───────────────────────── Data ───────────────────────── */
const ROLES = ["Full Stack Developer", "React & Next.js Developer", "Backend Developer", "UI Craftsman", "Tech Enthusiast", "Django Developer"];

const STATS = [
  { value: 2, suffix: "+", label: "Years Exp.", color: "#a78bfa" },
  { value: 7, suffix: "+", label: "Projects", color: "#60a5fa" },
  { value: 5, suffix: "+", label: "Clients", color: "#34d399" },
  { value: 100, suffix: "%", label: "Dedication", color: "#f472b6" },
];

const MARQUEE = ["Next.js", "Django", "React", "Python", "PostgreSQL", "Supabase", "TypeScript", "REST APIs", "Docker", "AWS", "Redis", "Tailwind"];

const NAME_A = "ABHIJEET".split("");
const NAME_B = "VERMA".split("");

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);

/* ───────────────────────── Typewriter ───────────────────────── */
function Typewriter() {
  const [txt, setTxt] = useState("");
  useEffect(() => {
    let wi = 0,
      ci = 0,
      del = false;
    let to: ReturnType<typeof setTimeout>;
    const tick = () => {
      const w = ROLES[wi];
      if (!del) {
        ci++;
        setTxt(w.slice(0, ci));
        if (ci === w.length) {
          del = true;
          to = setTimeout(tick, 2000);
          return;
        }
        to = setTimeout(tick, 65);
      } else {
        ci--;
        setTxt(w.slice(0, ci));
        if (ci === 0) {
          del = false;
          wi = (wi + 1) % ROLES.length;
          to = setTimeout(tick, 280);
          return;
        }
        to = setTimeout(tick, 30);
      }
    };
    to = setTimeout(tick, 900);
    return () => clearTimeout(to);
  }, []);
  return (
    <span className="hx-role">
      {txt}
      <i className="hx-caret" />
    </span>
  );
}

/* ───────────────────────── Hero ───────────────────────── */
export default function Hero() {
  const secRef = useRef<HTMLElement>(null);
  const cvRef = useRef<HTMLCanvasElement>(null);
  const spotRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);
  const discRef = useRef<HTMLDivElement>(null);
  const letterOuter = useRef<(HTMLSpanElement | null)[]>([]);
  const letterInner = useRef<(HTMLSpanElement | null)[]>([]);
  const [hasCutout, setHasCutout] = useState(true);

  /* the background-removed portrait is optional */
  useEffect(() => {
    const im = new window.Image();
    im.onerror = () => setHasCutout(false);
    im.src = "/profile-cutout.png";
  }, []);

  useEffect(() => {
    const sec = secRef.current!;
    const cv = cvRef.current!;
    const ctx = cv.getContext("2d")!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const floats = Array.from(sec.querySelectorAll<HTMLElement>("[data-d]"));

    let W = 0,
      H = 0;
    let mx = 0,
      my = 0,
      tx = 0,
      ty = 0;
    let cX = -9999,
      cY = -9999; // client-space cursor
    let pX = -9999,
      pY = -9999; // section-space cursor
    let usedMouse = false;
    let lastMove = 0;
    let visible = true;
    let raf = 0;
    let last = performance.now();

    const parts = Array.from({ length: 90 }, (_, i) => ({
      x: Math.abs(Math.sin(i * 12.9898) * 43758.5453) % 1,
      y: Math.abs(Math.sin(i * 78.233 + 1.7) * 12543.231) % 1,
      vx: ((i % 7) - 3) * 0.00004 + 0.00002,
      vy: ((i % 5) - 2) * 0.00004,
      r: 0.5 + (i % 4) * 0.4,
    }));

    const resize = () => {
      const r = sec.getBoundingClientRect();
      W = Math.round(r.width);
      H = Math.round(r.height);
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      cv.width = Math.round(W * dpr);
      cv.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const r = sec.getBoundingClientRect();
      cX = e.clientX;
      cY = e.clientY;
      pX = e.clientX - r.left;
      pY = e.clientY - r.top;
      tx = (pX / Math.max(1, W) - 0.5) * 2;
      ty = (pY / Math.max(1, H) - 0.5) * 2;
      usedMouse = true;
      lastMove = performance.now();
    };

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (!visible) return;

      const t = now / 1000;
      if (reduce) {
        tx = 0;
        ty = 0;
      } else if (!usedMouse || now - lastMove > 3000) {
        // idle sway so the hero is alive on touch devices too
        usedMouse = false;
        tx = Math.sin(t * 0.5) * 0.35;
        ty = Math.cos(t * 0.4) * 0.25;
      }
      mx += (tx - mx) * 0.06;
      my += (ty - my) * 0.06;

      const secRect = sec.getBoundingClientRect();
      const scrollY = Math.max(0, Math.min(H, -secRect.top));

      /* ── particles ── */
      ctx.clearRect(0, 0, W, H);
      const hasMouse = usedMouse && pX > -1000;
      const pts: { x: number; y: number }[] = [];
      for (const p of parts) {
        p.x += p.vx * dt * 60;
        p.y += p.vy * dt * 60;
        if (p.x < 0) p.x = 1;
        if (p.x > 1) p.x = 0;
        if (p.y < 0) p.y = 1;
        if (p.y > 1) p.y = 0;
        let x = p.x * W;
        let y = p.y * H;
        if (hasMouse) {
          const dx = x - pX,
            dy = y - pY;
          const d = Math.hypot(dx, dy);
          if (d < 150 && d > 0.1) {
            const push = (150 - d) * 0.035;
            p.x += ((dx / d) * push) / W;
            p.y += ((dy / d) * push) / H;
            x = p.x * W;
            y = p.y * H;
          }
          if (d < 190) {
            ctx.strokeStyle = `rgba(0,212,255,${0.35 * (1 - d / 190)})`;
            ctx.lineWidth = 0.7;
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(pX, pY);
            ctx.stroke();
          }
        }
        pts.push({ x, y });
        ctx.fillStyle = "rgba(190,170,255,0.7)";
        ctx.beginPath();
        ctx.arc(x, y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.lineWidth = 0.6;
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const d = Math.hypot(pts[i].x - pts[j].x, pts[i].y - pts[j].y);
          if (d < 95) {
            ctx.strokeStyle = `rgba(124,77,255,${0.22 * (1 - d / 95)})`;
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.stroke();
          }
        }
      }

      /* ── giant name: read first, then write ── */
      const outers = letterOuter.current;
      const prox: number[] = [];
      for (let i = 0; i < outers.length; i++) {
        const el = outers[i];
        if (!el) {
          prox.push(0);
          continue;
        }
        if (!hasMouse) {
          prox.push(0);
          continue;
        }
        const r = el.getBoundingClientRect();
        const d = Math.hypot(cX - (r.left + r.width / 2), cY - (r.top + r.height / 2));
        prox.push(clamp01(1 - d / 300));
      }
      for (let i = 0; i < outers.length; i++) {
        const inner = letterInner.current[i];
        if (!inner) continue;
        const depth = (i < NAME_A.length ? 16 : -12) + (i % 3) * 5;
        const p = prox[i] ?? 0;
        inner.style.transform = `translate3d(${(mx * depth).toFixed(1)}px, ${(my * depth * 0.5).toFixed(1)}px, 0) scale(${(1 + p * 0.1).toFixed(3)})`;
        inner.style.setProperty("--p", p.toFixed(2));
      }

      /* ── portrait, disc, floats, spotlight, scroll parallax ── */
      if (tiltRef.current) {
        tiltRef.current.style.transform = `perspective(1300px) rotateY(${(mx * 8).toFixed(2)}deg) rotateX(${(-my * 4).toFixed(2)}deg) translate3d(${(mx * 12).toFixed(1)}px, ${(my * 6).toFixed(1)}px, 0)`;
      }
      if (discRef.current) discRef.current.style.transform = `translate3d(${(mx * -22).toFixed(1)}px, ${(my * -12).toFixed(1)}px, 0)`;
      for (const f of floats) {
        const d = parseFloat(f.dataset.d || "10");
        f.style.transform = `translate3d(${(mx * d).toFixed(1)}px, ${(my * d * 0.7).toFixed(1)}px, 0)`;
      }
      if (spotRef.current) {
        const sx = hasMouse ? pX : W * (0.5 + mx * 0.22);
        const sy = hasMouse ? pY : H * (0.45 + my * 0.2);
        spotRef.current.style.transform = `translate3d(${(sx - 360).toFixed(0)}px, ${(sy - 360).toFixed(0)}px, 0)`;
      }
      if (nameRef.current) nameRef.current.style.transform = `translate3d(0, ${(scrollY * 0.3).toFixed(1)}px, 0)`;
      if (layerRef.current) layerRef.current.style.transform = `translate3d(0, ${(scrollY * 0.1).toFixed(1)}px, 0)`;
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(sec);
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
    });
    io.observe(sec);
    window.addEventListener("pointermove", onMove);
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  const letters = (chars: string[], offset: number, row: "a" | "b") =>
    chars.map((c, i) => {
      const idx = offset + i;
      return (
        <span
          key={`${row}${i}`}
          ref={(el) => {
            letterOuter.current[idx] = el;
          }}
          className="hx-l"
          style={{ ["--i" as string]: idx, ["--k" as string]: i }}
          aria-hidden="true"
        >
          <span
            ref={(el) => {
              letterInner.current[idx] = el;
            }}
            className="hx-li"
          >
            {c}
          </span>
        </span>
      );
    });

  return (
    <>
      <style>{css}</style>

      <section ref={secRef} className="hx">
        {/* ── background layers ── */}
        <div className="hx-bg" aria-hidden="true">
          <div ref={spotRef} className="hx-spot" />
          <canvas ref={cvRef} className="hx-canvas" />
          <div className="hx-floor">
            <div className="hx-grid" />
          </div>
        </div>

        {/* ── giant kinetic name (behind the portrait) ── */}
        <div ref={nameRef} className="hx-name">
          <h1 className="hx-h1" aria-label="Abhijeet Verma">
            <span className="hx-line a">{letters(NAME_A, 0, "a")}</span>
            <span className="hx-line b">{letters(NAME_B, NAME_A.length, "b")}</span>
          </h1>
        </div>

        {/* ── portrait ── */}
        <div className="hx-person">
          <div ref={layerRef} className="hx-layer">
            <div ref={discRef} className="hx-disc" />
            <div ref={tiltRef} className={`hx-tilt ${hasCutout ? "cut" : "framed"}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={hasCutout ? "/profile-cutout.png" : "/profile.png"}
                alt="Abhijeet Verma"
                draggable={false}
                onError={() => setHasCutout(false)}
              />
            </div>
          </div>
        </div>

        {/* ── floating glass cards ── */}
        <div className="hx-par f1" data-d="26">
          <div className="hx-glass hx-code hx-bob">
            <span style={{ color: "#a78bfa" }}>const</span> dev = {"{"}
            <br />
            &nbsp;&nbsp;<span style={{ color: "#60a5fa" }}>name</span>: <span style={{ color: "#86efac" }}>&quot;Abhijeet&quot;</span>,
            <br />
            &nbsp;&nbsp;<span style={{ color: "#60a5fa" }}>stack</span>: <span style={{ color: "#fbbf24" }}>&quot;full&quot;</span>,
            <br />
            &nbsp;&nbsp;<span style={{ color: "#60a5fa" }}>rating</span>: <span style={{ color: "#fbbf24" }}>★★★★★</span>
            <br />
            {"}"}
          </div>
        </div>
        <div className="hx-par f2" data-d="-22">
          <div className="hx-glass hx-open hx-bob" style={{ animationDelay: "-2s" }}>
            <span className="hx-dot" /> Open to work
          </div>
        </div>

        {/* ── left: intro ── */}
        <div className="hx-left">
          <div className="hx-in" style={{ ["--d" as string]: "0.9s" }}>
            <div className="avail-badge" style={{ width: "fit-content" }}>
              <span className="glow-dot" />
              Available For Freelance
            </div>
          </div>
          <p className="hx-hello hx-in" style={{ ["--d" as string]: "1s" }}>
            Hello, I&apos;m a
          </p>
          <div className="hx-roleline hx-in" style={{ ["--d" as string]: "1.05s" }}>
            <span className="hx-br">&lt;</span>
            <Typewriter />
            <span className="hx-br">/&gt;</span>
          </div>
          <p className="hx-bio hx-in" style={{ ["--d" as string]: "1.15s" }}>
            Transforming ideas into elegant, high-performance digital products. Specialized in full-stack development with a strong eye for design and UX.
          </p>
          <div className="hx-cta hx-in" style={{ ["--d" as string]: "1.25s" }}>
            <a href="/projects" className="btn-primary hx-btn">
              View My Work <span>→</span>
            </a>
            <a href="/Abhijeet_Kumar_CV.pdf" download="Abhijeet_Kumar_CV.pdf" className="btn-outline hx-btn">
              ⬇ Download CV
            </a>
          </div>
          <a href="/about" className="hx-story hx-in" style={{ ["--d" as string]: "1.35s" }}>
            Read my story →
          </a>
        </div>

        {/* ── right: stats ── */}
        <div className="hx-right">
          <div className="hx-stats">
            {STATS.map((s, i) => (
              <div key={s.label} className="hx-stat hx-in" style={{ ["--d" as string]: `${1 + i * 0.1}s` }}>
                <div className="hx-stat-glow" style={{ background: `${s.color}22` }} />
                <div className="hx-stat-n" style={{ color: s.color, textShadow: `0 0 22px ${s.color}70` }}>
                  <CountUp end={s.value} duration={2.2} delay={1 + i * 0.1} />
                  {s.suffix}
                </div>
                <p>{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── tech marquee ── */}
        <div className="hx-marquee" aria-hidden="true">
          <div className="hx-track">
            {[0, 1].map((k) => (
              <div key={k} className="hx-set">
                {MARQUEE.map((m) => (
                  <span key={`${k}${m}`}>
                    {m}
                    <b>✦</b>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

      </section>
    </>
  );
}

/* ───────────────────────── Styles ───────────────────────── */
const css = `
.hx { position: relative; min-height: calc(100vh - 71px); min-height: calc(100svh - 71px); overflow: hidden; isolation: isolate; }
.hx-bg { position: absolute; inset: 0; z-index: 0; pointer-events: none; }
.hx-canvas { position: absolute; inset: 0; width: 100%; height: 100%; }
.hx-spot { position: absolute; left: 0; top: 0; width: 720px; height: 720px; border-radius: 50%; will-change: transform;
  background: radial-gradient(circle, rgba(124,77,255,.32) 0%, rgba(0,212,255,.10) 38%, transparent 66%); }
.hx-floor { position: absolute; left: -25%; right: -25%; bottom: 0; height: 46%; perspective: 520px; perspective-origin: 50% 0; overflow: hidden;
  -webkit-mask-image: linear-gradient(to top, #000 0%, transparent 92%); mask-image: linear-gradient(to top, #000 0%, transparent 92%); }
.hx-grid { position: absolute; inset: 0; transform-origin: 50% 100%; transform: rotateX(64deg); animation: hxGrid 2.6s linear infinite;
  background-image: linear-gradient(rgba(124,77,255,.6) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,.38) 1px, transparent 1px); background-size: 70px 70px; }
@keyframes hxGrid { to { background-position: 0 70px, 0 0; } }

/* name */
.hx-name { position: absolute; left: 0; right: 0; top: 5vh; z-index: 2; text-align: center; pointer-events: none; will-change: transform; }
.hx-h1 { margin: 0; font-family: var(--font-display); font-weight: 800; line-height: .82; letter-spacing: -.045em; text-transform: uppercase; }
.hx-line { display: block; white-space: nowrap; }
.hx-line.a { font-size: clamp(56px, 15.5vw, 280px); }
.hx-line.b { font-size: clamp(34px, 9.4vw, 176px); margin-top: .02em; }
.hx-l { display: inline-block; animation: hxRise 1s cubic-bezier(.2,.9,.2,1) both; animation-delay: calc(var(--i) * 70ms + 150ms); }
.hx-li { display: inline-block; will-change: transform; --p: 0; }
@keyframes hxRise { from { opacity: 0; transform: translateY(70px) rotateX(-75deg); filter: blur(12px); } to { opacity: 1; transform: none; filter: blur(0); } }
.hx-line.a .hx-li { background: linear-gradient(180deg, #fff 8%, hsl(calc(195 + var(--i) * 22) 95% 68%) 85%); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 0 calc(4px + var(--p) * 28px) hsla(calc(195 + var(--i) * 22), 95%, 65%, calc(.15 + var(--p) * .7))); }
.hx-line.b .hx-li { color: hsla(calc(195 + var(--i) * 22), 95%, 70%, calc(var(--p) * .45)); -webkit-text-stroke: 2px hsla(calc(195 + var(--i) * 22), 90%, 78%, .65);
  filter: drop-shadow(0 0 calc(2px + var(--p) * 22px) hsla(calc(195 + var(--i) * 22), 95%, 65%, calc(.1 + var(--p) * .6))); }

/* portrait */
.hx-person { position: absolute; left: 0; right: 0; bottom: 0; z-index: 3; display: flex; justify-content: center; pointer-events: none; height: min(calc((100vh - 71px) * .97), 960px); height: min(calc((100svh - 71px) * .97), 960px); animation: hxPerson 1.2s .35s cubic-bezier(.2,.9,.2,1) both; }
@keyframes hxPerson { from { opacity: 0; transform: translateY(50px) scale(.94); filter: blur(14px); } to { opacity: 1; transform: none; filter: blur(0); } }
.hx-layer { position: relative; height: 100%; will-change: transform; }
.hx-disc { position: absolute; left: 50%; bottom: 12%; width: min(62vh, 640px); aspect-ratio: 1; margin-left: calc(min(62vh, 640px) / -2); border-radius: 50%; will-change: transform;
  background: radial-gradient(circle, rgba(124,77,255,.55), rgba(0,212,255,.16) 52%, transparent 70%); border: 1px solid rgba(190,170,255,.2); }
.hx-tilt { position: relative; height: 100%; will-change: transform; }
.hx-tilt img { display: block; height: 100%; width: auto; max-width: none; }
.hx-tilt.cut img { filter: drop-shadow(0 30px 50px rgba(0,0,0,.6)) drop-shadow(0 0 40px rgba(124,77,255,.35));
  -webkit-mask-image: linear-gradient(to bottom, #000 86%, transparent 100%); mask-image: linear-gradient(to bottom, #000 86%, transparent 100%); }
.hx-tilt.framed { height: 70%; align-self: flex-end; margin-bottom: 70px; }
.hx-tilt.framed img { height: 100%; aspect-ratio: 3 / 4; object-fit: cover; border-radius: 32px; border: 1px solid rgba(255,255,255,.25); box-shadow: 0 30px 80px rgba(0,0,0,.6), 0 0 60px rgba(124,77,255,.4); }

/* floating cards */
.hx-par { position: absolute; z-index: 6; will-change: transform; }
.hx-par.f1 { left: calc(50% + 190px); top: 34vh; }
.hx-par.f2 { right: calc(50% + 210px); top: 41vh; }
.hx-glass { background: rgba(8,10,30,.62); border: 1px solid rgba(255,255,255,.16); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); border-radius: 16px; box-shadow: 0 18px 50px rgba(0,0,0,.5); }
.hx-code { padding: 12px 16px; font-family: ui-monospace, Menlo, monospace; font-size: 11.5px; line-height: 1.75; color: rgba(255,255,255,.5); white-space: nowrap; }
.hx-open { display: flex; align-items: center; gap: 8px; padding: 10px 16px; font-size: 12.5px; font-weight: 700; color: #67e8f9; white-space: nowrap; }
.hx-dot { width: 8px; height: 8px; border-radius: 50%; background: #00d4ff; box-shadow: 0 0 10px #00d4ff; animation: hxPulse 1.6s ease-in-out infinite; }
@keyframes hxPulse { 50% { transform: scale(1.6); opacity: .6; } }
.hx-bob { animation: hxBob 6s ease-in-out infinite; }
@keyframes hxBob { 50% { transform: translateY(-10px) rotate(.6deg); } }

/* left */
.hx-left { position: absolute; left: 4vw; bottom: 17vh; z-index: 7; width: min(30vw, 400px); display: flex; flex-direction: column; gap: 14px; }
.hx-hello { margin: 4px 0 -4px; font-family: var(--font-display); font-size: 12px; font-weight: 700; letter-spacing: .22em; text-transform: uppercase; color: rgba(255,255,255,.35); }
.hx-roleline { display: flex; align-items: center; gap: 8px; font-family: var(--font-display); font-weight: 700; font-size: clamp(17px, 1.7vw, 24px); min-height: 32px; }
.hx-br { color: rgba(255,255,255,.22); }
.hx-role { color: #c4b5fd; text-shadow: 0 0 24px rgba(124,77,255,.6); }
.hx-caret { display: inline-block; width: 2px; height: 1.1em; margin-left: 3px; vertical-align: middle; background: #7c4dff; animation: hxBlink 1s step-end infinite; }
@keyframes hxBlink { 50% { opacity: 0; } }
.hx-bio { margin: 0; font-size: 14px; line-height: 1.75; color: rgba(255,255,255,.55); }
.hx-cta { display: flex; flex-wrap: wrap; gap: 10px; }
.hx-btn { display: inline-flex; align-items: center; gap: 8px; font-size: 13px; text-decoration: none; padding: 12px 24px; }
.hx-story { width: fit-content; font-size: 13px; font-weight: 600; color: #a78bfa; text-decoration: none; transition: color .2s, transform .2s; }
.hx-story:hover { color: #67e8f9; transform: translateX(4px); }
.hx-in { animation: hxFade .9s cubic-bezier(.2,.8,.2,1) both; animation-delay: var(--d, 0s); }
@keyframes hxFade { from { opacity: 0; transform: translateY(22px); } to { opacity: 1; transform: none; } }

/* right */
.hx-right { position: absolute; right: 4vw; bottom: 17vh; z-index: 7; width: min(26vw, 340px); }
.hx-stats { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.hx-stat { position: relative; overflow: hidden; padding: 18px 18px 16px; border-radius: 18px; background: rgba(8,10,30,.62); border: 1px solid rgba(255,255,255,.12); backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px); transition: transform .3s, border-color .3s; }
.hx-stat:hover { transform: translateY(-4px); border-color: rgba(124,77,255,.5); }
.hx-stat-glow { position: absolute; right: -14px; bottom: -14px; width: 70px; height: 70px; border-radius: 50%; filter: blur(22px); pointer-events: none; }
.hx-stat-n { font-family: var(--font-display); font-weight: 800; font-size: 36px; line-height: 1; }
.hx-stat p { margin: 6px 0 0; font-size: 10px; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; color: var(--muted); }

/* marquee */
.hx-marquee { position: absolute; left: 0; right: 0; bottom: 0; z-index: 8; height: 48px; overflow: hidden; display: flex; align-items: center;
  background: rgba(8,10,30,.55); border-top: 1px solid rgba(255,255,255,.1); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
  -webkit-mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent); mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent); }
.hx-track { display: flex; width: max-content; animation: hxMarquee 34s linear infinite; }
.hx-set { display: flex; align-items: center; }
.hx-set span { display: inline-flex; align-items: center; gap: 26px; padding-right: 26px; font-family: var(--font-display); font-weight: 800; font-size: 14px; letter-spacing: .2em; text-transform: uppercase; color: transparent; -webkit-text-stroke: 1px rgba(255,255,255,.55); white-space: nowrap; }
.hx-set b { font-size: 12px; -webkit-text-stroke: 0; color: #7c4dff; }
@keyframes hxMarquee { to { transform: translateX(-50%); } }

.hx-scroll { position: absolute; left: 50%; bottom: 62px; transform: translateX(-50%); z-index: 9; }
.hx-mouse { display: block; width: 20px; height: 32px; border: 1.5px solid rgba(255,255,255,.45); border-radius: 12px; position: relative; }
.hx-mouse i { position: absolute; left: 50%; top: 6px; width: 3px; height: 6px; margin-left: -1.5px; border-radius: 2px; background: #67e8f9; animation: hxWheel 1.6s ease-in-out infinite; }
@keyframes hxWheel { 0% { transform: translateY(0); opacity: 1; } 100% { transform: translateY(11px); opacity: 0; } }

/* ── tablet / mobile: stacked ── */
@media (max-width: 1023px) {
  .hx { min-height: auto; display: flex; flex-direction: column; padding-top: 6px; }
  .hx-name { position: relative; top: auto; margin-top: 2vh; z-index: 2; }
  .hx-line.a { font-size: 17.2vw; }
  .hx-line.b { font-size: 10.6vw; }
  .hx-person { position: relative; inset: auto; height: 56svh; margin-top: -8vw; z-index: 3; }
  .hx-par { display: none; }
  .hx-left, .hx-right { position: static; width: auto; padding: 0 22px; z-index: 7; }
  .hx-left { align-items: center; text-align: center; margin-top: 6px; }
  .hx-roleline { justify-content: center; }
  .hx-cta { justify-content: center; }
  .hx-right { margin-top: 24px; }
  .hx-stats { max-width: 520px; margin: 0 auto; }
  .hx-marquee { position: relative; margin-top: 30px; }
  .hx-scroll { display: none; }
}
@media (prefers-reduced-motion: reduce) { .hx-grid, .hx-track, .hx-bob, .hx-l, .hx-person, .hx-in { animation: none; } }
`;

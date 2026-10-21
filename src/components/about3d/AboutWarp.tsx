"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { projects } from "@/data/projects";

/* ───────────────────────── Content ───────────────────────── */
const CHAPTERS = ["Hello", "Story", "Journey", "Stack", "Numbers", "Contact"];
const NC = CHAPTERS.length;
const HUES = [265, 192, 330, 38, 150, 275]; // nebula colour per chapter

const ROLES = ["Full Stack Developer", "Backend Engineer", "Next.js Builder", "API Architect"];

const HERO_CHIPS = ["Next.js", "Django", "React", "Python", "PostgreSQL", "Supabase", "TypeScript", "REST APIs"];

type Word = { w: string; hi?: boolean };
const STORY: Word[] = [
  { w: "I" },
  { w: "build" },
  { w: "modern", hi: true },
  { w: "web", hi: true },
  { w: "applications,", hi: true },
  { w: "scalable", hi: true },
  { w: "APIs", hi: true },
  { w: "and" },
  { w: "polished", hi: true },
  { w: "interfaces", hi: true },
  { w: "that" },
  { w: "make" },
  { w: "digital" },
  { w: "products" },
  { w: "feel" },
  { w: "premium", hi: true },
  { w: "and" },
  { w: "intuitive." },
];

const JOURNEY = [
  {
    period: "Oct 2024 — Present",
    title: "Backend Developer",
    company: "Crysta IVF",
    desc: "REST APIs, integrations and Postgres-backed systems powering a clinic platform.",
    tag: "Active",
    tech: ["Django", "REST APIs", "PostgreSQL"],
    color: "#4ade80",
  },
  {
    period: "May 2025 — Oct 2025",
    title: "Backend Developer",
    company: "TrafikSol ITS Solutions",
    desc: "Built Django services and REST APIs for intelligent traffic solutions.",
    tag: "6 mos",
    tech: ["Django", "REST APIs"],
    color: "#60a5fa",
  },
  {
    period: "Dec 2025 — Present",
    title: "Full Stack Developer",
    company: "Freelance",
    desc: "End-to-end products for clients: CRM systems, AI tools and modern web apps.",
    tag: "Active",
    tech: ["Next.js", "Supabase", "CRM & AI tools"],
    color: "#a78bfa",
  },
];

type Planet = { name: string; color: string };
type Ring = { label: string; r: number; dur: number; reverse: boolean; planets: Planet[] };
const RINGS: Ring[] = [
  {
    label: "Frontend",
    r: 150,
    dur: 30,
    reverse: false,
    planets: [
      { name: "Next.js", color: "#e5e7eb" },
      { name: "React", color: "#67e8f9" },
      { name: "TypeScript", color: "#60a5fa" },
      { name: "Tailwind CSS", color: "#22d3ee" },
    ],
  },
  {
    label: "Backend",
    r: 235,
    dur: 44,
    reverse: true,
    planets: [
      { name: "Django", color: "#34d399" },
      { name: "Python", color: "#fbbf24" },
      { name: "REST APIs", color: "#f472b6" },
      { name: "Redis", color: "#f87171" },
      { name: "Supabase", color: "#4ade80" },
    ],
  },
  {
    label: "Data & Ops",
    r: 320,
    dur: 60,
    reverse: false,
    planets: [
      { name: "PostgreSQL", color: "#818cf8" },
      { name: "Docker", color: "#38bdf8" },
      { name: "AWS", color: "#fb923c" },
      { name: "Git", color: "#f97316" },
    ],
  },
];
const TECH_COUNT = RINGS.reduce((n, r) => n + r.planets.length, 0);

const STATS = [
  { n: 2, suffix: "+", label: "Years building", icon: "⏳" },
  { n: projects.length, suffix: "", label: "Projects built", icon: "🚀" },
  { n: JOURNEY.length, suffix: "", label: "Roles held", icon: "💼" },
  { n: TECH_COUNT, suffix: "", label: "Technologies", icon: "🧰" },
];

const GITHUB = "https://github.com/abhijeetkumar7011-code";
const LINKEDIN = "https://www.linkedin.com/in/abhijeet-kumar-57b388232/";
const EMAIL = "abhijeetkumar7011@gmail.com";

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
const hash = (n: number) => {
  const x = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};
const hueAt = (cam: number) => {
  const i = Math.max(0, Math.min(NC - 1, Math.floor(cam)));
  const j = Math.min(NC - 1, i + 1);
  const f = cam - i;
  return HUES[i] + (HUES[j] - HUES[i]) * clamp01(f);
};

/* ───────────────────────── Typewriter ───────────────────────── */
function Typewriter({ words }: { words: string[] }) {
  const [txt, setTxt] = useState("");
  useEffect(() => {
    let wi = 0,
      ci = 0,
      del = false;
    let to: ReturnType<typeof setTimeout>;
    const tick = () => {
      const w = words[wi];
      if (!del) {
        ci++;
        setTxt(w.slice(0, ci));
        if (ci === w.length) {
          del = true;
          to = setTimeout(tick, 1500);
          return;
        }
        to = setTimeout(tick, 70);
      } else {
        ci--;
        setTxt(w.slice(0, ci));
        if (ci === 0) {
          del = false;
          wi = (wi + 1) % words.length;
          to = setTimeout(tick, 300);
          return;
        }
        to = setTimeout(tick, 32);
      }
    };
    to = setTimeout(tick, 600);
    return () => clearTimeout(to);
  }, [words]);
  return (
    <span>
      {txt}
      <i className="aw-caret" />
    </span>
  );
}

/* ───────────────────────── Main ───────────────────────── */
export default function AboutWarp() {
  const outerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const panelRefs = useRef<(HTMLElement | null)[]>([]);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const statRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const barRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [hasCutout, setHasCutout] = useState(true);

  /* background-removed photo is optional: fall back to the framed original */
  useEffect(() => {
    const im = new window.Image();
    im.onerror = () => setHasCutout(false);
    im.src = "/profile-cutout.png";
  }, []);

  const jumpTo = (i: number) => {
    const outer = outerRef.current;
    const stage = stageRef.current;
    if (!outer || !stage) return;
    const scrollable = outer.offsetHeight - stage.clientHeight;
    const top = outer.getBoundingClientRect().top + window.scrollY + (i / (NC - 1)) * scrollable;
    window.scrollTo({ top, behavior: "smooth" });
  };

  /* 3D tilt for the photo card */
  const onTilt = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = tiltRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transition = "transform .08s linear";
    el.style.transform = `rotateX(${(-y * 16).toFixed(2)}deg) rotateY(${(x * 18).toFixed(2)}deg) scale(1.03)`;
    const g = glareRef.current;
    if (g) g.style.background = `radial-gradient(circle at ${(x + 0.5) * 100}% ${(y + 0.5) * 100}%, rgba(255,255,255,.35), transparent 55%)`;
  };
  const onTiltLeave = () => {
    const el = tiltRef.current;
    if (!el) return;
    el.style.transition = "transform .6s cubic-bezier(.2,.8,.2,1)";
    el.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)";
    const g = glareRef.current;
    if (g) g.style.background = "transparent";
  };

  useEffect(() => {
    const canvas = canvasRef.current!;
    const stage = stageRef.current!;
    const outer = outerRef.current!;
    const scene = sceneRef.current!;
    const ctx = canvas.getContext("2d")!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let W = 0,
      H = 0,
      cx = 0,
      cy = 0,
      f = 800;
    const ZMAX = 1400;
    const STARS = 760;
    const stars = Array.from({ length: STARS }, (_, i) => ({
      x: (hash(i * 3.7) - 0.5) * 2400,
      y: (hash(i * 5.3 + 2) - 0.5) * 2400,
      z: hash(i * 7.9 + 4) * ZMAX + 20,
      h: (hash(i * 9.1) - 0.5) * 50,
    }));

    const resize = () => {
      const r = stage.getBoundingClientRect();
      W = Math.round(r.width);
      H = Math.round(r.height);
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cx = W / 2;
      cy = H / 2;
      f = Math.max(W, H) * 0.85;
    };

    const readTarget = () => {
      const scrollable = Math.max(1, outer.offsetHeight - stage.clientHeight);
      return clamp01(-outer.getBoundingClientRect().top / scrollable) * (NC - 1);
    };

    let cam = readTarget();
    let vel = 0;
    let pxT = 0,
      pyT = 0,
      pxs = 0,
      pys = 0;
    let lastCam = -99,
      lastPx = -99,
      lastHue = -999;
    let activeLocal = -1;
    let statStart = -1;
    let statDone = false;
    let last = performance.now();
    let raf = 0;

    const drawStars = (dt: number) => {
      ctx.clearRect(0, 0, W, H);
      const hue = hueAt(cam);
      const spd = reduce ? 40 : 90 + Math.min(2800, Math.abs(vel) * 1600);
      const streak = 4 + spd * 0.05;
      ctx.lineCap = "round";
      const ox = pxs * 90;
      const oy = pys * 90;
      for (const s of stars) {
        s.z -= spd * dt;
        if (s.z < 15) {
          s.z = ZMAX;
          s.x = (Math.random() - 0.5) * 2400;
          s.y = (Math.random() - 0.5) * 2400;
        }
        const k = f / s.z;
        const sx = cx + (s.x - ox) * k;
        const sy = cy + (s.y - oy) * k;
        if (sx < -60 || sx > W + 60 || sy < -60 || sy > H + 60) continue;
        const k2 = f / (s.z + streak);
        const sx2 = cx + (s.x - ox) * k2;
        const sy2 = cy + (s.y - oy) * k2;
        const depth = 1 - s.z / ZMAX;
        ctx.strokeStyle = `hsla(${(hue + s.h).toFixed(0)},90%,${(72 + depth * 24).toFixed(0)}%,${(0.3 + depth * 0.7).toFixed(2)})`;
        ctx.lineWidth = 0.9 + depth * 1.9;
        ctx.beginPath();
        ctx.moveTo(sx2, sy2);
        ctx.lineTo(sx, sy);
        ctx.stroke();
      }
    };

    const syncDom = (now: number) => {
      const hue = hueAt(cam);
      if (Math.abs(hue - lastHue) > 0.6) {
        stage.style.setProperty("--h", hue.toFixed(1));
        lastHue = hue;
      }

      /* fly-through panels */
      for (let i = 0; i < NC; i++) {
        const el = panelRefs.current[i];
        if (!el) continue;
        const t = cam - i;
        const m = Math.max(0, Math.abs(t) - 0.22) * Math.sign(t);
        let z: number, op: number, bl: number;
        if (m < 0) {
          const a = -m;
          z = -a * 1800;
          op = clamp01(1 - a / 0.7);
          bl = a * 16;
        } else {
          z = m * 1100;
          op = clamp01(1 - m / 0.5);
          bl = m * 20;
        }
        const yaw = (i % 2 ? 1 : -1) * m * 16;
        const pitch = m < 0 ? -m * 6 : -m * 8;
        el.style.opacity = op.toFixed(3);
        el.style.visibility = op < 0.01 ? "hidden" : "visible";
        el.style.transform = `translate3d(0,0,${z.toFixed(0)}px) rotateY(${yaw.toFixed(2)}deg) rotateX(${pitch.toFixed(2)}deg)`;
        el.style.filter = bl > 0.4 ? `blur(${bl.toFixed(1)}px)` : "none";
        el.style.pointerEvents = Math.abs(t) < 0.4 ? "auto" : "none";
      }

      /* word-by-word story reveal */
      const u = clamp01((cam - 1 + 0.6) / 0.75);
      const M = STORY.length;
      for (let j = 0; j < M; j++) {
        const w = wordRefs.current[j];
        if (!w) continue;
        const o = clamp01((u * 1.3 - j / M) / 0.22);
        w.style.opacity = (0.13 + 0.87 * o).toFixed(3);
        w.dataset.on = o > 0.85 ? "1" : "0";
      }

      /* count-up stats */
      if (!statDone) {
        if (statStart < 0 && Math.abs(cam - 4) < 0.55) statStart = now;
        if (statStart >= 0) {
          const p = clamp01((now - statStart) / 1500);
          const e = 1 - Math.pow(1 - p, 3);
          STATS.forEach((s, i) => {
            const el = statRefs.current[i];
            if (el) el.textContent = String(Math.round(s.n * e));
          });
          if (p >= 1) statDone = true;
        }
      }

      if (barRef.current) barRef.current.style.transform = `scaleX(${(cam / (NC - 1)).toFixed(4)})`;
      if (hintRef.current) hintRef.current.style.opacity = clamp01(1 - cam / 0.25).toFixed(3);

      const a = Math.max(0, Math.min(NC - 1, Math.round(cam)));
      if (a !== activeLocal) {
        activeLocal = a;
        setActive(a);
      }
    };

    const frame = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const target = readTarget();
      const prev = cam;
      cam += (target - cam) * (reduce ? 1 : 1 - Math.exp(-dt * 4.5));
      if (Math.abs(target - cam) < 0.0005) cam = target;
      vel += ((cam - prev) / Math.max(dt, 0.001) - vel) * 0.15;
      pxs += (pxT - pxs) * (1 - Math.exp(-dt * 5));
      pys += (pyT - pys) * (1 - Math.exp(-dt * 5));

      drawStars(dt);

      if (Math.abs(cam - lastCam) > 1e-4 || Math.abs(pxs - lastPx) > 1e-4 || (statStart >= 0 && !statDone)) {
        syncDom(now);
        scene.style.transform = `rotateX(${(-pys * 2.2).toFixed(2)}deg) rotateY(${(pxs * 3.2).toFixed(2)}deg)`;
        lastCam = cam;
        lastPx = pxs;
      }
      raf = requestAnimationFrame(frame);
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      pxT = e.clientX / Math.max(1, W) - 0.5;
      pyT = e.clientY / Math.max(1, H) - 0.5;
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(stage);
    window.addEventListener("pointermove", onMove);
    syncDom(performance.now());
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <div ref={outerRef} className="aw-outer" style={{ ["--aw-len" as string]: `calc(${NC - 1} * 85vh)`, ["--aw-len-s" as string]: `calc(${NC - 1} * 85svh)` }}>
      <style>{css}</style>

      <div ref={stageRef} className="aw-stage">
        {/* nebula + starfield */}
        <div className="aw-neb n1" />
        <div className="aw-neb n2" />
        <div className="aw-neb n3" />
        <canvas ref={canvasRef} className="aw-canvas" aria-hidden="true" />

        {/* 3D scene with chapters */}
        <div className="aw-persp">
          <div ref={sceneRef} className="aw-scene">
            {/* 0 — HELLO */}
            <section ref={(el) => {
                panelRefs.current[0] = el;
              }} className="aw-panel">
              <div className="aw-hero">
                <div className="aw-hero-text">
                  <p className="aw-kicker">
                    <span className="aw-dot" /> Open to opportunities
                  </p>
                  <h1 className="aw-h1">
                    Hi, I&apos;m <span className="aw-grad">Abhijeet</span>
                  </h1>
                  <p className="aw-role">
                    <Typewriter words={ROLES} />
                  </p>
                  <p className="aw-lead">Delhi-based developer turning ideas into fast, scalable and beautiful products.</p>
                  <div className="aw-pills">
                    <span>📍 Delhi, India</span>
                    <span>💼 Backend Dev @ Crysta IVF</span>
                    <span>⏳ 2+ yrs experience</span>
                    <span>🕒 IST · UTC+5:30</span>
                  </div>
                  <button type="button" className="aw-journey-btn" onClick={() => jumpTo(2)}>
                    🧭 See my experience journey <span>↓</span>
                  </button>
                </div>

                <div className="aw-hero-3d" onPointerMove={onTilt} onPointerLeave={onTiltLeave}>
                  <div className="aw-ring3d">
                    <div className="aw-ring-spin">
                      {HERO_CHIPS.map((c, i) => (
                        <div key={c} className="aw-chip3d" style={{ ["--a" as string]: `${(360 / HERO_CHIPS.length) * i}deg` }}>
                          <span className="aw-chip-in">{c}</span>
                        </div>
                      ))}
                    </div>
                    <div ref={tiltRef} className={`aw-photo ${hasCutout ? "cut" : "framed"}`}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={hasCutout ? "/profile-cutout.png" : "/profile.png"}
                        alt="Abhijeet Verma"
                        draggable={false}
                        onError={() => setHasCutout(false)}
                      />
                      {!hasCutout && <div ref={glareRef} className="aw-glare" />}
                      <div className="aw-photo-tag">
                        <b>Abhijeet Verma</b>
                        <span>Full Stack · Backend</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 1 — STORY */}
            <section ref={(el) => {
                panelRefs.current[1] = el;
              }} className="aw-panel">
              <div className="aw-story">
                <p className="aw-kicker">The story</p>
                <p className="aw-big">
                  {STORY.map((s, i) => (
                    <span
                      key={i}
                      ref={(el) => {
                        wordRefs.current[i] = el;
                      }}
                      className={`aw-word ${s.hi ? "hi" : ""}`}
                    >
                      {s.w}{" "}
                    </span>
                  ))}
                </p>
                <p className="aw-small">
                  2+ years in. Backend engineer at <b>Crysta IVF</b>, full-stack builder on my own time. I care about clean architecture, performance and the small details people feel but never notice.
                </p>
              </div>
            </section>

            {/* 2 — JOURNEY */}
            <section ref={(el) => {
                panelRefs.current[2] = el;
              }} className="aw-panel">
              <div className="aw-wrap">
                <p className="aw-kicker center">Experience journey</p>
                <h2 className="aw-h2">
                  Where I&apos;ve been <span className="aw-grad">building</span>
                </h2>
                <div className="aw-jr">
                  <div className="aw-jr-line" />
                  {JOURNEY.map((j, i) => (
                    <article key={j.company} className={`aw-jcard c${i}`} style={{ ["--c" as string]: j.color }}>
                      <span className="aw-jnode" />
                      <div className="aw-jtop">
                        <span className="aw-jperiod">{j.period}</span>
                        <span className="aw-jtag">{j.tag}</span>
                      </div>
                      <h3>{j.title}</h3>
                      <p className="aw-jco">{j.company}</p>
                      <p className="aw-jdesc">{j.desc}</p>
                      <div className="aw-jtech">
                        {j.tech.map((t) => (
                          <span key={t}>{t}</span>
                        ))}
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </section>

            {/* 3 — STACK (orbits) */}
            <section ref={(el) => {
                panelRefs.current[3] = el;
              }} className="aw-panel">
              <div className="aw-wrap">
                <p className="aw-kicker center">The stack</p>
                <h2 className="aw-h2">
                  My tech <span className="aw-grad">solar system</span>
                </h2>
                <div className="aw-orbit-box">
                  <div className="aw-orbit">
                    <div className="aw-core">
                      <span>STACK</span>
                    </div>
                    <div className="aw-plane">
                      {RINGS.map((ring) => (
                        <div
                          key={ring.label}
                          className="aw-ring"
                          style={{
                            ["--r" as string]: `${ring.r}px`,
                            ["--d" as string]: `${ring.dur}s`,
                            animationDirection: ring.reverse ? "reverse" : "normal",
                          }}
                        >
                          <i className="aw-ring-line" />
                          {ring.planets.map((p, i) => (
                            <div key={p.name} className="aw-planet" style={{ ["--a" as string]: `${(360 / ring.planets.length) * i}deg` }}>
                              <span
                                className="aw-pl"
                                style={{
                                  ["--pc" as string]: p.color,
                                  animationName: ring.reverse ? "awUnspinR" : "awUnspin",
                                  animationDuration: `${ring.dur}s`,
                                }}
                              >
                                <b />
                                {p.name}
                              </span>
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="aw-legend">
                  {RINGS.map((r) => (
                    <span key={r.label}>{r.label}</span>
                  ))}
                </div>
              </div>
            </section>

            {/* 4 — NUMBERS */}
            <section ref={(el) => {
                panelRefs.current[4] = el;
              }} className="aw-panel">
              <div className="aw-wrap">
                <p className="aw-kicker center">By the numbers</p>
                <h2 className="aw-h2">
                  Small team of <span className="aw-grad">one</span>, big output
                </h2>
                <div className="aw-stats">
                  {STATS.map((s, i) => (
                    <div key={s.label} className="aw-stat">
                      <span className="aw-stat-ico">{s.icon}</span>
                      <div className="aw-stat-n">
                        <span
                          ref={(el) => {
                            statRefs.current[i] = el;
                          }}
                        >
                          0
                        </span>
                        {s.suffix}
                      </div>
                      <p>{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* 5 — CONTACT */}
            <section ref={(el) => {
                panelRefs.current[5] = el;
              }} className="aw-panel">
              <div className="aw-wrap aw-cta">
                <div className="aw-orb" aria-hidden="true" />
                <p className="aw-kicker center">Destination</p>
                <h2 className="aw-h2 big">
                  Let&apos;s build something <span className="aw-grad">unreal</span>
                </h2>
                <p className="aw-lead center">Got a product, an API or a wild idea? I&apos;m one message away.</p>
                <div className="aw-actions">
                  <a href={`mailto:${EMAIL}`} className="aw-btn primary">
                    ✉️ Hire me
                  </a>
                  <a href="/Abhijeet_Kumar_CV.pdf" target="_blank" rel="noopener noreferrer" className="aw-btn">
                    📄 Download CV
                  </a>
                  <Link href="/projects" className="aw-btn">
                    🚗 Drive through projects
                  </Link>
                </div>
                <div className="aw-socials">
                  <a href={GITHUB} target="_blank" rel="noopener noreferrer">
                    GitHub ↗
                  </a>
                  <a href={LINKEDIN} target="_blank" rel="noopener noreferrer">
                    LinkedIn ↗
                  </a>
                  <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
                </div>
              </div>
            </section>
          </div>
        </div>

        <div className="aw-vignette" aria-hidden="true" />

        {/* HUD */}
        <div className="aw-progress" aria-hidden="true">
          <div ref={barRef} />
        </div>
        <div className="aw-hud">
          <Link href="/" className="aw-glass">
            ← Home
          </Link>
          <div className="aw-glass aw-now" aria-live="polite">
            <span>{String(active + 1).padStart(2, "0")}</span>
            {CHAPTERS[active]}
          </div>
        </div>
        <nav className="aw-dots" aria-label="Chapters">
          {CHAPTERS.map((c, i) => (
            <button key={c} type="button" className={active === i ? "on" : ""} onClick={() => jumpTo(i)} aria-label={c} title={c} />
          ))}
        </nav>
        <div ref={hintRef} className="aw-hint" aria-hidden="true">
          <span className="aw-mouse">
            <i />
          </span>
          Scroll to warp
        </div>
      </div>
    </div>
  );
}

/* ───────────────────────── Styles ───────────────────────── */
const css = `
.aw-outer { position: relative; width: 100%; height: calc(100vh + var(--aw-len)); height: calc(100svh + var(--aw-len-s)); }
.aw-stage { --h: 265; position: sticky; top: 0; height: 100vh; height: 100svh; overflow: hidden; color: #f0f0ff;
  background: radial-gradient(ellipse at 50% 40%, hsl(var(--h) 60% 8%) 0%, #03050f 70%); }
.aw-canvas { position: absolute; inset: 0; width: 100%; height: 100%; display: block; }
.aw-neb { position: absolute; width: 90vmax; height: 90vmax; border-radius: 50%; pointer-events: none; will-change: transform; }
.aw-neb.n1 { left: -30vmax; top: -35vmax; background: radial-gradient(circle, hsla(var(--h),90%,55%,.30), transparent 62%); animation: awDrift1 28s ease-in-out infinite alternate; }
.aw-neb.n2 { right: -35vmax; bottom: -40vmax; background: radial-gradient(circle, hsla(calc(var(--h) + 60),90%,55%,.24), transparent 62%); animation: awDrift2 34s ease-in-out infinite alternate; }
.aw-neb.n3 { left: 20vmax; top: 10vmax; background: radial-gradient(circle, hsla(calc(var(--h) - 50),90%,60%,.12), transparent 60%); animation: awDrift1 40s ease-in-out infinite alternate-reverse; }
@keyframes awDrift1 { from { transform: translate3d(0,0,0) scale(1); } to { transform: translate3d(8vmax,5vmax,0) scale(1.15); } }
@keyframes awDrift2 { from { transform: translate3d(0,0,0) scale(1.1); } to { transform: translate3d(-9vmax,-6vmax,0) scale(.95); } }

.aw-persp { position: absolute; inset: 0; perspective: 1000px; }
.aw-scene { position: absolute; inset: 0; transform-style: preserve-3d; }
.aw-panel { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; padding: 76px 20px 56px; will-change: transform, opacity; backface-visibility: hidden; }
.aw-wrap { width: 100%; max-width: 1080px; text-align: center; }

.aw-kicker { display: inline-flex; align-items: center; gap: 8px; font-size: 12px; font-weight: 700; letter-spacing: .22em; text-transform: uppercase; color: hsl(calc(var(--h) + 20) 90% 75%); margin: 0 0 14px; }
.aw-kicker.center { justify-content: center; display: flex; }
.aw-dot { width: 8px; height: 8px; border-radius: 50%; background: #4ade80; box-shadow: 0 0 12px #4ade80; animation: awPulse 1.8s ease-in-out infinite; }
@keyframes awPulse { 50% { transform: scale(1.5); opacity: .6; } }
.aw-h1 { font-family: var(--font-display); font-weight: 800; font-size: clamp(40px, 7vw, 92px); line-height: 1; letter-spacing: -.035em; margin: 0 0 14px; }
.aw-h2 { font-family: var(--font-display); font-weight: 800; font-size: clamp(28px, 4.6vw, 58px); line-height: 1.05; letter-spacing: -.03em; margin: 0 0 30px; }
.aw-h2.big { font-size: clamp(34px, 6vw, 76px); margin-bottom: 16px; }
.aw-grad { background: linear-gradient(120deg, hsl(var(--h) 95% 72%), hsl(calc(var(--h) + 70) 95% 68%), hsl(calc(var(--h) + 140) 95% 72%)); background-size: 200% auto; -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; animation: awShimmer 5s linear infinite; }
@keyframes awShimmer { to { background-position: 200% center; } }
.aw-role { font-family: var(--font-display); font-weight: 700; font-size: clamp(18px, 2.6vw, 30px); color: rgba(255,255,255,.88); margin: 0 0 14px; min-height: 1.4em; }
.aw-caret { display: inline-block; width: 3px; height: 1em; margin-left: 4px; vertical-align: -0.12em; background: #67e8f9; animation: awBlink 1s steps(2) infinite; }
@keyframes awBlink { 50% { opacity: 0; } }
.aw-lead { font-size: clamp(14px, 1.5vw, 18px); line-height: 1.7; color: rgba(255,255,255,.62); max-width: 520px; margin: 0 0 20px; }
.aw-lead.center { margin: 0 auto 28px; }
.aw-pills { display: flex; flex-wrap: wrap; gap: 8px; }
.aw-pills span { font-size: 12.5px; font-weight: 600; padding: 7px 14px; border-radius: 999px; background: rgba(255,255,255,.07); border: 1px solid rgba(255,255,255,.14); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); color: rgba(255,255,255,.8); }

/* hero */
.aw-hero { width: 100%; max-width: 1240px; display: grid; grid-template-columns: 1fr 1fr; align-items: center; gap: 24px; }
.aw-hero-text { text-align: left; }
.aw-hero-3d { perspective: 1100px; display: flex; align-items: center; justify-content: center; height: min(760px, 86vh); }
.aw-ring3d { --rr: 300px; --ps: 1; position: relative; width: 0; height: 0; transform-style: preserve-3d; transform: rotateX(-13deg) scale(var(--ps)); }
@media (max-height: 820px) { .aw-ring3d { --ps: .82; } }
@media (max-height: 720px) { .aw-ring3d { --ps: .68; } }
.aw-ring-spin { position: absolute; left: 0; top: 0; transform-style: preserve-3d; animation: awSpinY 28s linear infinite; }
@keyframes awSpinY { to { transform: rotateY(360deg); } }
.aw-chip3d { position: absolute; left: 0; top: 0; transform-style: preserve-3d; transform: rotateY(var(--a)) translateZ(var(--rr)); }
.aw-chip-in { position: absolute; left: 0; top: 0; white-space: nowrap; font-size: 13px; font-weight: 700; padding: 8px 16px; border-radius: 999px; color: #fff;
  background: rgba(124,77,255,.28); border: 1px solid rgba(255,255,255,.28); backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); box-shadow: 0 8px 30px rgba(0,0,0,.4), 0 0 24px hsla(var(--h),90%,60%,.35);
  transform: translate(-50%,-50%) rotateY(calc(var(--a) * -1)); animation: awUnspinY 28s linear infinite; }
@keyframes awUnspinY { from { transform: translate(-50%,-50%) rotateY(calc(var(--a) * -1)); } to { transform: translate(-50%,-50%) rotateY(calc(var(--a) * -1 - 360deg)); } }
.aw-photo { position: absolute; left: -250px; top: -330px; width: 500px; height: 660px; transform-style: preserve-3d; will-change: transform; }
.aw-photo img { position: relative; width: 100%; height: 100%; display: block; }
/* background-removed version: person stands free, with a glowing disc behind */
.aw-photo.cut::before { content: ""; position: absolute; left: 50%; bottom: 6%; width: 118%; aspect-ratio: 1; transform: translate(-50%, 0) translateZ(-70px); border-radius: 50%;
  background: radial-gradient(circle, hsla(var(--h),95%,62%,.5), hsla(var(--h),95%,50%,.14) 50%, transparent 68%); border: 1px solid hsla(var(--h),95%,75%,.22); }
.aw-photo.cut img { object-fit: contain; object-position: center bottom; filter: drop-shadow(0 24px 36px rgba(0,0,0,.55));
  -webkit-mask-image: linear-gradient(to bottom, #000 80%, transparent 100%); mask-image: linear-gradient(to bottom, #000 80%, transparent 100%); }
.aw-photo.cut .aw-photo-tag { left: 50%; right: auto; bottom: 6px; min-width: 230px; align-items: center; text-align: center; transform: translateX(-50%) translateZ(40px); }
/* fallback: original photo in a frame */
.aw-photo.framed { left: -150px; top: -190px; width: 300px; height: 380px; border-radius: 30px; overflow: hidden; border: 1px solid rgba(255,255,255,.3); box-shadow: 0 30px 80px rgba(0,0,0,.6), 0 0 70px hsla(var(--h),90%,60%,.4); }
.aw-photo.framed img { object-fit: cover; object-position: center 20%; }
.aw-glare { position: absolute; inset: 0; pointer-events: none; }
.aw-photo-tag { position: absolute; left: 10px; right: 10px; bottom: 10px; padding: 10px 14px; border-radius: 16px; display: flex; flex-direction: column; text-align: left;
  background: rgba(8,10,28,.55); border: 1px solid rgba(255,255,255,.18); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); }
.aw-photo-tag b { font-family: var(--font-display); font-size: 15px; }
.aw-photo-tag span { font-size: 11px; color: rgba(255,255,255,.65); }

/* story */
.aw-story { max-width: 960px; text-align: left; }
.aw-big { font-family: var(--font-display); font-weight: 800; font-size: clamp(26px, 4.8vw, 62px); line-height: 1.12; letter-spacing: -.03em; margin: 0 0 24px; }
.aw-word { transition: color .4s, text-shadow .4s; }
.aw-word.hi[data-on="1"] { background: linear-gradient(120deg, hsl(var(--h) 95% 74%), hsl(calc(var(--h) + 80) 95% 70%)); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; }
.aw-small { font-size: clamp(14px, 1.5vw, 18px); line-height: 1.8; color: rgba(255,255,255,.6); max-width: 700px; margin: 0; }
.aw-small b { color: hsl(calc(var(--h) + 20) 90% 78%); }

/* journey */
.aw-jr { position: relative; display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; perspective: 1300px; text-align: left; padding-top: 22px; }
.aw-jr-line { position: absolute; left: 6%; right: 6%; top: 6px; height: 2px; background: linear-gradient(90deg, rgba(74,222,128,.7), rgba(96,165,250,.7), rgba(167,139,250,.7)); box-shadow: 0 0 14px rgba(124,77,255,.5); }
.aw-jr-line::after { content: ""; position: absolute; top: -3px; left: 0; width: 8px; height: 8px; border-radius: 50%; background: #fff; box-shadow: 0 0 14px #fff, 0 0 30px hsl(var(--h) 95% 65%); animation: awTravel 5s ease-in-out infinite alternate; }
@keyframes awTravel { to { left: calc(100% - 8px); } }
.aw-journey-btn { margin-top: 18px; display: inline-flex; align-items: center; gap: 8px; padding: 12px 22px; border-radius: 14px; border: 0; cursor: pointer; font-family: var(--font-body); font-size: 14px; font-weight: 700; color: #fff;
  background: linear-gradient(135deg, #7c4dff, #00d4ff); box-shadow: 0 10px 30px rgba(124,77,255,.5); transition: transform .25s, box-shadow .25s; }
.aw-journey-btn:hover { transform: translateY(-3px); box-shadow: 0 14px 40px rgba(124,77,255,.75); }
.aw-journey-btn span { display: inline-block; animation: awBob 1.4s ease-in-out infinite; }
@keyframes awBob { 50% { transform: translateY(3px); } }
.aw-jcard { position: relative; padding: 22px 22px 20px; border-radius: 24px; background: linear-gradient(150deg, rgba(255,255,255,.09), rgba(8,10,28,.72)); border: 1px solid rgba(255,255,255,.16);
  backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px); box-shadow: 0 24px 70px rgba(0,0,0,.5), 0 0 40px color-mix(in srgb, var(--c) 18%, transparent); transition: transform .35s, border-color .35s, box-shadow .35s; }
.aw-jcard.c0 { transform: rotateY(9deg); } .aw-jcard.c2 { transform: rotateY(-9deg); }
.aw-jcard:hover { transform: rotateY(0) translateY(-8px) scale(1.02); border-color: var(--c); box-shadow: 0 30px 80px rgba(0,0,0,.6), 0 0 60px color-mix(in srgb, var(--c) 45%, transparent); }
.aw-jnode { position: absolute; top: -21px; left: 50%; width: 12px; height: 12px; margin-left: -6px; border-radius: 50%; background: var(--c); box-shadow: 0 0 16px var(--c); }
.aw-jtop { display: flex; justify-content: space-between; align-items: center; gap: 8px; margin-bottom: 12px; }
.aw-jperiod { font-size: 11px; font-weight: 700; letter-spacing: .06em; text-transform: uppercase; color: rgba(255,255,255,.5); }
.aw-jtag { font-size: 10px; font-weight: 800; letter-spacing: .08em; text-transform: uppercase; padding: 3px 10px; border-radius: 999px; color: var(--c); background: color-mix(in srgb, var(--c) 14%, transparent); border: 1px solid color-mix(in srgb, var(--c) 40%, transparent); }
.aw-jcard h3 { font-family: var(--font-display); font-weight: 800; font-size: 21px; letter-spacing: -.02em; margin: 0 0 3px; }
.aw-jco { font-size: 14px; font-weight: 600; color: var(--c); margin: 0 0 10px; }
.aw-jdesc { font-size: 13px; line-height: 1.65; color: rgba(255,255,255,.6); margin: 0 0 14px; }
.aw-jtech { display: flex; flex-wrap: wrap; gap: 6px; }
.aw-jtech span { font-size: 11px; font-weight: 600; padding: 3px 10px; border-radius: 7px; background: rgba(255,255,255,.07); border: 1px solid rgba(255,255,255,.12); color: rgba(255,255,255,.7); }

/* orbit */
.aw-orbit-box { height: min(430px, 44vh); display: flex; align-items: center; justify-content: center; }
.aw-orbit { position: relative; width: 0; height: 0; perspective: 1500px; transform: scale(var(--sc, 1)); }
.aw-core { position: absolute; left: -54px; top: -54px; width: 108px; height: 108px; border-radius: 50%; display: flex; align-items: center; justify-content: center; z-index: 3;
  background: radial-gradient(circle at 35% 30%, #fff, hsl(var(--h) 90% 65%) 35%, hsl(calc(var(--h) + 60) 90% 35%) 100%); box-shadow: 0 0 80px hsla(var(--h),95%,60%,.8), 0 0 160px hsla(var(--h),95%,60%,.4); animation: awCore 4s ease-in-out infinite; }
.aw-core span { font-family: var(--font-display); font-weight: 800; font-size: 14px; letter-spacing: .16em; color: #0a0a1e; }
@keyframes awCore { 50% { transform: scale(1.1); } }
.aw-plane { position: absolute; left: 0; top: 0; transform-style: preserve-3d; transform: rotateX(62deg); }
.aw-ring { position: absolute; left: 0; top: 0; width: 0; height: 0; transform-style: preserve-3d; animation: awSpinZ var(--d) linear infinite; }
@keyframes awSpinZ { to { transform: rotate(360deg); } }
.aw-ring-line { position: absolute; left: calc(var(--r) * -1); top: calc(var(--r) * -1); width: calc(var(--r) * 2); height: calc(var(--r) * 2); border-radius: 50%; border: 1px dashed rgba(255,255,255,.2); box-shadow: inset 0 0 40px hsla(var(--h),90%,60%,.06); }
.aw-planet { position: absolute; left: 0; top: 0; transform-style: preserve-3d; transform: rotate(var(--a)) translateX(var(--r)); }
.aw-pl { position: absolute; left: 0; top: 0; white-space: nowrap; display: inline-flex; align-items: center; gap: 7px; font-size: 12.5px; font-weight: 700; padding: 7px 14px; border-radius: 999px; color: #fff;
  background: rgba(10,12,34,.72); border: 1px solid color-mix(in srgb, var(--pc) 55%, transparent); backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px);
  box-shadow: 0 6px 22px rgba(0,0,0,.5), 0 0 22px color-mix(in srgb, var(--pc) 35%, transparent);
  transform: translate(-50%,-50%) rotate(calc(var(--a) * -1)) rotateX(-62deg); animation-timing-function: linear; animation-iteration-count: infinite; transition: box-shadow .25s; }
.aw-pl b { width: 8px; height: 8px; border-radius: 50%; background: var(--pc); box-shadow: 0 0 10px var(--pc); }
.aw-pl:hover { box-shadow: 0 6px 22px rgba(0,0,0,.5), 0 0 40px var(--pc); }
.aw-orbit:hover .aw-ring, .aw-orbit:hover .aw-pl { animation-play-state: paused; }
@keyframes awUnspin { from { transform: translate(-50%,-50%) rotate(calc(var(--a) * -1)) rotateX(-62deg); } to { transform: translate(-50%,-50%) rotate(calc(var(--a) * -1 - 360deg)) rotateX(-62deg); } }
@keyframes awUnspinR { from { transform: translate(-50%,-50%) rotate(calc(var(--a) * -1)) rotateX(-62deg); } to { transform: translate(-50%,-50%) rotate(calc(var(--a) * -1 + 360deg)) rotateX(-62deg); } }
.aw-legend { display: flex; justify-content: center; gap: 10px; margin-top: 34px; flex-wrap: wrap; }
.aw-legend span { font-size: 11px; font-weight: 700; letter-spacing: .14em; text-transform: uppercase; color: rgba(255,255,255,.5); padding: 4px 12px; border: 1px solid rgba(255,255,255,.12); border-radius: 999px; }

/* stats */
.aw-stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
.aw-stat { padding: 28px 16px 24px; border-radius: 26px; background: linear-gradient(160deg, rgba(255,255,255,.1), rgba(8,10,28,.7)); border: 1px solid rgba(255,255,255,.16); backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px);
  box-shadow: 0 24px 70px rgba(0,0,0,.5); transition: transform .35s, box-shadow .35s; }
.aw-stat:hover { transform: translateY(-10px) rotateX(6deg); box-shadow: 0 30px 80px rgba(0,0,0,.6), 0 0 50px hsla(var(--h),90%,60%,.4); }
.aw-stat-ico { font-size: 30px; display: block; margin-bottom: 8px; }
.aw-stat-n { font-family: var(--font-display); font-weight: 800; font-size: clamp(40px, 5.4vw, 72px); line-height: 1; letter-spacing: -.03em; background: linear-gradient(135deg, #fff, hsl(var(--h) 95% 75%)); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; }
.aw-stat p { margin: 10px 0 0; font-size: 13px; font-weight: 600; letter-spacing: .06em; text-transform: uppercase; color: rgba(255,255,255,.55); }

/* cta */
.aw-cta { position: relative; }
.aw-orb { position: absolute; left: 50%; top: 50%; width: min(80vw, 640px); aspect-ratio: 1; transform: translate(-50%,-50%); border-radius: 50%; z-index: -1; opacity: .5; filter: blur(2px);
  background: conic-gradient(from 0deg, hsla(var(--h),95%,60%,.0), hsla(var(--h),95%,60%,.5), hsla(calc(var(--h) + 90),95%,60%,.0), hsla(calc(var(--h) + 180),95%,60%,.5), hsla(var(--h),95%,60%,.0));
  -webkit-mask: radial-gradient(circle, transparent 56%, #000 57%, #000 60%, transparent 61%); mask: radial-gradient(circle, transparent 56%, #000 57%, #000 60%, transparent 61%); animation: awOrb 12s linear infinite; }
@keyframes awOrb { to { transform: translate(-50%,-50%) rotate(360deg); } }
.aw-actions { display: flex; flex-wrap: wrap; gap: 12px; justify-content: center; margin-bottom: 22px; }
.aw-btn { padding: 14px 26px; border-radius: 16px; font-size: 15px; font-weight: 700; color: #f0f0ff; text-decoration: none; background: rgba(255,255,255,.08); border: 1px solid rgba(255,255,255,.2); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); transition: transform .25s, background .25s, box-shadow .25s; }
.aw-btn:hover { transform: translateY(-4px); background: rgba(255,255,255,.15); }
.aw-btn.primary { background: linear-gradient(135deg, #7c4dff, #00d4ff); border-color: transparent; box-shadow: 0 10px 34px rgba(124,77,255,.55); }
.aw-btn.primary:hover { box-shadow: 0 14px 44px rgba(124,77,255,.8); }
.aw-socials { display: flex; flex-wrap: wrap; gap: 6px 22px; justify-content: center; }
.aw-socials a { font-size: 13px; color: rgba(255,255,255,.55); text-decoration: none; transition: color .2s; }
.aw-socials a:hover { color: #67e8f9; }

/* overlay */
.aw-vignette { position: absolute; inset: 0; pointer-events: none; background: radial-gradient(ellipse 90% 80% at 50% 50%, transparent 50%, rgba(2,3,10,.7) 100%); }
.aw-progress { position: absolute; top: 0; left: 0; right: 0; height: 3px; z-index: 60; background: rgba(255,255,255,.06); }
.aw-progress div { height: 100%; transform-origin: 0 50%; transform: scaleX(0); background: linear-gradient(90deg, #7c4dff, #00d4ff, #ff3cac); }
.aw-hud { position: absolute; top: 16px; left: 16px; right: 16px; display: flex; justify-content: space-between; align-items: center; z-index: 50; pointer-events: none; }
.aw-glass { pointer-events: auto; display: inline-flex; align-items: center; gap: 10px; padding: 9px 16px; border-radius: 999px; font-size: 13px; font-weight: 600; color: #f0f0ff; text-decoration: none;
  background: rgba(255,255,255,.07); border: 1px solid rgba(255,255,255,.14); backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px); transition: background .2s, border-color .2s; }
a.aw-glass:hover { background: rgba(255,255,255,.14); border-color: rgba(124,77,255,.6); }
.aw-now span { font-family: var(--font-display); font-weight: 800; color: hsl(calc(var(--h) + 20) 90% 72%); }
.aw-dots { position: absolute; right: 18px; top: 50%; transform: translateY(-50%); z-index: 50; display: flex; flex-direction: column; gap: 12px; padding: 12px 8px; border-radius: 999px; background: rgba(255,255,255,.05); border: 1px solid rgba(255,255,255,.1); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); }
.aw-dots button { width: 9px; height: 9px; padding: 0; border-radius: 50%; border: 1px solid rgba(255,255,255,.4); background: transparent; cursor: pointer; transition: all .25s; }
.aw-dots button:hover { border-color: #fff; }
.aw-dots button.on { background: hsl(calc(var(--h) + 20) 90% 70%); border-color: transparent; box-shadow: 0 0 12px hsl(var(--h) 95% 65%); transform: scale(1.4); }
.aw-hint { position: absolute; bottom: 24px; left: 50%; transform: translateX(-50%); z-index: 40; display: flex; flex-direction: column; align-items: center; gap: 8px; font-size: 11px; letter-spacing: .2em; text-transform: uppercase; color: rgba(255,255,255,.7); text-shadow: 0 2px 10px rgba(0,0,0,.9); pointer-events: none; }
.aw-mouse { width: 20px; height: 32px; border: 1.5px solid rgba(255,255,255,.5); border-radius: 12px; position: relative; }
.aw-mouse i { position: absolute; left: 50%; top: 6px; width: 3px; height: 6px; margin-left: -1.5px; border-radius: 2px; background: #67e8f9; animation: awWheel 1.6s ease-in-out infinite; }
@keyframes awWheel { 0% { transform: translateY(0); opacity: 1; } 100% { transform: translateY(11px); opacity: 0; } }

/* responsive */
@media (max-width: 900px) {
  .aw-stats { grid-template-columns: repeat(2, 1fr); gap: 12px; }
  .aw-stat { padding: 20px 12px 16px; }
}
@media (max-width: 760px) {
  .aw-panel { padding: 70px 14px 50px; }
  .aw-hero { grid-template-columns: 1fr; gap: 0; text-align: center; }
  .aw-hero-text { text-align: center; order: 2; }
  .aw-hero-3d { order: 1; height: 360px; }
  .aw-kicker { margin-bottom: 8px; }
  .aw-pills { justify-content: center; }
  .aw-journey-btn { margin-top: 12px; padding: 10px 18px; font-size: 13px; }
  .aw-pills span:nth-child(n+3) { display: none; }
  .aw-lead { margin-left: auto; margin-right: auto; font-size: 13.5px; margin-bottom: 14px; }
  .aw-ring3d { --ps: .5; }
  .aw-role { margin-bottom: 8px; }
  .aw-jr { grid-template-columns: 1fr; gap: 10px; padding-top: 0; perspective: none; }
  .aw-jr-line, .aw-jnode { display: none; }
  .aw-jcard, .aw-jcard.c0, .aw-jcard.c2 { transform: none; padding: 14px 16px; border-radius: 18px; }
  .aw-jcard h3 { font-size: 17px; } .aw-jco { margin-bottom: 6px; } .aw-jdesc { font-size: 12px; margin-bottom: 8px; line-height: 1.5; }
  .aw-h2 { margin-bottom: 16px; }
  .aw-orbit { --sc: .52; }
  .aw-orbit-box { height: 300px; }
  .aw-dots { display: none; }
  .aw-glass { padding: 8px 13px; font-size: 12px; }
  .aw-btn { padding: 12px 20px; font-size: 14px; }
}
@media (prefers-reduced-motion: reduce) { .aw-ring-spin, .aw-chip-in, .aw-ring, .aw-pl, .aw-orb, .aw-grad { animation: none; } }
`;

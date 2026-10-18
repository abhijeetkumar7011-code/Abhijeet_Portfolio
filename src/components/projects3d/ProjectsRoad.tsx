"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { projects } from "@/data/projects";

/* ───────────────────────── World constants ───────────────────────── */
const NEAR = 0.9; //          closest drawn distance (world units)
const FAR = 170; //           draw distance
const STEP = 1.6; //          road segment length
const RW = 2.4; //            road half width
const CAM_H = 1.6; //         camera height
const GAP = 30; //            distance between two projects
const FIRST_Z = 36; //        z of first project
const FOCUS_DZ = 11; //       distance at which a project is "readable"
const PX_PER_UNIT = 26; //    scroll pixels per world unit
const CARD_PX = 340; //       design width of a project card
const FIN_PX = 420; //        design width of the finale panel

const N = projects.length;
const cardZ = (i: number) => FIRST_Z + i * GAP;
const END_Z = cardZ(N - 1) + GAP + 4;
const CAM_MAX = END_Z - 16;
const ROAD_LEN = Math.round(CAM_MAX * PX_PER_UNIT);

const CAT_COLOR: Record<string, string> = {
  Architecture: "#a78bfa",
  Healthcare: "#34d399",
  CRM: "#60a5fa",
  Analytics: "#f97316",
  "UI/UX": "#f472b6",
  "E-commerce": "#fbbf24",
};
const colorOf = (cat: string) => CAT_COLOR[cat] ?? "#a78bfa";

/* The road bends: lateral position of the road centre at depth z */
const curve = (z: number) => 10 * Math.sin(z * 0.028) + 5 * Math.sin(z * 0.011 + 1.3);
const dcurve = (z: number) => 0.28 * Math.cos(z * 0.028) + 0.055 * Math.cos(z * 0.011 + 1.3);

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
const hash = (n: number) => {
  const x = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};

type Obj = { z: number; kind: 0 | 1 | 2 | 3; lat: number; h: number; side: number };
type CardState = { vis: boolean; x: number; y: number; k: number; op: number; dz: number; t: number; s: number };

/* ───────────────────────── Project card (DOM) ───────────────────────── */
type Project = (typeof projects)[number];

function RoadCard({ project, index }: { project: Project; index: number }) {
  const col = colorOf(project.category);
  const href = project.projectUrl?.trim();
  let host = "";
  try {
    host = href ? new URL(href).host : "";
  } catch {
    host = "";
  }

  const body = (
    <>
      <div className="rc-shot" style={{ ["--c" as string]: col }}>
        <div className="rc-bar">
          <i /> <i /> <i />
          <span>{host || "private build"}</span>
        </div>
        <div className="rc-art">
          <span className="rc-emoji">{project.emoji}</span>
        </div>
        {project.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={project.image}
            alt={`${project.title} preview`}
            className="rc-img"
            loading="lazy"
            draggable={false}
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        ) : null}
        <span className="rc-num">{String(index + 1).padStart(2, "0")}</span>
        <span className={`rc-status ${href ? "live" : ""}`}>{href ? "● Live" : "Private"}</span>
      </div>

      <div className="rc-body">
        <span className="rc-cat" style={{ color: col, background: `${col}1a`, borderColor: `${col}40` }}>
          {project.category}
        </span>
        <h3 className="rc-title">{project.title}</h3>
        <p className="rc-desc">{project.description}</p>
        <div className="rc-tags">
          {project.tech.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
        <span className="rc-cta" style={{ color: col }}>
          {href ? "Visit project ↗" : "Case study coming soon"}
        </span>
      </div>
    </>
  );

  return href ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className="road-card" style={{ ["--c" as string]: col }}>
      {body}
    </a>
  ) : (
    <div className="road-card" style={{ ["--c" as string]: col }}>
      {body}
    </div>
  );
}

/* ───────────────────────── Main component ───────────────────────── */
export default function ProjectsRoad() {
  const outerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const worldRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const finaleRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(-1);

  const jumpTo = (i: number) => {
    const outer = outerRef.current;
    const stage = stageRef.current;
    if (!outer || !stage) return;
    const scrollable = outer.offsetHeight - stage.clientHeight;
    const targetCam = Math.min(CAM_MAX, Math.max(0, cardZ(i) - FOCUS_DZ));
    const top = outer.getBoundingClientRect().top + window.scrollY + (targetCam / CAM_MAX) * scrollable;
    window.scrollTo({ top, behavior: "smooth" });
  };

  useEffect(() => {
    const canvas = canvasRef.current!;
    const stage = stageRef.current!;
    const outer = outerRef.current!;
    const world = worldRef.current!;
    const ctx = canvas.getContext("2d")!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let W = 0,
      H = 0,
      cx = 0,
      f = 800,
      horizonY = 0,
      mobile = false,
      cardW = 4.3,
      cardOffset = 5.3,
      raise = 0.35,
      finW = 7;
    let skyGrad: CanvasGradient, groundGrad: CanvasGradient, fogGrad: CanvasGradient;
    let dirty = true;

    const nSeg = Math.ceil(FAR / STEP) + 2;
    const sArr = new Float64Array(nSeg + 1);
    const yArr = new Float64Array(nSeg + 1);
    const xArr = new Float64Array(nSeg + 1);
    const cards: CardState[] = projects.map(() => ({ vis: false, x: 0, y: 0, k: 1, op: 0, dz: 0, t: 0, s: 0 }));
    const fin: CardState = { vis: false, x: 0, y: 0, k: 1, op: 0, dz: 0, t: 0, s: 0 };

    const resize = () => {
      const r = stage.getBoundingClientRect();
      W = Math.round(r.width);
      H = Math.round(r.height);
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      mobile = W < 760;
      cx = W / 2;
      horizonY = H * (mobile ? 0.43 : 0.4);
      f = mobile ? Math.max(W * 0.95, H * 0.48) : Math.min(H, W * 0.62);
      cardW = mobile ? (Math.min(300, W * 0.76) * FOCUS_DZ) / f : 4.3;
      cardOffset = RW + 0.7 + cardW / 2;
      raise = mobile ? 0.3 : 0.35;
      finW = (Math.min(440, W * 0.9) * 16) / f;

      skyGrad = ctx.createLinearGradient(0, 0, 0, horizonY);
      skyGrad.addColorStop(0, "#02030a");
      skyGrad.addColorStop(0.5, "#0a0a24");
      skyGrad.addColorStop(0.82, "#26104a");
      skyGrad.addColorStop(1, "#5d2477");
      groundGrad = ctx.createLinearGradient(0, horizonY, 0, H);
      groundGrad.addColorStop(0, "#0b1030");
      groundGrad.addColorStop(1, "#04060f");
      fogGrad = ctx.createLinearGradient(0, horizonY - 6, 0, horizonY + (H - horizonY) * 0.33);
      fogGrad.addColorStop(0, "rgba(93,36,119,0.85)");
      fogGrad.addColorStop(1, "rgba(93,36,119,0)");
      dirty = true;
    };

    const readTarget = () => {
      const scrollable = Math.max(1, outer.offsetHeight - stage.clientHeight);
      const p = clamp01(-outer.getBoundingClientRect().top / scrollable);
      return p * CAM_MAX;
    };

    /* ── state ── */
    let cam = readTarget();
    let lastDrawn = -999;
    let camX = 0;
    let camXTarget = 0;
    let lastCamX = 0;
    let roll = 0;
    let vel = 0;
    let speedAmt = 0;
    let activeLocal = -2;
    let last = performance.now();
    let raf = 0;

    /* ── world → screen ── */
    let curveCam = 0;
    let dCam = 0;
    const px = (z: number, lat: number) => {
      const dz = z - cam;
      const s = f / dz;
      return cx + (curve(z) - curveCam - dCam * dz - camX + lat) * s;
    };
    const py = (dz: number, wy = 0) => horizonY + (CAM_H - wy) * (f / dz);

    /* ── sprites ── */
    const drawPine = (x: number, y: number, s: number, h: number) => {
      ctx.fillStyle = "#150d2b";
      ctx.fillRect(x - 0.12 * s, y - 0.8 * s, 0.24 * s, 0.8 * s);
      for (let j = 0; j < 3; j++) {
        const baseY = y - (0.55 + j * h * 0.24) * s;
        const topY = baseY - h * 0.46 * s;
        const half = h * 0.2 * (1 - j * 0.2) * s;
        ctx.fillStyle = `rgb(${10 + j * 3},${26 + j * 9},${40 + j * 9})`;
        ctx.beginPath();
        ctx.moveTo(x, topY);
        ctx.lineTo(x + half, baseY);
        ctx.lineTo(x - half, baseY);
        ctx.closePath();
        ctx.fill();
        if (s > 9) {
          ctx.strokeStyle = "rgba(0,212,255,0.16)";
          ctx.lineWidth = Math.max(0.6, s * 0.03);
          ctx.stroke();
        }
      }
    };
    const drawRound = (x: number, y: number, s: number, h: number) => {
      ctx.fillStyle = "#150d2b";
      ctx.fillRect(x - 0.11 * s, y - 1.7 * s, 0.22 * s, 1.7 * s);
      const r = h * 0.27 * s;
      ctx.fillStyle = "#0d2638";
      ctx.beginPath();
      ctx.arc(x, y - 1.7 * s - r * 0.7, r, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#14425a";
      ctx.beginPath();
      ctx.arc(x - r * 0.28, y - 1.7 * s - r * 0.95, r * 0.55, 0, Math.PI * 2);
      ctx.fill();
    };
    const drawHouse = (x: number, y: number, s: number, side: number) => {
      const w = 3.2 * s,
        h = 2.2 * s;
      ctx.fillStyle = "#151a38";
      ctx.fillRect(x - w / 2, y - h, w, h);
      ctx.fillStyle = "#2b1759";
      ctx.beginPath();
      ctx.moveTo(x - w * 0.62, y - h);
      ctx.lineTo(x + w * 0.62, y - h);
      ctx.lineTo(x, y - h - 1.3 * s);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = "rgba(255,207,107,0.9)";
      ctx.fillRect(x - w * 0.36, y - h * 0.75, w * 0.22, h * 0.28);
      ctx.fillRect(x + w * 0.14, y - h * 0.75, w * 0.22, h * 0.28);
      ctx.fillStyle = "#0a0c1f";
      ctx.fillRect(x - side * w * 0.05 - w * 0.09, y - h * 0.5, w * 0.18, h * 0.5);
    };
    const drawLamp = (x: number, y: number, s: number, side: number) => {
      const hgt = 4.4 * s;
      const lw = Math.max(1, 0.1 * s);
      ctx.strokeStyle = "#2b2f55";
      ctx.lineWidth = lw;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x, y - hgt);
      ctx.lineTo(x - side * 1.0 * s, y - hgt - 0.1 * s);
      ctx.stroke();
      const hx = x - side * 1.0 * s;
      const hy = y - hgt - 0.1 * s;
      const gr = ctx.createRadialGradient(hx, hy, 0, hx, hy, 2.2 * s);
      gr.addColorStop(0, "rgba(255,230,160,0.75)");
      gr.addColorStop(0.35, "rgba(255,200,110,0.22)");
      gr.addColorStop(1, "rgba(255,200,110,0)");
      ctx.fillStyle = gr;
      ctx.fillRect(hx - 2.2 * s, hy - 2.2 * s, 4.4 * s, 4.4 * s);
      ctx.fillStyle = "#fff4c9";
      ctx.beginPath();
      ctx.arc(hx, hy, Math.max(1, 0.2 * s), 0, Math.PI * 2);
      ctx.fill();
      // light pool on the tarmac
      const pg = ctx.createRadialGradient(hx, y, 0, hx, y, 1.8 * s);
      pg.addColorStop(0, "rgba(255,214,140,0.22)");
      pg.addColorStop(1, "rgba(255,214,140,0)");
      ctx.save();
      ctx.translate(hx, y);
      ctx.scale(1, 0.22);
      ctx.translate(-hx, -y);
      ctx.fillStyle = pg;
      ctx.fillRect(hx - 1.8 * s, y - 1.8 * s, 3.6 * s, 3.6 * s);
      ctx.restore();
    };

    /* ── a flat quad on the road surface, in world coords ── */
    const roadQuad = (z0: number, z1: number, l0: number, l1: number, color: string) => {
      const d0 = Math.max(z0 - cam, NEAR);
      const d1 = z1 - cam;
      if (d1 <= NEAR || d0 > FAR) return;
      const s0 = f / d0,
        s1 = f / d1;
      const y0 = py(d0),
        y1 = py(d1);
      const c0 = cx + (curve(cam + d0) - curveCam - dCam * d0 - camX) * s0;
      const c1 = cx + (curve(z1) - curveCam - dCam * d1 - camX) * s1;
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.moveTo(c0 + l0 * s0, y0);
      ctx.lineTo(c0 + l1 * s0, y0);
      ctx.lineTo(c1 + l1 * s1, y1);
      ctx.lineTo(c1 + l0 * s1, y1);
      ctx.closePath();
      ctx.fill();
    };
    const checkerLine = (z: number) => {
      const cells = 10;
      const cw = (RW * 2) / cells;
      for (let r = 0; r < 2; r++) {
        for (let c = 0; c < cells; c++) {
          roadQuad(z + r * 0.9, z + (r + 1) * 0.9, -RW + c * cw, -RW + (c + 1) * cw, (c + r) % 2 ? "#f4f1ff" : "#0a0a18");
        }
      }
    };

    /* ───────────────── draw ───────────────── */
    const objs: Obj[] = [];

    const draw = () => {
      curveCam = curve(cam);
      dCam = dcurve(cam);
      const bgX = -dCam * f * 0.9;

      /* sky */
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, W, horizonY + 1);

      /* stars */
      ctx.fillStyle = "#ffffff";
      for (let i = 0; i < 140; i++) {
        const sx = hash(i * 3.1) * W;
        const sy = hash(i * 5.7 + 1) * horizonY * 0.82;
        const x = (((sx + bgX * 0.3) % W) + W) % W;
        ctx.globalAlpha = 0.25 + hash(i * 9.3) * 0.6;
        const r = 0.5 + hash(i * 7.3) * 1.1;
        ctx.fillRect(x, sy, r, r);
      }
      ctx.globalAlpha = 1;

      /* horizon glow */
      ctx.save();
      ctx.translate(cx + bgX * 0.6, horizonY);
      ctx.scale(1, 0.38);
      const hg = ctx.createRadialGradient(0, 0, 0, 0, 0, W * 0.7);
      hg.addColorStop(0, "rgba(255,60,172,0.5)");
      hg.addColorStop(0.4, "rgba(124,77,255,0.22)");
      hg.addColorStop(1, "rgba(124,77,255,0)");
      ctx.fillStyle = hg;
      ctx.fillRect(-W, -W, 2 * W, W);
      ctx.restore();

      /* moon */
      const mr = Math.min(W, H) * 0.05;
      const mx = W * 0.74 + bgX;
      const my = horizonY * 0.34;
      const mg = ctx.createRadialGradient(mx, my, mr * 0.6, mx, my, mr * 4);
      mg.addColorStop(0, "rgba(220,205,255,0.35)");
      mg.addColorStop(1, "rgba(220,205,255,0)");
      ctx.fillStyle = mg;
      ctx.fillRect(mx - mr * 4, my - mr * 4, mr * 8, mr * 8);
      ctx.fillStyle = "#f1e9ff";
      ctx.beginPath();
      ctx.arc(mx, my, mr, 0, Math.PI * 2);
      ctx.fill();

      /* mountains / city skyline (parallax with heading) */
      const ridge = (color: string, amp: number, scale: number, par: number, seed: number) => {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.moveTo(0, horizonY + 2);
        for (let x = 0; x <= W + 8; x += 8) {
          const xw = x - bgX * par;
          const n =
            0.5 * Math.sin(xw * scale + seed) +
            0.3 * Math.sin(xw * scale * 2.7 + seed * 2.1) +
            0.2 * Math.sin(xw * scale * 6.1 + seed * 3.3);
          ctx.lineTo(x, horizonY - amp * (0.55 + 0.45 * n));
        }
        ctx.lineTo(W, horizonY + 2);
        ctx.closePath();
        ctx.fill();
      };
      ridge("#1c1042", horizonY * 0.27, 0.0045, 0.85, 1.3);

      const cwid = Math.max(14, W * 0.016);
      const c0 = Math.floor(-bgX / cwid) - 2;
      const c1 = Math.ceil((W - bgX) / cwid) + 1;
      for (let c = c0; c <= c1; c++) {
        if (hash(c * 3.3) < 0.3) continue;
        const bw = cwid * (0.7 + hash(c * 5.1) * 0.9);
        const bh = horizonY * (0.05 + hash(c * 2.9) * 0.14);
        const x = c * cwid + bgX;
        ctx.fillStyle = "#110a2e";
        ctx.fillRect(x, horizonY - bh, bw, bh + 1);
        for (let wy = horizonY - bh + 4; wy < horizonY - 4; wy += 6) {
          for (let wx = x + 3; wx < x + bw - 3; wx += 5) {
            const hv = hash(c * 13 + wy * 0.71 + wx * 0.33);
            if (hv > 0.74) {
              ctx.fillStyle = hv > 0.9 ? "rgba(0,212,255,0.55)" : "rgba(255,207,107,0.55)";
              ctx.fillRect(wx, wy, 2, 3);
            }
          }
        }
      }
      ridge("#0b0925", horizonY * 0.11, 0.007, 1, 4.1);

      /* ground */
      ctx.fillStyle = groundGrad;
      ctx.fillRect(0, horizonY, W, H - horizonY);

      /* road segments */
      const zBase = Math.floor(cam / STEP) * STEP;
      const baseIdx = Math.round(zBase / STEP);
      for (let k = 0; k <= nSeg; k++) {
        const z = zBase + k * STEP;
        const dz = Math.max(z - cam, NEAR);
        const s = f / dz;
        sArr[k] = s;
        yArr[k] = horizonY + CAM_H * s;
        xArr[k] = cx + (curve(cam + dz) - curveCam - dCam * dz - camX) * s;
      }
      for (let j = 0; j < nSeg; j++) {
        const yA = yArr[j],
          yB = yArr[j + 1];
        if (yB > H) continue;
        const sA = sArr[j],
          sB = sArr[j + 1];
        const xA = xArr[j],
          xB = xArr[j + 1];
        const idx = baseIdx + j;
        const par = idx & 1;

        // grass band
        ctx.fillStyle = par ? "rgba(124,77,255,0.035)" : "rgba(0,212,255,0.025)";
        ctx.fillRect(0, yB, W, yA - yB + 1);

        const strip = (l0: number, l1: number, color: string) => {
          ctx.fillStyle = color;
          ctx.beginPath();
          ctx.moveTo(xA + l0 * sA, yA + 0.7);
          ctx.lineTo(xA + l1 * sA, yA + 0.7);
          ctx.lineTo(xB + l1 * sB, yB);
          ctx.lineTo(xB + l0 * sB, yB);
          ctx.closePath();
          ctx.fill();
        };
        // tarmac
        strip(-RW, RW, par ? "#121631" : "#0e1227");
        // neon rumble strips
        strip(-RW - 0.5, -RW, par ? "#7c4dff" : "#1b1448");
        strip(RW, RW + 0.5, par ? "#7c4dff" : "#1b1448");
        // edge lines
        strip(-RW + 0.12, -RW + 0.24, "rgba(225,215,255,0.65)");
        strip(RW - 0.24, RW - 0.12, "rgba(225,215,255,0.65)");
        // centre dashes
        if ((idx & 3) < 2) strip(-0.08, 0.08, "rgba(255,217,138,0.9)");
      }

      checkerLine(6);
      checkerLine(END_Z - 5);

      /* roadside scenery, far → near */
      objs.length = 0;
      const kMin = Math.ceil((cam + NEAR) / 6);
      const kMax = Math.floor((cam + FAR) / 6);
      for (let k = kMin; k <= kMax; k++) {
        const z = k * 6;
        for (let sd = 0; sd < 2; sd++) {
          const side = sd ? 1 : -1;
          const r = hash(k * 2.17 + sd * 91.3);
          if (r > 0.86) continue;
          const lat = side * (RW + 1.8 + hash(k * 7.7 + sd) * 10);
          // keep clear space around the project billboards
          let blocked = false;
          for (let i = 0; i < N; i++) {
            const cs = i % 2 === 0 ? -1 : 1;
            if (cs === side && Math.abs(z - cardZ(i)) < 8 && Math.abs(lat) < 11) blocked = true;
          }
          if (blocked) continue;
          const kind = r < 0.42 ? 0 : r < 0.74 ? 1 : 2;
          objs.push({ z, kind: kind as 0 | 1 | 2, lat, h: 3.6 + hash(k * 3.9 + sd) * 3, side });
        }
      }
      const mMin = Math.ceil((cam + NEAR) / 12);
      const mMax = Math.floor((cam + FAR) / 12);
      for (let m = mMin; m <= mMax; m++) {
        const side = m & 1 ? 1 : -1;
        objs.push({ z: m * 12, kind: 3, lat: side * (RW + 0.9), h: 0, side });
      }
      objs.sort((a, b) => b.z - a.z);
      for (const o of objs) {
        const dz = o.z - cam;
        if (dz < NEAR) continue;
        const s = f / dz;
        const x = px(o.z, o.lat);
        if (x < -s * 7 || x > W + s * 7) continue;
        const y = py(dz);
        ctx.globalAlpha = clamp01((FAR - 12 - dz) / 50);
        if (o.kind === 0) drawPine(x, y, s, o.h);
        else if (o.kind === 1) drawRound(x, y, s, o.h);
        else if (o.kind === 2) drawHouse(x, y, s, o.side);
        else drawLamp(x, y, s, o.side);
      }
      ctx.globalAlpha = 1;

      /* project billboards: layout (shared with DOM) + posts & ground glow */
      for (let i = 0; i < N; i++) {
        const st = cards[i];
        const z = cardZ(i);
        const dz = z - cam;
        if (dz < 2.6 || dz > 125) {
          st.vis = false;
          continue;
        }
        const side = i % 2 === 0 ? -1 : 1;
        const s = f / dz;
        let x = cx + (curve(z) - curveCam - dCam * dz - camX + side * cardOffset) * s;
        let t = 0;
        if (mobile) {
          t = Math.exp(-Math.pow((dz - FOCUS_DZ) / 8, 2));
          x += (cx - x) * t * 0.92;
        }
        st.vis = true;
        st.x = x;
        st.y = horizonY + (CAM_H - raise) * s;
        st.k = (s * cardW) / CARD_PX;
        st.dz = dz;
        st.s = s;
        st.t = t;
        st.op = Math.min(clamp01((125 - dz) / 40), clamp01((dz - 2.6) / 3));

        const col = colorOf(projects[i].category);
        const gy = horizonY + CAM_H * s;
        ctx.globalAlpha = st.op;
        // ground glow
        ctx.save();
        ctx.translate(x, gy);
        ctx.scale(1, 0.25);
        const gg = ctx.createRadialGradient(0, 0, 0, 0, 0, cardW * s * 0.75);
        gg.addColorStop(0, `${col}66`);
        gg.addColorStop(1, `${col}00`);
        ctx.fillStyle = gg;
        ctx.fillRect(-cardW * s, -cardW * s, cardW * s * 2, cardW * s * 2);
        ctx.restore();
        // posts
        if (!mobile) {
          const pw = Math.max(1.2, 0.16 * s);
          ctx.fillStyle = "#231d4a";
          const off = cardW * s * 0.3;
          ctx.fillRect(x - off - pw / 2, st.y, pw, gy - st.y);
          ctx.fillRect(x + off - pw / 2, st.y, pw, gy - st.y);
        }
        ctx.globalAlpha = 1;
      }

      /* finale layout */
      {
        const dz = END_Z - cam;
        if (dz < 3 || dz > 125) fin.vis = false;
        else {
          const s = f / dz;
          let x = cx + (curve(END_Z) - curveCam - dCam * dz - camX) * s;
          x += (cx - x) * clamp01((32 - dz) / 16);
          fin.vis = true;
          fin.x = x;
          fin.y = horizonY + (CAM_H - 0.25) * s;
          fin.k = (s * finW) / FIN_PX;
          fin.dz = dz;
          fin.op = Math.min(clamp01((125 - dz) / 40), clamp01((dz - 3) / 3));
        }
      }

      /* horizon fog */
      ctx.fillStyle = fogGrad;
      ctx.fillRect(0, horizonY - 6, W, (H - horizonY) * 0.33 + 6);

      /* speed streaks */
      if (speedAmt > 0.04) {
        ctx.lineWidth = 1;
        for (let i = 0; i < 22; i++) {
          const a = hash(i * 4.4) * Math.PI * 2;
          if (Math.abs(Math.sin(a)) > 0.8) continue;
          const r0 = Math.max(W, H) * (0.3 + hash(i * 8.1) * 0.3);
          const len = r0 * 0.35 * speedAmt;
          ctx.strokeStyle = `rgba(200,190,255,${0.35 * speedAmt})`;
          ctx.beginPath();
          ctx.moveTo(cx + Math.cos(a) * r0, horizonY + Math.sin(a) * r0 * 0.6);
          ctx.lineTo(cx + Math.cos(a) * (r0 + len), horizonY + Math.sin(a) * (r0 + len) * 0.6);
          ctx.stroke();
        }
      }
    };

    /* ───────────────── DOM sync ───────────────── */
    const syncDom = () => {
      for (let i = 0; i < N; i++) {
        const el = cardRefs.current[i];
        if (!el) continue;
        const st = cards[i];
        if (!st.vis) {
          el.style.visibility = "hidden";
          continue;
        }
        const side = i % 2 === 0 ? -1 : 1;
        el.style.visibility = "visible";
        el.style.opacity = st.op.toFixed(3);
        el.style.zIndex = String(1000 - Math.round(st.dz));
        el.style.pointerEvents = st.dz > 5.5 && st.dz < 30 ? "auto" : "none";
        el.style.transform = `translate3d(${(st.x - CARD_PX / 2).toFixed(1)}px, ${(st.y - H).toFixed(1)}px, 0) scale(${st.k.toFixed(4)})`;
        const tilt = el.firstElementChild as HTMLElement | null;
        if (tilt) tilt.style.transform = `perspective(1100px) rotateY(${(-side * 15 * (mobile ? 1 - st.t : 1)).toFixed(1)}deg)`;
      }
      const fe = finaleRef.current;
      if (fe) {
        if (!fin.vis) fe.style.visibility = "hidden";
        else {
          fe.style.visibility = "visible";
          fe.style.opacity = fin.op.toFixed(3);
          fe.style.zIndex = String(1000 - Math.round(fin.dz));
          fe.style.pointerEvents = fin.dz < 45 ? "auto" : "none";
          fe.style.transform = `translate3d(${(fin.x - FIN_PX / 2).toFixed(1)}px, ${(fin.y - H).toFixed(1)}px, 0) scale(${fin.k.toFixed(4)})`;
        }
      }
      const intro = introRef.current;
      if (intro) {
        const o = clamp01(1 - cam / 12);
        intro.style.opacity = o.toFixed(3);
        intro.style.transform = `translate3d(0, ${(-cam * 4).toFixed(1)}px, 0)`;
        intro.style.visibility = o <= 0 ? "hidden" : "visible";
      }
      const hint = hintRef.current;
      if (hint) hint.style.opacity = clamp01(1 - cam / 6).toFixed(3);
      const bar = barRef.current;
      if (bar) bar.style.transform = `scaleX(${(cam / CAM_MAX).toFixed(4)})`;

      const a = cam < 8 ? -1 : cam > CAM_MAX - 6 ? N : Math.min(N - 1, Math.max(0, Math.round((cam + FOCUS_DZ - FIRST_Z) / GAP)));
      if (a !== activeLocal) {
        activeLocal = a;
        setActive(a);
      }
    };

    /* ───────────────── loop ───────────────── */
    const frame = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const target = readTarget();
      const prev = cam;
      cam += (target - cam) * (reduce ? 1 : 1 - Math.exp(-dt * 5));
      if (Math.abs(target - cam) < 0.0008) cam = target;
      camX += (camXTarget - camX) * (1 - Math.exp(-dt * 4));

      const v = dt > 0 ? (cam - prev) / dt : 0;
      vel += (v - vel) * 0.2;
      speedAmt = reduce ? 0 : clamp01(Math.abs(vel) / 45);

      if (dirty || Math.abs(cam - lastDrawn) > 1e-4 || Math.abs(camX - lastCamX) > 1e-4 || speedAmt > 0.04) {
        draw();
        syncDom();
        const rollT = reduce ? 0 : Math.max(-2.2, Math.min(2.2, -(dcurve(cam + 30) - dCam) * 9));
        roll += (rollT - roll) * 0.12;
        world.style.transform = `rotate(${roll.toFixed(3)}deg) scale(1.05)`;
        lastDrawn = cam;
        lastCamX = camX;
        dirty = false;
      }
      raf = requestAnimationFrame(frame);
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" || mobile) return;
      camXTarget = (e.clientX / Math.max(1, W) - 0.5) * 1.2;
    };

    resize();
    const ro = new ResizeObserver(() => resize());
    ro.observe(stage);
    window.addEventListener("pointermove", onMove);
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  const label =
    active >= 0 && active < N
      ? { n: `${String(active + 1).padStart(2, "0")} / ${String(N).padStart(2, "0")}`, t: projects[active].title, c: colorOf(projects[active].category) }
      : active === N
        ? { n: "🏁", t: "Destination", c: "#00d4ff" }
        : { n: "🚗", t: "Start your engine", c: "#a78bfa" };

  return (
    <div ref={outerRef} className="road-outer" style={{ ["--road-len" as string]: `${ROAD_LEN}px` }}>
      <style>{css}</style>

      <div ref={stageRef} className="road-stage">
        {/* 3D world: canvas road + DOM billboards (rotates slightly when the road bends) */}
        <div ref={worldRef} className="road-world">
          <canvas ref={canvasRef} className="road-canvas" aria-hidden="true" />

          {projects.map((p, i) => (
            <div
              key={p.title}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              className="road-item"
              style={{ width: CARD_PX }}
            >
              <div className="road-tilt">
                <RoadCard project={p} index={i} />
              </div>
            </div>
          ))}

          <div ref={finaleRef} className="road-item" style={{ width: FIN_PX }}>
            <div className="road-finale">
              <span className="rf-flag">🏁</span>
              <h3>End of the road</h3>
              <p>That&apos;s the full tour. Got an idea that needs a road of its own? Let&apos;s build it together.</p>
              <div className="rf-actions">
                <Link href="/#contact" className="rf-btn primary">
                  Hire me
                </Link>
                <Link href="/" className="rf-btn">
                  Back home
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* intro title */}
        <div ref={introRef} className="road-intro">
          <p className="ri-label">Featured work · {N} projects</p>
          <h1>
            Drive through <span>my projects</span>
          </h1>
          <p className="ri-sub">Scroll to move down the road. Every billboard is something I&apos;ve built.</p>
        </div>

        <div className="road-vignette" aria-hidden="true" />

        {/* HUD */}
        <div className="road-progress" aria-hidden="true">
          <div ref={barRef} />
        </div>
        <div className="road-hud">
          <Link href="/" className="glass-pill">
            ← Home
          </Link>
          <div className="glass-pill road-counter" aria-live="polite">
            <span className="rcnt-n" style={{ color: label.c }}>
              {label.n}
            </span>
            <span className="rcnt-t">{label.t}</span>
          </div>
        </div>

        <nav className="road-dots" aria-label="Jump to project">
          {projects.map((p, i) => (
            <button
              key={p.title}
              type="button"
              className={active === i ? "on" : ""}
              style={{ ["--c" as string]: colorOf(p.category) }}
              onClick={() => jumpTo(i)}
              aria-label={`Go to ${p.title}`}
              title={p.title}
            />
          ))}
        </nav>

        <div ref={hintRef} className="road-hint" aria-hidden="true">
          <span className="mouse">
            <i />
          </span>
          Scroll to drive
        </div>
      </div>

      {/* accessible / SEO list of the same projects */}
      <ul className="sr-only">
        {projects.map((p) => (
          <li key={p.title}>
            {p.title} — {p.description}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ───────────────────────── Styles ───────────────────────── */
const css = `
.road-outer { position: relative; width: 100%; height: calc(100vh + var(--road-len)); height: calc(100svh + var(--road-len)); }
.road-stage { position: sticky; top: 0; height: 100vh; height: 100svh; overflow: hidden; }
.road-world { position: absolute; inset: 0; transform-origin: 50% 60%; will-change: transform; }
.road-canvas { position: absolute; inset: 0; width: 100%; height: 100%; display: block; }
.road-item { position: absolute; left: 0; bottom: 0; transform-origin: 50% 100%; visibility: hidden; will-change: transform, opacity; }
.road-tilt { transform-origin: 50% 50%; }

/* billboard card */
.road-card { display: block; width: 100%; border-radius: 22px; overflow: hidden; text-decoration: none; color: #f0f0ff;
  background: linear-gradient(145deg, rgba(24,18,58,0.78), rgba(8,13,30,0.86));
  backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px);
  border: 1px solid rgba(255,255,255,0.14);
  box-shadow: 0 30px 80px rgba(0,0,0,0.6), 0 0 44px color-mix(in srgb, var(--c) 22%, transparent);
  transition: border-color .3s, box-shadow .3s; position: relative; cursor: pointer; }
div.road-card { cursor: default; }
.road-card::before { content: ""; position: absolute; left: 0; right: 0; top: 0; height: 2px; z-index: 4; background: linear-gradient(90deg, var(--c), transparent); }
.road-card:hover { border-color: color-mix(in srgb, var(--c) 70%, white 10%); box-shadow: 0 30px 90px rgba(0,0,0,0.65), 0 0 70px color-mix(in srgb, var(--c) 45%, transparent); }
.rc-shot { position: relative; height: 150px; overflow: hidden; background: linear-gradient(135deg, color-mix(in srgb, var(--c) 28%, #0a0f24), #0a0f24 70%); border-bottom: 1px solid rgba(255,255,255,0.08); }
.rc-bar { position: absolute; top: 0; left: 0; right: 0; height: 24px; z-index: 3; display: flex; align-items: center; gap: 5px; padding: 0 10px; background: rgba(5,8,20,0.7); backdrop-filter: blur(6px); }
.rc-bar i { width: 7px; height: 7px; border-radius: 50%; background: rgba(255,255,255,0.22); display: inline-block; }
.rc-bar i:nth-child(1) { background: #ff5f57; } .rc-bar i:nth-child(2) { background: #febc2e; } .rc-bar i:nth-child(3) { background: #28c840; }
.rc-bar span { margin-left: 8px; font-size: 10px; color: rgba(255,255,255,0.45); letter-spacing: .02em; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.rc-art { position: absolute; inset: 24px 0 0; display: flex; align-items: center; justify-content: center;
  background-image: linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px); background-size: 18px 18px; }
.rc-emoji { font-size: 58px; filter: drop-shadow(0 8px 24px color-mix(in srgb, var(--c) 60%, transparent)); }
.rc-img { position: absolute; left: 0; right: 0; top: 24px; bottom: 0; width: 100%; height: calc(100% - 24px); object-fit: cover; object-position: top center; z-index: 2; }
.rc-num { position: absolute; right: 12px; top: 5px; z-index: 5; font-family: var(--font-display); font-weight: 800; font-size: 12px; line-height: 14px; letter-spacing: .06em; color: var(--c); }
.rc-status { position: absolute; right: 10px; bottom: 10px; z-index: 4; font-size: 9px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; padding: 3px 8px; border-radius: 7px; color: rgba(255,255,255,.6); background: rgba(5,8,20,.65); border: 1px solid rgba(255,255,255,.14); backdrop-filter: blur(6px); }
.rc-status.live { color: #86efac; border-color: rgba(74,222,128,.35); }
.rc-body { padding: 14px 18px 16px; }
.rc-cat { display: inline-block; padding: 3px 10px; border-radius: 8px; border: 1px solid; font-size: 10px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; margin-bottom: 9px; }
.rc-title { font-family: var(--font-display); font-weight: 800; font-size: 21px; letter-spacing: -.02em; margin: 0 0 6px; }
.rc-desc { font-size: 13px; line-height: 1.6; color: rgba(255,255,255,.55); margin: 0 0 12px; }
.rc-tags { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 14px; }
.rc-tags span { font-size: 10.5px; font-weight: 600; padding: 3px 9px; border-radius: 6px; color: rgba(255,255,255,.6); background: rgba(255,255,255,.06); border: 1px solid rgba(255,255,255,.1); }
.rc-cta { font-size: 13px; font-weight: 700; }

/* finale panel */
.road-finale { text-align: center; padding: 30px 28px; border-radius: 26px; color: #f0f0ff;
  background: linear-gradient(145deg, rgba(124,77,255,0.35), rgba(0,212,255,0.14) 60%, rgba(8,13,30,0.5)), rgba(8,10,26,0.82);
  backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255,255,255,0.2); box-shadow: 0 30px 90px rgba(0,0,0,.6), 0 0 80px rgba(124,77,255,.35); }
.rf-flag { font-size: 44px; display: block; margin-bottom: 6px; }
.road-finale h3 { font-family: var(--font-display); font-weight: 800; font-size: 28px; margin: 0 0 8px; letter-spacing: -.02em;
  background: linear-gradient(135deg, #c4b5fd, #67e8f9); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; }
.road-finale p { font-size: 14px; line-height: 1.65; color: rgba(255,255,255,.65); margin: 0 0 20px; }
.rf-actions { display: flex; gap: 10px; justify-content: center; flex-wrap: wrap; }
.rf-btn { padding: 11px 22px; border-radius: 12px; font-size: 14px; font-weight: 700; text-decoration: none; color: #f0f0ff; background: rgba(255,255,255,.08); border: 1px solid rgba(255,255,255,.18); transition: transform .2s, background .2s; }
.rf-btn:hover { transform: translateY(-2px); background: rgba(255,255,255,.14); }
.rf-btn.primary { background: linear-gradient(135deg, #7c4dff, #00d4ff); border-color: transparent; box-shadow: 0 8px 28px rgba(124,77,255,.45); }

/* overlay UI */
.road-intro { position: absolute; left: 0; right: 0; top: 9%; text-align: center; padding: 0 20px; pointer-events: none; z-index: 20; will-change: transform, opacity; }
.ri-label { font-size: 12px; font-weight: 700; letter-spacing: .22em; text-transform: uppercase; color: #67e8f9; margin: 0 0 14px; }
.road-intro h1 { font-family: var(--font-display); font-weight: 800; font-size: clamp(34px, 6.4vw, 78px); line-height: 1.02; letter-spacing: -.03em; margin: 0 0 14px; color: #fff; text-shadow: 0 6px 40px rgba(0,0,0,.6); }
.road-intro h1 span { background: linear-gradient(135deg, #a78bfa, #22d3ee 55%, #f472b6); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; }
.ri-sub { font-size: clamp(13px, 1.5vw, 17px); color: rgba(255,255,255,.65); margin: 0 auto; max-width: 520px; line-height: 1.6; }
.road-vignette { position: absolute; inset: 0; pointer-events: none; z-index: 15; background: radial-gradient(ellipse 85% 75% at 50% 48%, transparent 55%, rgba(2,3,10,.65) 100%); }
.road-progress { position: absolute; top: 0; left: 0; right: 0; height: 3px; z-index: 60; background: rgba(255,255,255,.06); }
.road-progress div { height: 100%; transform-origin: 0 50%; transform: scaleX(0); background: linear-gradient(90deg, #7c4dff, #00d4ff, #ff3cac); }
.road-hud { position: absolute; top: 16px; left: 16px; right: 16px; display: flex; justify-content: space-between; align-items: center; gap: 10px; z-index: 50; pointer-events: none; }
.glass-pill { pointer-events: auto; display: inline-flex; align-items: center; gap: 10px; padding: 9px 16px; border-radius: 999px; font-size: 13px; font-weight: 600; color: #f0f0ff; text-decoration: none;
  background: rgba(255,255,255,.07); border: 1px solid rgba(255,255,255,.14); backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px); transition: background .2s, border-color .2s; }
a.glass-pill:hover { background: rgba(255,255,255,.14); border-color: rgba(124,77,255,.6); }
.road-counter { min-width: 0; }
.rcnt-n { font-family: var(--font-display); font-weight: 800; letter-spacing: .04em; }
.rcnt-t { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 38vw; color: rgba(255,255,255,.85); }
.road-dots { position: absolute; right: 18px; top: 50%; transform: translateY(-50%); z-index: 50; display: flex; flex-direction: column; gap: 12px; padding: 12px 8px; border-radius: 999px; background: rgba(255,255,255,.05); border: 1px solid rgba(255,255,255,.1); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); }
.road-dots button { width: 9px; height: 9px; padding: 0; border-radius: 50%; border: 1px solid rgba(255,255,255,.35); background: transparent; cursor: pointer; transition: all .25s; }
.road-dots button:hover { border-color: var(--c); }
.road-dots button.on { background: var(--c); border-color: var(--c); box-shadow: 0 0 12px var(--c); transform: scale(1.35); }
.road-hint { position: absolute; bottom: 26px; left: 50%; transform: translateX(-50%); z-index: 40; display: flex; flex-direction: column; align-items: center; gap: 8px; font-size: 11px; letter-spacing: .2em; text-transform: uppercase; color: rgba(255,255,255,.7); text-shadow: 0 2px 10px rgba(0,0,0,.9); pointer-events: none; }
.road-hint .mouse { width: 20px; height: 32px; border: 1.5px solid rgba(255,255,255,.5); border-radius: 12px; position: relative; }
.road-hint .mouse i { position: absolute; left: 50%; top: 6px; width: 3px; height: 6px; margin-left: -1.5px; border-radius: 2px; background: #67e8f9; animation: roadWheel 1.6s ease-in-out infinite; }
@keyframes roadWheel { 0% { transform: translateY(0); opacity: 1; } 100% { transform: translateY(11px); opacity: 0; } }

@media (max-width: 760px) {
  .road-dots { display: none; }
  .rcnt-t { max-width: 34vw; }
  .glass-pill { padding: 8px 13px; font-size: 12px; }
}
@media (prefers-reduced-motion: reduce) { .road-hint .mouse i { animation: none; } }
`;

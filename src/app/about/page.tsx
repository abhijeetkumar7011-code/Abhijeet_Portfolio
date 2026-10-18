import type { Metadata } from "next";
import AboutWarp from "@/components/about3d/AboutWarp";

export const metadata: Metadata = {
  title: "About — Abhijeet Verma",
  description: "Warp through the story of Abhijeet Verma — full stack developer, backend engineer and builder.",
};

export default function AboutPage() {
  return (
    <main style={{ color: "var(--text)" }}>
      <AboutWarp />
      <div className="sr-only">
        <h1>About Abhijeet Verma</h1>
        <p>
          Full Stack Developer based in Delhi, India. Backend Developer at Crysta IVF, previously at TrafikSol ITS Solutions, and freelance full-stack developer. Works with Next.js, React, TypeScript, Django, Python,
          PostgreSQL, Supabase, Docker, AWS and Git.
        </p>
      </div>
    </main>
  );
}

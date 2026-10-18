import type { Metadata } from "next";
import ProjectsRoad from "@/components/projects3d/ProjectsRoad";

export const metadata: Metadata = {
  title: "Projects — Abhijeet Verma",
  description: "Drive through everything I've built — an immersive 3D road trip through my projects.",
};

export default function ProjectsPage() {
  return (
    <main style={{ color: "var(--text)" }}>
      <ProjectsRoad />
    </main>
  );
}

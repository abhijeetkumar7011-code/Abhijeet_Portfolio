"use client";

import { useState } from "react";
import CardWrapper from "../CardWrapper";
import { projects } from "@/data/projects";

const categories = ["All", "Architecture", "Healthcare", "CRM"];

export default function ProjectsCard() {
  const [active, setActive] = useState("All");

  const filtered =
    active === "All"
      ? projects
      : projects.filter((p) => p.category === active);

  return (
    <CardWrapper>
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "16px",
        }}
      >
        <div>
          <p className="section-label">Featured Work</p>

          <h3
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "22px",
              fontWeight: 700,
              marginTop: "8px",
              letterSpacing: "-0.02em",
            }}
          >
            Recent Projects
          </h3>
        </div>

        {/* Filter tabs */}
        <div
          style={{
            display: "flex",
            gap: "8px",
            flexWrap: "wrap",
          }}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              style={{
                padding: "6px 14px",
                borderRadius: "8px",
                fontSize: "12px",
                fontWeight: 600,
                border: "1px solid",
                cursor: "pointer",
                transition: "all 0.25s ease",
                background:
                  active === cat
                    ? "rgba(124,77,255,0.2)"
                    : "rgba(255,255,255,0.04)",
                borderColor:
                  active === cat
                    ? "rgba(124,77,255,0.5)"
                    : "rgba(255,255,255,0.08)",
                color:
                  active === cat
                    ? "#c4b5fd"
                    : "rgba(255,255,255,0.4)",
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Project Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fill, minmax(220px, 1fr))",
          gap: "16px",
          marginTop: "24px",
        }}
      >
        {filtered.map((project) => {
          const href =
            project.projectUrl?.trim()
              ? project.projectUrl
              : "/not-found";

          return (
            <a
              key={project.title}
              href={href}
              target={project.projectUrl ? "_blank" : "_self"}
              rel="noopener noreferrer"
              style={{
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <div
                className="project-card"
                style={{
                  cursor: "pointer",
                }}
              >
                {/* Image Area */}
                <div
                  style={{
                    height: "160px",
                    background:
                      "linear-gradient(135deg, rgba(124,77,255,0.25), rgba(0,212,255,0.15))",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {/* Decorative Grid */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      backgroundImage:
                        "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
                      backgroundSize: "20px 20px",
                    }}
                  />

                  <span
                    style={{
                      fontSize: "48px",
                      position: "relative",
                      zIndex: 1,
                    }}
                  >
                    {project.category === "Architecture"
                      ? "🏛️"
                      : project.category === "Healthcare"
                      ? "🏥"
                      : "📊"}
                  </span>

                  {/* Gradient Overlay */}
                  <div
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: "60px",
                      background:
                        "linear-gradient(to top, var(--surface2), transparent)",
                    }}
                  />
                </div>

                {/* Content */}
                <div
                  style={{
                    padding: "16px 18px 18px",
                  }}
                >
                  <div
                    className="cat-badge"
                    style={{
                      marginBottom: "8px",
                    }}
                  >
                    {project.category}
                  </div>

                  <h4
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 700,
                      fontSize: "15px",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {project.title}
                  </h4>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      marginTop: "12px",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "12px",
                        color: "#a78bfa",
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                    >
                      {project.projectUrl
                        ? "View Project →"
                        : "Coming Soon →"}
                    </span>
                  </div>
                </div>
              </div>
            </a>
          );
        })}
      </div>
    </CardWrapper>
  );
}
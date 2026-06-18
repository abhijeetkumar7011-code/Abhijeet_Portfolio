"use client";

import AboutCard from "./cards/AboutCard";
import SkillsCard from "./cards/SkillsCard";
import ServicesCard from "./cards/ServicesCard";
import ProjectsCard from "./cards/ProjectsCard";
import ContactCard from "./cards/ContactCard";
import TechStackCard from "./cards/TechStackCard";
import ExperienceCard from "./cards/ExperienceCard";
import TestimonialsCard from "./cards/TestimonialsCard";

export default function BentoGrid() {
  return (
    <>
      <style>{`
        .bento-grid {
          display: grid;
          gap: 16px;
        }
        .bento-grid {
          grid-template-columns: 1fr;
          grid-template-areas:
            "about" "skills" "services"
            "projects" "contact"
            "tech" "testimonials" "experience";
        }
        @media (min-width: 1024px) {
          .bento-grid {
            grid-template-columns: repeat(12, 1fr);
            grid-template-areas:
              "about   about   about   skills  skills  skills  skills  skills  services services services services"
              "projects projects projects projects projects projects projects projects contact  contact  contact  contact"
              "tech    tech    tech    tech    testimonials testimonials testimonials testimonials experience experience experience experience";
          }
        }
        .bento-about        { grid-area: about; }
        .bento-skills       { grid-area: skills; }
        .bento-services     { grid-area: services; }
        .bento-projects     { grid-area: projects; }
        .bento-contact      { grid-area: contact; }
        .bento-tech         { grid-area: tech; }
        .bento-testimonials { grid-area: testimonials; }
        .bento-experience   { grid-area: experience; }
      `}</style>

      <section className="bento-grid" style={{ minWidth: 0 }}>
        <div className="bento-about" style={{ minWidth: 0 }} id="about">     <AboutCard /></div>
        <div className="bento-skills" style={{ minWidth: 0 }} id="skills">    <SkillsCard /></div>
        <div className="bento-services" style={{ minWidth: 0 }} id="services"><ServicesCard /></div>
        <div className="bento-projects" style={{ minWidth: 0 }} id="projects"><ProjectsCard /></div>
        <div className="bento-contact" style={{ minWidth: 0 }} id="contact"> <ContactCard /></div>
        <div className="bento-tech" style={{ minWidth: 0 }} id="tech">    <TechStackCard /></div>
        <div className="bento-testimonials" style={{ minWidth: 0 }}>          <TestimonialsCard /></div>
        <div className="bento-experience" id="experience"><ExperienceCard /></div>
      </section>
    </>
  );
}

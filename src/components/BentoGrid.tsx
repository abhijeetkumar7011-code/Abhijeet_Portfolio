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

      <section className="bento-grid">
        <div className="bento-about"  id="about">     <AboutCard /></div>
        <div className="bento-skills" id="skills">    <SkillsCard /></div>
        <div className="bento-services" id="services"><ServicesCard /></div>
        <div className="bento-projects" id="projects"><ProjectsCard /></div>
        <div className="bento-contact"  id="contact"> <ContactCard /></div>
        <div className="bento-tech"     id="tech">    <TechStackCard /></div>
        <div className="bento-testimonials">          <TestimonialsCard /></div>
        <div className="bento-experience" id="experience"><ExperienceCard /></div>
      </section>
    </>
  );
}

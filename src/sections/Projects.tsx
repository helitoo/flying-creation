import { projects } from "../data/projects";
import ProjectInfo from "../components/ProjectInfo";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { changeAppBgColor } from "../utils";

const Projects = () => {
  const listRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    changeAppBgColor("#projects-title", "#2B7FFF");

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: "#projects-title",
        start: "top 85%",
      },
    });

    timeline.fromTo(
      "#projects-title",
      {
        y: -50,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
      },
    );

    const container = listRef.current;
    if (!container) return;

    const projects = container.querySelectorAll(".project-info");

    projects.forEach((project, i) =>
      gsap.set(project, {
        opacity: 0,
        x: i % 2 === 0 ? -50 : 50,
      }),
    );

    timeline.to(projects, { opacity: 1, x: 0, duration: 0.45, stagger: 0.15 });
  });

  return (
    <div id="projects" className="min-h-screen w-full px-5 py-5">
      <h2
        id="projects-title"
        className="text-white font-extrabold text-6xl text-center py-10"
      >
        Projects
      </h2>
      <div ref={listRef} className="flex flex-wrap gap-5 mr-5">
        {projects.map((project, i) => (
          <ProjectInfo project={project} key={i} />
        ))}
      </div>
    </div>
  );
};

export default Projects;

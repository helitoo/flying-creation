import { motion } from "framer-motion";
import Masonry from "react-masonry-css";
import { projects } from "../data/projects";
import ProjectInfo from "../components/ProjectInfo";
import { Code2, Sparkles } from "lucide-react";

const breakpointColumns = {
  default: 2,
  768: 1,
};

const Projects = () => {
  return (
    <section id="projects" className="w-full py-28 px-6 bg-white dark:bg-[#09090b] transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800/80 text-neutral-600 dark:text-neutral-300 text-xs font-semibold tracking-wider uppercase mb-3">
            <Code2 className="w-3.5 h-3.5" />
            <span>Portfolio</span>
            <Sparkles className="w-3 h-3 text-neutral-400 dark:text-neutral-500" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 dark:text-white mb-3">
            Featured Projects
          </h2>
          <p className="text-neutral-500 dark:text-neutral-400 text-base md:text-lg max-w-2xl mx-auto">
            A showcase of web applications, AI tools, and data systems engineered for performance and utility.
          </p>
        </motion.div>

        {/* Masonry Layout */}
        <Masonry
          breakpointCols={breakpointColumns}
          className="flex w-auto -ml-6 lg:-ml-8"
          columnClassName="pl-6 lg:pl-8 bg-clip-padding flex flex-col gap-6 lg:gap-8"
        >
          {projects.map((project, index) => (
            <ProjectInfo key={project.name} project={project} index={index} />
          ))}
        </Masonry>
      </div>
    </section>
  );
};

export default Projects;

import { motion } from "framer-motion";
import type { ProjectItem } from "../data/projects";
import { ExternalLink, Calendar, Folder } from "lucide-react";

const formatDemoUrl = (url?: string) => {
  if (!url) return "";
  return url.replace(/^(https?:\/\/)?(www\.)?/, "").replace(/\/$/, "");
};

const ProjectInfo = ({ project, index }: { project: ProjectItem; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{ y: -4 }}
      className="apple-glass-card rounded-2xl p-6 md:p-7 flex flex-col justify-between group w-full relative"
    >
      <div>
        {/* Top Header: Image / Icon + Title & Duration */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-3.5">
            {project.image ? (
              <div className="w-12 h-12 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200/80 dark:border-neutral-700/80 p-2 flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform duration-300">
                <img
                  src={project.image}
                  alt={project.name}
                  className="max-w-full max-h-full object-contain"
                  loading="lazy"
                  draggable={false}
                />
              </div>
            ) : (
              <div className="w-12 h-12 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200/80 dark:border-neutral-700/80 flex items-center justify-center text-neutral-700 dark:text-neutral-300 shrink-0">
                <Folder className="w-6 h-6 text-neutral-500 dark:text-neutral-400" />
              </div>
            )}

            <div>
              <h3 className="text-lg md:text-xl font-bold text-neutral-900 dark:text-white tracking-tight group-hover:text-black dark:group-hover:text-white transition-colors">
                {project.name}
              </h3>
              <div className="flex items-center gap-1.5 text-xs text-neutral-400 dark:text-neutral-500 font-medium mt-0.5">
                <Calendar className="w-3 h-3" />
                <span>{project.duration}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm md:text-base text-neutral-600 dark:text-neutral-300 leading-relaxed mb-6 font-normal">
          {project.description}
        </p>

        {/* Tech Stack Badges */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-1 items-center">
            {project.techs.map((techUrl, techIdx) => {
              const techName =
                techUrl.split("/badge/")[1]?.split("-")[0]?.replace(/%20/g, " ") || "Tech";
              return (
                <img
                  key={techIdx}
                  src={techUrl}
                  alt={techName}
                  className="h-5 object-contain"
                  loading="lazy"
                  draggable={false}
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* Footer Links & Actions */}
      <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between gap-3 mt-auto">
        {project.demo ? (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs md:text-sm font-semibold text-neutral-900 dark:text-neutral-200 hover:text-neutral-600 dark:hover:text-white transition-colors group/link"
          >
            <span>{formatDemoUrl(project.demo)}</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-60 group-hover/link:opacity-100 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-all" />
          </a>
        ) : (
          <span className="text-xs text-neutral-400 dark:text-neutral-500 italic">Repository Project</span>
        )}

        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 border border-neutral-200/60 dark:border-neutral-700/60 transition-all shrink-0"
            title="View on GitHub"
            aria-label={`View ${project.name} on GitHub`}
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
          </a>
        )}
      </div>
    </motion.div>
  );
};

export default ProjectInfo;

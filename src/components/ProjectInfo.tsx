import type { ProjectItem } from "../data/projects";
import { handleEnter, handleLeave } from "../utils";

const formatDemoUrl = (url?: string) => {
  if (!url) return "";
  return url.replace(/^(https?:\/\/)?(www\.)?/, "");
};

const ProjectInfo = ({
  project,
  ...props
}: {
  project: ProjectItem;
} & React.HTMLAttributes<HTMLElement>) => {
  return (
    <div
      {...props}
      className="project-info w-full md:w-[calc(50%-0.75rem)] relative bg-white rounded-xl shadow-lg overflow-hidden flex flex-col"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex gap-2">
            {project.image && (
              <div className="flex justify-center mb-3">
                <div className="w-12 h-12 rounded-lg overflow-hidden p-1 bg-gray-50 flex items-center justify-center">
                  <img
                    src={project.image}
                    alt={project.name}
                    draggable={false}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
              </div>
            )}
            <div className="flex flex-col justify-start items-start">
              <h3 className="font-bold text-base md:text-xl">{project.name}</h3>
              <span className="text-slate-400 text-xs md:text-sm tracking-wider">
                {project.duration}
              </span>
            </div>
          </div>

          {/* Mô tả ngắn gọn */}
          <p className="text-justify leading-relaxed mb-4 text-sm md:text-base">
            {project.description}
          </p>

          {/* Tech Badges */}
          <div className="mb-4">
            <div className="flex justify-center flex-wrap gap-1 max-h-16 overflow-y-auto pr-1 scrollbar-none">
              {project.techs.map((techUrl, techIdx) => {
                const techName =
                  techUrl.split("/badge/")[1]?.split("-")[0] || "tech";
                return (
                  <img
                    key={techIdx}
                    src={techUrl}
                    alt={techName}
                    draggable={false}
                    className="h-5 object-contain"
                    loading="lazy"
                  />
                );
              })}
            </div>
          </div>
        </div>

        {/* Phần Footer chứa Link Demo (chữ) & GitHub (Icon) */}
        <div className="flex items-center justify-between pt-3 gap-4 mt-auto">
          {/* Link Demo rút gọn */}
          {project.demo ? (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-blue-600 hover:text-blue-800 hover:underline truncate  text-sm md:text-base"
            >
              {formatDemoUrl(project.demo)}
            </a>
          ) : (
            <div className="flex-1"></div>
          )}

          {/* Icon GitHub */}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="w-5 h-5 text-gray-700 hover:text-black transition-colors shrink-0"
              title="View Source on GitHub"
            >
              <svg viewBox="0 0 128 128" className="w-full h-full">
                <g fill="currentColor">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M64 5.103c-33.347 0-60.388 27.035-60.388 60.388 0 26.682 17.303 49.317 41.297 57.303 3.017.56 4.125-1.31 4.125-2.905 0-1.44-.056-6.197-.082-11.243-16.8 3.653-20.345-7.125-20.345-7.125-2.747-6.98-6.705-8.836-6.705-8.836-5.48-3.748.413-3.67.413-3.67 6.063.425 9.257 6.223 9.257 6.223 5.386 9.23 14.127 6.562 17.573 5.02.542-3.903 2.107-6.568 3.834-8.076-13.413-1.525-27.514-6.704-27.514-29.843 0-6.593 2.36-11.98 6.223-16.21-.628-1.52-2.695-7.662.584-15.98 0 0 5.07-1.623 16.61 6.19C53.7 35 58.867 34.327 64 34.304c5.13.023 10.3.694 15.127 2.033 11.526-7.813 16.59-6.19 16.59-6.19 3.287 8.317 1.22 14.46.593 15.98 3.872 4.23 6.215 9.617 6.215 16.21 0 23.194-14.127 28.3-27.574 29.796 2.167 1.874 4.097 5.55 4.097 11.183 0 8.08-.07 14.583-.07 16.572 0 1.607 1.088 3.49 4.148 2.897 23.98-7.994 41.263-30.622 41.263-57.294C124.388 32.14 97.35 5.104 64 5.104z"
                  ></path>
                  <path d="M26.484 91.806c-.133.3-.605.39-1.035.185-.44-.196-.685-.605-.543-.906.13-.31.603-.395 1.04-.188.44.197.69.61.537.91zm2.446 2.729c-.287.267-.85.143-1.232-.28-.396-.42-.47-.983-.177-1.254.298-.266.844-.14 1.24.28.394.426.472.984.17 1.255zM31.312 98.012c-.37.258-.976.017-1.35-.52-.37-.538-.37-1.183.01-1.44.373-.258.97-.025 1.35.507.368.545.368 1.19-.01 1.452zm3.261 3.361c-.33.365-1.036.267-1.552-.23-.527-.487-.674-1.18-.343-1.544.336-.366 1.045-.264 1.564.23.527.486.686 1.18.333 1.543zm4.5 1.951c-.147.473-.825.688-1.51.486-.683-.207-1.13-.76-.99-1.238.14-.477.823-.7 1.512-.485.683.206 1.13.756.988 1.237zm4.943.361c.017.498-.563.91-1.28.92-.723.017-1.308-.387-1.315-.877 0-.503.568-.91 1.29-.924.717-.013 1.306.387 1.306.88zm4.598-.782c.086.485-.413.984-1.126 1.117-.7.13-1.35-.172-1.44-.653-.086-.498.422-.997 1.122-1.126.714-.123 1.354.17 1.444.663zm0 0"></path>
                </g>
              </svg>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectInfo;

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { works, type WorkITem } from "../data/works";
import { Briefcase, Calendar, Clock, Sparkles, LayoutGrid, BarChart2 } from "lucide-react";

const MONTH_NAMES = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

interface ParsedDate {
  year: number;
  month: number;
  isYearOnly: boolean;
  isPresent: boolean;
  numeric: number;
  formatted: string;
}

interface ProcessedWork extends WorkITem {
  id: number;
  startDate: ParsedDate;
  endDate: ParsedDate;
  durationLabel: string;
  rangeLabel: string;
  leftPercent: number;
  widthPercent: number;
  isActive: boolean;
}

function parseWorkDate(raw: string, isEnd = false): ParsedDate {
  const trimmed = raw.trim().toLowerCase();
  if (trimmed === "present") {
    const now = new Date();
    const curYear = now.getFullYear();
    const curMonth = now.getMonth() + 1;
    return {
      year: curYear,
      month: curMonth,
      isYearOnly: false,
      isPresent: true,
      numeric: curYear + curMonth / 12,
      formatted: "Present",
    };
  }

  if (trimmed.includes("-")) {
    const [yStr, mStr] = trimmed.split("-");
    const y = parseInt(yStr, 10);
    const m = parseInt(mStr, 10);
    return {
      year: y,
      month: m,
      isYearOnly: false,
      isPresent: false,
      numeric: isEnd ? y + m / 12 : y + (m - 1) / 12,
      formatted: `${MONTH_NAMES[m - 1]} ${y}`,
    };
  }

  const y = parseInt(trimmed, 10);
  return {
    year: y,
    month: isEnd ? 12 : 1,
    isYearOnly: true,
    isPresent: false,
    numeric: isEnd ? y + 1 : y,
    formatted: `${y}`,
  };
}

function getSpanLabel(start: ParsedDate, end: ParsedDate): string {
  const totalMonths = Math.max(1, Math.round((end.numeric - start.numeric) * 12));
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  if (years > 0 && months > 0) {
    return `${years} yr${years > 1 ? "s" : ""} ${months} mo${months > 1 ? "s" : ""}`;
  }
  if (years > 0) {
    return `${years} yr${years > 1 ? "s" : ""}`;
  }
  return `${months} mo${months > 1 ? "s" : ""}`;
}

const Works = () => {
  const [activeTab, setActiveTab] = useState<"blocks" | "cards">("blocks");
  const [hoveredWorkId, setHoveredWorkId] = useState<number | null>(null);
  const [focusedWorkId, setFocusedWorkId] = useState<number | null>(null);

  const { processedWorks, startYear, endYear, years, totalSpan } = useMemo(() => {
    const rawParsed = works.map((w, index) => {
      const startDate = parseWorkDate(w.start, false);
      const endDate = parseWorkDate(w.end, true);
      const isActive = w.end.trim().toLowerCase() === "present";

      return {
        ...w,
        id: index,
        startDate,
        endDate,
        isActive,
        durationLabel: getSpanLabel(startDate, endDate),
        rangeLabel: `${startDate.formatted} — ${endDate.formatted}`,
      };
    });

    const minVal = Math.min(...rawParsed.map((w) => w.startDate.numeric));
    const maxVal = Math.max(...rawParsed.map((w) => w.endDate.numeric));

    // Scale from whole start year to whole end year
    const sYear = Math.floor(minVal);
    const eYear = Math.max(sYear + 1, Math.ceil(maxVal));
    const span = eYear - sYear;

    const items: ProcessedWork[] = rawParsed.map((item) => {
      const rawLeft = ((item.startDate.numeric - sYear) / span) * 100;
      const rawWidth = ((item.endDate.numeric - item.startDate.numeric) / span) * 100;

      // Minimum visible width for comfortable logo display
      const left = Math.max(0, Math.min(100, rawLeft));
      const width = Math.max(12, Math.min(100 - left, rawWidth));

      return {
        ...item,
        leftPercent: left,
        widthPercent: width,
      };
    });

    const yearsList = Array.from({ length: eYear - sYear + 1 }, (_, i) => sYear + i);

    return {
      processedWorks: items,
      startYear: sYear,
      endYear: eYear,
      years: yearsList,
      totalSpan: span,
    };
  }, []);

  const handleSelectWork = (id: number) => {
    setFocusedWorkId(id);
    setActiveTab("cards");
    setTimeout(() => {
      const element = document.getElementById(`work-card-${id}`);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, 150);
  };

  return (
    <section id="works" className="w-full py-28 px-6 bg-white dark:bg-[#09090b] overflow-hidden transition-colors duration-300">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800/80 text-neutral-600 dark:text-neutral-300 text-xs font-semibold tracking-wider uppercase mb-3">
              <Briefcase className="w-3.5 h-3.5" />
              <span>Career & Experience</span>
              <Sparkles className="w-3 h-3 text-neutral-400 dark:text-neutral-500" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 dark:text-white mb-3">
              Experience
            </h2>
            <p className="text-neutral-500 dark:text-neutral-400 text-base md:text-lg max-w-xl">
              Responsive timeline blocking of my technical roles, academic leadership, and software partnerships.
            </p>
          </motion.div>

          {/* View Mode Toggle Switch */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-1 p-1 bg-neutral-100/90 dark:bg-neutral-800/90 border border-neutral-200/80 dark:border-neutral-700/80 rounded-full self-start md:self-auto shrink-0 shadow-xs"
          >
            <button
              onClick={() => setActiveTab("blocks")}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                activeTab === "blocks"
                  ? "bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white shadow-xs border border-neutral-200/60 dark:border-neutral-600/60"
                  : "text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
              }`}
            >
              <BarChart2 className="w-3.5 h-3.5" />
              <span>Time Blocking</span>
            </button>
            <button
              onClick={() => setActiveTab("cards")}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                activeTab === "cards"
                  ? "bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white shadow-xs border border-neutral-200/60 dark:border-neutral-600/60"
                  : "text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Detailed List</span>
            </button>
          </motion.div>
        </div>

        {/* Dynamic Content Display */}
        <AnimatePresence mode="wait">
          {activeTab === "blocks" ? (
            /* Time Blocking Visualization - Logo Only */
            <motion.div
              key="blocks-view"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="w-full"
            >
              {/* Main Gantt Timeline Container */}
              <div className="apple-glass-card rounded-3xl p-6 md:p-8 overflow-x-auto">
                <div className="min-w-[620px]">
                  {/* Timeline Header Scale / Years Axis */}
                  <div className="relative flex justify-between border-b border-neutral-200/80 dark:border-neutral-800/80 pb-4 mb-6 text-xs font-bold text-neutral-400 dark:text-neutral-500 select-none">
                    {years.map((year, i) => (
                      <div
                        key={year}
                        className="flex flex-col items-center"
                        style={{
                          left: `${(i / (years.length - 1)) * 100}%`,
                          transform: i === 0 ? "none" : i === years.length - 1 ? "none" : "translateX(-50%)",
                        }}
                      >
                        <span className="text-neutral-800 dark:text-neutral-200 text-sm font-semibold tracking-tight">
                          {year}
                        </span>
                        <span className="text-[10px] text-neutral-400 dark:text-neutral-500 font-medium">
                          {year === endYear ? "Present" : `Q1 – Q4`}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Visual Grid Guide Lines & Logo Time Blocks */}
                  <div className="relative space-y-3">
                    {/* Vertical background grid lines */}
                    <div className="absolute inset-0 flex justify-between pointer-events-none opacity-40 dark:opacity-20">
                      {years.map((year, i) => (
                        <div
                          key={year}
                          className="h-full border-r border-dashed border-neutral-300/70 dark:border-neutral-700/70"
                          style={{ width: i === years.length - 1 ? "0px" : "100%" }}
                        />
                      ))}
                    </div>

                    {/* Time Blocks Rows */}
                    {processedWorks.map((work, index) => {
                      const isHovered = hoveredWorkId === work.id;
                      const isDimmed = hoveredWorkId !== null && !isHovered;

                      return (
                        <motion.div
                          key={work.id}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 0.5,
                            delay: index * 0.08,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                          className={`relative h-16 flex items-center group transition-opacity duration-300 ${
                            isDimmed ? "opacity-35" : "opacity-100"
                          }`}
                          onMouseEnter={() => setHoveredWorkId(work.id)}
                          onMouseLeave={() => setHoveredWorkId(null)}
                        >
                          {/* Visual Time Block Button (Logo Only) */}
                          <motion.button
                            onClick={() => handleSelectWork(work.id)}
                            style={{
                              left: `${work.leftPercent}%`,
                              width: `${work.widthPercent}%`,
                            }}
                            whileHover={{ scale: 1.02, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            transition={{ type: "spring", stiffness: 400, damping: 25 }}
                            className={`absolute h-14 rounded-2xl p-1.5 flex items-center justify-center border transition-all duration-300 cursor-pointer shadow-xs group/block ${
                              work.isActive
                                ? "bg-white dark:bg-neutral-800 border-neutral-300 dark:border-neutral-600 shadow-[0_4px_20px_rgba(0,0,0,0.06)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.4)] ring-1 ring-neutral-900/10 dark:ring-white/10 hover:border-neutral-900 dark:hover:border-neutral-400"
                                : "bg-neutral-50/90 dark:bg-neutral-800/50 border-neutral-200/80 dark:border-neutral-700/60 hover:bg-white dark:hover:bg-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600"
                            }`}
                          >
                            {/* Centered Logo Thumbnail */}
                            <div className="w-10 h-10 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200/70 dark:border-neutral-700/70 p-1.5 flex items-center justify-center shrink-0 shadow-xs pointer-events-none group-hover/block:scale-105 transition-transform">
                              <img
                                src={work.image}
                                alt={work.title}
                                className="max-w-full max-h-full object-contain rounded-md"
                                draggable={false}
                              />
                            </div>

                            {/* Active Indicator Pulse Pin */}
                            {work.isActive && (
                              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border-2 border-white dark:border-neutral-900"></span>
                              </span>
                            )}

                            {/* Hover Tooltip Preview with Title & Range */}
                            <AnimatePresence>
                              {isHovered && (
                                <motion.div
                                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                                  animate={{ opacity: 1, y: 0, scale: 1 }}
                                  exit={{ opacity: 0, y: 8, scale: 0.95 }}
                                  transition={{ duration: 0.15 }}
                                  className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 z-30 pointer-events-none px-3.5 py-2.5 rounded-xl bg-neutral-900/95 dark:bg-neutral-800/95 backdrop-blur-md text-white border border-neutral-800 dark:border-neutral-700 shadow-xl flex flex-col items-center gap-0.5 w-64 max-w-[280px] text-center"
                                >
                                  <span className="text-xs font-bold text-white truncate w-full block text-center" title={work.title}>
                                    {work.title}
                                  </span>
                                  <span className="text-[10px] text-neutral-400 font-medium truncate w-full block text-center" title={`${work.address} • ${work.rangeLabel}`}>
                                    {work.address} • {work.rangeLabel}
                                  </span>
                                  {work.description && (
                                    <span className="text-[10px] text-neutral-300 font-normal leading-tight mt-1 line-clamp-2 w-full text-center" title={work.description}>
                                      {work.description}
                                    </span>
                                  )}
                                  <span className="text-[9px] text-neutral-400 font-medium tracking-wide mt-1 opacity-90 whitespace-nowrap">
                                    Click to inspect details →
                                  </span>
                                  <div className="w-2 h-2 bg-neutral-900 dark:bg-neutral-800 border-r border-b border-neutral-800 dark:border-neutral-700 rotate-45 absolute -bottom-1 left-1/2 -translate-x-1/2" />
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </motion.button>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Legend & Stats Summary */}
              <div className="mt-6 flex flex-wrap items-center justify-between gap-4 px-2 text-xs text-neutral-500 dark:text-neutral-400">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    <span>Current / Ongoing Role</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-neutral-300 dark:bg-neutral-600" />
                    <span>Completed Milestone</span>
                  </div>
                  <span className="text-neutral-400 dark:text-neutral-500 italic">💡 Click any time block to view detailed description</span>
                </div>
                <div className="flex items-center gap-1.5 font-medium">
                  <Clock className="w-3.5 h-3.5 text-neutral-400 dark:text-neutral-500" />
                  <span>Timeline range: <strong className="text-neutral-700 dark:text-neutral-300">{startYear} – Present</strong> (~{totalSpan}+ years span)</span>
                </div>
              </div>
            </motion.div>
          ) : (
            /* Detailed Card List with Focus State */
            <motion.div
              key="cards-view"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-4"
            >
              {processedWorks.map((work, index) => {
                const isFocused = focusedWorkId === work.id;

                return (
                  <motion.div
                    key={work.id}
                    id={`work-card-${work.id}`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.45,
                      delay: index * 0.08,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    whileHover={{ y: -3 }}
                    className={`apple-glass-card rounded-2xl p-6 flex flex-col gap-4 group transition-all duration-300 ${
                      isFocused
                        ? "ring-2 ring-neutral-900 dark:ring-white border-neutral-900 dark:border-white shadow-md bg-neutral-50/40 dark:bg-neutral-800/40"
                        : ""
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                      {/* Organization & Role */}
                      <div className="flex items-start gap-4 flex-1">
                        <div className="w-14 h-14 rounded-2xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200/80 dark:border-neutral-700/80 p-2 flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform duration-300 self-start">
                          <img
                            src={work.image}
                            alt={work.address}
                            className="max-w-full max-h-full object-contain rounded-lg"
                            loading="lazy"
                            draggable={false}
                          />
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className="text-base md:text-lg font-bold text-neutral-900 dark:text-white tracking-tight">
                              {work.title}
                            </h3>
                            {work.isActive && (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 text-xs font-semibold border border-emerald-200 dark:border-emerald-800/60">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                Present
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-1.5 text-neutral-500 dark:text-neutral-400 text-xs md:text-sm mt-0.5 italic">
                            {work.address}
                          </div>
                          {/* Optional Work Description */}
                          {work.description && (
                            <p className="mt-4 text-sm text-justify text-neutral-600 dark:text-neutral-300 leading-relaxed font-normal">
                              {work.description}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Date Tag */}
                      <div className="sm:self-start shrink-0 flex flex-wrap items-center gap-2">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 text-xs font-semibold border border-neutral-200/60 dark:border-neutral-700/60">
                          <Calendar className="w-3 h-3 text-neutral-400 dark:text-neutral-500" />
                          {work.rangeLabel}
                        </span>
                        <span className="px-2.5 py-1 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-xs font-medium">
                          {work.durationLabel}
                        </span>
                      </div>
                    </div>

                    {/* Responsive Mini Time-Block Continuum Meter */}
                    <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800 flex flex-col gap-1.5">
                      <div className="flex justify-between items-center text-[10px] text-neutral-400 dark:text-neutral-500 font-semibold uppercase tracking-wider">
                        <span>{startYear}</span>
                        <span>Timeline Position</span>
                        <span>{endYear}</span>
                      </div>
                      <div className="relative w-full h-2 rounded-full bg-neutral-100 dark:bg-neutral-800 overflow-hidden">
                        <div
                          className={`absolute top-0 bottom-0 rounded-full transition-all duration-500 ${
                            work.isActive ? "bg-neutral-900 dark:bg-white" : "bg-neutral-400 dark:bg-neutral-600"
                          }`}
                          style={{
                            left: `${work.leftPercent}%`,
                            width: `${work.widthPercent}%`,
                          }}
                        />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Works;

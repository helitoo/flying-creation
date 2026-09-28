import { motion, type Variants } from "framer-motion";
import { ArrowDown, ArrowRight, Sparkles } from "lucide-react";

const Home = () => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <section
      id="home"
      className="relative w-full min-h-screen flex flex-col justify-center items-center px-6 pt-32 pb-20 overflow-hidden bg-white"
    >
      {/* Subtle Apple-style background glow & grid */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden">
        <div className="absolute w-[600px] h-[600px] bg-gradient-to-tr from-neutral-100 to-neutral-50 rounded-full blur-3xl opacity-70 -top-20" />
        <div className="absolute w-[500px] h-[500px] bg-gradient-to-br from-neutral-100/50 to-transparent rounded-full blur-3xl opacity-50 bottom-10" />
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-40" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-4xl mx-auto flex flex-col items-center text-center"
      >
        {/* Availability Badge */}
        <motion.div variants={itemVariants} className="mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-100 border border-neutral-200/80 text-neutral-700 text-xs font-semibold tracking-wide shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Open for Opportunities & Projects</span>
            <Sparkles className="w-3.5 h-3.5 text-neutral-400" />
          </div>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          variants={itemVariants}
          className="text-5xl sm:text-7xl md:text-8xl font-extrabold tracking-tight text-neutral-900 leading-[1.08] mb-6"
        >
          FLYING <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-neutral-900 via-neutral-700 to-neutral-500 bg-clip-text text-transparent">
            CREATION
          </span>
        </motion.h1>

        {/* Subtitle / Bio */}
        <motion.p
          variants={itemVariants}
          className="text-lg sm:text-xl md:text-2xl text-neutral-500 font-normal max-w-2xl leading-relaxed mb-4"
        >
          Hi, I&apos;m <span className="text-neutral-900 font-semibold">Cao Thái Bảo</span>.
        </motion.p>

        <motion.p
          variants={itemVariants}
          className="text-sm sm:text-base text-neutral-600 max-w-xl leading-relaxed mb-10"
        >
          Specializations in web development, management information systems, and design. Focus on highly practical, data-driven, and performance-assured web products.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-16"
        >
          <a
            href="#projects"
            className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-neutral-900 text-white text-sm font-semibold hover:bg-black shadow-[0_4px_14px_rgba(0,0,0,0.12)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.18)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Explore Projects</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </a>

          <a
            href="#works"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-neutral-100 text-neutral-800 text-sm font-semibold border border-neutral-200/80 hover:bg-neutral-200/70 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>View Experience</span>
          </a>

          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-neutral-700 text-sm font-semibold border border-neutral-200 hover:text-neutral-900 hover:border-neutral-300 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Get in Touch</span>
          </a>
        </motion.div>
      </motion.div>

      {/* Subtle Scroll Down Indicator */}
      <motion.a
        href="#works"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute bottom-6 flex flex-col items-center gap-2 text-neutral-400 hover:text-neutral-700 transition-colors"
      >
        <span className="text-[11px] font-medium tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="w-4 h-4" />
        </motion.div>
      </motion.a>
    </section>
  );
};

export default Home;

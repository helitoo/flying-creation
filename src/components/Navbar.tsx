import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { navItems } from "../data/nav";
import { ArrowUpRight, Menu, X } from "lucide-react";

const Navbar = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = navItems.map((item) => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4 md:pt-6 pointer-events-none"
      >
        <div
          className={`pointer-events-auto transition-all duration-300 ease-out rounded-full flex items-center justify-between gap-2 md:gap-8 px-4 md:px-6 py-2.5 max-w-4xl w-full ${
            isScrolled
              ? "bg-white/80 backdrop-blur-xl border border-neutral-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.06)]"
              : "bg-white/60 backdrop-blur-md border border-neutral-200/50 shadow-sm"
          }`}
        >
          {/* Brand Logo */}
          <a
            href="#home"
            className="flex items-center gap-2.5 group py-1"
          >
            <div className="w-7 h-7 rounded-full bg-neutral-900 flex items-center justify-center text-white text-xs font-bold tracking-wider group-hover:scale-105 transition-transform">
              B
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold tracking-tight text-neutral-900 leading-none">
                Cao Thái Bảo
              </span>
              <span className="text-[10px] text-neutral-400 font-medium tracking-wide uppercase mt-0.5">
                Flying Creation
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-neutral-100/80 p-1 rounded-full border border-neutral-200/60">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`relative px-4 py-1.5 text-xs font-semibold rounded-full transition-colors duration-200 ${
                    isActive
                      ? "text-neutral-900"
                      : "text-neutral-500 hover:text-neutral-900"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute inset-0 bg-white rounded-full shadow-sm border border-neutral-200/50"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </a>
              );
            })}
          </nav>

          {/* Right Action Button */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="https://github.com/helitoo"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-600 hover:text-neutral-900 px-3.5 py-1.5 rounded-full hover:bg-neutral-100 transition-colors"
            >
              <span>GitHub</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center text-xs font-semibold bg-neutral-900 text-white px-4 py-1.5 rounded-full hover:bg-black hover:scale-[1.02] active:scale-[0.98] transition-all shadow-sm"
            >
              Contact
            </a>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-neutral-700 hover:text-neutral-900 rounded-full hover:bg-neutral-100 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-4 top-20 z-40 bg-white/95 backdrop-blur-2xl rounded-3xl p-6 border border-neutral-200 shadow-2xl md:hidden"
          >
            <div className="flex flex-col gap-3">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-base font-semibold py-2.5 px-4 rounded-xl transition-colors ${
                    activeSection === item.id
                      ? "bg-neutral-100 text-neutral-900"
                      : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50"
                  }`}
                >
                  {item.label}
                </a>
              ))}
              <div className="h-px bg-neutral-100 my-1" />
              <div className="flex gap-2 pt-1">
                <a
                  href="https://github.com/helitoo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center py-2.5 rounded-full border border-neutral-200 text-xs font-semibold text-neutral-800"
                >
                  GitHub
                </a>
                <a
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex-1 text-center py-2.5 rounded-full bg-neutral-900 text-white text-xs font-semibold"
                >
                  Contact
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;

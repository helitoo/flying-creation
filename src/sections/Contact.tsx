import { motion } from "framer-motion";
import { contacts } from "../data/contacts";
import ContactInfo from "../components/ContactInfo";
import { Mail, MessageSquare, ArrowUp } from "lucide-react";

const Contact = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section id="contact" className="w-full pt-28 pb-16 px-6 bg-white border-t border-neutral-100">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 text-neutral-600 text-xs font-semibold tracking-wider uppercase mb-3">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Get in Touch</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 mb-3">
            Let&apos;s Connect
          </h2>
          <p className="text-neutral-500 text-base md:text-lg max-w-lg mx-auto">
            Whether you have a question, a project in mind, or simply want to chat technology, feel free to reach out.
          </p>
        </motion.div>

        {/* Quick Email Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-3xl bg-neutral-900 text-white p-8 md:p-10 text-center mb-12 shadow-xl relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[radial-gradient(#333_1px,transparent_1px)] [background-size:16px_16px] opacity-20 pointer-events-none" />
          <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-3 relative z-10">
            Have a project or opportunity?
          </h3>
          <p className="text-neutral-400 text-sm md:text-base max-w-md mx-auto mb-6 relative z-10">
            I am always eager to collaborate on innovative products, open-source initiatives, and impactful software engineering projects.
          </p>
          <a
            href="mailto:bao162006@gmail.com"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-neutral-900 font-semibold text-sm hover:bg-neutral-100 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-md relative z-10"
          >
            <Mail className="w-4 h-4" />
            <span>Send Direct Email</span>
          </a>
        </motion.div>

        {/* Contacts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-20">
          {contacts.map((contact, index) => (
            <ContactInfo key={contact.name} contact={contact} index={index} />
          ))}
        </div>

        {/* Minimal Apple-style Footer */}
        <div className="pt-8 border-t border-neutral-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500 font-medium">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-neutral-900">Cao Thái Bảo</span>
            <span>—</span>
            <span>Flying Creation © {new Date().getFullYear()}</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1 text-neutral-600 hover:text-neutral-900 transition-colors p-1"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

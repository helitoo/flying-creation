import { useState } from "react";
import { motion } from "framer-motion";
import type { ContactItem } from "../data/contacts";
import { ArrowUpRight, Check, Copy } from "lucide-react";

interface ContactInfoProps {
  contact: ContactItem;
  index: number;
}

const ContactInfo = ({ contact, index }: ContactInfoProps) => {
  const [copied, setCopied] = useState(false);
  const isEmail = contact.name.includes("@");

  const handleCopy = (e: React.MouseEvent) => {
    if (isEmail) {
      e.preventDefault();
      navigator.clipboard.writeText(contact.name);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const Content = (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.4,
        delay: index * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{ y: -3 }}
      className="apple-glass-card rounded-2xl p-4 md:p-5 flex items-center justify-between group cursor-pointer w-full transition-all"
    >
      <div className="flex items-center gap-4 min-w-0">
        <div className="w-11 h-11 rounded-xl bg-neutral-100/80 dark:bg-neutral-800 border border-neutral-200/80 dark:border-neutral-700/80 flex items-center justify-center text-neutral-800 dark:text-neutral-200 shrink-0 group-hover:bg-neutral-900 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-neutral-900 transition-colors duration-300">
          <div className="w-5 h-5 flex items-center justify-center [&>svg]:w-5 [&>svg]:h-5">
            {contact.icon}
          </div>
        </div>

        <div className="flex flex-col min-w-0">
          <span className="text-xs font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider">
            {isEmail ? "Email Address" : "Profile Link"}
          </span>
          <span className="text-sm md:text-base font-semibold text-neutral-900 dark:text-white truncate group-hover:text-black dark:group-hover:text-white">
            {contact.name}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2 pl-3 shrink-0">
        {isEmail && (
          <button
            onClick={handleCopy}
            title="Copy email to clipboard"
            className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-400 dark:text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors"
          >
            {copied ? (
              <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </button>
        )}
        <div className="w-8 h-8 rounded-full flex items-center justify-center text-neutral-400 dark:text-neutral-500 group-hover:text-neutral-900 dark:group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all">
          <ArrowUpRight className="w-4 h-4" />
        </div>
      </div>
    </motion.div>
  );

  if (contact.url) {
    return (
      <a
        href={contact.url}
        target={isEmail ? "_self" : "_blank"}
        rel="noopener noreferrer"
        className="block w-full focus:outline-none"
      >
        {Content}
      </a>
    );
  }

  return (
    <div onClick={handleCopy} className="block w-full">
      {Content}
    </div>
  );
};

export default ContactInfo;

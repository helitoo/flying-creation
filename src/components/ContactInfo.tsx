import React, { useRef } from "react";
import { gsap } from "gsap";
import type { ContactItem } from "../data/contacts";

const ContactInfo = ({
  contact,
  ...props
}: {
  contact: ContactItem;
} & React.HTMLAttributes<HTMLElement>) => {
  const bgRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLElement>(null);
  const delayRef = useRef<gsap.core.Tween | null>(null);

  const handleMouseEnter = () => {
    delayRef.current = gsap.delayedCall(0.1, () => {
      gsap.to(textRef.current, {
        color: "#ffffff",
        duration: 0.2,
      });

      gsap.fromTo(
        bgRef.current,
        {
          scaleX: 0,
          transformOrigin: "left center",
        },
        {
          scaleX: 1,
          duration: 0.2,
          ease: "power2.out",
        },
      );
    });
  };

  const handleMouseLeave = () => {
    delayRef.current?.kill();

    gsap.killTweensOf(bgRef.current);
    gsap.killTweensOf(textRef.current);

    gsap.to(textRef.current, {
      color: "#1e293b", // slate-800
      duration: 0.2,
    });

    gsap.to(bgRef.current, {
      scaleX: 0,
      transformOrigin: "left center",
      duration: 0.2,
      ease: "power2.in",
    });
  };

  const itemClassName =
    "contact-info relative flex items-center gap-4 text-sky-400 py-2 pl-5 border-l-5 border-sky-400 overflow-hidden cursor-pointer text-slate-800";

  const itemContent = (
    <>
      {/* Animated background overlay */}
      <div
        ref={bgRef}
        className="absolute inset-0 bg-sky-400 pointer-events-none"
        style={{ transform: "scaleX(0)", transformOrigin: "left center" }}
      />

      {/* Content stays above the bg */}
      <div className="relative z-10 text-2xl flex items-center justify-center w-8 h-8">
        {contact.icon}
      </div>
      <span className="relative z-10 font-medium text-lg">{contact.name}</span>
    </>
  );

  return contact.url ? (
    <a
      ref={textRef as React.RefObject<HTMLAnchorElement>}
      href={contact.url}
      target="_blank"
      rel="noopener noreferrer"
      className={itemClassName}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {itemContent}
    </a>
  ) : (
    <div
      ref={textRef as React.RefObject<HTMLDivElement>}
      className={itemClassName}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {itemContent}
    </div>
  );
};

export default ContactInfo;

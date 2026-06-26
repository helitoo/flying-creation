import { useGSAP } from "@gsap/react";
import { navItems } from "../data/nav";
import gsap from "gsap";
import { useRef } from "react";
import { handleEnter, handleLeave } from "../utils";

const Navbar = () => {
  const navRef = useRef(null);

  useGSAP(
    () => {
      gsap.fromTo(
        "#navbar a",
        {
          y: -500,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.4,
          ease: "power2.out",
          stagger: 0.1,
        },
      );
    },
    { scope: navRef },
  );

  return (
    <nav
      id="navbar"
      ref={navRef}
      className="w-full flex gap-3 justify-center items-center"
    >
      {navItems.map((item, i) => (
        <a
          key={i}
          href={`#${item.id}`}
          className="text-white font-bold"
          onMouseEnter={handleEnter}
          onMouseLeave={handleLeave}
        >
          {item.label}
        </a>
      ))}
    </nav>
  );
};

export default Navbar;

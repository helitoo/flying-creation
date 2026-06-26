import { useGSAP } from "@gsap/react";
import Navbar from "../components/Navbar";
import { SplitText } from "gsap/SplitText";
import gsap from "gsap";
import { changeAppBgColor } from "../utils";
import type { RefObject } from "react";
import type { CameraControls } from "@react-three/drei";

const Home = () => {
  useGSAP(() => {
    changeAppBgColor("#home-title", "#74D4FF");

    const timeline = gsap.timeline();
    let repeatTimes = 0;

    const split = new SplitText("#home-title", { type: "lines, chars" });

    timeline.fromTo(
      split.chars,
      {
        y: 500,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.4,
        ease: "power2.out",
        stagger: 0.05,
      },
    );

    timeline.fromTo(
      "#down-arrow",
      {
        y: -50,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
        yoyo: true,
        repeat: -1,
        onRepeat: () => {
          repeatTimes++;
          if (repeatTimes % 2 !== 0)
            gsap.fromTo(
              "#arrow-ripple",
              { scale: 1, opacity: 0.8 },
              { scale: 2.5, opacity: 0, duration: 0.5, ease: "power2.out" },
            );
        },
      },
    );
  });

  return (
    <section id="home" className="w-full min-h-screen pt-30">
      <Navbar />
      <h1
        id="home-title"
        className="text-white text-center font-extrabold text-8xl mt-5 text-shadow-md"
      >
        FLYING CREATION
      </h1>

      <div className="relative flex items-center justify-center mt-30">
        <svg
          id="down-arrow"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-arrow-down text-white size-10 relative z-10"
        >
          <path d="M12 5v14" />
          <path d="m19 12-7 7-7-7" />
        </svg>
        <div
          id="arrow-ripple"
          className="absolute rounded-full border-2 border-white w-10 h-10 z-0 opacity-0"
        />
      </div>
    </section>
  );
};

export default Home;

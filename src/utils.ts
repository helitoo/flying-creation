import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export const handleEnter = (e: any) => {
  gsap.killTweensOf(e.currentTarget);
  gsap.to(e.currentTarget, {
    y: -7,
    duration: 0.3,
  });
};

export const handleLeave = (e: any) => {
  gsap.killTweensOf(e.currentTarget);
  gsap.to(e.currentTarget, {
    y: 0,
    duration: 0.3,
  });
};

export const changeAppBgColor = (
  trigger: string,
  color: string,
  start = "top top",
) => {
  ScrollTrigger.create({
    trigger: trigger,
    start: start,

    onEnter: () => {
      gsap.to("#app", {
        backgroundColor: color,
      });
    },

    onEnterBack: () => {
      gsap.to("#app", {
        backgroundColor: color,
      });
    },
  });
};

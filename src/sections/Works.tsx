import { works } from "../data/works";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import gsap from "gsap";
import { changeAppBgColor, handleEnter, handleLeave } from "../utils";

const Works = () => {
  const listRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    changeAppBgColor("#works-title", "#00BCFF", "top 50%");

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: "#works-title",
        start: "top 85%",
        // onEnter: () => {
        //   cameraControls.current?.setLookAt(
        //     -9.850651840925739,
        //     7.096796694566968,
        //     31.259927302669162,
        //     -26.798038350337034,
        //     6.59118352591671,
        //     -1.3438694398498325,
        //     true,
        //   );
        // },
      },
    });

    timeline.fromTo(
      "#works-title",
      {
        opacity: 0,
        x: -50,
      },
      {
        opacity: 1,
        x: 0,
        duration: 0.3,
        ease: "power2.out",
      },
      "<",
    );

    timeline.fromTo(
      "#works-subscription",
      {
        opacity: 0,
        x: -50,
      },
      {
        opacity: 1,
        x: 0,
        duration: 0.3,
        ease: "power2.out",
      },
      "<+=0.2",
    );

    const container = listRef.current;
    if (!container) return;

    // Select từng phần tử cần animate
    const dots = container.querySelectorAll(".work-dot");
    const cards = container.querySelectorAll(".work-card");
    const lines = container.querySelectorAll(".work-line");

    // Set trạng thái ban đầu — ẩn tất cả
    gsap.set([dots, cards], {
      opacity: 0,
      y: -20,
    });
    gsap.set(lines, {
      opacity: 0,
      scaleY: 0,
      transformOrigin: "top center",
    });

    // Từng work: dot + card animate cùng lúc, stagger giữa các work
    timeline
      .to(
        dots,
        {
          opacity: 1,
          y: 0,
          duration: 0.3,
          stagger: 0.2,
        },
        "<+=0.1",
      )
      .to(
        cards,
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.2,
        },
        "<",
      )

      // Line animate CUỐI CÙNG, sau tất cả work đã hiện
      .to(lines, {
        opacity: 1,
        scaleY: 1,
        duration: 0.2,
        stagger: 0.1,
        ease: "power1.inOut",
      });
  });

  return (
    <section id="works" className="w-full min-h-screen px-5">
      <h2
        id="works-title"
        className="text-white font-extrabold text-4xl md:text-6xl"
      >
        Experience
      </h2>
      <h3 id="works-subscription" className="text-white font-extrabold">
        Cao Thái Bảo
      </h3>
      <div ref={listRef} className="md:ml-10 md:mr-5 mt-5 space-y-8">
        {works.map((work, i) => (
          <div key={i} className="flex gap-2 md:gap-6 w-full md:w-125 shrink-0">
            <div className="relative flex flex-col items-center">
              {/* Dot */}
              <div className="work-dot z-10 flex items-center justify-center size-15 rounded-full bg-white shadow-lg">
                <img
                  src={work.image}
                  alt={work.title}
                  draggable={false}
                  className="size-10 object-contain"
                />
              </div>

              {/* Line */}
              {i < works.length - 1 && (
                <div className="work-line absolute top-10 w-1 h-[calc(100%+2rem-40px)] bg-white" />
              )}
            </div>

            {/* Content */}
            <div
              className="work-card flex-1 rounded-xl p-2 md:p-4 shadow-lg bg-white"
              onMouseEnter={handleEnter}
              onMouseLeave={handleLeave}
            >
              <h3 className="font-semibold">{work.title}</h3>

              <p className="text-xs md:text-sm text-slate-400">
                {work.address}
              </p>

              <p className="mt-2 text-xs md:text-sm font-medium">
                {work.duration}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Works;

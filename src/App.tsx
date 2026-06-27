import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

import Home from "./sections/Home";
import Works from "./sections/Works";
import Projects from "./sections/Projects";
import Contact from "./sections/Contact";
import { Canvas } from "@react-three/fiber";
import Model from "./components/Model";
import { CameraControls } from "@react-three/drei";
import { useGSAP } from "@gsap/react";
import { getCameraAt, type Section } from "./data/nav";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(SplitText);

const App = () => {
  const isMobile = window.matchMedia("(max-width: 767px)").matches;

  const containerRef = useRef<HTMLDivElement>(null);
  const cameraControls = useRef<CameraControls>(null!);

  const moveCamera = (section: Section) => {
    const [px, py, pz, tx, ty, tz] = getCameraAt(section);

    cameraControls.current?.setLookAt(px, py, pz, tx, ty, tz, true);
  };

  useGSAP(() => {
    const triggers = [
      ScrollTrigger.create({
        trigger: "#works-title",
        start: "top center",
        end: "bottom center",
        scrub: 1,
        onEnter: () => moveCamera("works"),
        onLeaveBack: () => moveCamera("home"),
      }),

      ScrollTrigger.create({
        trigger: "#projects-title",
        start: "top center",
        end: "bottom center",
        scrub: 1,
        onEnter: () => moveCamera("projects"),
        onLeaveBack: () => moveCamera("works"),
      }),

      ScrollTrigger.create({
        trigger: "#contact-title",
        start: "top center",
        end: "bottom center",
        scrub: 1,
        onEnter: () => moveCamera("contact"),
        onLeaveBack: () => moveCamera("projects"),
      }),
    ];

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, []);

  return (
    <div
      id="app"
      ref={containerRef}
      style={{ background: "#74D4FF" }}
      className="relative w-full min-h-screen bg-transparent"
    >
      {/* Canvas cố định làm nền */}
      <div className="fixed top-0 left-0 w-full h-dvh z-0 pointer-events-none">
        <Canvas
          className="w-full h-full"
          camera={{
            position: getCameraAt("home").slice(0, 3) as [
              number,
              number,
              number,
            ],
            fov: 50,
          }}
          onCreated={({ camera }) => {
            camera.lookAt(
              ...(getCameraAt("home").slice(3) as [number, number, number]),
            );
            camera.updateProjectionMatrix();
          }}
        >
          <CameraControls
            ref={(controls) => {
              if (!controls) return;
              cameraControls.current = controls;
              moveCamera("home");
            }}
          />
          <ambientLight intensity={2} />
          <directionalLight position={[5, 5, 5]} intensity={2} />
          <Model scale={isMobile ? 0.8 : 1} />
        </Canvas>
      </div>

      {/* Các section scroll bình thường phía trên */}
      <div className="relative z-10 w-full">
        <Home />
        <Works />
        <Projects />
        <Contact />
      </div>
    </div>
  );
};

export default App;

import { useRef } from "react";
import { contacts } from "../data/contacts";
import ContactInfo from "../components/ContactInfo";
import { useGSAP } from "@gsap/react";
import { changeAppBgColor } from "../utils";
import gsap from "gsap";

const Contact = () => {
  const listRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    changeAppBgColor("#contact-title", "white", "top 50%");

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: "#contact-title",
        start: "top 85%",
      },
    });

    timeline.fromTo(
      "#contact-title",
      {
        y: -50,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.4,
        ease: "power2.out",
      },
    );

    timeline.fromTo(
      "#contact-subscription",
      {
        y: -50,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.2,
        ease: "power2.out",
      },
      "<+=0.1",
    );

    const container = listRef.current;
    if (!container) return;

    const projects = container.querySelectorAll(".contact-info");

    projects.forEach((project) =>
      gsap.set(project, {
        opacity: 0,
        y: -10,
      }),
    );

    timeline.to(
      projects,
      { opacity: 1, y: 0, duration: 0.4, stagger: 0.1 },
      "<+=0.1",
    );
  });

  return (
    <section id="contact" className="w-full min-h-screen pl-10 pr-5 pb-10">
      <h2
        id="contact-title"
        className="text-slate-800 font-extrabold text-4xl md:text-6xl mt-10"
      >
        Hope to <br className="md:hidden" />
        see you
      </h2>
      <h3
        id="contact-subscription"
        className="text-slate-800 font-extrabold mt-3"
      >
        Cao Thái Bảo
      </h3>
      <div
        ref={listRef}
        className="mt-5 md:m-5 md:ml-30 md:mr-30 flex flex-col"
      >
        {contacts.map((item, index) => (
          <ContactInfo contact={item} key={index} />
        ))}
      </div>
      <p className="mt-30 text-slate-800">
        Thank you,{" "}
        <a
          href="https://sketchfab.com/medraphc"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-blue-600 hover:text-blue-800 hover:underline truncate"
        >
          Mohamed Fsili
        </a>
        , for this amazing model.
      </p>
    </section>
  );
};

export default Contact;

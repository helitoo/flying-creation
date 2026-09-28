export type WorkITem = {
  image: string
  address: string
  title: string
  description?: string
  start: string
  end: string
}

export const works: WorkITem[] = [
  {
    image: "/works/catspeak-logo.jpg",
    address: "Catspeak",
    title: "IT Developer",
    start: "2026-06",
    end: "present"
  },
  {
    image: "/works/uit-logo.png",
    address: "BEI Lab - University of Information Technology (UIT)",
    title: "Member of Team Art",
    description: "Build 3D models of the school and lab products using Unity, Blender, and SketchUp",
    start: "2026-09",
    end: "present",
  },
  {
    image: "/works/uit-logo.png",
    address: "Communications and Admissions Counseling Department - University of Information Technology (UIT)",
    title: "Software development partner",
    description: "Developing a 360-degree (panorama) web application and 3D model of the University of Information Technology (UIT)",
    start: "2026-03",
    end: "2026-08",
  },
  {
    image: "/works/gamapp-logo.jpg",
    address: "UIT GamApp Studios (Academic club)",
    title: "Member of Team Art",
    start: "2025",
    end: "present"
  },
  {
    image: "/works/bht-logo.png",
    address: "Academic club - Department of Information Systems",
    title: "Head of Media & Communications",
    start: "2025",
    end: "2026-09"
  },
  {
    image: "/works/uit-logo.png",
    address: "University of Information technology (UIT) - VNU-HCM",
    title: "Banchelor in Management Information Systems",
    start: "2024",
    end: "present"
  },
]

export type ProjectItem = {
  image?: string
  name: string
  duration: string
  description: string
  techs: string[]
  github?: string
  demo?: string
}

export const projects: ProjectItem[] = [
  {
    image: "/projects/silic.png",
    name: "Silic",
    duration: "Aug 26, 2026",
    description: "Silic is a Multi-Attribute Knowledge Graph Note-Taking App. Silic supports multi-step queries, advanced queries, graph plotting, data analysis, can operate offline, and integrates with Google Drive™.",
    techs: [
      "https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB",
    ],
    github: "https://github.com/helitoo/silic",
    demo: "https://silic.kemlib.com/",
  },
  {
    image: "/projects/iton.png",
    name: "IT-Obsidian-Notebook",
    duration: "Sep 26, 2025 – Present",
    description: "An Obsidian-based IT documents.",
    techs: [
      "https://img.shields.io/badge/Obsidian-%23483699.svg?style=for-the-badge&logo=obsidian&logoColor=white",
      "https://img.shields.io/badge/markdown-%23000000.svg?style=for-the-badge&logo=markdown&logoColor=white",
      "https://img.shields.io/badge/latex-%23008080.svg?style=for-the-badge&logo=latex&logoColor=white",
    ],
    github: "https://github.com/helitoo/IT-Obsidian-Notebook",
    demo: "https://iton-notebook.vercel.app/",
  },
  {
    image: "/projects/uit-imap-logo.png",
    name: "UIT iMap",
    duration: "Apr 20, 2026 – Aug 16, 2026",
    description:
      "A 3D map web application of the University of Information Technology (UIT) combined with 360-degree panoramic photos. Allows students, visitors, and others to quickly search for classrooms, buildings, and directions.",
    techs: [
      "https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB",
      "https://img.shields.io/badge/radix%20ui-161618.svg?style=for-the-badge&logo=radix-ui&logoColor=white",
      "https://img.shields.io/badge/model%20viewer-%23666666.svg?style=for-the-badge&logo=google&logoColor=%23ffffff",
      "https://img.shields.io/badge/marzipano-%2324a8e0.svg?style=for-the-badge",
      "https://img.shields.io/badge/Driver.js-%23ffe74d.svg?style=for-the-badge",
    ],
    github: "https://github.com/UIT-iMap/uit-imap",
    demo: "https://link.uit.edu.vn/UIT-360",
  },
  {
    name: "reposearcher",
    duration: "Jun 21, 2026",
    description:
      "AI-powered technical interviewer that analyzes your source code and conducts realistic interviews based on your actual codebase.",
    techs: [
      "https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E",
      "https://img.shields.io/badge/node.js-6DA55F.svg?style=for-the-badge&logo=node.js&logoColor=white",
    ],
    github: "https://github.com/helitoo/reposearcher",
  },
  {
    image: "/projects/btvh-logo.png",
    name: "Museum of Vietnamese Culture",
    duration: "Feb 11, 2026 – Mar 15, 2026",
    description:
      "A digital archive for searching information about ancient artifacts in Vietnam. Support for Vietnamese, English, Chinese, Japanese, and Korean languages.",
    techs: [
      "https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white",
      "https://img.shields.io/badge/Google%20Sheets-%2334A853?style=for-the-badge&logo=googlesheets&logoColor=white",
      "https://img.shields.io/badge/Google%20Drive-4285F4?style=for-the-badge&logo=googledrive&logoColor=white",
    ],
    github: "https://github.com/helitoo/bao-tang-van-hoa",
    demo: "https://btvh.vercel.app",
  },
  {
    image: "/projects/cdh-logo.png",
    name: "University gateway",
    duration: "Jul 29, 2025 – Jan 4, 2026",
    description:
      "An university admission data platform for Vietnamese students with search, client-side SQL queries, and interactive chart visualization features. Collected, cleaned, and processed 100,000+ records.",
    techs: [
      "https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white",
      "https://img.shields.io/badge/shadcn/ui-%23000000?style=for-the-badge&logo=shadcnui&logoColor=white",
      "https://img.shields.io/badge/tiptap-%23000000?style=for-the-badge",
      "https://img.shields.io/badge/Boring_Avatars-fad623?style=for-the-badge",
      "https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white",
      "https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white",
      "https://img.shields.io/badge/duckdb-fff200?style=for-the-badge&logo=duckdb&logoColor=black",
      "https://img.shields.io/badge/-selenium-%43B02A?style=for-the-badge&logo=selenium&logoColor=white",
      "https://img.shields.io/badge/Sentence_Transformers-FFD21E?style=for-the-badge&logo=huggingface&logoColor=white",
    ],
    github: "https://github.com/helitoo/cong-dai-hoc",
    demo: "https://cong-dai-hoc.vercel.app",
  },
]

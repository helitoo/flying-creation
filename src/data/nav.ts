export type NavItem = {
  label: string;
  id: string;
};

export const navItems: NavItem[] = [
  {
    label: "Home",
    id: "home",
  },
  {
    label: "Experience",
    id: "works",
  },
  {
    label: "Projects",
    id: "projects",
  },
  {
    label: "Contact",
    id: "contact",
  },
];

export type Section = "home" | "works" | "projects" | "contact";

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

export const getCameraAt = (
  section: Section,
): [number, number, number, number, number, number] => {
  switch (section) {
    case "home":
      return [
        -16.655175499157195, 6.518403712961331, 20.51096165592421,
        3.075174089760243, 10.435930530910104, 2.4801485398251346,
      ];
    case "works":
      return [
        -9.850651840925739, 7.096796694566968, 31.259927302669162,
        -26.798038350337034, 6.59118352591671, -1.3438694398498325,
      ];
    case "projects":
      return [
        9.981260548632003, 27.745903073667346, 12.456583633900223,
        21.66304664688049, 9.544098690151127, -17.25380692129386,
      ];
    default:
      return [
        -9.850651840925739, 7.096796694566968, 31.259927302669162,
        -26.798038350337034, 6.59118352591671, -1.3438694398498325,
      ];
  }
};

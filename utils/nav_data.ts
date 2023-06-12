interface TopBarOptionShape {
  title: string;
  route: string;
}

export const TOP_BAR_OPTIONS: TopBarOptionShape[] = [
  {
    title: "Download",
    route: "/download",
  },
  {
    title: "Docs",
    route: "/docs/basics",
  },
  {
    title: "Playground",
    route: "/playground",
  },
  {
    title: "Github",
    route: "https://github.com/spino17/jarvil",
  },
];

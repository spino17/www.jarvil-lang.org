export interface DocsNavBarEntryShape {
  name: string;
  _sub_data: DocsNavBarEntryShape[] | null;
  route: string;
}

export const NAV_BAR_STRUCTURE: DocsNavBarEntryShape[] = [
  {
    name: "Basics",
    _sub_data: null,
    route: "/docs/basics",
  },
  {
    name: "Everyday Types",
    _sub_data: null,
    route: "/docs/",
  },
  {
    name: "User-defined Types",
    _sub_data: null,
    route: "/docs/user-defined-types",
  },
  {
    name: "Structural Typing",
    _sub_data: null,
    route: "/docs/structural-typing",
  },
  {
    name: "Scoping",
    _sub_data: null,
    route: "/docs/user-defined-types",
  },
  {
    name: "Lambdas",
    _sub_data: null,
    route: "/docs/lambdas",
  },
];

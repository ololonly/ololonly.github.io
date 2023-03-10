import { configure, observable } from "mobx";

configure({ enforceActions: "never" });

export enum MenuId {
  About = "about",
  Skills = "skills",
  Achievements = "achievements",
  Projects = "projects",
}

export interface MenuItem {
  id: MenuId;
  name: string;
}

export interface MenuStructure {
  activeItem: MenuId;
  items: MenuItem[];
}

const MENU_CONFIG: MenuStructure = {
  activeItem: MenuId.Projects,
  items: [
    {
      id: MenuId.About,
      name: "About",
    },
    {
      id: MenuId.Projects,
      name: "Projects",
    },
    {
      id: MenuId.Achievements,
      name: "Achievements",
    },
    {
      id: MenuId.Skills,
      name: "Skills",
    },
  ],
};

interface State {
  Menu: MenuStructure;
}

const state: State = {
  Menu: MENU_CONFIG,
};

export default observable(state);

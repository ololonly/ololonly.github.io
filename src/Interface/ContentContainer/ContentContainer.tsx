import { observer } from "mobx-react-lite";
import React from "react";
import state, { MenuId } from "../../mobx/state";
import About from "../MenuPages/About/About";
import AchievementsBlock from "../MenuPages/Achievements/AchievementsBlock";
import ProjectsBlock from "../MenuPages/Projects/ProjectsBlock";
import SubLeft from "../SubLeft/SubLeft";
import "./styles.less";

export interface MenuComponentsProps {
  animationClassName: string;
}

const MENU_MAP: Record<MenuId, React.FC<MenuComponentsProps>> = {
  [MenuId.About]: About,
  [MenuId.Achievements]: AchievementsBlock,
  [MenuId.Skills]: AchievementsBlock,
  [MenuId.Projects]: ProjectsBlock,
};

const ContentContainer: React.FC = observer(() => {
  const ActiveTab = MENU_MAP[state.Menu.activeItem];

  return (
    <div className="main-container">
      <div className="sub-left">
        <SubLeft />
      </div>
      <div className="sub-right">
        <ActiveTab animationClassName="content-animated" />
      </div>
    </div>
  );
});

export default ContentContainer;

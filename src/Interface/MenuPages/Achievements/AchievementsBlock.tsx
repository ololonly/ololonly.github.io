import classNames from "classnames";
import { MenuComponentsProps } from "../../ContentContainer/ContentContainer";
import Achievement from "./Achievement";
import "./styles.less";

const AchievementsBlock: React.FC<MenuComponentsProps> = ({
  animationClassName,
}) => {
  const netLogo = require("../../../assets/skills/net.png");
  const reactLogo = require("../../../assets/skills/react.png");

  return (
    <div className={classNames("achievements-block", animationClassName)}>
      <Achievement name={".NET"} logo={netLogo} level={4} maxLevel={5} />
      <Achievement name={".NET"} logo={netLogo} level={4} maxLevel={5} />
      <Achievement name={".NET"} logo={netLogo} level={4} maxLevel={5} />
      <Achievement name={".NET"} logo={netLogo} level={4} maxLevel={5} />
      <Achievement name={".NET"} logo={netLogo} level={4} maxLevel={5} />
      <Achievement name={"React"} logo={reactLogo} level={3} maxLevel={10} />
      <Achievement name={"React"} logo={reactLogo} level={3} maxLevel={10} />
      <Achievement name={"React"} logo={reactLogo} level={3} maxLevel={10} />
    </div>
  );
};

export default AchievementsBlock;

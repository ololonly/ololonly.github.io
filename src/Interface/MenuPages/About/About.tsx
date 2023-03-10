import classNames from "classnames";
import React from "react";
import { MenuComponentsProps } from "../../ContentContainer/ContentContainer";
import "./styles.less";

const About: React.FC<MenuComponentsProps> = ({ animationClassName }) => {
  return (
    <div className={classNames("about-container", animationClassName)}>
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Recusandae sequi
      molestiae enim commodi nesciunt aliquam dicta aperiam necessitatibus
      consectetur. Ipsam?
    </div>
  );
};

export default About;

import React from "react";
import "./styles.less";

const SubLeft: React.FC = () => {
  const avatar = require("../../assets/personal/avatar.png");

  return (
    <div className="sub-left_container">
      <div className="sub-left_picture-container">
        <div className="sub-left_picture">
          <img src={avatar} alt="" />
        </div>
      </div>
    </div>
  );
};

export default SubLeft;

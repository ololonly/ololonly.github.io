import React from "react";
import Menu from "../Menu/Menu";
import "./styles.less";

type Props = {
  title: string;
  children?: React.ReactNode;
};

const Header: React.FC<Props> = ({ title, children }) => {
  return (
    <header>
      <div className="name">{title}</div>
      {children}
    </header>
  );
};

export default Header;

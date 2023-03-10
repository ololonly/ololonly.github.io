import classNames from "classnames";
import { observer } from "mobx-react-lite";
import React from "react";
import state, { MenuItem } from "../../mobx/state";
import "./styles.less";

type Props = {
  menuItem: MenuItem;
};

const MenuItem: React.FC<Props> = observer(({ menuItem }) => {
  return (
    <div
      className={classNames("menu-item", {
        "menu-item__active": state.Menu.activeItem === menuItem.id,
      })}
      onClick={() => {
        state.Menu.activeItem = menuItem.id;
      }}
    >
      {menuItem.name}
    </div>
  );
});

export default MenuItem;

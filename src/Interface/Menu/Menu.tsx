import { observer } from "mobx-react-lite";
import React from "react";
import { MenuStructure } from "../../mobx/state";
import MenuItem from "./MenuItem";
import "./styles.less";

type Props = {
  menu?: MenuStructure;
};

const Menu: React.FC<Props> = observer(({ menu }) => {
  if (!menu) return null;

  return (
    <div className="menu-container">
      {menu?.items.map((menuItem) => {
        return <MenuItem key={menuItem.id} menuItem={menuItem} />;
      })}
    </div>
  );
});

export default Menu;

import React from "react";
import { observer } from "mobx-react-lite";
import ContentContainer from "./Interface/ContentContainer/ContentContainer";
import Header from "./Interface/Header/Header";
import Menu from "./Interface/Menu/Menu";
import state from "./mobx/state";

const App: React.FC = observer(() => {
  return (
    <>
      <Header title="Ivan Kostiashov">
        <Menu menu={state.Menu} />
      </Header>
      <ContentContainer />
    </>
  );
});

export default App;

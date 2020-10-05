import React from "react";
import { ThemeProvider } from "emotion-theming";
import preset from "@rebass/preset";
import { Switch, Route } from "react-router";
import PrivateScope from "./components/PrivateScope";

import Chat from "./pages/Chat";
import SignIn from "./pages/SignIn";

function App() {
  return (
    <ThemeProvider theme={preset}>
      <Switch>
        <Route exact path="/authenticate" component={SignIn} />

        <PrivateScope>
          <Route exact path="/" component={Chat} />
        </PrivateScope>
      </Switch>
    </ThemeProvider>
  );
}

export default App;

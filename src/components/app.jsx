import React from "react";

import {
  App,
  Block,
  f7ready,
  Navbar,
  Page,
  Panel,
  View,
} from "framework7-react";

import routes from "../js/routes";
import store from "../js/store";

const MyApp = (props) => {
  const f7params = {
    name: "Thiền Viện Trúc Lâm",
    theme: "auto",
    store: store,
    routes: routes,
  };
  f7ready(() => {
    // Call F7 APIs here
  });

  return (
    <App {...f7params}>
      {/* Left panel with cover effect*/}
      <Panel left cover dark>
        <View>
          <Page>
            <Navbar title="Left Panel" />
            <Block>Left panel content goes here</Block>
          </Page>
        </View>
      </Panel>

      {/* Right panel with reveal effect*/}
      <Panel right reveal dark>
        <View>
          <Page>
            <Navbar title="Right Panel" />
            <Block>Right panel content goes here</Block>
          </Page>
        </View>
      </Panel>

      {/* Your main view, should have "view-main" class */}

      <View
        main
        className="safe-areas"
        url="/"
        browserHistory={true}
      />
    </App>
  );
};
export default MyApp;

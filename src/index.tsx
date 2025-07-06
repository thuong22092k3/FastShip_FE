import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import React from "react";
import { createRoot } from "react-dom/client";

import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Notifications } from "@mantine/notifications";
import { Provider } from "react-redux";
import App from "./App";
import { store } from "./state_management/store/store";

const container = document.getElementById("root");
const root = createRoot(container!);

const globalStyles = document.createElement("style");
globalStyles.innerHTML = `
  body {
    font-family: 'Roboto', sans-serif;
    margin: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`;
document.head.appendChild(globalStyles);

root.render(
  <React.StrictMode>
    <div
      style={{
        display: "flex",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <Provider store={store}>
        <MantineProvider>
          <Notifications position="bottom-right" />
          <App />
        </MantineProvider>
      </Provider>
    </div>
  </React.StrictMode>
);

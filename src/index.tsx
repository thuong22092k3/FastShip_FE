import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { MantineProvider, createTheme } from "@mantine/core";
import App from "./App";

const container = document.getElementById("root");
const root = createRoot(container!);

const theme = createTheme({
  /** Tùy chỉnh theme */
});

function Root() {
  const [colorScheme, setColorScheme] = useState<"light" | "dark">("light");

  return (
    <MantineProvider theme={theme} defaultColorScheme={colorScheme}>
      <App />
    </MantineProvider>
  );
}

root.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);

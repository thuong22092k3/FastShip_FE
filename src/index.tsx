import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { MantineProvider, createTheme } from "@mantine/core";
// Import font trước các import khác
import "@fontsource/roboto/400.css"; // Regular
import "@fontsource/roboto/500.css"; // Medium
import "@fontsource/roboto/700.css"; // Bold
import App from "./App";

const container = document.getElementById("root");
const root = createRoot(container!);

const theme = createTheme({
  fontFamily: "Roboto, sans-serif",
  fontFamilyMonospace: "Roboto Mono, monospace",
  headings: { fontFamily: "Roboto, sans-serif" },
});

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

import * as React from "react";
import { render } from "preact";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./theme";
import { ChatUI } from "./ChatUI";
import { MemoryProvider } from "./providers/MemoryProvider";
import { HistoryStateProvider } from "./context/HistoryState";

function App() {
  const memoryRef = React.useRef(MemoryProvider());

  return (
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <HistoryStateProvider provider={memoryRef.current}>
          <ChatUI />
        </HistoryStateProvider>
      </ThemeProvider>
    </React.StrictMode>
  );
}

render(<App />, document.getElementById("app"));

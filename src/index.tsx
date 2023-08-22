import * as React from "react";
import { render } from "preact";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./theme";
import { HistoryProvider } from "./context/MessageHistory";
import { ChatUI } from "./ChatUI";

export function Content() {
  const [count, setCount] = React.useState(0);

  return (
    <Box
      sx={{
        width: 1,
        height: 1,
        display: "grid",
        gap: 2,
        gridTemplateColumns: "repeat(2, 1fr)",
      }}
    >
      <ChatUI />
    </Box>
  );
}

function App() {
  return (
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <HistoryProvider>
          <ChatUI />
        </HistoryProvider>
      </ThemeProvider>
    </React.StrictMode>
  );
}

render(<App />, document.getElementById("app"));

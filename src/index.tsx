import * as React from "react";
import { render } from "preact";
import { Box, Button, Card } from "@mui/material";

export function App() {
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
      <Card sx={{ p: 2 }}>
        <h1>Vite + Preact + MUI</h1>
        <Button
          variant="contained"
          onClick={() => setCount((count) => count + 1)}
        >
          count is {count}
        </Button>
        <p>
          Edit <code>src/app.jsx</code> and save to test HMR
        </p>
      </Card>
    </Box>
  );
}

render(<App />, document.getElementById("app"));

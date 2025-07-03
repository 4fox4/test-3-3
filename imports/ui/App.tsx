import React from "react";
import { RouterProvider } from "react-router-dom";
import { THEME_ID, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import { theme } from "/imports/ui/theme/theme";
import { router } from "/imports/ui/router/router";

export function App() {
  return (
    <ThemeProvider theme={{ [THEME_ID]: theme }}>
      <CssBaseline enableColorScheme />
      <RouterProvider
        future={{
          v7_startTransition: true,
        }}
        router={router}
      />
    </ThemeProvider>
  );
}

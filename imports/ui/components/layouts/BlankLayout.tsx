import React from "react";
import { Outlet } from "react-router-dom";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

interface BlankLayoutProps {
  // children: React.ReactNode;
}

export const BlankLayout: React.FC<BlankLayoutProps> = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "background.default",
      }}
    >
      <Container
        component="main"
        maxWidth="sm"
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          py: 4,
        }}
      >
        <Outlet />
      </Container>
    </Box>
  );
};

import React from "react";
import { Outlet } from "react-router-dom";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

import { Header } from "/imports/ui/components/common/Header";
import { Footer } from "/imports/ui/components/common/Footer";

interface MainLayoutProps {
  // children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "background.default",
      }}
    >
      <Header />

      <Container
        component="main"
        maxWidth="lg"
        sx={{
          flex: 1,
          py: 4,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Outlet />
      </Container>

      <Footer />
    </Box>
  );
};

import React, { useState } from "react";
import { Navigate } from "react-router-dom";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { LoginForm } from "/imports/ui/components/forms/LoginForm";
import { RegisterForm } from "/imports/ui/components/forms/RegisterForm";
import { useAuth } from "/imports/ui/hooks/useAuth";

export const LoginPage: React.FC = () => {
  const { isLoggedIn, isLoading } = useAuth();
  const [isRegisterMode, setIsRegisterMode] = useState(false);

  // Rediriger vers l'accueil si déjà connecté
  if (isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  if (isLoading) {
    return (
      <Box textAlign="center">
        <Typography variant="h6">Chargement...</Typography>
      </Box>
    );
  }

  return (
    <>
      <Box sx={{ textAlign: "center", mb: 10 }}>
        <Typography
          variant="h1"
          component="h1"
          gutterBottom
          sx={{
            background: "-webkit-linear-gradient(#42a5f5, #1565c0)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          C∞nter
        </Typography>
      </Box>

      {isRegisterMode ? (
        <RegisterForm onSwitchToLogin={() => setIsRegisterMode(false)} />
      ) : (
        <LoginForm onSwitchToRegister={() => setIsRegisterMode(true)} />
      )}
    </>
  );
};

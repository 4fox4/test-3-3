import React, { useState } from "react";
import { useForm } from "react-hook-form";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";

import { useAuth, LoginCredentials } from "/imports/ui/hooks/useAuth";

interface LoginFormProps {
  onSwitchToRegister: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSwitchToRegister }) => {
  const { login } = useAuth();
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginCredentials>();

  const onSubmit = async (data: LoginCredentials) => {
    setIsLoading(true);
    setError("");

    try {
      await login(data);
    } catch (err: any) {
      console.error("Erreur de connexion:", err);
      setError("Email ou mot de passe incorrect");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{ p: 4, maxWidth: 400, mx: "auto" }}>
      <Typography variant="h3" component="h1" align="left">
        Se connecter
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        Gérez votre compteur personnel en temps réel
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
        <TextField
          size="small"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Adresse email"
          type="email"
          autoComplete="email"
          autoFocus
          {...register("email", {
            required: "L'email est requis",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Adresse email invalide",
            },
          })}
          error={!!errors.email}
          helperText={errors.email?.message}
        />

        <TextField
          size="small"
          margin="normal"
          required
          fullWidth
          label="Mot de passe"
          type="password"
          id="password"
          autoComplete="current-password"
          {...register("password", {
            required: "Le mot de passe est requis",
            minLength: {
              value: 6,
              message: "Le mot de passe doit contenir au moins 6 caractères",
            },
          })}
          error={!!errors.password}
          helperText={errors.password?.message}
        />

        <Button
          size="large"
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          disabled={isLoading}
          loading={isLoading}
        >
          {isLoading ? "Connexion..." : "Se connecter"}
        </Button>

        <Box textAlign="center">
          <Typography variant="body2">
            Pas encore de compte ?{" "}
            <Link
              component="span"
              sx={{ cursor: "pointer", color: "primary.main" }}
              variant="body2"
              onClick={(e) => {
                e.preventDefault();
                onSwitchToRegister();
              }}
            >
              S'inscrire
            </Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

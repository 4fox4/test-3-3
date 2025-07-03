import React, { useState } from "react";
import { useForm } from "react-hook-form";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import Link from "@mui/material/Link";

import { useAuth, RegisterData } from "/imports/ui/hooks/useAuth";

interface RegisterFormProps {
  onSwitchToLogin: () => void;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({
  onSwitchToLogin,
}) => {
  const { register: registerUser } = useAuth();
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RegisterData & { confirmPassword: string }>();

  const password = watch("password");

  const onSubmit = async (data: RegisterData & { confirmPassword: string }) => {
    setIsLoading(true);
    setError("");

    try {
      await registerUser({
        email: data.email,
        password: data.password,
        profile: {
          firstName: data.profile.firstName,
          lastName: data.profile.lastName,
        },
      });
    } catch (err: any) {
      console.error("Erreur d'inscription:", err);
      if (err.reason === "Email already exists.") {
        setError("Cette adresse email est déjà utilisée");
      } else {
        setError("Erreur lors de l'inscription. Veuillez réessayer.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{ p: 4, maxWidth: 500, mx: "auto" }}>
      <Typography variant="h3" component="h1" align="left">
        S'inscrire
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        Gérez votre compteur personnel en temps réel
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
        <Box sx={{ display: "flex", gap: 2, mb: 1, mt: 2 }}>
          <TextField
            size="small"
            required
            fullWidth
            id="firstName"
            label="Prénom"
            autoComplete="given-name"
            autoFocus
            {...register("profile.firstName", {
              required: "Le prénom est requis",
              minLength: {
                value: 2,
                message: "Le prénom doit contenir au moins 2 caractères",
              },
            })}
            error={!!errors.profile?.firstName}
            helperText={errors.profile?.firstName?.message}
          />

          <TextField
            size="small"
            required
            fullWidth
            id="lastName"
            label="Nom"
            autoComplete="family-name"
            {...register("profile.lastName", {
              required: "Le nom est requis",
              minLength: {
                value: 2,
                message: "Le nom doit contenir au moins 2 caractères",
              },
            })}
            error={!!errors.profile?.lastName}
            helperText={errors.profile?.lastName?.message}
          />
        </Box>

        <TextField
          size="small"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Adresse email"
          type="email"
          autoComplete="email"
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
          autoComplete="new-password"
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

        <TextField
          size="small"
          margin="normal"
          required
          fullWidth
          label="Confirmer le mot de passe"
          type="password"
          id="confirmPassword"
          autoComplete="new-password"
          {...register("confirmPassword", {
            required: "La confirmation du mot de passe est requise",
            validate: (value) =>
              value === password || "Les mots de passe ne correspondent pas",
          })}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword?.message}
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
          {isLoading ? "Inscription..." : "S'inscrire"}
        </Button>

        <Box textAlign="center">
          <Typography variant="body2">
            Déjà un compte ?{" "}
            <Link
              component="span"
              sx={{ cursor: "pointer", color: "primary.main" }}
              variant="body2"
              onClick={(e) => {
                e.preventDefault();
                onSwitchToLogin();
              }}
            >
              Se connecter
            </Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

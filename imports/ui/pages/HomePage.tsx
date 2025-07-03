import React, { useMemo, useState } from "react";
import { alpha } from "@mui/material/styles";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";

import { useAuth } from "/imports/ui/hooks/useAuth";
import {
  useMyCounter,
  useTopCounters,
  useCounterActions,
} from "/imports/ui/hooks/useCounters";
import { getUserFullName } from "/imports/api/users/users";
import { getTrophyColor, medals } from "../utils";

export const HomePage: React.FC = () => {
  const { user } = useAuth();
  const { counter, isLoading: counterLoading } = useMyCounter();
  const { topCounters, isLoading: topLoading } = useTopCounters();
  const { incrementCounter, decrementCounter } = useCounterActions();

  const [actionLoading, setActionLoading] = useState<
    "increment" | "decrement" | null
  >(null);
  const [error, setError] = useState<string>("");

  const handleIncrement = async () => {
    if (!counter) return;

    setActionLoading("increment");
    setError("");

    try {
      await incrementCounter(counter._id!);
    } catch (err: any) {
      console.error("Erreur incrémentation:", err);
      setError("Erreur lors de l'incrémentation");
    } finally {
      setActionLoading(null);
    }
  };

  const handleDecrement = async () => {
    if (!counter) return;

    setActionLoading("decrement");
    setError("");

    try {
      await decrementCounter(counter._id!);
    } catch (err: any) {
      console.error("Erreur décrémentation:", err);
      setError("Erreur lors de la décrémentation");
    } finally {
      setActionLoading(null);
    }
  };

  const counters = useMemo(() => {
    return new Array(3).fill(null).map((_, index) => {
      const counterData = topCounters[index];
      if (!counterData) return null;
      return counterData;
    });
  }, [topCounters]);

  if (counterLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="200px"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h4" component="h1" fontWeight={900} sx={{ mb: 2 }}>
        Bonjour {user ? getUserFullName(user) : "Utilisateur"} !
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 4,
        }}
      >
        {/* Compteur personnel */}
        <Box sx={{ flex: 1 }}>
          <Box
            sx={{
              display: "flex",
              gap: 3,
              justifyContent: "center",
              alignItems: "center",
              mt: 6,
              mb: 2,
            }}
          >
            <IconButton
              size="large"
              onClick={handleDecrement}
              disabled={actionLoading === "decrement"}
            >
              <RemoveIcon />
            </IconButton>

            <Typography
              variant="h1"
              component="div"
              sx={{
                fontSize: "4rem",
                fontWeight: "bold",
                color: "primary.main",
              }}
            >
              {counter?.value ?? 0}
            </Typography>

            <IconButton
              size="large"
              onClick={handleIncrement}
              disabled={actionLoading === "increment"}
            >
              <AddIcon />
            </IconButton>
          </Box>
        </Box>

        {/* Top 3 */}
        <Box sx={{ flex: 1 }}>
          <Paper variant="outlined" sx={{ height: "100%", p: 2, pb: 0 }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Typography variant="h5" component="h2" fontWeight={700}>
                <Box component="span" sx={{ mr: 2 }}>
                  🏆
                </Box>
                Top 3 des Compteurs
              </Typography>
            </Box>

            {topLoading ? (
              <Box display="flex" justifyContent="center" p={2}>
                <CircularProgress />
              </Box>
            ) : (
              <List>
                {counters.map((counterData, index) => (
                  <ListItem
                    key={`counter-${index}-${counterData?._id}`}
                    sx={{ px: 0 }}
                  >
                    <ListItemAvatar>
                      <Avatar
                        variant="rounded"
                        sx={{
                          bgcolor: alpha(getTrophyColor(index), 0.1),
                          color: getTrophyColor(index),
                        }}
                      >
                        <Box
                          component="span"
                          sx={{
                            fontSize: "1.5rem",
                            fontWeight: 900,
                          }}
                        >
                          {medals[index] || `#${index + 1}`}
                        </Box>
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                          }}
                        >
                          <Typography variant="body1">
                            {counterData?.userFullName || "-"}
                          </Typography>
                          {index === 0 && (
                            <EmojiEventsIcon
                              sx={{ color: "#FFD700", fontSize: 20 }}
                            />
                          )}
                        </Box>
                      }
                    />
                    {counterData?.value && (
                      <Typography
                        variant="body1"
                        sx={{
                          color: "text.secondary",
                          fontWeight: "bold",
                          ml: 2,
                        }}
                      >
                        {counterData.value}
                      </Typography>
                    )}
                  </ListItem>
                ))}
                {counters.length === 0 && (
                  <ListItem>
                    <ListItemText
                      primary="Aucun compteur disponible"
                      sx={{ textAlign: "center" }}
                    />
                  </ListItem>
                )}
              </List>
            )}
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

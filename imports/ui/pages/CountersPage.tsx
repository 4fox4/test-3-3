import React, { useState } from "react";
import { alpha } from "@mui/material/styles";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import InputAdornment from "@mui/material/InputAdornment";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";

import SearchIcon from "@mui/icons-material/Search";

import { useAllCounters } from "/imports/ui/hooks/useCounters";
import { getTrophyColor, medals } from "../utils";

export const CountersPage: React.FC = () => {
  const { allCounters, totalCount, isLoading } = useAllCounters();
  const [searchTerm, setSearchTerm] = useState("");

  // Filtrer les compteurs selon le terme de recherche
  const filteredCounters = allCounters.filter(
    (counter) =>
      counter.userFullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (counter.user?.emails?.[0]?.address || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h4" component="h1" fontWeight={900} gutterBottom>
        Tous les Compteurs
      </Typography>

      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Découvrez le classement de tous les utilisateurs et leurs compteurs
      </Typography>

      {/* Statistiques globales */}
      <Box sx={{ display: "flex", gap: 2, mb: 2, flexWrap: "wrap" }}>
        <Paper variant="outlined" sx={{ minWidth: 200, p: 2 }}>
          <Typography
            variant="body2"
            color="text.secondary"
            lineHeight={1}
            mb={1}
          >
            Utilisateurs actifs
          </Typography>
          <Typography variant="h3" color="primary">
            {allCounters.length}
          </Typography>
        </Paper>

        <Paper variant="outlined" sx={{ minWidth: 200, p: 2 }}>
          <Typography
            variant="body2"
            color="text.secondary"
            lineHeight={1}
            mb={1}
          >
            Total cumulé
          </Typography>
          <Typography variant="h3" color="text.primary">
            {totalCount}
          </Typography>
        </Paper>

        {allCounters.length > 0 && (
          <Paper variant="outlined" sx={{ minWidth: 200, p: 2 }}>
            <Typography
              variant="body2"
              color="text.secondary"
              lineHeight={1}
              mb={1}
            >
              Moyenne par utilisateur
            </Typography>
            <Typography variant="h3" color="text.primary">
              {Math.round(totalCount / allCounters.length)}
            </Typography>
          </Paper>
        )}
      </Box>

      {/* Liste des compteurs */}
      <Paper variant="outlined">
        <Box sx={{ display: "flex", alignItems: "center", p: 2 }}>
          <Typography variant="h5" component="h2" fontWeight={700}>
            <Box component="span" sx={{ mr: 2 }}>
              📊
            </Box>
            Classement des Compteurs
          </Typography>
        </Box>

        <Box
          sx={{
            borderTop: "1px solid",
            borderBottom: "1px solid",
            borderColor: "divider",
          }}
        >
          <InputBase
            fullWidth
            placeholder="Rechercher par nom, prénom ou email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            startAdornment={
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            }
            sx={{ px: 2, py: 1 }}
          />
        </Box>

        {isLoading ? (
          <Box display="flex" justifyContent="center" p={4}>
            <CircularProgress />
          </Box>
        ) : filteredCounters.length === 0 ? (
          <Alert severity="info">
            {searchTerm
              ? `Aucun utilisateur trouvé pour "${searchTerm}"`
              : "Aucun compteur disponible"}
          </Alert>
        ) : (
          <List sx={{ px: 2 }}>
            {filteredCounters.map((counter, index) => (
              <ListItem key={`counter-${index}-${counter?._id}`} sx={{ px: 0 }}>
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
                  slotProps={{
                    primary: {
                      fontWeight: 500,
                    },
                  }}
                  primary={counter?.userFullName || "-"}
                  secondary={counter.user?.emails?.[0]?.address || "-"}
                />
                {counter?.value && (
                  <Typography
                    variant="body1"
                    sx={{
                      color: "text.secondary",
                      fontWeight: 500,
                      ml: 2,
                    }}
                  >
                    {counter.value}
                  </Typography>
                )}
              </ListItem>
            ))}
          </List>
        )}
      </Paper>
    </Box>
  );
};

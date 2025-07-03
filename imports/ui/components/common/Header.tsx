import React, { useState } from "react";
import { styled } from "@mui/material/styles";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import ListSubheader from "@mui/material/ListSubheader";

import LogoutIcon from "@mui/icons-material/Logout";

import { useAuth } from "/imports/ui/hooks/useAuth";
import { getUserFullName, getUserInitials } from "/imports/api/users/users";
import { NavBar } from "./NavBar";

const StyledListHeader = styled(ListSubheader)({
  // backgroundImage: "var(--Paper-overlay)",
});

export const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleMenuClose();
  };

  return (
    <AppBar position="static" elevation={0} color="transparent">
      <Toolbar>
        <Typography
          variant="h4"
          component="div"
          fontWeight={900}
          sx={{ mr: 4 }}
        >
          C∞nter
        </Typography>

        {user && (
          <Box
            sx={{
              display: "flex",
              gap: 1,
              flexGrow: 1,
              justifyContent: "center",
            }}
          >
            <NavBar />
          </Box>
        )}

        {user && (
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <IconButton
              onClick={handleMenuOpen}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={anchorEl ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={anchorEl ? "true" : undefined}
            >
              <Avatar
                sx={{
                  width: 32,
                  height: 32,
                  bgcolor: "secondary.main",
                  fontSize: "0.875rem",
                }}
              >
                {getUserInitials(user)}
              </Avatar>
            </IconButton>

            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              onClick={handleMenuClose}
              slotProps={{
                paper: {
                  elevation: 0,
                  sx: {
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    mt: 1.5,
                    "& .MuiAvatar-root": {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <StyledListHeader sx={{ py: 1, color: "text.primary" }}>
                <Box>
                  <Typography
                    variant="subtitle1"
                    fontWeight={700}
                    sx={{ lineHeight: 1.2 }}
                  >
                    {getUserFullName(user)}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ lineHeight: 1.2 }}
                  >
                    {user?.emails?.[0]?.address || "Email non disponible"}
                  </Typography>
                </Box>
              </StyledListHeader>
              <MenuItem onClick={handleLogout}>
                <LogoutIcon fontSize="small" sx={{ mr: 1 }} />
                Se déconnecter
              </MenuItem>
            </Menu>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

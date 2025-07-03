import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SxProps, Theme } from "@mui/material/styles";

import Tab, { tabClasses } from "@mui/material/Tab";
import Tabs, { tabsClasses, TabsProps } from "@mui/material/Tabs";

export const tabsStyles = () => ({
  root: {
    backgroundColor: "#eee",
    borderRadius: "10px",
    minHeight: 36,
  },
  flexContainer: {
    position: "relative",
    padding: "0 3px",
    zIndex: 1,
  },
  indicator: {
    top: 3,
    bottom: 3,
    right: 3,
    height: "auto",
    borderRadius: "8px",
    backgroundColor: "#fff",
    boxShadow: "0 4px 12px 0 rgba(0,0,0,0.16)",
  },
});

export const tabItemStyles = (theme: Theme) => ({
  root: {
    fontWeight: 500,
    minHeight: 36,
    minWidth: 96,
    opacity: 0.7,
    color: (theme.vars || theme).palette.text.primary,
    textTransform: "initial",
    "&:hover": {
      opacity: 1,
    },
    [`&.${tabClasses.selected}`]: {
      color: (theme.vars || theme).palette.text.primary,
      opacity: 1,
    },
    [theme.breakpoints.up("md")]: {
      minWidth: 120,
    },
  },
});

function toSx<ClassKey extends string>(
  styles: (theme: Theme) => Partial<Record<ClassKey, any>>,
  classes: Record<ClassKey, string>
) {
  return function sxCallback(theme: Theme) {
    let sx: Record<string, any> = {};
    Object.entries<any>(styles(theme)).forEach(([key, value]) => {
      if (key === "root") {
        sx = { ...sx, ...value };
      } else {
        const classKey = key as ClassKey;
        if (classes[classKey]) {
          sx[`& .${classes[classKey]}`] = value;
        }
      }
    });
    return sx;
  } as SxProps<Theme>;
}

export function NavBar({ sx }: TabsProps) {
  const tabItemSx = toSx(tabItemStyles, tabClasses);
  const location = useLocation();
  const navigate = useNavigate();

  const path = location.pathname;
  const paths = ["/", "/counters"];
  return (
    <Tabs
      value={paths.findIndex((p) => path === p) ?? false}
      onChange={(_, index) => navigate(paths[index])}
      sx={[toSx(tabsStyles, tabsClasses), ...(Array.isArray(sx) ? sx : [sx])]}
    >
      <Tab disableRipple label={"Home"} sx={tabItemSx} />
      <Tab disableRipple label={"Counters"} sx={tabItemSx} />
    </Tabs>
  );
}

import { createBrowserRouter } from "react-router-dom";

import { MainLayout } from "../components/layouts/MainLayout";
import { BlankLayout } from "../components/layouts/BlankLayout";

import { LoginPage } from "/imports/ui/pages/LoginPage";
import { HomePage } from "/imports/ui/pages/HomePage";
import { CountersPage } from "/imports/ui/pages/CountersPage";

import { protectedLoader } from "./loaders/protectedLoader";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    loader: protectedLoader,
    children: [
      { index: true, Component: HomePage },
      {
        path: "counters",
        Component: CountersPage,
      },
    ],
  },
  {
    path: "/login",
    Component: BlankLayout,
    children: [{ index: true, Component: LoginPage }],
  },
]);

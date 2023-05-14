import React from "react";
import ReactDOM from "react-dom/client";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Info } from "./pages/Info";
import { Trainer } from "./pages/Trainer";
import { red } from "@mui/material/colors";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
const router = createBrowserRouter([
    {
        path: "/",
        element: <Login />,
    },
    {
        path: "home",
        element: <Home />,
    },
    {
        path: "info",
        element: <Info />,
    },
    {
        path: "trainer",
        element: <Trainer />,
    },
]);

const theme = createTheme({
    palette: {
        primary: {
            main: "#7C1FC4",
        },
        background: {
            default: "#f5f5f5",
        },
        text: {
            primary: "#21A0B6",
            secondary: "#7C1FC4",
        },
    },
});
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <RouterProvider router={router} />
        </ThemeProvider>
    </React.StrictMode>
);

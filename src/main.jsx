import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router";
import { Auth0Provider } from "@auth0/auth0-react";
import { AppRouter } from "./router/AppRouter.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Auth0Provider
      domain="dev-6b064544tsccsmo0.us.auth0.com"
      clientId="O4jebmjsg5W16pALFq8nEdvLFpwirXPl"
      authorizationParams={{
        redirect_uri: "http://localhost:5173/callback",
        audience: "https://flash4devs/api",
      }}
    >
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </Auth0Provider>
  </StrictMode>
);

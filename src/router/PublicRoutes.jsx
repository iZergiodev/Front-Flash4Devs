import { Navigate } from "react-router";
import { useAuth0 } from "@auth0/auth0-react";

export const PublicRoutes = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  return isAuthenticated ? <Navigate to="/" replace /> : children;
};

import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router";

export const ProtectedRoutes = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) return <div>Carregando...</div>;

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return children;
};

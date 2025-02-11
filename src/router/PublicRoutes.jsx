import { Navigate } from "react-router";
import { useUserStore } from "../store/userStore";

// eslint-disable-next-line react/prop-types
export const PublicRoutes = ({ children }) => {
    const isLogged = useUserStore((state) => state.isLogged);

  if (isLogged) {
    return <Navigate to="/home" replace />;
  }

  return <>{children}</>;
};


import { Navigate } from "react-router";
import { useUserStore } from "../store/userStore"


// eslint-disable-next-line react/prop-types
export const ProtectedRoutes = ({children}) => {
    
    const isLogged = useUserStore((state) => state.isLogged);

    
    if (!isLogged) {
        return <Navigate to="/auth/login" replace />;
      }
    
      return <>{children}</>;
    };


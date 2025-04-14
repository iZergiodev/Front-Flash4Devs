import { Navigate } from "react-router";
import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { ThreeDots } from "react-loader-spinner";

export const AdminRoutes = ({ children }) => {
  const { isAuthenticated, getAccessTokenSilently, user } = useAuth0();
  const [isAdmin, setIsAdmin] = useState(null);

  useEffect(() => {
    const checkAdmin = async () => {
      if (!isAuthenticated || !user) {
        setIsAdmin(false);
        return;
      }

      try {
        const token = await getAccessTokenSilently();
        const resp = await fetch(
          `https://back-flash4devs-production.up.railway.app/api/user/${user.sub}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!resp.ok) {
          throw new Error("Error al verificar el rol");
        }

        const { role } = await resp.json();
        setIsAdmin(role === "admin");
      } catch (error) {
        console.error("Error al verificar admin:", error);
        setIsAdmin(false);
      }
    };

    checkAdmin();
  }, [isAuthenticated, user, getAccessTokenSilently]);

  if (isAdmin === null) {
    return (
      <div
        className="absolute inset-0 flex items-center justify-center bg-opacity-75 z-50"
        style={{ backdropFilter: "blur(5px)" }}
      >
        <ThreeDots
          visible={true}
          height="80"
          width="80"
          color="#054A91"
          radius="9"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    );
  }

  return isAuthenticated && isAdmin ? children : <Navigate to="/" replace />;
};

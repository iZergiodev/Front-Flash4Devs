import { Navigate } from "react-router";
// import { useUserStore } from "../store/userStore";
import { decodeToken } from "../utils/decodeToken";
import { useState } from "react";

export const AdminRoutes = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);

  //   const isLogged = useUserStore((state) => state.isLogged);

  const token = localStorage.getItem("token");

  const { id } = decodeToken(token);
  try {
    const checkAdmin = async () => {
      const resp = await fetch(`https://back-flash4devs-production.up.railway.app/api/user/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const { role } = resp.json();

      if (role === "admin") setIsAdmin(true);
    };
    checkAdmin()
  } catch (error) {
    console.log(error);
    throw new Error("Necesitas permisos de adminitrador");
  }

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

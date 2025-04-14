import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useUserStore } from "../store/userStore";

export const Callback = () => {
  const { isLoading, error, isAuthenticated, user, getAccessTokenSilently } =
    useAuth0();
  const navigate = useNavigate();
  const { setUser, setToken, setIsLogged } = useUserStore();

  useEffect(() => {
    const syncUser = async () => {
      if (isAuthenticated && user) {
        try {
          const token = await getAccessTokenSilently();
          const apiUrl =
            import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";
          const response = await fetch(`${apiUrl}/api/user`, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: user.sub,
              email: user.email,
              name: user.given_name || user.name || "",
              last_name: user.family_name || "",
            }),
          });
          if (response.ok) {
            setUser({
              id: user.sub,
              email: user.email,
              name: user.given_name || user.name || "",
              avatar: user.picture,
            });
            setToken(token);
            setIsLogged(true);
          } else {
            console.error("Erro ao sincronizar usuário com backend");
          }
        } catch (error) {
          console.error("Erro ao sincronizar usuário:", error);
        }
        navigate("/");
      }
    };

    syncUser();
  }, [
    isAuthenticated,
    user,
    getAccessTokenSilently,
    navigate,
    setUser,
    setToken,
    setIsLogged,
  ]);

  if (error) {
    return <div>Erro: {error.message}</div>;
  }

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  return null;
};

import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router";
import { useUserStore } from "../store/userStore";

export const Callback = () => {
  const { user, getAccessTokenSilently, isLoading, isAuthenticated } =
    useAuth0();
  const navigate = useNavigate();
  const { login } = useUserStore();

  useEffect(() => {
    const handleCallback = async () => {
      if (isLoading) return;
      if (!isAuthenticated || !user) {
        console.error("Usuário não autenticado ou dados ausentes");
        navigate("/auth/login");
        return;
      }

      try {
        const token = await getAccessTokenSilently({
          authorizationParams: {
            audience: "https://flash4devs/api",
            scope: "openid profile email",
          },
        });

        console.log("Dados do usuário:", user);
        console.log("Token obtido:", token);

        login(user, token);

        const userData = {
          id: user.sub,
          email: user.email || null,
          name: user.given_name || user.nickname || user.name || "Usuário",
          last_name: user.family_name || null,
          profile_image: user.picture || null,
        };

        console.log("Enviando para /api/user:", userData);

        const response = await fetch("http://localhost:8000/api/user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(userData),
        });

        if (!response.ok) {
          console.error(
            `Erro na API: ${response.status}`,
            await response.text()
          );
        }

        navigate("/");
      } catch (error) {
        console.error("Erro no callback:", error);
        navigate("/auth/login");
      }
    };

    handleCallback();
  }, [
    isLoading,
    isAuthenticated,
    user,
    getAccessTokenSilently,
    login,
    navigate,
  ]);

  return <div>Carregando...</div>;
};

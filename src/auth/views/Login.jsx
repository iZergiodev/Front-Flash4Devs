import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router";
import toast, { Toaster } from "react-hot-toast";
import SplitText from "../../components/effectcomponents/SplitText";
import Squares from "../../components/effectcomponents/Squares";

export const Login = () => {
  const { loginWithRedirect, isAuthenticated, logout } = useAuth0();

  const handleLogin = async () => {
    try {
      await loginWithRedirect();
    } catch (error) {
      toast.error("Erro ao iniciar o login");
      console.error("Erro no login:", error);
    }
  };

  const handleLogout = () => {
    logout({ logoutParams: { returnTo: window.location.origin } });
  };

  return (
    <>
      <Toaster position="bottom-right" reverseOrder={false} />
      <div className="relative w-full h-screen overflow-hidden">
        <div className="absolute inset-0 z-0 bg-white dark:bg-[#3C4043]">
          <Squares speed={0.1} direction="diagonal" hoverFillColor="#81A4CD" />
        </div>
        <div className="relative z-10 flex items-center justify-center w-full h-full pointer-events-none">
          <div className="bg-card dark:bg-[#919191] p-8 rounded-lg shadow-lg w-full max-w-md pointer-events-auto">
            <h2 className="text-2xl font-bold mb-6 text-primary dark:text-black text-center">
              <SplitText
                text="Login"
                className="text-2xl font-semibold text-center"
                delay={150}
                animationFrom={{
                  opacity: 0,
                  transform: "translate3d(0,50px,0)",
                }}
                animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
                easing="easeOutCubic"
                threshold={0.2}
                rootMargin="-50px"
              />
            </h2>
            <div className="flex flex-col items-center">
              {isAuthenticated ? (
                <button
                  className="w-full text-white bg-accent py-2 px-4 rounded-lg hover:bg-secondary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary mb-4"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              ) : (
                <button
                  className="w-full text-white bg-accent py-2 px-4 rounded-lg hover:bg-secondary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary mb-4"
                  onClick={handleLogin}
                >
                  Entrar com Auth0
                </button>
              )}
              {!isAuthenticated && (
                <p className="mt-4 text-center text-muted dark:text-gray-700">
                  ¿No tienes una cuenta?{" "}
                  <Link
                    to="/auth/register"
                    className="text-secondary dark:text-blue-500 hover:underline"
                  >
                    Registro
                  </Link>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Link, useNavigate } from "react-router";
import toast, { Toaster } from "react-hot-toast";
import SplitText from "../../components/effectcomponents/SplitText";
import Squares from "../../components/effectcomponents/Squares";
import { FaGoogle, FaLinkedin, FaFacebook } from "react-icons/fa";
import XIcon from "../../components/icons/XIcon";

export const Login = () => {
  const { loginWithRedirect } = useAuth0();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSocialLogin = async (connection) => {
    const state = Math.random().toString(36).substring(7);
    console.log(
      `Iniciando login com ${connection}, redirect_uri: http://localhost:5173/callback, state: ${state}`
    );
    try {
      await loginWithRedirect({
        authorizationParams: {
          connection,
          redirect_uri: "http://localhost:5173/callback",
          scope: "openid profile email",
          audience: "https://flash4devs/api",
          state,
        },
      });
    } catch (error) {
      console.error(`Erro no login com ${connection}:`, error);
      toast.error(`Erro ao iniciar login com ${connection}: ${error.message}`);
    }
  };

  const handleTraditionalLogin = async (e) => {
    e.preventDefault();
    const state = Math.random().toString(36).substring(7);
    console.log("Tentando login tradicional com:", email, `state: ${state}`);
    try {
      await loginWithRedirect({
        authorizationParams: {
          connection: "Username-Password-Authentication",
          redirect_uri: "http://localhost:5173/callback",
          email,
          password,
          scope: "openid profile email",
          audience: "https://flash4devs/api",
          state,
        },
      });
    } catch (error) {
      console.error("Erro no login tradicional:", error);
      toast.error("Email ou senha inválidos");
    }
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
            <form onSubmit={handleTraditionalLogin} className="space-y-4">
              <div>
                <label className="block text-sm text-text dark:text-black mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-white dark:bg-[#BDC1C6] text-text dark:text-black border border-muted/20 focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-text dark:text-black mb-1">
                  Contraseña
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-white dark:bg-[#BDC1C6] text-text dark:text-black border border-muted/20 focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full text-white bg-accent py-2 px-4 rounded-lg hover:bg-secondary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary"
              >
                Acceder
              </button>
            </form>
            <div className="mt-6">
              <p className="text-center text-sm text-text dark:text-black mb-4">
                Ou entrar con:
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => handleSocialLogin("google-oauth2")}
                  className="p-2 rounded-full bg-white dark:bg-[#BDC1C6] shadow-md hover:bg-muted/30 transition-colors duration-200"
                  title="Google"
                >
                  <FaGoogle className="text-xl text-accent" />
                </button>
                <button
                  onClick={() => handleSocialLogin("linkedin")}
                  className="p-2 rounded-full bg-white dark:bg-[#BDC1C6] shadow-md hover:bg-muted/30 transition-colors duration-200"
                  title="LinkedIn"
                >
                  <FaLinkedin className="text-xl text-accent" />
                </button>
                <button
                  onClick={() => handleSocialLogin("twitter")}
                  className="p-2 rounded-full bg-white dark:bg-[#BDC1C6] shadow-md hover:bg-muted/30 transition-colors duration-200"
                  title="X"
                >
                  <XIcon className="w-5 h-5 text-accent" />
                </button>
                <button
                  onClick={() => handleSocialLogin("facebook")}
                  className="p-2 rounded-full bg-white dark:bg-[#BDC1C6] shadow-md hover:bg-muted/30 transition-colors duration-200"
                  title="Facebook"
                >
                  <FaFacebook className="text-xl text-accent" />
                </button>
              </div>
            </div>
            <p className="mt-4 text-center text-muted dark:text-gray-700">
              ¿No tienes una cuenta?{" "}
              <Link
                to="/auth/register"
                className="text-secondary dark:text-blue-500 hover:underline"
              >
                Registro
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

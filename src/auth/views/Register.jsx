import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router";
import toast, { Toaster } from "react-hot-toast";
import SplitText from "../../components/effectcomponents/SplitText";
import AnimatedContent from "../../components/effectcomponents/AnimatedContent";
import Squares from "../../components/effectcomponents/Squares";
import { FaGoogle } from "react-icons/fa";

export const Register = () => {
  const { loginWithRedirect } = useAuth0();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSocialRegister = async (connection) => {
    const state = Math.random().toString(36).substring(7);
    console.log(
      `Iniciando registro com ${connection}, redirect_uri: http://localhost:5173/callback, state: ${state}`
    );
    try {
      await loginWithRedirect({
        authorizationParams: {
          connection,
          redirect_uri: "http://localhost:5173/callback",
          screen_hint: "signup",
          scope: "openid profile email",
          audience: "https://flash4devs/api",
          state,
        },
      });
    } catch (error) {
      console.error(`Erro no registro com ${connection}:`, error);
      toast.error(
        `Erro ao iniciar registro com ${connection}: ${error.message}`
      );
    }
  };

  const handleTraditionalRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://dev-6b064544tsccsmo0.us.auth0.com/dbconnections/signup",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            client_id: "O4jebmjsg5W16pALFq8nEdvLFpwirXPl",
            email,
            password,
            connection: "Username-Password-Authentication",
            user_metadata: { name },
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        toast.success("¡Registro exitoso! Iniciando sesión...");
        setTimeout(() => {
          login(email, password);
        }, 1000);
      } else {
        console.error("Signup error:", data);
        toast.error(data.message || "Error al registrarse");
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      toast.error("Error inesperado en el registro.");
    }
  };

  // Funcion para login despues registro
  const login = async (email, password) => {
    const response = await fetch(
      "https://dev-6b064544tsccsmo0.us.auth0.com/oauth/token",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          grant_type: "password",
          username: email,
          password: password,
          audience: "https://flash4devs/api",
          scope: "openid profile email",
          client_id: "O4jebmjsg5W16pALFq8nEdvLFpwirXPl",
        }),
      }
    );

    const data = await response.json();

    if (response.ok) {
      console.log("Login automático exitoso", data);
      // localStorage.setItem("access_token", data.access_token);
      navigate("/");
    } else {
      toast.error("No se pudo iniciar sesión después del registro");
    }
  };

  return (
    <>
      <Toaster position="bottom-right" reverseOrder={false} />
      <div className="relative min-h-screen overflow-hidden">
        <div className="absolute inset-0 z-0 bg-white dark:bg-[#3C4043]">
          <Squares speed={0.1} direction="diagonal" hoverFillColor="#81A4CD" />
        </div>
        <div className="relative z-20">
          <AnimatedContent
            distance={150}
            direction="vertical"
            reverse={false}
            config={{ tension: 80, friction: 20 }}
            initialOpacity={0.2}
            animateOpacity
            scale={0.1}
            threshold={0.2}
            rootMargin="-50px"
          ></AnimatedContent>
        </div>
        <div className="relative z-10 flex items-center justify-center min-h-screen pointer-events-none">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row w-full md:w-8/12 bg-card dark:bg-[#919191] rounded-xl mx-auto shadow-lg overflow-hidden pointer-events-auto">
              <div
                className="w-full md:w-1/2 flex flex-col items-center justify-center p-8 md:p-12 bg-no-repeat bg-cover bg-center relative order-2 md:order-1"
                style={{ backgroundImage: "url('/background.jpeg')" }}
              >
                <div className="absolute inset-0 bg-black/75"></div>
                <div className="relative z-10 text-center">
                  <h1 className="text-card text-2xl md:text-3xl mb-4 md:mb-5 font-semibold">
                    ¡Bienvenido al bucle infinito de posibilidades!
                  </h1>
                  <div className="bg-gray-400/55 rounded-xl shadow-xl p-4">
                    <p className="text-white font-medium text-base md:text-xl">
                      Prepárese para las entrevistas con{" "}
                      <span className="font-bold text-accent">Flash4Devs</span>,
                      flashcards que van directo al grano. ¡Domina lo esencial y
                      convierte tu código en éxito!
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/2 py-8 md:py-16 px-6 md:px-12 order-1 md:order-2">
                <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-primary dark:text-black text-center">
                  <SplitText
                    text="Registro"
                    className="text-2xl md:text-3xl font-semibold text-center"
                    delay={150}
                    animationFrom={{
                      opacity: 0,
                      transform: "translate3d(0,50px,0)",
                    }}
                    animationTo={{
                      opacity: 1,
                      transform: "translate3d(0,0,0)",
                    }}
                    easing="easeOutCubic"
                    threshold={0.2}
                    rootMargin="-50px"
                  />
                </h2>
                <p className="mb-4 text-text dark:text-black text-sm md:text-base">
                  Crea tu cuenta. Es gratis y sólo te llevará un minuto.
                </p>
                <form
                  onSubmit={handleTraditionalRegister}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-sm text-text dark:text-black mb-1">
                      Nombre
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-white dark:bg-[#BDC1C6] text-text dark:text-black border border-muted/20 focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>
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
                  <div className="flex justify-center items-center">
                    <button
                      type="submit"
                      className="w-60 text-white shadow-lg bg-accent py-2 md:py-3 text-center rounded hover:bg-secondary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      Registro
                    </button>
                  </div>
                </form>
                <div className="mt-6">
                  <p className="text-center text-sm text-text dark:text-black mb-4">
                    O regístrate con:
                  </p>
                  <div className="flex justify-center gap-4">
                    <button
                      onClick={() => handleSocialRegister("google-oauth2")}
                      className="p-2 rounded-full bg-white dark:bg-[#BDC1C6] shadow-md hover:bg-muted/30 transition-colors duration-200"
                      title="Google"
                    >
                      <FaGoogle className="text-xl text-accent" />
                    </button>
                  </div>
                </div>
                <p className="mt-4 text-center text-text dark:text-black">
                  ¿Ya tienes una cuenta?{" "}
                  <Link
                    to="/auth/login"
                    className="text-secondary dark:text-blue-500 hover:underline"
                  >
                    Login
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

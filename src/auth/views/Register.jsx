import { useAuth0 } from "@auth0/auth0-react";
import toast, { Toaster } from "react-hot-toast";
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import SplitText from "../../components/effectcomponents/SplitText";
import AnimatedContent from "../../components/effectcomponents/AnimatedContent";
import Squares from "../../components/effectcomponents/Squares";

export const Register = () => {
  const { loginWithRedirect } = useAuth0();

  const handleRegister = async () => {
    try {
      await loginWithRedirect({
        screen_hint: "signup", // Abre a tela de registro do Auth0
      });
    } catch (error) {
      toast.error("Erro ao iniciar o registro");
      console.error("Erro no registro:", error);
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
          >
            <Navbar />
          </AnimatedContent>
          <Footer />
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
                <div className="flex flex-col items-center">
                  <button
                    onClick={handleRegister}
                    className="w-full text-white bg-accent py-2 md:py-3 text-center rounded hover:bg-secondary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    Registrate con Auth0
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

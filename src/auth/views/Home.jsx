import Squares from "../../components/effectcomponents/Squares";
import { Navbar } from "../../components/Navbar";
import { MenuRight } from "../../components/MenuRight";
import RotatingText from "../../components/effectcomponents/RotatingText";
import AnimatedContent from "../../components/effectcomponents/AnimatedContent";
import { useUserStore } from "../../store/userStore";
import { decodeToken } from "../../utils/decodeToken";
import { motion } from "framer-motion";
import { Link } from "react-router";
import { useEffect } from "react";
import { useState } from "react";

export const Home = () => {
  const [emailState, setEmail] = useState("");
  const [nameState, setName] = useState("");
  const [avatar, setAvatar] = useState("");

  const { isLogged } = useUserStore();

  const token = localStorage.getItem("token");

  const decodedToken = token ? decodeToken(token) : null;
  const id = decodedToken ? decodedToken.id : null;

  const extraer = async () => {
    try {
      const response = await fetch(
        `https://back-flash4devs-production.up.railway.app/api/user/${id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        console.log("Información del usuario:", data);
        setEmail(data.email);
        setName(data.name);
        setAvatar(data.profile_image);
      } else {
        console.error("Error al obtener la información del usuario");
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
  };

  useEffect(() => {
    if (id) {
      extraer(); // Llama a la función para obtener la información del usuario
    }
  }, [id]);

  const [isHoveredCard1, setIsHoveredCard1] = useState(false);
  const [isHoveredCard2, setIsHoveredCard2] = useState(false);
  const [isHoveredCard3, setIsHoveredCard3] = useState(false);
  const [isHoveredCard4, setIsHoveredCard4] = useState(false);

  return (
    <>
      <div className="relative w-full h-screen overflow-hidden">
        <AnimatedContent
          distance={150}
          direction="vertical"
          reverse={false}
          config={{ tension: 80, friction: 20 }}
          initialOpacity={0.2}
          animateOpacity
          scale={0.1}
          threshold={0.2}
        >
          {isLogged ? <MenuRight name={nameState} email={emailState} /> : ""}

          {isLogged ? (
            <MenuRight
              name={nameState}
              email={emailState}
              profileImage={avatar}
            />
          ) : (
            ""
          )}

          <Navbar />
        </AnimatedContent>
        <Squares
          speed={0.5}
          squareSize={40}
          direction="diagonal"
          borderColor="rgba(241, 115, 0, 0.4)"
          hoverFillColor="#81A4CD"
        />
        <div className="absolute inset-0 flex items-center justify-center p-4 z-10 sm:mt-0 mt-30 pointer-events-none">
          <div className="flex flex-wrap gap-14 w-[700px] h-[600px] max-w-4xl justify-center mt-10">
            <motion.div
              className={`w-64 h-70 rounded-lg flex flex-col ${
                isHoveredCard1 ? "bg-accent text-white" : "bg-card text-text"
              } shadow-lg pointer-events-auto relative overflow-hidden cursor-pointer`}
              onHoverStart={() => setIsHoveredCard1(true)}
              onHoverEnd={() => setIsHoveredCard1(false)}
              initial="hidden"
              animate="visible"
              whileHover={{
                scale: 1.1,
                transition: { duration: 0.4 },
              }}
            >
              {!isHoveredCard1 ? (
                <div className="flex items-center justify-center h-full p-6 text-center">
                  <h2 className="text-xl md:text-2xl font-bold font-mono">
                    Coding Flashcards
                  </h2>
                </div>
              ) : (
                <div className="flex flex-col h-full">
                  <div className="p-4 bg-accent text-white rounded-t-lg border-b font-semibold border-gray-300">
                    <h2 className="text-xl md:text-2xl font-bold text-center">
                      Coding Flashcards
                    </h2>
                  </div>
                  <div className="flex-1 p-8 overflow-y-auto bg-card text-text text-center items-center">
                    <p className="text-sm">
                      Descrição breve sobre o Coding Flashcards
                    </p>
                  </div>
                  <div className="p-4 bg-card rounded-b-lg border-t border-gray-300 text-center">
                    <p className="text-xs text-text ">
                      ¡Haga clic para comenzar!
                    </p>
                  </div>
                </div>
              )}
            </motion.div>

            <motion.div
              className={`w-64 h-70 rounded-lg flex flex-col ${
                isHoveredCard2 ? "bg-accent text-white" : "bg-card text-text"
              } shadow-lg pointer-events-auto relative overflow-hidden cursor-pointer`}
              onHoverStart={() => setIsHoveredCard2(true)}
              onHoverEnd={() => setIsHoveredCard2(false)}
              initial="hidden"
              animate="visible"
              whileHover={{
                scale: 1.1,
                transition: { duration: 0.4 },
              }}
            >
              {!isHoveredCard2 ? (
                <div className="flex items-center justify-center h-full p-6 text-center">
                  <h2 className="text-xl md:text-2xl font-bold font-mono">
                    Practica
                  </h2>
                </div>
              ) : (
                <div className="flex flex-col h-full">
                  <div className="p-4 bg-secondary text-white rounded-t-lg border-b font-semibold border-gray-300">
                    <h2 className="text-xl md:text-2xl font-bold text-center">
                      Practica Flash4Devs
                    </h2>
                  </div>
                  <div className="flex-1 p-8 overflow-y-auto bg-card text-text text-center items-center">
                    <p className="text-sm">
                      Descrição breve sobre la Practica de Flash4Devs
                    </p>
                  </div>
                  <div className="p-4 bg-card rounded-b-lg border-t border-gray-300 text-center">
                    <p className="text-xs text-text ">
                      ¡Haga clic para comenzar!
                    </p>
                  </div>
                </div>
              )}
            </motion.div>

            <motion.div
              className={`w-64 h-70 rounded-lg flex flex-col ${
                isHoveredCard3 ? "bg-accent text-white" : "bg-card text-text"
              } shadow-lg pointer-events-auto relative overflow-hidden cursor-pointer`}
              onHoverStart={() => setIsHoveredCard3(true)}
              onHoverEnd={() => setIsHoveredCard3(false)}
              initial="hidden"
              animate="visible"
              whileHover={{
                scale: 1.1,
                transition: { duration: 0.4 },
              }}
            >
              {!isHoveredCard3 ? (
                <div className="flex items-center justify-center h-full p-6 text-center">
                  <h2 className="text-xl md:text-2xl font-bold font-mono">
                    Preguntas de Entrevistas
                  </h2>
                </div>
              ) : (
                <div className="flex flex-col h-full">
                  <div className="p-4 bg-accent text-white rounded-t-lg border-b font-semibold border-gray-300">
                    <h2 className="text-xl md:text-2xl font-bold text-center">
                      Preguntas de Entrevistas
                    </h2>
                  </div>
                  <div className="flex-1 p-8 overflow-y-auto bg-card text-text text-center items-center">
                    <p className="text-sm">
                      Descrição breve sobre o card de Flashcards
                      Personalizados...
                    </p>
                  </div>
                  <div className="p-4 bg-card rounded-b-lg border-t border-gray-300 text-center">
                    <p className="text-xs text-text ">
                      ¡Haga clic para comenzar!
                    </p>
                  </div>
                </div>
              )}
            </motion.div>

            <motion.div
              className={`w-64 h-70 rounded-lg flex flex-col ${
                isHoveredCard4 ? "bg-accent text-white" : "bg-card text-text"
              } shadow-lg pointer-events-auto relative overflow-hidden cursor-pointer`}
              onHoverStart={() => setIsHoveredCard4(true)}
              onHoverEnd={() => setIsHoveredCard4(false)}
              initial="hidden"
              animate="visible"
              whileHover={{
                scale: 1.1,
                transition: { duration: 0.4 },
              }}
            >
              {!isHoveredCard4 ? (
                <div className="flex items-center justify-center h-full p-6 text-center">
                  <h2 className="text-xl md:text-2xl font-bold font-mono">
                    Custom FlashCards
                  </h2>
                </div>
              ) : (
                <div className="flex flex-col h-full">
                  <div className="p-4 bg-secondary text-white rounded-t-lg border-b font-semibold border-gray-300">
                    <h2 className="text-xl md:text-2xl font-bold text-center">
                      Custom FlashCards
                    </h2>
                  </div>
                  <div className="flex-1 p-8 overflow-y-auto bg-card text-text text-center items-center">
                    <p className="text-sm">
                      Descrição breve sobre los Custom FlashCards
                    </p>
                  </div>
                  <div className="p-4 bg-card rounded-b-lg border-t border-gray-300 text-center">
                    <p className="text-xs text-text ">
                      ¡Haga clic para comenzar!
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
            {!isLogged ? (
              <div className="flex flex-col justify-center items-center gap-4 fixed bottom-10 right-10">
                <p className="bg-card rounded-full p-4 shadow-lg text-text font-semibold font-mono">
                  No Tienes una Conta?
                </p>
                <Link
                  to="/auth/register"
                  className="w-48 flex items-center justify-center text-white bg-accent py-2 px-4 rounded-full shadow-lg hover:bg-secondary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer pointer-events-auto font-semibold text-md"
                >
                  Registrate
                </Link>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </>
  );
};

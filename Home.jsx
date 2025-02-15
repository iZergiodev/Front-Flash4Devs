import Squares from "./src/components/effectcomponents/Squares";
import { Navbar } from "./src/components/Navbar";
import { MenuRight } from "./src/components/MenuRight";
import AnimatedContent from "./src/components/effectcomponents/AnimatedContent";
import { useUserStore } from "./src/store/userStore";
import { motion } from "framer-motion";
import { Link } from "react-router";
import { useState } from "react";
import useExtractInfo from "./src/hooks/useExtractInfo";

export const Home = () => {
  const { isLogged } = useUserStore();

  const { emailState, nameState, avatar } = useExtractInfo();

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
          speed={0.1}
          squareSize={40}
          direction="diagonal"
          borderColor="rgba(241, 115, 0, 0.4)"
          hoverFillColor="#81A4CD"
        />
        <div className="absolute inset-0 flex items-center justify-center p-4 z-10 sm:mt-0 mt-30 pointer-events-none">
          <div className="flex flex-wrap gap-14 w-[700px] h-[600px] max-w-4xl justify-center mt-10">
            <Link to="/eligecategoria/coding">
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
                        ¿Quieres mejorar tu habilidad como programador?
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
            </Link>
            <Link to="/eligecategoria/concept">
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
                      Concept Flashcards
                    </h2>
                  </div>
                ) : (
                  <div className="flex flex-col h-full">
                    <div className="p-4 bg-secondary text-white rounded-t-lg border-b font-semibold border-gray-300">
                      <h2 className="text-xl md:text-2xl font-bold text-center">
                        Concept Flashcards
                      </h2>
                    </div>
                    <div className="flex-1 p-8 overflow-y-auto bg-card text-text text-center items-center">
                      <p className="text-sm">
                        ¡Aprende la teoría de las tecnologías más demandadas del
                        sector!
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
            </Link>
            <Link to="/eligecategoria/entrevista">
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
                        ¡Preparate para una entrevista laboral!
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
            </Link>
            <Link to="/eligecategoria/custom">
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
                        Crea tus propias Flashcards y ¡practica!
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
            </Link>
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

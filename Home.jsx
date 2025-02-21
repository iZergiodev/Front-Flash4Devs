import Squares from "./src/components/effectcomponents/Squares";
import { Navbar } from "./src/components/Navbar";
import { MenuRight } from "./src/components/MenuRight";
import { SideBar } from "./src/components/SideBar";
import { HeroSection } from "./src/components/HeroSection";
import { Footer } from "./src/components/Footer";
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
      <div className="relative w-full min-h-screen">
        <div className="absolute inset-0">
          <Squares
            speed={0.1}
            squareSize={40}
            direction="diagonal"
            borderColor="rgba(241, 115, 0, 0.2)"
            hoverFillColor="#81A4CD"
          />
        </div>
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
        </AnimatedContent>

        <Footer />
        <Navbar />
        <SideBar />
        <div className="flex flex-col md:flex-row items-center justify-items w-full h-full p-2 gap-1">
          <div className="flex justify-center items-center w-full md:w-1/2 mt-30 md:mt-35 md:ml-65">
            <HeroSection />
          </div>
          <div className="w-full md:w-1/2 flex flex-col items-center mt-25 mr-30">
            <p className="orbitron items-center text-md mb-5 text-center hidden lg:block xl:block mr-4">
              ¿Qué vamos a estudiar primero?
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-14 mt-10 ">
              <Link to="/eligecategoria/coding">
                <motion.div
                  className={`w-58 ml-60 md:ml-0 bottom-10 md:bottom-0 md:top-0 justify-center items-center md:w-64 h-70 rounded-lg flex flex-col ${
                    isHoveredCard1
                      ? "bg-accent text-white"
                      : "bg-card text-text"
                  } shadow-lg pointer-events-auto relative overflow-hidden  cursor-pointer`}
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
                    <div className="flex items-center justify-center h-full p-6 text-center border-1 border-accent/40">
                      <h2 className="text-lg md:text-xl font-bold font-mono">
                        Coding Flashcards
                      </h2>
                    </div>
                  ) : (
                    <div className="flex flex-col h-full">
                      <div className="p-3 md:p-4 bg-accent text-white rounded-t-lg border-b font-semibold border-gray-300">
                        <h2 className="text-lg md:text-xl font-bold text-center">
                          Coding Flashcards
                        </h2>
                      </div>
                      <div className="flex-1 p-4 md:p-6 overflow-y-auto bg-card text-text text-center">
                        <p className="text-sm md:text-base">
                          ¿Quieres mejorar tu habilidad como programador?
                        </p>
                      </div>
                      <div className="p-3 md:p-4 bg-card rounded-b-lg border-t border-gray-300 text-center">
                        <p className="text-xs md:text-sm text-text">
                          ¡Haga clic para comenzar!
                        </p>
                      </div>
                    </div>
                  )}
                </motion.div>
              </Link>
              <Link to="/eligecategoria/concept">
                <motion.div
                  className={`w-58 ml-60 md:ml-0 bottom-10 md:bottom-0 md:top-0 justify-center items-center md:w-64 h-70 rounded-lg flex flex-col ${
                    isHoveredCard2
                      ? "bg-accent text-white"
                      : "bg-card  text-text"
                  } shadow-lg pointer-events-auto relative overflow-hidden cursor-pointer border-1 border-primary/40`}
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
                    <div className="flex items-center justify-center h-full p-6 text-center ">
                      <h2 className="text-lg md:text-xl font-bold font-mono">
                        Concept Flashcards
                      </h2>
                    </div>
                  ) : (
                    <div className="flex flex-col h-full">
                      <div className="p-3 md:p-4 bg-accent text-white rounded-t-lg border-b font-semibold border-gray-300">
                        <h2 className="text-lg md:text-xl font-bold text-center">
                          Concept Flashcards
                        </h2>
                      </div>
                      <div className="flex-1 p-4 md:p-6 overflow-y-auto bg-card text-text text-center">
                        <p className="text-sm md:text-base">
                          ¡Aprende la teoría de las tecnologías más demandadas
                          del sector!
                        </p>
                      </div>
                      <div className="p-3 md:p-4 bg-card rounded-b-lg border-t border-gray-300 text-center">
                        <p className="text-xs md:text-sm text-text">
                          ¡Haga clic para comenzar!
                        </p>
                      </div>
                    </div>
                  )}
                </motion.div>
              </Link>
              <Link to="/eligecategoria/entrevista">
                <motion.div
                  className={`w-58 ml-60 md:ml-0 bottom-10 md:bottom-0 md:top-0 justify-center items-center md:w-64 h-70 rounded-lg flex flex-col  ${
                    isHoveredCard3
                      ? "bg-accent text-white"
                      : "bg-card text-text"
                  } shadow-lg pointer-events-auto relative border-1 border-accent/40 overflow-hidden cursor-pointer`}
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
                  className={`w-58 ml-60 md:ml-0 bottom-10 md:bottom-0 md:top-0 justify-center items-center md:w-64 h-70 rounded-lg flex flex-col ${
                    isHoveredCard4
                      ? "bg-accent text-white"
                      : "bg-card text-text"
                  } shadow-lg pointer-events-auto border-1 border-primary/40 relative overflow-hidden cursor-pointer`}
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

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
  const [hoveredCards, setHoveredCards] = useState([
    false,
    false,
    false,
    false,
  ]);

  const handleHover = (index, isHovered) => {
    setHoveredCards((prev) =>
      prev.map((state, i) => (i === index ? isHovered : state))
    );
  };

  const cardData = [
    {
      path: "/eligecategoria/coding",
      title: "Coding Flashcards",
      description: "¿Quieres mejorar tu habilidad como programador?",
    },
    {
      path: "/eligecategoria/concept",
      title: "Concept Flashcards",
      description:
        "¡Aprende la teoría de las tecnologías más demandadas del sector!",
    },
    {
      path: "/eligecategoria/entrevista",
      title: "Preguntas de Entrevistas",
      description: "¡Preparate para una entrevista laboral!",
    },
    {
      path: "/eligecategoria/custom",
      title: "Custom FlashCards",
      description: "Crea tus propias Flashcards y ¡practica!",
    },
  ];

  const renderCard = (index, { path, title, description }) => (
    <Link to={path} key={index}>
      <motion.div
        className={`w-58 ml-60 md:ml-0 bottom-10 md:bottom-0 md:top-0 justify-center items-center md:w-64 h-70 rounded-lg flex flex-col ${
          hoveredCards[index] ? "bg-accent text-white" : "bg-card text-text"
        } shadow-lg pointer-events-auto relative overflow-hidden cursor-pointer border-1 border-primary/40`}
        onHoverStart={() => handleHover(index, true)}
        onHoverEnd={() => handleHover(index, false)}
        initial="hidden"
        animate="visible"
        whileHover={{ scale: 1.1, transition: { duration: 0.4 } }}
      >
        {!hoveredCards[index] ? (
          <div className="flex items-center justify-center h-full p-6 text-center">
            <h2 className="text-lg md:text-xl font-bold font-mono">{title}</h2>
          </div>
        ) : (
          <div className="flex flex-col h-full">
            <div className="p-3 md:p-4 bg-accent text-white rounded-t-lg border-b font-semibold border-gray-300">
              <h2 className="text-lg md:text-xl font-bold text-center">
                {title}
              </h2>
            </div>
            <div className="flex-1 p-4 md:p-6 overflow-y-auto bg-card text-text text-center">
              <p className="text-sm md:text-base">{description}</p>
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
  );

  return (
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
        {isLogged && (
          <MenuRight
            name={nameState}
            email={emailState}
            profileImage={avatar}
          />
        )}
      </AnimatedContent>
      <Footer />
      <Navbar />
      <SideBar />
      <div className="flex flex-col md:flex-row items-center justify-items w-full h-full p-2 gap-1">
        <div className="flex justify-center items-center w-full md:w-1/2 mt-22 md:mt-38 md:ml-68">
          <HeroSection />
        </div>
        <div className="w-full md:w-1/2 flex flex-col items-center mt-25 mr-30">
          <p className="orbitron items-center text-md mb-1 text-center hidden lg:block xl:block mr-4">
            ¿Qué vamos a estudiar primero?
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-14 mt-10 mr-10">
            {cardData.map((data, index) => renderCard(index, data))}
          </div>
        </div>
      </div>
    </div>
  );
};

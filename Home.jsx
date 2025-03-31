import Squares from "./src/components/effectcomponents/Squares";
import { Navbar } from "./src/components/Navbar";
import { ButtonAdmin } from "./src/components/ButtonAdmin";
import { MenuRight } from "./src/components/MenuRight";
import { SideBar } from "./src/components/SideBar";
import { HeroSection } from "./src/components/HeroSection";
import { Footer } from "./src/components/Footer";
import AnimatedContent from "./src/components/effectcomponents/AnimatedContent";
import { useUserStore } from "./src/store/userStore";
import { motion } from "framer-motion";
import { Link } from "react-router";
import { useState, useEffect, useRef } from "react";
import useExtractInfo from "./src/hooks/useExtractInfo";
import { useTheme } from "./src/store/useTheme";
import { DarkModeSwitcher } from "./src/components/DarkModeSwitcher";

export const Home = () => {


  const {theme, toggleTheme} = useTheme()

  const { isLogged } = useUserStore();
  const { emailState, nameState, avatar } = useExtractInfo();
  const [hoveredCards, setHoveredCards] = useState([
    false,
    false,
    false,
    false,
  ]);
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const sideBarRef = useRef(null);

  const handleHover = (index, isHovered) => {
    setHoveredCards((prev) =>
      prev.map((state, i) => (i === index ? isHovered : state))
    );
  };

  const toggleSideBar = () => {
    setIsSideBarOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        window.innerWidth < 768 &&
        sideBarRef.current &&
        !sideBarRef.current.contains(event.target)
      ) {
        setIsSideBarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const cardData = [
    {
      path: "/eligecategoria/coding",
      title: "Coding Flashcards",
      description: "¿Quieres mejorar tu habilidad como programador?",
      backgroundImage: "/notebook.jpg",
    },
    {
      path: "/eligecategoria/concept",
      title: "Concept Flashcards",
      description: "¡Aprende la teoría de las tecnologías más demandadas!",
      backgroundImage: "/livros1.jpg",
    },
    {
      path: "/eligecategoria/entrevista",
      title: "Preguntas de Entrevistas",
      description: "¡Preparate para una entrevista laboral!",
      backgroundImage: "/entrevista.jpg",
    },
    {
      path: "/eligecategoria/custom",
      title: "Custom FlashCards",
      description: "Crea tus propias Flashcards y ¡practica!",
      backgroundImage: "/formulario.jpg",
    },
  ];

  const renderCard = (index, { path, title, description, backgroundImage }) => (
    <Link to={path} key={index}>
      <motion.div
        className={`w-full max-w-[16rem] h-60 rounded-lg flex flex-col shadow-lg pointer-events-auto relative overflow-hidden cursor-pointer 
          ${
            hoveredCards[index]
              ? "bg-accent text-white"
              : "bg-card dark:bg-[#919191] text-text dark:text-black"
          } 
          md:w-64 md:h-70 md:ml-0 md:bottom-0 md:top-0`}
        onHoverStart={() => handleHover(index, true)}
        onHoverEnd={() => handleHover(index, false)}
        initial="hidden"
        animate="visible"
        whileHover={{ scale: 1.1, transition: { duration: 0.4 } }}
      >
        {!hoveredCards[index] ? (
          <div
            className="flex items-center justify-center h-full p-4 md:p-6 text-center bg-cover bg-center"
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${backgroundImage})`,
            }}
          >
            <h2
              className="text-base md:text-2xl font-bold font-mono text-white orbitran"
            >
              {title}
            </h2>
          </div>
        ) : (
          <div className="flex flex-col h-full">
            <div className="p-3 md:p-4 bg-accent text-white rounded-t-lg border-b font-semibold border-gray-300 dark:border-black">
              <h2 className="text-base md:text-xl font-bold text-center">
                {title}
              </h2>
            </div>
            <div className="flex-1 p-4 md:p-6 overflow-y-auto bg-card dark:bg-[#919191] text-text dark:text-black text-center">
              <p className="text-sm md:text-base">{description}</p>
            </div>
            <div className="p-3 md:p-4 bg-card dark:bg-[#919191] rounded-b-lg border-t border-gray-300 dark:border-black text-center">
              <p className="text-xs md:text-sm text-text dark:text-black">
                ¡Haga clic para comenzar!
              </p>
            </div>
          </div>
        )}
      </motion.div>
    </Link>
  );

  return (
    <div className="relative w-full min-h-screen flex">
      <div ref={sideBarRef} className="hidden md:block md:w-60">
        <SideBar isOpen={true} setIsOpen={() => {}} />
      </div>
      <div className="flex-1 relative bg-white dark:bg-[#3C4043]">
        <div className="absolute inset-0 z-0">
          <Squares
            speed={0.1}
            direction="diagonal"
            hoverFillColor="#81A4CD"
          />
        </div>
        <ButtonAdmin />
        <DarkModeSwitcher />
        {isLogged && (
          <MenuRight
            name={nameState}
            email={emailState}
            profileImage={avatar}
            className="relative z-50 pointer-events-auto"
          />
        )}
        <AnimatedContent
          distance={150}
          direction="vertical"
          reverse={false}
          config={{ tension: 80, friction: 20 }}
          initialOpacity={0.2}
          animateOpacity
          scale={0.1}
          threshold={0.2}
          className="relative z-40 pointer-events-none"
        ></AnimatedContent>
        <Footer />
        <Navbar toggleSideBar={toggleSideBar} />
        <div className="md:hidden">
          <SideBar isOpen={isSideBarOpen} setIsOpen={setIsSideBarOpen} />
        </div>
        <div className="flex flex-col items-center w-full p-2 gap-1 md:flex-row md:items-center md:h-full md:gap-1 relative z-10">
          <div className="flex justify-center items-center w-full md:scale-105 mt-20 md:w-1/2 md:mt-25 md:ml-20">
            <HeroSection />
          </div>
          <div className="w-full flex flex-col items-center mt-8 md:w-1/2 md:mt-25 md:mr-30">
            <p className="orbitron text-sm text-center md:text-md md:mb-1 lg:block xl:block md:mr-4">
              ¿Qué vamos a estudiar primero?
            </p>
            <div className="grid grid-cols-1 gap-6 mt-6 md:grid-cols-2 md:gap-14 md:mt-10 md:mr-10 last:pb-20">
              {cardData.map((data, index) => renderCard(index, data))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
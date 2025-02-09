import Squares from "../../components/effectcomponents/Squares";
import { Navbar } from "../../components/Navbar";
import { MenuRight } from "../../components/MenuRight";
import AnimatedContent from "../../components/effectcomponents/AnimatedContent";
import { useUserStore } from "../../store/userStore";
import { decodeToken } from "../../utils/decodeToken";
import { motion } from "framer-motion";
import { Link } from "react-router";

export const Home = () => {
  const { isLogged } = useUserStore();

  const token = localStorage.getItem("token");

  const extraerName = () => {
    if (token) {
      const { name } = decodeToken(token);
      return name;
    }
    return;
  };

  const extraerEmail = () => {
    if (token) {
      const { sub } = decodeToken(token);
      return sub;
    }
    return;
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
    hover: { scale: 1.1, transition: { duration: 0.3 } },
  };

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
            <MenuRight name={extraerName()} email={extraerEmail()} />
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
          <div className="flex flex-wrap gap-14 w-[600px] max-w-4xl justify-center mt-10">
            <motion.div
              className="w-64 h-64 rounded-full flex items-center justify-center bg-card text-text text-center p-6 shadow-lg pointer-events-auto relative overflow-hidden cursor-pointer"
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
            >
              <h2 className="text-xl md:text-2xl font-bold font-mono">
                Preguntas de Entrevista
              </h2>
              <div
                className="absolute inset-0 text-white bg-opacity-80 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300"
                style={{
                  background:
                    "linear-gradient(135deg, var(--color-primary), var(--color-secondary))",
                }}
              >
                <p className="text-sm p-4">
                  Descrição breve sobre o card de perguntas de entrevista...
                </p>
              </div>
            </motion.div>

            <motion.div
              className="w-64 h-64 rounded-full flex items-center justify-center bg-card text-text text-center p-6 shadow-lg pointer-events-auto relative overflow-hidden cursor-pointer"
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
            >
              <h2 className="text-xl md:text-2xl font-bold font-mono">
                Practica
              </h2>
              <div
                className="absolute inset-0 text-white bg-opacity-80 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300"
                style={{
                  background:
                    "linear-gradient(135deg, var(--color-accent), var(--color-muted))",
                }}
              >
                <p className="text-sm p-4">
                  Descrição breve sobre o card de prática...
                </p>
              </div>
            </motion.div>

            <motion.div
              className="w-64 h-64 rounded-full flex items-center justify-center bg-card text-text text-center p-6 shadow-lg pointer-events-auto relative overflow-hidden cursor-pointer"
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
            >
              <h2 className="text-xl md:text-2xl font-bold font-mono">
                Coding Flashcards
              </h2>
              <div
                className="absolute inset-0 text-white bg-opacity-80 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300"
                style={{
                  background:
                    "linear-gradient(135deg, var(--color-muted), var(--color-accent))",
                }}
              >
                <p className="text-sm p-4">
                  Descrição breve sobre o card de flashcards de programação...
                </p>
              </div>
            </motion.div>

            <motion.div
              className="w-64 h-64 rounded-full flex items-center justify-center bg-card text-text text-center p-6 shadow-lg pointer-events-auto relative overflow-hidden cursor-pointer"
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
            >
              <h2 className="text-xl md:text-2xl font-bold font-mono">
                Custom Flashcards
              </h2>
              <div
                className="absolute inset-0 text-white bg-opacity-80 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300"
                style={{
                  background:
                    "linear-gradient(135deg, var(--color-secondary), var(--color-primary))",
                }}
              >
                <p className="text-sm p-4">
                  Descrição breve sobre o card de flashcards personalizados...
                </p>
              </div>
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

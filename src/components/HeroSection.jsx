import Typewriter from "typewriter-effect";
import { motion } from "framer-motion";

export const HeroSection = () => {
  return (
    <motion.div
      className="relative flex items-center justify-center w-full max-w-[680px] h-[400px] sm:h-[500px] md:h-[600px] lg:h-[600px] 
                  rounded-lg shadow-lg overflow-hidden border border-primary/40 z-20"
      initial={{ opacity: 0, x: 100 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/Programadorsorriendo.webp')",
          backgroundSize: "cover",
        }}
      />

      <div
        className="absolute inset-0 rounded-lg overflow-hidden"
        style={{
          boxShadow: `inset 0 0 50px 20px rgba(5, 74, 145, 0.5), inset 0 0 80px 40px rgba(62, 124, 177, 0.3)`,
        }}
      />

      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 p-4 sm:p-6 flex flex-col justify-between h-full text-white text-xs sm:text-base">
        <h1 className="text-lg sm:text-4xl p-2 sm:p-3 text-center font-bold mb-2 sm:mb-4 text-white bg-clip-text">
          ¡Bienvenido a{" "}
          <span className="orbitron p-1 sm:p-2 text-sm sm:text-base">
            Flash4Devs
          </span>
          !
        </h1>

        <div className="mt-2 sm:mt-4 p-2 sm:p-4 bg-black/30 backdrop-blur-sm rounded-lg border border-white/10">
          <p className="text-sm sm:text-xl font-semibold text-center">
            <Typewriter
              options={{
                strings: [
                  "¡Todo lo que necesitas para ser Programador!",
                  "¡Aprende eficientemente y alcanza tus objetivos!",
                  "¡Mejora tus habilidades y consigue el trabajo que deseas!",
                ],
                autoStart: true,
                loop: true,
              }}
            />
          </p>
        </div>
      </div>
    </motion.div>
  );
};

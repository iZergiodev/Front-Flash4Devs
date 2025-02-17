import Typewriter from "typewriter-effect";
import { motion } from "framer-motion";

export const HeroSection = () => {
  return (
    <motion.div
      className="absolute flex inset-0 items-center justify-center w-[680px] h-[700px] top-33 left-155 rounded-lg shadow-lg overflow-hidden border border-primary/40 z-20"
      initial={{ opacity: 0, x: 100 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      {/* Imagem de fundo */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/Programadorsorriendo.webp')" }}
      />

      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10 p-6 flex flex-col justify-between h-full text-white">
        <h1 className="text-4xl p-3 text-center font-bold mb-4 text-white bg-clip-text">
          ¡Bienvenido a{" "}
          <span className="orbitron p-2">
            Flash4Devs
          </span>
          !
        </h1>

        <div className="mt-4 p-4 bg-black/30 backdrop-blur-sm rounded-lg border border-white/10">
          <p className="text-xl font-semibold text-center">
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

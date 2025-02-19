import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import GradientText from "../../components/effectcomponents/GradientText";
import Squares from "../../components/effectcomponents/Squares";

// import FotoYago from "../../../public/yagop.jpg";
// import FotoSergio from "../../../public/sergio.jpeg";

export const AboutUs = () => {
  return (
    <>
      <Navbar />
      <div className="relative min-h-screen overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Squares
            speed={0.5}
            squareSize={40}
            direction="diagonal"
            borderColor="rgba(241, 115, 0, 0.2)"
            hoverFillColor="#81A4CD"
          />
        </div>
        <div className="relative z-20">
          <Navbar />
          <Footer />
        </div>
        <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4 pointer-events-none">
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl font-bold text-primary mb-8 pointer-events-auto"
          >
          </motion.h1>
          <div className="flex flex-row gap-24">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-card p-6 rounded-lg shadow-xl flex flex-col items-center w-120 pointer-events-auto"
            >
              <img
                src="/yagop.jpg"
                alt="yago"
                className="w-110 h-110 rounded mb-4 shadow-xl"
              />
              <h2 className="text-xl font-extrabold text-center text-primary">
                Yago Cima Castelao{" "}
                <span className="text-text font-semibold italic">
                  <GradientText
                    colors={[
                      "#054A91",
                      "#F17300",
                      "#054A91",
                      "#F17300",
                      "#054A91",
                    ]}
                    animationSpeed={3}
                    showBorder={false}
                    className="custom-class"
                  >
                    &quot;CodePanthom&quot;
                  </GradientText>
                </span>
              </h2>
              <p className="text-center mt-2">
                Control absoluto de los datos digitales, capaz de reescribir
                códigos y sistemas en tiempo real!
              </p>
              <div className="flex justify-center gap-6 mt-4">
                <a
                  href="https://github.com/YagoCastelao"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaGithub
                    className="text-accent hover:text-primary transition-colors duration-300"
                    size={24}
                  />
                </a>
                <a
                  href="https://linkedin.com/in/yagocimacastelao/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaLinkedin
                    className="text-accent hover:text-primary transition-colors duration-300"
                    size={24}
                  />
                </a>
                <a
                  href="https://twitter.com/yagocastelau"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaTwitter
                    className="text-accent hover:text-primary transition-colors duration-300"
                    size={24}
                  />
                </a>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-card p-6 rounded-lg shadow-xl flex flex-col items-center w-120 pointer-events-auto"
            >
              <img
                src="/sergio.jpeg"
                alt="sergio"
                className="w-100 h-110 rounded mb-4 shadow-xl"
              />
              <h2 className="text-xl font-extrabold text-center text-primary">
                Sergio Carretero Molina{" "}
                <span className="text-text font-semibold italic">
                  <GradientText
                    colors={[
                      "#054A91",
                      "#F17300",
                      "#054A91",
                      "#F17300",
                      "#054A91",
                    ]}
                    animationSpeed={3}
                    showBorder={false}
                    className="custom-class"
                  >
                    &quot;CaffeinMaster&quot;
                  </GradientText>
                </span>
              </h2>
              <p className="text-center mt-2">
                Capaz de bajar y subir mis niveles de cafeina según mi antojo!
              </p>
              <div className="flex justify-center gap-6 mt-4">
                <a
                  href="https://github.com/iZergiodev"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaGithub
                    className="text-accent hover:text-primary transition-colors duration-300"
                    size={24}
                  />
                </a>
                <a
                  href="https://linkedin.com/in/izergiodev/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaLinkedin
                    className="text-accent hover:text-primary transition-colors duration-300"
                    size={24}
                  />
                </a>
                <a
                  href="https://twitter.com/yagocastelau"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaTwitter
                    className="text-accent hover:text-primary transition-colors duration-300"
                    size={24}
                  />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

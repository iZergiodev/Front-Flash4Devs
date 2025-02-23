import { motion } from "framer-motion";
import React from "react";
import { useUserStore } from "../store/userStore";
import AnimatedContent from "../components/effectcomponents/AnimatedContent";
import useExtractInfo from "../hooks/useExtractInfo";
import { FaBook } from "react-icons/fa";
import { Fa1, Fa2, Fa3, Fa4 } from "react-icons/fa6";
import {
  FaReact,
  FaCss3,
  FaHtml5,
  FaPython,
  FaJs,
  FaGit,
} from "react-icons/fa";

import Squares from "../components/effectcomponents/Squares";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { MenuRight } from "../components/MenuRight";

const tecnologias = [
  {
    nome: "React",
    icone: <FaReact />,
    descricao:
      "React es una biblioteca de JavaScript para crear interfaces de usuario usando componentes reutilizables y el eficiente Virtual DOM. Es ideal para construir aplicaciones web modernas, dinámicas y de alto rendimiento.",
    versao: "18.2.0",
    documentacao: "https://reactjs.org/docs/getting-started.html",
    logo: "/icons/React.svg",
  },
  {
    nome: "CSS",
    icone: <FaCss3 />,
    descricao:
      "CSS (Cascading Style Sheets) es un lenguaje utilizado para estilizar páginas web, controlando colores, fuentes, tamaños, márgenes, posicionamiento y diseño. Trabaja junto con HTML para definir la apariencia visual y la responsividad de un sitio.",
    versao: "CSS3",
    documentacao: "https://developer.mozilla.org/pt-BR/docs/Web/CSS",
    logo: "/icons/CSS3.svg",
  },
  {
    nome: "HTML",
    icone: <FaHtml5 />,
    descricao:
      "HTML (HyperText Markup Language) es el lenguaje utilizado para estructurar páginas web, definiendo elementos como títulos, textos, imágenes y enlaces. Es la base de cualquier sitio web, funcionando como el esqueleto que organiza el contenido.",
    versao: "HTML5",
    documentacao: "https://developer.mozilla.org/pt-BR/docs/Web/HTML",
    logo: "/icons/HTML5.svg",
  },
  {
    nome: "Python",
    icone: <FaPython />,
    descricao:
      "Python es un lenguaje de programación simple y potente, ideal para principiantes por su sintaxis intuitiva. Versátil y popular, se usa en desarrollo web, ciencia de datos, automatización e inteligencia artificial.",
    versao: "3.10.0",
    documentacao: "https://docs.python.org/3/",
    logo: "/icons/Python.svg",
  },
  {
    nome: "JavaScript",
    icone: <FaJs />,
    descricao:
      "JavaScript es un lenguaje de programación utilizado para añadir interactividad a páginas web, como animaciones, botones dinámicos y validación de formularios. Es esencial en el desarrollo front-end y funciona directamente en los navegadores.",
    versao: "ES2022",
    documentacao: "https://developer.mozilla.org/pt-BR/docs/Web/JavaScript",
    logo: "/icons/JavaScript.svg",
  },
  {
    nome: "Git",
    icone: <FaGit />,
    descricao:
      "Git es un sistema de control de versiones que permite rastrear cambios en el código, colaborar con otros programadores y gestionar proyectos de forma segura. Es ampliamente utilizado para organizar y versionar archivos en el desarrollo de software.",
    versao: "2.37.0",
    documentacao: "https://git-scm.com/doc",
    logo: "/icons/Git.svg",
  },
];

export const Biblioteca = () => {
  const [indiceAtual, setIndiceAtual] = React.useState(0);
  const { isLogged } = useUserStore();
  const { emailState, nameState, avatar } = useExtractInfo();

  const proximoCard = () => {
    setIndiceAtual((prev) => (prev + 1) % tecnologias.length);
  };

  const anteriorCard = () => {
    setIndiceAtual(
      (prev) => (prev - 1 + tecnologias.length) % tecnologias.length
    );
  };

  return (
    <div className="relative w-full min-h-screen">
      <div className="absolute inset-0 z-0">
        <Squares
          speed={0.1}
          squareSize={20} // Móvil
          md={{ squareSize: 40 }} // Escritorio
          direction="diagonal"
          borderColor="rgba(241, 115, 0, 0.2)"
          hoverFillColor="#81A4CD"
        />
      </div>
      {/* Movemos MenuRight fuera de AnimatedContent */}
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
      >
        {/* Otros elementos animados si los hubiera */}
      </AnimatedContent>
      <Footer />
      <Navbar />
      <div className="flex flex-col justify-center lg:flex-row w-full p-4 lg:p-8 lg:gap-1 relative z-10">
        <div className="w-full lg:w-1/3 p-6 bg-card rounded-lg shadow-lg mb-8 lg:mb-10 lg:mr-2 lg:mt-30 lg:ml-60 mt-20">
          <h2 className="orbitron text-xl font-bold text-text mb-4 text-center">
            Como comenzar a estudiar
          </h2>
          <div className="flex">
            <FaBook className="mr-2 mt-1 text-accent" />
            <p className="text-text mb-4">
              Siga los pasos a continuación para comenzar a aprender sobre las
              Tecnologías:
            </p>
          </div>
          <ol className="list-none list-inside space-y-2">
            <li className="text-gray-700 flex items-center">
              <Fa1 className="mr-2 text-text" /> Elija una tecnología en el
              carrusel de al lado;
            </li>
            <li className="text-gray-700 flex items-center">
              <Fa2 className="mr-2 text-text" /> Lea una breve descripción y qué
              versión es actualmente;
            </li>
            <li className="text-gray-700 flex items-center">
              <Fa3 className="mr-2 text-text" /> Accede a la documentación
              oficial para profundizar más;
            </li>
            <li className="text-gray-700 flex items-center">
              <Fa4 className="mr-2 text-text" /> ¡Luego elige la FlashCard que
              quieres y empieza a Jugar!
            </li>
          </ol>
          <div className="mt-6 flex justify-center">
            <img
              src="/programador.webp"
              alt="Descrição da imagem"
              className="w-90 h-auto max-h-[50%] object-cover rounded-lg"
            />
          </div>
        </div>

        <div className="w-full lg:flex-1 flex items-center justify-center lg:mt-22">
          <button
            onClick={anteriorCard}
            className="p-4 bg-card text-text rounded-full shadow-lg hover:bg-accent transition-colors"
          >
            {"<"}
          </button>

          <motion.div
            key={indiceAtual}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-[650px] h-[670px] bg-white rounded-lg shadow-2xl overflow-hidden mx-4"
          >
            <div className="flex items-center justify-center p-6 bg-primary">
              <img
                src={tecnologias[indiceAtual].logo}
                alt="Logo"
                className="w-16 h-16 mr-4"
              />
              <h2 className="text-3xl font-bold text-white">
                {tecnologias[indiceAtual].nome}
              </h2>
            </div>

            <div className="p-6 flex flex-col items-center">
              <div className="text-6xl text-gray-800 mb-4">
                {tecnologias[indiceAtual].icone}
              </div>
              <p className="text-lg text-gray-600 text-center">
                {tecnologias[indiceAtual].descricao}
              </p>
              <div className="w-full p-6 bg-gray-100">
                <p className="text-sm text-gray-700">
                  Versión: {tecnologias[indiceAtual].versao}
                </p>
                <a
                  href={tecnologias[indiceAtual].documentacao}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Documentación oficial
                </a>
              </div>
            </div>
          </motion.div>

          <button
            onClick={proximoCard}
            className="p-4 bg-card text-text rounded-full shadow-lg hover:bg-accent transition-colors"
          >
            {">"}
          </button>
        </div>
      </div>
    </div>
  );
};
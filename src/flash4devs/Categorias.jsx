import Squares from "../components/effectcomponents/Squares";
import { Navbar } from "../components/Navbar";
import { MenuRight } from "../components/MenuRight";
import { Footer } from "../components/Footer";
import { Link } from "react-router";
import useExtractInfo from "../hooks/useExtractInfo";

export const Categorias = () => {
  const { emailState, nameState, avatar } = useExtractInfo();

  const frontendTechnologies = [
    {
      nombre: "React",
      logo: "/icons/React.svg",
      descripcion:
        "React es una biblioteca de JavaScript para crear interfaces de usuario usando componentes reutilizables y el eficiente Virtual DOM. Es ideal para aplicaciones web modernas.",
    },
    {
      nombre: "CSS",
      logo: "/icons/CSS3.svg",
      descripcion:
        "CSS estiliza páginas web, controlando colores, fuentes, tamaños y diseño. Es esencial para la apariencia visual y responsividad junto con HTML.",
    },
    {
      nombre: "HTML",
      logo: "/icons/HTML5.svg",
      descripcion:
        "HTML estructura páginas web, definiendo elementos como títulos, textos e imágenes. Es la base de cualquier sitio web.",
    },
    {
      nombre: "JavaScript",
      logo: "/icons/JavaScript.svg",
      descripcion:
        "JavaScript añade interactividad a páginas web, como animaciones y validación de formularios. Es clave en el desarrollo front-end.",
    },
    {
      nombre: "TypeScript",
      logo: "/icons/TypeScript.png",
      descripcion:
        "TypeScript es un superset de JavaScript con tipagem estática, usado em projetos React para maior segurança e escalabilidade.",
    },
    {
      nombre: "Angular",
      logo: "/icons/Angular.png",
      descripcion:
        "Angular es un framework de JavaScript/TypeScript para crear aplicaciones web dinámicas, com two-way data binding e uma arquitetura estruturada.",
    },
  ];

  const backendTechnologies = [
    {
      nombre: "Python",
      logo: "/icons/Python.svg",
      descripcion:
        "Python es un lenguaje simple y potente, usado em desarrollo web, ciencia de datos, automatización e inteligencia artificial.",
    },
    {
      nombre: "Git",
      logo: "/icons/Git.svg",
      descripcion:
        "Git es un sistema de control de versiones para rastrear cambios de código y colaborar en proyectos de software.",
    },
    {
      nombre: "Node.js",
      logo: "/icons/NodeJS.svg",
      descripcion:
        "Node.js es un entorno de ejecución de JavaScript del lado del servidor ideal para API y aplicaciones back-end escalables.",
    },
    {
      nombre: "FastAPI",
      logo: "/icons/FastAPI.png",
      descripcion:
        "FastAPI es un framework moderno y rápido para crear APIs en Python, basado en Starlette y Pydantic. Soporta async/await, validación automática de datos y genera documentación interactiva. Es ideal para aplicaciones escalables y de alto rendimiento.",
    },
    {
      nombre: "SQL",
      logo: "/icons/SQL.png",
      descripcion:
        "SQL es un lenguaje para gestionar bases de datos relacionales, esencial para almacenar y consultar datos en el backend.",
    },
    {
      nombre: "MongoDB",
      logo: "/icons/MongoDB.png",
      descripcion:
        "MongoDB es una popular base de datos NoSQL en el backend, ideal para almacenar datos flexibles en aplicaciones modernas.",
    },
  ];

  return (
    <div className="relative w-full min-h-screen flex flex-col dark:bg-[#3C4043]">
      <div className="absolute inset-0 z-0">
        <Squares
          speed={0.1}
          direction="diagonal"
          hoverFillColor="#81A4CD"
        />
      </div>
      <div className="relative z-40">
        <Navbar />
      </div>
      <div className="relative z-50 pointer-events-auto">
        <MenuRight name={nameState} email={emailState} profileImage={avatar} />
      </div>
      <div className="fixed bottom-0 left-0 flex flex-col items-center z-100 hidden lg:block">
        <div className="relative">
          <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 bg-white dark:bg-[#e4e2e2] text-gray-900 p-5 rounded-full shadow-md w-70 flex flex-col items-center text-center border border-gray-300 dark:border-black z-50 before:content-[''] before:absolute before:-bottom-4 before:left-1/2 before:-translate-x-1/2 before:w-6 before:h-6 before:bg-white before:rounded-full before:border before:border-gray-300 before:shadow-md">
            <p className="text-text dark:text-black">
              ¡Hola! Si quieres leer la documentación oficial de cada categoría
            </p>
            <Link
              to="/biblioteca"
              className="text-text hover:text-accent transition-colors duration-200 cursor-pointer pt-2"
            >
              ¡Haga clic!
            </Link>
          </div>
          <img
            src="/Programadora.png"
            alt="Programadora"
            className="w-80 h-auto object-cover rounded-lg shadow-xl"
          />
        </div>
      </div>

      <div className="relative z-10 flex flex-col items-center p-4 md:p-4 flex-1">
        <div className="max-w-[1100px] w-full mt-20 md:mt-23">
          <h1 className="orbitron text-2xl md:text-3xl font-bold text-primary mb-6 text-center">
            Categorías Frontend
          </h1>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-6 mb-12">
            {frontendTechnologies.map((tech, index) => (
              <div
                key={index}
                className="w-full max-w-[320px] h-70 md:w-80 md:h-80 bg-white dark:bg-[#919191] rounded-lg shadow-lg flex flex-col items-center transform transition-transform hover:scale-105 mx-auto"
              >
                <div className="w-full text-center mb-4 bg-card dark:bg-accent p-3 md:p-3 border-b border-gray-300 dark:border-black rounded-t-lg">
                  <h2 className="text-lg md:text-xl font-bold text-text dark:text-black">
                    {tech.nombre}
                  </h2>
                </div>
                <div className="w-full flex justify-center items-center mb-4 mt-2 md:mt-4 rounded-lg">
                  <img
                    src={tech.logo}
                    alt={`Logo ${tech.nombre}`}
                    className="w-20 h-20 md:w-28 md:h-25 object-contain"
                  />
                </div>
                <div className="w-full text-center mt-2 md:mt-3 p-3 md:p-4 border-t border-gray-200 dark:border-black rounded-b-lg">
                  <p className="text-xs md:text-xs text-text dark:text-black">
                    {tech.descripcion}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <h1 className="orbitron text-2xl md:text-3xl font-bold text-primary mb-6 text-center">
            Categorías Backend
          </h1>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-6 last:pb-20">
            {backendTechnologies.map((tech, index) => (
              <div
                key={index}
                className="w-full max-w-[320px] h-80 md:w-80 md:h-88 bg-white dark:bg-[#919191] rounded-lg shadow-lg flex flex-col items-center transform transition-transform hover:scale-105 mx-auto"
              >
                <div className="w-full text-center mb-4 bg-card dark:bg-accent p-3 md:p-3 border-b border-gray-300 dark:border-black rounded-t-lg">
                  <h2 className="text-lg md:text-xl font-bold text-text dark:text-black">
                    {tech.nombre}
                  </h2>
                </div>
                <div className="w-full flex justify-center items-center mb-4 mt-2 md:mt-4 rounded-lg">
                  <img
                    src={tech.logo}
                    alt={`Logo ${tech.nombre}`}
                    className="w-20 h-20 md:w-28 md:h-25 object-contain"
                  />
                </div>
                <div className="w-full text-center mt-2 md:mt-3 p-3 md:p-4 border-t border-gray-200 dark:border-black rounded-b-lg">
                  <p className="text-xs md:text-xs text-text dark:text-black">
                    {tech.descripcion}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

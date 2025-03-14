import { Link } from "react-router";

  const frontendTechnologies = [
    {
      nome: "React",
      logo: "/icons/React.svg",
      descripcion:
        "React es una biblioteca de JavaScript para crear interfaces de usuario usando componentes reutilizables y el eficiente Virtual DOM. Es ideal para aplicaciones web modernas.",
    },
    {
      nome: "CSS",
      logo: "/icons/CSS3.svg",
      descripcion:
        "CSS estiliza páginas web, controlando colores, fuentes, tamaños y diseño. Es esencial para la apariencia visual y responsividad junto con HTML.",
    },
    {
      nome: "HTML",
      logo: "/icons/HTML5.svg",
      descripcion:
        "HTML estructura páginas web, definiendo elementos como títulos, textos e imágenes. Es la base de cualquier sitio web.",
    },
    {
      nome: "JavaScript",
      logo: "/icons/JavaScript.svg",
      descripcion:
        "JavaScript añade interactividad a páginas web, como animaciones y validación de formularios. Es clave en el desarrollo front-end.",
    },
    {
      nome: "TypeScript",
      logo: "/icons/TypeScript.png",
      descripcion:
        "TypeScript es un superset de JavaScript con tipagem estática, usado em projetos React para maior segurança e escalabilidade.",
    },
    {
      nome: "Angular",
      logo: "/icons/Angular.png",
      descripcion:
        "Angular es un framework de JavaScript/TypeScript para crear aplicaciones web dinámicas, com two-way data binding e uma arquitetura estruturada.",
    },
  ];

  const backendTechnologies = [
    {
      nome: "Python",
      logo: "/icons/Python.svg",
      descripcion:
        "Python es un lenguaje simple y potente, usado em desarrollo web, ciencia de datos, automatización e inteligencia artificial.",
    },
    {
      nome: "Git",
      logo: "/icons/Git.svg",
      descripcion:
        "Git es un sistema de control de versiones para rastrear cambios de código y colaborar en proyectos de software.",
    },
    {
      nome: "Node.js",
      logo: "/icons/NodeJS.svg",
      descripcion:
        "Node.js es un entorno de ejecución de JavaScript del lado del servidor ideal para API y aplicaciones back-end escalables.",
    },
    {
      nome: "FastAPI",
      logo: "/icons/FastAPI.png",
      descripcion:
        "FastAPI es un framework moderno y rápido para crear APIs en Python, basado en Starlette y Pydantic. Soporta async/await, validación automática de datos y genera documentación interactiva. Es ideal para aplicaciones escalables y de alto rendimiento.",
    },
    {
      nome: "SQL",
      logo: "/icons/SQL.png",
      descripcion:
        "SQL es un lenguaje para gestionar bases de datos relacionales, esencial para almacenar y consultar datos en el backend.",
    },
    {
      nome: "MongoDB",
      logo: "/icons/MongoDB.png",
      descripcion:
        "MongoDB es una popular base de datos NoSQL en el backend, ideal para almacenar datos flexibles en aplicaciones modernas.",
    },
  ];

export const CodingCategorias = () => {
  return (
    <div className="w-full min-h-screen h-full overflow-auto">
      <div className="max-w-[900px] mx-auto p-4 mt-16 md:mt-30">
        <h1 className="bg-card dark:bg-[#919191] text-center p-4 md:p-6 font-extrabold text-text dark:text-black text-xl md:text-2xl rounded-full shadow-lg">
          ¡Elige una categoría para comenzar las Coding Flashcards!
        </h1>
        <h1 className="orbitron text-2xl md:text-3xl font-bold text-primary mt-5 text-center">
          Categorías Frontend
        </h1>
        <div className="grid grid-cols-1 gap-6 mt-6 md:grid-cols-3 md:gap-10 md:mt-10 last:pb-20">
          {frontendTechnologies.map((tech, index) => (
            <Link
              key={index}
              to={`/flashcards/coding/${tech.nome.toLowerCase()}`}
            >
              <div className="w-full max-w-[232px] h-56 md:w-58 md:h-58 bg-white dark:bg-[#919191] rounded-lg shadow-lg flex flex-col items-center transform transition-transform hover:scale-105 border-b border-gray-300 dark:border-black cursor-pointer mx-auto">
                <div className="w-full text-center mb-2 md:mb-4 bg-text/60 dark:bg-accent p-2 md:p-3 border-b border-gray-500 dark:border-black rounded-t-lg">
                  <h2 className="text-lg md:text-xl font-bold text-white dark:text-black">
                    {tech.nome}
                  </h2>
                </div>
                <div className="w-full flex justify-center items-center mb-4 mt-2 md:mt-4 rounded-lg">
                  <img
                    src={tech.logo}
                    alt={`Logo ${tech.nome}`}
                    className="w-30 h-30 md:w-30 md:h-30 object-contain"
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
         
         <h1 className="orbitron text-2xl md:text-3xl font-bold text-primary mt-5 text-center">
          Categorías Backend
        </h1>

        <div className="grid grid-cols-1 gap-6 mt-6 md:grid-cols-3 md:gap-10 md:mt-10 last:pb-20">
          {backendTechnologies.map((tech, index) => (
            <Link
              key={index}
              to={`/flashcards/coding/${tech.nome.toLowerCase()}`}
            >
              <div className="w-full max-w-[232px] h-56 md:w-58 md:h-58 bg-white dark:bg-[#919191] rounded-lg shadow-lg flex flex-col items-center transform transition-transform hover:scale-105 border-b border-gray-300 dark:border-black cursor-pointer mx-auto">
                <div className="w-full text-center mb-2 md:mb-4 bg-text/60 dark:bg-accent p-2 md:p-3 border-b border-gray-500 dark:border-black rounded-t-lg">
                  <h2 className="text-lg md:text-xl font-bold text-white dark:text-black">
                    {tech.nome}
                  </h2>
                </div>
                <div className="w-full flex justify-center items-center mb-4 mt-2 md:mt-4 rounded-lg">
                  <img
                    src={tech.logo}
                    alt={`Logo ${tech.nome}`}
                    className="w-30 h-30 md:w-30 md:h-30 object-contain"
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
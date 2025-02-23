import { Link } from "react-router";

const tecnologias = [
  {
    nome: "React",
    logo: "/icons/React.svg",
    descricao: "Biblioteca JavaScript para crear interfaces de usuario.",
  },
  {
    nome: "CSS",
    logo: "/icons/CSS3.svg",
    descricao: "Lenguaje de estilo para diseñar páginas web.",
  },
  {
    nome: "HTML",
    logo: "/icons/HTML5.svg",
    descripcion: "Lenguaje de marcado para estructurar contenido web.",
  },
  {
    nome: "Python",
    logo: "/icons/Python.svg",
    descripcion:
      "Lenguaje de programación para un desarrollo rápido y eficiente.",
  },
  {
    nome: "JavaScript",
    logo: "/icons/JavaScript.svg",
    descripcion: "Lenguaje de programación para interactividad en páginas web.",
  },
  {
    nome: "Git",
    logo: "/icons/Git.svg",
    descripcion:
      "Sistema de control de versiones para la gestión del código fuente.",
  },
];

export const CodingCategorias = () => {
  return (
    <div className="w-full min-h-screen h-full overflow-auto">
      <div className="max-w-[900px] mx-auto p-4 mt-16 md:mt-30">
        <h1 className="bg-card text-center p-4 md:p-6 font-extrabold text-text text-xl md:text-2xl rounded-full shadow-lg">
          ¡Elige una categoría para comenzar las Coding Flashcards!
        </h1>
        <div className="grid grid-cols-1 gap-6 mt-6 md:grid-cols-3 md:gap-10 md:mt-10 last:pb-20">
          {tecnologias.map((tech, index) => (
            <Link key={index} to={`/flashcards/coding/${tech.nome.toLowerCase()}`}>
              <div
                className="w-full max-w-[232px] h-56 md:w-58 md:h-58 bg-white rounded-lg shadow-lg flex flex-col items-center transform transition-transform hover:scale-105 border-b border-gray-300 cursor-pointer mx-auto"
              >
                <div className="w-full text-center mb-2 md:mb-4 bg-text/60 p-2 md:p-3 border-b border-gray-500 rounded-t-lg">
                  <h2 className="text-lg md:text-xl font-bold text-white">
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
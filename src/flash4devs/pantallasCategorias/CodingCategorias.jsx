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
      descricao: "Lenguaje de marcado para estructurar contenido web.",
    },
    {
      nome: "Python",
      logo: "/icons/Python.svg",
      descricao:
        "Lenguaje de programación para un desarrollo rápido y eficiente.",
    },
    {
      nome: "JavaScript",
      logo: "/icons/JavaScript.svg",
      descricao: "Lenguaje de programación para interactividad en páginas web.",
    },
    {
      nome: "Git",
      logo: "/icons/Git.svg",
      descricao:
        "Sistema de control de versiones para la gestión del código fuente.",
    },
  ];

export const CodingCategorias = () => {
  return (
    <div className="max-w-[900px] mx-auto p-4 mt-30">
    <h1 className="bg-card text-center p-6 font-extrabold text-text text-2xl rounded-full shadow-lg ">
      ¡Elige una categoria para comenzar las Coding Flashcards!
    </h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 mt-10">
      {tecnologias.map((tech, index) => (
        <Link key={index} to={`/flashcards/coding/${tech.nome.toLowerCase()}`}>
          <div
            className="w-58 h-58 bg-white rounded-lg shadow-lg flex flex-col items-center transform transition-transform hover:scale-105 border-b-1 border-gray-300 cursor-pointer"
          >
            <div className="w-full text-center mb-4 bg-text/60 p-3 border-b-1 border-gray-500 rounded-md">
              <h2 className="text-xl font-bold text-white">
                {tech.nome}
              </h2>
            </div>
            <div className="w-full flex justify-center items-center mb-4 mt-4 rounded-lg">
              <img
                src={tech.logo}
                alt={`Logo ${tech.nome}`}
                className="w-30 h-30"
              />
            </div>
          </div>
        </Link>
      ))}
    </div>
  </div>
  )
}

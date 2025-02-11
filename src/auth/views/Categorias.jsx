import Squares from "../../components/effectcomponents/Squares";
import { Navbar } from "../../components/Navbar";
import { MenuRight } from "../../components/MenuRight";
import useExtractInfo from "../../hooks/useExtractInfo";

export const Categorias = () => {
  const { emailState, nameState, avatar } = useExtractInfo();

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

  return (
    <>
      <div className="relative w-full h-screen overflow-hidden z-10">
        <div className="absolute inset-0 -z-10">
          <Squares
            speed={0.5}
            squareSize={40}
            direction="diagonal"
            borderColor="rgba(241, 115, 0, 0.4)"
            hoverFillColor="#81A4CD"
          />
        </div>
        <Navbar />
        <MenuRight name={nameState} email={emailState} profileImage={avatar} />
        <div className="max-w-[900px] mx-auto p-4 mt-30">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            {tecnologias.map((tech, index) => (
              <div
                key={index}
                className="w-58 h-80 bg-white rounded-lg shadow-lg flex flex-col items-center transform transition-transform hover:scale-105"
              >
                <div className="w-full text-center mb-4 bg-card p-3 border-b-1 border-gray-300 rounded-md">
                  <h2 className="text-xl font-bold text-text">{tech.nome}</h2>
                </div>
                <div className="w-full flex justify-center items-center mb-4 mt-4 rounded-lg">
                  <img
                    src={tech.logo}
                    alt={`Logo ${tech.nome}`}
                    className="w-28 h-25"
                  />
                </div>
                <div className="w-full text-center mt-3 p-4 border-t-1 border-gray-200">
                  <p className="text-sm text-text">{tech.descricao}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
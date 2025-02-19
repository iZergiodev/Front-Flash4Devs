import Squares from "../components/effectcomponents/Squares";
import { Navbar } from "../components/Navbar";
import { MenuRight } from "../components/MenuRight";
import { Footer } from "../components/Footer";
import useExtractInfo from "../hooks/useExtractInfo";

export const Categorias = () => {
  const { emailState, nameState, avatar } = useExtractInfo();

  const tecnologias = [
    {
      nombre: "React",
      logo: "/icons/React.svg",
      descripcion:
        "React es una biblioteca de JavaScript para crear interfaces de usuario usando componentes reutilizables y el eficiente Virtual DOM. Es ideal para construir aplicaciones web modernas, dinámicas y de alto rendimiento.",
    },
    {
      nombre: "CSS",
      logo: "/icons/CSS3.svg",
      descripcion:
        "CSS (Cascading Style Sheets) es un lenguaje utilizado para estilizar páginas web, controlando colores, fuentes, tamaños, márgenes, posicionamiento y diseño. Trabaja junto con HTML para definir la apariencia visual y la responsividad de un sitio.",
    },
    {
      nombre: "HTML",
      logo: "/icons/HTML5.svg",
      descripcion:
        "HTML (HyperText Markup Language) es el lenguaje utilizado para estructurar páginas web, definiendo elementos como títulos, textos, imágenes y enlaces. Es la base de cualquier sitio web, funcionando como el esqueleto que organiza el contenido.",
    },
    {
      nombre: "Python",
      logo: "/icons/Python.svg",
      descripcion:
        "Python es un lenguaje de programación simple y potente, ideal para principiantes por su sintaxis intuitiva. Versátil y popular, se usa en desarrollo web, ciencia de datos, automatización e inteligencia artificial.",
    },
    {
      nombre: "JavaScript",
      logo: "/icons/JavaScript.svg",
      descripcion:
        "JavaScript es un lenguaje de programación utilizado para añadir interactividad a páginas web, como animaciones, botones dinámicos y validación de formularios. Es esencial en el desarrollo front-end y funciona directamente en los navegadores.",
    },
    {
      nombre: "Git",
      logo: "/icons/Git.svg",
      descripcion:
        "Git es un sistema de control de versiones que permite rastrear cambios en el código, colaborar con otros programadores y gestionar proyectos de forma segura. Es ampliamente utilizado para organizar y versionar archivos en el desarrollo de software.",
    },
  ];

  return (
    <>
      <div className="relative w-full h-screen overflow-hidden z-10">
        <div className="absolute inset-0 -z-10">
          <Squares
            speed={0.1}
            squareSize={40}
            direction="diagonal"
            borderColor="rgba(241, 115, 0, 0.2)"
            hoverFillColor="#81A4CD"
          />
        </div>
        <Navbar />
        <MenuRight name={nameState} email={emailState} profileImage={avatar} />
        <Footer />
        <div className="max-w-[1100px] mx-auto p-4 mt-23">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {tecnologias.map((tech, index) => (
              <div
                key={index}
                className="w-80 h-88 bg-white rounded-lg shadow-lg flex flex-col items-center transform transition-transform hover:scale-105"
              >
                <div className="w-full text-center mb-4 bg-card p-3 border-b-1 border-gray-300 rounded-md">
                  <h2 className="text-xl font-bold text-text">{tech.nombre}</h2>
                </div>
                <div className="w-full flex justify-center items-center mb-4 mt-4 rounded-lg">
                  <img
                    src={tech.logo}
                    alt={`Logo ${tech.nombre}`}
                    className="w-28 h-25"
                  />
                </div>
                <div className="w-full text-center mt-3 p-4 border-t-1 border-gray-200">
                  <p className="text-xs text-text">{tech.descripcion}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

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
    <div className="relative w-full min-h-screen flex flex-col">
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
      <div className="relative z-40">
        <Navbar />
      </div>
      <div className="relative z-50 pointer-events-auto">
        <MenuRight name={nameState} email={emailState} profileImage={avatar} />
      </div>
      <div className="relative z-10 flex flex-col items-center p-4 md:p-4 flex-1">
        <div className="max-w-[1100px] w-full mt-20 md:mt-23">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-6 last:pb-20">
            {tecnologias.map((tech, index) => (
              <div
                key={index}
                className="w-full max-w-[320px] h-80 md:w-80 md:h-88 bg-white rounded-lg shadow-lg flex flex-col items-center transform transition-transform hover:scale-105 mx-auto"
              >
                <div className="w-full text-center mb-4 bg-card p-3 md:p-3 border-b border-gray-300 rounded-t-lg">
                  <h2 className="text-lg md:text-xl font-bold text-text">
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
                <div className="w-full text-center mt-2 md:mt-3 p-3 md:p-4 border-t border-gray-200 rounded-b-lg">
                  <p className="text-xs md:text-xs text-text">
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
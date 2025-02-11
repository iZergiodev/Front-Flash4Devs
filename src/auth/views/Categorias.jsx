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
      descricao:
        "React é uma biblioteca JavaScript para criar interfaces de usuário usando componentes reutilizáveis e o eficiente Virtual DOM. É ideal para construir aplicações web modernas, dinâmicas e de alto desempenho.",
    },
    {
      nome: "CSS",
      logo: "/icons/CSS3.svg",
      descricao:
        "CSS (Cascading Style Sheets) é uma linguagem usada para estilizar páginas web, controlando cores, fontes, tamanhos, margens, posicionamento e layout. Ele trabalha junto com o HTML para definir a aparência visual e responsividade de um site.",
    },
    {
      nome: "HTML",
      logo: "/icons/HTML5.svg",
      descricao:
        "HTML (HyperText Markup Language) é a linguagem usada para estruturar páginas web, definindo elementos como títulos, textos, imagens e links. Ele é a base de qualquer site, funcionando como o esqueleto que organiza o conteúdo.",
    },
    {
      nome: "Python",
      logo: "/icons/Python.svg",
      descricao:
        "Python é uma linguagem de programação simples e poderosa, ideal para iniciantes por sua sintaxe intuitiva e legibilidade. Usada para diversas áreas como web, ciência de dados, automação e inteligência artificial, é uma das linguagens mais versáteis e populares.",
    },
    {
      nome: "JavaScript",
      logo: "/icons/JavaScript.svg",
      descricao:
        "JavaScript é uma linguagem de programação usada para adicionar interatividade a páginas web, como animações, botões dinâmicos e validação de formulários. É essencial no desenvolvimento front-end e funciona diretamente nos navegadores.",
    },
    {
      nome: "Git",
      logo: "/icons/Git.svg",
      descricao:
        "Git é um sistema de controle de versão que permite rastrear mudanças no código, colaborar com outros programadores e gerenciar projetos de forma segura. É amplamente usado para organizar e versionar arquivos no desenvolvimento de software.",
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
        <div className="max-w-[1100px] mx-auto p-4 mt-30">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {tecnologias.map((tech, index) => (
              <div
                key={index}
                className="w-80 h-88 bg-white rounded-lg shadow-lg flex flex-col items-center transform transition-transform hover:scale-105"
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
                  <p className="text-xs text-text">{tech.descricao}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
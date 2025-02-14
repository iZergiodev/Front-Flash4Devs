import Squares from "../../components/effectcomponents/Squares";
import useExtractInfo from "../../hooks/useExtractInfo";
import './Card.css'

import { Navbar } from "../../components/Navbar";
import { MenuRight } from "../../components/MenuRight";

import { useState } from "react";

export const CustomFlashCard = () => {
  const { emailState, nameState, avatar } = useExtractInfo();

  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden z-10">
      <div className="absolute inset-0 -z-10">
        <Squares
          speed={0.1}
          squareSize={40}
          direction="diagonal"
          borderColor="rgba(241, 115, 0, 0.4)"
          hoverFillColor="#81A4CD"
        />
      </div>
      <Navbar />
      <MenuRight name={nameState} email={emailState} profileImage={avatar} />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div
          className={`flip-card ${isFlipped ? "flipped" : ""}`}
          onClick={handleFlip}
        >
          <div className="flip-card-inner">
            <div className="flex flex-col flip-card-front w-400 h-300 bg-white rounded-lg shadow-lg">
              <div className="w-full text-center text-text mb-4 bg-card p-3 border-b-1 border-gray-300 rounded-md">
                Categoria
              </div>
              <div className=" text-xl font-bold text-text w-full flex flex-col justify-center items-center mt-5 rounded-lg gap-3">
                <p>PREGUNTA</p>
                <p className="text-gray-400">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Tenetur dolores iste tempora excepturi tempore voluptates,
                  vero laboriosam nemo. Nam animi qui ex magnam et non placeat
                  incidunt, vero totam. Odit.
                </p>
                <p className="text-gray-400">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Placeat, fugit delectus. Corrupti unde optio, architecto
                  placeat consequatur dolores vitae sit, culpa nam praesentium
                  molestiae, reprehenderit quam soluta dignissimos. Ea, quia.
                </p>
              </div>
              <div>
                <button className="w-50 mt-5 border-t-1 border-gray-300 text-white bg-accent py-2 px-4 rounded-lg hover:bg-secondary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary">
                  Mostrar Respuesta
                </button>
              </div>
            </div>

            <div className="flip-card-back flex flex-col flip-card-front w-400 h-300 bg-white rounded-lg shadow-lg">
              <div className="w-full text-center text-text mb-4 bg-card p-3 border-b-1 border-gray-300 rounded-md">
                Respuesta
              </div>
              <div className="text-xl font-bold text-text w-full flex flex-col justify-center items-center mt-5 rounded-lg gap-3">
                <p>Aqui pone la RESPUESTA para pregunta</p>
                <p className="text-gray-400">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Similique consectetur dignissimos iste? Non dolor reiciendis
                  consequuntur numquam iusto exercitationem deserunt illum vero
                  perferendis. Vel quae aperiam incidunt veniam fuga explicabo!
                </p>
                <p className="text-gray-400">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Dolore necessitatibus praesentium illo voluptatem excepturi
                  sint hic eos facilis nihil odio, in ab voluptatibus, provident
                  expedita ex molestiae consequatur dicta labore.
                </p>
              </div>
              <div className="flex items-center justify-center space-x-20 p-4 mt-10 border-t-1 border-gray-300">
                <button className="px-4 py-2 bg-green-500 text-white rounded">
                  Bem
                </button>
                <button className="px-4 py-2 bg-yellow-500 text-white rounded">
                  Regular
                </button>
                <button className="px-4 py-2 bg-red-500 text-white rounded">
                  Mal
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
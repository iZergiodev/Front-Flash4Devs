import { FaBrain, FaBalanceScale, FaFire } from "react-icons/fa";

export const EligirDificultad = ({ onSelectDifficulty }) => {
  const handleClick = (e) => {

    const h2Element = e.currentTarget.querySelector("h2");
    if (h2Element) {
      onSelectDifficulty(h2Element.textContent.toLowerCase());
    }

  };

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[500px] rounded-lg shadow-lg bg-white overflow-hidden">
      <header className="bg-card p-4 border-b-1 border-gray-300">
        <h1 className="text-xl font-bold text-center text-text">
          Elige la dificultad
        </h1>
      </header>

      <div className="p-4 flex flex-col space-y-4 items-center justify-center">
        <button onClick={handleClick}>
          <div className="rounded-lg overflow-hidden shadow-lg w-60">
            <header className="bg-green-600 p-2 border-b-1 border-gray-300">
              <h2 className="text-white text-center font-semibold">Easy</h2>
            </header>
            <div className="bg-green-100 p-4 flex flex-col items-center">
              <FaBrain className="text-green-600 text-3xl" />
              <p className="text-white"></p>
            </div>
          </div>
        </button>

        <button onClick={handleClick}>
          <div className="rounded-lg overflow-hidden shadow-lg w-60">
            <header className="bg-yellow-400 p-2 border-b-1 border-gray-300">
              <h2 className="text-white text-center font-semibold">Medium</h2>
            </header>
            <div className="bg-yellow-100 p-4 flex flex-col items-center">
              <FaBalanceScale className="text-yellow-400 text-3xl" />
              <p className="text-white"> </p>
            </div>
          </div>
        </button>

        <button onClick={handleClick}>
          <div className="rounded-lg overflow-hidden shadow-lg w-60">
            <header className="bg-red-600 p-2 border-b-1 border-gray-300">
              <h2 className="text-white text-center font-semibold">Hard</h2>
            </header>
            <div className="bg-red-100 p-4 flex flex-col items-center">
              <FaFire className="text-red-600 text-3xl" />
              <p className="text-white"> </p>
            </div>
          </div>
        </button>
      </div>

      <h3 className="text-center p-4 font-bold text-text">
        ¡Que comiencen los juegos!
      </h3>
    </div>
  );
};

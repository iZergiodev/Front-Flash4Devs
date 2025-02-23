import { Link } from "react-router";

export const EntrevistaCategorias = () => {
  return (
    <>
      <div className="max-w-[900px] mx-auto p-4 mt-8 sm:mt-30">
        <h1 className="bg-card text-center p-4 sm:p-6 font-extrabold text-xs text-text sm:text-2xl rounded-full shadow-lg mt-5 sm:mt-0">
          ¡Preparate para una entrevista!
        </h1>
        <div className="grid grid-cols-1 gap-6 mt-6 sm:gap-10 sm:mt-10">
          <Link to="/flashcards/entrevista/frontend-react">
            <div className="w-full h-full sm:h-58 bg-white rounded-lg shadow-lg flex flex-col items-center transform transition-transform hover:scale-105 border-b-1 border-gray-300 cursor-pointer">
              <div className="w-full text-center mb-4 bg-text/60 p-3 border-b-1 border-gray-500 rounded-md">
                <h2 className="text-lg sm:text-xl font-bold text-white">
                  Desarrollador FrontEnd React
                </h2>
              </div>
              <div className="w-full flex flex-wrap justify-center items-center p-2 sm:mb-4 sm:mt-4 rounded-lg gap-2 sm:gap-3">
                <img
                  src="/icons/HTML5.svg"
                  alt="Logo de HTML5"
                  className="w-20 h-20 sm:w-30 sm:h-30"
                />
                <img
                  src="/icons/CSS3.svg"
                  alt="Logo de CSS3"
                  className="w-20 h-20 sm:w-30 sm:h-30"
                />
                <img
                  src="/icons/Tailwind CSS.svg"
                  alt="Logo de Tailwind CSS"
                  className="w-20 h-20 sm:w-30 sm:h-30"
                />
                <img
                  src="/icons/JavaScript.svg"
                  alt="Logo de JavaScript"
                  className="w-20 h-20 sm:w-30 sm:h-30"
                />
                <img
                  src="/icons/React.svg"
                  alt="Logo de React"
                  className="w-20 h-20 sm:w-30 sm:h-30"
                />
              </div>
            </div>
          </Link>
          <Link to="/flashcards/entrevista/backend-python">
            <div className="w-full h-auto sm:h-58 bg-white rounded-lg shadow-lg flex flex-col items-center transform transition-transform hover:scale-105 border-b-1 border-gray-300 cursor-pointer">
              <div className="w-full text-center mb-4 bg-text/60 p-3 border-b-1 border-gray-500 rounded-md">
                <h2 className="text-lg sm:text-xl font-bold text-white">
                  Desarrollador BackEnd Python
                </h2>
              </div>
              <div className="w-full flex flex-wrap justify-center items-center p-2 sm:mb-4 sm:mt-4 rounded-lg gap-2 sm:gap-10">
                <img
                  src="/icons/Python.svg"
                  alt="Logo de Python"
                  className="w-20 h-20 sm:w-30 sm:h-30"
                />
                <img
                  src="/icons/FastAPI.svg"
                  alt="Logo de FastAPI"
                  className="w-20 h-20 sm:w-30 sm:h-30"
                />
                <img
                  src="/icons/SQLAlchemy.svg"
                  alt="Logo de SQLAlchemy"
                  className="w-20 h-20 sm:w-30 sm:h-30"
                />
                <img
                  src="/icons/PostgresSQL.svg"
                  alt="Logo de PostgreSQL"
                  className="w-20 h-20 sm:w-30 sm:h-30"
                />
              </div>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};
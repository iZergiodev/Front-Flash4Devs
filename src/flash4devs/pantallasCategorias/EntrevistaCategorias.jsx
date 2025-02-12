import { Link } from "react-router";


export const EntrevistaCategorias = () => {
  return (
    <>
      <div className="max-w-[900px] mx-auto p-4 mt-30">
        <h1 className="bg-card text-center p-6 font-extrabold text-text text-2xl rounded-full shadow-lg ">
          ¡Preparate para una entrevista!
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-10 mt-10">
          <Link to="/flashcards/entrevista/frontend-react">
            <div className="w-full h-58 bg-white rounded-lg shadow-lg flex flex-col items-center transform transition-transform hover:scale-105 border-b-1 border-gray-300 cursor-pointer">
              <div className="w-full text-center mb-4 bg-text/60 p-3 border-b-1 border-gray-500 rounded-md">
                <h2 className="text-xl font-bold text-white">
                  Desarrollador FrontEnd React
                </h2>
              </div>
              <div className="w-full flex justify-center items-center mb-4 mt-4 rounded-lg gap-3">
                <img
                  src="/icons/HTML5.svg"
                  alt="Logo de HTML5"
                  className="w-30 h-30"
                />
                <img
                  src="/icons/CSS3.svg"
                  alt="Logo de HTML5"
                  className="w-30 h-30"
                />
                <img
                  src="/icons/Tailwind CSS.svg"
                  alt="Logo de HTML5"
                  className="w-30 h-30"
                />
                <img
                  src="/icons/JavaScript.svg"
                  alt="Logo de javascript"
                  className="w-30 h-30"
                />
                <img
                  src="/icons/React.svg"
                  alt="Logo de react"
                  className="w-30 h-30"
                />
              </div>
            </div>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-10 mt-10">
          <Link to="/flashcards/entrevista/backend-python">
            <div className="w-full h-58 bg-white rounded-lg shadow-lg flex flex-col items-center transform transition-transform hover:scale-105 border-b-1 border-gray-300 cursor-pointer">
              <div className="w-full text-center mb-4 bg-text/60 p-3 border-b-1 border-gray-500 rounded-md">
                <h2 className="text-xl font-bold text-white">Desarrollador BackEnd Python</h2>
              </div>
              <div className="w-full flex justify-center items-center mb-4 mt-4 rounded-lg gap-10">
                <img
                  src="/icons/Python.svg"
                  alt="Logo de python"
                  className="w-30 h-30"
                />
                <img
                  src="/icons/FastAPI.svg"
                  alt="Logo de python"
                  className="w-30 h-30"
                />
                <img
                  src="/icons/SQLAlchemy.svg"
                  alt="Logo de python"
                  className="w-30 h-30"
                />
                <img
                  src="/icons/PostgresSQL.svg"
                  alt="Logo de python"
                  className="w-30 h-30"
                />
                
              </div>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

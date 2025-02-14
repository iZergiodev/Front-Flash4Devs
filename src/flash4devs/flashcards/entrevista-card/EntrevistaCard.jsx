import "./Card.css";
import { useState, useEffect } from "react";
import useExtractInfo from "../../../hooks/useExtractInfo";
import Squares from "../../../components/effectcomponents/Squares";
import { Navbar } from "../../../components/Navbar";
import { MenuRight } from "../../../components/MenuRight";
import { ThreeDots } from "react-loader-spinner";

export const EntrevistaCard = () => {
  const { emailState, nameState, avatar } = useExtractInfo();

  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(
          "https://back-flash4devs-production.up.railway.app/card/questions?tech=react&limit=10"
        );
        const data = await response.json();
        setQuestions(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching questions:", error);
        setIsLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  // Función para avanzar a la siguiente pregunta
  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setAnswer(""); // Limpiar la respuesta al avanzar
    } else {
      console.log(questions);
      alert("No hay más preguntas.");
    }
  };

  const handleSaveAnswer = () => {
    if (answer.trim() === "") {
      alert("Por favor, ingresa una respuesta.");
      return;
    }

    console.log("Respuesta guardada:", {
      question: questions[currentQuestionIndex].question,
      answer,
    });

    handleNextQuestion();
  };

  if (isLoading) {
    return (
      <div
        className="absolute inset-0 flex items-center justify-center bg-opacity-75 z-50"
        style={{ backdropFilter: "blur(5px)" }}
      >
        <ThreeDots
          visible={true}
          height="80"
          width="80"
          color="#054A91"
          radius="9"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="text-center text-gray-700">
        No hay preguntas disponibles.
      </div>
    );
  }

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
        <div className="flex flex-col w-96 bg-white rounded-lg shadow-lg p-6">
          <div className="w-full text-center text-xl font-semibold text-gray-700 mb-4 p-3 bg-gray-100 rounded-lg">
            Pregunta {currentQuestionIndex + 1} de {questions.length}
          </div>
          <div className="w-full flex flex-col gap-4">
            <div className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50">
              <p className="text-lg font-medium text-gray-700">
                {questions[currentQuestionIndex].question}{" "}
              </p>
            </div>
            <textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Ingresa tu respuesta"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              rows={4}
            />
            <button
              onClick={handleSaveAnswer}
              className="w-full mt-4 bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Siguiente
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

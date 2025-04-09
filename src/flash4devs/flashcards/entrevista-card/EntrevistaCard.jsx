import "./Card.css";
import { useState, useEffect } from "react";
import useExtractInfo from "../../../hooks/useExtractInfo";
import Squares from "../../../components/effectcomponents/Squares";
import { Navbar } from "../../../components/Navbar";
import { Footer } from "../../../components/Footer";
import { MenuRight } from "../../../components/MenuRight";
import { ThreeDots } from "react-loader-spinner";
import { FaClock } from "react-icons/fa";
import { StatisticsCard } from "./StatisticsCard";
import { useLocation } from "react-router";

export const EntrevistaCard = () => {
  const { emailState, nameState, avatar } = useExtractInfo();

  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState(600);
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [allQuestionsAnswered, setAllQuestionsAnswered] = useState(false);
  const [isFlipping, setIsFlipping] = useState(false);
  const [showStatistics, setShowStatistics] = useState(false);
  const [answers, setAnswers] = useState([]);

  const location = useLocation();

  const pathSegments = location.pathname.split("/");
  const lastSegment = pathSegments[pathSegments.length - 1];

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes < 10 ? "0" : ""}${minutes}:${
      secs < 10 ? "0" : ""
    }${secs}`;
  };

  function parsearRespuesta(texto) {
    const contieneBien = texto.includes("BIEN¬");
    const contieneMal = texto.includes("MAL¬");

    const palabraClave = contieneBien ? "BIEN¬" : contieneMal ? "MAL¬" : null;

    const textoLimpio = palabraClave
      ? texto.replace(palabraClave, "").trim()
      : texto;

    return {
      palabraClave,
      textoLimpio,
    };
  }

  useEffect(() => {
    if (timeLeft === 0) {
      setIsTimeUp(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(
          `https://back-flash4devs-production.up.railway.app/card/${lastSegment}?limit=30`
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
  }, [lastSegment]);

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setAnswer("");
    } else {
      setAllQuestionsAnswered(true);
    }
  };

  const handleSaveAnswer = async () => {
    if (answer.trim() === "") {
      alert("Por favor, ingresa una respuesta.");
      return;
    }

    const reviewQuestion = async () => {
      const url = "https://back-flash4devs-production.up.railway.app/chat/";
      const data = {
        system_prompt: `Responde únicamente con "BIEN¬" si está correcto, o "MAL¬" si está incorrecto. Si la respuesta no tiene sentido o no está relacionada con la pregunta, indícalo claramente con un "MAL¬".`,
        user_message: answer,
      };

      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        const { palabraClave } = parsearRespuesta(result.generated_text);

        if (palabraClave === "BIEN¬") {
          setAnswers((prevAnswers) => [
            ...prevAnswers,
            {
              question: questions[currentQuestionIndex].question,
              answer,
              isCorrect: true,
            },
          ]);
        } else if (palabraClave === "MAL¬") {
          setAnswers((prevAnswers) => [
            ...prevAnswers,
            {
              question: questions[currentQuestionIndex].question,
              answer,
              isCorrect: false,
            },
          ]);
        }
      } catch (error) {
        console.error("Error posting data:", error);
      }
    };

    await reviewQuestion();

    handleNextQuestion();
  };

  const handleShowStatistics = () => {
    setIsFlipping(true);
    setTimeout(() => {
      setShowStatistics(true);
    }, 800);
  };

  const correctAnswers = answers.filter((ans) => ans.isCorrect).length;
  const wrongAnswers = answers.length - correctAnswers;

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
      <div className="absolute inset-0 -z-10 bg-white dark:bg-[#3C4043]">
        <Squares speed={0} direction="diagonal" hoverFillColor="#81A4CD" />
      </div>
      <Navbar />
      <Footer />
      <MenuRight name={nameState} email={emailState} profileImage={avatar} />

      {!showStatistics && (
        <div className="absolute top-29 left-1/2 transform -translate-x-1/2">
          <div className="countdown-container bg-card/60 dark:bg-gray-400/60 p-3 rounded-lg shadow-md flex items-center justify-center gap-3">
            <FaClock className="countdown-icon text-primary dark:text-accent text-xl" />
            <span className="countdown-time text-red-500 dark:text-black font-mono text-2xl font-bold">
              {formatTime(timeLeft)}
            </span>
          </div>
        </div>
      )}

      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        {!showStatistics ? (
          <div className="flex flex-col w-96 bg-white dark:bg-[#919191] rounded-lg shadow-lg p-6 border dark:border-black/60 border-gray-200">
            <div className="w-full text-center text-xl font-semibold text-text dark:text-black mb-4 p-3 bg-gray-100 dark:bg-accent/80 rounded-lg shadow-md">
              Pregunta {currentQuestionIndex + 1} de {questions.length}
            </div>
            <div className="w-full flex flex-col gap-4">
              <div className="w-full text-center p-3 border border-gray-300 dark:border-black/60 rounded-lg bg-gray-50 dark:bg-gray-300">
                <p className="text-lg font-medium text-text dark:text-black">
                  {questions[currentQuestionIndex].question}
                </p>
              </div>
              <textarea
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Ingresa tu respuesta..."
                className="w-full p-3 border border-gray-300 dark:border-black/60 dark:bg-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-700/30 resize-none"
                rows={4}
              />
              <p
                className={`text-red-500 text-sm mt-1 transition-opacity duration-200 mb-[-10px] ${
                  answer.length > 0 && answer.length < 10
                    ? "opacity-100"
                    : "opacity-0"
                }`}
              >
                La respuesta debe tener al menos 10 caracteres.
              </p>
              <button
                onClick={handleSaveAnswer}
                className="w-[60%] mx-auto text-sm mt-5 border-t-1 shadow-lg border-gray-300 dark:border-black text-white dark:text-black bg-accent py-2 px-4 rounded-lg hover:bg-secondary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary"
                disabled={!answer || answer.length < 10}
              >
                Siguiente
              </button>
            </div>
          </div>
        ) : (
          <StatisticsCard
            correctAnswers={correctAnswers}
            wrongAnswers={wrongAnswers}
            answers={answers}
          />
        )}
      </div>

      {(isTimeUp || allQuestionsAnswered) && !showStatistics && (
        <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 text-center">
          <div className="bg-card dark:bg-[#919191] w-[300px] h-[130px] p-2 rounded-lg shadow-lg">
            <p className="text-md text-text dark:text-black border-b-1 border-gray-300 dark:border-black p-2">
              {" "}
              {isTimeUp
                ? "¡El tiempo ha terminado!"
                : "¡Has respondido todas las preguntas!"}
            </p>
            <button
              onClick={handleShowStatistics}
              className="w-[60%] mx-auto mt-3 border-t-1 shadow-lg border-gray-300 text-white dark:text-black bg-accent py-2 px-4 rounded-lg hover:bg-secondary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary text-sm"
            >
              Mostrar Informe
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

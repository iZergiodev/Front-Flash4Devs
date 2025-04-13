import { useNavigate, useParams } from "react-router";
import Squares from "../../../components/effectcomponents/Squares";
import { MenuRight } from "../../../components/MenuRight";
import { Navbar } from "../../../components/Navbar";
import { Footer } from "../../../components/Footer";
import useExtractInfo from "../../../hooks/useExtractInfo";
import { EligirDificultad } from "../../EligirDificultad";
import "./Card.css";
import { useState, useEffect } from "react";
import { ThreeDots } from "react-loader-spinner";
import { FaTimes } from "react-icons/fa";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";
import { waitOneSecond } from "../../../utils/waitOneSecond";

export const ConceptCard = () => {
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);
  const { tech } = useParams();
  const { emailState, nameState, avatar } = useExtractInfo();
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [, setShowSolution] = useState(false);
  const [score] = useState({ good: 0, regular: 0, bad: 0 });
  const [message, setMessage] = useState("");
  const [resIA, setResIA] = useState("");
  // const [textAreaMessage, setTextAreaMessage] = useState('')

  const navigate = useNavigate();

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
    const fetchQuestions = async () => {
      if (selectedDifficulty !== null) {
        try {
          const response = await fetch(
            `https://back-flash4devs-production.up.railway.app/card/questions?tech=${tech}&difficult=${selectedDifficulty}&limit=20`
          );

          if (!response.ok) {
            throw new Error("Error al obtener las preguntas");
          }

          const data = await response.json();
          console.log(data);
          setQuestions(data);
        } catch (err) {
          console.error(err);
          alert(
            "Hubo un error al cargar las preguntas. Por favor, intenta de nuevo."
          );
          navigate("/");
        }
      }
    };

    fetchQuestions();
  }, [tech, selectedDifficulty, navigate]);

  useEffect(() => {
    if (questions.length > 0 && currentQuestionIndex === questions.length) {
      toast("No hay más flashcards disponibles", {
        icon: "😿",
      });
      navigate("/");
    }
  }, [currentQuestionIndex, navigate, questions.length, score]);

  const handleGoBack = () => {
    window.history.back();
  };

  const handleFlip = async () => {
    const url = "https://back-flash4devs-production.up.railway.app/chat/";
    const data = {
      system_prompt: `Eres un profesor y estás evaluando una respuesta a una pregunta sobre programación, en este momento se trata de la tecnología ${tech}. Debes de responder el primer mensaje con un BIEN o MAL en mayúscula seguida de ¬, tal que así BIEN¬ o MAL¬ acto seguido debes de dar un breve resumen de porque está mal la pregunta, en caso de que esté bien, simplemente felicitalo. La pregunta es: ${currentQuestion.question}, si la respuesta no tiene nada que ver con la question, la respuesta está mal.`,
      user_message: message,
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
      const { palabraClave, textoLimpio } = parsearRespuesta(
        result.generated_text
      );
      setResIA(textoLimpio);
      setIsFlipped(true);
      setShowSolution(true);
      setMessage("");

      if (palabraClave === "BIEN¬") {
        await updateUserAnswers("good");
      } else if (palabraClave === "MAL¬") {
        await updateUserAnswers("bad");
      }
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  const handleDifficultySelect = (difficulty) => {
    setSelectedDifficulty(difficulty);
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const currentQuestion = questions[currentQuestionIndex];

  if (!currentQuestion && selectedDifficulty !== null) {
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

  const handleSkip = async () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setIsFlipped(false);
      setShowSolution(false);
      setMessage("");
    } else {
      toast("No hay más flashcards disponibles", {
        icon: "😿",
      });
      await waitOneSecond();
      navigate("/");
    }
  };

  const updateUserAnswers = async (type) => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No se encontró el token de acceso.");
      return;
    }

    const url =
      "https://back-flash4devs-production.up.railway.app/card/update-user-answers";
    const data = {
      type: type,
    };

    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Respuesta actualizada:", result);
    } catch (error) {
      console.error("Error al actualizar las respuestas:", error);
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden z-10">
      <Toaster position="bottom-right" reverseOrder={false} />
      <div className="absolute inset-0 -z-10 bg-white dark:bg-[#3C4043]">
        <Squares speed={0} direction="diagonal" hoverFillColor="#81A4CD" />
      </div>
      <Navbar />
      <Footer />
      <MenuRight name={nameState} email={emailState} profileImage={avatar} />
      {!selectedDifficulty ? (
        <EligirDificultad onSelectDifficulty={handleDifficultySelect} />
      ) : (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className={`flip-card ${isFlipped ? "flipped" : ""}`}>
            <div className="flip-card-inner">
              <div className="flip-card-front w-[400px] h-[550px] bg-white dark:bg-[#919191] rounded-2xl shadow-xl overflow-hidden flex flex-col">
                {/* Header */}
                <div className="w-full flex relative items-center justify-center text-text dark:text-black bg-card dark:bg-accent border-b border-gray-300 dark:border-black p-4">
                  <span className="text-lg font-semibold">
                    {tech.toUpperCase()}
                  </span>
                  <button
                    onClick={handleGoBack}
                    className="absolute right-4 text-red-500 hover:text-red-700 transition-colors"
                  >
                    <FaTimes size={18} />
                  </button>
                </div>

                {/* Pregunta */}
                <div className="px-4 py-3 flex flex-col gap-2 text-center">
                  <p className="text-base font-bold text-text dark:text-black">
                    PREGUNTA
                  </p>
                  <p className="text-gray-500 dark:text-black text-sm">
                    {currentQuestion.question}
                  </p>
                </div>

                {/* Respuesta input */}
                <div className="px-4 flex flex-col flex-grow">
                  <label className="block text-sm font-medium text-gray-900 dark:text-black mt-2">
                    Tu respuesta
                  </label>
                  <textarea
                    rows="4"
                    className="mt-1 p-2 w-full h-[30vh] text-sm text-gray-900 bg-gray-50 rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-200 dark:border-gray-300 dark:text-gray-900 resize-none"
                    placeholder="Escribe tu respuesta aquí..."
                    onChange={handleMessageChange}
                    value={message}
                  />
                  <p
                    className={`text-red-500 text-sm mt-1 min-h-[20px] ${
                      message.length > 0 && message.length < 10
                        ? "visible"
                        : "invisible"
                    }`}
                  >
                    La respuesta debe tener al menos 10 caracteres.
                  </p>
                </div>

                {/* Botones */}
                <div className="flex justify-center gap-4 p-4 border-t border-gray-200 dark:border-black">
                  <button
                    className="w-1/2 text-white bg-accent dark:text-black py-2 rounded-xl hover:bg-secondary transition"
                    onClick={handleFlip}
                    disabled={!message || message.length < 10}
                  >
                    Mostrar Respuesta
                  </button>
                  <button
                    className="w-1/2 text-white bg-gray-500 dark:text-black py-2 rounded-xl hover:bg-gray-600 transition"
                    onClick={handleSkip}
                  >
                    Skip
                  </button>
                </div>
              </div>

              <div className="flip-card-back flex flex-col flip-card-front w-[400px] max-h-[80vh] overflow-y-auto bg-white dark:bg-[#919191] rounded-lg shadow-lg">
                <div className="w-full flex relative items-center text-center text-text mb-4 bg-card dark:bg-accent p-3 border-b-1 border-gray-300 dark:border-black rounded-md">
                  <div className="absolute left-1/2 transform -translate-x-1/2 dark:text-black dark:bg-accent">
                    Respuesta
                  </div>
                  <button
                    onClick={handleGoBack}
                    className="ml-auto text-red-500 hover:text-red-700 transition-colors"
                  >
                    <FaTimes size={20} />
                  </button>
                </div>
                <div className="text-lg font-bold text-text dark:text-black w-full my-auto flex flex-col justify-center items-center mt-10 rounded-lg gap-3">
                  <p>{resIA}</p>
                </div>
                <button
                  className="w-50 mt-5 border-t-1 shadow-lg border-gray-300 dark:border-black text-white dark:text-black bg-accent py-2 px-4 rounded-lg hover:bg-secondary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary"
                  onClick={() => {
                    if (currentQuestionIndex < questions.length - 1) {
                      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
                      setIsFlipped(false);
                      setShowSolution(false);
                    } else {
                      alert(
                        `Cuestionario completado!\nBuenas: ${score.good}\nMalas: ${score.bad}`
                      );
                      navigate("/");
                    }
                  }}
                >
                  Siguiente
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

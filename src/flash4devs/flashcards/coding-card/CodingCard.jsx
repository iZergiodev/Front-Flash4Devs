import { useNavigate, useParams } from "react-router";
import Squares from "../../../components/effectcomponents/Squares";
import { MenuRight } from "../../../components/MenuRight";
import { Navbar } from "../../../components/Navbar";
import useExtractInfo from "../../../hooks/useExtractInfo";
import { EligirDificultad } from "../../EligirDificultad";
import "./Card.css";
import { useState, useEffect } from "react";
import { ThreeDots } from "react-loader-spinner";
import { FaTimes } from "react-icons/fa";
import Editor from "@monaco-editor/react";

export const CodingCard = () => {
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);
  const { tech } = useParams();
  const { emailState, nameState, avatar } = useExtractInfo();
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [score, setScore] = useState({ good: 0, regular: 0, bad: 0 });
  const [message, setMessage] = useState("");
  const [resIA, setResIA] = useState("");
  const [code, setCode] = useState("");

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

  const updateUserAnswers = async (type) => {
    const token = localStorage.getItem("token"); // Obtener el token de acceso
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

  useEffect(() => {
    const fetchQuestions = async () => {
      if (selectedDifficulty !== null) {
        try {
          const response = await fetch(
            `https://back-flash4devs-production.up.railway.app/card/coding-questions?tech=${tech}&difficult=${selectedDifficulty}&limit=20`
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
        }
      }
    };

    fetchQuestions();
  }, [tech, selectedDifficulty]);

  useEffect(() => {
    if (questions.length > 0 && currentQuestionIndex === questions.length) {
      alert(
        `Cuestionario completado!\nBuenas: ${score.good}\nRegulares: ${score.regular}\nMalas: ${score.bad}`
      );
      navigate("/");
    }
  }, [currentQuestionIndex, navigate, questions.length, score]);

  const handleGoBack = () => {
    window.history.back();
  };

  const handleFlip = async () => {
    const url = "https://back-flash4devs-production.up.railway.app/chat/";
    const data = {
      system_prompt: `Eres un profesor y estás evaluando una respuesta a una pregunta sobre programación, en este momento se trata de la tecnología ${tech}. Debes de responder el primer mensaje con un BIEN o MAL en mayúscula seguida de ¬, tal que así BIEN¬ o MAL¬ acto seguido debes de dar un breve resumen de porque está mal la pregunta, en caso de que esté bien, simplemente felicitalo. La pregunta es: ${currentQuestion.question}. El alumno te va a responder con código.`,
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
      const { palabraClave, textoLimpio } = parsearRespuesta(result.generated_text);
      setResIA(textoLimpio);
      setIsFlipped(true);
      setShowSolution(true);
      setMessage('');

      if (palabraClave === "BIEN¬") {
        setScore((prevScore) => ({
          ...prevScore,
          good: prevScore.good + 1,
        }));
        await updateUserAnswers("good"); // Actualizar estadísticas en el backend
      } else if (palabraClave === "MAL¬") {
        setScore((prevScore) => ({
          ...prevScore,
          bad: prevScore.bad + 1,
        }));
        await updateUserAnswers("bad"); // Actualizar estadísticas en el backend
      }
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  const handleDifficultySelect = (difficulty) => {
    setSelectedDifficulty(difficulty);
  };

  const handleMessageChange = (value, event) => {
    setMessage(event.target.value);
    setCode(value);
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
      {!selectedDifficulty ? (
        <EligirDificultad onSelectDifficulty={handleDifficultySelect} />
      ) : (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className={`flip-card ${isFlipped ? "flipped" : ""}`}>
            <div className="flip-card-inner">
              <div className="flex flex-col flip-card-front w-[800px] h-[500px] bg-white border-1 border-gray-200 rounded-lg shadow-lg">
                <div className="w-full flex relative items-center text-center text-text mb-4 bg-card p-3 border-b-1 border-gray-300 rounded-md">
                  <div className="absolute left-1/2 transform -translate-x-1/2">
                    {tech.toUpperCase()}
                  </div>
                  <button
                    onClick={handleGoBack}
                    className="ml-auto text-red-500 hover:text-red-700 transition-colors"
                  >
                    <FaTimes size={20} />
                  </button>
                </div>
                <div className="text-xl font-bold text-text w-full flex flex-col justify-center items-center rounded-lg gap-3">
                  <p>PREGUNTA</p>
                  <p className="text-gray-400">{currentQuestion.question}</p>
                </div>
                <div className="max-w-3xl w-[400px] mt-5 mx-auto shadow-lg">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
                    Respuesta
                  </label>
                  <Editor
                    height="300px"
                    width="100%"
                    language="javascript"
                    theme="vs-dark"
                    value={code}
                    onChange={handleMessageChange}
                    options={{
                      fontSize: 14,
                      minimap: { enabled: false },
                      lineNumbers: "on",
                      scrollBeyondLastLine: false,
                      automaticLayout: true,
                      formatOnType: true,
                    }}
                  />
                </div>
                <div>
                  <button
                    className="w-50 mt-5 border-t-1 shadow-lg border-gray-300 text-white bg-accent py-2 px-4 rounded-lg hover:bg-secondary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary"
                    onClick={handleFlip}
                  >
                    Mostrar Respuesta
                  </button>
                </div>
              </div>

              <div className="flip-card-back flex flex-col flip-card-front w-[400px] h-[300px] bg-white rounded-lg shadow-lg">
                <div className="w-full flex relative items-center text-center text-text mb-4 bg-card p-3 border-b-1 border-gray-300 rounded-md">
                  <div className="absolute left-1/2 transform -translate-x-1/2">
                    Respuesta
                  </div>
                  <button
                    onClick={handleGoBack}
                    className="ml-auto text-red-500 hover:text-red-700 transition-colors"
                  >
                    <FaTimes size={20} />
                  </button>
                </div>
                <div className="text-xl font-bold text-text w-full my-auto flex flex-col justify-center items-center mt-10 rounded-lg gap-3">
                  <p>{resIA}</p>
                </div>
                <button
                  className="w-50 mt-5 border-t-1 shadow-lg border-gray-300 text-white bg-accent py-2 px-4 rounded-lg hover:bg-secondary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary"
                  onClick={() => {
                    if (currentQuestionIndex < questions.length - 1) {
                      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
                      setIsFlipped(false);
                      setShowSolution(false);
                    } else {
                      alert(
                        `Cuestionario completado!\nBuenas: ${score.good}\nRegulares: ${score.regular}\nMalas: ${score.bad}`
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
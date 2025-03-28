import { useNavigate, useParams } from "react-router";
import Squares from "../../../components/effectcomponents/Squares";
import { MenuRight } from "../../../components/MenuRight";
import { Navbar } from "../../../components/Navbar";
import useExtractInfo from "../../../hooks/useExtractInfo";
import { EligirDificultad } from "../../EligirDificultad";
import { Footer } from "../../../components/Footer";
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
      system_prompt: `Eres un profesor que evalúa una respuesta de código sobre la tecnología ${tech}. La pregunta es: "${currentQuestion.question}". El alumno ha respondido con el siguiente código: "${code}". Evalúa estrictamente este código y determina si está correcto o incorrecto. Responde únicamente con "BIEN¬" si está correcto, seguido de un breve mensaje de felicitación, o "MAL¬" si está incorrecto, seguido de una explicación breve y específica de qué está mal y cómo corregirlo. No proporciones ejemplos adicionales, código de prueba ni soluciones completas, solo corrige el código enviado por el alumno si es necesario. Si la respuesta no tiene sentido o no está relacionada con la pregunta, indícalo claramente después de "MAL¬".`,
      user_message: code,
    };

    console.log(currentQuestion.question);

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
      setCode("");

      if (palabraClave === "BIEN¬") {
        setScore((prevScore) => ({
          ...prevScore,
          good: prevScore.good + 1,
        }));
        await updateUserAnswers("good");
      } else if (palabraClave === "MAL¬") {
        setScore((prevScore) => ({
          ...prevScore,
          bad: prevScore.bad + 1,
        }));
        await updateUserAnswers("bad");
      }
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  const handleDifficultySelect = (difficulty) => {
    setSelectedDifficulty(difficulty);
  };

  const handleSkip = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setIsFlipped(false);
      setShowSolution(false);
      setCode("");
    } else {
      alert(
        `Cuestionario completado!\nBuenas: ${score.good}\nRegulares: ${score.regular}\nMalas: ${score.bad}`
      );
      navigate("/");
    }
  };

  const handleMessageChange = (value) => {
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
      <div className="absolute inset-0 -z-10 bg-white dark:bg-[#3C4043]">
        <Squares

          direction="diagonal"
          hoverFillColor="#81A4CD"
        />
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
              <div className="flex flex-col flip-card-front w-[800px] h-[500px] bg-white dark:bg-[#919191] border-1 border-gray-200 dark:border-black rounded-lg shadow-lg">
                <div className="w-full flex relative items-center text-center text-text dark:text-black mb-4 bg-card dark:bg-accent dark:border-black p-3 border-b-1 border-gray-300 rounded-md">
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
                <div className="text-xl font-bold text-text dark:text-black w-full flex flex-col justify-center items-center rounded-lg gap-3">
                  <p>PREGUNTA</p>
                  <p className="text-gray-400 dark:text-black">
                    {currentQuestion.question}
                  </p>
                </div>
                <div className="max-w-3xl w-[400px] mt-5 mx-auto shadow-lg">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
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
                  {code.length > 0 && code.length < 10 && (
                    <p className="text-red-500 text-sm mt-1">
                      La respuesta debe tener al menos 10 caracteres.
                    </p>
                  )}
                </div>
                <div className="flex justify-center gap-4 mt-5">
                  <button
                    className="w-50 border-t-1 border-gray-300 dark:border-black text-white dark:text-black bg-accent py-2 px-4 rounded-lg hover:bg-secondary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary disabled:bg-gray-400 disabled:cursor-not-allowed"
                    onClick={handleFlip}
                    disabled={!code || code.length < 10}
                  >
                    Mostrar Respuesta
                  </button>
                  <button
                    className="w-50 border-t-1 border-gray-300 dark:border-black text-white dark:text-black bg-gray-500 py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400"
                    onClick={handleSkip}
                  >
                    Skip
                  </button>
                </div>
              </div>

              <div className="flip-card-back flex flex-col flip-card-front w-[400px] h-[300px] bg-white dark:bg-[#919191] rounded-lg shadow-lg">
                <div className="w-full flex relative items-center text-center text-text dark:text-black mb-4 bg-card dark:bg-accent p-3 border-b-1 border-gray-300 dark:border-black rounded-md">
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
                <div className="text-xl font-bold text-text dark:text-black w-full my-auto flex flex-col justify-center items-center mt-10 rounded-lg gap-3">
                  <p>{resIA}</p>
                </div>
                <button
                  className="w-50 mt-5 border-t-1 shadow-lg border-gray-300 dark:border-black text-white dark:text-black bg-accent py-2 px-4 rounded-lg hover:bg-secondary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary"
                  onClick={() => {
                    if (currentQuestionIndex < questions.length - 1) {
                      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
                      setIsFlipped(false);
                      setShowSolution(false);
                      setCode("");
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

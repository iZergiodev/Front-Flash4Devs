import { useNavigate, useParams } from "react-router";
import Squares from "../../../components/effectcomponents/Squares";
import { MenuRight } from "../../../components/MenuRight";
import { Navbar } from "../../../components/Navbar";
import useExtractInfo from "../../../hooks/useExtractInfo";
import "./Card.css";
import { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import { useRef } from "react";
import { ThreeDots } from "react-loader-spinner";
import { FaTimes } from "react-icons/fa";

export const CodingCard = () => {
  const [respIA, setResIA] = useState(""); 
  const [chatResponse, setChatResponse] = useState(""); 
  const editorRef = useRef(null);

  const getResponse = async () => {
    try {
      const resp = await fetch(
        "https://back-flash4devs-production.up.railway.app/chat/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user_message: editorRef.current.getValue().trim(),
            system_prompt:
              "Estás corrigiendo un código de un alumno, responde en la primera palabra bien o mal, dependiendo si está técnicamente correcto o no, y después un breve resumen explicando por qué está mal",
          }),
        }
      );
      const { generated_text } = await resp.json();
      setResIA(generated_text);
      setChatResponse(generated_text); 
    } catch (error) {
      console.error("Error al obtener la respuesta de ChatGPT:", error);
      setChatResponse("Error al obtener la respuesta. Inténtalo de nuevo.");
    }
  };

  function handleEditorDidMount(editor) {
    editorRef.current = editor;
  }

  const { tech } = useParams();
  const { emailState, nameState, avatar } = useExtractInfo();
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [, setShowSolution] = useState(false);
  const [score, setScore] = useState({ good: 0, regular: 0, bad: 0 });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(
          `https://back-flash4devs-production.up.railway.app/card/coding-questions?tech=${tech}&limit=10`
        );

        if (!response.ok) {
          throw new Error("Error al obtener las preguntas");
        }

        const data = await response.json();
        setQuestions(data);
      } catch (err) {
        console.error(err);
        alert(
          "Hubo un error al cargar las preguntas. Por favor, intenta de nuevo."
        );
      }
    };

    fetchQuestions();
  }, [tech]);

  useEffect(() => {
    if (currentQuestionIndex === questions.length - 1) {
      alert(
        `Cuestionario completado!\nBuenas: ${score.good}\nRegulares: ${score.regular}\nMalas: ${score.bad}`
      );
      navigate("/");
    }
  }, [currentQuestionIndex, navigate, questions.length, score]);

  const handleAnswer = (answer) => {
    console.log("Respuesta seleccionada:", answer);
    setScore((prevScore) => ({
      ...prevScore,
      [answer]: prevScore[answer] + 1,
    }));

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setIsFlipped(false);
      setShowSolution(false);
      setChatResponse(""); 
    }
  };

   const handleGoBack = () => {
     window.history.back(); 
   };

  const handleFlip = async () => {
    if (!isFlipped) {
      await getResponse(); 
    }
    setIsFlipped(!isFlipped);
    setShowSolution(true);
  };

  const currentQuestion = questions[currentQuestionIndex];

  if (!currentQuestion) {
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
          speed={0.5}
          squareSize={40}
          direction="diagonal"
          borderColor="rgba(241, 115, 0, 0.4)"
          hoverFillColor="#81A4CD"
        />
      </div>
      <Navbar />
      <MenuRight name={nameState} email={emailState} profileImage={avatar} />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className={`flip-card ${isFlipped ? "flipped" : ""}`}>
          <div className="flip-card-inner">
            <div className="flex flex-col flip-card-front w-[400px] h-[300px] bg-white rounded-lg shadow-lg">
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
              <div className="text-xl font-bold text-text w-full flex flex-col justify-center items-center mt-5 rounded-lg gap-3">
                <p>PREGUNTA</p>
                <p className="text-gray-400">{currentQuestion.question}</p>
              </div>
              <div>
                <div className="flex justify-center items-center mt-5 border mx-10 rounded-lg">
                  <Editor
                    height={"300px"}
                    width={"600px"}
                    theme="light"
                    defaultLanguage="javascript"
                    onMount={handleEditorDidMount}
                  />
                </div>

                <button
                  className="w-50 mt-5 border-t-1 border-gray-300 text-white bg-accent py-2 px-4 rounded-lg hover:bg-secondary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary"
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
              <div className="flex items-center justify-center p-4 text-gray-700">
                {chatResponse || "Cargando respuesta..."}{" "}
              </div>
              <button
                className="px-4 py-2 bg-accent text-white rounded"
                onClick={() => handleAnswer()}
              >
                Siguiente
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

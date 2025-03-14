import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useEffect } from "react";
import { useState } from "react";

ChartJS.register(ArcElement, Tooltip, Legend);

export const StatisticsCard = ({ correctAnswers, wrongAnswers, answers }) => {
  const [respuestaIA, setRespuestaIA] = useState();

  const data = {
    labels: ["Correctas", "Incorrectas"],
    datasets: [
      {
        data: [correctAnswers, wrongAnswers],
        backgroundColor: ["#81C784", "#EF5350"],
        hoverBackgroundColor: ["#81C784", "#EF5350"],
      },
    ],
  };

  useEffect(() => {
    const fetchChatGPT = async () => {
      try {
        console.log(answers)
        const response = await fetch(
          "https://back-flash4devs-production.up.railway.app/chat/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              system_prompt:
                "El usuario está haciendo un simulacro de entrevista de ciertas tecnologías para un puesto de desarrollador web, deberás mirar el conjunto de preguntas y respuestas del usuario y dar un informe sobre el resultado global del mismo y qué respuestas podría mejorar para ser contratado en la próxima entrevista. Dame unas respuesta de no más de 1000 carácteres. Devuelveme el texto limpio, sin caracteres ni *. Intenta pensar y responder como si fueses un entrevistador de un proceso de selección. Da una respuesta extensa y detallada.",
              user_message: JSON.stringify(answers),
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Error en la respuesta del servidor");
        }

        const data = await response.json();
        setRespuestaIA(data.generated_text);
      } catch (error) {
        console.error("Error obteniendo la respuesta de ChatGPT:", error);
      }
    };

    fetchChatGPT();
  }, [answers]);

  return (
    <div className="flex flex-row justify-center w-[700px] gap-6">
      <div className="flex flex-col w-96 bg-white dark:bg-[#c4c3c3] rounded-lg shadow-lg p-6 border border-gray-200 dark:border-black">
        <div className="w-full text-center text-xl font-semibold text-text dark:text-black mb-4 p-3 bg-gray-50 dark:bg-accent/80 border border-gray-300 dark:border-black/60 shadow-md rounded-lg">
          Estadísticas
        </div>
        <div className="w-full flex flex-col gap-4">
          <div className="w-62 h-62 mx-auto mt-3">
            <Doughnut data={data} width={256} height={256} />
          </div>
          <div className="w-[300px] flex flex-col justify-center items-center p-3 border shadow-md border-gray-300 dark:border-black/60 rounded-lg bg-gray-50 dark:bg-[#9c9c9c]">
            <p className="text-md font-medium text-text dark:text-black">
              Respuestas correctas: {correctAnswers}
            </p>
            <p className="text-md font-medium text-text dark:text-black">
              Respuestas incorrectas: {wrongAnswers}
            </p>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="w-[60%] mx-auto text-sm mt-5 border-t-1 shadow-lg border-gray-300 dark:border-black text-white dark:text-black bg-accent py-2 px-4 rounded-lg hover:bg-secondary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-muted"
          >
            Reiniciar
          </button>
        </div>
      </div>
      <div className="w-[600px] bg-white dark:bg-[#c4c3c3] rounded-lg shadow-lg p-6 border border-gray-200 dark:border-black">
        <div className="w-[500px] text-center text-xl font-semibold text-text mb-4 p-3 bg-gray-50 dark:bg-accent/80 border border-gray-300 dark:border-black/60 shadow-md rounded-lg">
          Informe
        </div>
        <div className="flex justify-center items-center ">
          <p className="text-text dark:text-black text-sm">
            {respuestaIA || <h1>Cargando...</h1>}
          </p>
        </div>
      </div>
    </div>
  );
};

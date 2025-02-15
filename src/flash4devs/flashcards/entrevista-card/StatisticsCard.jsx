import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export const StatisticsCard = ({ correctAnswers, wrongAnswers }) => {
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

  return (
    <div className="flex flex-row justify-center w-[700px] gap-6">
      <div className="flex flex-col w-96 bg-white rounded-lg shadow-lg p-6 border border-gray-200">
        <div className="w-full text-center text-xl font-semibold text-text mb-4 p-3 bg-gray-50 border border-gray-300 shadow-md rounded-lg">
          Estadísticas
        </div>
        <div className="w-full flex flex-col gap-4">
          <div className="w-62 h-62 mx-auto mt-3">
            <Doughnut data={data} width={256} height={256} />
          </div>
          <div className="w-[300px] flex flex-col justify-center items-center p-3 border shadow-md border-gray-300 rounded-lg bg-gray-50">
            <p className="text-md font-medium text-text">
              Respuestas correctas: {correctAnswers}
            </p>
            <p className="text-md font-medium text-text">
              Respuestas incorrectas: {wrongAnswers}
            </p>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="w-[60%] mx-auto text-sm mt-5 border-t-1 shadow-lg border-gray-300 text-white bg-accent py-2 px-4 rounded-lg hover:bg-secondary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-muted"
          >
            Reiniciar
          </button>
        </div>
      </div>
      <div className="w-[600px] bg-white rounded-lg shadow-lg p-6 border border-gray-200">
        <div className="w-[500px] text-center text-xl font-semibold text-text mb-4 p-3 bg-gray-50 border border-gray-300 shadow-md rounded-lg">
          Informe
        </div>
        <div className="flex justify-center items-center ">
          <p className="text-text text-sm">
            Aqui viene la respuesta/correciones para tus preguntas
          </p>
        </div>
      </div>
    </div>
  );
};

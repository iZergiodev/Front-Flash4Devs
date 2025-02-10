import Chart from "react-apexcharts";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import Squares from "../../components/effectcomponents/Squares";
import { Navbar } from "../../components/Navbar";

ChartJS.register(ArcElement, Tooltip, Legend);

const colors = {
  primary: "#054A91",
  secondary: "#3E7CB1",
  accent: "#F17300",
  background: "#FFFFFF",
  card: "#DBE4EE",
  text: "#054A91",
  muted: "#81A4CD",
};

export function Estadistica() {

  const totalCorrect = 75;
  const totalIncorrect = 25;
  const accuracyPercentage =
    (totalCorrect / (totalCorrect + totalIncorrect)) * 100;
  const currentLevel = "Intermedio";


  const correctAnswersChart = {
    options: {
      chart: {
        type: "bar",
        background: colors.card,
      },
      colors: [colors.accent],
      plotOptions: {
        bar: {
          horizontal: false,
          borderRadius: 5,
        },
      },
      xaxis: {
        categories: ["Preguntas Acertadas"],
        labels: {
          style: {
            colors: colors.text,
          },
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: colors.text,
          },
        },
      },
      title: {
        text: "Preguntas Totales Acertadas",
        align: "center",
        style: {
          color: colors.text,
          fontSize: "16px",
        },
      },
    },
    series: [
      {
        name: "Acertadas",
        data: [totalCorrect],
      },
    ],
  };


  const incorrectAnswersChart = {
    options: {
      chart: {
        type: "bar",
        background: colors.card,
      },
      colors: [colors.muted],
      plotOptions: {
        bar: {
          horizontal: false,
          borderRadius: 5,
        },
      },
      xaxis: {
        categories: ["Preguntas Falladas"],
        labels: {
          style: {
            colors: colors.text,
          },
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: colors.text,
          },
        },
      },
      title: {
        text: "Preguntas Totales Falladas",
        align: "center",
        style: {
          color: colors.text,
          fontSize: "16px",
        },
      },
    },
    series: [
      {
        name: "Falladas",
        data: [totalIncorrect],
      },
    ],
  };


  const accuracyChartData = {
    labels: ["Acertadas", "Falladas"],
    datasets: [
      {
        label: "Porcentaje de Acierto",
        data: [totalCorrect, totalIncorrect],
        backgroundColor: [colors.accent, colors.muted],
        borderColor: [colors.background, colors.background],
        borderWidth: 2,
      },
    ],
  };


  const currentLevelChart = {
    options: {
      chart: {
        type: "radialBar",
        background: colors.card,
      },
      colors: [colors.primary],
      plotOptions: {
        radialBar: {
          hollow: {
            size: "60%",
          },
          dataLabels: {
            name: {
              show: true,
              fontSize: "16px",
              color: colors.text,
            },
            value: {
              show: true,
              fontSize: "24px",
              color: colors.text,
              formatter: () => currentLevel,
            },
          },
        },
      },
      title: {
        text: "Nivel Actual",
        align: "center",
        style: {
          color: colors.text,
          fontSize: "16px",
        },
      },
    },
    series: [75],
  };

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

      <div className="relative z-20 inset-0 flex flex-col items-center mt-16">
        <h1 className="text-3xl font-bold text-primary mb-2 mt-6 text-center">
          Estadisticas
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
          <div className="bg-card p-6 rounded-lg shadow-md pointer-events: auto">
            <Chart
              options={correctAnswersChart.options}
              series={correctAnswersChart.series}
              type="bar"
              height={300}
            />
          </div>
          <div className="bg-card p-6 rounded-lg shadow-md pointer-events: auto">
            <Chart
              options={incorrectAnswersChart.options}
              series={incorrectAnswersChart.series}
              type="bar"
              height={300}
            />
          </div>
          <div className="bg-card p-6 rounded-lg shadow-md pointer-events: auto">
            <h2 className="text-lg font-semibold text-secondary mb-4 text-center">
              Porcentaje de Acierto
            </h2>
            <div className="w-64 h-64 mx-auto">
              <Doughnut data={accuracyChartData} />
            </div>
          </div>
          <div className="bg-card p-6 rounded-lg shadow-md pointer-events: auto">
            <Chart
              options={currentLevelChart.options}
              series={currentLevelChart.series}
              type="radialBar"
              height={300}
            />
          </div>
        </div>
      </div>
    </div>
  );
}


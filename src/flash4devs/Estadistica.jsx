import { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import Squares from "../components/effectcomponents/Squares";
import { Navbar } from "../components/Navbar";
import { MenuRight } from "../components/MenuRight";
import useExtractInfo from "../hooks/useExtractInfo";

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
  const { emailState, nameState, avatar } = useExtractInfo();
  const [stats, setStats] = useState({
    good_answers: 0,
    bad_answers: 0,
    level: "beginner",
    rating_interview_front_react: 0,
    rating_interview_backend_python: 0,
  });
  const [loading, setLoading] = useState(true);

  // Obtener las estadísticas del usuario desde el backend
  useEffect(() => {
    const fetchStats = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No se encontró el token de acceso.");
        return;
      }

      try {
        const response = await fetch(
          "https://back-flash4devs-production.up.railway.app/card/user-stats",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error("Error al obtener las estadísticas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Cargando estadísticas...</p>
      </div>
    );
  }

  const totalCorrect = stats.good_answers;
  const totalIncorrect = stats.bad_answers;
  const accuracyPercentage =
    (totalCorrect / (totalCorrect + totalIncorrect)) * 100 || 0;
  const currentLevel = stats.level;

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
    series: [accuracyPercentage],
  };

  return (
    <div className="relative w-full h-screen overflow-hidden z-10">
      <div className="absolute inset-0 -z-10">
        <Squares
          speed={0.1}
          squareSize={40}
          direction="diagonal"
          borderColor="rgba(241, 115, 0, 0.2)"
          hoverFillColor="#81A4CD"
        />
      </div>
      <Navbar />
      <MenuRight name={nameState} email={emailState} profileImage={avatar} />
      <div className="relative z-20 inset-0 flex flex-col items-center mt-16">
        <h1 className="text-2xl font-bold text-primary mb-2 mt-8 text-center">
          Estadísticas
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

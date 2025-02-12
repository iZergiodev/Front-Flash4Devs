import Squares from "../components/effectcomponents/Squares";
import { Navbar } from "../components/Navbar";
import { MenuRight } from "../components/MenuRight";
import useExtractInfo from "../hooks/useExtractInfo";

import {
  FaQuestionCircle,
  FaLightbulb,
  FaTags,
  FaChartLine,
} from "react-icons/fa";
import { useState } from "react";

export const FormCustom = () => {
  const { emailState, nameState, avatar } = useExtractInfo();

  const [question, setQuestion] = useState("");
  const [solution, setSolution] = useState("");
  const [category, setCategory] = useState("");
  const [difficult, setDifficult] = useState("");

  const handleState = (event) => {
    const { name, value } = event.target;

    switch (name) {
      case "question":
        setQuestion(value);
        break;
      case "solution":
        setSolution(value);
        break;
      case "category":
        setCategory(value);
        break;
      case "difficult":
        setDifficult(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const token = localStorage.getItem("token");

    const resp = await fetch(
      "https://back-flash4devs-production.up.railway.app/card/register-custom",
      {
        method: "POST",
        body: JSON.stringify({
          question: question,
          solution: solution,
          category: category,
          difficult: difficult,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (resp.ok) {
      const data = await resp.json();
      console.log("Card creada", data);
      setQuestion('');
      setSolution('');
      setCategory('');
      setDifficult('');
    } else {
      console.error("Error", resp.statusText);
    }
  };

  return (
    <>
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
        <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
          <div className="bg-card p-8 rounded-lg shadow-lg max-w-md w-full">
            <h1 className="text-2xl font-bold mb-6 text-text">Custom Card</h1>
            <form className="space-y-4 pointer-events-auto">
              <div className="flex items-center space-x-2">
                <FaQuestionCircle className="text-accent" size={20} />
                <label htmlFor="question" className="text-text">
                  Question
                </label>
              </div>
              <input
                onChange={handleState}
                type="text"
                id="question"
                name="question"
                className="w-full p-2 border border-muted rounded-md focus:outline-none focus:border-accent"
                placeholder="Introduce la pregunta"
              />

              <div className="flex items-center space-x-2">
                <FaLightbulb className="text-accent" size={20} />
                <label htmlFor="solution" className="text-text">
                  Solution
                </label>
              </div>
              <textarea
                onChange={handleState}
                id="solution"
                name="solution"
                className="w-full p-2 border border-muted rounded-md focus:outline-none focus:border-accent"
                placeholder="Introduzca la respuesta"
                rows={3}
              ></textarea>
              <div className="flex items-center space-x-2">
                <FaTags className="text-accent" size={20} />
                <label htmlFor="category" className="text-text">
                  Category
                </label>
              </div>
              <input
                onChange={handleState}
                type="text"
                id="category"
                name="category"
                className="w-full p-2 border border-muted rounded-md focus:outline-none focus:border-accent"
                placeholder="Ingresar categoría"
              />

              <div className="flex items-center space-x-2">
                <FaChartLine className="text-accent" size={20} />
                <label htmlFor="difficulty" className="text-text">
                  Difficulty
                </label>
              </div>
              <textarea
                onChange={handleState}
                id="difficulty"
                name="difficulty"
                className="w-full p-2 border border-muted rounded-md focus:outline-none focus:border-accent"
                placeholder="Introduzca la dificultad"
                rows={1}
              ></textarea>

              <div className="flex justify-center">
                <button
                  onClick={handleSubmit}
                  type="button"
                  className=" w-50 text-white bg-accent py-2 md:py-3 text-center rounded hover:bg-secondary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  Enviar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

import Squares from "../components/effectcomponents/Squares";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
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
      clearForm();

    } else {
      console.error("Error", resp.statusText);
    }
  };

  const clearForm = () => {
    console.log('limpiando formulario')
    setQuestion('');
    setSolution('');
    setCategory('');
    setDifficult('');
  }

  return (
    <>
      <div className="relative w-full h-screen overflow-hidden z-10">
        <div className="absolute inset-0 -z-10 bg-white dark:bg-[#3C4043]">
          <Squares
            speed={0.1}
            direction="diagonal"
            hoverFillColor="#81A4CD"
          />
        </div>
        <Navbar />
        <Footer />
        <MenuRight name={nameState} email={emailState} profileImage={avatar} />
        <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
          <div className="bg-white dark:bg-[#919191] border-1 border-gray-200 dark:border-black p-8 rounded-lg shadow-lg max-w-md w-full">
            <h1 className="text-2xl text-center font-bold mb-6 text-text dark:text-black">
              Custom Card
            </h1>
            <form className="space-y-4 pointer-events-auto">
              <div className="flex items-center space-x-2">
                <FaQuestionCircle className="text-accent" size={20} />
                <label htmlFor="question" className="text-text dark:text-black">
                  Question
                </label>
              </div>
              <input
                onChange={handleState}
                type="text"
                value={question}
                id="question"
                name="question"
                className="w-full p-2 border bg-gray-50 dark:bg-gray-200 border-muted rounded-md focus:outline-none focus:border-accent"
                placeholder="Introduce la pregunta"
              />

              <div className="flex items-center space-x-2">
                <FaLightbulb className="text-accent" size={20} />
                <label htmlFor="solution" className="text-text dark:text-black">
                  Solution
                </label>
              </div>
              <textarea
                onChange={handleState}
                id="solution"
                name="solution"
                value={solution}
                className="w-full p-2 border bg-gray-50 dark:bg-gray-200 border-muted rounded-md focus:outline-none focus:border-accent"
                placeholder="Introduzca la respuesta"
                rows={3}
              ></textarea>
              <div className="flex items-center space-x-2">
                <FaTags className="text-accent" size={20} />
                <label htmlFor="category" className="text-text dark:text-black">
                  Category
                </label>
              </div>
              <input
                onChange={handleState}
                type="text"
                value={category}
                id="category"
                name="category"
                className="w-full p-2 border bg-gray-50 dark:bg-gray-200 border-muted rounded-md focus:outline-none focus:border-accent"
                placeholder="Ingresar categoría"
              />

              <div className="flex items-center space-x-2">
                <FaChartLine className="text-accent" size={20} />
                <label
                  htmlFor="difficult"
                  className="text-text dark:text-black"
                >
                  Difficult
                </label>
              </div>
              <textarea
                onChange={handleState}
                id="difficult"
                value={difficult}
                name="difficult"
                className="w-full p-2 border bg-gray-50 dark:bg-gray-200 border-muted rounded-md focus:outline-none focus:border-accent"
                placeholder="Introduzca la dificultad"
                rows={1}
              ></textarea>

              <div className="flex justify-center">
                <button
                  onClick={handleSubmit}
                  type="button"
                  className=" w-50 text-white bg-accent py-2 md:py-3 text-center rounded hover:bg-secondary transition-colors duration-200 focus:outline-none focus:ring-1 focus:ring-primary"
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

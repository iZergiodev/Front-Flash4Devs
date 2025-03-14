// Modal.jsx
import { useState } from "react";
import { useLoading } from "../../hooks/useLoading";
import { ThreeDots } from "react-loader-spinner";

export const ModalNewFlashcard = ({ onClose, onUpdate }) => {
  // Estado local para manejar los datos editados
  const [formData, setFormData] = useState({
    question: "",
    category: "",
    difficult: "",
    solution: "",
  });

  const { isLoading, startLoading, stopLoading } = useLoading();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    try {
      startLoading();
      e.preventDefault();
      const url =
        formData.type === "coding"
          ? "https://back-flash4devs-production.up.railway.app/card/register-codingcard"
          : "https://back-flash4devs-production.up.railway.app/card/register";

      const resp = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(formData),
      });
      stopLoading();
      if (!resp.ok) {
        const errorData = await resp.json();
        throw new Error(
          `Error updating flashcard: ${JSON.stringify(errorData)}`
        );
      }
      const updatedFlashcard = await resp.json();
      onUpdate(updatedFlashcard);
      onClose();
    } catch (error) {
      console.error("Failed to update flashcard:", error);
    }
  };

  return (
    <div
      id="default-modal"
      tabIndex="-1"
      aria-hidden="true"
      className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full bg-black bg-opacity-50"
    >
      <div className="relative p-4 w-full max-w-2xl max-h-full">
        {isLoading && (
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
        )}
        <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              New flashcard
            </h3>
            <button
              type="button"
              onClick={onClose}
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <div className="p-4 md:p-5 space-y-4">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-200">
                  Question
                </label>
                <input
                  type="text"
                  name="question"
                  value={formData.question}
                  onChange={handleChange}
                  className="w-full p-2 border rounded dark:bg-gray-800 dark:text-white"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-200">
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full p-2 border rounded dark:bg-gray-800 dark:text-white"
                >
                  <option value="">Select a category</option>
                  <option value="react">React</option>
                  <option value="css">CSS</option>
                  <option value="html">HTML</option>
                  <option value="javascript">Javascript</option>
                  <option value="typescript">Typescript</option>
                  <option value="angular">Angular</option>
                  <option value="python">Python</option>
                  <option value="git">Git</option>
                  <option value="node">Node</option>
                  <option value="fastapi">FastAPI</option>
                  <option value="sql">SQL</option>
                  <option value="mongodb">MongoDB</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-200">
                  Difficult
                </label>
                <select
                  name="difficult"
                  value={formData.difficult}
                  onChange={handleChange}
                  className="w-full p-2 border rounded dark:bg-gray-800 dark:text-white"
                >
                  <option value="">Select a difficulty</option>
                  <option value="hard">Hard</option>
                  <option value="medium">Medium</option>
                  <option value="easy">Easy</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-200">
                  Solution
                </label>
                <input
                  type="text"
                  name="solution"
                  value={formData.solution}
                  onChange={handleChange}
                  className="w-full p-2 border rounded dark:bg-gray-800 dark:text-white"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-200">
                  Type
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full p-2 border rounded dark:bg-gray-800 dark:text-white"
                >
                  <option value="">Select a type</option>
                  <option value="coding">Coding</option>
                  <option value="concept">Concept</option>
                </select>
              </div>
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Guardar cambios
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

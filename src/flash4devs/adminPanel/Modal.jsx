// Modal.jsx
import { useState } from "react";
import { useLoading } from "../../hooks/useLoading";
import { ThreeDots } from "react-loader-spinner";

export const Modal = ({ onClose, user, onUpdate }) => {
  // Estado local para manejar los datos editados
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    role: user?.role || "",
    last_name: user?.last_name || "",
  });

  const {isLoading, startLoading, stopLoading} = useLoading()


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      startLoading()
      const resp = await fetch(`http://127.0.0.1:8000/api/user/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(formData),
      });
      stopLoading()
      if (!resp.ok) throw new Error("Error updating user");
      const updatedUser = await resp.json();
      onUpdate(updatedUser);
      onClose();
    } catch (error) {
      console.error("Failed to update user:", error);
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
              {`Editar usuario: ${user.name}`}
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
            {user ? (
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700 dark:text-gray-200">
                    Nombre
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-2 border rounded dark:bg-gray-800 dark:text-white"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 dark:text-gray-200">
                    Apellido
                  </label>
                  <input
                    type="text"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    className="w-full p-2 border rounded dark:bg-gray-800 dark:text-white"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 dark:text-gray-200">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-2 border rounded dark:bg-gray-800 dark:text-white"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 dark:text-gray-200">
                    Rol
                  </label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full p-2 border rounded dark:bg-gray-800 dark:text-white"
                  >
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                    <option value="moderator">null</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Guardar cambios
                </button>
              </form>
            ) : (
              <>
                <h1>Error 404</h1>
              </>
            )}
          </div>
          {!user && (
            <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
              <button
                onClick={onClose}
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                I accept
              </button>
              <button
                onClick={onClose}
                type="button"
                className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              >
                Decline
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
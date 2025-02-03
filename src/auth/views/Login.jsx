import { useState } from "react";

import { Link, useNavigate } from "react-router";
import { Navbar } from "../../components/Navbar";
import toast, { Toaster } from "react-hot-toast";
import { useLoading } from "../../hooks/useLoading";
import { ThreeDots } from "react-loader-spinner";

export const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // const waitThreeSeconds = () => {
  //   return new Promise((resolve) => {
  //     setTimeout(() => {
  //       resolve("¡Han pasado 3 segundos!");
  //     }, 3000); // 3000 milisegundos = 3 segundos
  //   });
  // };

  let navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const { isLoading, startLoading, stopLoading } = useLoading();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = "https://back-flash4devs-production.up.railway.app/api/login";

    try {
      startLoading();
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      // await waitThreeSeconds();
      if (response.status === 404) {
        toast.error("Usuario o contraseña incorrectos");
        return;
      }

      const data = await response.json();
      console.log(data);
      if (response.ok) {
        navigate("/");
      }
    } catch (error) {
      toast.error("Error al conectar con el servidor");
      console.error(error.message);
    } finally {
      stopLoading();
    }
  };

  return (
    <>
      <Toaster position="bottom-right" reverseOrder={false} />
      <Navbar />
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-card/60 p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-primary text-center">
            Login
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-primary text-sm font-bold mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Ingresa tu correo electrónico"
                className="w-full px-3 py-2 border border-muted rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-primary text-sm font-bold mb-2"
              >
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Ingresa tu contraseña"
                className="w-full px-3 py-2 border border-muted rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                value={formData.password}
                onChange={handleInputChange}
              />
            </div>
            <button
              className="w-full bg-accent text-white py-2 px-4 rounded-lg hover:bg-secondary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary"
              type="submit"
            >
              Entrar
            </button>
          </form>

          <p className="mt-4 text-center text-muted">
            ¿No tienes una cuenta?{" "}
            <Link
              to="/auth/register"
              className="text-secondary hover:underline"
            >
              Registro
            </Link>
          </p>
        </div>
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
      </div>
    </>
  );
};

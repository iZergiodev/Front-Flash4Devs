import { useState } from "react";
import { useNavigate } from "react-router";
import { useUserStore } from "../../store/userStore";
import toast, { Toaster } from "react-hot-toast";

import { Navbar } from "../../components/Navbar";
import { useLoading } from "../../hooks/useLoading";
import { ThreeDots } from "react-loader-spinner";
import SplitText from "../../components/effectcomponents/SplitText";
import AnimatedContent from "../../components/effectcomponents/AnimatedContent";
import Squares from "../../components/effectcomponents/Squares";

export const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  });

  let navigate = useNavigate();

  const { loginAuthorized } = useUserStore();

  const { isLoading, startLoading, stopLoading } = useLoading();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url =
      "https://back-flash4devs-production.up.railway.app/api/register";

    try {
      startLoading();
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          name: formData.firstName,
          last_name: formData.lastName,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!formData.acceptTerms) {
        alert("Você deve aceitar os termos e condições para se registrar.");
        return;
      }

      if (response.status === 400) {
        toast.error("El email ya está registrado");
        return;
      }

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
      if (response.ok) {
        // loginAuthorized();
        navigate("/auth/login");
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
      <div className="relative min-h-screen overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Squares
            speed={0.1}
            squareSize={40}
            direction="diagonal"
            borderColor="rgba(241, 115, 0, 0.2)"
            hoverFillColor="#81A4CD"
          />
        </div>
        <div className="relative z-20">
          <AnimatedContent
            distance={150}
            direction="vertical"
            reverse={false}
            config={{ tension: 80, friction: 20 }}
            initialOpacity={0.2}
            animateOpacity
            scale={0.1}
            threshold={0.2}
            rootMargin="-50px"
          >
            <Navbar />
          </AnimatedContent>
        </div>
        <div className="relative z-10 flex items-center justify-center min-h-screen pointer-events-none">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row w-full md:w-8/12 bg-card rounded-xl mx-auto shadow-lg overflow-hidden pointer-events-auto">
              <div
                className="w-full md:w-1/2 flex flex-col items-center justify-center p-8 md:p-12 bg-no-repeat bg-cover bg-center relative order-2 md:order-1"
                style={{
                  backgroundImage: "url('/background.jpeg')",
                }}
              >
                <div className="absolute inset-0 bg-black/75"></div>
                <div className="relative z-10 text-center">
                  <h1 className="text-card text-2xl md:text-3xl mb-4 md:mb-5 font-semibold">
                    ¡Bienvenido al bucle infinito de posibilidades!
                  </h1>
                  <div className="bg-gray-400/55 rounded-xl shadow-xl p-4">
                    <p className="text-white font-medium text-base md:text-xl">
                      Prepárese para las entrevistas con{" "}
                      <span className="font-bold text-accent">Flash4Devs</span>,
                      flashcards que van directo al grano. ¡Domina lo esencial y
                      convierte tu código en éxito!
                    </p>
                  </div>
                </div>
              </div>

              <div className="w-full md:w-1/2 py-8 md:py-16 px-6 md:px-12 order-1 md:order-2">
                <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-primary text-center">
                  <SplitText
                    text="Registro"
                    className="text-2xl md:text-3xl font-semibold text-center"
                    delay={150}
                    animationFrom={{
                      opacity: 0,
                      transform: "translate3d(0,50px,0)",
                    }}
                    animationTo={{
                      opacity: 1,
                      transform: "translate3d(0,0,0)",
                    }}
                    easing="easeOutCubic"
                    threshold={0.2}
                    rootMargin="-50px"
                  />
                </h2>
                <p className="mb-4 text-text text-sm md:text-base">
                  Crea tu cuenta. Es gratis y sólo te llevará un minuto.
                </p>
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                    <input
                      type="text"
                      name="firstName"
                      placeholder="Primer Nombre"
                      className="border border-muted py-1 px-2 rounded focus:outline-none focus:ring-2 focus:ring-accent"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                    />
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Apellidos"
                      className="border border-muted py-1 px-2 rounded focus:outline-none focus:ring-2 focus:ring-accent"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mt-4 md:mt-5">
                    <input
                      type="email"
                      name="email"
                      placeholder="Correo Electrónico"
                      className="border border-muted py-1 px-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-accent"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mt-4 md:mt-5">
                    <input
                      type="password"
                      name="password"
                      placeholder="Contrasena"
                      className="border border-muted py-1 px-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-accent"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mt-4 md:mt-5">
                    <input
                      type="password"
                      name="confirmPassword"
                      placeholder="Confirmar Contrasena"
                      className="border border-muted py-1 px-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-accent"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mt-4 md:mt-5">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="acceptTerms"
                        className="border border-muted"
                        checked={formData.acceptTerms}
                        onChange={handleChange}
                      />
                      <span className="ml-2 text-text text-sm md:text-base">
                        Acepto los{" "}
                        <a href="#" className="text-accent font-semibold">
                          Términos de uso
                        </a>{" "}
                        y la{" "}
                        <a href="#" className="text-accent font-semibold">
                          Política de Privacidad
                        </a>
                      </span>
                    </label>
                  </div>
                  <div className="mt-4 md:mt-5">
                    <button
                      type="submit"
                      className="w-full text-white bg-accent py-2 md:py-3 text-center rounded hover:bg-secondary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      Registrate aquí
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
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

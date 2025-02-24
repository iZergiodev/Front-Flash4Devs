import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router";
import toast, { Toaster } from "react-hot-toast";
import { ThreeDots } from "react-loader-spinner";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import SplitText from "../../components/effectcomponents/SplitText";
import Squares from "../../components/effectcomponents/Squares";
import { useLoading } from "../../hooks/useLoading";
import { useUserStore } from "../../store/userStore";

export const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [eyeIsClosed, setEyeState] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const { loginAuthorized } = useUserStore();
  const { isLoading, startLoading, stopLoading } = useLoading();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = "https://back-flash4devs-production.up.railway.app/api/login";

    try {
      startLoading();
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.status === 404) {
        toast.error("Usuario o contraseña incorrectos");
        return;
      }

      if (response.ok) {
        const { access_token } = await response.json();
        localStorage.setItem("token", access_token);
        loginAuthorized();
        navigate("/");
      }
    } catch (error) {
      toast.error("Error al conectar con el servidor");
      console.error(error.message);
    } finally {
      stopLoading();
    }
  };

  const toggleShow = () => {
    const input = inputRef.current;
    input.type = input.type === "password" ? "text" : "password";
    setEyeState((prev) => !prev);
  };

  return (
    <>
      <Toaster position="bottom-right" reverseOrder={false} />
      <div className="relative w-full h-screen overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Squares
            speed={0.1}
            squareSize={40}
            direction="diagonal"
            borderColor="rgba(241, 115, 0, 0.2)"
            hoverFillColor="#81A4CD"
          />
        </div>
        <div className="relative z-10 flex items-center justify-center w-full h-full pointer-events-none">
          <div className="bg-card p-8 rounded-lg shadow-lg w-full max-w-md pointer-events-auto">
            <h2 className="text-2xl font-bold mb-6 text-primary text-center">
              <SplitText
                text="Login"
                className="text-2xl font-semibold text-center"
                delay={150}
                animationFrom={{
                  opacity: 0,
                  transform: "translate3d(0,50px,0)",
                }}
                animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
                easing="easeOutCubic"
                threshold={0.2}
                rootMargin="-50px"
              />
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
                <div className="relative w-full">
                  <input
                    ref={inputRef}
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Ingresa tu contraseña"
                    className="w-full px-3 py-2 border border-muted rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                  <button
                    type="button"
                    onClick={toggleShow}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none cursor-pointer"
                  >
                    {eyeIsClosed ? (
                      <VscEye size={20} />
                    ) : (
                      <VscEyeClosed size={20} />
                    )}
                  </button>
                </div>
              </div>
              <button
                className="w-full text-white bg-accent py-2 px-4 rounded-lg hover:bg-secondary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary"
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

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
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [eyeIsClosed, setEyeState] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const { loginAuthorized } = useUserStore();
  const { isLoading, startLoading, stopLoading } = useLoading();

  // const validateEmail = (email) => {
  //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //   return emailRegex.test(email);
  // };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "email") {
      if (!value) {
        setEmailError("El correo electrónico es obligatorio");
      // } else if (!validateEmail(value)) {
      //   setEmailError("Por favor, introduce un correo electrónico válido");
      } else {
        setEmailError("");
      }
    }

    if (name === "password") {
      if (!value) {
        setPasswordError("La contraseña es obligatoria");
      } else {
        setPasswordError("");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let hasError = false;

    if (!formData.email) {
      setEmailError("El correo electrónico es obligatorio");
      hasError = true;
    } 
    // else if (!validateEmail(formData.email)) {
    //   setEmailError("Por favor, introduce un correo electrónico válido");
    //   hasError = true;
    // }

    if (!formData.password) {
      setPasswordError("La contraseña es obligatoria");
      hasError = true;
    }

    if (hasError) {
      toast.error("Corrige los errores en el formulario");
      return;
    }

    const url = "https://back-flash4devs-production.up.railway.app/api/login";

    try {
      startLoading();
      console.log("Enviando requisição para:", url);
      console.log("Dados enviados:", formData);

      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      console.log("Status da resposta:", response.status);

      if (response.status === 401) {
        console.log("Credenciais incorretas detectadas (401)");
        setPasswordError("Correo o contraseña incorrectos");
        stopLoading();
        return;
      }

      if (!response.ok) {
        console.log("Resposta não OK, status:", response.status);
        throw new Error(
          `Error en la respuesta del servidor: ${response.status}`
        );
      }

      console.log("Login bem-sucedido");
      const { access_token } = await response.json();
      localStorage.setItem("token", access_token);
      loginAuthorized();
      navigate("/");
    } catch (error) {
      console.log("Erro capturado no catch:", error.message);
      setEmailError("");
      setPasswordError("");
      toast.error("Error al conectar con el servidor");
      console.error("Erro de conexão:", error.message);
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
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent ${
                    emailError ? "border-red-500" : "border-muted"
                  }`}
                  value={formData.email}
                  onChange={handleInputChange}
                />
                {emailError && (
                  <p className="text-red-500 text-xs mt-1">{emailError}</p>
                )}
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
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent ${
                      passwordError ? "border-red-500" : "border-muted"
                    }`}
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
                {passwordError && (
                  <p className="text-red-500 text-xs mt-1">{passwordError}</p>
                )}
              </div>
              <button
                className="w-full text-white bg-accent py-2 px-4 rounded-lg hover:bg-secondary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary"
                type="submit"
                disabled={isLoading || emailError || passwordError}
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

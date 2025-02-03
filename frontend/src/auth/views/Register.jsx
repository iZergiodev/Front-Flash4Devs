
import { useState } from "react";
import { Navbar } from "../../components/Navbar";
import { useNavigate } from "react-router";

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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Formulário enviado:", formData);
    const url = "http://127.0.0.1:8000/api/register";

    try {
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
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
      if (response.ok) {
        navigate("/auth/login");
      }
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <>
    <Navbar />
    <div className="bg-background min-h-screen flex items-center justify-center">
      <div className="container mx-auto">
        <div className="flex w-8/12 bg-card/60 rounded-xl mx-auto shadow-lg overflow-hidden">
          <div
            className="w-1/2 flex flex-col items-center justify-center p-12 bg-no-repeat bg-cover bg-center relative"
            style={{
              backgroundImage:
                "url('/background.jpeg')",
            }}
          >
            <div className="absolute inset-0 bg-black/50"></div>
            <div className="relative z-10">
              <h1 className="text-card text-3xl mb-5 font-semibold text-center">
                ¡Bienvenido al bucle infinito de posibilidades!
              </h1>
              <div className="bg-gray-400/55 rounded-xl shadow-xl text-center">
                <p className="text-white font-medium text-xl text-shadow shadow-black-500">
                  Prepárese para las entrevistas con{" "}
                  <span className="font-bold text-accent">Flash4Devs</span>,
                  flashcards que van directo al grano. ¡Domina lo esencial y
                  convierte tu código en éxito!"{" "}
                </p>
              </div>
            </div>
          </div>
          <div className="w-1/2 py-16 px-12">
            <h2 className="text-3xl font-bold mb-6 text-primary text-center">
              Registro
            </h2>
            <p className="mb-4 text-text">
              Crea tu cuenta. Es gratis y sólo te llevará un minuto.
            </p>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-5">
                <input
                  type="text"
                  name="firstName"
                  placeholder="Primer Nombre"
                  className="border border-muted py-1 px-2 rounded focus:outline-none focus:ring-2 focus:ring-accent"
                  value={formData.firstName}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Apellidos"
                  className="border border-muted py-1 px-2 rounded focus:outline-none focus:ring-2 focus:ring-accent"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>
              <div className="mt-5">
                <input
                  type="email"
                  name="email"
                  placeholder="Correo Electrónico"
                  className="border border-muted py-1 px-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-accent"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="mt-5">
                <input
                  type="password"
                  name="password"
                  placeholder="Contrasena"
                  className="border border-muted py-1 px-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-accent"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              <div className="mt-5">
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirmar Contrasena"
                  className="border border-muted py-1 px-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-accent"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>
              <div className="mt-5">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="acceptTerms"
                    className="border border-muted "
                    checked={formData.acceptTerms}
                    onChange={handleChange}
                  />
                  <span className="ml-2 text-text">
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
              <div className="mt-5">
                <button
                  type="submit"
                  className="w-full bg-accent py-3 text-center text-white rounded hover:bg-secondary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  Regístrate Ahora
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

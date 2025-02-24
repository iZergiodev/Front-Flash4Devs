import { useState } from "react";
import { useNavigate } from "react-router";
import {
  FaPen,
  FaMedal,
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaEnvelope,
  FaUser,
  FaClock,
  FaInfoCircle,
  FaBrain,
} from "react-icons/fa";
import Squares from "../../components/effectcomponents/Squares";
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import { useLoading } from "../../hooks/useLoading";
import { ThreeDots } from "react-loader-spinner";
import { decodeToken } from "../../utils/decodeToken";
import { useEffect } from "react";

export const Profile = () => {
  const [avatar, setAvatar] = useState("/avatarejemplo.jpg");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [porcentage, setPorcentage] = useState(0);
  const [rank, setRank] = useState("Beginner");
  const [github, setGithub] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [twitter, setTwitter] = useState("");
  const [frontEndRating, setFrontEndRating] = useState("");
  const [backEndRating, setBackEndRating] = useState("");

  const { isLoading, startLoading, stopLoading } = useLoading();
  const navigate = useNavigate();

  const getUserInfo = async () => {
    const token = localStorage.getItem("token");
    const decodedToken = token ? decodeToken(token) : null;
    const idFromToken = decodedToken ? decodedToken.id : null;

    startLoading();
    const resp = await fetch(
      `https://back-flash4devs-production.up.railway.app/api/user/${idFromToken}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    const { profile_image, email, name, last_name } = await resp.json();
    setAvatar(profile_image);
    setFirstName(name);
    setLastName(last_name);
    setEmail(email);
    stopLoading();
  };

  const handleAvatarChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      startLoading();
      try {
        const token = localStorage.getItem("token");
        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch(
          "https://back-flash4devs-production.up.railway.app/api/upload/",
          {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` },
            body: formData,
          }
        );

        if (!response.ok) throw new Error("Error al subir la imagen");
        const data = await response.json();
        setAvatar(data.url);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        stopLoading();
      }
    }
  };

  const handleSave = () => {
    navigate("/");
    // Falta lógica
  };

  const fetchUserStats = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        "https://back-flash4devs-production.up.railway.app/card/user-stats",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!response.ok) {
        throw new Error("Error al obtener estadísticas del usuario");
      }

      const {
        good_answers,
        bad_answer,
        level,
        rating_interview_front_react,
        rating_interview_backend_python,
      } = await response.json();

      const goodAnswersNum = Number(good_answers) || 0;
      const badAnswersNum = Number(bad_answer) || 0;

      const totalAnswers = goodAnswersNum + badAnswersNum;
      const calculatedPorcentage =
        totalAnswers === 0 ? 0 : (goodAnswersNum / totalAnswers) * 100;

      setPorcentage(calculatedPorcentage);
      setRank(level || "Beginner");
      setFrontEndRating(rating_interview_front_react || "N/A");
      setBackEndRating(rating_interview_backend_python || "N/A");
    } catch (error) {
      console.error("Error fetching user stats:", error);

      setPorcentage(0);
      setRank("Beginner");
      setFrontEndRating("N/A");
      setBackEndRating("N/A");
    }
  };

  useEffect(() => {
    getUserInfo();
    fetchUserStats();
  }, []);

  const renderInputField = (
    label,
    value,
    onChange,
    placeholder = "",
    readOnly = false,
    Icon = FaUser
  ) => (
    <div>
      <label className="text-xs font-medium text-text flex items-center space-x-2">
        <Icon />
        <span>{label}</span>
      </label>
      <div className="mt-2 flex items-center">
        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          readOnly={readOnly}
          className={`flex-1 p-1 ${
            readOnly ? "bg-muted/20" : ""
          } border border-muted rounded-lg w-full text-sm`}
        />
        {!readOnly && (
          <button className="ml-2 text-accent cursor-pointer">
            <FaPen />
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Squares
          speed={0.1}
          squareSize={40}
          direction="diagonal"
          borderColor="rgba(241, 115, 0, 0.2)"
          hoverFillColor="#81A4CD"
        />
      </div>
      <Navbar />
      <Footer />
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4 pointer-events-none">
        <div className="bg-card p-4 rounded-lg shadow-lg w-full max-w-5xl pointer-events-auto">
          <h1 className="text-3xl font-semibold text-center mb-4 text-text">
            Tu Perfil
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-6">
              <div className="flex justify-center">
                <div className="relative">
                  <img
                    src={avatar}
                    alt="Avatar"
                    className="w-40 h-40 rounded-full border-4 border-primary"
                  />
                  <label
                    htmlFor="avatar-upload"
                    className="absolute bottom-0 right-0 bg-accent p-1 rounded-full cursor-pointer"
                  >
                    <FaPen className="text-white" />
                  </label>
                  <input
                    id="avatar-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleAvatarChange}
                  />
                </div>
              </div>
              {renderInputField(
                "Nombre",
                firstName,
                (e) => setFirstName(e.target.value),
                "",
                true
              )}
              {renderInputField(
                "Apellidos",
                lastName,
                (e) => setLastName(e.target.value),
                "Escribe tu apellido"
              )}
              {renderInputField(
                "Correo Electrónico",
                email,
                (e) => setEmail(e.target.value),
                "",
                true,
                FaEnvelope
              )}
              <div>
                <label className="text-xs font-medium text-text flex items-center space-x-2">
                  <FaInfoCircle />
                  <span>Acerca de ti</span>
                </label>
                <textarea
                  value={description}
                  placeholder="Escribe un poco sobre ti"
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-1 border border-muted rounded-lg resize-none text-sm mt-1"
                  rows={3}
                ></textarea>
              </div>
            </div>
            <div className="space-y-6">
              {renderInputField(
                "Puntuación Media",
                `${porcentage}%`,
                () => {},
                "",
                true,
                FaMedal
              )}
              {renderInputField(
                "Rango actual",
                rank,
                () => {},
                "",
                true,
                FaBrain
              )}
              <div>
                <label className="text-xs font-medium text-text flex items-center space-x-2">
                  <FaMedal />
                  <span>Medallas</span>
                </label>
                <div className="space-y-1 mt-1">
                  <div className="flex items-center justify-between p-1 border border-muted rounded-lg text-sm">
                    <span>{`Rating FrontEnd = ${frontEndRating}`}</span>
                  </div>
                  <div className="flex items-center justify-between p-1 border border-muted rounded-lg text-sm">
                    <span>{`Rating BackEnd = ${backEndRating}`}</span>
                  </div>
                </div>
              </div>
              {renderInputField(
                "GitHub",
                github,
                (e) => setGithub(e.target.value),
                "Enlace a tu GitHub",
                false,
                FaGithub
              )}
              {renderInputField(
                "LinkedIn",
                linkedin,
                (e) => setLinkedin(e.target.value),
                "Enlace a tu Linkedin",
                false,
                FaLinkedin
              )}
              {renderInputField(
                "Twitter",
                twitter,
                (e) => setTwitter(e.target.value),
                "Enlace a tu Twitter",
                false,
                FaTwitter
              )}
            </div>
          </div>
          <div className="text-center mt-6">
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-accent text-white rounded-lg shadow hover:bg-secondary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary text-sm cursor-pointer"
            >
              Salvar
            </button>
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
  );
};

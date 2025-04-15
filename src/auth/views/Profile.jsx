import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import {
  FaPen,
  FaMedal,
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaEnvelope,
  FaUser,
  FaInfoCircle,
  FaBrain,
} from "react-icons/fa";
import { useAuth0 } from "@auth0/auth0-react";
import Squares from "../../components/effectcomponents/Squares";
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import { useLoading } from "../../hooks/useLoading";
import { ThreeDots } from "react-loader-spinner";
import { useUserStore } from "../../store/userStore";

export const Profile = () => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const { user: storedUser, login } = useUserStore();
  const [originalData, setOriginalData] = useState({});
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
  const [frontEndRating, setFrontEndRating] = useState("N/A");
  const [backEndRating, setBackEndRating] = useState("N/A");
  const [isEditing, setIsEditing] = useState(false);

  const { isLoading, startLoading, stopLoading } = useLoading();
  const navigate = useNavigate();

  const getUserInfo = async () => {
    if (!isAuthenticated || !user) return;

    startLoading();
    try {
      const token = await getAccessTokenSilently({
        authorizationParams: {
          audience: "https://flash4devs/api",
          scope: "openid profile email",
        },
      });

      login(user, token);

      const userId = user.sub;
      const resp = await fetch(
        `https://back-flash4devs-production.up.railway.app/api/user/${userId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      let userData;
      if (resp.ok) {
        const data = await resp.json();
        userData = {
          avatar: data.profile_image || user.picture || "/avatarejemplo.jpg",
          firstName: data.name || user.given_name || user.name || "",
          lastName: data.last_name || user.family_name || "",
          email: data.email || user.email || "",
          description: data.description || "",
          github: data.github || "",
          linkedin: data.linkedin || "",
          twitter: data.twitter || "",
        };
      } else {

        userData = {
          avatar: user.picture || "/avatarejemplo.jpg",
          firstName: user.given_name || user.name || "",
          lastName: user.family_name || "",
          email: user.email || "",
          description: "",
          github: user.github || "",
          linkedin: user.linkedin || "",
          twitter: user.twitter || "",
        };
      }

      setAvatar(userData.avatar);
      setFirstName(userData.firstName);
      setLastName(userData.lastName);
      setEmail(userData.email);
      setDescription(userData.description);
      setGithub(userData.github);
      setLinkedin(userData.linkedin);
      setTwitter(userData.twitter);
      setOriginalData(userData);
    } catch (error) {
      console.error("Error fetching user info:", error);
    } finally {
      stopLoading();
    }
  };

  const handleAvatarChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      startLoading();
      try {
        const token = await getAccessTokenSilently();
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "flash4devs"); // Substitua pelo seu upload preset do Cloudinary

        const response = await fetch(
          "https://api.cloudinary.com/v1_1/seu-cloud-name/image/upload", 
          {
            method: "POST",
            body: formData,
          }
        );

        if (!response.ok) throw new Error("Erro ao subir a imagem");
        const data = await response.json();
        const imageUrl = data.secure_url;
        setAvatar(imageUrl);

        // Atualiza backend
        await fetch(
          `https://back-flash4devs-production.up.railway.app/api/user/${user.sub}`,
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ profile_image: imageUrl }),
          }
        );

        login({ ...user, picture: imageUrl }, token);
      } catch (error) {
        console.error("Error uploading image:", error);
      } finally {
        stopLoading();
      }
    }
  };

  const fetchUserStats = async () => {
    try {
      const token = await getAccessTokenSilently();
      const response = await fetch(
        "https://back-flash4devs-production.up.railway.app/card/user-stats",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao obter estatísticas do usuário");
      }

      const {
        good_answers,
        bad_answers,
        level,
        rating_interview_front_react,
        rating_interview_backend_python,
      } = await response.json();

      const goodAnswersNum = Number(good_answers) || 0;
      const badAnswersNum = Number(bad_answers) || 0;
      const totalAnswers = goodAnswersNum + badAnswersNum;
      const calculatedPorcentage =
        totalAnswers === 0 ? 0 : (goodAnswersNum / totalAnswers) * 100;

      setPorcentage(calculatedPorcentage.toFixed(2));
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
    if (isAuthenticated) {
      getUserInfo();
      fetchUserStats();
    }
  }, [isAuthenticated]);

  const handleCancel = () => {
    setAvatar(originalData.avatar);
    setFirstName(originalData.firstName);
    setLastName(originalData.lastName);
    setEmail(originalData.email);
    setDescription(originalData.description);
    setGithub(originalData.github);
    setLinkedin(originalData.linkedin);
    setTwitter(originalData.twitter);
    setIsEditing(false);
  };

  const handleEditToggle = () => {
    if (isEditing) {
      handleCancel();
    } else {
      setIsEditing(true);
    }
  };

  const handleSave = async () => {
    setIsEditing(false);
    setOriginalData({
      avatar,
      firstName,
      lastName,
      email,
      description,
      github,
      linkedin,
      twitter,
    });

    try {
      const token = await getAccessTokenSilently();
      const updatedData = {
        profile_image: avatar,
        name: firstName,
        last_name: lastName,
        email: email || null,
        description,
        github,
        linkedin,
        twitter,
      };

      console.log("Salvando dados:", updatedData);

      const response = await fetch(
        `https://back-flash4devs-production.up.railway.app/api/user/${user.sub}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao salvar dados do usuário");
      }

      login({ ...user, ...updatedData, picture: avatar }, token);
    } catch (error) {
      console.error("Error saving user data:", error);
    }

    navigate("/auth/profile");
  };

  const renderInputField = (
    label,
    value,
    onChange,
    placeholder = "",
    alwaysDisabled = false,
    Icon = FaUser
  ) => (
    <div>
      <label className="text-xs font-medium text-text dark:text-black flex items-center space-x-2">
        <Icon />
        <span>{label}</span>
      </label>
      <div className="mt-2 flex items-center">
        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={alwaysDisabled || !isEditing}
          className={`flex-1 p-1 ${
            alwaysDisabled || !isEditing ? "bg-muted/20 cursor-not-allowed" : ""
          } border border-muted dark:border-gray-500 rounded-lg w-full text-sm`}
        />
      </div>
    </div>
  );

  if (!isAuthenticated) {
    return <div>Por favor, faça login para ver seu perfil.</div>;
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 z-0 bg-white dark:bg-[#3C4043]">
        <Squares speed={0.1} direction="diagonal" hoverFillColor="#81A4CD" />
      </div>
      <Navbar />
      <Footer />
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4 pointer-events-none">
        <div className="bg-card dark:bg-[#b9b9b9] p-4 rounded-lg shadow-lg w-full max-w-5xl pointer-events-auto">
          <h1 className="text-3xl font-semibold text-center mb-4 text-text dark:text-black">
            Tu Perfil
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-6">
              <div className="flex justify-center">
                <div className="relative">
                  <img
                    src={avatar}
                    alt="Avatar"
                    className="w-40 h-40 rounded-full border-4 border-primary dark:border-black"
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
                "Escribe tu apellido",
                false
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
                <label className="text-xs font-medium text-text dark:text-black flex items-center space-x-2">
                  <FaInfoCircle />
                  <span>Acerca de ti</span>
                </label>
                <textarea
                  value={description}
                  placeholder="Escribe un poco sobre ti"
                  onChange={(e) => setDescription(e.target.value)}
                  disabled={!isEditing}
                  className={`w-full p-1 border border-muted dark:border-gray-500 rounded-lg resize-none text-sm mt-1 ${
                    !isEditing ? "bg-muted/20 cursor-not-allowed" : ""
                  }`}
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
                <label className="text-xs font-medium text-text dark:text-black flex items-center space-x-2">
                  <FaMedal />
                  <span>Medallas</span>
                </label>
                <div className="space-y-1 mt-1">
                  <div className="flex items-center justify-between p-1 border border-muted dark:border-gray-500 rounded-lg text-sm bg-muted/20 cursor-not-allowed">
                    <span>{`Rating FrontEnd = ${frontEndRating}`}</span>
                  </div>
                  <div className="flex items-center justify-between p-1 border border-muted dark:border-gray-500 rounded-lg text-sm bg-muted/20 cursor-not-allowed">
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
          <div className="text-center mt-6 flex justify-center space-x-4">
            <button
              onClick={handleEditToggle}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary text-sm cursor-pointer"
            >
              {isEditing ? "Cancelar" : "Editar"}
            </button>
            <button
              onClick={handleSave}
              className={`px-4 py-2 bg-accent text-white rounded-lg shadow hover:bg-secondary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary text-sm cursor-pointer ${
                !isEditing ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={!isEditing}
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

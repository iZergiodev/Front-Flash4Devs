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
} from "react-icons/fa";
import Squares from "../../components/effectcomponents/Squares";
import { Navbar } from "../../components/Navbar";

export const Profile = () => {
  const [avatar, setAvatar] = useState("/avatarejemplo.jpg");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState(
    ""
  );
  const [porcentage, setPorcentage] = useState(85);
  const [studyTime, setStudyTime] = useState("120 horas");
  const [medals, setMedals] = useState(["Curso HTML", "Curso React"]);
  const [github, setGithub] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [twitter, setTwitter] = useState("");

  const [isEditingFirstName, setIsEditingFirstName] = useState(false);

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const navigate = useNavigate();

  const handleSave = () => {
    navigate("/home");
    //Falta lógica
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Squares
          speed={0.5}
          squareSize={40}
          direction="diagonal"
          borderColor="rgba(241, 115, 0, 0.4)"
          hoverFillColor="#81A4CD"
        />
      </div>
      <Navbar />
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

              <div>
                <label className="text-xs font-medium text-text flex items-center space-x-2">
                  <FaUser />
                  <span>Nombre</span>
                </label>
                <div className="mt-2 flex items-center">
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    readOnly
                    className="flex-1 p-1 bg-muted/20 border border-muted rounded-lg w-[371px] text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-text flex items-center space-x-2">
                  <FaUser />
                  <span>Apellidos</span>
                </label>
                <div className="mt-2 flex items-center">
                  <input
                    type="text"
                    placeholder="Escribe tu apellido"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="flex-1 p-1 border border-muted rounded-lg w-full text-sm"
                  />
                  <button className="ml-2 text-accent cursor-pointer">
                    <FaPen />
                  </button>
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-text flex items-center space-x-2">
                  <FaEnvelope />
                  <span>Correo Electrónico</span>
                </label>
                <div className="mt-1 flex items-center">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    readOnly
                    className="flex-1 p-1 bg-muted/20 border border-muted rounded-lg w-[371px] text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-text flex items-center space-x-2 mt-6">
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
            </div>

            <div className="space-y-6">
              <div className="w-full">
                <label className="text-xs font-medium text-text flex items-center space-x-2 mt-6">
                  <FaMedal />
                  <span>Puntuación Media</span>
                </label>
                <input
                  type="text"
                  value={`${porcentage}%`}
                  readOnly
                  className="flex-1 p-1 bg-muted/20 border border-muted rounded-lg w-full text-sm mt-1"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-text flex items-center space-x-2">
                  <FaClock />
                  <span>Tempo de Estudos</span>
                </label>
                <input
                  type="text"
                  value={studyTime}
                  readOnly
                  className="flex-1 p-1 bg-muted/20 border border-muted rounded-lg w-full text-sm mt-1"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-text flex items-center space-x-2">
                  <FaMedal />
                  <span>Medallas</span>
                </label>
                <div className="space-y-1 mt-1">
                  {medals.map((medal, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-1 border border-muted rounded-lg text-sm"
                    >
                      <span>{medal}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-text flex items-center space-x-2">
                  <FaGithub />
                  <span>GitHub</span>
                </label>
                <div className="mt-1 flex items-center">
                  <input
                    type="text"
                    placeholder="Enlace a tu GitHub"
                    value={github}
                    onChange={(e) => setGithub(e.target.value)}
                    className="flex-1 p-1 border border-muted rounded-lg w-full text-sm"
                  />
                  <button className="ml-2 text-accent cursor-pointer">
                    <FaPen />
                  </button>
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-text flex items-center space-x-2">
                  <FaLinkedin />
                  <span>LinkedIn</span>
                </label>
                <div className="mt-1 flex items-center">
                  <input
                    type="text"
                    placeholder="Enlace a tu Linkedin"
                    value={linkedin}
                    onChange={(e) => setLinkedin(e.target.value)}
                    className="flex-1 p-1 border border-muted rounded-lg w-full text-sm"
                  />
                  <button className="ml-2 text-accent cursor-pointer">
                    <FaPen />
                  </button>
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-text flex items-center space-x-2">
                  <FaTwitter />
                  <span>Twitter</span>
                </label>
                <div className="mt-1 flex items-center">
                  <input
                    type="text"
                    placeholder="Enlace a tu Twitter"
                    value={twitter}
                    onChange={(e) => setTwitter(e.target.value)}
                    className="flex-1 p-1 border border-muted rounded-lg w-full text-sm"
                  />
                  <button className="ml-2 text-accent cursor-pointer">
                    <FaPen />
                  </button>
                </div>
              </div>
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
    </div>
  );
};

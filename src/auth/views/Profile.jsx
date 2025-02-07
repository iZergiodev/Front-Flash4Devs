import { useState } from "react";
import { useNavigate } from 'react-router'
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
import Squares from "../../components/Squares";

export const Profile = () => {
  const [avatar, setAvatar] = useState("/avatarejemplo.jpg");
  const [firstName, setFirstName] = useState("Yago");
  const [lastName, setLastName] = useState("Cima Castelao");
  const [email, setEmail] = useState("yago@castelao.dev");
  const [description, setDescription] = useState(
    "Desarrollador de software de Flash4Geeks"
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

  const navigate = useNavigate()

  const handleSave = () => {
    navigate('/home');
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

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4 pointer-events-none">
        <div className="bg-card p-6 rounded-lg shadow-lg w-full max-w-xl pointer-events-auto">
          <h1 className="text-2xl font-semibold text-center mb-4 text-text">
            Tu Perfil
          </h1>
          <div className="flex flex-col items-center space-y-3">
            <div className="relative">
              <img
                src={avatar}
                alt="Avatar"
                className="w-28 h-28 rounded-full border-4 border-primary"
              />
              <label
                htmlFor="avatar-upload"
                className="absolute bottom-0 right-0 bg-accent p-2 rounded-full cursor-pointer"
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

            <div className="w-full">
              <label className="text-xs font-medium text-text flex items-center space-x-2">
                <FaUser />
                <span>Nombre</span>
              </label>
              <div className="mt-1 flex items-center">
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className={`flex-1 p-1 border border-muted rounded-lg w-3/5 text-sm ${
                    isEditingFirstName ? "bg-card" : "bg-muted/50"
                  }`}
                />
                <button
                  className="ml-2 text-accent cursor-pointer"
                  onClick={() => setIsEditingFirstName(!isEditingFirstName)}
                >
                  <FaPen />
                </button>
              </div>
            </div>

            <div className="w-full">
              <label className="text-xs font-medium text-text flex items-center space-x-2">
                <FaUser />
                <span>Apellidos</span>
              </label>
              <div className="mt-1 flex items-center">
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="flex-1 p-1 border border-muted rounded-lg w-3/5 text-sm"
                />
                <button className="ml-2 text-accent cursor-pointer">
                  <FaPen />
                </button>
              </div>
            </div>

            <div className="w-full">
              <label className="text-xs font-medium text-text flex items-center space-x-2">
                <FaEnvelope />
                <span>Correo Electrónico</span>
              </label>
              <div className="mt-1 flex items-center">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 p-1 border border-muted rounded-lg w-3/5 text-sm"
                />
                <button className="ml-2 text-accent cursor-pointer">
                  <FaPen />
                </button>
              </div>
            </div>

            <div className="w-full">
              <label className="text-xs font-medium text-text flex items-center space-x-2">
                <FaInfoCircle />
                <span>Acerca de ti</span>
              </label>
              <div className="mt-1 flex items-center">
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="flex-1 p-1 border border-muted rounded-lg w-full resize-none text-sm"
                  rows={2}
                ></textarea>
                <button className="ml-2 text-accent cursor-pointer">
                  <FaPen />
                </button>
              </div>
            </div>

            <div className="w-full">
              <label className="text-xs font-medium text-text flex items-center space-x-2">
                <FaMedal />
                <span>Puntuación Media</span>
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  value={`${porcentage}%`}
                  readOnly
                  className="flex-1 p-1 bg-muted/50 border border-muted rounded-lg w-3/5 text-sm"
                />
              </div>
            </div>

            <div className="w-full">
              <label className="text-xs font-medium text-text flex items-center space-x-2">
                <FaClock />
                <span>Tempo de Estudios</span>
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  value={studyTime}
                  readOnly
                  className="flex-1 p-1 bg-muted/50 border border-muted rounded-lg w-3/5 text-sm"
                />
              </div>
            </div>

            <div className="w-full">
              <label className="text-xs font-medium text-text flex items-center space-x-2">
                <FaMedal />
                <span>Medallas</span>
              </label>
              <div className="mt-1">
                {medals.map((medal, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-1 border border-muted rounded-lg mb-1 text-sm"
                  >
                    <span>{medal}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="w-full space-y-3">
              <div>
                <label className="text-xs font-medium text-text flex items-center space-x-2">
                  <FaGithub />
                  <span>GitHub</span>
                </label>
                <div className="mt-1 flex items-center">
                  <input
                    type="text"
                    value={github}
                    onChange={(e) => setGithub(e.target.value)}
                    className="flex-1 p-1 border border-muted rounded-lg w-3/5 text-sm"
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
                    value={linkedin}
                    onChange={(e) => setLinkedin(e.target.value)}
                    className="flex-1 p-1 border border-muted rounded-lg w-3/5 text-sm"
                  />
                  <button className="ml-2 text-accent cursor-pointer">
                    <FaPen />
                  </button>
                </div>
              </div>

              <div>
                <label className="flex text-xs font-medium text-text items-center space-x-2">
                  <FaTwitter />
                  <span>Twitter</span>
                </label>
                <div className="mt-1 flex items-center">
                  <input
                    type="text"
                    value={twitter}
                    onChange={(e) => setTwitter(e.target.value)}
                    className="flex-1 p-1 border border-muted rounded-lg w-3/5 text-sm"
                  />
                  <button className="ml-2 text-accent cursor-pointer">
                    <FaPen />
                  </button>
                </div>
              </div>
            </div>

            <button
              onClick={handleSave}
              className="mt-4 px-3 py-2 bg-accent text-white rounded-lg shadow hover:bg-secondary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary text-sm cursor-pointer"
            >
              Salvar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

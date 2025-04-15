import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GradientText from "./effectcomponents/GradientText";
import { FaUser, FaGraduationCap, FaStar, FaSignOutAlt } from "react-icons/fa";
import DecryptedText from "./effectcomponents/DecryptedText";
import { useUserStore } from "../store/userStore";
import { useAuth0 } from "@auth0/auth0-react";
import { Link, useNavigate } from "react-router";

export const MenuRight = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const { user, isLogged, logout: logoutStore } = useUserStore();
  const { logout: logoutAuth0 } = useAuth0();

 
  if (!isLogged || !user) {
    return null;
  }

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleLogout = () => {
    logoutStore();
    logoutAuth0({
      logoutParams: {
        returnTo: "http://localhost:5173",
      },
    });
    navigate("/");
  };

  const menuItems = [
    { to: "/auth/profile", icon: FaUser, text: "Perfil" },
    { to: "/categorias", icon: FaGraduationCap, text: "Flashcards" },
    { to: "/estadistica", icon: FaStar, text: "Estadísticas" },
  ];

  // Dados do usuário
  const displayName =
    user.name || user.nickname || user.given_name || "Usuário";
  const displayEmail = user.email || "Sem email";
  const profileImage =
    user.picture || user.profile_image || "/avatarejemplo.jpg";

  return (
    <motion.nav className="fixed right-2 top-[15px] z-50 font-semibold md:right-5 md:top-[20px] md:bg-card dark:md:bg-[#919191] md:shadow-lg md:rounded-full md:p-4 md:py-1 md:px-4 scale-110 md:scale-100">
      <motion.div
        className="flex flex-row items-center gap-2 md:gap-4 transform-gpu"
        transition={{ type: "spring", stiffness: 300 }}
      >
        <div className="hidden md:block">
          <GradientText
            colors={["#054A91", "#F17300", "#054A91", "#F17300", "#054A91"]}
            animationSpeed={3}
            showBorder={false}
            className="custom-class"
          >
            {displayName}
          </GradientText>
        </div>
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="w-7 h-7 md:w-10 md:h-10 rounded-full overflow-hidden border-2 border-primary dark:border-black cursor-pointer"
          >
            <img
              src={profileImage}
              alt="Avatar"
              className="w-full h-full object-cover"
            />
          </button>
          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="fixed right-0 mt-3 w-44 md:w-47 bg-card dark:bg-[#919191] rounded-lg shadow-lg border border-muted/20 z-[100] max-w-[90vw]"
              >
                <ul className="py-2">
                  <li className="border-b border-muted/20 mb-1 pb-2 flex flex-col items-center justify-center px-5 mt-1">
                    <span className="text-sm md:text-md">
                      <DecryptedText text="Pró-user" animateOn="view" />
                    </span>
                    <span className="text-[0.6rem] md:text-[0.625rem] underline decoration-solid">
                      <DecryptedText text={displayEmail} animateOn="view" />
                    </span>
                  </li>
                  {menuItems.map((item, index) => (
                    <li key={index}>
                      <Link
                        to={item.to}
                        className="flex items-center px-3 py-2 text-text dark:text-[#202124] hover:bg-muted/30 transition-colors duration-200 font-semibold cursor-pointer text-sm md:text-base"
                      >
                        <item.icon className="mr-2 md:mr-3" />
                        {item.text}
                      </Link>
                    </li>
                  ))}
                  <li className="border-t border-muted/20 mt-2 pt-2 flex items-center justify-center">
                    <button
                      className="w-24 md:w-28 flex items-center justify-center text-white bg-accent py-1 md:py-2 px-3 md:px-4 rounded-lg hover:bg-secondary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer text-sm md:text-base"
                      onClick={handleLogout}
                      type="button"
                    >
                      <FaSignOutAlt className="mr-1 md:mr-2" />
                      Logout
                    </button>
                  </li>
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.nav>
  );
};

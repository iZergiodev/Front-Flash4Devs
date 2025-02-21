import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GradientText from "./effectcomponents/GradientText";
import { FaUser, FaGraduationCap, FaStar, FaSignOutAlt } from "react-icons/fa";
import DecryptedText from "./effectcomponents/DecryptedText";
import { useUserStore } from "../store/userStore";
import { Link, useNavigate } from "react-router";

export const MenuRight = ({ name, email, profileImage }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const navigate = useNavigate();
  const { logout } = useUserStore();
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <motion.nav className="fixed right-5 top-[20px] z-50 font-semibold sm:bg-card sm:shadow-lg sm:rounded-full sm:p-4 sm:py-1 sm:px-4">
      <motion.div
        className="flex flex-row items-center gap-4 transform-gpu"
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <div className="hidden sm:block">
          <GradientText
            colors={["#054A91", "#F17300", "#054A91", "#F17300", "#054A91"]}
            animationSpeed={3}
            showBorder={false}
            className="custom-class"
          >
            {name}
          </GradientText>
        </div>
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden border-2 border-primary cursor-pointer"
          >
            <img
              src={profileImage || "/avatarejemplo.jpg"}
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
                className="fixed right-0 mt-4 w-47 bg-card rounded-lg shadow-lg border border-muted/20 z-[100]"
              >
                <ul className="py-2">
                  <li className="border-b border-muted/20 mb-1 pb-2 flex flex-col items-center justify-center">
                    <span className="text-md">
                      <DecryptedText text="Pró-user" animateOn="view" />
                    </span>
                    <span className="text-[0.625rem] underline decoration-solid">
                      <DecryptedText text={email} animateOn="view" />
                    </span>
                  </li>
                  <li>
                    <Link to={"/auth/profile"}
                      className="flex items-center px-4 py-2 text-text hover:bg-muted/30 transition-colors duration-200 font-semibold cursor-pointer"
                    >
                      <FaUser className="mr-3" />
                      Perfil
                    </Link>
                  </li>
                  <li>
                    <Link to={"/categorias"}
                      className="flex items-center px-4 py-2 text-text hover:bg-muted/30 transition-colors duration-200 font-semibold cursor-pointer"
                    >
                      <FaGraduationCap className="mr-3" />
                      Flashcards
                    </Link>
                  </li>
                  <li>
                    <Link to={"/estadistica"}
                      className="flex items-center px-4 py-2 text-text hover:bg-muted/30 transition-colors duration-200 font-semibold cursor-pointer"
                    >
                      <FaStar className="mr-3" />
                      Estadísticas
                    </Link>
                  </li>
                  <li className="border-t border-muted/20 mt-2 pt-2 flex items-center justify-center">
                    <button
                      className="w-28 flex items-center justify-center text-white bg-accent py-2 px-4 rounded-lg hover:bg-secondary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
                      onClick={handleLogout}
                      type="submit"
                    >
                      <FaSignOutAlt className="mr-2" />
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

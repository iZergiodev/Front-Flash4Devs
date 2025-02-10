/* eslint-disable react/prop-types */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GradientText from "./effectcomponents/GradientText";
import { FaUser, FaGraduationCap, FaStar, FaSignOutAlt } from "react-icons/fa";
import DecryptedText from "./effectcomponents/DecryptedText";
import { useUserStore } from "../store/userStore";
import { useNavigate } from "react-router";

export const MenuRight = ({ name, email, profileImage }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const navigate = useNavigate()
  const { logout } = useUserStore();
  const handleLogout = () => {
    logout();

    navigate('/auth/home')

  };

  return (
    <>
      <nav className="fixed top-3 right-3 p-4 bg-card py-1 px-4 rounded-full backdrop-blur-md text-text shadow-lg z-50 font-semibold border-t border-muted/20">
        <div className="flex flex-row space-x-4 items-center gap-4">
          <GradientText
            colors={["#054A91", "#F17300", "#054A91", "#F17300", "#054A91"]}
            animationSpeed={3}
            showBorder={false}
            className="custom-class"
          >
            &quot;{name}&quot;
          </GradientText>
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary cursor-pointer"
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
                  className="absolute right-0 mt-4 w-60 bg-card rounded-lg shadow-lg backdrop-blur-md border border-muted/20"
                >
                  <ul className="py-2">
                    <li className="border-b border-muted/20 mb-1 pb-2 flex flex-col items-center justify-center">
                      <span className="text-base">
                        <DecryptedText text="Pró-user" animateOn="view" />
                      </span>
                      <span className="text-sm underline decoration-solid">
                        <DecryptedText text={email} animateOn="view" />
                      </span>
                    </li>
                    <li>
                      <a
                        href="/auth/profile"
                        className="flex items-center px-4 py-2 text-text hover:bg-muted/30 transition-colors duration-200 font-semibold cursor-pointer"
                      >
                        <FaUser className="mr-3" />
                        Perfil
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="flex items-center px-4 py-2 text-text hover:bg-muted/30 transition-colors duration-200 font-semibold cursor-pointer"
                      >
                        <FaGraduationCap className="mr-3" />
                        Flashcards
                      </a>
                    </li>
                    <li>
                      <a
                        href="/auth/estadistica"
                        className="flex items-center px-4 py-2 text-text hover:bg-muted/30 transition-colors duration-200 font-semibold cursor-pointer"
                      >
                        <FaStar className="mr-3" />
                        Estadisticas
                      </a>
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
        </div>
      </nav>
    </>
  );
};

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GradientText from "./effectcomponents/GradientText";
import { FaUser, FaGraduationCap, FaStar, FaSignOutAlt } from "react-icons/fa";
import DecryptedText from "./effectcomponents/DecryptedText";
import { useUserStore } from "../store/userStore";
import { Link, useNavigate } from "react-router";

export const MenuRight = ({ name, email, profileImage }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const { logout } = useUserStore();

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const menuItems = [
    {
      to: "/auth/profile",
      icon: FaUser,
      text: "Perfil",
    },
    {
      to: "/categorias",
      icon: FaGraduationCap,
      text: "Flashcards",
    },
    {
      to: "/estadistica",
      icon: FaStar,
      text: "Estadísticas",
    },
  ];

  return (
    <motion.nav className="fixed right-2 top-[15px] z-50 font-semibold sm:right-5 sm:top-[20px] sm:bg-card sm:shadow-lg sm:rounded-full sm:p-4 sm:py-1 sm:px-4 scale-110 sm:scale-100">
      <motion.div
        className="flex flex-row items-center gap-2 sm:gap-4 transform-gpu"
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
            className="w-7 h-7 sm:w-10 sm:h-10 rounded-full overflow-hidden border-2 border-primary cursor-pointer"
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
                className="fixed right-0 mt-3 w-44 sm:w-47 bg-card rounded-lg shadow-lg border border-muted/20 z-[100] max-w-[90vw]"
              >
                <ul className="py-2">
                  <li className="border-b border-muted/20 mb-1 pb-2 flex flex-col items-center justify-center px-5 mt-1">
                    <span className="text-sm sm:text-md">
                      <DecryptedText text="Pró-user" animateOn="view" />
                    </span>
                    <span className="text-[0.6rem] sm:text-[0.625rem] underline decoration-solid">
                      <DecryptedText text={email} animateOn="view" />
                    </span>
                  </li>

                  {menuItems.map((item, index) => (
                    <li key={index}>
                      <Link
                        to={item.to}
                        className="flex items-center px-3 py-2 text-text hover:bg-muted/30 transition-colors duration-200 font-semibold cursor-pointer text-sm sm:text-base"
                      >
                        <item.icon className="mr-2 sm:mr-3" />
                        {item.text}
                      </Link>
                    </li>
                  ))}

                  <li className="border-t border-muted/20 mt-2 pt-2 flex items-center justify-center">
                    <button
                      className="w-24 sm:w-28 flex items-center justify-center text-white bg-accent py-1 sm:py-2 px-3 sm:px-4 rounded-lg hover:bg-secondary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer text-sm sm:text-base"
                      onClick={handleLogout}
                      type="submit"
                    >
                      <FaSignOutAlt className="mr-1 sm:mr-2" />
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
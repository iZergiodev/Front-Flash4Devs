import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router";
import {
  FaChartLine,
  FaBook,
  FaUsers,
  FaBars,
  FaTimes,
  FaProjectDiagram,
  FaMap,
} from "react-icons/fa";
import { FaUsersViewfinder } from "react-icons/fa6";
import { MdOutlineBookOnline } from "react-icons/md";
import { GiProgression } from "react-icons/gi";
import { useUserStore } from "../store/userStore";
import { useEffect } from "react";

export const SideBar = ({ isOpen, setIsOpen }) => {
  const { isLogged } = useUserStore();

  const toggleSidebar = () => setIsOpen(!isOpen);

  const sidebarLinks = [
    {
      to: "/biblioteca",
      icon: FaBook,
      text: "Documentación",
    },
    {
      href: "https://www.atlassian.com/es/agile",
      icon: FaProjectDiagram,
      text: "Metodología Agile",
      external: true,
    },
    {
      href: "https://roadmap.sh/full-stack",
      icon: FaMap,
      text: "Roadmap Full Stack",
      external: true,
    },
  ];

  const statistics = [
    {
      icon: MdOutlineBookOnline,
      text: "Flashcards Estudiados: 1.2k",
    },
    {
      icon: FaUsersViewfinder,
      text: "Usuarios activos: 500+",
    },
    {
      icon: GiProgression,
      text: "Progreso promedio: 85%",
    },
  ];

  return (
    <>
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-2 p-2 bg-card dark:bg-[#919191] rounded-lg z-50 md:hidden"
      >
        {isOpen ? (
          <FaTimes className="text-text" />
        ) : (
          <FaBars className="text-text" />
        )}
      </button>

      <AnimatePresence>
        {(isOpen || window.innerWidth >= 768) && (
          <motion.div
            className="fixed left-0 top-0 h-screen w-60 bg-card dark:bg-[#919191] shadow-lg flex flex-col items-center p-4 z-40 pt-0 rounded-r-2xl [filter:drop-shadow(10px_0_15px_rgba(0,0,0,0.1))] md:static md:h-full md:shadow-none md:rounded-none md:[filter:none]"
            initial={{
              x: window.innerWidth < 768 ? -100 : 0,
              opacity: window.innerWidth < 768 ? 0 : 1,
            }}
            animate={{ x: 0, opacity: 1 }}
            exit={{
              x: window.innerWidth < 768 ? -100 : 0,
              opacity: window.innerWidth < 768 ? 0 : 1,
            }}
            transition={{ duration: 0.3 }}
          >
            <motion.img
              src="/Logo.png"
              alt="Logo"
              className="w-50 h-50 rounded-full mb-2"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            />

            <div className="space-y-2 border-t border-gray-400 dark:border-t dark:border-black p-2">
              {sidebarLinks.map((link, index) =>
                link.external ? (
                  <a
                    key={index}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center p-2 text-text dark:text-black hover:bg-secondary dark:hover:bg-[#5d6368] transition-colors hover:text-white duration-200 focus:outline-none focus:ring-2 focus:ring-primary rounded-lg"
                  >
                    <motion.div
                      className="flex"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <link.icon className="mr-2 text-accent" />
                      <p className="text-sm">{link.text}</p>
                    </motion.div>
                  </a>
                ) : (
                  <Link
                    key={index}
                    to={link.to}
                    className="flex items-center p-2 text-text dark:text-black  hover:bg-secondary dark:hover:bg-[#5d6368] transition-colors hover:text-white duration-200 focus:outline-none focus:ring-2 focus:ring-primary rounded-lg"
                  >
                    <motion.div
                      className="flex"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <link.icon className="mr-2 text-accent" />
                      <p className="text-sm">{link.text}</p>
                    </motion.div>
                  </Link>
                )
              )}
            </div>

            <div className="space-y-2 border-t border-gray-400 dark:border-t dark:border-black p-2 flex flex-col items-center">
              <h3 className="flex items-center p-1 text-text dark:text-black font-bold">
                <FaChartLine className="mr-2" />
                Estadística
              </h3>

              {statistics.map((stat, index) => (
                <p
                  key={index}
                  className="p-2 text-text dark:text-black  flex items-center text-sm"
                >
                  <stat.icon className="mr-2 text-2xl text-accent" />
                  {stat.text}
                </p>
              ))}
            </div>

            <div className="space-y-2 border-t border-gray-400 dark:border-t dark:border-black p-2 flex flex-col items-center">
              <FaUsers className="text-4xl text-accent mx-auto mb-4 mt-4 animate-bounce" />
              <h2 className="text-md font-bold text-primary dark:text-black  mb-2">
                1000+ Usuarios
              </h2>
              <p className="text-md text-center mt-2 text-muted dark:text-black ">
                ¡Ya han mejorado sus habilidades con nuestras flashcards!
              </p>
              <div className="my-3"></div>

              {!isLogged && (
                <Link
                  to="/auth/register"
                  className="w-35 flex items-center justify-center text-white bg-accent py-2 px-4 rounded-full shadow-lg hover:bg-secondary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer pointer-events-auto font-semibold text-md"
                >
                  Registrate
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
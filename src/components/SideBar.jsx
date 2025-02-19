import { useState, useEffect } from "react"; // Adicione o useEffect
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router";
import { FaRocket, FaChartLine, FaBook } from "react-icons/fa";
import { FaUsersViewfinder } from "react-icons/fa6";
import { MdOutlineBookOnline } from "react-icons/md";
import { GiProgression } from "react-icons/gi";
import { FaUsers, FaBars, FaTimes } from "react-icons/fa";
import { useUserStore } from "../store/userStore";

export const SideBar = () => {
  const { isLogged } = useUserStore();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);


  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };


  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };


    window.addEventListener("resize", handleResize);


    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 p-2 bg-card rounded-lg z-30 md:hidden"
      >
        {isSidebarOpen ? (
          <FaTimes className="text-text" />
        ) : (
          <FaBars className="text-text" />
        )}
      </button>

      <AnimatePresence>
        {(isSidebarOpen || window.innerWidth >= 768) && (
          <motion.div
            className="fixed left-0 top-0 h-screen w-60 bg-card shadow-lg flex flex-col items-center p-4 z-40 pt-0 rounded-r-2xl [filter:drop-shadow(10px_0_15px_rgba(0,0,0,0.1))]"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.img
              src="/Logo.png"
              alt="Logo"
              className="w-50 h-50 rounded-full mb-2"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            />

            <div className="my-1"></div>

            <div className="space-y-2 border-t border-gray-400 p-2">
              <Link
                to="/quick-link-1"
                className="flex items-center p-2 text-text hover:bg-secondary transition-colors hover:text-white duration-200 focus:outline-none focus:ring-2 focus:ring-primary rounded-lg"
              >
                <motion.a
                  className="flex"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaRocket className="mr-2 text-accent hover:text-white" />
                  <p className="text-sm">Link Rápido 1</p>
                </motion.a>
              </Link>

              <Link
                to="/quick-link-2"
                className="flex items-center p-2 text-text hover:bg-secondary transition-colors hover:text-white duration-200 focus:outline-none focus:ring-2 focus:ring-primary rounded-lg"
              >
                <motion.a
                  className="flex"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaRocket className="mr-2 text-accent" />
                  <p className="text-sm">Link Rápido 2</p>
                </motion.a>
              </Link>

              <Link
                to="/quick-link-3"
                className="flex items-center p-2 text-text hover:bg-secondary transition-colors hover:text-white duration-200 focus:outline-none focus:ring-2 focus:ring-primary rounded-lg"
              >
                <motion.a
                  className="flex"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaRocket className="mr-2 text-accent" />
                  <p className="text-sm">Link Rápido 3</p>
                </motion.a>
              </Link>
            </div>

            <div className="my-1"></div>

            <div className="space-y-2 border-t border-gray-400 p-2 flex flex-col items-center">
              <h3 className="flex items-center p-1 text-text font-bold">
                <FaChartLine className="mr-2" />
                Estadística
              </h3>

              <p className="p-2 text-text flex items-center text-sm">
                <MdOutlineBookOnline className="mr-2 text-2xl text-accent" />
                Flashcards Estudiados: 1.2k
              </p>

              <p className="p-2 text-text flex items-center text-sm">
                <FaUsersViewfinder className="mr-2 text-2xl text-accent" />{" "}
                Usuarios activos: 500+
              </p>

              <p className="p-2 text-text flex items-center text-sm">
                <GiProgression className="mr-2 text-2xl text-accent" /> Progreso
                promedio: 85%
              </p>
            </div>

            <div className="my-1"></div>

            <div className="space-y-2 border-t border-gray-400 p-2 flex flex-col items-center">
              <FaUsers className="text-4xl text-accent mx-auto mb-4 mt-4 animate-bounce" />
              <h2 className="text-md font-bold text-primary mb-2">
                1000+ Usuarios
              </h2>
              <p className="text-md text-center mt-2 text-muted">
                ¡Ya han mejorado sus habilidades con nuestras flashcards!
              </p>
              <div className="my-3"></div>

              {isLogged ? (
                ""
              ) : (
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

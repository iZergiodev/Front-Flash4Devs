import { motion } from "framer-motion";
import { Link } from "react-router";
import { FaRocket, FaChartLine, FaBook } from "react-icons/fa";
import { FaUsersViewfinder } from "react-icons/fa6";
import { MdOutlineBookOnline } from "react-icons/md";
import { GiProgression } from "react-icons/gi";
import {
  TbCircleNumber1Filled,
  TbCircleNumber2Filled,
  TbCircleNumber3Filled,
} from "react-icons/tb";

export const SideBar = () => {
  return (
    <motion.div
      className="fixed left-0 top-0 h-screen w-60 bg-card shadow-lg flex flex-col items-center p-4 z-20 pt-0"
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.img
        src="/Logo.png"
        alt="Logo"
        className="w-50 h-50 rounded-full mb-2"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      />

      <h3 className="text-md font-bold text-text mb-4">
        ¡Bienvenido, Usuario!
      </h3>

      <div className=" my-1"></div>

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

      <div className=" my-1"></div>

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
          <FaUsersViewfinder className="mr-2 text-2xl text-accent" /> Usuarios
          activos: 500+
        </p>

        <p className="p-2 text-text flex items-center text-sm">
          <GiProgression className="mr-2 text-2xl text-accent" /> Progreso
          promedio: 85%
        </p>
      </div>

      <div className=" my-1"></div>

      <div className="space-y-2 border-t border-gray-400 p-2 flex flex-col items-center">
        <h3 className="flex items-center p-1 text-text font-semibold">
          <FaBook className="mr-2" />
          Tutorial
        </h3>
        <p className="p-2 text-text flex items-center text-sm">
          <TbCircleNumber1Filled className="mr-2 text-2xl text-accent" />
          Elija una categoría
        </p>
        <p className="p-2 text-text flex items-center text-sm">
          <TbCircleNumber2Filled className="mr-2 text-2xl text-accent" />
          Estudia las Flashcards
        </p>
        <p className="p-2 text-text flex items-center text-sm">
          <TbCircleNumber3Filled className="mr-2 text-3xl text-accent" />
          Seguimiento de su progreso
        </p>
      </div>
    </motion.div>
  );
};

import { Link } from "react-router";
import { FaList, FaUsers } from "react-icons/fa";

export const ButtonAdmin = () => {
  return (
    <>
      <Link
        to="admin-users"
        className="flex items-center justify-center fixed bottom-5 left-4 w-16 text-[0.7rem] md:w-22 md:text-base md:top-7 md:left-auto md:right-98 md:bottom-auto z-20 bg-accent p-2 rounded-lg shadow-lg text-white hover:bg-secondary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary"
      >
        <FaUsers className="text-[0.7rem] md:text-base mr-1 md:mr-2" />
        Users
      </Link>
      <Link
        to="admin-flashcards"
        className="flex items-center justify-center fixed bottom-15 left-4 w-16 text-[0.7rem] md:w-26 md:text-base md:top-7 md:left-auto md:right-68 md:bottom-auto z-20 bg-accent p-2 rounded-lg shadow-lg text-white hover:bg-secondary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary"
      >
        <FaList className="text-[0.6rem] md:text-sm mr-1 md:mr-2" />
        Flash
      </Link>
    </>
  );
};

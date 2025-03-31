import { Link } from "react-router";

import { FaList, FaUsers } from "react-icons/fa";


export const ButtonAdmin = () => {
  return (
    <>
      <Link
        to="admin-users"
        className="flex items-center justify-center fixed bottom-4 right-4 md:top-7 md:right-100 md:bottom-auto z-20 bg-accent p-2 rounded-lg shadow-lg text-white hover:bg-secondary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary"
      >
        <FaUsers className="mr-2" />
        Users
      </Link>
      <Link
        to="admin-flashcards"
        className="flex items-center justify-center fixed bottom-4 right-4 md:top-7 md:right-63 md:bottom-auto z-20 bg-accent p-2 rounded-lg shadow-lg text-white hover:bg-secondary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary"
      >
        <FaList className="mr-2" />
        FlashCards
      </Link>
    </>
  );
}

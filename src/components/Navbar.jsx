import { Link } from "react-router";
import { useUserStore } from "../store/userStore";
import { FaHome, FaList, FaUsers } from "react-icons/fa";

const listItems = [
  {
    name: "Home",
    path: "/",
    icon: <FaHome className="text-accent" />,
  },
  {
    name: "Categorias",
    path: "/categorias",
    icon: <FaList className="text-accent" />,
  },
  {
    name: "AboutUs",
    path: "/auth/about-us",
    icon: <FaUsers className="text-accent " />,
  },
];

export const Navbar = () => {
  const { isLogged } = useUserStore();
  return (
    <>
      <div className="fixed bg-card dark:bg-[#919191] flex justify-center items-center gap-4 md:gap-6 py-3 md:py-5 px-4 md:px-8 left-1/2 translate-x-[-50%] top-[10px] md:top-[20px] rounded-full backdrop-blur-md text-text dark:text-black shadow-lg z-40 font-semibold w-[80%] sm:w-[70%] md:w-auto">
        <ul className="flex items-center gap-4 md:gap-7 font-bold">
          {listItems.map((item) => (
            <li
              className="relative group cursor-pointer text-sm md:text-md"
              key={item.name}
            >
              <Link to={item.path} className="flex items-center gap-1 md:gap-2">
                <span className="text-lg md:text-xl">{item.icon}</span>
                {item.name}
                <span className="absolute left-0 bottom-[-5px] w-0 h-1 rounded-xl bg-gradient-to-r from-card to-muted dark:bg-gradient-to-r dark:from-[#BDC1C6] dark:to-[#5F6368] transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>
          ))}
        </ul>
        {!isLogged ? (
          <Link
            to="/auth/login"
            className="py-1 px-4 md:px-6 rounded-3xl shadow-2xl text-white text-sm md:text-md bg-accent text-center hover:bg-secondary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary"
          >
            Login
          </Link>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

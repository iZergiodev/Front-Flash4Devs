import { Link } from "react-router";
import { useUserStore } from "../store/userStore";
import { FaHome, FaList, FaUsers } from 'react-icons/fa'

const listItems = [
  { name: "Home", path: "/", icon: <FaHome size={20} color="#f17300" /> },
  {
    name: "Categorias",
    path: "/categorias",
    icon: <FaList size={18} color="#f17300" />,
  },
  {
    name: "AboutUs",
    path: "/auth/about-us",
    icon: <FaUsers size={20} color="#f17300" />,
  },
];

export const Navbar = () => {
  const { isLogged } = useUserStore();
  return (
    <>
      <div className="fixed bg-card flex justify-between items-center gap-6 py-5 px-8 left-1/2 translate-x-[-50%] top-[20px] rounded-full backdrop-blur-md text-text shadow-lg z-10 font-semibold">
        <ul className="flex items-center gap-7 font-bold">
          
          {listItems.map((item) => (
            <li className="relative group cursor-pointer text-md" key={item.name}>
              <Link to={item.path} className='flex items-center gap-2'>
                {item.icon}
                {item.name}
                <span className="absolute left-0 bottom-[-5px] w-0 h-1 rounded-xl bg-gradient-to-r from-card to-muted transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>
          ))}
        </ul>
        {!isLogged ? (
          <Link
            to="/auth/login"
            className=" py-1 px-6 rounded-3xl shadow-2xl text-white text-md bg-accent text-center  hover:bg-secondary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary"
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

import { FaGithubSquare, FaInstagram } from "react-icons/fa";
import GradientText from "./effectcomponents/GradientText";

export function Footer() {
  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-[300px] sm:w-[380px] h-[50px] sm:h-[60px] bg-card text-text flex justify-center items-center z-40 rounded-full shadow-lg text-sm sm:text-base">
      <ul className="flex justify-center gap-1 list-none mr-2 sm:mr-4">
        <li className="mx-1 sm:mx-2">
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text no-underline hover:text-accent"
          >
            <FaGithubSquare className="text-base sm:text-lg cursor-pointer" />
          </a>
        </li>
        <li className="mx-1 sm:mx-2">
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text no-underline hover:text-accent"
          >
            <FaInstagram className="text-base sm:text-lg cursor-pointer" />
          </a>
        </li>
      </ul>
      <p className="mt-0 sm:mt-1 ml-2 sm:ml-3">
        <GradientText
          colors={["#054A91", "#F17300", "#054A91", "#F17300", "#054A91"]}
          animationSpeed={3}
          showBorder={false}
          className="custom-class"
        >
          Flash4Devs
        </GradientText>
      </p>
      <span className="mr-1 sm:mr-2"></span>
      &copy; 2025
    </div>
  );
}

import { FaGithubSquare, FaInstagram } from "react-icons/fa";
import GradientText from "./effectcomponents/GradientText";

export function Footer() {
  const socialLinks = [
    {
      icon: FaGithubSquare,
      href: "#",
    },
    {
      icon: FaInstagram,
      href: "#",
    },
  ];

  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-[300px] sm:w-[380px] h-[50px] sm:h-[60px] bg-card dark:bg-[#919191]  text-text dark:text-[#202124] flex justify-center items-center z-40 rounded-full shadow-lg text-sm sm:text-base mb-5 scale-90">
      <ul className="flex justify-center gap-1 list-none mr-2 sm:mr-4">
        {socialLinks.map(({ icon: Icon, href }, index) => (
          <li key={index} className="mx-1 sm:mx-2">
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text dark:text-black no-underline hover:text-accent dark:hover:text-accent"
            >
              <Icon className="text-base sm:text-lg cursor-pointer" />
            </a>
          </li>
        ))}
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
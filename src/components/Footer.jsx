import { FaGithubSquare, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";

export function Footer() {
  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[60px] bg-card text-text flex justify-center items-center z-40 rounded-full shadow-lg">
      <ul className="flex justify-center list-none">
        <li className="mx-2">
          <a
            href="https://github.com/YagoCastelao"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text no-underline hover:text-[#ffbb33]"
          >
            <FaGithubSquare className="text-lg cursor-pointer" />
          </a>
        </li>
        <li className="mx-2">
          <a
            href="https://www.instagram.com/yagocastelao/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text no-underline hover:text-[#ffbb33]"
          >
            <FaInstagram className="text-lg cursor-pointer" />
          </a>
        </li>
        <li className="mx-2">
          <a
            href="https://www.linkedin.com/in/yagocimacastelao/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text no-underline hover:text-[#ffbb33]"
          >
            <FaLinkedin className="text-lg cursor-pointer" />
          </a>
        </li>
        <li className="mx-2">
          <a
            href="https://x.com/yagocastelau"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text no-underline hover:text-[#ffbb33]"
          >
            <FaSquareXTwitter className="text-lg cursor-pointer" />
          </a>
        </li>
      </ul>
    </div>
  );
}
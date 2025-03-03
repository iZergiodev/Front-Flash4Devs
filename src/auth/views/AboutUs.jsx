import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { PiAlienDuotone } from "react-icons/pi";
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import GradientText from "../../components/effectcomponents/GradientText";
import Squares from "../../components/effectcomponents/Squares";

export const AboutUs = () => {
  const teamMembers = [
    {
      name: "Yago Cima Castelao",
      nickname: "CodePanthom",
      description:
        "Control absoluto de los datos digitales, capaz de reescribir códigos y sistemas en tiempo real!",
      image: "/yagop.jpg",
      socialLinks: {
        github: "https://github.com/YagoCastelao",
        linkedin: "https://linkedin.com/in/yagocimacastelao/",
        twitter: "https://twitter.com/yagocastelau",
        portfolio:
          "https://portfolioyago-hcbeaa4kx-yago-cima-castelaos-projects.vercel.app/",
      },
    },
    {
      name: "Sergio Carretero Molina",
      nickname: "CaffeinMaster",
      description:
        "Capaz de bajar y subir mis niveles de cafeina según mi antojo!",
      image: "/sergio.jpeg",
      socialLinks: {
        github: "https://github.com/iZergiodev",
        linkedin: "https://linkedin.com/in/izergiodev/",
        twitter: "https://twitter.com/yagocastelau",
        portfolio: "https://www.zergio.dev/",
      },
    },
  ];

  const renderTeamMember = (member) => (
    <motion.div
      key={member.name}
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="bg-card p-6 rounded-lg shadow-xl flex flex-col items-center w-full sm:w-120 pointer-events-auto"
    >
      <img
        src={member.image}
        alt={member.name}
        className="w-110 h-110 rounded mb-4 shadow-xl"
      />
      <h2 className="text-xl font-extrabold text-center text-primary">
        {member.name}{" "}
        <span className="text-text font-semibold italic">
          <GradientText
            colors={["#054A91", "#F17300", "#054A91", "#F17300", "#054A91"]}
            animationSpeed={3}
            showBorder={false}
            className="custom-class"
          >
            &quot;{member.nickname}&quot;
          </GradientText>
        </span>
      </h2>
      <p className="text-center mt-2">{member.description}</p>
      <div className="flex justify-center gap-6 mt-4">
        <a
          href={member.socialLinks.github}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub
            className="text-accent hover:text-primary transition-colors duration-300"
            size={24}
          />
        </a>
        <a
          href={member.socialLinks.linkedin}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedin
            className="text-accent hover:text-primary transition-colors duration-300"
            size={24}
          />
        </a>
        <a
          href={member.socialLinks.twitter}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaTwitter
            className="text-accent hover:text-primary transition-colors duration-300"
            size={24}
          />
        </a>
        <a
          href={member.socialLinks.portfolio}
          target="_blank"
          rel="noopener noreferrer"
        >
          <PiAlienDuotone
            className="text-accent hover:text-primary transition-colors duration-300"
            size={24}
          />
        </a>
      </div>
    </motion.div>
  );

  return (
    <>
      <Navbar />
      <div className="relative min-h-screen">
        <div className="absolute inset-0 z-0">
          <Squares
            speed={0.1}
            squareSize={40}
            direction="diagonal"
            borderColor="rgba(241, 115, 0, 0.2)"
            hoverFillColor="#81A4CD"
          />
        </div>
        <div className="relative z-20">
          <Navbar />
          <Footer />
        </div>
        <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4 pointer-events-none">
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl font-bold text-primary mb-8 pointer-events-auto"
          >
          </motion.h1>
          <div className="flex flex-col sm:py-0 py-10 sm:flex-row gap-24 last:pb-20">
            {teamMembers.map((member) => renderTeamMember(member))}
          </div>
        </div>
      </div>
    </>
  );
};

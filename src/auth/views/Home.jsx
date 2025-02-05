import Squares from "../../components/Squares";
import { Navbar } from "../../components/Navbar";
import AnimatedContent from "../../components/AnimatedContent";

export const Home = () => {
  return (
    <>
      <div className="relative w-full h-screen overflow-hidden">
        <AnimatedContent
          distance={150}
          direction="vertical"
          reverse={false}
          config={{ tension: 80, friction: 20 }}
          initialOpacity={0.2}
          animateOpacity
          scale={0.1}
          threshold={0.2}
        >
          <Navbar />
        </AnimatedContent>
        <Squares
          speed={0.5}
          squareSize={40}
          direction="diagonal"
          borderColor="#F17300"
          hoverFillColor="#81A4CD"
        />
        <div className="absolute inset-20 z-10 flex flex-col items-center justify-center rounded-lg text-text">
          <h1 className="text-5xl font-bold bg-card/80 p-4 rounded-lg">
            Bienvenido a Home!
          </h1>
          <p className="text-2xl mt-4 bg-card/80 p-4 rounded-lg">
            Esta página está en construcción, ¡nos vemos pronto!
          </p>
        </div>
      </div>
    </>
  );
};

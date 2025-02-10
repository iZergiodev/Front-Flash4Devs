import Squares from "../../components/effectcomponents/Squares"
import { Navbar } from "../../components/Navbar"
import { MenuRight } from "../../components/MenuRight";
import AnimatedContent from "../../components/effectcomponents/AnimatedContent";

export const Estatisticas = () => {
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
        borderColor="rgba(241, 115, 0, 0.4)"
        hoverFillColor="#81A4CD"
      />
    </div>
    <div>
        
    </div>
    </>
  );
}

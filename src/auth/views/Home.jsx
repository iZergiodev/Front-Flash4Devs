import Squares from "../../components/Squares";
import { Navbar } from "../../components/Navbar";
import { MenuRight } from "../../components/MenuRight";
import AnimatedContent from "../../components/AnimatedContent";
import { useUserStore } from "../../store/userStore";

export const Home = () => {

  const { isLogged } = useUserStore();


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
          <MenuRight />
        </AnimatedContent>
        <Squares
          speed={0.5}
          squareSize={40}
          direction="diagonal"
          borderColor="#F17300"
          hoverFillColor="#81A4CD"
        />
        <div className="absolute inset-30 z-10 flex flex-col items-center justify-center">
          <div className="grid grid-cols-2 gap-8 w-full max-w-4xl">
            <div className="bg-card p-10 rounded-[75px] shadow-lg">
              <h2 className="text-2xl font-bold mb-4 text-center">
                Simulacion de Entrevista
              </h2>
              <p className="text-lg">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut
                voluptatem sunt saepe dignissimos inventore veritatis
                consectetur officiis laborum recusandae optio assumenda,
                temporibus in ad. Illo illum velit quisquam vero molestias!
              </p>
            </div>
            <div className="bg-card p-10 rounded-[75px] shadow-lg text-center">
              <h2 className="text-2xl font-bold mb-4">Practica</h2>
              <p className="text-lg text-center">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut
                voluptatem sunt saepe dignissimos inventore veritatis
                consectetur officiis laborum recusandae optio assumenda,
                temporibus in ad. Illo illum velit quisquam vero molestias!
              </p>
            </div>
            <div className="bg-card p-10 rounded-[75px] shadow-lg text-center">
              <h2 className="text-2xl font-bold mb-4">
                Personal (Racha y Kyu)
              </h2>
              <p className="text-lg">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut
                voluptatem sunt saepe dignissimos inventore veritatis
                consectetur officiis laborum recusandae optio assumenda,
                temporibus in ad. Illo illum velit quisquam vero molestias!
              </p>
            </div>
            <div className="bg-card p-10 rounded-[75px] shadow-lg text-center">
              <h2 className="text-2xl font-bold mb-4">
                Personalizar tu FlashCards
              </h2>
              <p className="text-lg">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut
                voluptatem sunt saepe dignissimos inventore veritatis
                consectetur officiis laborum recusandae optio assumenda,
                temporibus in ad. Illo illum velit quisquam vero molestias!
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

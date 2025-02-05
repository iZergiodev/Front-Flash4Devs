import Squares from "../../components/Squares"
import { Navbar } from "../../components/Navbar";

export const Home = () => {
  return (
    <>
      <Navbar />
      <div className="relative w-full h-screen overflow-hidden">
        <Squares
          speed={0.5}
          squareSize={40}
          direction="diagonal" // up, down, left, right, diagonal
          borderColor="#F17300"
          hoverFillColor="#81A4CD"
        />
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center rounded-lg text-text">
          <h1 className="text-5xl font-bold bg-card/80 p-4 rounded-lg">
            Bien Venido a Home!
          </h1>
          <p className="text-2xl mt-4 bg-card/80 p-4 rounded-lg">
            Esta página está en construcción, ¡nos vemos pronto!
          </p>
        </div>
      </div>
    </>
  );
}

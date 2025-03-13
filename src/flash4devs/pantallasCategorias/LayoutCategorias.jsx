import Squares from "../../components/effectcomponents/Squares";
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import { MenuRight } from "../../components/MenuRight";
import useExtractInfo from "../../hooks/useExtractInfo";
import { CodingCategorias } from "./CodingCategorias";
import { ConceptCategorias } from "./ConceptCategorias";
import { EntrevistaCategorias } from "./EntrevistaCategorias";
import { CustomCategorias } from "./CustomCategorias";
import { Navigate, useLocation } from "react-router";

export const LayoutCategorias = () => {
  const { emailState, nameState, avatar } = useExtractInfo();

  const location = useLocation();

  const renderComponent = () => {
    switch (location.pathname) {
      case "/eligecategoria/coding":
        return <CodingCategorias />;
      case "/eligecategoria/concept":
        return <ConceptCategorias />;
      case "/eligecategoria/entrevista":
        return <EntrevistaCategorias />;
      case "/eligecategoria/custom":
        return <CustomCategorias />;
      default:
        return <Navigate to="/" />;
    }
  };



  return (
    <>
      <div className="relative w-full h-screen overflow-hidden z-10">
        <div className="absolute inset-0 -z-10 bg-white dark:bg-[#3C4043]">
          <Squares
            speed={0.1}
            squareSize={40}
            direction="diagonal"
            hoverFillColor="#81A4CD"
          />
        </div>
        <Navbar />
        <Footer />
        <MenuRight name={nameState} email={emailState} profileImage={avatar} />

        {renderComponent()}
      </div>
    </>
  );
};

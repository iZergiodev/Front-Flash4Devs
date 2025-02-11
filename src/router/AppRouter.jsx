import { Route, Routes } from "react-router";
import { AuthRouter } from "../auth/router/AuthRouter";
import { Home } from "../../Home";
import { Estadistica } from "../flash4devs/Estadistica";
import { Categorias } from "../flash4devs/Categorias";
import { ConceptCard } from "../flash4devs/ConceptCard";

import { ProtectedRoutes } from "../router/ProtectedRoutes.jsx";
import { CategoriasRouter } from "../flash4devs/pantallasCategorias/router/CategoriasRouter.jsx";
import { FlashcardsRouter } from "../flash4devs/flashcards/router/FlashcardsRouter.jsx";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth/*" element={<AuthRouter />} />
      <Route
        path="/estadistica"
        element={
          <ProtectedRoutes>
            <Estadistica />
          </ProtectedRoutes>
        }
      />
      <Route path="/categorias" element={<Categorias />} />
      <Route path="/conceptcard" element={<ConceptCard />} />
      <Route
        path="/eligecategoria/*"
        element={
          <ProtectedRoutes>
            <CategoriasRouter />
          </ProtectedRoutes>
        }
      />
      <Route
        path="/flashcards/*"
        element={
          <ProtectedRoutes>
            <FlashcardsRouter />
          </ProtectedRoutes>
        }
      />

      {/* <Route path="/*" element={<Navigate to={"/"} />} /> */}
      <Route />
    </Routes>
  );
};

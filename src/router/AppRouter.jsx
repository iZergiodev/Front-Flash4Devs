import { Route, Routes } from "react-router";
import { AuthRouter } from "../auth/router/AuthRouter";
import { Home } from "../../Home";
import { Estadistica } from "../flash4devs/Estadistica";
import { Categorias } from "../flash4devs/Categorias";
import { FormCustom } from "../flash4devs/FormCustom";
import { Biblioteca } from "../flash4devs/Biblioteca.jsx";
import { AdminPanel } from "../flash4devs/adminPanel/AdminPanel.jsx";

import { ProtectedRoutes } from "../router/ProtectedRoutes.jsx";
import { CategoriasRouter } from "../flash4devs/pantallasCategorias/router/CategoriasRouter.jsx";
import { FlashcardsRouter } from "../flash4devs/flashcards/router/FlashcardsRouter.jsx";
import { ConceptCard } from "../flash4devs/flashcards/concept-card/ConceptCard.jsx";
import { AdminFlashCards } from "../flash4devs/adminPanel/AdminFlashCards.jsx";
import { AdminRoutes } from "./AdminRoutes.jsx";

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
      <Route path="/customform" element={<FormCustom />} />
      <Route path="/biblioteca" element={<Biblioteca />} />
      <Route
        path="/admin-users"
        element={
          <AdminRoutes>
            <AdminPanel />
          </AdminRoutes>
        }
      />
      <Route
        path="/admin-flashcards"
        element={
          <AdminRoutes>
            <AdminFlashCards />
          </AdminRoutes>
        }
      />

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

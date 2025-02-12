import { Route, Routes } from "react-router";
import { ProtectedRoutes } from "../../../router/ProtectedRoutes.jsx";
import { LayoutCategorias } from "../LayoutCategorias.jsx";
import { ConceptCard } from "../../flashcards/concept-card/ConceptCard.jsx";
import { CodingCard } from "../../flashcards/coding-card/CodingCard.jsx";


export const CategoriasRouter = () => {
  return (
    <Routes>
      <Route
        path="/coding"
        element={
          <ProtectedRoutes>
            <LayoutCategorias />
          </ProtectedRoutes>
        }
      />

      <Route
        path="/concept"
        element={
          <ProtectedRoutes>
            <LayoutCategorias />
          </ProtectedRoutes>
        }
      />

      <Route
        path="/entrevista"
        element={
          <ProtectedRoutes>
            <LayoutCategorias />
          </ProtectedRoutes>
        }
      />

      <Route
        path="/custom"
        element={
          <ProtectedRoutes>
            <LayoutCategorias />
          </ProtectedRoutes>
        }
      />

      <Route
        path="/concept/:tech"
        element={
          <ProtectedRoutes>
            <ConceptCard />
          </ProtectedRoutes>
        }
      />

      <Route
        path="/coding/:tech"
        element={
          <ProtectedRoutes>
            <CodingCard />
          </ProtectedRoutes>
        }
      />
    </Routes>
  );
};

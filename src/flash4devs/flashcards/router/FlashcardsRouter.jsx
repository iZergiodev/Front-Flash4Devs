import { Route, Routes } from "react-router";
import { ProtectedRoutes } from "../../../router/ProtectedRoutes.jsx";
import { ConceptCard } from "../concept-card/ConceptCard.jsx";
import { CodingCard } from "../coding-card/CodingCard.jsx";
import { CustomCard } from "../custom-card/CustomCard.jsx";
import { EntrevistaCard } from "../entrevista-card/EntrevistaCard.jsx";

export const FlashcardsRouter = () => {
  return (
    <Routes>
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

      <Route
        path="/custom/:tech"
        element={
          <ProtectedRoutes>
            <CustomCard />
          </ProtectedRoutes>
        }
      />

      <Route
        path="/entrevista/:tech"
        element={
          <ProtectedRoutes>
            <EntrevistaCard />
          </ProtectedRoutes>
        }
      />
    </Routes>
  );
};

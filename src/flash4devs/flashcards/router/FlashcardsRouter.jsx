import { Route, Routes } from "react-router";
import { ProtectedRoutes } from "../../../router/ProtectedRoutes.jsx";
import { ConceptCard } from "../concept-card/ConceptCard.jsx";
import { CodingCard } from "../coding-card/CodingCard.jsx";



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
    </Routes>
  );
};

import { Route, Routes } from "react-router";
import { ProtectedRoutes } from "../../../router/ProtectedRoutes.jsx";
import { LayoutCategorias } from "../LayoutCategorias.jsx";

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
    </Routes>
  );
};

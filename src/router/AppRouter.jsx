import { Route, Routes } from "react-router";
import { AuthRouter } from "../auth/router/AuthRouter";
import { Home } from "../../Home";
import { Estadistica } from "../flash4devs/Estadistica";
import { Categorias } from "../flash4devs/Categorias";
import { ConceptCard } from "../flash4devs/ConceptCard";
import { CustomFlashCard } from "../flash4devs/CustomFlashCard";
import { ProtectedRoutes } from "../router/ProtectedRoutes.jsx";
import { CategoriasRouter } from "../flash4devs/pantallasCategorias/router/CategoriasRouter.jsx";

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
        path="/customflash"
        element={
          <ProtectedRoutes>
            <CustomFlashCard />
          </ProtectedRoutes>
        }
      />

      {/* <Route path="/*" element={<Navigate to={"/"} />} /> */}
      <Route />
    </Routes>
  );
};

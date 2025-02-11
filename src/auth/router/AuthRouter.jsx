import { Route, Routes } from "react-router";
import { Home } from "../views/Home.jsx";
import { Login } from "../views/Login.jsx";
import { Register } from "../views/Register.jsx";
import { Categorias } from "../views/Categorias.jsx";
import { Profile } from "../views/Profile.jsx";
import { AboutUs } from "../views/AboutUs.jsx";
import { Estadistica } from "../views/Estadistica.jsx";
import { PublicRoutes } from "../../router/PublicRoutes.jsx";
import { ProtectedRoutes } from "../../router/ProtectedRoutes.jsx";
import { ConceptCard } from "../../flash4devs/ConceptCard.jsx";

export const AuthRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route
        path="/login"
        element={
          <PublicRoutes>
            {" "}
            <Login />{" "}
          </PublicRoutes>
        }
      />
      <Route
        path="/register"
        element={
          <PublicRoutes>
            <Register />
          </PublicRoutes>
        }
      />

      <Route path="/about-us" element={<AboutUs />} />
      <Route path="/home" element={<Home />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/estadistica" element={<Estadistica />} />
      <Route path="/categorias" element={<Categorias />} />
      <Route path="/conceptcard" element={<ConceptCard />} />
    </Routes>
  );
};

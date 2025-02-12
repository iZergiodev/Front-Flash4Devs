import { Route, Routes } from "react-router";
import { Login } from "../views/Login.jsx";
import { Register } from "../views/Register.jsx";
import { Profile } from "../views/Profile.jsx";
import { AboutUs } from "../views/AboutUs.jsx";
import { PublicRoutes } from "../../router/PublicRoutes.jsx";


export const AuthRouter = () => {
  return (
    <Routes>

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
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
};

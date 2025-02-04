import { Route, Routes } from "react-router"
import { Home } from "../views/Home.jsx";
import { Login } from "../views/Login.jsx"
import { Register } from "../views/Register.jsx"
import { AboutUs } from "../views/AboutUs.jsx";

export const AuthRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/about-us" element={<AboutUs />} />
    </Routes>
  );
}

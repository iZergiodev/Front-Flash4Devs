import { Route, Routes } from "react-router"
import { Home } from "../views/Home.jsx";
import { Login } from "../views/Login.jsx"
import { Register } from "../views/Register.jsx"

export const AuthRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

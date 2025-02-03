import { Route, Routes } from "react-router"
import { Login } from "../views/Login.jsx"
import { Register } from "../views/Register.jsx"

export const AuthRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />

      <Route path="*" element={<Login />} />
    </Routes>
  );
}

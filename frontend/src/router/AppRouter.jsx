import { Navigate, Route, Routes } from "react-router";
import { AuthRouter } from "../auth/router/AuthRouter";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/auth/*" element={<AuthRouter />} />
      <Route path="/*" element={<Navigate to={'/auth/login'}/>}/>
      <Route />
    </Routes>
  );
};

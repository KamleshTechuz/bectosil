import { Routes, Route } from "react-router-dom";
import Login from "./login/login";
import Signup from "./signup/Signup";
import { NotFound } from "../../shared/components/not-found/Not-Found";

export const AuthRoutes = () => {
  return (
    <div>
      <Routes>
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/login" element={<Login />} />
        <Route path="*" exact={true} element={<NotFound />} />
      </Routes>
    </div>
  );
};

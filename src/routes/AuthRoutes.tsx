import { Route, Routes } from "react-router-dom";
import SignUpScreen from "../views/Authentication/SignUpScreen";
import LoginScreen from "../views/Authentication/LoginScreen";
export default function AuthRoutes() {
  return (
    <Routes>
      {/* <Route path="signup/:userId?/:email?" element={<SignUpScreen />} /> */}
      <Route path="signup/:userId?/:email?" element={<SignUpScreen />} />
      <Route path="/" element={<LoginScreen />} />
    </Routes>
  );
}

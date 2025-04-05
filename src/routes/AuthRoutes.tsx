import { Route, Routes } from "react-router-dom";
import SignUpScreen from "../views/Authentication/SignUpScreen";
export default function AuthRoutes() {
  return (
    <Routes>
      <Route path="signup/:userId?/:email?" element={<SignUpScreen />} />
    </Routes>
  );
}

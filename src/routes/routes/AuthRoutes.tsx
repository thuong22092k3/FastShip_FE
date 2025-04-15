import { Route, Routes } from "react-router-dom";
import SignUpScreen from "../../views/Authentication/SignUpScreen";
import LoginScreen from "../../views/Authentication/LoginScreen";
import ForgetPasswordscreen from "../../views/Authentication/ForgetPassword";
import Verifyscreen from "../../views/Authentication/Verify";
import ChangePasswordScreen from "../../views/Authentication/ChangePassword";
export default function AuthRoutes() {
  return (
    <Routes>
      {/* <Route path="signup/:userId?/:email?" element={<SignUpScreen />} /> */}
      <Route path="signup/:userId?/:email?" element={<SignUpScreen />} />
      <Route path="/" index element={<LoginScreen />} />
      <Route path="forgotpassword" element={<ForgetPasswordscreen />} />
      <Route path="verify" element={<Verifyscreen />} />
      <Route path="changepassword" element={<ChangePasswordScreen />} />
    </Routes>
  );
}

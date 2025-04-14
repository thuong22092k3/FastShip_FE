import { Routes, Route } from "react-router-dom";
import AuthRoutes from "./AuthRoutes";
// import { HomePage } from "../../views/Home/HomePage";
// import { VehicleManagement } from "../../views/Vehicle/VehicleManagement";
import { NAV_LINK } from "../components/NAV_LINK";
import HomeRoutes from "./HomeRoute";

export function RootRoutes() {
  return (
    <Routes>
      {/* <Route path="/*" element={<AuthRoutes />} />
      <Route path="/home" element={<MainLayout />}> */}
      <Route path={NAV_LINK.AUTH} element={<AuthRoutes />} />
      <Route path={NAV_LINK.HOME} element={<HomeRoutes />} />
    </Routes>
  );
}

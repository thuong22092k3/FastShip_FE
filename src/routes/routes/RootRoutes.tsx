import { Route, Routes } from "react-router-dom";
import AuthRoutes from "./AuthRoutes";
// import { HomePage } from "../../views/Home/HomePage";
// import { VehicleManagement } from "../../views/Vehicle/VehicleManagement";
import { useSelector } from "react-redux";
import { RootState } from "../../state_management/reducers/rootReducer";
import { NAV_LINK } from "../components/NAV_LINK";
import HomeRoutes from "./HomeRoute";

export function RootRoutes() {
  const isAuthenticated = useSelector(
    (state: RootState) => state.authSlice.isAuthenticated
  );
  return (
    <Routes>
      {/* <Route path="/*" element={<AuthRoutes />} />
      <Route path="/home" element={<MainLayout />}> */}
      <Route path={NAV_LINK.AUTH} element={<AuthRoutes />} />
      <Route path={NAV_LINK.HOME} element={<HomeRoutes />} />
    </Routes>
    // <Routes>
    //   <Route
    //     element={
    //       isAuthenticated ? (
    //         <Outlet />
    //       ) : (
    //         <AuthLayout>
    //           <Outlet />
    //         </AuthLayout>
    //       )
    //     }
    //   >
    //     {!isAuthenticated ? (
    //       <Route path="*" element={<AuthRoutes />} />
    //     ) : (
    //       <Route path="*" element={<HomeRoutes />} />
    //     )}
    //   </Route>
    // </Routes>
  );
}

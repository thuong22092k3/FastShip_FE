import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import AuthRoutes from "./AuthRoutes";
import { useEffect } from "react";

export default function RootRoutes() {
  //   const userId = useSelector((state: RootState) => state.manager.userId);
  //const userId = window.localStorage.getItem("USER_ID");

  return (
    <BrowserRouter>
      <Routes>
        {/* {!userId ? (
          <Route path={NAV_LINK.AUTH} element={<AuthRoutes />} />
        ) : (
          <Route path={NAV_LINK.HOME} element={<HomeRoutes />} />
        )} */}
        <Route element={<AuthRoutes />} />
        {/* <Route path={NAV_LINK.HOME} element={<HomeRoutes />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

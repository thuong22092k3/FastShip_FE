import { Route, Routes, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useMemo } from "react";
import { AppShell, Box, ScrollArea } from "@mantine/core";

import { RootState } from "../../state_management/reducers/rootReducer";
import Drawer from "../components/Drawer";
import CustomHeader from "../../components/Header/Header";

import EmployeeManagementScreen from "../../views/Employee/EmployeeManagement";
import OrderManagementScreen from "../../views/Order/OrderManagement";
import PartnerManagementScreen from "../../views/Partner/PartnerManagement";
import StatisticScreen from "../../views/Statistics/StatisticsScreen";
import VehicleManagementScreen from "../../views/Vehicle/VehicleManagement";

const ROUTES = [
  {
    path: "employee",
    element: <EmployeeManagementScreen />,
    name: "Employee Management",
  },
  {
    path: "order",
    element: <OrderManagementScreen />,
    name: "Order Management",
  },
  {
    path: "partner",
    element: <PartnerManagementScreen />,
    name: "Partner Management",
  },
  {
    path: "vehicle",
    element: <VehicleManagementScreen />,
    name: "Vehicle Management",
  },
  {
    path: "statistic",
    element: <StatisticScreen />,
    name: "Statistics",
  },
];

export default function HomeRoutes() {
  const { openDrawer } = useSelector((state: RootState) => state.controlSlice);
  const location = useLocation();

  const title = useMemo(
    () => ROUTES.find((r) => location.pathname.includes(r.path))?.name,
    [location]
  );

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Drawer />

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          height: "100vh",
        }}
      >
        <CustomHeader />

        <ScrollArea.Autosize
          mah="calc(100vh - 64px)"
          offsetScrollbars
          scrollbarSize={8}
          style={{ flex: 1 }}
        >
          <Box p={24}>
            {" "}
            <Routes>
              {ROUTES.map((route, i) => (
                <Route path={route.path} element={route.element} key={i} />
              ))}
            </Routes>
          </Box>
        </ScrollArea.Autosize>
      </div>
    </div>
  );
}

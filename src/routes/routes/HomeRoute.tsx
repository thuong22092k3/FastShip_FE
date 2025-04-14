import { Route, Routes, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useMemo } from "react";
import { AppShell, ScrollArea } from "@mantine/core";

import { RootState } from "../../state_management/reducers/rootReducer";
import Drawer from "../components/Drawer";
import CustomHeader from "../../components/Header/Header";

import EmployeeManagementScreen from "../../views/Employee/EmployeeManagement";
import OrderManagementScreen from "../../views/Order/OrderManagement";
import PartnerManagementScreen from "../../views/Partner/PartnerManagement";
import StatisticScreen from "../../views/Statistics/StatisticsScreen";
import VehicleManagementScreen from "../../views/Vehicle/VehicleManagement";

export default function HomeRoutes() {
  const { openDrawer } = useSelector((state: RootState) => state.controlSlice);

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

  const location = useLocation();
  const title = useMemo(
    () => ROUTES.find((r) => location.pathname.endsWith(r.path))?.name,
    [location]
  );

  return (
    <AppShell
      padding="md"
      navbar={{ width: 250, breakpoint: "sm", collapsed: { mobile: false } }}
      header={{ height: 60 }}
    >
      <AppShell.Navbar>
        <Drawer />
      </AppShell.Navbar>

      <AppShell.Header>
        <CustomHeader title={title} />
      </AppShell.Header>

      <AppShell.Main>
        <Routes>
          {ROUTES.map((route, i) => (
            <Route path={route.path} element={route.element} key={i} />
          ))}
        </Routes>
      </AppShell.Main>
    </AppShell>
  );
}

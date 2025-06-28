import { NavLink } from "@mantine/core";
import "@mantine/core/styles.css";
import {
  IconBrandOffice,
  IconChartBar,
  IconLayoutSidebarRightExpand,
  IconLogout,
  IconPackage,
  IconShoppingCart,
  IconUsers,
} from "@tabler/icons-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { COLORS } from "../../constants/colors";
import { RootState } from "../../state_management/reducers/rootReducer";
import { setDrawer } from "../../state_management/slices/controlSlice";
import { NAV_LINK } from "./NAV_LINK";

interface DrawerItem {
  label: string;
  icon: React.ReactNode;
  link: string;
  roles: ("Admin" | "TaiXe" | "NhanVien")[];
}

export default function Drawer() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const { currentUser, isAuthenticated } = useSelector(
    (state: RootState) => state.authSlice
  );

  const openDrawer = useSelector(
    (state: RootState) => state.controlSlice.openDrawer
  );

  useEffect(() => {
    if (!isAuthenticated) {
      navigate(NAV_LINK.LOGIN);
    }
  }, [isAuthenticated, navigate]);

  const handleClick = (link: string) => {
    if (link === "SignOut") {
      dispatch({ type: "RESET_ALL_STORES" });
      localStorage.removeItem("USER_ID");
      localStorage.removeItem("ROLE");
      navigate(NAV_LINK.LOGIN);
    } else {
      navigate(link);
      dispatch(setDrawer(true));
    }
  };

  const allItems: DrawerItem[] = [
    {
      label: "Đơn hàng",
      icon: <IconShoppingCart size={18} />,
      link: NAV_LINK.ORDER_MANAGEMENT,
      roles: ["Admin", "NhanVien", "TaiXe"],
    },
    {
      label: "Nhân viên",
      icon: <IconUsers size={18} />,
      link: NAV_LINK.EMPLOYEE_MANAGEMENT,
      roles: ["Admin"],
    },
    {
      label: "Đối tác",
      icon: <IconLayoutSidebarRightExpand size={18} />,
      link: NAV_LINK.PARTNER_MANAGEMENT,
      roles: ["Admin"],
    },
    {
      label: "Phương tiện",
      icon: <IconPackage size={18} />,
      link: NAV_LINK.VEHICLE_MANAGEMENT,
      roles: ["Admin", "NhanVien"],
    },
    {
      label: "Bưu cục",
      icon: <IconBrandOffice size={18} />,
      link: NAV_LINK.POST_OFFICE_MANAGEMENT,
      roles: ["Admin"],
    },
    {
      label: "Thống kê",
      icon: <IconChartBar size={18} />,
      link: NAV_LINK.STATISTICS,
      roles: ["Admin"],
    },
    {
      label: "Đăng xuất",
      icon: <IconLogout size={18} />,
      link: "SignOut",
      roles: ["Admin", "NhanVien", "TaiXe"],
    },
  ];

  const filteredItems = allItems.filter((item) =>
    item.roles.includes(currentUser?.role || "TaiXe")
  );

  return (
    <div
      style={{
        height: "100vh",
        minWidth: "250px",
        background: COLORS.mediumBlue,
        color: "white",
        display: "flex",
        flexDirection: "column",
        padding: "20px 15px",
        boxShadow: "4px 0 10px rgba(0,0,0,0.1)",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <img
          src={require("../../assets/images/Logorm.png")}
          alt="logo"
          style={{ height: 130, objectFit: "contain", borderRadius: 12 }}
        />
      </div>

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        {filteredItems.map((item) => {
          const isActive = location.pathname === item.link;

          return (
            <NavLink
              key={item.label}
              label={
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </div>
              }
              onClick={() => handleClick(item.link)}
              active={isActive}
              styles={{
                root: {
                  borderRadius: "10px",
                  padding: "10px 14px",
                  backgroundColor: isActive ? "#2563eb" : "transparent",
                  color: isActive ? "white" : "#e0e7ff",
                  fontWeight: 500,
                  cursor: "pointer",
                  transition: "all 0.2s ease-in-out",
                  "&:hover": {
                    backgroundColor: "#3b82f6",
                    color: "white",
                    transform: "scale(1.01)",
                  },
                },
                label: {
                  fontSize: "15px",
                },
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

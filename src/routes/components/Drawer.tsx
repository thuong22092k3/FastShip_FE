import { NavLink } from "@mantine/core";
import {
  IconShoppingCart,
  IconUsers,
  IconLayoutSidebarRightExpand,
  IconPackage,
  IconChartBar,
  IconLogout,
  IconBrandOffice,
} from "@tabler/icons-react";
import "@mantine/core/styles.css";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { NAV_LINK } from "./NAV_LINK";
import { COLORS } from "../../constants/colors";

interface DrawerItem {
  label: string;
  icon: React.ReactNode;
  link: string;
}

export default function Drawer() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const handleClick = (link: string) => {
    if (link === "SignOut") {
      dispatch({ type: "RESET_ALL_STORES" });
      localStorage.removeItem("USER_ID");
      localStorage.removeItem("ROLE");
      navigate(NAV_LINK.LOGIN);
    } else {
      navigate(link);
    }
  };

  const items: DrawerItem[] = [
    {
      label: "Đơn hàng",
      icon: <IconShoppingCart size={18} />,
      link: NAV_LINK.ORDER_MANAGEMENT,
    },
    {
      label: "Nhân viên",
      icon: <IconUsers size={18} />,
      link: NAV_LINK.EMPLOYEE_MANAGEMENT,
    },
    {
      label: "Đối tác",
      icon: <IconLayoutSidebarRightExpand size={18} />,
      link: NAV_LINK.PARTNER_MANAGEMENT,
    },
    {
      label: "Phương tiện",
      icon: <IconPackage size={18} />,
      link: NAV_LINK.VEHICLE_MANAGEMENT,
    },
    {
      label: "Bưu cục",
      icon: <IconBrandOffice size={18} />,
      link: NAV_LINK.POST_OFFICE_MANAGEMENT,
    },

    {
      label: "Thống kê",
      icon: <IconChartBar size={18} />,
      link: NAV_LINK.STATISTICS,
    },

    {
      label: "Đăng xuất",
      icon: <IconLogout size={18} />,
      link: "SignOut",
    },
  ];

  return (
    <div
      style={{
        height: "100vh",
        width: "250px",
        // background: "linear-gradient(160deg, #1e3a8a 0%, #1e40af 100%)",
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
        {items.map((item) => {
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

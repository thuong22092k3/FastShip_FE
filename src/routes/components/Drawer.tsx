// import { useNavigate, useLocation } from "react-router-dom";
// import { NAV_LINK } from "./NAV_LINK";
// import { useCallback, useState } from "react";
// import {
//   IconShoppingCart,
//   IconTruck,
//   IconUsers,
//   IconBox,
//   IconChartBar,
//   IconLayoutSidebarRightExpand,
//   IconChevronDown,
//   IconFileText,
//   IconGift,
//   IconUser,
//   IconLogout,
//   IconPackage,
//   IconProgress,
// } from "@tabler/icons-react";
// import { FaBarsProgress } from "react-icons/fa6";
// import { BiBox } from "react-icons/bi";
// import { MdOutlinePeople } from "react-icons/md";
// import { COLORS } from "../../constants/colors";
// import { useDispatch, useSelector } from "react-redux";
// import { RootState } from "../../state_management/reducers/rootReducer";
// import { Menu, Divider } from "@mantine/core";

// type DrawerItemProps = {
//   name?: string;
//   link?: string;
//   icon1?: React.ReactNode;
//   icon2?: React.ReactNode;
// };

// export type DrawerProps = DrawerItemProps & {
//   subDrawer?: DrawerItemProps[];
// };

// export default function Drawer() {
//   const navigate = useNavigate();
//   const [currentTab, setCurrentTab] = useState("/");
//   const { openDrawer } = useSelector((state: RootState) => state.controlSlice);
//   const dispatch = useDispatch();
//   const location = useLocation();
//   const Info = useSelector((state: RootState) => state.adminSlice);

//   const DRAWER_ITEM: DrawerProps[] = [
//     {
//       name: "Đơn hàng",
//       link: NAV_LINK.ORDER_MANAGEMENT,
//       icon1: <IconShoppingCart size={25} />,
//     },
//     {
//       name: "Nhân viên",
//       link: NAV_LINK.EMPLOYEE_MANAGEMENT,
//       icon1: <IconUsers size={25} />,
//     },
//     {
//       name: "Đối tác",
//       link: NAV_LINK.PARTNER_MANAGEMENT,
//       icon1: <IconLayoutSidebarRightExpand size={25} />,
//     },
//     {
//       name: "Phương tiện",
//       link: NAV_LINK.VEHICLE_MANAGEMENT,
//       icon1: <IconPackage size={25} />,
//     },
//     localStorage.getItem("ROLE") !== "Staff" && {
//       name: "Thống kê",
//       link: NAV_LINK.STATISTICS,
//       icon1: <IconChartBar size={25} />,
//     },
//     {
//       name: "Đăng xuất",
//       link: "SignOut",
//       icon1: <IconLogout size={25} />,
//     },
//   ].filter(Boolean) as DrawerProps[];

//   const chooseColor = useCallback(
//     (name: string, link: string) => {
//       return currentTab === name || currentTab === link
//         ? COLORS.mediumBlue
//         : COLORS.white;
//     },
//     [currentTab]
//   );

//   const handleMenuClick = (e: any) => {
//     if (e.key === "SignOut") {
//       dispatch({ type: "RESET_ALL_STORES" });
//       localStorage.removeItem("USER_ID");
//       localStorage.removeItem("ROLE");
//       navigate(NAV_LINK.LOGIN);
//     } else {
//       navigate(e.key);
//       setCurrentTab(e.key);
//     }
//   };

//   return (
//     <div className="h-full justify-center">
//       {/* Avatar */}
//       {/* <button
//         className="flex flex-row px-5 mt-5 items-center text-txt_white gap-2"
//         onClick={() => navigate(NAV_LINK.PROFILE)}
//       >
//         {Info.photoURL ? (
//           <img
//             src={Info.photoURL}
//             alt="User Photo"
//             style={{ width: "40px", height: "40px", borderRadius: "60px" }}
//           />
//         ) : (
//           <div className="flex w-10 h-10 bg-hover rounded-full items-center justify-center">
//             {Info.shopName?.charAt(0).toUpperCase()}
//           </div>
//         )}
//         {!openDrawer && (
//           <div className="text-white text-lg">{Info.shopName}</div>
//         )}
//       </button> */}

//       <Divider className="bg-slate-400" />

//       {/* <Menu
//         expandIcon={<BsCaretDownFill size={15} color="white" />}
//         theme="light"
//         mode="inline"
//         className="bg-sidebar text-white"
//         inlineCollapsed={openDrawer}
//         style={{ borderWidth: 0 }}
//         onClick={handleMenuClick}
//         items={DRAWER_ITEM.map((d) => ({
//           label: (
//             <span style={{ color: chooseColor(d.name || "", d.link || "") }}>
//               {d.name}
//             </span>
//           ),
//           key: d.link !== "" ? d.link : d.name,
//           icon: (
//             <p style={{ color: chooseColor(d.name || "", d.link || "") }}>
//               {d.icon1}
//             </p>
//           ),
//           children: d.subDrawer?.map((s) => ({
//             label: s.name,
//             key: s.link,
//             icon: s.icon1,
//           })),
//         }))}
//       /> */}
//       <Menu shadow="md" width={200}>
//         <Menu.Target>
//           <button>Menu</button>
//         </Menu.Target>

//         <Menu.Dropdown>
//           {DRAWER_ITEM.map((item) => (
//             <Menu.Item
//               key={item.name}
//               leftSection={item.icon1}
//               onClick={() => navigate(item.link || "#")}
//             >
//               {item.name}
//             </Menu.Item>
//           ))}
//         </Menu.Dropdown>
//       </Menu>
//     </div>
//   );
// }

import { NavLink } from "@mantine/core";
import {
  IconShoppingCart,
  IconUsers,
  IconLayoutSidebarRightExpand,
  IconPackage,
  IconChartBar,
  IconLogout,
} from "@tabler/icons-react";
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
    ...(localStorage.getItem("ROLE") !== "Staff"
      ? [
          {
            label: "Thống kê",
            icon: <IconChartBar size={18} />,
            link: NAV_LINK.STATISTICS,
          },
        ]
      : []),
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

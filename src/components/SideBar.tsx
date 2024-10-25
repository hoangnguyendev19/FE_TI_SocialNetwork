import {
  BarChartOutlined,
  CarOutlined,
  HomeOutlined,
  InfoCircleOutlined,
  LogoutOutlined,
  SettingOutlined,
  WalletOutlined,
} from "@ant-design/icons";
import { Menu, MenuProps } from "antd";
import { ROUTE } from "constants";
import { useLocation, useNavigate } from "react-router-dom";
import { removeToken } from "utils";

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  {
    key: "main",
    label: "Main Menu",
    type: "group",
    children: [
      {
        key: ROUTE.ROOT,
        label: "Home Page",
        icon: <HomeOutlined style={{ fontSize: "20px" }} />,
        style: { fontSize: "16px", padding: "20px" },
      },
      {
        key: ROUTE.NEWS,
        label: "News",
        icon: <CarOutlined style={{ fontSize: "20px" }} />,
        style: { fontSize: "16px", padding: "20px" },
      },
      {
        key: ROUTE.BOARDING_HOUSE,
        label: "Boarding House",
        icon: <BarChartOutlined style={{ fontSize: "20px" }} />,
        style: { fontSize: "16px", padding: "20px" },
      },
      {
        key: ROUTE.PROFILE,
        label: "Profile",
        icon: <WalletOutlined style={{ fontSize: "20px" }} />,
        style: { fontSize: "16px", padding: "20px" },
      },
    ],
  },
  {
    key: "Preferences",
    label: "Preferences",
    type: "group",
    children: [
      {
        key: ROUTE.SETTINGS,
        label: "Settings",
        icon: <SettingOutlined style={{ fontSize: "20px" }} />,
        style: { fontSize: "16px", padding: "20px" },
      },
      {
        key: "Help & Center",
        label: "Help & Center",
        icon: <InfoCircleOutlined style={{ fontSize: "20px" }} />,
        style: { fontSize: "16px", padding: "20px" },
      },
    ],
  },
  {
    key: ROUTE.LOGIN,
    label: "Logout",
    icon: <LogoutOutlined style={{ fontSize: "20px" }} />,
    style: {
      position: "absolute",
      bottom: 0,
      fontSize: "16px",
      padding: "20px",
    },
  },
];

export const SideBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const onClick: MenuProps["onClick"] = (e) => {
    if (e.key === ROUTE.LOGIN) {
      removeToken();
    }
    navigate(e.key);
  };

  return (
    <Menu
      onClick={onClick}
      style={{
        width: "100%",
        height: "100%",
      }}
      defaultSelectedKeys={[ROUTE.ROOT]}
      defaultOpenKeys={["main", "preferences"]}
      selectedKeys={[location.pathname.split("/")[1] || ROUTE.ROOT]}
      mode="inline"
      items={items}
    />
  );
};

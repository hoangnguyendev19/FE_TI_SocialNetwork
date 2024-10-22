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
import { useNavigate } from "react-router-dom";
import { removeToken } from "utils";

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  {
    key: "Main",
    label: "Main Menu",
    type: "group",
    children: [
      {
        key: "Home",
        label: "Home Page",
        icon: <HomeOutlined style={{ fontSize: "20px" }} />,
        style: { fontSize: "16px", padding: "20px" },
      },
      {
        key: "News",
        label: "News",
        icon: <CarOutlined style={{ fontSize: "20px" }} />,
        style: { fontSize: "16px", padding: "20px" },
      },
      {
        key: "Boarding House",
        label: "Boarding House",
        icon: <BarChartOutlined style={{ fontSize: "20px" }} />,
        style: { fontSize: "16px", padding: "20px" },
      },
      {
        key: "Profile",
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
        key: "Settings",
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
    key: "Logout",
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

  const onClick: MenuProps["onClick"] = (e) => {
    // console.log("click ", e);
    if (e.key === "Logout") {
      removeToken();
      navigate(ROUTE.LOGIN);
    }

    if (e.key === "Home") {
      navigate(ROUTE.ROOT);
    }

    if (e.key === "News") {
      navigate(ROUTE.NEWS);
    }

    if (e.key === "Boarding House") {
      navigate(ROUTE.BOARDING_HOUSE);
    }

    if (e.key === "Profile") {
      navigate(ROUTE.PROFILE);
    }
  };

  return (
    <Menu
      onClick={onClick}
      style={{
        width: "100%",
        height: "100%",
      }}
      defaultSelectedKeys={["Home"]}
      defaultOpenKeys={["Main"]}
      mode="inline"
      items={items}
    />
  );
};

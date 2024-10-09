import {
  BarChartOutlined,
  CalendarOutlined,
  CarOutlined,
  HomeOutlined,
  InfoCircleOutlined,
  LogoutOutlined,
  MessageOutlined,
  SettingOutlined,
  WalletOutlined,
} from "@ant-design/icons";
import { Menu, MenuProps } from "antd";

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
        key: "Car Rent",
        label: "Car Rent",
        icon: <CarOutlined style={{ fontSize: "20px" }} />,
        style: { fontSize: "16px", padding: "20px" },
      },
      {
        key: "Insight",
        label: "Insight",
        icon: <BarChartOutlined style={{ fontSize: "20px" }} />,
        style: { fontSize: "16px", padding: "20px" },
      },
      {
        key: "Reimburse",
        label: "Reimburse",
        icon: <WalletOutlined style={{ fontSize: "20px" }} />,
        style: { fontSize: "16px", padding: "20px" },
      },
      {
        key: "Message",
        label: "Message",
        icon: <MessageOutlined style={{ fontSize: "20px" }} />,
        style: { fontSize: "16px", padding: "20px" },
      },
      {
        key: "Calendar",
        label: "Calendar",
        icon: <CalendarOutlined style={{ fontSize: "20px" }} />,
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
  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
  };
  return (
    <Menu
      onClick={onClick}
      style={{
        width: "100%",
        height: "100%",
      }}
      defaultSelectedKeys={["1"]}
      defaultOpenKeys={["sub1"]}
      mode="inline"
      items={items}
    />
  );
};

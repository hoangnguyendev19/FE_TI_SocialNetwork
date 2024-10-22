import { Row, Tabs, TabsProps } from "antd";
import { Color } from "constants";
import { Profile, Security } from "./components";

const items: TabsProps["items"] = [
  {
    key: "profile",
    label: "Profile",
    children: <Profile />,
  },
  {
    key: "security",
    label: "Security",
    children: <Security />,
  },
];

export const SettingsPage: React.FC = () => {
  return (
    <Row
      style={{
        margin: "30px 20px",
        backgroundColor: Color.PRIMARY,
        padding: "20px",
        borderRadius: "20px",
      }}
    >
      <Tabs defaultActiveKey="profile" items={items} />
    </Row>
  );
};

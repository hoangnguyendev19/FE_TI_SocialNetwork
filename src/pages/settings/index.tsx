import { Row, Tabs, TabsProps } from "antd";
import { Color } from "constants";
import { Profile } from "./components";

const items: TabsProps["items"] = [
  {
    key: "profile",
    label: "Profile",
    children: <Profile />,
  },
  {
    key: "security",
    label: "Security",
    children: "Content of Tab Pane 2",
  },
];

export const SettingsPage: React.FC = () => {
  const onChange = (key: string) => {
    console.log(key);
  };
  return (
    <Row
      style={{
        margin: "30px 20px",
        backgroundColor: Color.PRIMARY,
        padding: "20px",
        borderRadius: "20px",
      }}
    >
      <Tabs defaultActiveKey="profile" items={items} onChange={onChange} />
    </Row>
  );
};

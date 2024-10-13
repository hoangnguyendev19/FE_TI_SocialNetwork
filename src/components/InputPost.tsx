import { UserOutlined } from "@ant-design/icons";
import { Avatar, Input } from "antd";

export const InputPost: React.FC = () => {
  return (
    <Input
      size="large"
      placeholder="John Doe, what are you thinking?"
      prefix={
        <Avatar
          alt="avatar"
          shape="circle"
          icon={<UserOutlined />}
          style={{ marginRight: "5px", marginLeft: "10px" }}
        />
      }
      style={{ width: "100%", outline: "none" }}
    />
  );
};

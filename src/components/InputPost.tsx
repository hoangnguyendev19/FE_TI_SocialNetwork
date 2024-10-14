import { UserOutlined } from "@ant-design/icons";
import { Avatar, Input } from "antd";

interface InputPostProps {
  showModal: () => void;
}

export const InputPost: React.FC<InputPostProps> = ({ showModal }) => {
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
      style={{ width: "100%", border: "1px solid rgba(0,0,0,0.2)" }}
      onClick={showModal}
    />
  );
};

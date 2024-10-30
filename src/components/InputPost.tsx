import { UserOutlined } from "@ant-design/icons";
import { Avatar, Input } from "antd";
import { useProfile } from "hooks";

interface InputPostProps {
  showModal: () => void;
}

export const InputPost: React.FC<InputPostProps> = ({ showModal }) => {
  const { data: res }: any = useProfile({
    enabled: true,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  return (
    <Input
      size="large"
      placeholder={`${res?.data?.firstName} ${res?.data?.lastName}, what's on your mind?`}
      prefix={
        <Avatar
          alt="avatar"
          shape="circle"
          icon={<UserOutlined />}
          style={{ marginRight: "5px", marginLeft: "10px" }}
        />
      }
      style={{ width: "100%", border: "1px solid rgba(0,0,0,0.2)", marginBottom: "20px" }}
      onClick={showModal}
    />
  );
};

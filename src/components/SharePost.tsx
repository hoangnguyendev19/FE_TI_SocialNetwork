import { Avatar, Divider, Modal, Typography } from "antd";
import { Color, ShareData } from "constants";

interface SharePostProps {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  shares: Array<ShareData>;
}

export const SharePost: React.FC<SharePostProps> = ({
  isModalOpen,
  setIsModalOpen,
  shares,
}) => {
  return (
    <Modal
      open={isModalOpen}
      onCancel={() => setIsModalOpen(false)}
      footer={() => null}
    >
      <Typography.Title level={4} style={{ color: Color.SECONDARY }}>
        Share on the post
      </Typography.Title>
      <Divider style={{ margin: "15px 0", borderBlockColor: "#000" }} />

      {shares.map((share) => (
        <div key={share.id} style={{ display: "flex", alignItems: "center" }}>
          <Avatar
            alt="avatar"
            shape="circle"
            size="large"
            src={share.profilePictureUrl}
            style={{ marginRight: "15px" }}
          />
          <Typography.Text style={{ color: "gray" }}>
            {share.firstName} {share.lastName}
          </Typography.Text>
        </div>
      ))}
    </Modal>
  );
};

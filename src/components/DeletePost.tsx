import { Button, Divider, Modal, Typography } from "antd";
import { Color } from "constants";

interface DeletePostProps {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  postId: string;
}

export const DeletePost: React.FC<DeletePostProps> = ({
  isModalOpen,
  setIsModalOpen,
  postId,
}) => {
  const handleOk = () => {
    setIsModalOpen(false);
  };

  return (
    <Modal
      open={isModalOpen}
      onCancel={() => setIsModalOpen(false)}
      footer={[
        <Button
          key="submit"
          type="primary"
          style={{ width: "100%" }}
          onClick={handleOk}
        >
          Delete
        </Button>,
      ]}
      style={{ maxWidth: "600px", maxHeight: "600px" }}
    >
      <Typography.Title level={4} style={{ color: Color.SECONDARY }}>
        Delete the post
      </Typography.Title>
      <Divider style={{ margin: "15px 0", borderBlockColor: "#000" }} />

      <div style={{ margin: "25px 0px" }}>
        <Typography.Text style={{ color: "red" }}>
          Are you sure you want to delete the data?
        </Typography.Text>
      </div>
    </Modal>
  );
};

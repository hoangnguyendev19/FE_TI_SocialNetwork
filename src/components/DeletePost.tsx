import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Divider, Modal, notification, Typography } from "antd";
import { postApi } from "api";
import { Color, ErrorCode, ErrorMessage, QueryKey } from "constants";

interface DeletePostProps {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  id: string;
}

export const DeletePost: React.FC<DeletePostProps> = ({ isModalOpen, setIsModalOpen, id }) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: () => postApi.deletePost(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKey.POST] });
      setIsModalOpen(false);
      notification.success({
        message: "Post deleted successfully.",
      });
    },
    onError: (error: any) => {
      switch (error?.response?.data?.message) {
        case ErrorCode.POST_DOES_NOT_EXIST:
          notification.error({
            message: ErrorMessage.POST_DOES_NOT_EXIST,
          });
          break;

        default:
          notification.error({
            message: "Failed to delete post.",
          });
          break;
      }
      setIsModalOpen(false);
    },
  });

  const handleOk = () => {
    mutation.mutate();
  };

  return (
    <Modal
      open={isModalOpen}
      onCancel={() => setIsModalOpen(false)}
      footer={[
        <Button key="submit" type="primary" style={{ width: "100%" }} onClick={handleOk}>
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
        <Typography.Text style={{ color: "red" }}>Are you sure you want to delete the data?</Typography.Text>
      </div>
    </Modal>
  );
};

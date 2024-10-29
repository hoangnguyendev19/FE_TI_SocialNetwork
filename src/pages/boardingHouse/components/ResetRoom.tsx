import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Divider, Input, Modal, notification, Typography } from "antd";
import { roomApi } from "api/roomApi";
import { Color, QueryKey } from "constants";
import React from "react";
import { inputStyle } from "styles";

interface ResetRoomProps {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  id: string;
  name: string;
}

export const ResetRoom: React.FC<ResetRoomProps> = ({ isModalOpen, setIsModalOpen, id, name }) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: () => roomApi.resetRoom(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKey.ROOM] });
      setIsModalOpen(false);
      notification.success({
        message: "Reset room successfully.",
      });
    },
    onError: (error: any) => {
      switch (error?.response?.data?.message) {
        default:
          notification.error({
            message: "Failed to reset room.",
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
      okText="Reset"
      onOk={handleOk}
      style={{ maxWidth: "600px", maxHeight: "600px" }}
    >
      <Typography.Title level={4} style={{ color: Color.SECONDARY }}>
        Delete the post
      </Typography.Title>
      <Divider style={{ margin: "15px 0", borderBlockColor: "#000" }} />

      <Typography.Title level={5}>Room Name</Typography.Title>

      <Input placeholder="Please type your room name!" style={{ ...inputStyle }} value={name} disabled />

      <div style={{ margin: "25px 0px" }}>
        <Typography.Text style={{ color: "red" }}>Are you sure you want to reset the data?</Typography.Text>
      </div>
    </Modal>
  );
};

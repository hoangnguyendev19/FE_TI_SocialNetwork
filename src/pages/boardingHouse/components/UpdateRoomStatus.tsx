import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Divider, Input, Modal, notification, Radio, Typography } from "antd";
import { roomApi } from "api/roomApi";
import { Color, QueryKey } from "constants";
import React from "react";
import { inputStyle } from "styles";

interface UpdateRoomStatusProps {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  id: string;
  name: string;
  roomStatus: string;
}

export const UpdateRoomStatus: React.FC<UpdateRoomStatusProps> = ({
  isModalOpen,
  setIsModalOpen,
  id,
  name,
  roomStatus,
}) => {
  const [status, setStatus] = React.useState(roomStatus);
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: () => roomApi.updateRoomStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKey.ROOM] });
      setIsModalOpen(false);
      notification.success({
        message: "Update room status successfully.",
      });
    },
    onError: (error: any) => {
      switch (error?.response?.data?.message) {
        default:
          notification.error({
            message: "Failed to update room status.",
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
    <Modal open={isModalOpen} onCancel={() => setIsModalOpen(false)} okText="Save" onOk={handleOk}>
      <Typography.Title level={4} style={{ color: Color.SECONDARY }}>
        Update Room Status
      </Typography.Title>
      <Divider style={{ margin: "15px 0", borderBlockColor: "#000" }} />

      <Typography.Title level={5}>Room name</Typography.Title>

      <Input placeholder="Please type your room name!" style={{ ...inputStyle }} value={name} disabled />

      <Typography.Title level={5}>Room status</Typography.Title>
      <Radio.Group value={status} onChange={(e) => setStatus(e.target.value)}>
        <Radio value="ROOM_AVAILABLE">Rooms Available</Radio>
        <Radio value="FULL_ROOM">Full Room</Radio>
      </Radio.Group>
    </Modal>
  );
};

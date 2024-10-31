import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, Divider, Input, Modal, Space, Typography, notification } from "antd";
import { roomApi } from "api";
import { Color, QueryKey } from "constants";
import React from "react";
import { inputStyle } from "styles";

interface UpdatePeopleProps {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  id: string;
  name: string;
  roomUserId: string;
  fullName: string;
  setFullName: (fullName: string) => void;
  phoneNumber: string;
  setPhoneNumber: (phoneNumber: string) => void;
}

export const UpdatePeople: React.FC<UpdatePeopleProps> = ({
  isModalOpen,
  setIsModalOpen,
  id,
  name,
  roomUserId,
  fullName,
  setFullName,
  phoneNumber,
  setPhoneNumber,
}) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: () => roomApi.updatePeople(roomUserId, fullName, phoneNumber),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKey.ROOM, id] });
      handleCancel();
      notification.success({
        message: "Update people successfully.",
      });
    },
    onError: (error: any) => {
      switch (error?.response?.data?.message) {
        default:
          notification.error({
            message: "Failed to update people.",
          });
          break;
      }
      setIsModalOpen(false);
    },
  });

  const handleOk = () => {
    // check if there is a person with empty full name or phone number
    const hasEmptyPerson = fullName === "" || phoneNumber === "";
    if (hasEmptyPerson) {
      notification.error({
        message: "Please fill in all fields.",
      });
      return;
    }

    // check if phone number have 10 digits
    if (phoneNumber.length !== 10) {
      notification.error({
        message: "Phone number must have 10 digits.",
      });
      return;
    }

    mutation.mutate();
  };

  const handleCancel = () => {
    setFullName("");
    setPhoneNumber("");
    setIsModalOpen(false);
  };

  return (
    <Modal open={isModalOpen} onCancel={handleCancel} okText="Update" onOk={handleOk} style={{ maxWidth: "600px" }}>
      <Typography.Title level={4} style={{ color: Color.SECONDARY }}>
        Update People
      </Typography.Title>
      <Divider style={{ margin: "15px 0" }} />

      <div style={{ marginBottom: "15px" }}>
        <Typography.Title level={5}>Room Name</Typography.Title>
        <Input style={{ ...inputStyle, color: "#000" }} value={name} disabled />
      </div>

      <Card size="small" title="Peple Information" style={{ width: "100%" }}>
        <Space direction="vertical" style={{ width: "100%" }}>
          <div>
            <Typography.Title level={5}>Full Name</Typography.Title>
            <Input
              style={inputStyle}
              placeholder="Please type your full name!"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
          <div>
            <Typography.Title level={5}>Phone Number</Typography.Title>
            <Input
              style={inputStyle}
              placeholder="Please type your phone number!"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
        </Space>
      </Card>
    </Modal>
  );
};

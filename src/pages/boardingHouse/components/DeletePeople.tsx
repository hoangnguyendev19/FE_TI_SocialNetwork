import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, Divider, Input, Modal, Space, Typography, notification } from "antd";
import { roomApi } from "api";
import { Color, QueryKey } from "constants";
import React from "react";
import { inputStyle } from "styles";

interface DeletePeopleProps {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  id: string;
  name: string;
  fullName: string;
  phoneNumber: string;
}

export const DeletePeople: React.FC<DeletePeopleProps> = ({
  isModalOpen,
  setIsModalOpen,
  id,
  name,
  fullName,
  phoneNumber,
}) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: () => roomApi.deletePeople(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKey.ROOM] });
      handleCancel();
      notification.success({
        message: "Delete people successfully.",
      });
    },
    onError: (error: any) => {
      switch (error?.response?.data?.message) {
        default:
          notification.error({
            message: "Failed to delete people.",
          });
          break;
      }
      setIsModalOpen(false);
    },
  });

  const handleOk = () => {
    mutation.mutate();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <Modal open={isModalOpen} onCancel={handleCancel} okText="Delete" onOk={handleOk} style={{ maxWidth: "600px" }}>
      <Typography.Title level={4} style={{ color: Color.SECONDARY }}>
        Delete People
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
            <Input style={{ ...inputStyle, color: "#000" }} value={fullName} disabled />
          </div>
          <div>
            <Typography.Title level={5}>Phone Number</Typography.Title>
            <Input style={{ ...inputStyle, color: "#000" }} value={phoneNumber} disabled />
          </div>
        </Space>
      </Card>

      <div style={{ margin: "25px 0px" }}>
        <Typography.Text style={{ color: "red" }}>Are you sure you want to delete the data?</Typography.Text>
      </div>
    </Modal>
  );
};

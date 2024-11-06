import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Divider, Input, Modal, notification, Radio, Typography } from "antd";
import { roomApi } from "api";
import { Color, QueryKey } from "constants";
import React from "react";
import { inputStyle } from "styles";

interface UpdatePaymentStatusProps {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  id: string;
  name: string;
  paymentStatus: string;
}

export const UpdatePaymentStatus: React.FC<UpdatePaymentStatusProps> = ({
  isModalOpen,
  setIsModalOpen,
  id,
  name,
  paymentStatus,
}) => {
  const [status, setStatus] = React.useState(paymentStatus);
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: () => roomApi.updatePaymentStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKey.ROOM] });
      handleCancel();
      notification.success({
        message: "Update payment status successfully.",
      });
    },
    onError: (error: any) => {
      switch (error?.response?.data?.message) {
        default:
          notification.error({
            message: "Failed to update payment status.",
          });
          break;
      }
      handleCancel();
    },
  });

  const handleOk = () => {
    mutation.mutate();
  };

  const handleCancel = () => {
    setStatus(paymentStatus);
    setIsModalOpen(false);
  };

  return (
    <Modal open={isModalOpen} onCancel={handleCancel} okText="Save" onOk={handleOk}>
      <Typography.Title level={4} style={{ color: Color.SECONDARY }}>
        Update Payment Status
      </Typography.Title>
      <Divider style={{ margin: "15px 0", borderBlockColor: "#000" }} />

      <div style={{ marginBottom: "15px" }}>
        <Typography.Title level={5}>Room name</Typography.Title>
        <Input style={{ ...inputStyle, color: "#000" }} value={name} disabled />
      </div>

      <div>
        <Typography.Title level={5}>Payment status</Typography.Title>
        <Radio.Group value={status} onChange={(e) => setStatus(e.target.value)}>
          <Radio value="PAID">Paid</Radio>
          <Radio value="UNPAID">Unpaid</Radio>
        </Radio.Group>
      </div>
    </Modal>
  );
};

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Col, Divider, Input, Modal, notification, Row, Typography } from "antd";
import { boardingHouseApi } from "api";
import { Color, QueryKey, SettingsRequest } from "constants";
import React, { useEffect, useState } from "react";
import { inputStyle } from "styles";

interface SettingsProps {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  id: string;
  electricityBill: number;
  waterBill: number;
}

export const Settings: React.FC<SettingsProps> = ({ isModalOpen, setIsModalOpen, id, electricityBill, waterBill }) => {
  console.log(electricityBill);

  const [electBill, setElectBill] = useState(String(electricityBill));
  const [watBill, setWatBill] = useState(String(waterBill));

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: SettingsRequest) => boardingHouseApi.updateSetting(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKey.BOARDING_HOUSE] });
      handleCancel();
      notification.success({
        message: "Settings updated successfully.",
      });
    },
    onError: (error: any) => {
      switch (error?.response?.data?.message) {
        default:
          notification.error({
            message: "Failed to update settings.",
          });
          break;
      }
      setIsModalOpen(false);
    },
  });

  useEffect(() => {
    setElectBill(String(electricityBill));
    setWatBill(String(waterBill));
  }, [electricityBill, waterBill]);

  const handleOk = () => {
    // check if electBill and watBill is empty
    if (!electBill || !watBill) {
      notification.error({
        message: "Please fill all required fields.",
      });
      return;
    }

    // check if electBill and watBill < 0
    if (Number(electBill) < 0 || Number(watBill) < 0) {
      notification.error({
        message: "Electricity bill and water bill must be greater than 0.",
      });
      return;
    }

    mutation.mutate({
      boardingHouseId: id,
      electricityBill: Number(electBill),
      waterBill: Number(watBill),
    });
  };

  const handleCancel = () => {
    setElectBill(String(electricityBill));
    setWatBill(String(waterBill));
    setIsModalOpen(false);
  };

  return (
    <Modal open={isModalOpen} onCancel={handleCancel} okText="Save" onOk={handleOk}>
      <Typography.Title level={4} style={{ color: Color.SECONDARY }}>
        Settings Boarding House
      </Typography.Title>
      <Divider style={{ margin: "15px 0", borderBlockColor: "#000" }} />

      <Row gutter={[0, 5]}>
        <Col className="gutter-row" span={24}>
          <Typography.Title level={5}>
            Electricity bill/meter<span style={{ color: "red" }}>*</span>
          </Typography.Title>
          <Input
            placeholder="Please type your electricity bill!"
            type="number"
            style={inputStyle}
            value={electBill}
            onChange={(e) => setElectBill(e.target.value)}
          />
        </Col>
        <Col className="gutter-row" span={24}>
          <Typography.Title level={5}>
            Water bill/meter<span style={{ color: "red" }}>*</span>
          </Typography.Title>
          <Input
            placeholder="Please type your water bill!"
            type="number"
            style={inputStyle}
            value={watBill}
            onChange={(e) => setWatBill(e.target.value)}
          />
        </Col>
      </Row>
    </Modal>
  );
};

import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Col, Divider, Input, Modal, notification, Row, Typography } from "antd";
import { boardingHouseApi } from "api";
import { Color, QueryKey, SettingsRequest } from "constants";
import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { inputErrorStyle, inputStyle } from "styles";
import * as yup from "yup";

interface SettingsProps {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  id: string;
}

export const Settings: React.FC<SettingsProps> = ({ isModalOpen, setIsModalOpen, id }) => {
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

  const schema = yup.object().shape({
    electricityBill: yup.string().required("Electricity bill is required"),
    waterBill: yup.string().required("Water bill is required"),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<any>({
    resolver: yupResolver(schema),
    defaultValues: {
      electricityBill: 0,
      waterBill: 0,
    },
  });

  const onSubmit: SubmitHandler<any> = (data) => {
    mutation.mutate({
      boardingHouseId: id,
      electricityBill: Number(data.electricityBill),
      waterBill: Number(data.waterBill),
    });
  };

  const handleCancel = () => {
    reset();
    setIsModalOpen(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Modal open={isModalOpen} onCancel={handleCancel} okText="Save" onOk={handleSubmit(onSubmit)}>
        <Typography.Title level={4} style={{ color: Color.SECONDARY }}>
          Settings Boarding House
        </Typography.Title>
        <Divider style={{ margin: "15px 0", borderBlockColor: "#000" }} />

        <Row gutter={[0, 5]}>
          <Col className="gutter-row" span={24}>
            <Typography.Title level={5}>
              Electricity bill/meter<span style={{ color: "red" }}>*</span>
            </Typography.Title>
            <Controller
              name="electricityBill"
              control={control}
              render={({ field }) => (
                <Input
                  placeholder="Please type your electricity bill!"
                  type="number"
                  style={{ ...inputStyle, borderColor: errors.electricityBill ? "red" : "" }}
                  {...field}
                />
              )}
            />
            <div style={inputErrorStyle}>
              {errors.electricityBill && (
                <Typography.Text type="danger">{errors.electricityBill.message as string}</Typography.Text>
              )}
            </div>
          </Col>
          <Col className="gutter-row" span={24}>
            <Typography.Title level={5}>
              Water bill/meter<span style={{ color: "red" }}>*</span>
            </Typography.Title>
            <Controller
              name="waterBill"
              control={control}
              render={({ field }) => (
                <Input
                  placeholder="Please type your water bill!"
                  type="number"
                  style={{ ...inputStyle, borderColor: errors.waterBill ? "red" : "" }}
                  {...field}
                />
              )}
            />
            <div style={inputErrorStyle}>
              {errors.waterBill && (
                <Typography.Text type="danger">{errors.waterBill.message as string}</Typography.Text>
              )}
            </div>
          </Col>
        </Row>
      </Modal>
    </form>
  );
};

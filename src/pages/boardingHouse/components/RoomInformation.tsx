import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Col, Divider, Input, Modal, notification, Row, Typography } from "antd";
import { roomApi } from "api";
import { Color, PaymentRequest, QueryKey } from "constants";
import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { inputErrorStyle, inputStyle } from "styles";
import * as yup from "yup";

interface RoomInformationProps {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  id: string;
  name: string;
  roomRate: number;
  paymentStatus: string;
  electricityMeterOldNumber: number;
  waterMeterOldNumber: number;
  electricityMeterNewNumber: number;
  waterMeterNewNumber: number;
}

export const RoomInformation: React.FC<RoomInformationProps> = ({
  isModalOpen,
  setIsModalOpen,
  id,
  name,
  roomRate,
  paymentStatus,
  electricityMeterOldNumber,
  waterMeterOldNumber,
  electricityMeterNewNumber,
  waterMeterNewNumber,
}) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (data: PaymentRequest) => roomApi.createPayment(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKey.ROOM] });
      handleCancel();
      notification.success({
        message: "Create payment successfully.",
      });
    },
    onError: (error: any) => {
      switch (error?.response?.data?.message) {
        default:
          notification.error({
            message: "Failed to create payment.",
          });
          break;
      }
      setIsModalOpen(false);
    },
  });

  const schema = yup.object().shape({
    roomRate: yup.string().required("Room rate is required"),
    electricityMeterNewNumber: yup.string().required("Electricity meter number is required"),
    waterMeterNewNumber: yup.string().required("Water meter number is required"),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<any>({
    resolver: yupResolver(schema),
    defaultValues: {
      roomRate,
      electricityMeterNewNumber,
      waterMeterNewNumber,
    },
  });

  const onSubmit: SubmitHandler<any> = (data) => {
    mutation.mutate({
      roomId: id,
      roomRate: Number(data.roomRate),
      electricityMeterNewNumber: Number(data.electricityMeterNewNumber),
      waterMeterNewNumber: Number(data.waterMeterNewNumber),
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
          Room Information
        </Typography.Title>
        <Divider style={{ margin: "15px 0", borderBlockColor: "#000" }} />

        <Row gutter={[0, 10]} style={{ paddingTop: "10px", paddingBottom: "20px" }}>
          <Col className="gutter-row" span={24}>
            <Typography.Title level={5}>Room Name</Typography.Title>
            <Input style={{ ...inputStyle, color: "#000" }} value={name} disabled />
          </Col>
          <Col className="gutter-row" span={24}>
            <Typography.Title level={5}>
              Room Rate<span style={{ color: "red" }}>*</span>
            </Typography.Title>
            <Controller
              name="roomRate"
              control={control}
              render={({ field }) => (
                <Input
                  placeholder="Please type your room rate!"
                  type="number"
                  style={{ ...inputStyle, borderColor: errors.roomRate ? "red" : "", color: "#000" }}
                  {...field}
                  disabled={paymentStatus === "UNPAID"}
                />
              )}
            />
            <div style={inputErrorStyle}>
              {errors.roomRate && <Typography.Text type="danger">{errors.roomRate.message as string}</Typography.Text>}
            </div>
          </Col>
          <Col className="gutter-row" span={24}>
            <Row gutter={[15, 10]}>
              <Col className="gutter-row" span={12}>
                <Typography.Title level={5}>Electricity meter old number</Typography.Title>
                <Input
                  type="number"
                  style={{ ...inputStyle, color: "#000" }}
                  value={electricityMeterOldNumber}
                  disabled
                />
              </Col>
              <Col className="gutter-row" span={12}>
                <Typography.Title level={5}>
                  Electricity meter new number<span style={{ color: "red" }}>*</span>
                </Typography.Title>
                <Controller
                  name="electricityMeterNewNumber"
                  control={control}
                  render={({ field }) => (
                    <Input
                      placeholder="Electricity meter new number!"
                      type="number"
                      style={{
                        ...inputStyle,
                        borderColor: errors.electricityMeterNewNumber ? "red" : "",
                        color: "#000",
                      }}
                      {...field}
                      disabled={paymentStatus === "UNPAID"}
                    />
                  )}
                />
                <div style={inputErrorStyle}>
                  {errors.electricityMeterNewNumber && (
                    <Typography.Text type="danger">
                      {errors.electricityMeterNewNumber.message as string}
                    </Typography.Text>
                  )}
                </div>
              </Col>
              <Col className="gutter-row" span={12}>
                <Typography.Title level={5}>Water meter old number</Typography.Title>
                <Input type="number" style={{ ...inputStyle, color: "#000" }} value={waterMeterOldNumber} disabled />
              </Col>
              <Col className="gutter-row" span={12}>
                <Typography.Title level={5}>
                  Water meter new number<span style={{ color: "red" }}>*</span>
                </Typography.Title>
                <Controller
                  name="waterMeterNewNumber"
                  control={control}
                  render={({ field }) => (
                    <Input
                      placeholder="Water meter new number!"
                      type="number"
                      style={{ ...inputStyle, borderColor: errors.waterMeterNewNumber ? "red" : "", color: "#000" }}
                      {...field}
                      disabled={paymentStatus === "UNPAID"}
                    />
                  )}
                />
                <div style={inputErrorStyle}>
                  {errors.waterMeterNewNumber && (
                    <Typography.Text type="danger">{errors.waterMeterNewNumber.message as string}</Typography.Text>
                  )}
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Modal>
    </form>
  );
};

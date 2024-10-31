import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Col, Divider, Input, Modal, notification, Radio, Row, Typography } from "antd";
import { roomApi } from "api";
import { Color, ErrorCode, ErrorMessage, QueryKey, RoomRequest } from "constants";
import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { inputErrorStyle, inputStyle } from "styles";
import * as yup from "yup";

interface AddNewRoomProps {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  id: string;
}

export const AddNewRoom: React.FC<AddNewRoomProps> = ({ isModalOpen, setIsModalOpen, id }) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (data: RoomRequest) => roomApi.createRoom(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKey.ROOM] });
      handleCancel();
      notification.success({
        message: "Add new room successfully.",
      });
    },
    onError: (error: any) => {
      switch (error?.response?.data?.message) {
        case ErrorCode.ROOM_SETTING_NOT_FOUND:
          notification.error({
            message: ErrorMessage.ROOM_SETTING_NOT_FOUND,
          });
          break;

        default:
          notification.error({
            message: "Failed to add new room.",
          });
          break;
      }
      setIsModalOpen(false);
    },
  });

  const schema = yup.object().shape({
    roomName: yup.string().required("Room name is required"),
    roomStatus: yup.string().required("Room status is required"),
    electricityMeterOldNumber: yup.string().required("Electricity meter old number is required"),
    waterMeterOldNumber: yup.string().required("Water meter old number is required"),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<any>({
    resolver: yupResolver(schema),
    defaultValues: {
      roomName: "",
      roomStatus: "ROOM_AVAILABLE",
      electricityMeterOldNumber: 0,
      waterMeterOldNumber: 0,
    },
  });

  const onSubmit: SubmitHandler<any> = (data) => {
    mutation.mutate({
      boardingHouseId: id,
      roomName: data.roomName,
      roomStatus: data.roomStatus,
      electricityMeterOldNumber: Number(data.electricityMeterOldNumber),
      waterMeterOldNumber: Number(data.waterMeterOldNumber),
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
          Add New Room
        </Typography.Title>
        <Divider style={{ margin: "15px 0", borderBlockColor: "#000" }} />

        <Row gutter={[0, 10]} style={{ paddingTop: "10px", paddingBottom: "20px" }}>
          <Col className="gutter-row" span={24}>
            <Typography.Title level={5}>
              Room Name<span style={{ color: "red" }}>*</span>
            </Typography.Title>
            <Controller
              name="roomName"
              control={control}
              render={({ field }) => (
                <Input
                  placeholder="Please type your room name!"
                  style={{ ...inputStyle, borderColor: errors.roomName ? "red" : "" }}
                  {...field}
                />
              )}
            />
            <div style={inputErrorStyle}>
              {errors.roomName && <Typography.Text type="danger">{errors.roomName.message as string}</Typography.Text>}
            </div>
          </Col>
          <Col className="gutter-row" span={24}>
            <Typography.Title level={5}>
              Room status<span style={{ color: "red" }}>*</span>
            </Typography.Title>
            <Controller
              name="roomStatus"
              control={control}
              render={({ field }) => (
                <Radio.Group {...field}>
                  <Radio value="ROOM_AVAILABLE">Rooms Available</Radio>
                  <Radio value="FULL_ROOM">Full Room</Radio>
                </Radio.Group>
              )}
            />
          </Col>
          <Col className="gutter-row" span={24}>
            <Typography.Title level={5}>
              Electricity meter old number<span style={{ color: "red" }}>*</span>
            </Typography.Title>
            <Controller
              name="electricityMeterOldNumber"
              control={control}
              render={({ field }) => (
                <Input
                  placeholder="Please type your electricity meter old number!"
                  type="number"
                  style={{ ...inputStyle, borderColor: errors.electricityMeterOldNumber ? "red" : "" }}
                  {...field}
                />
              )}
            />
            <div style={inputErrorStyle}>
              {errors.electricityMeterOldNumber && (
                <Typography.Text type="danger">{errors.electricityMeterOldNumber.message as string}</Typography.Text>
              )}
            </div>
          </Col>
          <Col className="gutter-row" span={24}>
            <Typography.Title level={5}>
              Water meter old number<span style={{ color: "red" }}>*</span>
            </Typography.Title>
            <Controller
              name="waterMeterOldNumber"
              control={control}
              render={({ field }) => (
                <Input
                  placeholder="Please type your water meter old number!"
                  type="number"
                  style={{ ...inputStyle, borderColor: errors.waterMeterOldNumber ? "red" : "" }}
                  {...field}
                />
              )}
            />
            <div style={inputErrorStyle}>
              {errors.waterMeterOldNumber && (
                <Typography.Text type="danger">{errors.waterMeterOldNumber.message as string}</Typography.Text>
              )}
            </div>
          </Col>
        </Row>
      </Modal>
    </form>
  );
};

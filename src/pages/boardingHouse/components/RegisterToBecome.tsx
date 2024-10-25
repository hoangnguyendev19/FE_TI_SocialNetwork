import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { Button, Col, Input, notification, Row, Typography } from "antd";
import { boardingHouseApi } from "api";
import { Color, BoardingHouseRequest, ROUTE, ErrorCode, ErrorMessage } from "constants";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { inputErrorStyle, inputStyle } from "styles";
import * as yup from "yup";

export const RegisterToBecome: React.FC = () => {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (data: BoardingHouseRequest) => boardingHouseApi.createBoardingHouse(data),
    onSuccess: () => {
      navigate(ROUTE.UNDER_REVIEW);
    },
    onError: (error: any) => {
      switch (error?.response?.data?.message) {
        case ErrorCode.BOARDING_NAME_ALREADY_EXISTS:
          notification.error({
            message: ErrorMessage.BOARDING_NAME_ALREADY_EXISTS,
          });
          break;

        default:
          notification.error({
            message: "An unexpected error occurred. Please try again later.",
          });
          break;
      }
    },
  });

  const schema = yup.object().shape({
    boardingHouseName: yup.string().required("Boarding house name is required"),
    presentAddress: yup.string().required("Present address is required"),
    ward: yup.string().required("Ward is required"),
    city: yup.string().required("City is required"),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<BoardingHouseRequest>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<BoardingHouseRequest> = (data) => {
    mutation.mutate(data);
  };
  return (
    <Row style={{ margin: "20px", padding: "25px", backgroundColor: Color.PRIMARY, borderRadius: 10 }}>
      <Col span={12}>
        <Typography.Title
          style={{
            marginBottom: "20px",
            paddingBottom: "5px",
            borderBottom: `3px solid ${Color.SECONDARY}`,
            display: "inline-block",
          }}
          level={4}
        >
          Register to become a boarding house
        </Typography.Title>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Row gutter={[0, 5]}>
            <Col span={24}>
              <Typography.Title level={5}>
                Boarding house name<span style={{ color: "red" }}>*</span>
              </Typography.Title>
              <Controller
                name="boardingHouseName"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Enter Boarding house"
                    style={{ ...inputStyle, borderColor: errors.boardingHouseName ? "red" : "" }}
                  />
                )}
              />
              <div style={inputErrorStyle}>
                {errors.boardingHouseName && (
                  <Typography.Text type="danger">{errors.boardingHouseName.message}</Typography.Text>
                )}
              </div>
            </Col>

            <Col span={24}>
              <Typography.Title level={5}>
                Present address
                <span style={{ color: "red" }}>*</span>
              </Typography.Title>
              <Controller
                name="presentAddress"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Enter Present address"
                    style={{ ...inputStyle, borderColor: errors.presentAddress ? "red" : "" }}
                  />
                )}
              />
              <div style={inputErrorStyle}>
                {errors.presentAddress && (
                  <Typography.Text type="danger">{errors.presentAddress.message}</Typography.Text>
                )}
              </div>
            </Col>

            <Col span={24}>
              <Typography.Title level={5}>
                Ward<span style={{ color: "red" }}>*</span>
              </Typography.Title>
              <Controller
                name="ward"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Enter Ward"
                    style={{ ...inputStyle, borderColor: errors.ward ? "red" : "" }}
                  />
                )}
              />
              <div style={inputErrorStyle}>
                {errors.ward && <Typography.Text type="danger">{errors.ward.message}</Typography.Text>}
              </div>
            </Col>

            <Col span={24}>
              <Typography.Title level={5}>
                City<span style={{ color: "red" }}>*</span>
              </Typography.Title>
              <Controller
                name="city"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Enter City"
                    style={{ ...inputStyle, borderColor: errors.city ? "red" : "" }}
                  />
                )}
              />
              <div style={inputErrorStyle}>
                {errors.city && <Typography.Text type="danger">{errors.city.message}</Typography.Text>}
              </div>
            </Col>
          </Row>

          <Row justify="start" style={{ marginTop: "20px" }}>
            <Button
              type="primary"
              htmlType="submit"
              style={{
                padding: "20px 60px",
                fontSize: "18px",
                borderRadius: "10px",
              }}
            >
              Save
            </Button>
          </Row>
        </form>
      </Col>
    </Row>
  );
};

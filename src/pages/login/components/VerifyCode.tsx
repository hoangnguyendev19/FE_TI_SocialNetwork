import { LeftOutlined } from "@ant-design/icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { Button, Col, Flex, Image, Input, notification, Row, Typography } from "antd";
import { authApi } from "api";
import LoginImage from "assets/images/img-login.png";
import { ErrorCode, ErrorMessage, ROUTE, VerifyCodeRequest } from "constants";
import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { imageStyle, inputErrorStyle, inputStyle } from "styles";
import * as yup from "yup";

export const VerifyCode: React.FC = () => {
  const navigate = useNavigate();
  const {
    state: { email },
  } = useLocation();

  const mutation = useMutation({
    mutationFn: (data: any) => authApi.verifyCode(data),
    onSuccess: () => {
      navigate(ROUTE.SET_PASSWORD, {
        state: { email },
      });
    },
    onError: (error: any) => {
      switch (error?.response?.data?.message) {
        case ErrorCode.OTP_EXPIRED:
          notification.error({
            message: ErrorMessage.OTP_EXPIRED,
          });
          break;
        case ErrorCode.OTP_DOES_NOT_EXIST:
          notification.error({
            message: ErrorMessage.OTP_DOES_NOT_EXIST,
          });
          break;

        default:
          notification.error({
            message: "An unexpected error occurred. Please try again later.",
          });
      }
    },
  });

  const schema = yup.object().shape({
    otp: yup.string().required("OTP is required"),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<VerifyCodeRequest>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<VerifyCodeRequest> = (data) => {
    mutation.mutate({
      ...data,
      email,
    });
  };

  const handResend = () => {
    try {
      const { data }: any = authApi.forgotPasword({
        email,
      });
      if (data) {
        notification.success({
          message: "Code has been sent to your email",
        });
      }
    } catch (error: any) {
      notification.error({
        message: error?.response?.data?.message || "Something went wrong!",
      });
    }
  };

  return (
    <Row>
      <Col span={14}>
        <Flex justify="center" vertical style={{ height: "100%", width: "100%" }}>
          <Typography.Link href={ROUTE.LOGIN}>
            <LeftOutlined /> Back to login
          </Typography.Link>
          <Typography.Title level={2}>Verify code</Typography.Title>
          <Typography.Paragraph type="secondary" style={{ marginBottom: "15px" }}>
            An authentication code has been sent to your email.
          </Typography.Paragraph>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Typography.Title level={5}>
              OTP<span style={{ color: "red" }}>*</span>
            </Typography.Title>
            <Controller
              name="otp"
              control={control}
              render={({ field }) => (
                <Input
                  placeholder="Please type your otp!"
                  style={{ ...inputStyle, borderColor: errors.otp ? "red" : "" }}
                  {...field}
                  aria-invalid={!!errors.otp}
                />
              )}
            />
            <div style={inputErrorStyle}>
              {errors.otp && <Typography.Text type="danger">{errors.otp.message}</Typography.Text>}
            </div>
            <div style={{ marginTop: "15px" }}>
              <Typography.Text>
                Didn’t receive a code?{" "}
                <Typography.Link type="danger" onClick={handResend}>
                  Resend
                </Typography.Link>
              </Typography.Text>
            </div>

            <Button
              type="primary"
              style={{
                width: "100%",
                padding: "20px 0",
                marginBottom: "10px",
                marginTop: "30px",
              }}
              htmlType="submit"
            >
              Verify
            </Button>
          </form>
        </Flex>
      </Col>
      <Col span={10}>
        <Flex align="center" justify="end">
          <Image style={imageStyle} src={LoginImage} placeholder="Verify Code" preview={false} />
        </Flex>
      </Col>
    </Row>
  );
};

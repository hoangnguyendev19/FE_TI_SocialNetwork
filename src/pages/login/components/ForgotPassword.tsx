import { LeftOutlined } from "@ant-design/icons";
import { useMutation } from "@tanstack/react-query";
import {
  Button,
  Col,
  Flex,
  Image,
  Input,
  notification,
  Row,
  Typography,
} from "antd";
import { authApi } from "api";
import PasswordImage from "assets/images/img-password.png";
import {
  ErrorCode,
  ErrorMessage,
  ForgotPasswordRequest,
  ROUTE,
} from "constants";
import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { imageStyle, inputErrorStyle, inputStyle } from "styles";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

export const ForgotPassword: React.FC = () => {
  const [email, setEmail] = React.useState("");
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (data: ForgotPasswordRequest) => authApi.forgotPasword(data),
    onSuccess: () => {
      navigate(ROUTE.VERIFY_CODE, {
        state: { email },
      });
    },
    onError: (error: any) => {
      switch (error?.response?.data?.message) {
        case ErrorCode.USER_DOES_NOT_EXIST:
          notification.error({
            message: ErrorMessage.USER_DOES_NOT_EXIST,
          });
          break;
        case ErrorCode.UNABLE_TO_SEND_OTP:
          notification.error({
            message: ErrorMessage.UNABLE_TO_SEND_OTP,
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
    email: yup.string().email("Invalid email").required("Email is required"),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordRequest>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: email,
    },
  });

  const onSubmit: SubmitHandler<ForgotPasswordRequest> = (data) => {
    setEmail(data.email);
    mutation.mutate(data);
  };

  return (
    <Row>
      <Col span={14}>
        <Flex
          justify="center"
          vertical
          style={{ height: "100%", width: "100%" }}
        >
          <Typography.Link href={ROUTE.LOGIN}>
            <LeftOutlined /> Back to login
          </Typography.Link>
          <Typography.Title level={2}>Forgot your password?</Typography.Title>
          <Typography.Paragraph
            type="secondary"
            style={{ marginBottom: "15px" }}
          >
            Don’t worry, happens to all of us. Enter your email below to recover
            your password
          </Typography.Paragraph>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Typography.Title level={5}>Email</Typography.Title>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Input
                  placeholder="Please type your email!"
                  style={inputStyle}
                  {...field}
                  aria-invalid={!!errors.email}
                />
              )}
            />
            <div style={inputErrorStyle}>
              {errors.email && (
                <Typography.Text type="danger">
                  {errors.email.message}
                </Typography.Text>
              )}
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
              Submit
            </Button>
          </form>
        </Flex>
      </Col>
      <Col span={10}>
        <Flex align="center" justify="end">
          <Image
            style={imageStyle}
            src={PasswordImage}
            placeholder="Forgot Password"
            preview={false}
          />
        </Flex>
      </Col>
    </Row>
  );
};

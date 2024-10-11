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
import { ROUTE, SetPasswordData, VerifyCodeData } from "constants";
import React from "react";
import { useNavigate } from "react-router-dom";
import { imageStyle } from "styles";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

export const SetPassword: React.FC = () => {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (data: SetPasswordData) => authApi.setPassword(data),
    onSuccess: (data: any) => {
      console.log(data);

      navigate(ROUTE.LOGIN);
    },
    onError: (error: any) => {
      notification.error({
        message: error?.response?.data?.message || "Something went wrong!",
      });
    },
  });

  const schema = yup.object().shape({
    password: yup
      .string()
      .required("Password is required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#\$%\^&\*\(\)_\+\[\]\{\};':"\\|,.<>\/?`~])[A-Za-z\d!@#\$%\^&\*\(\)_\+\[\]\{\};':"\\|,.<>\/?`~]{8,}$/,
        "Password must be at least 8 characters long, contain upper and lower case letters, a number, and a special character."
      ),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords must match")
      .required("Confirm password is required"),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SetPasswordData>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<SetPasswordData> = (data) => {
    mutation.mutate(data);
  };
  return (
    <Row>
      <Col span={12}>
        <Flex
          justify="center"
          vertical
          style={{ height: "100%", width: "100%" }}
        >
          <Typography.Title level={1}>Set a password</Typography.Title>
          <Typography.Paragraph
            type="secondary"
            style={{ marginBottom: "15px" }}
          >
            Your previous password has been reseted. Please set a new password
            for your account.
          </Typography.Paragraph>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Row gutter={[0, 5]}>
              <Col className="gutter-row" span={24}>
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <Input
                      placeholder="Please type your password!"
                      style={{ padding: "10px" }}
                      {...field}
                      aria-invalid={!!errors.password}
                    />
                  )}
                />
                <div style={{ minHeight: "24px" }}>
                  {errors.password && (
                    <Typography.Text type="danger">
                      {errors.password.message}
                    </Typography.Text>
                  )}
                </div>
              </Col>
              <Col className="gutter-row" span={24}>
                <Controller
                  name="confirmPassword"
                  control={control}
                  render={({ field }) => (
                    <Input.Password
                      placeholder="Please type your confirm password!"
                      style={{ padding: "10px" }}
                      {...field}
                      aria-invalid={!!errors.confirmPassword}
                    />
                  )}
                />
                <div style={{ minHeight: "24px" }}>
                  {errors.confirmPassword && (
                    <Typography.Text type="danger">
                      {errors.confirmPassword.message}
                    </Typography.Text>
                  )}
                </div>
              </Col>
            </Row>
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
              Set password
            </Button>
          </form>
        </Flex>
      </Col>
      <Col span={12}>
        <Flex align="center" justify="center">
          <Image
            style={imageStyle}
            src={PasswordImage}
            placeholder="Set A Password"
            preview={false}
          />
        </Flex>
      </Col>
    </Row>
  );
};

import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import {
  Button,
  Checkbox,
  Col,
  Flex,
  Image,
  Input,
  notification,
  Row,
  Typography,
} from "antd";
import { authApi } from "api";
import LoginImage from "assets/images/img-login.png";
import { LoginData, ROUTE } from "constants";
import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { imageStyle } from "styles";
import { setToken } from "utils";
import * as yup from "yup";

export const Login: React.FC = () => {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (data: LoginData) => authApi.login(data),
    onSuccess: (data: any) => {
      setToken(data.data.accessToken, data.data.refreshToken);

      navigate(ROUTE.ROOT);
    },
    onError: (error) => {
      notification.error({
        message: error.message,
      });
    },
  });

  const schema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().required("Password is required"),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<LoginData> = (data) => {
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
          <Typography.Title level={1}>Login</Typography.Title>
          <Typography.Paragraph
            type="secondary"
            style={{ marginBottom: "15px" }}
          >
            Login to access your TI-Social Network account
          </Typography.Paragraph>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Row gutter={[0, 15]}>
              <Col className="gutter-row" span={24}>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <Input
                      placeholder="Please type your email!"
                      style={{ padding: "10px" }}
                      {...field}
                      aria-invalid={!!errors.email}
                    />
                  )}
                />
                {errors.email && (
                  <Typography.Text type="danger">
                    {errors.email.message}
                  </Typography.Text>
                )}
              </Col>
              <Col className="gutter-row" span={24}>
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <Input.Password
                      placeholder="Please type your password!"
                      style={{ padding: "10px" }}
                      {...field}
                      aria-invalid={!!errors.password}
                    />
                  )}
                />
                {errors.password && (
                  <Typography.Text type="danger">
                    {errors.password.message}
                  </Typography.Text>
                )}
              </Col>
              <Col className="gutter-row" span={24}>
                <Flex justify="space-between" align="center">
                  <Checkbox>Remember me</Checkbox>
                  <Typography.Link type="danger" href={ROUTE.FORGOT_PASSWORD}>
                    Forgot password?
                  </Typography.Link>
                </Flex>
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
              Login
            </Button>
          </form>

          <Typography.Text style={{ textAlign: "center" }}>
            Don't have an account?{" "}
            <Typography.Link type="danger" href={ROUTE.SIGNUP}>
              Sign up
            </Typography.Link>
          </Typography.Text>
        </Flex>
      </Col>
      <Col span={12}>
        <Flex align="center" justify="center">
          <Image
            style={imageStyle}
            src={LoginImage}
            placeholder="login"
            preview={false}
          />
        </Flex>
      </Col>
    </Row>
  );
};

import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import {
  Button,
  Col,
  Flex,
  Image,
  Input,
  Layout,
  notification,
  Row,
  Typography,
} from "antd";
import { authApi } from "api";
import LogoImage from "assets/images/img-logo.png";
import SignupImage from "assets/images/img-signup.png";
import { ROUTE, SignupData } from "constants";
import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { contentStyle, headerStyle, imageStyle, layoutStyle } from "styles";
import * as yup from "yup";

const { Header, Content } = Layout;

export const SignupPage: React.FC = () => {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (data: SignupData) => authApi.signup(data),
    onSuccess: () => {
      navigate(ROUTE.LOGIN);
    },
    onError: (error: any) => {
      notification.error({
        message: error.response?.data.message,
      });
    },
  });

  const schema = yup.object().shape({
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    phoneNumber: yup
      .string()
      .required("Phone number is required")
      .min(10, "Phone number has at least 10 characters!"),
    password: yup.string().required("Password is required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords must match")
      .required("Confirm password is required"),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupData>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<SignupData> = (data) => {
    mutation.mutate(data);
  };

  return (
    <Layout style={layoutStyle}>
      <Header style={headerStyle}>
        <Flex justify="flex-end">
          <Image
            width={120}
            src={LogoImage}
            placeholder="logo"
            preview={false}
          />
        </Flex>
      </Header>
      <Content style={contentStyle}>
        <Row>
          <Col span={12}>
            <Flex align="center" justify="center">
              <Image
                style={imageStyle}
                src={SignupImage}
                placeholder="signup"
                preview={false}
              />
            </Flex>
          </Col>
          <Col span={12}>
            <Flex
              justify="center"
              vertical
              style={{ height: "100%", width: "100%" }}
            >
              <Typography.Title level={1}>Sign up</Typography.Title>
              <Typography.Paragraph
                type="secondary"
                style={{ marginBottom: "15px" }}
              >
                Let’s get you all set up so you can access your personal
                account.
              </Typography.Paragraph>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Row gutter={[16, 24]}>
                  <Col span={12}>
                    <Controller
                      name="firstName"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          placeholder="Please type your first name!"
                          style={{ padding: "10px" }}
                        />
                      )}
                    />
                    {errors.firstName && (
                      <Typography.Text type="danger">
                        {errors.firstName.message}
                      </Typography.Text>
                    )}
                  </Col>
                  <Col span={12}>
                    <Controller
                      name="lastName"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          placeholder="Please type your last name!"
                          style={{ padding: "10px" }}
                        />
                      )}
                    />
                    {errors.lastName && (
                      <Typography.Text type="danger">
                        {errors.lastName.message}
                      </Typography.Text>
                    )}
                  </Col>
                  <Col span={12}>
                    <Controller
                      name="email"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          type="email"
                          placeholder="Please type your email!"
                          style={{ padding: "10px" }}
                        />
                      )}
                    />
                    {errors.email && (
                      <Typography.Text type="danger">
                        {errors.email.message}
                      </Typography.Text>
                    )}
                  </Col>
                  <Col span={12}>
                    <Controller
                      name="phoneNumber"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          placeholder="Please type your phone number!"
                          style={{ padding: "10px" }}
                        />
                      )}
                    />
                    {errors.phoneNumber && (
                      <Typography.Text type="danger">
                        {errors.phoneNumber.message}
                      </Typography.Text>
                    )}
                  </Col>
                  <Col span={24}>
                    <Controller
                      name="password"
                      control={control}
                      render={({ field }) => (
                        <Input.Password
                          {...field}
                          placeholder="Please type your password!"
                          style={{ padding: "10px" }}
                        />
                      )}
                    />
                    {errors.password && (
                      <Typography.Text type="danger">
                        {errors.password.message}
                      </Typography.Text>
                    )}
                  </Col>
                  <Col span={24}>
                    <Controller
                      name="confirmPassword"
                      control={control}
                      render={({ field }) => (
                        <Input.Password
                          {...field}
                          placeholder="Please type your confirmed password!"
                          style={{ padding: "10px" }}
                        />
                      )}
                    />
                    {errors.confirmPassword && (
                      <Typography.Text type="danger">
                        {errors.confirmPassword.message}
                      </Typography.Text>
                    )}
                  </Col>
                </Row>
                <Button
                  type="primary"
                  style={{
                    width: "100%",
                    padding: "20px 0",
                    marginBottom: "10px",
                    marginTop: "50px",
                  }}
                  htmlType="submit"
                >
                  Create account
                </Button>
              </form>
              <Typography.Text style={{ textAlign: "center" }}>
                Already have an account?{" "}
                <Typography.Link type="danger" href={ROUTE.LOGIN}>
                  Login
                </Typography.Link>
              </Typography.Text>
            </Flex>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

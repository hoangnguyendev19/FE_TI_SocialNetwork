import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { Button, Col, Flex, Image, Input, Layout, notification, Row, Tooltip, Typography } from "antd";
import { authApi } from "api";
import LogoImage from "assets/images/img-logo.png";
import SignupImage from "assets/images/img-signup.png";
import { ErrorCode, ErrorMessage, ROUTE, SignupRequest } from "constants";
import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  contentStyle,
  headerStyle,
  imageStyle,
  inputErrorStyle,
  inputStyle,
  layoutStyle,
  overlayInnerStyle,
} from "styles";
import * as yup from "yup";

const { Header, Content } = Layout;

const inputList = [
  {
    name: "firstName",
    label: "First Name",
    placeholder: "Please type your first name!",
  },
  {
    name: "lastName",
    label: "Last Name",
    placeholder: "Please type your last name!",
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Please type your email!",
    tooltipText: "Email must be in the correct format",
  },
  {
    name: "phoneNumber",
    label: "Phone Number",
    placeholder: "Please type your phone number!",
    tooltipText: "Phone number must have 10 digits",
  },
];

export const SignupPage: React.FC = () => {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (data: SignupRequest) => authApi.signup(data),
    onSuccess: () => {
      navigate(ROUTE.LOGIN);
    },
    onError: (error: any) => {
      switch (error?.response?.data?.message) {
        case ErrorCode.EMAIL_ALREADY_EXIST:
          notification.error({
            message: ErrorMessage.EMAIL_ALREADY_EXIST,
          });
          break;
        case ErrorCode.EMAIL_NOT_CORRECT_FORMAT:
          notification.error({
            message: ErrorMessage.EMAIL_NOT_CORRECT_FORMAT,
          });
          break;
        case ErrorCode.INVALID_PHONE_NUMBER:
          notification.error({
            message: ErrorMessage.INVALID_PHONE_NUMBER,
          });
          break;
        case ErrorCode.PASSWORD_INVALID:
          notification.error({
            message: ErrorMessage.PASSWORD_INVALID,
          });
          break;
        case ErrorCode.PASSWORDS_DO_NOT_MATCH:
          notification.error({
            message: ErrorMessage.PASSWORDS_DO_NOT_MATCH,
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
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    phoneNumber: yup
      .string()
      .required("Phone number is required")
      .min(10, "Phone number must have at least 10 digits!")
      .max(10, "Phone number must have at most 10 digits!"),
    password: yup
      .string()
      .required("Password is required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#\$%\^&\*\(\)_\+\[\]\{\};':"\\|,.<>\/?`~])[A-Za-z\d!@#\$%\^&\*\(\)_\+\[\]\{\};':"\\|,.<>\/?`~]{8,}$/,
        "Password must be at least 8 characters long, contain upper and lower case letters, a number, and a special character.",
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
  } = useForm<SignupRequest>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<SignupRequest> = (data) => {
    mutation.mutate(data);
  };

  return (
    <Layout style={layoutStyle}>
      <Header style={headerStyle}>
        <Flex justify="flex-end">
          <Image width={120} src={LogoImage} placeholder="logo" preview={false} />
        </Flex>
      </Header>
      <Content style={contentStyle}>
        <Row>
          <Col span={8}>
            <Flex align="center" justify="start">
              <Image style={imageStyle} src={SignupImage} placeholder="signup" preview={false} />
            </Flex>
          </Col>
          <Col span={16}>
            <Flex justify="center" vertical style={{ height: "100%", width: "100%" }}>
              <Typography.Title level={2}>Sign up</Typography.Title>
              <Typography.Paragraph type="secondary" style={{ marginBottom: "15px" }}>
                Let’s get you all set up so you can access your personal account.
              </Typography.Paragraph>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Row gutter={[16, 5]}>
                  {inputList.map(({ name, label, placeholder, tooltipText }) => (
                    <Col span="12" key={name}>
                      <Typography.Title level={5}>
                        {label}
                        <span style={{ color: "red" }}>*</span>
                      </Typography.Title>
                      <Controller
                        name={name as keyof SignupRequest}
                        control={control}
                        render={({ field }) =>
                          tooltipText ? (
                            <Tooltip title={tooltipText} overlayInnerStyle={overlayInnerStyle}>
                              <Input
                                {...field}
                                placeholder={placeholder}
                                style={{ ...inputStyle, borderColor: errors[name as keyof SignupRequest] ? "red" : "" }}
                              />
                            </Tooltip>
                          ) : (
                            <Input
                              {...field}
                              placeholder={placeholder}
                              style={{ ...inputStyle, borderColor: errors[name as keyof SignupRequest] ? "red" : "" }}
                            />
                          )
                        }
                      />
                      <div style={inputErrorStyle}>
                        {errors[name as keyof SignupRequest] && (
                          <Typography.Text type="danger">
                            {errors[name as keyof SignupRequest]?.message}
                          </Typography.Text>
                        )}
                      </div>
                    </Col>
                  ))}

                  <Col span={24}>
                    <Typography.Title level={5}>
                      Password<span style={{ color: "red" }}>*</span>
                    </Typography.Title>
                    <Controller
                      name="password"
                      control={control}
                      render={({ field }) => (
                        <Tooltip
                          title="Password must contain upper and lower case letters, a number, and a special character"
                          overlayInnerStyle={overlayInnerStyle}
                        >
                          <Input.Password
                            {...field}
                            placeholder="Please type your password!"
                            style={{ ...inputStyle, borderColor: errors.password ? "red" : "" }}
                          />
                        </Tooltip>
                      )}
                    />
                    <div style={inputErrorStyle}>
                      {errors.password && <Typography.Text type="danger">{errors.password.message}</Typography.Text>}
                    </div>
                  </Col>
                  <Col span={24}>
                    <Typography.Title level={5}>
                      Confirm Password<span style={{ color: "red" }}>*</span>
                    </Typography.Title>
                    <Controller
                      name="confirmPassword"
                      control={control}
                      render={({ field }) => (
                        <Tooltip title="Must match the password" overlayInnerStyle={overlayInnerStyle}>
                          <Input.Password
                            {...field}
                            placeholder="Please type your confirmed password!"
                            style={{ ...inputStyle, borderColor: errors.confirmPassword ? "red" : "" }}
                          />
                        </Tooltip>
                      )}
                    />
                    <div style={inputErrorStyle}>
                      {errors.confirmPassword && (
                        <Typography.Text type="danger">{errors.confirmPassword.message}</Typography.Text>
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
                    marginTop: "20px",
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

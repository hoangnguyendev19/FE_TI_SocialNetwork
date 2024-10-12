import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import {
  Button,
  Col,
  Flex,
  Image,
  Input,
  notification,
  Row,
  Tooltip,
  Typography,
} from "antd";
import { authApi } from "api";
import PasswordImage from "assets/images/img-password.png";
import { ROUTE, SetPasswordData } from "constants";
import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import {
  imageStyle,
  inputErrorStyle,
  inputStyle,
  overlayInnerStyle,
} from "styles";
import * as yup from "yup";

export const SetPassword: React.FC = () => {
  const navigate = useNavigate();
  // const {
  //   state: { email },
  // } = useLocation();

  const mutation = useMutation({
    mutationFn: (data: any) => authApi.setPassword(data),
    onSuccess: () => {
      navigate(ROUTE.LOGIN);
    },
    onError: (error: any) => {
      notification.error({
        message: error?.response?.data?.message || "Something went wrong!",
      });
    },
  });

  const schema = yup.object().shape({
    newPassword: yup
      .string()
      .required("New password is required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#\$%\^&\*\(\)_\+\[\]\{\};':"\\|,.<>\/?`~])[A-Za-z\d!@#\$%\^&\*\(\)_\+\[\]\{\};':"\\|,.<>\/?`~]{8,}$/,
        "Password must be at least 8 characters long, contain upper and lower case letters, a number, and a special character."
      ),
    confirmNewPassword: yup
      .string()
      .oneOf([yup.ref("newPassword")], "Passwords must match")
      .required("Confirm new password is required"),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SetPasswordData>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<SetPasswordData> = (data) => {
    mutation.mutate({
      ...data,
      email,
    });
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
                <Typography.Title level={5}>
                  New Password<span style={{ color: "red" }}>*</span>
                </Typography.Title>
                <Controller
                  name="newPassword"
                  control={control}
                  render={({ field }) => (
                    <Tooltip
                      title="Password must contain upper and lower case letters, a number, and a special character"
                      overlayInnerStyle={overlayInnerStyle}
                    >
                      <Input.Password
                        placeholder="Please type your new password!"
                        style={inputStyle}
                        {...field}
                        aria-invalid={!!errors.newPassword}
                      />
                    </Tooltip>
                  )}
                />
                <div style={inputErrorStyle}>
                  {errors.newPassword && (
                    <Typography.Text type="danger">
                      {errors.newPassword.message}
                    </Typography.Text>
                  )}
                </div>
              </Col>
              <Col className="gutter-row" span={24}>
                <Typography.Title level={5}>
                  Confirm New Password<span style={{ color: "red" }}>*</span>
                </Typography.Title>
                <Controller
                  name="confirmNewPassword"
                  control={control}
                  render={({ field }) => (
                    <Tooltip
                      title="Must match the password"
                      overlayInnerStyle={overlayInnerStyle}
                    >
                      <Input.Password
                        placeholder="Please type your confirm new password!"
                        style={inputStyle}
                        {...field}
                        aria-invalid={!!errors.confirmNewPassword}
                      />
                    </Tooltip>
                  )}
                />
                <div style={inputErrorStyle}>
                  {errors.confirmNewPassword && (
                    <Typography.Text type="danger">
                      {errors.confirmNewPassword.message}
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

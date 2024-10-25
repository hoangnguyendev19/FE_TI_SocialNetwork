import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { Button, Col, Input, notification, Row, Tooltip, Typography } from "antd";
import { userApi } from "api";
import { ErrorCode, ErrorMessage, PasswordRequest, ROUTE } from "constants";
import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { inputErrorStyle, inputStyle, overlayInnerStyle } from "styles";
import { removeToken } from "utils";
import * as yup from "yup";

export const Security: React.FC = () => {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (data: PasswordRequest) => userApi.updatePassword(data),
    onSuccess: () => {
      removeToken();
      navigate(ROUTE.LOGIN);
    },
    onError: (error: any) => {
      switch (error?.response?.data?.message) {
        case ErrorCode.WRONG_PASSWORD:
          notification.error({
            message: ErrorMessage.WRONG_PASSWORD,
          });
          break;
        case ErrorCode.PASSWORD_INVALID:
          notification.error({
            message: ErrorMessage.PASSWORD_INVALID,
          });
          break;
        case ErrorCode.CONFIRM_PASSWORD_DOES_NOT_MATCH:
          notification.error({
            message: ErrorMessage.CONFIRM_PASSWORD_DOES_NOT_MATCH,
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
    currentPassword: yup
      .string()
      .required("Current password is required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#\$%\^&\*\(\)_\+\[\]\{\};':"\\|,.<>\/?`~])[A-Za-z\d!@#\$%\^&\*\(\)_\+\[\]\{\};':"\\|,.<>\/?`~]{8,}$/,
        "Password must be at least 8 characters long, contain upper and lower case letters, a number, and a special character.",
      ),
    newPassword: yup
      .string()
      .required("New password is required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#\$%\^&\*\(\)_\+\[\]\{\};':"\\|,.<>\/?`~])[A-Za-z\d!@#\$%\^&\*\(\)_\+\[\]\{\};':"\\|,.<>\/?`~]{8,}$/,
        "Password must be at least 8 characters long, contain upper and lower case letters, a number, and a special character.",
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
  } = useForm<PasswordRequest>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<PasswordRequest> = (data) => {
    mutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Row gutter={[0, 5]}>
        <Col span={24}>
          <Typography.Title level={5}>
            Current Password<span style={{ color: "red" }}>*</span>
          </Typography.Title>
          <Controller
            name="currentPassword"
            control={control}
            render={({ field }) => (
              <Tooltip
                title="Current password must contain upper and lower case letters, a number, and a special character"
                overlayInnerStyle={overlayInnerStyle}
              >
                <Input.Password
                  {...field}
                  placeholder="Please type your current password"
                  style={{ ...inputStyle, borderColor: errors.currentPassword ? "red" : "" }}
                  visibilityToggle
                />
              </Tooltip>
            )}
          />
          <div style={inputErrorStyle}>
            {errors.currentPassword && (
              <Typography.Text type="danger">{errors.currentPassword.message}</Typography.Text>
            )}
          </div>
        </Col>

        <Col span={24}>
          <Typography.Title level={5}>
            New Password
            <span style={{ color: "red" }}>*</span>
          </Typography.Title>
          <Controller
            name="newPassword"
            control={control}
            render={({ field }) => (
              <Tooltip
                title="New password must contain upper and lower case letters, a number, and a special character"
                overlayInnerStyle={overlayInnerStyle}
              >
                <Input.Password
                  {...field}
                  placeholder="Please type your new password"
                  style={{ ...inputStyle, borderColor: errors.newPassword ? "red" : "" }}
                  visibilityToggle
                />
              </Tooltip>
            )}
          />
          <div style={inputErrorStyle}>
            {errors.newPassword && <Typography.Text type="danger">{errors.newPassword.message}</Typography.Text>}
          </div>
        </Col>

        <Col span={24}>
          <Typography.Title level={5}>
            Confirm New Password<span style={{ color: "red" }}>*</span>
          </Typography.Title>
          <Controller
            name="confirmNewPassword"
            control={control}
            render={({ field }) => (
              <Tooltip title="Must match the new password" overlayInnerStyle={overlayInnerStyle}>
                <Input.Password
                  {...field}
                  placeholder="Please confirm your new password"
                  style={{ ...inputStyle, borderColor: errors.confirmNewPassword ? "red" : "" }}
                  visibilityToggle
                />
              </Tooltip>
            )}
          />
          <div style={inputErrorStyle}>
            {errors.confirmNewPassword && (
              <Typography.Text type="danger">{errors.confirmNewPassword.message}</Typography.Text>
            )}
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
  );
};

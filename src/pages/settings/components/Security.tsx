import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { Button, Col, Input, notification, Row, Typography } from "antd";
import { userApi } from "api";
import { PasswordData } from "constants";
import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";

export const Security: React.FC = () => {
  const [defaultValues, setDefaultValues] = React.useState<PasswordData>({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const mutation = useMutation({
    mutationFn: (data: PasswordData) => userApi.updatePassword(data),
    onSuccess: (data) => {
      setDefaultValues({
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      });
      notification.success({
        message: data.message,
      });
    },
    onError: (error: any) => {
      notification.error({
        message: error?.response?.data?.message || "Failed to update password!",
      });
    },
  });

  const schema = yup.object().shape({
    currentPassword: yup
      .string()
      .required("Current password is required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#\$%\^&\*\(\)_\+\[\]\{\};':"\\|,.<>\/?`~])[A-Za-z\d!@#\$%\^&\*\(\)_\+\[\]\{\};':"\\|,.<>\/?`~]{8,}$/,
        "Password must be at least 8 characters long, contain upper and lower case letters, a number, and a special character."
      ),
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
  } = useForm<PasswordData>({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const onSubmit: SubmitHandler<PasswordData> = (data) => {
    mutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Row gutter={[0, 5]}>
        <Col span={24}>
          <Typography.Title level={5}>Current Password</Typography.Title>
          <Controller
            name="currentPassword"
            control={control}
            render={({ field }) => (
              <Input.Password
                {...field}
                placeholder="Please type your current password"
                style={{ padding: "5px 10px" }}
                visibilityToggle
              />
            )}
          />
          <div style={{ minHeight: "24px" }}>
            {errors.currentPassword && (
              <Typography.Text type="danger">
                {errors.currentPassword.message}
              </Typography.Text>
            )}
          </div>
        </Col>

        <Col span={24}>
          <Typography.Title level={5}>New Password</Typography.Title>
          <Controller
            name="newPassword"
            control={control}
            render={({ field }) => (
              <Input.Password
                {...field}
                placeholder="Please type your new password"
                style={{ padding: "5px 10px" }}
                visibilityToggle
              />
            )}
          />
          <div style={{ minHeight: "24px" }}>
            {errors.newPassword && (
              <Typography.Text type="danger">
                {errors.newPassword.message}
              </Typography.Text>
            )}
          </div>
        </Col>

        <Col span={24}>
          <Typography.Title level={5}>Confirm New Password</Typography.Title>
          <Controller
            name="confirmNewPassword"
            control={control}
            render={({ field }) => (
              <Input.Password
                {...field}
                placeholder="Please confirm your new password"
                style={{ padding: "5px 10px" }}
                visibilityToggle
              />
            )}
          />
          <div style={{ minHeight: "24px" }}>
            {errors.confirmNewPassword && (
              <Typography.Text type="danger">
                {errors.confirmNewPassword.message}
              </Typography.Text>
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

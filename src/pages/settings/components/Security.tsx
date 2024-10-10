import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Col, Input, notification, Row, Typography } from "antd";
import { userApi } from "api";
import { PasswordData, QueryKey } from "constants";
import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";

export const Security: React.FC = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: PasswordData) => userApi.updatePassword(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKey.AUTH] });
      notification.success({
        message: "Password updated successfully!",
      });
    },
    onError: (error) => {
      notification.error({
        message:
          error.message || "An error occurred while updating the password!",
      });
    },
  });

  const schema = yup.object().shape({
    currentPassword: yup.string().required("Current password is required"),
    newPassword: yup.string().required("New password is required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("newPassword")], "Passwords must match")
      .required("Confirm password is required"),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordData>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<PasswordData> = (data) => {
    mutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Row gutter={[0, 5]}>
        <Col span="24">
          <Typography.Title level={5}>Current password</Typography.Title>
          <Controller
            name="currentPassword"
            control={control}
            render={({ field }) => (
              <Input.Password
                {...field}
                placeholder="Please type your current password!"
                style={{ padding: "5px 10px" }}
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
        <Col span="24">
          <Typography.Title level={5}>New password</Typography.Title>
          <Controller
            name="newPassword"
            control={control}
            render={({ field }) => (
              <Input.Password
                {...field}
                placeholder="Please type your new password!"
                style={{ padding: "5px 10px" }}
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
        <Col span="24">
          <Typography.Title level={5}>Confirm password</Typography.Title>
          <Controller
            name="confirmPassword"
            control={control}
            render={({ field }) => (
              <Input.Password
                {...field}
                placeholder="Please type your confirm password!"
                style={{ padding: "5px 10px" }}
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

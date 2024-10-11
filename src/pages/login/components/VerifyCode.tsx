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
import LoginImage from "assets/images/img-login.png";
import { ROUTE, VerifyCodeData } from "constants";
import React from "react";
import { useNavigate } from "react-router-dom";
import { imageStyle } from "styles";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

export const VerifyCode: React.FC = () => {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (data: VerifyCodeData) => authApi.verifyCode(data),
    onSuccess: (data: any) => {
      console.log(data);

      // navigate(ROUTE.ROOT);
    },
    onError: (error: any) => {
      notification.error({
        message: error?.response?.data?.message || "Something went wrong!",
      });
    },
  });

  const schema = yup.object().shape({
    code: yup.string().required("Code is required"),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<VerifyCodeData>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<VerifyCodeData> = (data) => {
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
          <Typography.Link href={ROUTE.LOGIN}>
            <LeftOutlined /> Back to login
          </Typography.Link>
          <Typography.Title level={1}>Verify code</Typography.Title>
          <Typography.Paragraph
            type="secondary"
            style={{ marginBottom: "15px" }}
          >
            An authentication code has been sent to your email.
          </Typography.Paragraph>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="code"
              control={control}
              render={({ field }) => (
                <Input
                  placeholder="Please type your code!"
                  style={{ padding: "10px" }}
                  {...field}
                  aria-invalid={!!errors.code}
                />
              )}
            />
            <div style={{ minHeight: "24px" }}>
              {errors.code && (
                <Typography.Text type="danger">
                  {errors.code.message}
                </Typography.Text>
              )}
            </div>

            <Typography.Text>
              Didn’t receive a code?{" "}
              <Typography.Link type="danger" href="">
                Resend
              </Typography.Link>
            </Typography.Text>

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
      <Col span={12}>
        <Flex align="center" justify="center">
          <Image
            style={imageStyle}
            src={LoginImage}
            placeholder="Verify Code"
            preview={false}
          />
        </Flex>
      </Col>
    </Row>
  );
};

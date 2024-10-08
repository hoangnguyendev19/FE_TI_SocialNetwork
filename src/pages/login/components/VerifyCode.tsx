import { LeftOutlined } from "@ant-design/icons";
import { Button, Col, Flex, Image, Input, Row, Typography } from "antd";
import LoginImage from "assets/images/img-login.png";
import { ROUTE } from "constants";
import React from "react";
import { imageStyle } from "styles";

export const VerifyCode: React.FC = () => {
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
          <Input
            placeholder="Please type your code!"
            style={{ padding: "10px", marginBottom: "10px" }}
          />
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
          >
            Verify
          </Button>
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

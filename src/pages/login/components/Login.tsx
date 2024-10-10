import type { CheckboxProps } from "antd";
import {
  Button,
  Checkbox,
  Col,
  Flex,
  Image,
  Input,
  Row,
  Typography,
} from "antd";
import LoginImage from "assets/images/img-login.png";
import { ROUTE } from "constants";
import React from "react";
import { imageStyle } from "styles";

export const Login: React.FC = () => {
  const onChange: CheckboxProps["onChange"] = (e) => {
    console.log(`checked = ${e.target.checked}`);
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
          <Row gutter={[0, 15]}>
            <Col className="gutter-row" span={24}>
              <Input
                placeholder="Please type your email!"
                style={{ padding: "10px" }}
              />
            </Col>
            <Col className="gutter-row" span={24}>
              <Input.Password
                placeholder="Please type your password!"
                style={{ padding: "10px" }}
              />
            </Col>
            <Col className="gutter-row" span={24}>
              <Flex justify="space-between" align="center">
                <Checkbox onChange={onChange}>Remember me</Checkbox>
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
          >
            Login
          </Button>

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

import React from "react";
import {
  Layout,
  Image,
  Row,
  Typography,
  Col,
  Input,
  Flex,
  Checkbox,
  Button,
} from "antd";
import type { CheckboxProps } from "antd";
import LogoImage from "assets/images/img-logo.png";
import LoginImage from "assets/images/img-login.png";
import { contentStyle, headerStyle, imageStyle, layoutStyle } from "styles";
import { MENU } from "constants";

const { Header, Content } = Layout;

export const Login: React.FC = () => {
  const onChange: CheckboxProps["onChange"] = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };

  return (
    <Layout style={layoutStyle}>
      <Header style={headerStyle}>
        <Image width={120} src={LogoImage} placeholder="logo" preview={false} />
      </Header>
      <Content style={contentStyle}>
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
              <Input
                placeholder="Please type your email!"
                style={{ padding: "10px", marginBottom: "10px" }}
              />
              <Input.Password
                placeholder="Please type your password!"
                style={{ padding: "10px", marginBottom: "10px" }}
              />
              <Flex
                justify="space-between"
                align="center"
                style={{ width: "100%", marginBottom: "30px" }}
              >
                <Checkbox onChange={onChange}>Remember me</Checkbox>
                <Typography.Link type="danger">
                  Forgot password?
                </Typography.Link>
              </Flex>

              <Button
                type="primary"
                style={{
                  width: "100%",
                  padding: "20px 0",
                  marginBottom: "10px",
                }}
              >
                Login
              </Button>

              <Typography.Text style={{ textAlign: "center" }}>
                Don't have an account?{" "}
                <Typography.Link type="danger" href={MENU.SIGNUP}>
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
      </Content>
    </Layout>
  );
};

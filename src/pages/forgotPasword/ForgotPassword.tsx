import { LeftOutlined } from "@ant-design/icons";
import { Button, Col, Flex, Image, Input, Layout, Row, Typography } from "antd";
import LogoImage from "assets/images/img-logo.png";
import PasswordImage from "assets/images/img-password.png";
import { MENU } from "constants";
import React from "react";
import { contentStyle, headerStyle, imageStyle, layoutStyle } from "styles";

const { Header, Content } = Layout;

export const ForgotPassword: React.FC = () => {
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
              <Typography.Link href={MENU.LOGIN}>
                <LeftOutlined /> Back to login
              </Typography.Link>
              <Typography.Title level={1}>
                Forgot your password?
              </Typography.Title>
              <Typography.Paragraph
                type="secondary"
                style={{ marginBottom: "15px" }}
              >
                Don’t worry, happens to all of us. Enter your email below to
                recover your password
              </Typography.Paragraph>
              <Input
                type="email"
                placeholder="Please type your email!"
                style={{ padding: "10px" }}
              />

              <Button
                type="primary"
                style={{
                  width: "100%",
                  padding: "20px 0",
                  marginBottom: "10px",
                  marginTop: "30px",
                }}
              >
                Submit
              </Button>
            </Flex>
          </Col>
          <Col span={12}>
            <Flex align="center" justify="center">
              <Image
                style={imageStyle}
                src={PasswordImage}
                placeholder="Forgot Password"
                preview={false}
              />
            </Flex>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

import { LeftOutlined } from "@ant-design/icons";
import { Button, Col, Flex, Image, Input, Layout, Row, Typography } from "antd";
import LogoImage from "assets/images/img-logo.png";
import LoginImage from "assets/images/img-login.png";
import { MENU } from "constants";
import React from "react";
import { contentStyle, headerStyle, imageStyle, layoutStyle } from "styles";

const { Header, Content } = Layout;

export const VerifyCode: React.FC = () => {
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
      </Content>
    </Layout>
  );
};

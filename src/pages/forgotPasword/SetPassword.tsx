import { Button, Col, Flex, Image, Input, Layout, Row, Typography } from "antd";
import PasswordImage from "assets/images/img-password.png";
import LogoImage from "assets/images/img-logo.png";
import React from "react";
import { contentStyle, headerStyle, imageStyle, layoutStyle } from "styles";

const { Header, Content } = Layout;

export const SetPassword: React.FC = () => {
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
              <Typography.Title level={1}>Set a password</Typography.Title>
              <Typography.Paragraph
                type="secondary"
                style={{ marginBottom: "15px" }}
              >
                Your previous password has been reseted. Please set a new
                password for your account.
              </Typography.Paragraph>
              <Row gutter={[0, 15]}>
                <Col className="gutter-row" span={24}>
                  <Input.Password
                    placeholder="Please type your new password!"
                    style={{ padding: "10px" }}
                  />
                </Col>
                <Col className="gutter-row" span={24}>
                  <Input.Password
                    placeholder="Please re-type your new password!"
                    style={{ padding: "10px" }}
                  />
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
                Set password
              </Button>
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
      </Content>
    </Layout>
  );
};

import { Button, Col, Flex, Image, Input, Layout, Row, Typography } from "antd";
import LogoImage from "assets/images/img-logo.png";
import SignupImage from "assets/images/img-signup.png";
import { ROUTE } from "constants";
import React from "react";
import { contentStyle, headerStyle, imageStyle, layoutStyle } from "styles";

const { Header, Content } = Layout;

export const SignupPage: React.FC = () => {
  return (
    <Layout style={layoutStyle}>
      <Header style={headerStyle}>
        <Flex justify="flex-end">
          <Image
            width={120}
            src={LogoImage}
            placeholder="logo"
            preview={false}
          />
        </Flex>
      </Header>
      <Content style={contentStyle}>
        <Row>
          <Col span={12}>
            <Flex align="center" justify="center">
              <Image
                style={imageStyle}
                src={SignupImage}
                placeholder="login"
                preview={false}
              />
            </Flex>
          </Col>
          <Col span={12}>
            <Flex
              justify="center"
              vertical
              style={{ height: "100%", width: "100%" }}
            >
              <Typography.Title level={1}>Sign up</Typography.Title>
              <Typography.Paragraph
                type="secondary"
                style={{ marginBottom: "15px" }}
              >
                Let’s get you all st up so you can access your personal account.
              </Typography.Paragraph>
              <Row gutter={[16, 24]}>
                <Col className="gutter-row" span={12}>
                  <Input
                    placeholder="Please type your first name!"
                    style={{ padding: "10px" }}
                  />
                </Col>
                <Col className="gutter-row" span={12}>
                  <Input
                    placeholder="Please type your last name!"
                    style={{ padding: "10px" }}
                  />
                </Col>
                <Col className="gutter-row" span={12}>
                  <Input
                    type="email"
                    placeholder="Please type your email!"
                    style={{ padding: "10px" }}
                  />
                </Col>
                <Col className="gutter-row" span={12}>
                  <Input
                    placeholder="Please type your phone number!"
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
                  <Input.Password
                    placeholder="Please type your confirmed password!"
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
                  marginTop: "50px",
                }}
              >
                Create account
              </Button>

              <Typography.Text style={{ textAlign: "center" }}>
                Already have an account?{" "}
                <Typography.Link type="danger" href={ROUTE.LOGIN}>
                  Login
                </Typography.Link>
              </Typography.Text>
            </Flex>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

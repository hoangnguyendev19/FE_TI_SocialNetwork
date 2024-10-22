import { Image, Layout } from "antd";
import LogoImage from "assets/images/img-logo.png";
import React from "react";
import { useLocation } from "react-router-dom";
import { contentStyle, headerStyle, layoutStyle } from "styles";
import { ForgotPassword, Login, SetPassword, VerifyCode } from "./components";

const { Header, Content } = Layout;

const renderChildren = (children: string) => {
  switch (children) {
    case "/login":
      return <Login />;
    case "/forgot-password":
      return <ForgotPassword />;
    case "/forgot-password/verify-code":
      return <VerifyCode />;
    case "/forgot-password/set-password":
      return <SetPassword />;
    default:
      return <Login />;
  }
};

export const LoginPage: React.FC = () => {
  const location = useLocation();
  const children = location.pathname || "/login";

  return (
    <Layout style={layoutStyle}>
      <Header style={headerStyle}>
        <Image width={120} src={LogoImage} placeholder="logo" preview={false} />
      </Header>
      <Content style={contentStyle}>
        {renderChildren(children as string)}
      </Content>
    </Layout>
  );
};

import { Layout } from "antd";
import { SideBar, HeaderTop } from "components";
import React from "react";
import { layoutStyle, siderStyle } from "styles";

const { Content, Sider } = Layout;

export const Home: React.FC = () => {
  return (
    <Layout style={layoutStyle}>
      <HeaderTop />
      <Layout>
        <Sider width="15%" style={siderStyle}>
          <SideBar />
        </Sider>
        <Content>Content</Content>
      </Layout>
    </Layout>
  );
};

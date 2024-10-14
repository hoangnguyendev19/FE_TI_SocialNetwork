import { Layout } from "antd";
import { HeaderTop, SideBar } from "components";
import { Outlet } from "react-router-dom";
import { layoutStyle, siderStyle } from "styles";

const { Content, Sider } = Layout;

export const App = () => {
  return (
    <Layout style={layoutStyle}>
      <HeaderTop />
      <Layout>
        <Sider width="15%" style={siderStyle}>
          <SideBar />
        </Sider>
        <Content>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

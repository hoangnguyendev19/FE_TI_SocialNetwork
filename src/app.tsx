import { Layout } from "antd";
import { HeaderTop, SideBar } from "components";
import { ROUTE } from "constants";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { layoutStyle, siderStyle } from "styles";
import { getAccessToken, getRefreshToken } from "utils";

const { Content, Sider } = Layout;

export const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!getAccessToken() && !getRefreshToken()) {
      navigate(ROUTE.LOGIN);
      return;
    }
  }, [navigate]);

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

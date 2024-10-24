import { SettingFilled, UserOutlined } from "@ant-design/icons";
import { Avatar, Flex, Image, Layout, Row, Skeleton } from "antd";
import LogoImage from "assets/images/img-logo.png";
import { Color, ROUTE } from "constants";
import { useProfile } from "hooks";
import { useNavigate } from "react-router-dom";
import { headerStyle } from "styles";

const { Header } = Layout;

export const HeaderTop: React.FC = () => {
  const navigate = useNavigate();
  const { data: res, isLoading }: any = useProfile({
    enabled: true,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  return (
    <Header style={headerStyle}>
      <Flex justify="space-between" align="center">
        <Image width={120} src={LogoImage} placeholder="logo" preview={false} />
        <Row>
          <Avatar
            size={44}
            style={{
              backgroundColor: Color.PRIMARY,
              color: "#000",
              border: "1px solid gray",
              marginRight: "20px",
              cursor: "pointer",
            }}
            icon={<SettingFilled />}
            alt="Settings"
            onClick={() => navigate(ROUTE.SETTINGS)}
          />
          {isLoading ? (
            <Skeleton.Avatar active size="large" shape="circle" />
          ) : res?.data?.profilePictureUrl ? (
            <Avatar size={44} src={res?.data?.profilePictureUrl} alt="Avatar" />
          ) : (
            <Avatar size={44} icon={<UserOutlined />} alt="Avatar" />
          )}
        </Row>
      </Flex>
    </Header>
  );
};

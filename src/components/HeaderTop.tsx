import { SettingFilled, UserOutlined } from "@ant-design/icons";
import { Avatar, Flex, Image, Layout, Row } from "antd";
import AvatarImage from "assets/images/img-avatar.png";
import LogoImage from "assets/images/img-logo.png";
import { Color, ROUTE } from "constants";
import { useProfile } from "hooks";
import { useNavigate } from "react-router-dom";
import { headerStyle } from "styles";

const { Header } = Layout;

export const HeaderTop = () => {
  const navigate = useNavigate();
  const { data: userProfile, isLoading }: any = useProfile({
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
            <Avatar
              size={44}
              src={userProfile?.profilePictureUrl}
              alt="Avatar"
            />
          ) : (
            <Avatar size={44} icon={<UserOutlined />} alt="Avatar" />
          )}
        </Row>
      </Flex>
    </Header>
  );
};

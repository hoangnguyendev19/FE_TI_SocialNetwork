import { SettingFilled } from "@ant-design/icons";
import { Avatar, Flex, Image, Layout } from "antd";
import AvatarImage from "assets/images/img-avatar.png";
import LogoImage from "assets/images/img-logo.png";
import { Color } from "constants";
import { headerStyle } from "styles";

const { Header } = Layout;

export const HeaderTop = () => {
  return (
    <Header style={headerStyle}>
      <Flex justify="space-between" align="center">
        <Image width={120} src={LogoImage} placeholder="logo" preview={false} />
        <div>
          <Avatar
            size={44}
            style={{
              backgroundColor: Color.PRIMARY,
              color: "#000",
              border: "1px solid gray",
              marginRight: "20px",
            }}
            icon={<SettingFilled />}
            alt="Settings"
          />
          <Avatar size={44} src={AvatarImage} alt="Avatar" />
        </div>
      </Flex>
    </Header>
  );
};

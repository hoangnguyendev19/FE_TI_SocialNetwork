import { Flex, Image, Space, Typography } from "antd";
import BoardingHouseImage from "assets/images/img-boarding-house.png";
import { Color, ROUTE } from "constants";
import { useNavigate } from "react-router-dom";

export const BoardingHouse: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Flex style={{ width: "100%", height: "100%" }} align="center" justify="center">
      <Space direction="vertical" align="center">
        <Image src={BoardingHouseImage} alt="Boarding house" preview={false} />
        <Space
          direction="vertical"
          align="center"
          size={2}
          style={{
            borderRadius: "15px",
            padding: "10px 100px",
            backgroundColor: Color.SECONDARY,
            cursor: "pointer",
            marginTop: "30px",
          }}
          onClick={() => navigate(ROUTE.REGISTER_TO_BECOME)}
        >
          <Typography
            style={{
              fontSize: "18px",
              color: "#fff",
            }}
          >
            Register to become
          </Typography>
          <Typography
            style={{
              fontSize: "18px",
              color: "#fff",
            }}
          >
            a boarding house
          </Typography>
        </Space>
      </Space>
    </Flex>
  );
};

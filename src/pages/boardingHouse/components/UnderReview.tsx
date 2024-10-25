import { Flex, Image, Space, Typography } from "antd";
import { Color } from "constants";
import UnderReviewImage from "assets/images/img-boarding-house-review.png";

export const UnderReview: React.FC = () => {
  return (
    <Flex style={{ width: "100%", height: "100%" }} align="center" justify="center">
      <Space direction="vertical" align="center">
        <Image src={UnderReviewImage} alt="Boarding house" preview={false} />
        <Space
          direction="vertical"
          align="center"
          size={2}
          style={{
            borderRadius: "15px",
            padding: "10px 40px",
            backgroundColor: "#E4F7E8",
            marginTop: "30px",
            border: `1px solid ${Color.ACCENT_ONE}`,
          }}
        >
          <Typography
            style={{
              fontSize: "18px",
              color: "rgba(0,0,0,0.5)",
            }}
          >
            Your boarding house is under review
          </Typography>
        </Space>
      </Space>
    </Flex>
  );
};

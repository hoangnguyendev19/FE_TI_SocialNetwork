import { Col, Skeleton } from "antd";
import { Color } from "constants";

export const SkeletonRoomItem: React.FC = () => {
  return (
    <Col
      span={7}
      style={{
        padding: "10px 15px",
        backgroundColor: Color.PRIMARY,
        borderRadius: "10px",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
      }}
    >
      <Skeleton active paragraph={{ rows: 5 }} />
    </Col>
  );
};

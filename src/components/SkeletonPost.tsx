import { Col, Flex, Skeleton } from "antd";
import { Color } from "constants";
import React from "react";

export const SkeletonPost: React.FC = () => {
  return (
    <Col
      span="24"
      style={{
        backgroundColor: Color.PRIMARY,
        padding: "15px 20px",
        borderRadius: "10px",
        border: `1px solid rgba(0, 0, 0, 0.2)`,
      }}
    >
      <Skeleton active avatar paragraph={{ rows: 0 }} />

      <Skeleton active paragraph={{ rows: 3 }} />

      <div style={{ padding: "15px 0" }}>
        <Skeleton.Image style={{ width: "600px", height: "350px" }} />
      </div>

      <Col span="24">
        <Flex justify="start" align="center">
          <Skeleton.Button
            active
            size="small"
            shape="square"
            style={{
              marginRight: "10px",
            }}
          />
          <Skeleton.Button
            active
            size="small"
            shape="square"
            style={{
              marginRight: "10px",
            }}
          />
          <Skeleton.Button active size="small" shape="square" />
        </Flex>
      </Col>
    </Col>
  );
};

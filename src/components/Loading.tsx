import { Flex, Spin } from "antd";

const contentStyle: React.CSSProperties = {
  padding: 50,
  background: "rgba(0, 0, 0, 0.05)",
  borderRadius: 4,
};

const content = <div style={contentStyle} />;

export const Loading: React.FC = () => {
  return (
    <Flex justify="center" align="center" style={{ width: "100%", height: "100%" }}>
      <Spin size="large" tip="Loading...">
        {content}
      </Spin>
    </Flex>
  );
};

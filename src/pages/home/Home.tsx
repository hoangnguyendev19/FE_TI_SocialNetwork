import { Typography } from "antd";
import { Color } from "constants";
import React from "react";

export const Home: React.FC = () => {
  return (
    <div>
      <Typography.Title level={1} style={{ color: Color.SENCONDARY }}>
        Home page!
      </Typography.Title>
    </div>
  );
};

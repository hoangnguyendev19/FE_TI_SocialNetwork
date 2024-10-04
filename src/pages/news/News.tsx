import { Typography } from "antd";
import { Color } from "constants";
import React from "react";

export const News: React.FC = () => {
  return (
    <div>
      <Typography.Title level={1} style={{ color: Color.SENCONDARY }}>
        News!
      </Typography.Title>
    </div>
  );
};

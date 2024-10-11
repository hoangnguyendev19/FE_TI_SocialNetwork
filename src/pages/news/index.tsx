import { Typography } from "antd";
import { Color } from "constants";
import React from "react";

export const NewsPage: React.FC = () => {
  return (
    <div>
      <Typography.Title level={1} style={{ color: Color.SENCONDARY }}>
        News page!
      </Typography.Title>
    </div>
  );
};

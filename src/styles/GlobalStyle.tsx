import { Color } from "constants";
import React from "react";

export const layoutStyle: React.CSSProperties = {
  width: "100vw",
  height: "100vh",
  backgroundColor: Color.PRIMARY,
};

export const headerStyle: React.CSSProperties = {
  backgroundColor: Color.PRIMARY,
  margin: "20px 0",
};

export const contentStyle: React.CSSProperties = {
  color: "#fff",
  padding: "0 100px",
};

export const siderStyle: React.CSSProperties = {
  color: "#fff",
  backgroundColor: Color.PRIMARY,
};

export const imageStyle: React.CSSProperties = {
  maxWidth: "400px",
  maxHeight: "500px",
  borderRadius: "30px 0px 0px 0px",
  objectFit: "cover",
};

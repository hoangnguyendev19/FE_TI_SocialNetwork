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
  height: "100vh",
  padding: "0 50px",
};

export const imageStyle: React.CSSProperties = {
  maxWidth: "500px",
  maxHeight: "816px",
  borderRadius: "30px 0px 0px 0px",
  objectFit: "cover",
  textAlign: "center",
};

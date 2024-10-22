import { Color } from "constants";
import React from "react";

export const layoutStyle: React.CSSProperties = {
  width: "100vw",
  height: "100vh",
  backgroundColor: Color.PRIMARY,
};

export const headerStyle: React.CSSProperties = {
  backgroundColor: Color.PRIMARY,
  margin: "10px 0",
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
  maxWidth: "500px",
  maxHeight: "550px",
  borderRadius: "30px 0px 0px 0px",
  objectFit: "cover",
};

export const overlayInnerStyle = {
  backgroundColor: "white",
  color: "black",
  padding: "10px",
  borderRadius: "5px",
};

export const inputStyle = {
  padding: "10px",
  borderRadius: "8px",
  width: "100%",
};

export const inputErrorStyle = {
  marginTop: "5px",
};

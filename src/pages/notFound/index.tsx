import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";
import React from "react";
import { ROUTE } from "constants";

export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  const handleBackHome = () => {
    navigate(ROUTE.ROOT);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Button type="primary" onClick={handleBackHome}>
            Back to Home
          </Button>
        }
      />
    </div>
  );
};

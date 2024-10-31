import { CloseOutlined } from "@ant-design/icons";
import { Card, Input, Space, Typography } from "antd";
import React from "react";
import { inputStyle } from "styles";

interface PersonCardProps {
  id: number;
  fullName: string;
  phoneNumber: string;
  handleRemovePersonCard: (email: string) => void;
  handlePersonChange: (index: number, field: "fullName" | "phoneNumber", value: string) => void;
}

export const PersonCard: React.FC<PersonCardProps> = ({
  id,
  fullName,
  phoneNumber,
  handleRemovePersonCard,
  handlePersonChange,
}) => {
  return (
    <Card
      size="small"
      title={`Person ${id + 1}`}
      extra={<CloseOutlined style={{ cursor: "pointer" }} onClick={() => handleRemovePersonCard(phoneNumber)} />}
      style={{ width: "100%" }}
    >
      <Space direction="vertical" style={{ width: "100%" }}>
        <div>
          <Typography.Title level={5}>Full Name</Typography.Title>
          <Input
            style={inputStyle}
            placeholder="Please type your full name!"
            value={fullName}
            onChange={(e) => handlePersonChange(id, "fullName", e.target.value)}
          />
        </div>
        <div>
          <Typography.Title level={5}>Phone Number</Typography.Title>
          <Input
            style={inputStyle}
            placeholder="Please type your phone number!"
            value={phoneNumber}
            onChange={(e) => handlePersonChange(id, "phoneNumber", e.target.value)}
          />
        </div>
      </Space>
    </Card>
  );
};

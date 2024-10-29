import { DollarOutlined, EllipsisOutlined, UsergroupAddOutlined } from "@ant-design/icons";
import { Col, Dropdown, Flex, Image, MenuProps, Typography } from "antd";
import PaperIcon from "assets/images/img-icon-paper.png";
import PlugIcon from "assets/images/img-icon-plug.png";
import WaterIcon from "assets/images/img-icon-water.png";
import { Color, RoomResponse } from "constants";
import { useState } from "react";
import { ResetRoom } from "./ResetRoom";

interface RoomItemProps {
  room: RoomResponse;
}

export const RoomItem: React.FC<RoomItemProps> = ({ room }) => {
  const { id, roomName, roomRate, roomStatus, electricityMeterOldNumber, waterMeterOldNumber, payment, createdAt } =
    room;

  const [isResetRoomModal, setIsResetRoomModal] = useState(false);

  const items: MenuProps["items"] = [
    {
      label: "Reset",
      key: "0",
      onClick: () => {
        setIsResetRoomModal(true);
      },
    },
    {
      type: "divider",
    },
  ];

  return (
    <Col
      span={7}
      style={{
        padding: "10px 15px",
        backgroundColor: Color.PRIMARY,
        borderRadius: "10px",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
      }}
    >
      <Flex justify="center" align="center" style={{ marginBottom: "5px" }}>
        <Image src={PaperIcon} alt="Paper icon" />
        <Typography.Text style={{ fontSize: "14px", color: "#000", marginLeft: "5px", fontWeight: "bold" }}>
          {roomName}
        </Typography.Text>
        <Typography.Text
          style={{
            fontSize: "12px",
            color: "#00B884",
            backgroundColor: Color.ACCENT_ONE,
            padding: "5px 10px",
            borderRadius: "15px",
            marginLeft: "5px",
            fontWeight: "bold",
          }}
        >
          {roomStatus === "FULL_ROOM" ? "Full Room" : "Room Available"}
        </Typography.Text>
        <div style={{ marginLeft: "auto" }}>
          <Dropdown menu={{ items }} trigger={["click"]} placement="bottomRight">
            <a onClick={(e) => e.preventDefault()}>
              <EllipsisOutlined style={{ color: "black", fontSize: "20px" }} />
            </a>
          </Dropdown>
        </div>
      </Flex>
      <Typography.Text style={{ fontSize: "12px", color: "#000", marginTop: "5px" }}>
        Created At: <Typography.Text style={{ fontWeight: "bold" }}>{createdAt}</Typography.Text>
      </Typography.Text>
      <Flex align="center" style={{ marginTop: "5px" }}>
        <UsergroupAddOutlined style={{ fontSize: "16px" }} />
        <Typography.Text style={{ fontSize: "12px", marginLeft: "5px", color: "#000" }}>
          Number of people: <Typography.Text style={{ fontWeight: "bold" }}>3</Typography.Text>
        </Typography.Text>
      </Flex>
      <Flex align="center" style={{ marginTop: "5px" }}>
        <DollarOutlined style={{ fontSize: "16px" }} />
        <Typography.Text style={{ fontSize: "12px", marginLeft: "5px", color: "#000" }}>
          Room rate: <Typography.Text style={{ fontWeight: "bold" }}>{roomRate}</Typography.Text>
        </Typography.Text>
      </Flex>
      <Flex align="center" style={{ marginTop: "5px" }}>
        <Image src={PlugIcon} alt="Plug icon" style={{ objectFit: "cover", width: "16px", height: "16px" }} />
        <Typography.Text style={{ fontSize: "12px", marginLeft: "5px", color: "#000" }}>
          Electricity meter number:{" "}
          <Typography.Text style={{ fontWeight: "bold" }}>{electricityMeterOldNumber}</Typography.Text>
        </Typography.Text>
      </Flex>
      <Flex align="center" style={{ marginTop: "5px" }}>
        <Image src={WaterIcon} alt="Water icon" style={{ objectFit: "cover", width: "16px", height: "16px" }} />
        <Typography.Text style={{ fontSize: "12px", marginLeft: "5px", color: "#000" }}>
          Water meter number: <Typography.Text style={{ fontWeight: "bold" }}>{waterMeterOldNumber}</Typography.Text>
        </Typography.Text>
      </Flex>
      <Flex align="center" justify="space-between" style={{ marginTop: "5px" }}>
        <Typography.Text
          style={{
            fontSize: "12px",
            color: "#FD71AF",
            backgroundColor: Color.ACCENT_TWO,
            padding: "5px 10px",
            borderRadius: "15px",
            marginLeft: "5px",
            fontWeight: "bold",
          }}
        >
          {payment?.status}
        </Typography.Text>
        <Flex align="center">
          <DollarOutlined style={{ fontSize: "16px" }} />
          <Typography.Text style={{ fontSize: "12px", marginLeft: "5px", color: "#000" }}>
            {payment?.totalAmount} VND
          </Typography.Text>
        </Flex>
      </Flex>

      <ResetRoom isModalOpen={isResetRoomModal} setIsModalOpen={setIsResetRoomModal} id={id} name={roomName} />
    </Col>
  );
};

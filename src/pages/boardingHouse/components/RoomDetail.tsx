import { Button, Col, Divider, Input, Modal, Row, Space, Table, Typography } from "antd";
import { Color, QueryKey } from "constants";
import { useRoomDetail } from "hooks";
import React, { useState } from "react";
import { inputStyle } from "styles";
import type { TableProps } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { UpdatePeople } from "./UpdatePeople";
import { DeletePeople } from "./DeletePeople";
import { useQueryClient } from "@tanstack/react-query";

interface RoomDetailProps {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  id: string;
}

interface DataType {
  key: number;
  roomUserId: string;
  fullName: string;
  phoneNumber: string;
}

export const RoomDetail: React.FC<RoomDetailProps> = ({ isModalOpen, setIsModalOpen, id }) => {
  const [roomUserId, setRoomUserId] = useState("");
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isUpdatePeopleModal, setIsUpdatePeopleModal] = useState(false);
  const [isDeletePeopleModal, setIsDeletePeopleModal] = useState(false);

  const queryClient = useQueryClient();

  const { data, isLoading } = useRoomDetail(
    {
      enabled: true,
    },
    id,
  );

  const handleEdit = (record: DataType) => {
    setRoomUserId(record.roomUserId);
    setFullName(record.fullName);
    setPhoneNumber(record.phoneNumber);
    setIsUpdatePeopleModal(true);
  };

  const handleDelete = (record: DataType) => {
    setRoomUserId(record.roomUserId);
    setFullName(record.fullName);
    setPhoneNumber(record.phoneNumber);
    setIsDeletePeopleModal(true);
  };

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "No.",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Full Name",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="small">
          <Button type="link" icon={<EditOutlined />} onClick={() => handleEdit(record)} />
          <Button type="link" icon={<DeleteOutlined />} onClick={() => handleDelete(record)} />
        </Space>
      ),
    },
  ];

  const handleCancel = () => {
    queryClient.resetQueries({ queryKey: [QueryKey.ROOM] });
    setIsModalOpen(false);
  };

  return (
    <Modal open={isModalOpen} onCancel={handleCancel} okText="Save" onOk={handleCancel} style={{ top: 20 }}>
      <Typography.Title level={4} style={{ color: Color.SECONDARY }}>
        Room Detail
      </Typography.Title>
      <Divider style={{ margin: "15px 0", borderBlockColor: "#000" }} />

      <Row gutter={[0, 10]} style={{ paddingTop: "10px", paddingBottom: "20px" }}>
        <Col className="gutter-row" span={24}>
          <Typography.Title level={5}>Room Name</Typography.Title>
          <Input style={{ ...inputStyle, color: "#000" }} value={data?.roomName} disabled />
        </Col>
        <Col className="gutter-row" span={24}>
          <Typography.Title level={5}>Room Rate</Typography.Title>
          <Input type="number" style={{ ...inputStyle, color: "#000" }} value={data?.roomRate} disabled />
        </Col>
        <Col className="gutter-row" span={24}>
          <Row gutter={[15, 10]}>
            <Col className="gutter-row" span={12}>
              <Typography.Title level={5}>Electricity meter old number</Typography.Title>
              <Input
                type="number"
                style={{ ...inputStyle, color: "#000" }}
                value={data?.electricMeterOldNumber || 0}
                disabled
              />
            </Col>
            <Col className="gutter-row" span={12}>
              <Typography.Title level={5}>Electricity meter new number</Typography.Title>
              <Input
                type="number"
                style={{ ...inputStyle, color: "#000" }}
                value={data?.electricMeterNewNumber || 0}
                disabled
              />
            </Col>
            <Col className="gutter-row" span={12}>
              <Typography.Title level={5}>Water meter old number</Typography.Title>
              <Input
                type="number"
                style={{ ...inputStyle, color: "#000" }}
                value={data?.waterMeterOldNumber || 0}
                disabled
              />
            </Col>
            <Col className="gutter-row" span={12}>
              <Typography.Title level={5}>Water meter new number</Typography.Title>
              <Input
                type="number"
                style={{ ...inputStyle, color: "#000" }}
                value={data?.waterMeterNewNumber || 0}
                disabled
              />
            </Col>
          </Row>
        </Col>
        <Col className="gutter-row" span={24} style={{ marginTop: "10px" }}>
          <Table<DataType>
            columns={columns}
            dataSource={data ? [...data?.users].map((user, index) => ({ ...user, key: index + 1 })) : []}
            loading={isLoading}
            showHeader={true}
            pagination={false}
            bordered
            size="small"
          />
        </Col>
      </Row>

      <UpdatePeople
        isModalOpen={isUpdatePeopleModal}
        setIsModalOpen={setIsUpdatePeopleModal}
        id={id}
        roomUserId={roomUserId}
        name={data?.roomName}
        fullName={fullName}
        setFullName={setFullName}
        phoneNumber={phoneNumber}
        setPhoneNumber={setPhoneNumber}
      />
      <DeletePeople
        isModalOpen={isDeletePeopleModal}
        setIsModalOpen={setIsDeletePeopleModal}
        id={id}
        roomUserId={roomUserId}
        name={data?.roomName}
        fullName={fullName}
        phoneNumber={phoneNumber}
      />
    </Modal>
  );
};

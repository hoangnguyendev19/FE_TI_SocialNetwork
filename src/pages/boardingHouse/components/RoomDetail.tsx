import { Button, Col, Divider, Input, Modal, Row, Space, Table, Typography } from "antd";
import { Color } from "constants";
import { useRoomDetail } from "hooks";
import React, { useState } from "react";
import { inputStyle } from "styles";
import type { TableProps } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { UpdatePeople } from "./UpdatePeople";
import { DeletePeople } from "./DeletePeople";

interface RoomDetailProps {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  id: string;
}

interface DataType {
  key: string;
  fullName: string;
  phoneNumber: string;
}

const dataSource: DataType[] = [
  {
    key: "1",
    fullName: "John Brown",
    phoneNumber: "0987654321",
  },
  {
    key: "2",
    fullName: "Jim Green",
    phoneNumber: "0987654321",
  },
  {
    key: "3",
    fullName: "Joe Black",
    phoneNumber: "0987654321",
  },
];

export const RoomDetail: React.FC<RoomDetailProps> = ({ isModalOpen, setIsModalOpen, id }) => {
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isUpdatePeopleModal, setIsUpdatePeopleModal] = useState(false);
  const [isDeletePeopleModal, setIsDeletePeopleModal] = useState(false);

  const { data, isLoading } = useRoomDetail(
    {
      enabled: true,
    },
    id,
  );

  console.log(data, isLoading);
  const handleEdit = (record: DataType) => {
    setFullName(record.fullName);
    setPhoneNumber(record.phoneNumber);
    setIsUpdatePeopleModal(true);
  };

  const handleDelete = (record: DataType) => {
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
          <Input style={{ ...inputStyle, color: "#000" }} value="" disabled />
        </Col>
        <Col className="gutter-row" span={24}>
          <Typography.Title level={5}>Room Rate</Typography.Title>
          <Input type="number" style={{ ...inputStyle, color: "#000" }} value="" disabled />
        </Col>
        <Col className="gutter-row" span={24}>
          <Row gutter={[15, 10]}>
            <Col className="gutter-row" span={12}>
              <Typography.Title level={5}>Electricity meter old number</Typography.Title>
              <Input type="number" style={{ ...inputStyle, color: "#000" }} value="" disabled />
            </Col>
            <Col className="gutter-row" span={12}>
              <Typography.Title level={5}>Electricity meter new number</Typography.Title>
              <Input type="number" style={{ ...inputStyle, color: "#000" }} value="" disabled />
            </Col>
            <Col className="gutter-row" span={12}>
              <Typography.Title level={5}>Water meter old number</Typography.Title>
              <Input type="number" style={{ ...inputStyle, color: "#000" }} value="" disabled />
            </Col>
            <Col className="gutter-row" span={12}>
              <Typography.Title level={5}>Water meter new number</Typography.Title>
              <Input type="number" style={{ ...inputStyle, color: "#000" }} value="" disabled />
            </Col>
          </Row>
        </Col>
        <Col className="gutter-row" span={24} style={{ marginTop: "10px" }}>
          <Table<DataType> columns={columns} dataSource={dataSource} pagination={false} bordered size="small" />
        </Col>
      </Row>

      <UpdatePeople
        isModalOpen={isUpdatePeopleModal}
        setIsModalOpen={setIsUpdatePeopleModal}
        id=""
        name=""
        fullName={fullName}
        phoneNumber={phoneNumber}
      />
      <DeletePeople
        isModalOpen={isDeletePeopleModal}
        setIsModalOpen={setIsDeletePeopleModal}
        id=""
        name=""
        fullName={fullName}
        phoneNumber={phoneNumber}
      />
    </Modal>
  );
};

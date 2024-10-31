import { PlusOutlined } from "@ant-design/icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Divider, Input, Modal, Typography, notification } from "antd";
import { roomApi } from "api";
import { Color, ErrorCode, ErrorMessage, QueryKey } from "constants";
import React, { useState } from "react";
import { inputStyle } from "styles";
import { PersonCard } from "./PersonCard";

interface AddPeopleProps {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  id: string;
  name: string;
}

export const AddPeople: React.FC<AddPeopleProps> = ({ isModalOpen, setIsModalOpen, id, name }) => {
  const [people, setPeople] = useState<{ fullName: string; phoneNumber: string }[]>([]);

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: () => roomApi.addPeople(id, people),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKey.ROOM] });
      handleCancel();
      notification.success({
        message: "Add people successfully.",
      });
    },
    onError: (error: any) => {
      switch (error?.response?.data?.message) {
        case ErrorCode.USER_DOES_NOT_EXIST: {
          notification.error({
            message: ErrorMessage.USER_DOES_NOT_EXIST,
          });
          break;
        }

        default:
          notification.error({
            message: "Failed to add people.",
          });
          break;
      }
      setIsModalOpen(false);
    },
  });

  const handleOk = () => {
    if (people.length === 0) {
      notification.error({
        message: "Please add at least one person.",
      });
      return;
    }

    // check if there is a person with empty full name or phone number
    const hasEmptyPerson = people.some((person) => person.fullName === "" || person.phoneNumber === "");
    if (hasEmptyPerson) {
      notification.error({
        message: "Please fill in all fields.",
      });
      return;
    }

    // check if phone number have 10 digits
    const hasInvalidPhoneNumber = people.some((person) => person.phoneNumber.length !== 10);
    if (hasInvalidPhoneNumber) {
      notification.error({
        message: "Phone number must have 10 digits.",
      });
      return;
    }

    // check if there is a duplicate phone number
    const phoneNumbers = people.map((person) => person.phoneNumber);
    const hasDuplicatePhoneNumber = new Set(phoneNumbers).size !== phoneNumbers.length;
    if (hasDuplicatePhoneNumber) {
      notification.error({
        message: "Duplicate phone number.",
      });
      return;
    }

    mutation.mutate();
  };

  const handleCancel = () => {
    setPeople([]);
    setIsModalOpen(false);
  };

  const handleAddPersonCard = () => {
    setPeople([...people, { fullName: "", phoneNumber: "" }]);
  };

  const handleRemovePersonCard = (phoneNumber: string) => {
    setPeople(people.filter((person) => person.phoneNumber !== phoneNumber));
  };

  const handlePersonChange = (index: number, field: "fullName" | "phoneNumber", value: string) => {
    const updatedPeople = [...people];
    updatedPeople[index][field] = value;
    setPeople(updatedPeople);
  };

  return (
    <Modal open={isModalOpen} onCancel={handleCancel} okText="Save" onOk={handleOk} style={{ maxWidth: "600px" }}>
      <Typography.Title level={4} style={{ color: Color.SECONDARY }}>
        Add People
      </Typography.Title>
      <Divider style={{ margin: "15px 0" }} />

      <div style={{ marginBottom: "15px" }}>
        <Typography.Title level={5}>Room Name</Typography.Title>
        <Input style={{ ...inputStyle, color: "#000" }} value={name} disabled />
      </div>

      <div style={{ display: "flex", alignItems: "center", marginBottom: "15px" }}>
        <Typography.Title level={5}>Add people</Typography.Title>
        <Button
          type="primary"
          size="small"
          icon={<PlusOutlined />}
          style={{ marginLeft: "10px" }}
          onClick={handleAddPersonCard}
        />
      </div>

      {people.map((person, index) => (
        <PersonCard
          key={index}
          id={index}
          fullName={person.fullName}
          phoneNumber={person.phoneNumber}
          handleRemovePersonCard={handleRemovePersonCard}
          handlePersonChange={handlePersonChange}
        />
      ))}
    </Modal>
  );
};

import { FilterOutlined, PlusOutlined, RollbackOutlined, SettingFilled } from "@ant-design/icons";
import { Avatar, Button, Col, Flex, Input, Pagination, PaginationProps, Row, Space, Typography } from "antd";
import { Color, RoomResponse } from "constants";
import { useBoardingHouse, useRoom } from "hooks";
import React, { useState } from "react";
import { AddNewRoom } from "./AddNewRoom";
import { RoomItem } from "./RoomItem";
import { Settings } from "./Settings";
import { SkeletonRoomItem } from "./SkeletonRoomItem";

export const Room: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isSettingsModal, setIsSettingsModal] = useState(false);
  const [isAddNewRoomModal, setIsAddNewRoomModal] = useState(false);

  const [roomStatus, setRoomStatus] = useState<any>("");
  const [paymentStatus, setPaymentStatus] = useState<any>("");
  const [date, setDate] = useState<any>("");

  const { data: boardingHouse } = useBoardingHouse({ enabled: false });

  const { data, isFetching, refetch } = useRoom(
    { enabled: true, staleTime: 60000, initialPageParam: currentPage },
    {
      page: currentPage,
      size: 6,
      sortField: "createdAt",
      sortBy: "DESC",
      filter: {
        boardingHouseId: boardingHouse?.id,
        roomStatus,
        paymentStatus,
        date,
      },
    },
  );

  const onChangePage = (page: number) => {
    setCurrentPage(page);
    refetch();
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
  };

  const itemRender: PaginationProps["itemRender"] = (_, type, originalElement) => {
    if (type === "prev") return <a style={{ marginRight: 8 }}>Previous</a>;
    if (type === "next") return <a style={{ marginLeft: 8 }}>Next</a>;
    return originalElement;
  };

  const handleResetFilter = () => {
    setRoomStatus("");
    setPaymentStatus("");
    setDate(undefined);
    refetch();
  };

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <Row style={{ padding: "7px 20px" }}>
        <Col span={24} style={{ marginBottom: "10px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "10px 15px",
              backgroundColor: Color.PRIMARY,
              borderRadius: "10px",
            }}
          >
            <Space align="center">
              <Typography.Title level={4} style={{ marginBottom: 0 }}>
                Boarding House
              </Typography.Title>
              <Avatar
                size={35}
                style={{
                  backgroundColor: Color.PRIMARY,
                  color: "#000",
                  border: "1px solid gray",
                  marginLeft: "10px",
                  cursor: "pointer",
                }}
                icon={<SettingFilled />}
                alt="Settings"
                onClick={() => setIsSettingsModal(true)}
              />
            </Space>
            <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsAddNewRoomModal(true)} />
          </div>
        </Col>

        {/* Filter Section */}
        <Col span={24} style={{ marginBottom: "15px" }}>
          <Flex align="center">
            <Space
              style={{
                border: "1px solid rgba(0,0,0,0.5)",
                height: 40,
                borderRadius: "10px 0 0 10px",
                padding: "0 20px",
              }}
            >
              <FilterOutlined
                style={{
                  fontSize: "18px",
                }}
              />
            </Space>
            <Space style={{ border: "1px solid rgba(0,0,0,0.5)", height: 40, padding: "0 20px" }}>
              <Typography.Text style={{ fontSize: "14px" }}>Filter By</Typography.Text>
            </Space>
            <Space>
              <Input
                type="date"
                style={{
                  border: "1px solid rgba(0,0,0,0.5)",
                  height: 40,
                  borderRadius: "0",
                  backgroundColor: "transparent",
                  padding: "0 20px",
                }}
                onChange={handleDateChange}
                value={date}
              />
            </Space>
            <select
              style={{ border: "1px solid rgba(0,0,0,0.5)", height: 40, padding: "0 20px" }}
              value={paymentStatus}
              onChange={(e) => setPaymentStatus(e.target.value)}
              defaultValue=""
            >
              <option value="">Payment Status</option>
              <option value="PAID">Paid</option>
              <option value="UNPAID">Unpaid</option>
            </select>
            <select
              style={{ border: "1px solid rgba(0,0,0,0.5)", height: 40, padding: "0 20px" }}
              value={roomStatus}
              onChange={(e) => setRoomStatus(e.target.value)}
              defaultValue=""
            >
              <option value="">Room Status</option>
              <option value="FULL_ROOM">Full room</option>
              <option value="ROOM_AVAILABLE">Room available</option>
            </select>
            <Space
              style={{
                border: "1px solid rgba(0,0,0,0.5)",
                height: 40,
                cursor: "pointer",
                padding: "0 20px",
                borderRadius: "0 10px 10px 0",
              }}
              onClick={handleResetFilter}
            >
              <RollbackOutlined style={{ color: "red" }} />
              <Typography.Text type="danger" style={{ marginLeft: "10px", fontSize: "14px" }}>
                Reset Filter
              </Typography.Text>
            </Space>
          </Flex>
        </Col>

        {/* Room List Section */}
        <Col span={24}>
          <Row style={{ gap: "15px" }}>
            {isFetching ? (
              <>
                <SkeletonRoomItem />
                <SkeletonRoomItem />
                <SkeletonRoomItem />
                <SkeletonRoomItem />
                <SkeletonRoomItem />
                <SkeletonRoomItem />
              </>
            ) : (
              data?.pages?.map((page: any) =>
                page.content.map((room: RoomResponse) => <RoomItem key={room.id} room={room} />),
              )
            )}
          </Row>
        </Col>
        <Pagination
          total={data?.pages[0].page.totalElements || 0}
          itemRender={itemRender}
          size="small"
          defaultPageSize={data?.pages[0].page.size || 6}
          pageSize={data?.pages[0].page.size || 6}
          current={currentPage}
          onChange={onChangePage}
          style={{ position: "absolute", bottom: 10, left: 20 }}
        />

        <Settings
          isModalOpen={isSettingsModal}
          setIsModalOpen={setIsSettingsModal}
          id={boardingHouse?.id}
          electricityBill={boardingHouse?.setting.electricityBill}
          waterBill={boardingHouse?.setting.waterBill}
        />
        <AddNewRoom isModalOpen={isAddNewRoomModal} setIsModalOpen={setIsAddNewRoomModal} id={boardingHouse?.id} />
      </Row>
    </div>
  );
};

import { DownOutlined, FilterOutlined, PlusOutlined, RollbackOutlined, SettingFilled } from "@ant-design/icons";
import {
  Avatar,
  Button,
  Col,
  DatePicker,
  DatePickerProps,
  Pagination,
  PaginationProps,
  Row,
  Select,
  Space,
  Typography,
} from "antd";
import { Color, RoomResponse } from "constants";
import dayjs from "dayjs";
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

  const [roomStatus, setRoomStatus] = useState<any>(undefined);
  const [paymentStatus, setPaymentStatus] = useState<any>(undefined);
  const [date, setDate] = useState<any>(undefined);

  const { data: boardingHouse } = useBoardingHouse({ enabled: false });

  const { data, isFetching, refetch } = useRoom(
    { enabled: true, staleTime: 60000, initialPageParam: currentPage },
    {
      page: currentPage,
      size: 6,
      sortField: "created_at",
      sortBy: "DESC",
      filter: {
        boardingHouseId: boardingHouse?.id,
        roomStatus: roomStatus ? roomStatus : "",
        paymentStatus: paymentStatus ? paymentStatus : "",
        date: date ? date : "",
      },
    },
  );

  const onChangePage = (page: number) => {
    setCurrentPage(page);
    refetch();
  };

  const onChangeDate: DatePickerProps["onChange"] = (date, dateString) => {
    setDate(dateString);
  };

  const itemRender: PaginationProps["itemRender"] = (_, type, originalElement) => {
    if (type === "prev") return <a>Previous</a>;
    if (type === "next") return <a>Next</a>;
    return originalElement;
  };

  const handleResetFilter = () => {
    setRoomStatus(undefined);
    setPaymentStatus(undefined);
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
          <Row align="middle">
            <FilterOutlined
              style={{
                border: "1px solid rgba(0,0,0,0.5)",
                padding: "10px 20px",
                borderRadius: "10px 0 0 10px",
                fontSize: "12px",
              }}
            />
            <Typography.Text style={{ border: "1px solid rgba(0,0,0,0.5)", padding: "5px 20px", fontSize: "14px" }}>
              Filter By
            </Typography.Text>
            <DatePicker
              placeholder="Date"
              onChange={onChangeDate}
              style={{ border: "1px solid rgba(0,0,0,0.5)", borderRadius: "0", backgroundColor: "transparent" }}
              suffixIcon={<DownOutlined />}
              value={date ? dayjs(date) : undefined}
            />
            <Select
              size="large"
              style={{ border: "1px solid rgba(0,0,0,0.5)", width: "200px", borderRadius: "0", height: 32 }}
              placeholder="Payment Status"
              value={paymentStatus}
              onChange={(value) => setPaymentStatus(value)}
            >
              <Select.Option value="PAID">Paid</Select.Option>
              <Select.Option value="UNPAID">Unpaid</Select.Option>
            </Select>
            <Select
              size="large"
              style={{ border: "1px solid rgba(0,0,0,0.5)", width: "200px", borderRadius: "0", height: 32 }}
              placeholder="Room Status"
              value={roomStatus}
              onChange={(value) => setRoomStatus(value)}
            >
              <Select.Option value="FULL_ROOM">Full room</Select.Option>
              <Select.Option value="ROOM_AVAILABLE">Room available</Select.Option>
            </Select>
            <div
              style={{ border: "1px solid rgba(0,0,0,0.5)", padding: "5px 20px", cursor: "pointer" }}
              onClick={handleResetFilter}
            >
              <RollbackOutlined style={{ color: "red" }} />
              <Typography.Text type="danger" style={{ marginLeft: "10px", fontSize: "14px" }}>
                Reset Filter
              </Typography.Text>
            </div>
          </Row>
        </Col>

        {/* Room List Section */}
        <Col span={24}>
          <Row justify="space-between" gutter={[0, 15]}>
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
          total={data?.pages[0].page.totalPages || 10}
          itemRender={itemRender}
          size="small"
          defaultPageSize={data?.pages[0].page.size || 6}
          pageSize={data?.pages[0].page.size || 6}
          current={currentPage}
          onChange={onChangePage}
          style={{ position: "absolute", bottom: 10, left: 20 }}
        />

        <Settings isModalOpen={isSettingsModal} setIsModalOpen={setIsSettingsModal} id={boardingHouse?.id} />
        <AddNewRoom isModalOpen={isAddNewRoomModal} setIsModalOpen={setIsAddNewRoomModal} id={boardingHouse?.id} />
      </Row>
    </div>
  );
};

import React, { useState } from "react";
import {
  Avatar,
  Button,
  Col,
  DatePicker,
  Row,
  Select,
  Space,
  Typography,
  Pagination,
  Spin,
  DatePickerProps,
  PaginationProps,
} from "antd";
import { DownOutlined, FilterOutlined, PlusOutlined, RollbackOutlined, SettingFilled } from "@ant-design/icons";
import { RoomItem } from "./RoomItem";
import { useBoardingHouse } from "hooks";
import { useRoom } from "hooks";
import { Color, RoomResponse } from "constants";
import { SkeletonRoomItem } from "./SkeletonRoomItem";
import { Settings } from "./Settings";

export const Room: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isSettingsModal, setIsSettingsModal] = useState(false);

  const { data: boardingHouse } = useBoardingHouse({ enabled: false });

  const { data, status, isFetching, refetch } = useRoom(
    { enabled: true, staleTime: 60000, initialPageParam: currentPage },
    {
      page: currentPage,
      size: 6,
      sortField: "createdAt",
      sortBy: "DESC",
      filter: {
        id: boardingHouse?.id,
      },
    },
  );

  const onChangePage = (page: number) => {
    setCurrentPage(page);
    refetch();
  };

  const onChangeDate: DatePickerProps["onChange"] = (date, dateString) => console.log(date, dateString);

  const itemRender: PaginationProps["itemRender"] = (_, type, originalElement) => {
    if (type === "prev") return <a>Previous</a>;
    if (type === "next") return <a>Next</a>;
    return originalElement;
  };

  return (
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
          <Button type="primary" icon={<PlusOutlined />} />
        </div>
      </Col>

      {/* Filter Section */}
      <Col span={24} style={{ marginBottom: "10px" }}>
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
          />
          <Select
            defaultValue="1"
            size="large"
            style={{ border: "1px solid rgba(0,0,0,0.5)", width: "200px", borderRadius: "0", height: 32 }}
          >
            <Select.Option value="1">Payment Status</Select.Option>
            <Select.Option value="2">Paid</Select.Option>
            <Select.Option value="3">Unpaid</Select.Option>
          </Select>
          <Select
            defaultValue="1"
            size="large"
            style={{ border: "1px solid rgba(0,0,0,0.5)", width: "200px", borderRadius: "0", height: 32 }}
          >
            <Select.Option value="1">Room Status</Select.Option>
            <Select.Option value="2">Full room</Select.Option>
            <Select.Option value="3">Room available</Select.Option>
          </Select>
          <div style={{ border: "1px solid rgba(0,0,0,0.5)", padding: "5px 20px" }}>
            <RollbackOutlined style={{ color: "red" }} />
            <Typography.Text type="danger" style={{ marginLeft: "10px", fontSize: "14px" }}>
              Reset Filter
            </Typography.Text>
          </div>
        </Row>
      </Col>

      {/* Room List Section */}
      <Col span={24}>
        <Row justify="space-between" gutter={[0, 10]}>
          {status === "pending" ? (
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
        {isFetching && <Spin />}
        <Pagination
          total={data?.pages[0].page.totalPages || 10}
          itemRender={itemRender}
          size="small"
          defaultPageSize={data?.pages[0].page.size || 6}
          pageSize={data?.pages[0].page.size || 6}
          current={currentPage}
          onChange={onChangePage}
          style={{ marginTop: "15px", textAlign: "center" }}
        />
      </Col>

      <Settings isModalOpen={isSettingsModal} setIsModalOpen={setIsSettingsModal} id={boardingHouse?.id} />
    </Row>
  );
};

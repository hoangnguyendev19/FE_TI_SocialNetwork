import {
  EllipsisOutlined,
  EyeOutlined,
  HeartOutlined,
  MessageOutlined,
  ShareAltOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Button,
  Col,
  Dropdown,
  Flex,
  Image,
  MenuProps,
  Typography,
} from "antd";
import { Color, PostData } from "constants";
import React, { useState } from "react";
import { UpdatePost } from "./UpdatePost";

export const Post: React.FC<PostData> = (props) => {
  const {
    id,
    avatar,
    name,
    createdAt,
    content,
    image,
    likes,
    comments,
    shares,
    views,
  } = props;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const items: MenuProps["items"] = [
    {
      label: "Update post",
      key: "0",
      onClick: () => {
        showModal();
      },
    },
    {
      type: "divider",
    },
    {
      label: "Delete post",
      key: "2",
    },
    {
      type: "divider",
    },
    {
      label: "Report post",
      key: "4",
    },
  ];

  return (
    <Col
      span="24"
      style={{
        backgroundColor: Color.PRIMARY,
        padding: "15px 20px",
        borderRadius: "10px",
        marginTop: "15px",
        border: `1px solid rgba(0, 0, 0, 0.2)`,
      }}
    >
      <Flex justify="space-between" align="center">
        <Flex align="center">
          {avatar ? (
            <Avatar alt="avatar" shape="circle" size="large" src={avatar} />
          ) : (
            <Avatar
              alt="avatar"
              shape="circle"
              size="large"
              icon={<UserOutlined />}
            />
          )}
          <Col style={{ marginLeft: "10px" }}>
            <Typography.Title
              level={5}
              style={{ color: "blue", marginBottom: "0px" }}
            >
              {name}
            </Typography.Title>
            <Typography.Text style={{ color: "gray", fontSize: "12px" }}>
              {createdAt}
            </Typography.Text>
          </Col>
        </Flex>

        <Dropdown menu={{ items }} trigger={["click"]}>
          <a onClick={(e) => e.preventDefault()}>
            <EllipsisOutlined style={{ color: "black", fontSize: "20px" }} />
          </a>
        </Dropdown>
      </Flex>

      <Col span="24" style={{ padding: "15px 0" }}>
        <Typography.Paragraph
          style={{ color: "black", fontSize: "12px" }}
          ellipsis={{
            rows: 3,
            expandable: true,
            symbol: "See more",
          }}
        >
          {content}
        </Typography.Paragraph>
      </Col>

      {image && (
        <Col span="24" style={{ padding: "15px 0" }}>
          <Image
            width="100%"
            height="auto"
            style={{ objectFit: "cover" }}
            src={image}
          />
        </Col>
      )}

      <Col span="24">
        <Flex justify="space-between" align="center">
          <Flex justify="start" align="center">
            <Button type="text" icon={<HeartOutlined />}>
              {likes}
            </Button>
            <Button type="text" icon={<MessageOutlined />}>
              {comments}
            </Button>
            <Button type="text" icon={<ShareAltOutlined />}>
              {shares}
            </Button>
          </Flex>
          <Button type="text" icon={<EyeOutlined />}>
            {views}
          </Button>
        </Flex>
      </Col>

      <UpdatePost
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        post={props}
      />
    </Col>
  );
};

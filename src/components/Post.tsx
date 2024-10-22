import { EllipsisOutlined, HeartOutlined, MessageOutlined, ShareAltOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Col, Dropdown, Flex, Image, MenuProps, Typography } from "antd";
import { Color, PostResponse } from "constants";
import React, { useState } from "react";
import ReactPlayer from "react-player";
import { convertToRelativeTime } from "utils";
import { UpdatePost } from "./UpdatePost";
import { DeletePost } from "./DeletePost";

export const Post: React.FC<PostResponse> = (props) => {
  const {
    id,
    firstName,
    lastName,
    profilePictureUrl,
    content,
    totalLikes,
    totalComments,
    totalShares,
    parentPost,
    mediaList,
    createdAt,
    lastModified,
  } = props;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const showDeleteModal = () => {
    setIsDeleteModalOpen(true);
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
      onClick: () => {
        showDeleteModal();
      },
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
          {profilePictureUrl ? (
            <Avatar alt="avatar" shape="circle" size="large" src={profilePictureUrl} />
          ) : (
            <Avatar alt="avatar" shape="circle" size="large" icon={<UserOutlined />} />
          )}
          <Col style={{ marginLeft: "10px" }}>
            <Typography.Title level={5} style={{ color: "blue", marginBottom: "0px" }}>
              {`${firstName} ${lastName}`}
            </Typography.Title>
            <Typography.Text style={{ color: "gray", fontSize: "12px" }}>
              {createdAt === lastModified
                ? `Posted on ${convertToRelativeTime(createdAt)}`
                : `Edited on ${convertToRelativeTime(lastModified)}`}
            </Typography.Text>
          </Col>
        </Flex>

        <Dropdown menu={{ items }} trigger={["click"]}>
          <a onClick={(e) => e.preventDefault()}>
            <EllipsisOutlined style={{ color: "black", fontSize: "20px" }} />
          </a>
        </Dropdown>
      </Flex>

      <Col span="24" style={{ padding: "15px 0 0" }}>
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

      <Col span="24" style={{ maxHeight: "450px", overflowY: "auto" }}>
        {mediaList.map((media) => (
          <div key={media.id} style={{ margin: "15px 0" }}>
            {media.type === "IMAGE" ? (
              <Image.PreviewGroup
                preview={{
                  onChange: (current, prev) => console.log(`current index: ${current}, prev index: ${prev}`),
                }}
              >
                <Image key={media.id} width="100%" height="350px" src={media.url} />
              </Image.PreviewGroup>
            ) : (
              <ReactPlayer controls width="100%" height="350px" key={media.id} url={media.url} />
            )}
          </div>
        ))}
      </Col>

      <Col span="24" style={{ padding: "15px 0" }}>
        {parentPost && (
          <Col
            span="24"
            style={{
              backgroundColor: "rgba(0,0,0,0.1)",
              padding: "10px",
              borderRadius: "10px",
            }}
          >
            <Typography.Text style={{ color: "black", fontSize: "12px" }}>{parentPost.content}</Typography.Text>
          </Col>
        )}
      </Col>

      <Col span="24">
        <Flex justify="start" align="center">
          <Flex
            justify="center"
            align="center"
            style={{
              backgroundColor: "rgba(0,0,0,0.1)",
              borderRadius: "10px",
              marginRight: "10px",
            }}
          >
            <Button type="text" icon={<HeartOutlined />} />
            <Button type="text" style={{ padding: "0 10px 0 5px" }}>
              {totalLikes}
            </Button>
          </Flex>
          <Button
            type="text"
            style={{
              backgroundColor: "rgba(0,0,0,0.1)",
              borderRadius: "10px",
              marginRight: "10px",
            }}
            icon={<MessageOutlined />}
          >
            {totalComments}
          </Button>
          <Flex justify="center" align="center" style={{ backgroundColor: "rgba(0,0,0,0.1)", borderRadius: "10px" }}>
            <Button type="text" icon={<ShareAltOutlined />} />
            <Button type="text" style={{ padding: "0 10px 0 5px" }}>
              {totalShares}
            </Button>
          </Flex>
        </Flex>
      </Col>

      <UpdatePost
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        id={id}
        text={content}
        mediaList={mediaList}
      />

      <DeletePost isModalOpen={isDeleteModalOpen} setIsModalOpen={setIsDeleteModalOpen} postId={id} />
    </Col>
  );
};

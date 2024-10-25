import {
  EllipsisOutlined,
  HeartFilled,
  HeartOutlined,
  MessageOutlined,
  ShareAltOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Avatar, Button, Col, Dropdown, Flex, Image, MenuProps, notification, Typography } from "antd";
import { favouriteApi } from "api/favouriteApi";
import { Color, ErrorCode, ErrorMessage, PostResponse, QueryKey } from "constants";
import React, { useState } from "react";
import ReactPlayer from "react-player";
import { convertToRelativeTime } from "utils";
import { DeletePost } from "./DeletePost";
import { UpdatePost } from "./UpdatePost";
import { FavouritePost } from "./FavouritePost";
import { SharePost } from "./SharePost";
import { ReportPost } from "./ReportPost";
import { CreateSharePost } from "./CreateSharePost";
import { CommentPost } from "./CommentPost";

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
    liked,
    owner,
    parentPost,
    mediaList,
    createdAt,
    lastModified,
  } = props;

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => (liked ? favouriteApi.deleteFavourite(id) : favouriteApi.createFavourite(id)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKey.POST] });
    },
    onError: (error: any) => {
      switch (error?.response?.data?.message) {
        case ErrorCode.POST_DOES_NOT_EXIST:
          notification.error({
            message: ErrorMessage.POST_DOES_NOT_EXIST,
          });
          break;

        default:
          notification.error({
            message: "Failed to like/unlike post.",
          });
          break;
      }
    },
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isFavouriteModalOpen, setIsFavouriteModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isCreateShareModalOpen, setIsCreateShareModalOpen] = useState(false);
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const showDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const showFavouriteModal = () => {
    setIsFavouriteModalOpen(true);
  };

  const showShareModal = () => {
    setIsShareModalOpen(true);
  };

  const showReportModal = () => {
    setIsReportModalOpen(true);
  };

  const showCreateShareModal = () => {
    setIsCreateShareModalOpen(true);
  };

  const showCommentModal = () => {
    setIsCommentModalOpen(true);
  };

  const items: MenuProps["items"] = [
    {
      label: "Update post",
      key: "0",
      onClick: () => {
        showModal();
      },
      disabled: !owner,
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
      disabled: !owner,
    },
    {
      type: "divider",
    },
    {
      label: "Report post",
      key: "4",
      onClick: () => {
        showReportModal();
      },
      disabled: owner,
    },
  ];

  return (
    <Col
      span="24"
      style={{
        backgroundColor: Color.PRIMARY,
        padding: "15px 20px",
        borderRadius: "10px",
        marginBottom: "15px",
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

      <Col span="24" style={{ paddingBottom: "15px" }}>
        {parentPost && <Post {...parentPost} />}
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
            <Button
              type="text"
              icon={liked ? <HeartFilled style={{ color: "red" }} /> : <HeartOutlined />}
              onClick={() => mutation.mutate()}
            />
            <Button type="text" style={{ padding: "0 10px 0 5px" }} onClick={showFavouriteModal}>
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
            onClick={showCommentModal}
          >
            {totalComments}
          </Button>
          <Flex justify="center" align="center" style={{ backgroundColor: "rgba(0,0,0,0.1)", borderRadius: "10px" }}>
            <Button type="text" icon={<ShareAltOutlined />} onClick={showCreateShareModal} />
            <Button type="text" style={{ padding: "0 10px 0 5px" }} onClick={showShareModal}>
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

      <FavouritePost isModalOpen={isFavouriteModalOpen} setIsModalOpen={setIsFavouriteModalOpen} postId={id} />
      <DeletePost isModalOpen={isDeleteModalOpen} setIsModalOpen={setIsDeleteModalOpen} id={id} />
      <ReportPost isModalOpen={isReportModalOpen} setIsModalOpen={setIsReportModalOpen} id={id} />

      <CreateSharePost
        isModalOpen={isCreateShareModalOpen}
        setIsModalOpen={setIsCreateShareModalOpen}
        parentPost={props}
      />

      <SharePost isModalOpen={isShareModalOpen} setIsModalOpen={setIsShareModalOpen} postId={id} />
      <CommentPost isModalOpen={isCommentModalOpen} setIsModalOpen={setIsCommentModalOpen} id={id} />
    </Col>
  );
};

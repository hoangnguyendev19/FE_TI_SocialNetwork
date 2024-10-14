import { Col, Flex } from "antd";
import { CreatePost, InputPost, Post } from "components";
import { PostData } from "constants";
import React, { useState } from "react";

const posts = [
  {
    id: "1",
    avatar: "https://i.pravatar.cc/300",
    name: "John Doe",
    createdAt: "2 hours ago",
    content: "This is a post content",
    image: "https://i.pravatar.cc/300",
    likes: 10,
    comments: 5,
    shares: 3,
    views: 20,
  },
  {
    id: "2",
    avatar: "https://i.pravatar.cc/300",
    name: "Jane Doe",
    createdAt: "3 hours ago",
    content: "This is a post content",
    image: "https://i.pravatar.cc/300",
    likes: 15,
    comments: 7,
    shares: 5,
    views: 25,
  },
];

export const NewsPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  return (
    <Flex
      justify="center"
      dir="column"
      style={{ padding: "20px", maxHeight: "100%", overflowY: "auto" }}
    >
      <Col span="10">
        <InputPost showModal={showModal} />

        {posts.map((post: PostData) => (
          <Post key={post.id} {...post} />
        ))}

        <CreatePost isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      </Col>
    </Flex>
  );
};

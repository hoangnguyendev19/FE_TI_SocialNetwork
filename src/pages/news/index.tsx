import { Col, Flex } from "antd";
import { CreatePost, InputPost, Post } from "components";
import { PostResponse } from "constants";
import { posts } from "data";
import React, { useState } from "react";

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

        {posts.map((post: PostResponse) => (
          <Post key={post.id} {...post} />
        ))}

        <CreatePost isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      </Col>
    </Flex>
  );
};

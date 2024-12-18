import { Col, Flex, Typography } from "antd";
import { CreatePost, InputPost, Post, SkeletonPost } from "components";
import { PostResponse } from "constants";
import { usePost } from "hooks";
import React, { useEffect, useRef, useState } from "react";

export const NewsPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, status, fetchNextPage, hasNextPage, isFetchingNextPage } = usePost({
    enabled: true,
    initialPageParam: 1,
  });

  const showModal = () => {
    setIsModalOpen(true);
  };

  // Infinite scroll logic
  const observerElem = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 },
    );

    if (observerElem.current) {
      observer.observe(observerElem.current);
    }

    return () => {
      if (observerElem.current) {
        observer.unobserve(observerElem.current);
      }
    };
  }, [hasNextPage, fetchNextPage]);

  return (
    <Flex justify="center" dir="column" style={{ maxHeight: "100%", overflowY: "auto", paddingTop: "20px" }}>
      <Col span={12}>
        <InputPost showModal={showModal} />

        {status === "pending" ? (
          <SkeletonPost />
        ) : status === "error" ? (
          <Typography.Text type="danger">Failed to fetch posts.</Typography.Text>
        ) : (
          data?.pages.map((page: any) => page.content.map((post: PostResponse) => <Post key={post.id} {...post} />))
        )}

        <CreatePost isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />

        {/* Loader or Fetching more indicator */}
        <div ref={observerElem}>{isFetchingNextPage && <SkeletonPost />}</div>
      </Col>
    </Flex>
  );
};

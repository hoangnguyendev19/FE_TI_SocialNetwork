import { Col, Flex } from "antd";
import { CreatePost, InputPost, Post, SkeletonPost } from "components";
import { PostResponse } from "constants";
import { usePost } from "hooks";
import React, { useEffect, useRef, useState } from "react";

export const NewsPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    usePost({
      enabled: !isModalOpen,
      staleTime: 1000 * 5, // 5 seconds,
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
      { threshold: 1.0 }
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
    <Flex
      justify="center"
      dir="column"
      style={{ maxHeight: "100%", overflowY: "auto" }}
    >
      <Col span={10}>
        <InputPost showModal={showModal} />

        {isLoading ? (
          <SkeletonPost />
        ) : (
          data?.pages.map((page: any) =>
            page.content.map((post: PostResponse) => (
              <Post key={post.id} {...post} />
            ))
          )
        )}

        <CreatePost isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />

        {/* Loader or Fetching more indicator */}
        <div ref={observerElem}>{isFetchingNextPage && <SkeletonPost />}</div>
      </Col>
    </Flex>
  );
};

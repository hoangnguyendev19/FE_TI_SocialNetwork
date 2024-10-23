import { Avatar, Divider, Modal, Skeleton, Typography } from "antd";
import { Color, FavouriteResponse } from "constants";
import { useFavourite } from "hooks/useFavourite";
import { useEffect, useRef } from "react";

interface FavouritePostProps {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  postId: string;
}

export const FavouritePost: React.FC<FavouritePostProps> = ({ isModalOpen, setIsModalOpen, postId }) => {
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useFavourite(
    {
      enabled: !isModalOpen,
      staleTime: 1000 * 5, // 5 seconds,
      initialPageParam: 1,
    },
    {
      page: 1,
      size: 10,
      sortField: "createdAt",
      sortBy: "DESC",
      filter: { id: postId },
    },
  );

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
    <Modal open={isModalOpen} onCancel={() => setIsModalOpen(false)} footer={() => null}>
      <Typography.Title level={4} style={{ color: Color.SECONDARY }}>
        Favourite on the post
      </Typography.Title>
      <Divider style={{ margin: "15px 0", borderBlockColor: "#000" }} />

      {isLoading ? (
        <Skeleton avatar active paragraph={{ rows: 0 }} />
      ) : (
        data?.pages.map((page: any) =>
          page.content.map((favour: FavouriteResponse) => (
            <div key={favour.userId} style={{ display: "flex", alignItems: "center", overflowY: "auto" }}>
              <Avatar
                alt="avatar"
                shape="circle"
                size="large"
                src={favour.profilePictureUrl}
                style={{ marginRight: "15px" }}
              />
              <Typography.Text style={{ color: "gray" }}>
                {favour.firstName} {favour.lastName}
              </Typography.Text>
            </div>
          )),
        )
      )}

      {/* Loader or Fetching more indicator */}
      <div ref={observerElem}>{isFetchingNextPage && <Skeleton avatar active paragraph={{ rows: 0 }} />}</div>
    </Modal>
  );
};

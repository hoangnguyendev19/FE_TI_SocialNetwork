import { UserOutlined } from "@ant-design/icons";
import { Avatar, Divider, Modal, Skeleton, Typography } from "antd";
import { Color, FavouriteResponse } from "constants";
import { useFavourite } from "hooks";
import { useEffect, useRef } from "react";

interface FavouritePostProps {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  postId: string;
}

export const FavouritePost: React.FC<FavouritePostProps> = ({ isModalOpen, setIsModalOpen, postId }) => {
  const { data, status, fetchNextPage, hasNextPage, isFetchingNextPage } = useFavourite(
    {
      enabled: true,
      staleTime: 1000 * 60, // 1 minutes
      initialPageParam: 1,
    },
    postId,
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
    <Modal open={isModalOpen} onCancel={() => setIsModalOpen(false)} footer={() => null} style={{ top: 30 }}>
      <Typography.Title level={4} style={{ color: Color.SECONDARY }}>
        Favourite on the post
      </Typography.Title>
      <Divider style={{ margin: "15px 0", borderBlockColor: "#000" }} />
      <div style={{ maxHeight: "530px", overflowY: "auto" }}>
        {status === "pending" ? (
          <Skeleton avatar active paragraph={{ rows: 0 }} />
        ) : status === "error" ? (
          <Typography.Text type="danger">Failed to fetch favourites.</Typography.Text>
        ) : (
          data?.pages.map((page: any) =>
            page.content.map((favour: FavouriteResponse) => (
              <div
                key={favour.userId}
                style={{ display: "flex", alignItems: "center", overflowY: "auto", marginBottom: "15px" }}
              >
                {favour.profilePictureUrl ? (
                  <Avatar
                    alt="avatar"
                    shape="circle"
                    size="large"
                    src={favour.profilePictureUrl}
                    style={{ marginRight: "15px" }}
                  />
                ) : (
                  <Avatar
                    alt="avatar"
                    shape="circle"
                    size="large"
                    icon={<UserOutlined />}
                    style={{ marginRight: "15px" }}
                  />
                )}
                <Typography.Text style={{ color: "gray" }}>
                  {favour.firstName} {favour.lastName}
                </Typography.Text>
              </div>
            )),
          )
        )}

        {/* Loader or Fetching more indicator */}
        <div ref={observerElem}>{isFetchingNextPage && <Skeleton avatar active paragraph={{ rows: 0 }} />}</div>
      </div>
    </Modal>
  );
};

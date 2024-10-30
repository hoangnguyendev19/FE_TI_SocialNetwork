import { EnvironmentOutlined, MailOutlined, SettingFilled, UserOutlined } from "@ant-design/icons";
import { Avatar, Col, Image, Row, Skeleton, Space, Typography } from "antd";
import AvatarImage from "assets/images/img-avatar.png";
import CoverImage from "assets/images/img-cover-photo.jpg";
import { CreatePost, InputPost, Post, SkeletonPost } from "components";
import { Color, PostResponse, ROUTE } from "constants";
import { usePost, useProfile } from "hooks";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: res, isLoading } = useProfile({
    enabled: false,
    // staleTime: 1000 * 60 * 5, // 5 minutes
  });

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
    <div style={{ maxHeight: "100%", overflowY: "auto" }}>
      <div style={{ position: "relative", height: "200px", marginBottom: "20px" }}>
        <Image
          src={res?.data?.coverPictureUrl || CoverImage}
          alt="Profile"
          width="100%"
          style={{ objectFit: "contain", height: 150 }}
          preview={false}
        />

        <div style={{ position: "absolute", top: "60%", left: "40px", display: "flex", alignItems: "center" }}>
          {isLoading ? (
            <Skeleton.Avatar active size="large" shape="circle" style={{ width: "100px", height: "100px" }} />
          ) : res?.data?.profilePictureUrl ? (
            <Avatar size={100} alt="Avatar" src={res?.data?.profilePictureUrl} shape="circle" />
          ) : (
            <Avatar size={100} icon={<UserOutlined />} alt="Avatar" />
          )}
          <div style={{ display: "flex", alignItems: "center", marginTop: "30px", marginLeft: "10px" }}>
            <Typography.Title level={3} style={{ color: Color.SECONDARY, marginBottom: 0 }}>
              {res?.data?.firstName + " " + res?.data?.lastName}
            </Typography.Title>
            <Avatar
              size={30}
              style={{
                backgroundColor: Color.PRIMARY,
                color: "#000",
                border: "1px solid gray",
                marginLeft: "10px",
                cursor: "pointer",
              }}
              icon={<SettingFilled />}
              alt="Settings"
              onClick={() => navigate("/" + ROUTE.SETTINGS)}
            />
          </div>
        </div>
      </div>
      <div style={{ padding: "20px 0" }}>
        <Row>
          <Col span={8} style={{ paddingLeft: "40px", paddingRight: "20px" }}>
            <Space
              direction="vertical"
              style={{ padding: "20px", backgroundColor: Color.PRIMARY, borderRadius: "10px", width: "100%" }}
            >
              <Space>
                <MailOutlined style={{ color: Color.SECONDARY }} />
                <Typography.Text>{res?.data?.email}</Typography.Text>
              </Space>
              <Space>
                <EnvironmentOutlined style={{ color: Color.SECONDARY }} />
                <Typography.Text>
                  {res?.data?.presentAddress ? res?.data?.presentAddress : "Không timg thấy địa chỉ"}
                </Typography.Text>
              </Space>
              <Row gutter={[5, 5]} style={{ borderRadius: "15px", overflow: "hidden", marginTop: "20px" }}>
                {Array.from({ length: 9 }).map((_, index) => (
                  <Col span={8} key={index}>
                    <Image src={AvatarImage} alt="Profile" width="100%" style={{ objectFit: "cover", height: 100 }} />
                  </Col>
                ))}
              </Row>
            </Space>
          </Col>
          <Col span={16}>
            <Row>
              <Col span={18} style={{ width: "100%" }}>
                <InputPost showModal={showModal} />

                {status === "pending" ? (
                  <SkeletonPost />
                ) : status === "error" ? (
                  <Typography.Text type="danger">Failed to fetch posts.</Typography.Text>
                ) : (
                  data?.pages.map((page: any) =>
                    page.content.map((post: PostResponse) => <Post key={post.id} {...post} />),
                  )
                )}

                <CreatePost isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />

                {/* Loader or Fetching more indicator */}
                <div ref={observerElem}>{isFetchingNextPage && <SkeletonPost />}</div>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  );
};

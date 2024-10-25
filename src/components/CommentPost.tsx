import { EditOutlined, PlusCircleOutlined, UserOutlined } from "@ant-design/icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Avatar, Button, Divider, Flex, Input, Modal, notification, Skeleton, Typography } from "antd";
import { commentApi } from "api";
import { Color, CommentRequest, CommentResponse, QueryKey } from "constants";
import { useComment, useProfile } from "hooks";
import { useEffect, useRef, useState } from "react";
import { Comment } from "./Comment";
import { favouriteCommentApi } from "api/favouriteCommentApi";

interface CommentPostProps {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  id: string;
}

export const CommentPost: React.FC<CommentPostProps> = ({ isModalOpen, setIsModalOpen, id }) => {
  const [commentText, setCommentText] = useState<string>("");
  const [parentCommentId, setParentCommentId] = useState<string | null>(null);
  const [choosenCommentId, setChoosenCommentId] = useState<string | null>(null);

  const queryClient = useQueryClient();
  const { data: res, isLoading }: any = useProfile({
    enabled: true,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const { data, status, fetchNextPage, hasNextPage, isFetchingNextPage } = useComment(
    {
      enabled: true,
      initialPageParam: 1,
    },
    id,
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

  const mutation = useMutation({
    mutationFn: (data: CommentRequest) => commentApi.createComment(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKey.COMMENT, id] });
      handleReset();
    },
    onError: (error: any) => {
      switch (error?.response?.data?.message) {
        // case ErrorCode.POST_DOES_NOT_EXIST:
        //   notification.error({
        //     message: ErrorMessage.POST_DOES_NOT_EXIST,
        //   });
        //   break;

        default:
          notification.error({
            message: "Failed to create comment.",
          });
          break;
      }
    },
  });

  const updateMutation = useMutation({
    mutationFn: () => commentApi.updateComment(choosenCommentId, commentText),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKey.COMMENT, id] });
      handleReset();
    },
    onError: (error: any) => {
      switch (error?.response?.data?.message) {
        // case ErrorCode.POST_DOES_NOT_EXIST:
        //   notification.error({
        //     message: ErrorMessage.POST_DOES_NOT_EXIST,
        //   });
        //   break;

        default:
          notification.error({
            message: "Failed to update comment.",
          });
          break;
      }
    },
  });

  const hideMutation = useMutation({
    mutationFn: (id: string) => commentApi.hideComment(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKey.COMMENT, id] });
      handleReset();
    },
    onError: (error: any) => {
      switch (error?.response?.data?.message) {
        // case ErrorCode.POST_DOES_NOT_EXIST:
        //   notification.error({
        //     message: ErrorMessage.POST_DOES_NOT_EXIST,
        //   });
        //   break;

        default:
          notification.error({
            message: "Failed to hide comment.",
          });
          break;
      }
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => commentApi.deleteComment(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKey.COMMENT, id] });
      handleReset();
    },
    onError: (error: any) => {
      switch (error?.response?.data?.message) {
        // case ErrorCode.POST_DOES_NOT_EXIST:
        //   notification.error({
        //     message: ErrorMessage.POST_DOES_NOT_EXIST,
        //   });
        //   break;

        default:
          notification.error({
            message: "Failed to delete comment.",
          });
          break;
      }
    },
  });

  const likeMutation = useMutation({
    mutationFn: (id: string) => favouriteCommentApi.createFavouriteComment(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKey.COMMENT, id] });
      handleReset();
    },
    onError: (error: any) => {
      switch (error?.response?.data?.message) {
        // case ErrorCode.POST_DOES_NOT_EXIST:
        //   notification.error({
        //     message: ErrorMessage.POST_DOES_NOT_EXIST,
        //   });
        //   break;

        default:
          notification.error({
            message: "Failed to like comment.",
          });
          break;
      }
    },
  });

  const unlikeMutation = useMutation({
    mutationFn: (id: string) => favouriteCommentApi.deleteFavouriteComment(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKey.COMMENT, id] });
      handleReset();
    },
    onError: (error: any) => {
      switch (error?.response?.data?.message) {
        // case ErrorCode.POST_DOES_NOT_EXIST:
        //   notification.error({
        //     message: ErrorMessage.POST_DOES_NOT_EXIST,
        //   });
        //   break;

        default:
          notification.error({
            message: "Failed to unlike comment.",
          });
          break;
      }
    },
  });

  const handleOk = () => {
    if (choosenCommentId) {
      updateMutation.mutate();
    } else {
      mutation.mutate({ commentText, parentCommentId, postId: id });
    }
  };

  const handleReset = () => {
    setCommentText("");
    setChoosenCommentId(null);
    setParentCommentId(null);
  };

  const handleCancel = () => {
    handleReset();
    queryClient.invalidateQueries({ queryKey: [QueryKey.POST] });
    setIsModalOpen(false);
  };

  return (
    <Modal
      open={isModalOpen}
      onCancel={handleCancel}
      footer={
        <div>
          <Divider style={{ margin: "15px 0", borderBlockColor: "#000" }} />
          <Flex align="center" justify="space-between">
            {isLoading ? (
              <Skeleton.Avatar active size="large" shape="circle" />
            ) : res?.data?.profilePictureUrl ? (
              <Avatar size={44} src={res?.data?.profilePictureUrl} alt="Avatar" />
            ) : (
              <Avatar size={44} icon={<UserOutlined />} alt="Avatar" />
            )}
            <Input
              size="large"
              placeholder="Write a comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              style={{ width: "80%", border: "1px solid rgba(0,0,0,0.2)", fontSize: "14px" }}
            />
            <Button
              icon={choosenCommentId ? <EditOutlined /> : <PlusCircleOutlined />}
              size="large"
              type="text"
              disabled={!commentText}
              style={{ color: !commentText ? "rgba(0,0,0,0.2)" : Color.SECONDARY, fontSize: 24 }}
              onClick={handleOk}
            />
          </Flex>
        </div>
      }
      style={{ top: 30 }}
    >
      <Typography.Title level={4} style={{ color: Color.SECONDARY }}>
        Comment on the post
      </Typography.Title>
      <Divider style={{ margin: "15px 0", borderBlockColor: "#000" }} />

      {status === "pending" ? (
        <>
          <Skeleton avatar active paragraph={{ rows: 3 }} />
          <Skeleton avatar active paragraph={{ rows: 3 }} />
          <Skeleton avatar active paragraph={{ rows: 3 }} />
        </>
      ) : status === "error" ? (
        <Typography.Text type="danger">Failed to fetch comments.</Typography.Text>
      ) : (
        <div style={{ margin: "25px 0px", height: "450px", overflowY: "auto" }}>
          {data?.pages[0].content.map((comment: CommentResponse) => (
            <Comment
              key={comment.commentId}
              comment={comment}
              text={commentText}
              setText={setCommentText}
              choosenCommentId={choosenCommentId}
              setChoosenCommentId={setChoosenCommentId}
              parentCommentId={parentCommentId}
              setParentCommentId={setParentCommentId}
              hideMutation={hideMutation}
              deleteMutation={deleteMutation}
              likeMutation={likeMutation}
              unlikeMutation={unlikeMutation}
            />
          ))}

          {/* Loader or Fetching more indicator */}
          <div ref={observerElem}>{isFetchingNextPage && <Skeleton avatar active paragraph={{ rows: 0 }} />}</div>
        </div>
      )}
    </Modal>
  );
};

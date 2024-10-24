import { EditOutlined, PlusCircleOutlined, UserOutlined } from "@ant-design/icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Avatar, Button, Divider, Flex, Input, Modal, notification, Skeleton, Typography } from "antd";
import { commentApi } from "api";
import { Color, CommentRequest, CommentResponse, QueryKey } from "constants";
import { useComment, useProfile } from "hooks";
import { useEffect, useRef, useState } from "react";
import { Comment } from "./Comment";

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

  const {
    data,
    isLoading: isPending,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useComment(
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
      filter: { id },
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

  const mutation = useMutation({
    mutationFn: (data: CommentRequest) => commentApi.createComment(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKey.POST] });
      queryClient.invalidateQueries({ queryKey: [QueryKey.COMMENT] });
      handleCancel();
      notification.success({
        message: "Comment created successfully.",
      });
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
      queryClient.invalidateQueries({ queryKey: [QueryKey.COMMENT] });
      handleCancel();
      notification.success({
        message: "Comment updated successfully.",
      });
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
      queryClient.invalidateQueries({ queryKey: [QueryKey.COMMENT] });
      handleCancel();
      notification.success({
        message: "Comment hidden successfully.",
      });
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
      queryClient.invalidateQueries({ queryKey: [QueryKey.POST] });
      queryClient.invalidateQueries({ queryKey: [QueryKey.COMMENT] });
      handleCancel();
      notification.success({
        message: "Comment deleted successfully.",
      });
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

  const handleOk = () => {
    if (choosenCommentId) {
      updateMutation.mutate();
    } else {
      mutation.mutate({ commentText, parentCommentId, postId: id });
    }
  };

  const handleCancel = () => {
    setCommentText("");
    setChoosenCommentId(null);
    setIsModalOpen(false);
    setParentCommentId(null);
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

      {isPending ? (
        <>
          <Skeleton avatar active paragraph={{ rows: 3 }} />
          <Skeleton avatar active paragraph={{ rows: 3 }} />
          <Skeleton avatar active paragraph={{ rows: 3 }} />
        </>
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
            />
          ))}

          {/* Loader or Fetching more indicator */}
          <div ref={observerElem}>{isFetchingNextPage && <Skeleton avatar active paragraph={{ rows: 0 }} />}</div>
        </div>
      )}
    </Modal>
  );
};

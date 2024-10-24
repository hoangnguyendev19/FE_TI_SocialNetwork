import { EllipsisOutlined, HeartFilled, HeartOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Col, Dropdown, Flex, MenuProps, Row, Space, Typography } from "antd";
import { Color, CommentResponse } from "constants";
import { convertToRelativeTime } from "utils";

interface CommentProps {
  comment: CommentResponse;
  text: string;
  setText: (commentText: string) => void;
  choosenCommentId: string | null;
  setChoosenCommentId: (commentId: string | null) => void;
  parentCommentId: string | null;
  setParentCommentId: (parentCommentId: string | null) => void;
  hideMutation: any;
  deleteMutation: any;
}

export const Comment: React.FC<CommentProps> = ({
  comment,
  text,
  setText,
  choosenCommentId,
  setChoosenCommentId,
  parentCommentId,
  setParentCommentId,
  hideMutation,
  deleteMutation,
}) => {
  const {
    commentId,
    firstName,
    lastName,
    profilePictureUrl,
    commentText,
    hidden,
    ownedPost,
    ownedComment,
    liked,
    totalLikes,
    childComments,
    createdAt,
    lastModified,
  } = comment;

  const handleEditComment = () => {
    setText(commentText);
    setChoosenCommentId(commentId);
  };

  const items: MenuProps["items"] = [
    {
      label: "Update comment",
      key: "0",
      onClick: handleEditComment,
      disabled: !ownedComment,
    },
    {
      type: "divider",
    },
    {
      label: "Delete comment",
      key: "2",
      onClick: () => deleteMutation.mutate(commentId),
      disabled: !ownedComment,
    },
    {
      type: "divider",
    },
    {
      label: "Hidden comment",
      key: "4",
      onClick: () => hideMutation.mutate(commentId),
      disabled: !ownedPost,
    },
  ];

  const handClickComment = () => {
    if (parentCommentId === commentId) {
      setParentCommentId(null);
    } else {
      setParentCommentId(commentId);
    }
  };

  return (
    <div style={{ display: hidden ? "none" : "block" }}>
      <Flex align="start" justify="space-between" style={{ marginBottom: "10px" }}>
        {profilePictureUrl ? (
          <Avatar alt="avatar" shape="circle" size="large" src={profilePictureUrl} style={{ objectFit: "cover" }} />
        ) : (
          <Avatar alt="avatar" shape="circle" size="large" icon={<UserOutlined />} />
        )}

        <Space direction="vertical" style={{ width: "90%", marginLeft: "10px" }}>
          <Typography.Title level={5} style={{ color: "blue", marginBottom: "0px" }}>
            {`${firstName} ${lastName}`}
          </Typography.Title>
          <div
            style={{
              border: `1px solid ${choosenCommentId === commentId ? Color.SECONDARY : "rgba(0,0,0,0.2)"}`,
              padding: "10px",
              borderRadius: "10px",
              position: "relative",
            }}
          >
            <Typography.Paragraph
              style={{
                color: "black",
                fontSize: "12px",
                marginBottom: "0px",
              }}
              ellipsis={{
                rows: 2,
                expandable: true,
                symbol: "See more",
              }}
            >
              {commentText}
            </Typography.Paragraph>
            <Button
              type="text"
              style={{
                backgroundColor: "#F0F2F5",
                borderRadius: "15px",
                marginRight: "10px",
                position: "absolute",
                right: 0,
                bottom: "-22px",
              }}
              icon={liked ? <HeartFilled style={{ color: "red" }} /> : <HeartOutlined />}
            >
              {totalLikes}
            </Button>
          </div>
          <Flex align="center" justify="start" style={{ width: "100%" }}>
            <Typography.Text style={{ color: "rgba(0,0,0,0.5)", fontSize: "12px" }}>
              {createdAt === lastModified
                ? `Posted on ${convertToRelativeTime(createdAt)}`
                : `Edited on ${convertToRelativeTime(lastModified)}`}
            </Typography.Text>
            <Button
              type="link"
              style={{
                color: parentCommentId === commentId ? Color.SECONDARY : "rgba(0,0,0,0.5)",
                fontWeight: "bold",
                fontSize: "12px",
                height: 0,
                padding: "0px 15px",
              }}
              onClick={handClickComment}
            >
              Comment
            </Button>
            <Dropdown menu={{ items }} trigger={["click"]}>
              <a onClick={(e) => e.preventDefault()}>
                <EllipsisOutlined style={{ color: "rgba(0,0,0,0.5)", fontSize: "20px" }} />
              </a>
            </Dropdown>
          </Flex>
        </Space>
      </Flex>
      <Row>
        <Col span={2}></Col>
        <Col span={22}>
          {childComments.map((comment: CommentResponse) => (
            <Comment
              key={comment.commentId}
              comment={comment}
              text={text}
              setText={setText}
              choosenCommentId={choosenCommentId}
              setChoosenCommentId={setChoosenCommentId}
              parentCommentId={parentCommentId}
              setParentCommentId={setParentCommentId}
              hideMutation={hideMutation}
              deleteMutation={deleteMutation}
            />
          ))}
        </Col>
      </Row>
    </div>
  );
};

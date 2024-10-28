import { UploadOutlined, UserOutlined } from "@ant-design/icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Avatar,
  Button,
  Divider,
  Input,
  Modal,
  Skeleton,
  Spin,
  Typography,
  Upload,
  UploadFile,
  notification,
} from "antd";
import { postApi } from "api";
import { Color, ErrorCode, ErrorMessage, PostResponse, QueryKey } from "constants";
import { useProfile } from "hooks";
import { useState } from "react";
import { inputErrorStyle } from "styles";
import { convertToBase64 } from "utils";
import "./style.css";
import { Post } from "components/Post";

interface CreateSharePostProps {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  parentPost: PostResponse;
}

export const CreateSharePost: React.FC<CreateSharePostProps> = ({ isModalOpen, setIsModalOpen, parentPost }) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [files, setFiles] = useState<string[]>([]);
  const [content, setContent] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const queryClient = useQueryClient();
  const { data: res, isLoading }: any = useProfile({
    enabled: true,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const mutation = useMutation({
    mutationFn: ({ content, files }: { content: string; files: string[] }) =>
      postApi.createPost(content, files, parentPost.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKey.POST] });
      queryClient.invalidateQueries({ queryKey: [QueryKey.SHARE, parentPost.id] });
      handleCancel();
      notification.success({
        message: "Post shared successfully.",
      });
    },
    onError: (error: any) => {
      switch (error?.response?.data?.message) {
        case ErrorCode.NOT_BASE64_FORMAT:
          notification.error({
            message: ErrorMessage.NOT_BASE64_FORMAT,
          });
          break;

        default:
          notification.error({
            message: "Failed to share post.",
          });
          break;
      }
    },
  });

  const handleOk = async () => {
    mutation.mutate({ content, files });
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    if (e.target.value.length > 1000) {
      setError("Character limit is 1000 characters.");
    } else {
      setError(null);
    }
  };

  const handleUploadChange = async ({ fileList }: { fileList: UploadFile[] }) => {
    if (fileList[0]?.originFileObj) {
      try {
        const base64 = await convertToBase64(fileList[0].originFileObj as File);
        setFiles([...files, base64]);
      } catch (error) {
        notification.error({
          message: "Failed to convert file to Base64.",
        });
      }
    }

    setFileList(fileList);
  };

  const handleCancel = () => {
    setFileList([]);
    setFiles([]);
    setContent("");
    setIsModalOpen(false);
  };

  return (
    <Modal
      open={isModalOpen}
      onCancel={handleCancel}
      footer={[
        <Button
          key="submit"
          type={mutation.isPending ? "default" : "primary"}
          style={{ width: "100%" }}
          disabled={(!content.trim() && fileList.length === 0) || mutation.isPending}
          onClick={handleOk}
        >
          {mutation.isPending ? <Spin /> : "Save"}
        </Button>,
      ]}
      style={{ top: 30 }}
    >
      <Typography.Title level={4} style={{ color: Color.SECONDARY }}>
        Share the post
      </Typography.Title>
      <Divider style={{ margin: "15px 0", borderBlockColor: "#000" }} />
      {isLoading ? (
        <>
          <Skeleton active avatar paragraph={{ rows: 0 }} />
          <Skeleton active title={{ width: "100%" }} paragraph={{ rows: 2 }} />
        </>
      ) : (
        <>
          <div style={{ display: "flex", alignItems: "center" }}>
            {res?.data?.profilePictureUrl ? (
              <Avatar size={44} src={res?.data?.profilePictureUrl} alt="Avatar" style={{ marginRight: "15px" }} />
            ) : (
              <Avatar size={44} icon={<UserOutlined />} alt="Avatar" style={{ marginRight: "15px" }} />
            )}
            <Typography.Text style={{ color: "gray" }}>
              {res?.data?.firstName} {res?.data?.lastName}
            </Typography.Text>
          </div>
          <Input.TextArea
            placeholder={`${res?.data?.firstName} ${res?.data?.lastName}, what are you thinking?`}
            style={{
              width: "100%",
              margin: "20px 0 10px",
              border: "none",
            }}
            autoSize={{ minRows: 3, maxRows: 6 }}
            value={content}
            onChange={handleChange}
          />
        </>
      )}

      <div style={inputErrorStyle}>{error && <Typography.Text type="danger">{error}</Typography.Text>}</div>

      <div style={{ maxHeight: "330px", overflowY: "auto", marginTop: "20px" }}>
        <Upload
          listType="picture-card"
          fileList={fileList}
          onChange={handleUploadChange}
          beforeUpload={() => false}
          className="custom-upload-list"
        >
          {fileList.length < 6 && <UploadOutlined />}
        </Upload>
        <div style={{ marginTop: "20px" }}>
          <Post {...parentPost} />
        </div>
      </div>
    </Modal>
  );
};

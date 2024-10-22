import { UploadOutlined, UserOutlined } from "@ant-design/icons";
import {
  Avatar,
  Button,
  Divider,
  Input,
  Modal,
  Typography,
  Upload,
  UploadFile,
  notification,
} from "antd";
import { Color, ErrorCode, ErrorMessage, QueryKey } from "constants";
import { useState } from "react";
import { inputErrorStyle } from "styles";
import "./style.css";
import { useProfile } from "hooks";
import { convertToBase64 } from "utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postApi } from "api";

interface CreatePostProps {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
}

export const CreatePost: React.FC<CreatePostProps> = ({
  isModalOpen,
  setIsModalOpen,
}) => {
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
      postApi.createPost(content, files),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKey.POST] });
      notification.success({
        message: "Post created successfully.",
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
            message: "Failed to create post.",
          });
          break;
      }
    },
  });

  const handleOk = async () => {
    if (content.trim() === "") {
      notification.error({
        message: "Please fill in the content.",
      });
      return;
    }

    mutation.mutate({ content, files });

    setIsModalOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    if (e.target.value.length > 1000) {
      setError("Character limit is 1000 characters.");
    } else {
      setError(null);
    }
  };

  const handleUploadChange = async ({
    fileList,
  }: {
    fileList: UploadFile[];
  }) => {
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

  return (
    <Modal
      open={isModalOpen}
      onCancel={() => setIsModalOpen(false)}
      footer={[
        <Button
          key="submit"
          type="primary"
          style={{ width: "100%" }}
          disabled={!content}
          onClick={handleOk}
        >
          Save
        </Button>,
      ]}
      style={{ maxWidth: "600px", maxHeight: "600px" }}
    >
      <Typography.Title level={4} style={{ color: Color.SECONDARY }}>
        Create the post
      </Typography.Title>
      <Divider style={{ margin: "15px 0", borderBlockColor: "#000" }} />
      <div style={{ display: "flex", alignItems: "center" }}>
        {isLoading ? (
          <>
            <Avatar
              size={44}
              icon={<UserOutlined />}
              alt="Avatar"
              style={{ marginRight: "15px" }}
            />
            <Typography.Text style={{ color: "gray" }}>
              User Name
            </Typography.Text>
          </>
        ) : (
          <>
            <Avatar
              size={44}
              src={res?.data?.profilePictureUrl}
              alt="Avatar"
              style={{ marginRight: "15px" }}
            />
            <Typography.Text style={{ color: "gray" }}>
              {res?.data?.firstName} {res?.data?.lastName}
            </Typography.Text>
          </>
        )}
      </div>

      <Input.TextArea
        placeholder="John Doe, what are you thinking?"
        style={{
          width: "100%",
          margin: "20px 0 10px",
          border: "none",
        }}
        autoSize={{ minRows: 3, maxRows: 6 }}
        value={content}
        onChange={handleChange}
      />

      <div style={inputErrorStyle}>
        {error && <Typography.Text type="danger">{error}</Typography.Text>}
      </div>

      <div style={{ maxHeight: "250px", overflowY: "auto", marginTop: "20px" }}>
        <Upload
          listType="picture-card"
          fileList={fileList}
          onChange={handleUploadChange}
          beforeUpload={() => false}
          className="custom-upload-list"
        >
          {fileList.length < 6 && <UploadOutlined />}
        </Upload>
      </div>
    </Modal>
  );
};

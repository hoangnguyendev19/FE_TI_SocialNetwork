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
import { Color } from "constants";
import { useState } from "react";
import { inputErrorStyle } from "styles";
import "./style.css";

interface CreatePostProps {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
}

export const CreatePost: React.FC<CreatePostProps> = ({
  isModalOpen,
  setIsModalOpen,
}) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [content, setContent] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleOk = async () => {
    if (content.trim() === "") {
      notification.error({
        message: "Please fill in the content.",
      });
      return;
    }

    // Prepare form data for sending to the server
    const formData = new FormData();
    formData.append("content", content);

    fileList.forEach((file) => {
      if (file.originFileObj) {
        formData.append("images", file.originFileObj);
      }
    });

    // try {
    //   // Example API call (replace with your actual API endpoint)
    //   await axios.post("https://your-api-endpoint.com/upload", formData, {
    //     headers: {
    //       "Content-Type": "multipart/form-data",
    //     },
    //   });
    //   message.success("Post saved successfully!");
    //   setIsModalOpen(false);
    //   setContent(""); // Reset content
    //   setFileList([]); // Reset file list
    // } catch (error) {
    //   message.error("Failed to save the post. Please try again.");
    // }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    if (e.target.value.length > 1000) {
      setError("Character limit is 1000 characters.");
    } else {
      setError(null);
    }
  };

  const handleUploadChange = ({ fileList }: { fileList: UploadFile[] }) => {
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
        <Avatar
          alt="avatar"
          shape="circle"
          size="large"
          icon={<UserOutlined />}
          style={{ marginRight: "15px" }}
        />
        <Typography.Text style={{ color: "gray" }}>John Doe</Typography.Text>
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
          {fileList.length < 5 && <UploadOutlined />}
        </Upload>
      </div>
    </Modal>
  );
};

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
import { Color, MediaData } from "constants";
import { useEffect, useState } from "react";
import { inputErrorStyle } from "styles";
import "./style.css";

interface UpdatePostProps {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  text: string;
  mediaList: Array<MediaData>;
}

export const UpdatePost: React.FC<UpdatePostProps> = ({
  isModalOpen,
  setIsModalOpen,
  text,
  mediaList,
}) => {
  const [fileList, setFileList] = useState<UploadFile[]>(
    mediaList.map((media) => ({
      uid: media.id,
      name: media.id,
      status: "done",
      url: media.mediaUrl,
      thumbUrl: media.mediaUrl,
      type: media.mediaType,
    }))
  );
  const [content, setContent] = useState<string>(text);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isModalOpen) {
      setContent(text);
      setFileList(
        mediaList.map((media) => ({
          uid: media.id,
          name: media.id,
          status: "done",
          url: media.mediaUrl,
          thumbUrl: media.mediaUrl,
          type: media.mediaType,
        }))
      );
    }
  }, [isModalOpen, text, mediaList]);

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
    >
      <Typography.Title level={4} style={{ color: Color.SECONDARY }}>
        Update the post
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
          accept="image/*, video/*"
        >
          {fileList.length < 5 && <UploadOutlined />}
        </Upload>
      </div>
    </Modal>
  );
};

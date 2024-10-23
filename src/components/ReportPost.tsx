import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Avatar,
  Button,
  Divider,
  Input,
  Modal,
  notification,
  Radio,
  RadioChangeEvent,
  Skeleton,
  Space,
  Typography,
} from "antd";
import { postApi } from "api";
import { Color, ErrorCode, ErrorMessage, QueryKey } from "constants";
import { useProfile } from "hooks";
import { useState } from "react";

interface ReportPostProps {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  id: string;
}

export const ReportPost: React.FC<ReportPostProps> = ({ isModalOpen, setIsModalOpen, id }) => {
  const queryClient = useQueryClient();
  const { data: res, isLoading }: any = useProfile({
    enabled: true,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const [value, setValue] = useState<number>(1);
  const [reason, setReason] = useState<string>("");

  const onChange = (e: RadioChangeEvent) => {
    setValue(e.target.value);
  };

  const mutation = useMutation({
    mutationFn: (text: string) => postApi.reportPost(id, text),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKey.POST] });
      setIsModalOpen(false);
      notification.success({
        message: "Post reported successfully.",
      });
    },
    onError: (error: any) => {
      switch (error?.response?.data?.message) {
        case ErrorCode.POST_DOES_NOT_EXIST:
          notification.error({
            message: ErrorMessage.POST_DOES_NOT_EXIST,
          });
          break;

        default:
          notification.error({
            message: "Failed to report post.",
          });
          break;
      }
      setIsModalOpen(false);
    },
  });

  const handleOk = () => {
    if (value === 1) {
      mutation.mutate("Community policy violation.");
    } else if (value === 2) {
      mutation.mutate("This article is not true.");
    } else {
      mutation.mutate(reason);
    }
  };

  return (
    <Modal
      open={isModalOpen}
      onCancel={() => setIsModalOpen(false)}
      footer={[
        <Button key="submit" type="primary" style={{ width: "100%" }} onClick={handleOk}>
          Save
        </Button>,
      ]}
      style={{ maxWidth: "600px", maxHeight: "600px" }}
    >
      <Typography.Title level={4} style={{ color: Color.SECONDARY }}>
        Report the post
      </Typography.Title>
      <Divider style={{ margin: "15px 0", borderBlockColor: "#000" }} />
      <div style={{ display: "flex", alignItems: "center" }}>
        {isLoading ? (
          <>
            <Skeleton avatar active paragraph={{ rows: 0 }} />
          </>
        ) : (
          <>
            <Avatar size={44} src={res?.data?.profilePictureUrl} alt="Avatar" style={{ marginRight: "15px" }} />
            <Typography.Text style={{ color: "gray" }}>
              {res?.data?.firstName} {res?.data?.lastName}
            </Typography.Text>
          </>
        )}
      </div>

      <div style={{ margin: "25px 0px" }}>
        <Typography.Text>Why are you reporting this post?</Typography.Text>
        <div style={{ marginTop: "15px" }}>
          <Radio.Group onChange={onChange} value={value}>
            <Space direction="vertical">
              <Radio value={1}>Community policy violation.</Radio>
              <Radio value={2}>This article is not true.</Radio>
              <Radio value={3}>
                Other reasons:
                <Input
                  variant="borderless"
                  disabled={value !== 3}
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  style={{
                    width: 80,
                    marginInlineStart: 5,
                    borderBottom: "1px solid #000",
                    borderRadius: 0,
                    padding: 0,
                  }}
                />
              </Radio>
            </Space>
          </Radio.Group>
        </div>
      </div>
    </Modal>
  );
};

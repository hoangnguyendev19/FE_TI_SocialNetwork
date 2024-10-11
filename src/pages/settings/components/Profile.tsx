import { EditOutlined } from "@ant-design/icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Avatar,
  Button,
  Col,
  DatePicker,
  Input,
  notification,
  Row,
  Skeleton,
  Typography,
  Upload,
  UploadProps,
} from "antd";
import { userApi } from "api";
import AvatarImage from "assets/images/img-avatar.png";
import { ProfileData, QueryKey } from "constants";
import { useProfile } from "hooks";
import moment from "moment";
import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";

export const Profile: React.FC = () => {
  const {
    data: userProfile,
    isLoading,
    isError,
    error,
  } = useProfile({
    enabled: true,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // if (isLoading) {
  //   return (
  //     <Row>
  //       <Col span="24">
  //         <Skeleton
  //           avatar={{ shape: "circle", size: "large" }}
  //           paragraph={{ rows: 4, width: ["100%", "100%", "100%", "100%"] }}
  //           active
  //         />
  //       </Col>
  //     </Row>
  //   );
  // }

  // if (isError) {
  //   return (
  //     <Row>
  //       <Col span="24">
  //         <Typography.Text type="danger">
  //           {error?.message || "An error occurred while fetching the profile"}
  //         </Typography.Text>
  //       </Col>
  //     </Row>
  //   );
  // }

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: any) => userApi.updateProfile(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKey.AUTH] });
      notification.success({
        message: "Profile updated successfully!",
      });
    },
    onError: (error) => {
      notification.error({
        message:
          error.message || "An error occurred while updating the profile",
      });
    },
  });

  const defaultValues: ProfileData = {
    firstName: userProfile?.firstName || "",
    lastName: userProfile?.lastName || "",
    email: userProfile?.email || "",
    presentAddress: userProfile?.presentAddress || "",
    dateOfBirth: userProfile?.dateOfBirth
      ? moment(userProfile?.dateOfBirth)
      : moment(),
    city: userProfile?.city || "",
    permanentAddress: userProfile?.permanentAddress || "",
    country: userProfile?.country || "",
  };

  const schema = yup.object().shape({
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    presentAddress: yup.string().required("Present address is required"),
    dateOfBirth: yup.object().required("Date of birth is required"),
    city: yup.string().required("City is required"),
    permanentAddress: yup.string().required("Permanent address is required"),
    country: yup.string().required("Country is required"),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileData>({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const [profilePictureUrl, setProfilePictureUrl] =
    React.useState<string>(AvatarImage);

  const onSubmit: SubmitHandler<ProfileData> = (data) => {
    mutation.mutate({
      ...data,
      dateOfBirth: moment(data.dateOfBirth).format("YYYY-MM-DD"),
      profilePictureUrl,
    });
  };

  const uploadProps: UploadProps = {
    name: "file",
    action: "https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload", // replace with real API
    headers: {
      authorization: "authorization-text",
    },
    onChange(info) {
      if (info.file.status === "done") {
        const uploadedUrl = info.file.response?.url;
        setProfilePictureUrl(uploadedUrl);
        notification.success({
          message: `${info.file.name} file uploaded successfully!`,
        });
      } else if (info.file.status === "error") {
        notification.error({
          message: `${info.file.name} file upload failed.`,
        });
      }
    },
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Row>
        <Col span="4">
          <Row style={{ position: "relative" }}>
            <Avatar
              shape="circle"
              src={profilePictureUrl}
              alt="Avatar"
              size={130}
            />

            <Upload {...uploadProps} showUploadList={false}>
              <Button
                type="primary"
                shape="circle"
                icon={<EditOutlined />}
                style={{
                  position: "absolute",
                  bottom: "10%",
                  left: "40%",
                  transform: "translate(50%, 50%)",
                }}
              />
            </Upload>
          </Row>
        </Col>
        <Col span="20">
          <Row gutter={[30, 5]}>
            <Col span="12">
              <Typography.Title level={5}>First Name</Typography.Title>
              <Controller
                name="firstName"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Please type your first name!"
                    style={{ padding: "5px 10px" }}
                  />
                )}
              />
              <div style={{ minHeight: "24px" }}>
                {errors.firstName && (
                  <Typography.Text type="danger">
                    {errors.firstName.message}
                  </Typography.Text>
                )}
              </div>
            </Col>
            <Col span="12">
              <Typography.Title level={5}>Last Name</Typography.Title>
              <Controller
                name="lastName"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Please type your last name!"
                    style={{ padding: "5px 10px" }}
                  />
                )}
              />
              <div style={{ minHeight: "24px" }}>
                {errors.lastName && (
                  <Typography.Text type="danger">
                    {errors.lastName.message}
                  </Typography.Text>
                )}
              </div>
            </Col>
            <Col span="12">
              <Typography.Title level={5}>Email</Typography.Title>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="email"
                    placeholder="Please type your email!"
                    style={{ padding: "5px 10px" }}
                  />
                )}
              />
              <div style={{ minHeight: "24px" }}>
                {errors.email && (
                  <Typography.Text type="danger">
                    {errors.email.message}
                  </Typography.Text>
                )}
              </div>
            </Col>
            <Col span="12">
              <Typography.Title level={5}>Present Address</Typography.Title>
              <Controller
                name="presentAddress"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Please type your present address!"
                    style={{ padding: "5px 10px" }}
                  />
                )}
              />
              <div style={{ minHeight: "24px" }}>
                {errors.presentAddress && (
                  <Typography.Text type="danger">
                    {errors.presentAddress.message}
                  </Typography.Text>
                )}
              </div>
            </Col>
            <Col span="12">
              <Typography.Title level={5}>Date of Birth</Typography.Title>
              <Controller
                name="dateOfBirth"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    {...field}
                    value={field.value ? moment(field.value) : null}
                    onChange={(date) => field.onChange(date)}
                    placeholder="yyyy-mm-dd"
                    style={{ padding: "5px 10px", width: "100%" }}
                  />
                )}
              />
              <div style={{ minHeight: "24px" }}>
                {errors.dateOfBirth && (
                  <Typography.Text type="danger">
                    {errors.dateOfBirth.message}
                  </Typography.Text>
                )}
              </div>
            </Col>
            <Col span="12">
              <Typography.Title level={5}>City</Typography.Title>
              <Controller
                name="city"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Please type your city!"
                    style={{ padding: "5px 10px" }}
                  />
                )}
              />
              <div style={{ minHeight: "24px" }}>
                {errors.city && (
                  <Typography.Text type="danger">
                    {errors.city.message}
                  </Typography.Text>
                )}
              </div>
            </Col>
            <Col span="12">
              <Typography.Title level={5}>Permanent Address</Typography.Title>
              <Controller
                name="permanentAddress"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Please type your permanent address!"
                    style={{ padding: "5px 10px" }}
                  />
                )}
              />
              <div style={{ minHeight: "24px" }}>
                {errors.permanentAddress && (
                  <Typography.Text type="danger">
                    {errors.permanentAddress.message}
                  </Typography.Text>
                )}
              </div>
            </Col>
            <Col span="12">
              <Typography.Title level={5}>Country</Typography.Title>
              <Controller
                name="country"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Please type your country!"
                    style={{ padding: "5px 10px" }}
                  />
                )}
              />
              <div style={{ minHeight: "24px" }}>
                {errors.country && (
                  <Typography.Text type="danger">
                    {errors.country.message}
                  </Typography.Text>
                )}
              </div>
            </Col>
          </Row>
          <Row justify="end" style={{ marginTop: "20px" }}>
            <Button
              type="primary"
              htmlType="submit"
              style={{
                padding: "20px 60px",
                fontSize: "18px",
                borderRadius: "10px",
              }}
            >
              Save
            </Button>
          </Row>
        </Col>
      </Row>
    </form>
  );
};

import { EditOutlined, UserOutlined } from "@ant-design/icons";
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
import { ProfileRequest, QueryKey } from "constants";
import { useProfile } from "hooks";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { inputErrorStyle, inputStyle } from "styles";
import { getAccessToken } from "utils";
import * as yup from "yup";

const inputList = [
  {
    name: "firstName",
    label: "First Name",
    placeholder: "Please type your first name!",
  },
  {
    name: "lastName",
    label: "Last Name",
    placeholder: "Please type your last name!",
  },
  {
    name: "phoneNumber",
    label: "Phone Number",
    placeholder: "Please type your phone number!",
  },
  {
    name: "presentAddress",
    label: "Present Address",
    placeholder: "Please type your present address!",
  },
  {
    name: "city",
    label: "City",
    placeholder: "Please type your city!",
  },
  {
    name: "permanentAddress",
    label: "Permanent Address",
    placeholder: "Please type your permanent address!",
  },
  {
    name: "country",
    label: "Country",
    placeholder: "Please type your country!",
  },
];

export const Profile: React.FC = () => {
  const {
    data: res,
    isLoading,
    isError,
    error,
  } = useProfile({
    enabled: true,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: any) => userApi.updateProfile(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKey.AUTH] });
      notification.success({
        message: "Profile updated successfully!",
      });
    },
    onError: (error: any) => {
      notification.error({
        message: error?.response?.data?.message || "Failed to update password!",
      });
    },
  });

  const schema = yup.object().shape({
    firstName: yup
      .string()
      .required("First name is required")
      .min(2, "First name must be at least 2 characters"),
    lastName: yup
      .string()
      .required("Last name is required")
      .min(2, "Last name must be at least 2 characters"),
    phoneNumber: yup
      .string()
      .required("Phone number is required")
      .matches(/^[0-9]+$/, "Phone number is not valid")
      .min(10, "Phone number must be at most 10 digits")
      .max(10, "Phone number must be at most 10 digits"),
    presentAddress: yup.string().required("Present address is required"),
    dateOfBirth: yup
      .date()
      .nullable()
      .required("Date of birth is required")
      .max(new Date(), "Date of birth cannot be in the future")
      .typeError("Invalid date format"),
    city: yup.string().required("City is required"),
    permanentAddress: yup.string().required("Permanent address is required"),
    country: yup.string().required("Country is required"),
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProfileRequest>({
    resolver: yupResolver(schema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      presentAddress: "",
      dateOfBirth: moment().toDate(),
      city: "",
      permanentAddress: "",
      country: "",
    },
  });

  const [profilePictureUrl, setProfilePictureUrl] = useState<string>("");

  useEffect(() => {
    if (res?.data) {
      reset({
        firstName: res.data.firstName || "",
        lastName: res.data.lastName || "",
        phoneNumber: res.data.phoneNumber || "",
        presentAddress: res.data.presentAddress || "",
        dateOfBirth: res.data.dateOfBirth || moment().toDate(),
        city: res.data.city || "",
        permanentAddress: res.data.permanentAddress || "",
        country: res.data.country || "",
      });

      setProfilePictureUrl(res.data.profilePictureUrl || "");
    }
  }, [res?.data, reset]);

  const onSubmit: SubmitHandler<ProfileRequest> = (data) => {
    mutation.mutate({
      ...data,
      dateOfBirth: moment(data.dateOfBirth).format("YYYY-MM-DD"),
    });
  };

  const uploadProps: UploadProps = {
    name: "imageFile",
    action: import.meta.env.VITE_API_URL + "/api/v1/user/avatar",
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
    },
    method: "PUT",
    onChange(info) {
      if (info.file.status === "done") {
        const uploadedUrl = info.file.response?.data;

        setProfilePictureUrl(uploadedUrl);
        queryClient.invalidateQueries({ queryKey: [QueryKey.AUTH] });
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

  if (isLoading) {
    return (
      <Row>
        <Col span="24">
          <Skeleton
            avatar={{ shape: "circle", size: "large" }}
            paragraph={{ rows: 4, width: ["100%", "100%", "100%", "100%"] }}
            active
          />
        </Col>
      </Row>
    );
  }

  if (isError) {
    return (
      <Row>
        <Col span="24">
          <Typography.Text type="danger">
            {error?.message || "An error occurred while fetching the profile"}
          </Typography.Text>
        </Col>
      </Row>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Row>
        <Col span="4">
          <Row style={{ position: "relative" }}>
            {profilePictureUrl ? (
              <Avatar
                shape="circle"
                src={profilePictureUrl}
                alt="Profile Picture"
                size={130}
                aria-label="Profile Picture"
              />
            ) : (
              <Avatar
                shape="circle"
                icon={<UserOutlined />}
                alt="Profile Picture"
                size={130}
                aria-label="Profile Picture"
              />
            )}

            <Upload {...uploadProps} showUploadList={false}>
              <Button
                type="primary"
                shape="circle"
                icon={<EditOutlined />}
                aria-label="Edit Profile Picture"
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
            {inputList.map(({ name, label, placeholder }) => (
              <Col span="12" key={name}>
                <Typography.Title level={5}>
                  {label}
                  <span style={{ color: "red" }}>*</span>
                </Typography.Title>
                <Controller
                  name={name as keyof ProfileRequest}
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...(field as any)}
                      placeholder={placeholder}
                      style={inputStyle}
                    />
                  )}
                />
                <div style={inputErrorStyle}>
                  {errors[name as keyof ProfileRequest] && (
                    <Typography.Text type="danger">
                      {errors[name as keyof ProfileRequest]?.message}
                    </Typography.Text>
                  )}
                </div>
              </Col>
            ))}

            <Col span="12">
              <Typography.Title level={5}>
                Date of Birth
                <span style={{ color: "red" }}>*</span>
              </Typography.Title>
              <Controller
                name="dateOfBirth"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    {...field}
                    value={field.value ? moment(field.value) : null}
                    onChange={(date) =>
                      field.onChange(date ? date.toDate() : null)
                    }
                    placeholder="yyyy-mm-dd"
                    format="YYYY-MM-DD"
                    style={inputStyle}
                  />
                )}
              />
              <div style={inputErrorStyle}>
                {errors.dateOfBirth && (
                  <Typography.Text type="danger">
                    {errors.dateOfBirth.message}
                  </Typography.Text>
                )}
              </div>
            </Col>
          </Row>

          <Row justify="end" style={{ marginTop: "15px" }}>
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

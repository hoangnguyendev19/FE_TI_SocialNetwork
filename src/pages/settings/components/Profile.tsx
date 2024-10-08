import { EditOutlined } from "@ant-design/icons";
import { Avatar, Button, Col, Input, Row, Typography } from "antd";
import AvatarImage from "assets/images/img-avatar.png";
import { Color } from "constants";

export const Profile = () => {
  return (
    <Row>
      <Col span="4">
        <Row style={{ position: "relative" }}>
          <Avatar shape="circle" src={AvatarImage} alt="Avatar" size={130} />
          <Avatar
            shape="circle"
            icon={<EditOutlined />}
            style={{
              backgroundColor: Color.SENCONDARY,
              cursor: "pointer",
              position: "absolute",
              left: "49%",
              bottom: 0,
            }}
          />
        </Row>
      </Col>
      <Col span="20">
        <Row gutter={[30, 15]}>
          <Col span="12">
            <Typography.Title level={5}>First Name</Typography.Title>
            <Input
              placeholder="Please type your first name!"
              style={{ padding: "10px" }}
            />
          </Col>
          <Col span="12">
            <Typography.Title level={5}>Last Name</Typography.Title>
            <Input
              placeholder="Please type your last name!"
              style={{ padding: "10px" }}
            />
          </Col>
          <Col span="12">
            <Typography.Title level={5}>Email</Typography.Title>
            <Input
              type="email"
              placeholder="Please type your email!"
              style={{ padding: "10px" }}
            />
          </Col>
          <Col span="12">
            <Typography.Title level={5}>Present Address</Typography.Title>
            <Input
              placeholder="Please type your present address!"
              style={{ padding: "10px" }}
            />
          </Col>
          <Col span="12">
            <Typography.Title level={5}>Date of Birth</Typography.Title>
            <Input
              placeholder="Please type your date of birth!"
              style={{ padding: "10px" }}
            />
          </Col>
          <Col span="12">
            <Typography.Title level={5}>City</Typography.Title>
            <Input
              placeholder="Please type your city!"
              style={{ padding: "10px" }}
            />
          </Col>
          <Col span="12">
            <Typography.Title level={5}>Permanent Address</Typography.Title>
            <Input
              placeholder="Please type your permanent address!"
              style={{ padding: "10px" }}
            />
          </Col>
          <Col span="12">
            <Typography.Title level={5}>Country</Typography.Title>
            <Input
              placeholder="Please type your country!"
              style={{ padding: "10px" }}
            />
          </Col>
        </Row>
        <Row justify="end" style={{ marginTop: "40px", marginBottom: "20px" }}>
          <Button
            type="primary"
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
  );
};

import React from "react";
import { Card, Button, Typography, Space } from "antd";
import {
  ClockCircleOutlined,
  CheckCircleOutlined,
  ReadOutlined,
  BookOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Text, Title } = Typography;

const CourseInfoSell = ({ course }) => {
  return (
    <Card
      hoverable
      style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
      cover={
        <img
          alt={course.name}
          src={course.image?.file_url}
          style={{ height: 160, objectFit: "cover" }}
        />
      }
    >
      <Title
        level={4}
        style={{ color: "#f5222d", marginBottom: 8, textAlign: "center" }}
      >
        {course.price}đ
      </Title>

      <Button
        type="primary"
        block
        style={{ marginBottom: 16, backgroundColor: "#00bfa6", border: "none" }}
      >
        <Link
          to={{
            pathname: `/payment/${course.id}`,
            state: { course },
          }}
        >
          Đăng ký học
        </Link>
      </Button>

      <Space direction="vertical" size={10}>
        <Text>
          <CheckCircleOutlined style={{ color: "#52c41a", marginRight: 8 }} />
          Cơ bản đến nâng cao
        </Text>
        <Text>
          <ReadOutlined style={{ color: "#1890ff", marginRight: 8 }} />
          Tài liệu đi kèm
        </Text>
        <Text>
          <BookOutlined style={{ color: "#722ed1", marginRight: 8 }} />
          Linh hoạt thời gian
        </Text>
        <Text>
          <ClockCircleOutlined style={{ color: "#faad14", marginRight: 8 }} />
          Học mọi thiết bị
        </Text>
      </Space>
    </Card>
  );
};

export default CourseInfoSell;

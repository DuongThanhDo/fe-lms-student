import React, { useEffect, useState } from "react";
import { Row, Col, Typography, Card, List, Collapse } from "antd";
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  ReadOutlined,
  BookOutlined,
} from "@ant-design/icons";
import CourseInfoSell from "../../components/CourseInfoSell";
import CourseOnContentSell from "../../components/CourseOnContentSell";
import axios from "axios";
import { useParams } from "react-router-dom";
import { configs } from "../../configs";

const { Title, Paragraph } = Typography;

const CourseDetail = () => {
  const [course, setCourse] = useState({});
  const [requirements, setRequirements] = useState([]);
  const [outcomes, setOutcomes] = useState([]);

  const { id: courseId } = useParams();

  const fetchData = async () => {
    try {
      const [c, r, o] = await Promise.all([
        axios.get(`${configs.API_BASE_URL}/courses/${courseId}`),
        axios.get(
          `${configs.API_BASE_URL}/course-requirements?courseId=${courseId}`
        ),
        axios.get(`${configs.API_BASE_URL}/course-outcomes?courseId=${courseId}`),
      ]);

      setCourse(c.data);
      setRequirements(r.data);
      setOutcomes(o.data);
    } catch (error) {
      console.error("Lỗi khi fetch courses:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Row gutter={40} style={{ marginTop: 40 }}>
      {/* Left content */}
      <Col span={18}>
        <Title level={2}>{course.name}</Title>
        <Paragraph>{course.description}</Paragraph>

        <Title level={4}>Bạn sẽ học được gì?</Title>
        <List
          dataSource={outcomes}
          renderItem={(item) => (
            <List.Item>
              <CheckCircleOutlined
                style={{ color: "#52c41a", marginRight: 8 }}
              />
              {item.description}
            </List.Item>
          )}
        />

        <Title level={4} style={{ marginTop: 40 }}>
          Nội dung khóa học
        </Title>
        <CourseOnContentSell />

        <Title style={{ marginTop: 40 }} level={4}>
          Yêu cầu
        </Title>
        <List
          dataSource={requirements}
          renderItem={(item) => (
            <List.Item>
              <CheckCircleOutlined
                style={{ color: "#52c41a", marginRight: 8 }}
              />
              {item.description}
            </List.Item>
          )}
        />
      </Col>

      {/* Right sidebar */}
      <Col span={6}>
        <CourseInfoSell course={course} />
      </Col>
    </Row>
  );
};

export default CourseDetail;

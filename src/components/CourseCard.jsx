import React from "react";
import { Card, Badge } from "react-bootstrap";
import "../assets/css/CourseCard.css";
import { Link } from "react-router-dom";
import { Tag } from "antd";

const CourseCard = ({ course }) => {
  return (
    <Link style={{ textDecoration: "none" }} to={`/courses/${course.id}`}>
      <Card className="shadow-sm border-0 course-card">
        <div className="image-container">
          <Card.Img variant="top" src={course.image?.file_url} alt={course.name} />
        </div>
        <Card.Body>
          <Card.Title className="course-title">{course.name}</Card.Title>
          <Card.Text className="text-muted">{course.teacher?.profile.name || "Giảng viên"}</Card.Text>
          <Tag
            color={course.type === "online" ? "green" : "blue"}
          >
            {course.type}
          </Tag>
          <div className="mt-2">
            <strong className="text-primary">{course.price}đ</strong>{" "}
          </div>
        </Card.Body>
      </Card>
    </Link>
  );
};

export default CourseCard;

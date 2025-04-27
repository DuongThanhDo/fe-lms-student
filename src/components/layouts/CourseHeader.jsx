import React from "react";
import { Button, Typography, Progress } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Header } from "antd/es/layout/layout";

const CourseHeader = ({ course, navigator, progress, totalLessons, completedLessons }) => {
  return (
    <Header className="custom-header" style={{ display: "flex", alignItems: "center" }}>
      <Button icon={<ArrowLeftOutlined />} onClick={() => navigator("/my-courses")} />
      <Typography.Title level={4} style={{ margin: 0, marginLeft: 12, color: "white" }}>
        {course?.course?.name || "Khóa học"}
      </Typography.Title>

      <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 8 }}>
        <Progress
          type="circle"
          percent={Math.round(progress)}
          size={36}
          strokeColor="#1B8381"
          format={(p) => (
            <span style={{ color: "white" }}>
              {p}%
            </span>
          )}
        />
        <Typography.Text style={{ color: "white" }}>
          {completedLessons}/{totalLessons} bài học
        </Typography.Text>
      </div>
    </Header>
  );
};


export default CourseHeader;

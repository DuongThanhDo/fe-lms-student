import React from "react";
import { Card } from "antd";
import "bootstrap/dist/css/bootstrap.min.css";
import { assets } from "../../assets";
import { Row, Col } from "react-bootstrap";
import CourseCard from "../../components/CourseCard";

const teacherData = {
  avatar: "https://cdn-icons-png.flaticon.com/512/4140/4140048.png",
  name: "Hứa Văn Cường",
  major: "Công nghệ phần mềm",
  degree: "Giáo sư Tiến sĩ",
  phone: "0123-456-789",
  email: "teacher@gmail.com",
  address: "Đại học Huế, TP. Huế, Thừa Thiên-Huế",
  experience:
    "Phó Giáo sư, Tiến sĩ Nguyễn Văn A có gần 20 năm kinh nghiệm giảng dạy và nghiên cứu trong lĩnh vực Công nghệ Phần mềm. Hiện tại, ông là giảng viên tại Trung tâm Eduhub, nơi ông trực tiếp hướng dẫn học viên từ cơ bản đến nâng cao...",
};

const fakeCourses = [
  {
    id: 1,
    title: "Khóa học ReactJS từ cơ bản đến nâng cao",
    instructor: "Nguyễn Văn A",
    price: "499.000",
    oldPrice: "999.000",
    image: assets.images.about1,
    isOnline: true,
  },
  {
    id: 2,
    title: "Lập trình Java chuyên sâu",
    instructor: "Trần Văn B",
    price: "299.000",
    oldPrice: "599.000",
    image: assets.images.banner1,
    isOnline: false,
  },
  {
    id: 3,
    title: "Thiết kế giao diện với Figma",
    instructor: "Lê Thị C",
    price: "199.000",
    oldPrice: "399.000",
    image: assets.images.about1,
    isOnline: true,
  },
  {
    id: 4,
    title: "Python cho người mới bắt đầu",
    instructor: "Phạm Văn D",
    price: "399.000",
    oldPrice: "799.000",
    image: assets.images.about1,
    isOnline: true,
  },
];

const DetailTeacher = () => {
  return (
    <div className="container mt-4">
      <Row>
        <Col md={3}>
          <Card className="shadow-sm rounded-3 border-0 text-center p-3">
            <img
              src={teacherData.avatar}
              alt="Teacher"
              className="rounded-circle mx-auto d-block"
              style={{ width: 120, height: 120, objectFit: "cover" }}
            />
            <h3 className="fw-bold mt-3">{teacherData.name}</h3>
            <div className="row mt-4">
              <div className="col-6">
                <h5 className="fw-bold">5200</h5>
                <p className="text-muted">Học viên</p>
              </div>
              <div className="col-6">
                <h5 className="fw-bold">123</h5>
                <p className="text-muted">Đánh giá</p>
              </div>
            </div>
          </Card>
        </Col>

        <Col md={9}>
          <Card className="shadow-sm rounded-3 border-0 p-3">
            <h5 className="fw-bold">Thông tin giảng viên</h5>
            <p>
              <strong>Chuyên Ngành:</strong> {teacherData.major}
            </p>
            <p>
              <strong>Trình độ:</strong> {teacherData.degree}
            </p>
            <p>
              <strong>Gọi điện:</strong> {teacherData.phone}
            </p>
            <p>
              <strong>Email:</strong> {teacherData.email}
            </p>
            <p>
              <strong>Địa chỉ:</strong> {teacherData.address}
            </p>
            <h5 className="fw-bold">Kinh nghiệm làm việc</h5>
            <p>{teacherData.experience}</p>
          </Card>
        </Col>
      </Row>

      <h2 className="mt-5">Khóa học của giáo viên</h2>
      <Row className="mt-4 g-4">
        {fakeCourses.map((course) => (
          <Col key={course.id} md={6} lg={4} xl={3}>
            <CourseCard course={course} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default DetailTeacher;

import React from "react";
import TeacherCard from "../../components/TeacherCard";
import { assets } from "../../assets";
import { Col, Row } from "react-bootstrap";

const teachers = [
  {
    id: 1,
    name: "Nguyễn Văn A",
    major: "Trí tuệ nhân tạo",
    degree: "Tiến sĩ",
    image: assets.images.about1,
  },
  {
    id: 2,
    name: "Trần Thị B",
    major: "Khoa học dữ liệu",
    degree: "Thạc sĩ",
    image: assets.images.about1,
  },
  {
    id: 3,
    name: "Phạm Văn C",
    major: "An toàn thông tin",
    degree: "Giáo sư",
    image: assets.images.about1,
  },
  {
    id: 4,
    name: "Lê Thị D",
    major: "Hệ thống thông tin",
    degree: "Tiến sĩ",
    image: assets.images.about1,
  },
  {
    id: 5,
    name: "Hoàng Văn E",
    major: "Phát triển phần mềm",
    degree: "Thạc sĩ",
    image: assets.images.about1,
  },
  {
    id: 6,
    name: "Đặng Thị F",
    major: "Khoa học máy tính",
    degree: "Tiến sĩ",
    image: assets.images.about1,
  },
  {
    id: 7,
    name: "Vũ Văn G",
    major: "Mạng máy tính",
    degree: "Giáo sư",
    image: assets.images.about1,
  },
  {
    id: 8,
    name: "Bùi Thị H",
    major: "Công nghệ phần mềm",
    degree: "Tiến sĩ",
    image: assets.images.about2,
  },
];

const Teacher = () => {
  return (
    <div>
      <h1 className="text-center mt-3">Danh sách giảng viên</h1>

      <Row>
        {teachers.map((teacher) => (
          <Col key={teacher.id} className="mt-4">
            <TeacherCard teacher={teacher} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Teacher;

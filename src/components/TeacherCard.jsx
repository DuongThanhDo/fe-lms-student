import React from "react";
import { Card, Button } from "antd";
import "bootstrap/dist/css/bootstrap.min.css";
import { assets } from "../assets";
import { Link } from "react-router-dom";
import { configs } from "../configs";

const TeacherCard = ({ teacher }) => {
  return (
    <Card className="shadow-sm rounded-3 border-0" style={{ width: 300 }}>
      <img
        src={teacher.image || assets.images.defaultAvatar}
        alt={teacher.name}
        className="w-100 rounded-top"
        style={{ height: 180, objectFit: "cover" }}
      />
      <div className="p-1 mt-2">
        <h5 className="fw-bold">{teacher.name}</h5>
        <p className="mb-1">
          <strong>Chuyên Ngành:</strong> {teacher.major}
        </p>
        <p className="mb-3">
          <strong>Trình độ:</strong> {teacher.degree}
        </p>
        <Link to={`${configs.routes.teacher}/${teacher.id}`}>
          <Button type="primary" block>
            Xem chi tiết
          </Button>
        </Link>
      </div>
    </Card>
  );
};

export default TeacherCard;

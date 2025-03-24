import React, { useState } from "react";
import { Dropdown, Menu, Avatar, Modal } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../store/slices/authSlice";

const AvatarMenu = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/login');
    setIsModalVisible(false);
  };

  const userMenu = (
    <Menu>
      <Menu.Item key="1">
        <Link className="text-decoration-none" to="/profile">
          Trang cá nhân
        </Link>
      </Menu.Item>
      <Menu.Item key="2">
        <Link className="text-decoration-none" to="/my-course">
          Khóa học của tôi
        </Link>
      </Menu.Item>
      <Menu.Item key="3">
        <Link className="text-decoration-none" to="/lich">
          Lịch học
        </Link>
      </Menu.Item>
      <Menu.Item key="4">
        <Link className="text-decoration-none" to="/message">
          Tin nhắn
        </Link>
      </Menu.Item>
      <Menu.Item key="5">
        <Link className="text-decoration-none" to="/history">
          Lịch sử mua
        </Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="6">
        <Link className="text-decoration-none" to="/change-password">
          Đổi mật khẩu
        </Link>
      </Menu.Item>
      <Menu.Item onClick={showModal} key="7">
        Đăng xuất
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      {" "}
      <Dropdown
        overlay={userMenu}
        placement="bottomRight"
        arrow
        trigger={["click"]}
      >
        <div>
          <Avatar icon={<UserOutlined />} style={{ cursor: "pointer" }} />
        </div>
      </Dropdown>
      <Modal
        title="Xác nhận đăng xuất"
        visible={isModalVisible}
        onOk={handleLogout}
        onCancel={handleCancel}
        centered
        okText="Đăng xuất"
        cancelText="Hủy"
      >
        <p>Bạn có chắc chắn muốn đăng xuất không?</p>
      </Modal>
    </>
  );
};

export default AvatarMenu;

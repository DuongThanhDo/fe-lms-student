import React, { useState } from "react";
import {
  Card,
  Form,
  Input,
  Button,
  Select,
  InputNumber,
  Typography,
  Divider,
  message,
} from "antd";
import { BankOutlined, UserOutlined, DollarOutlined } from "@ant-design/icons";
import axios from "axios";
import { configs } from "../../configs";
import { useSelector } from "react-redux";

const { Title } = Typography;
const { Option } = Select;

const Payment = () => {
  const user = useSelector((state) => state.auth.userInfo);
  const [loading, setLoading] = useState(false);

  const handleFinish = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post(`${configs.API_BASE_URL}/payment`, {
        ...values,
        userId: user?.id,
      });

      const url = response.data.url;
      window.location.href = url;
    } catch (err) {
      message.error("Không thể tạo link thanh toán. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card
      style={{
        maxWidth: 600,
        margin: "auto",
        marginTop: 40,
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      }}
    >
      <Title level={3} style={{ textAlign: "center" }}>
        Thanh toán khóa học qua VNPay
      </Title>
      <Divider />
      <Form layout="vertical" onFinish={handleFinish}>
        <Form.Item
          label="Tên học viên"
          name="studentName"
          initialValue={user?.fullName}
          rules={[{ required: true, message: "Vui lòng nhập tên học viên" }]}
        >
          <Input prefix={<UserOutlined />} placeholder="Nguyễn Văn A" />
        </Form.Item>

        <Form.Item
          label="Chọn ngân hàng"
          name="bankCode"
          rules={[{ required: true, message: "Vui lòng chọn ngân hàng" }]}
        >
          <Select placeholder="Chọn ngân hàng thanh toán" allowClear>
            <Option value="NCB">NCB - Ngân hàng Quốc Dân</Option>
            <Option value="VNBANK">VNBank</Option>
            <Option value="BIDV">BIDV</Option>
            <Option value="VISA">VISA/MasterCard</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Số tiền thanh toán (VNĐ)"
          name="amount"
          rules={[{ required: true, message: "Vui lòng nhập số tiền" }]}
        >
          <InputNumber
            prefix={<DollarOutlined />}
            min={10000}
            step={1000}
            style={{ width: "100%" }}
            placeholder="Nhập số tiền (vd: 200000)"
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            block
            loading={loading}
            icon={<BankOutlined />}
          >
            Thanh toán
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default Payment;

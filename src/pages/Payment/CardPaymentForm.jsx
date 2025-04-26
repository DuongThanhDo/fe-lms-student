import React from 'react';
import { Typography, Card, Table } from 'antd';
import 'bootstrap/dist/css/bootstrap.min.css';

const { Title } = Typography;

const CardPaymentForm = () => {
  const customerInfo = [
    { label: 'Thông tin cá nhân', value: 'Komang J. Artha' },
    { label: 'Email', value: 'Komangartha44@gmail.com' },
    { label: 'Phương thức thanh toán', value: 'Bank Transfer' },
  ];

  return (
    <div className="container my-5">
      <Card className="shadow">
        <div className="text-center mb-4">
          <Title level={2} style={{ color: '#334ac0' }}>HealthHub</Title>
          <Title level={4}>Thanh toán thành công!</Title>
        </div>

        <div className="mb-4">
          <h5 className="fw-bold">Tổng hóa đơn</h5>
          <Table
            pagination={false}
            showHeader={false}
            dataSource={[
              { key: 1, label: 'Tiền khám bệnh', value: '399.000 VNĐ' },
              { key: 2, label: 'Tổng tiền', value: '399.000 VNĐ' },
            ]}
            columns={[
              {
                dataIndex: 'label',
                key: 'label',
                render: (text, row, index) => (
                  <span className={index === 1 ? 'fw-bold border-top pt-2 d-block' : ''}>{text}</span>
                ),
              },
              {
                dataIndex: 'value',
                key: 'value',
                align: 'right',
                render: (text, row, index) => (
                  <span className={index === 1 ? 'fw-bold d-block pt-2' : ''}>{text}</span>
                ),
              },
            ]}
          />
        </div>

        <div>
          <h5 className="fw-bold mb-3">Thông tin khách hàng</h5>
          <Table
            pagination={false}
            showHeader={false}
            dataSource={customerInfo.map((item, idx) => ({ ...item, key: idx }))}
            columns={[
              {
                dataIndex: 'label',
                key: 'label',
                render: text => <span className="fw-bold">{text}</span>,
              },
              {
                dataIndex: 'value',
                key: 'value',
                align: 'right',
              },
            ]}
          />
        </div>
      </Card>
    </div>
  );
};

export default CardPaymentForm;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { configs } from '../../configs';

function PaymentReturn() {
  const [paymentStatus, setPaymentStatus] = useState('');
  const location = useLocation();
  
  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const status = query.get('status');
    
    const verifyPayment = async () => {
      try {
        const response = await axios.post(`${configs.API_BASE_URL}/payment/verify`, {
          status,
          vnp_TxnRef: query.get('vnp_TxnRef'),
          vnp_SecureHash: query.get('vnp_SecureHash'),
        });

        setPaymentStatus(response.data);
      } catch (error) {
        console.error('Lỗi xác thực thanh toán', error);
        setPaymentStatus('Lỗi trong quá trình xác thực.');
      }
    };

    if (status) {
      verifyPayment();
    }
  }, [location]);

  return (
    <div>
      <h1>Kết quả thanh toán</h1>
      <p>{paymentStatus}</p>
    </div>
  );
}

export default PaymentReturn;

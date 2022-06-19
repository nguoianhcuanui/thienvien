import { Page } from "framework7-react";
import React from "react";

const RegisterSuccessPage = () => {
  return (
    <Page name="RegisterSuccessPage">
      <h2 style={{ marginTop: "100px", textAlign: "center" }}>
        Đăng ký thành công
      </h2>
      <div className="dummy-positioning d-flex" style={{margin: '0 auto', textAlign: 'center'}}>
        <div className="success-icon">
          <div className="success-icon__tip"></div>
          <div className="success-icon__long"></div>
        </div>
      </div>
      <p style={{margin: '30px', textAlign: 'center'}}>
        Bạn đã đăng ký thông tin thành công.<br/> Vui lòng liên hệ Thầy Tri Khách để
        được xác nhận
      </p>
    </Page>
  );
};

export default RegisterSuccessPage;

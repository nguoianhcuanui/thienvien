import {
  BlockTitle,
  Button,
  Col,
  f7,
  List,
  ListInput,
  Navbar,
  Page,
  Row,
} from "framework7-react";
import moment from "moment";
import React, { useRef, useState } from "react";
import PhotoUploader from "../components/photo-uploader";
import { register } from "../js/api";

const RegisterPage = () => {
  const [frontImage, setFrontImage] = useState(null);
  const [backImage, setBackImage] = useState(null);
  const [submiting, setSubmiting] = useState(false);
  const form = useRef();
  const handleSubmit = async (e) => {
    if (!validateForm()) {
      return;
    }
    const formData = new FormData(form.current);
    let data = {
      idcardFrontImageUrl: frontImage,
      idcardBackImageUrl: backImage,
    };
    for (let [key, value] of formData.entries()) {
      data[key] = value;
    }
    setSubmiting(true);
    let resp = await register(data);
    if (resp.error < 0) {
      f7.dialog.alert("Có lỗi xảy ra!(" + resp.message + ")");
    } else {
      f7.views.main.router.navigate("/dangky/thanhcong", {
        clearPreviousHistory: true,
        animate: true,
        history: false,
        browserHistory: false,
        openIn: "loginScreen",
      });
    }
    setSubmiting(false);
  };
  const validateForm = (validate, e) => {
    const formData = new FormData(form.current);
    let data = {
      idcardFrontImageUrl: frontImage,
      idcardBackImageUrl: backImage,
    };

    if (!frontImage || !backImage) {
      f7.toast
        .create({
          text: "Vui lòng tải lên hình chụp CMND/CCCD",
          closeTimeout: 3000,
          position: "top",
          closeButton: true,
        })
        .open();
      return false;
    }
    for (let [key, value] of formData.entries()) {
      data[key] = value;
      if (!value) {
        document
          .querySelector(`input[name=${key}], select[name=${key}]`)
          .reportValidity();
        document
          .querySelector(`input[name=${key}], select[name=${key}]`)
          .scrollIntoView({
            behavior: "smooth",
          });
        return false;
      }
    }
    return true;
  };

  return (
    <Page name="RegisterPage">
      <form ref={form}>
        <Navbar title="Đăng ký tập tu" backLink="Back"></Navbar>
        <BlockTitle>Thông tin cá nhân</BlockTitle>
        <List noHairlinesMd>
          <ListInput
            label="Họ và tên"
            type="text"
            placeholder="Họ và tên"
            required
            validate
            errorMessage="Vui lòng nhập họ và tên"
            name="fullname"
          ></ListInput>

          <ListInput
            label="Pháp danh"
            type="text"
            placeholder="Pháp danh"
            required
            validate
            errorMessage="Vui lòng nhập pháp danh"
            name="nickname"
          ></ListInput>

          <ListInput
            label="Số điện thoại"
            type="tel"
            placeholder="Số điện thoại"
            required
            validate
            errorMessage="Vui lòng nhập số điện thoại"
            name="phone"
          ></ListInput>

          <ListInput
            label="Ngày sinh"
            placeholder="Ngày sinh"
            type="date"
            defaultValue={"1980-01-01"}
            errorMessage="Vui lòng nhập ngày sinh"
            name="birthday"
            required
            validate
          ></ListInput>

          <ListInput
            label="Số CMND/CCCD"
            type="text"
            placeholder="Số CMND/CCCD"
            errorMessage="Vui lòng nhập số CMND/CCCD"
            name="idcard"
            required
            validate
          ></ListInput>

          <ListInput
            label="Ngày cấp"
            placeholder="Ngày cấp"
            type="date"
            defaultValue={"1990-01-01"}
            errorMessage="Vui lòng nhập ngày cấp CMND"
            name="idcardCreatedAt"
            required
            validate
          ></ListInput>

          <ListInput
            label="Địa chỉ thường trú"
            type="text"
            placeholder="Địa chỉ thường trú"
            errorMessage="Vui lòng nhập địa chỉ thường trú"
            name="address"
            required
            validate
          ></ListInput>

          <ListInput
            label="Địa chỉ tạm trú"
            type="text"
            placeholder="Địa chỉ tạm trú"
            errorMessage="Vui lòng nhập địa chỉ tạm trú"
            name="temporaryAddress"
            required
            validate
          ></ListInput>

          <Row style={{ padding: "0 10px" }}>
            <Col>
              <span className="item-title item-label">Mặt trước CMND*</span>
              <PhotoUploader value={frontImage} onChange={setFrontImage} />
            </Col>
            <Col>
              <span className="item-title item-label">Mặt sau CMND*</span>
              <PhotoUploader value={backImage} onChange={setBackImage} />
            </Col>
          </Row>
        </List>
        <BlockTitle>Ngày đăng ký ở lại</BlockTitle>
        <List inlineLabels>
          <ListInput
            label="Ngày đến"
            type="date"
            placeholder="Ngày đến"
            name="startTime"
            defaultValue={(() => moment().add(1, "day").format("YYYY-MM-DD"))()}
            calendarParams={{ dateFormat: "dd/mm/yyyy" }}
            required
            validate
          ></ListInput>
          <ListInput
            label="Ngày đi"
            type="date"
            placeholder="Ngày đi"
            defaultValue={(() => moment().add(2, "day").format("YYYY-MM-DD"))()}
            calendarParams={{ dateFormat: "dd/mm/yyyy" }}
            name="endTime"
            required
            validate
          ></ListInput>
        </List>
        <BlockTitle>Liên hệ đến người thân</BlockTitle>
        <List inlineLabels>
          <ListInput
            label="Họ và tên"
            type="text"
            placeholder="Họ và tên"
            name="contactName"
            errorMessage="Vui lòng nhập họ và tên người thân"
            required
            validate
          ></ListInput>
          <ListInput
            label="Số điện thoại"
            type="tel"
            placeholder="Số điện thoại"
            name="contactPhone"
            required
            validate
            style={{ marginBottom: "50px" }}
            errorMessage="Vui lòng nhập số điện thoại người thân"
          ></ListInput>
        </List>
        <Button
          fill
          onClick={handleSubmit}
          // disabled={!allowSubmit || submiting}
          preloader
          style={{
            position: "fixed",
            bottom: "0",
            width: "100%",
            left: "0",
            zIndex: 5000,
            borderRadius: 0,
          }}
          loading={submiting}
        >
          Đăng ký
        </Button>
      </form>
    </Page>
  );
};

export default RegisterPage;

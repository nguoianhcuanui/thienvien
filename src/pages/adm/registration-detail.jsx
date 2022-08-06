import {
  BlockTitle,
  Button,
  Col,
  List,
  ListInput,
  Navbar,
  Page,
  Row,
  f7,
} from "framework7-react";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { getRegistration, sendEmail, updateRegistration } from "../../js/api";
import { REGISTRATIONS_STATUS } from "../../js/constant";
import AdmLayout from "./adm-layout";

const RegistrationDetail = (props) => {
  let { id } = props;
  if (!id) {
    let paths = location.href.split("/");
    id = paths[paths.length - 1];
  }
  const [data, setData] = useState({});
  useEffect(() => {
    reload();
  }, []);

  const reload = async () => {
    const resp = await getRegistration(id);
    setData(resp.data || {});
  };
  const handleSubmit = async () => {
    f7.dialog.preloader("Đang gửi email thông tin cư sĩ tới công an phường");
    const resp = await sendEmail({ ids: [parseInt(id)] });
    if (resp.error == 0) {
      f7.toast
        .create({ text: "Gửi thông tin thành công", closeTimeout: 3000 })
        .open();
    } else {
      f7.dialog.alert("Có lỗi xảy ra!(" + resp.message + ")");
    }
    f7.dialog.close();
  };
  const handleUpdateStatus = async (status) => {
    if (status == REGISTRATIONS_STATUS.REJECTED) {
      f7.dialog.confirm(
        "Bạn có chắc chắn muốn TỪ CHỐI DUYỆT cư sĩ này không?",
        "Xác nhận",
        async () => {
          f7.preloader.show();
          const resp = await updateRegistration({ ...data, status });
          f7.preloader.hide();
          if (resp.error == 0) {
            f7.toast
              .create({ text: "Từ chối duyệt thành công", closeTimeout: 3000 })
              .open();
          } else {
            f7.dialog.alert("Có lỗi xảy ra!(" + resp.message + ")");
          }
        }
      );
    } else {
      f7.preloader.show();
      const resp = await updateRegistration({ ...data, status });
      f7.preloader.hide();
      if (resp.error == 0) {
        f7.toast
          .create({ text: "Duyệt thành công", closeTimeout: 3000 })
          .open();
      } else {
        f7.dialog.alert("Có lỗi xảy ra!(" + resp.message + ")");
      }
    }
  };
  return (
    <AdmLayout {...props}>
      <Page>
        <Navbar title="Thông tin cư sĩ" backLink="Back"></Navbar>
        <List inlineLabels noHairlinesMd>
          <ListInput
            label="Họ và tên"
            type="text"
            placeholder="Họ và tên"
            required
            validate
            errorMessage="Vui lòng nhập họ và tên"
            name="fullname"
            readonly
            defaultValue={data?.fullname}
          ></ListInput>

          <ListInput
            label="Pháp danh"
            type="text"
            placeholder="Pháp danh"
            required
            validate
            errorMessage="Vui lòng nhập pháp danh"
            name="nickname"
            readonly
            defaultValue={data?.nickname}
          ></ListInput>

          <ListInput
            label="Số điện thoại"
            type="tel"
            placeholder="Số điện thoại"
            required
            validate
            errorMessage="Vui lòng nhập số điện thoại"
            name="phone"
            readonly
            defaultValue={data?.phone}
          ></ListInput>

          <ListInput
            label="Ngày sinh"
            placeholder="Ngày sinh"
            type="date"
            defaultValue={
              data?.birthday
                ? moment(data?.birthday).format("YYYY-MM-DD")
                : null
            }
            errorMessage="Vui lòng nhập ngày sinh"
            name="birthday"
            required
            validate
            readonly
          ></ListInput>

          <ListInput
            label="Số CMND/CCCD"
            type="text"
            placeholder="Số CMND/CCCD"
            errorMessage="Vui lòng nhập số CMND/CCCD"
            name="idcard"
            required
            validate
            readonly
            defaultValue={data?.idcard}
          ></ListInput>

          <ListInput
            label="Ngày cấp"
            placeholder="Ngày cấp"
            type="date"
            errorMessage="Vui lòng nhập ngày cấp CMND"
            name="idcardCreatedAt"
            required
            validate
            readonly
            defaultValue={
              data?.idcardCreatedAt
                ? moment(data?.idcardCreatedAt).format("YYYY-MM-DD")
                : null
            }
          ></ListInput>

          <ListInput
            label="Địa chỉ thường trú"
            type="text"
            placeholder="Địa chỉ thường trú"
            errorMessage="Vui lòng nhập địa chỉ thường trú"
            name="address"
            required
            validate
            readonly
            defaultValue={data?.address}
          ></ListInput>

          <ListInput
            label="Địa chỉ tạm trú"
            type="text"
            placeholder="Địa chỉ tạm trú"
            errorMessage="Vui lòng nhập địa chỉ tạm trú"
            name="temporaryAddress"
            required
            validate
            readonly
            defaultValue={data?.temporaryAddress}
          ></ListInput>

          <Row style={{ padding: "0 10px" }}>
            <Col
              style={{
                textAlign: "center",
                borderRight: "solid 1px #607d8b61",
              }}
            >
              <span className="item-title item-label">Mặt trước CMND</span>
              <img width="50%" src={data.idcardFrontImageUrl} />
            </Col>
            <Col style={{ textAlign: "center" }}>
              <span className="item-title item-label">Mặt sau CMND</span>
              <img width="50%" src={data.idcardBackImageUrl} />
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
            calendarParams={{ dateFormat: "dd/mm/yyyy" }}
            required
            validate
            readonly
            defaultValue={
              data?.startTime
                ? moment(data?.startTime).format("YYYY-MM-DD")
                : null
            }
          ></ListInput>
          <ListInput
            label="Ngày đi"
            type="date"
            placeholder="Ngày đi"
            calendarParams={{ dateFormat: "dd/mm/yyyy" }}
            name="endTime"
            required
            validate
            readonly
            defaultValue={
              data?.endTime ? moment(data?.endTime).format("YYYY-MM-DD") : null
            }
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
            readonly
            defaultValue={data?.contactName}
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
            readonly
            defaultValue={data?.contactPhone}
          ></ListInput>
        </List>
        <Row
          noGap
          style={{
            position: "fixed",
            bottom: "0",
            width: "100%",
            left: "0",
            zIndex: 5000,
            borderRadius: 0,
            background: "white",
          }}
        >
          <Col>
            <Button
              fill
              onClick={() => handleUpdateStatus(REGISTRATIONS_STATUS.APPROVED)}
              preloader
              color="green"
              style={{ borderRadius: 0 }}
            >
              Duyệt
            </Button>
          </Col>
          <Col>
            <Button
              fill
              onClick={handleSubmit}
              preloader
              color="blue"
              style={{ borderRadius: 0 }}
            >
              Gửi thông tin
            </Button>
          </Col>
          <Col>
            <Button
              fill
              onClick={() => handleUpdateStatus(REGISTRATIONS_STATUS.REJECTED)}
              preloader
              color="orange"
              style={{ borderRadius: 0 }}
            >
              Từ chối duyệt
            </Button>
          </Col>
        </Row>
      </Page>
    </AdmLayout>
  );
};

export default RegistrationDetail;

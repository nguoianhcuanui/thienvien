import {
  Button,
  f7,
  List,
  ListInput,
  LoginScreenTitle,
  Page,
} from "framework7-react";
import React, { useState } from "react";
import { login } from "../../js/api";
const LoginPage = ({ f7router }) => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const signIn = async () => {
    let resp = await login(phone, password);
    if (!resp) {
      f7.toast
        .create({
          text: "Tên đăng nhập hoặc mật khẩu không đúng",
          position: "top",
          closeTimeout: 3000,
        })
        .open();
    } else {
      location.replace('/quanly')
    }
  };

  return (
    <Page
      noToolbar
      noNavbar
      noSwipeback
      loginScreen
      style={{
        backgroundImage: 'url("/images/bg6.png")',
        backgroundPosition: "bottom",
        backgroundSize: "cover",
      }}
    >
      <LoginScreenTitle>ĐĂNG NHẬP</LoginScreenTitle>
      <List form noHairlinesMd>
        <ListInput
          label="Số điện thoại"
          type="text"
          placeholder="Số điện thoại"
          value={phone}
          onInput={(e) => {
            setPhone(e.target.value);
          }}
        />
        <ListInput
          label="Mật khẩu"
          type="password"
          placeholder="Mật khẩu"
          value={password}
          onInput={(e) => {
            setPassword(e.target.value);
          }}
        />
      </List>
      <Button fill onClick={signIn} style={{ margin: "10px 60px" }}>
        ĐĂNG NHẬP
      </Button>
    </Page>
  );
};

export default LoginPage;

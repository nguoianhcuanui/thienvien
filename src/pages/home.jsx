import React from "react";
import {
  Page,
  Navbar,
  NavLeft,
  NavTitle,
  NavTitleLarge,
  NavRight,
  Link,
  Toolbar,
  Block,
  BlockTitle,
  List,
  ListItem,
  Row,
  Col,
  Button,
} from "framework7-react";
// import bg from ''
import "../css/icons.css";

const HomePage = () => (
  <Page name="home">
    {/* Top Navbar */}
    {/* <Navbar large sliding={false}>
      <NavLeft>
        <Link iconIos="f7:menu" iconAurora="f7:menu" iconMd="material:menu" panelOpen="left" />
      </NavLeft>
      <NavTitle sliding>ThienVienTrucLam</NavTitle>
      <NavRight>
        <Link iconIos="f7:menu" iconAurora="f7:menu" iconMd="material:menu" panelOpen="right" />
      </NavRight>
      <NavTitleLarge>ThienVienTrucLam</NavTitleLarge>
    </Navbar> */}
    {/* Toolbar */}
    {/* <Toolbar bottom>
      <Link>Left Link</Link>
      <Link>Right Link</Link>
    </Toolbar> */}
    {/* Page content */}
    <img
      style={{ objectFit: "cover" }}
      height="200px"
      src={"/images/Thien-vien-truc-lam.png"}
    />
    <div style={{ fontSize: "30px", textAlign: "center" }}>
      THIỀN VIỆN TRÚC LÂM
    </div>
    <div style={{ fontSize: "18px", textAlign: "center" }}>
      Đà Lạt - Lâm Đồng
    </div>
      <Button
        fill
        raised
        style={{ position: "fixed", bottom: "20px", width: "100%" }}
        href="/dangky"
      >
        Đăng ký tập tu
      </Button>
  </Page>
);
export default HomePage;

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

const HomePage = () => {
  return (
    <Page
      name="home"
      className="home"
      style={{
        maxWidth: "500px",
      }}
    >
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
        width="100%"
        src={"/images/Thien-vien-truc-lam.png"}
      />
      <img
        style={{ objectFit: "cover" }}
        height="400px"
        width="50%"
        src={"/images/bg2.jpeg"}
      />
      <span style={{ width: "50%", display: "inline-block" }}>
        <img
          style={{ objectFit: "cover" }}
          height="200px"
          width="100%"
          src={"/images/bg4.jpeg"}
        />
        <img
          style={{ objectFit: "cover" }}
          height="200px"
          width="100%"
          src={"/images/bg3.jpeg"}
        />
      </span>
      <img
        style={{ objectFit: "cover" }}
        height="200px"
        width="100%"
        src={"/images/bg4.png"}
      />
      <div
        style={{ position: "fixed", bottom: "10px", width: "50%", left: "25%" }}
      >
        <Button
          fill
          raised
          round
          style={{ width: "80%", margin: "0 auto" }}
          href="/dangky"
        >
          Đăng ký tập tu
        </Button>
      </div>
    </Page>
  );
};
export default HomePage;

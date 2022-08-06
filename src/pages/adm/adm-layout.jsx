import { Page, Progressbar, useStore } from "framework7-react";
import React, { useEffect } from "react";
import { getCurrentUser } from "../../js/api";
import store from "../../js/store";

const AdmLayout = (props) => {
  const loading = useStore("loading");
  const currentUser = useStore("currentUser");

  useEffect(() => {
    checkCurrentUser();
  }, []);

  const checkCurrentUser = async () => {
    if (!currentUser) {
      let resp = await getCurrentUser();
      store.dispatch("setCurrentUser", resp.data);
    }
  };


  if (loading) {
    return (
      <Page >
        <div
          style={{
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Progressbar style={{ width: "80%" }} infinite color="multi" />
        </div>
      </Page>
    );
  }
  if (!currentUser) {
    // location.assign("/quanly#/quanly/dangnhap");
    props.f7router.navigate("/quanly/dangnhap");
    return <></>;
  }
  return props.children;
};
export default AdmLayout;

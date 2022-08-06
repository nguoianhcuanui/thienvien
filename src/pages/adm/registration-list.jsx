import {
  Block,
  Button,
  Card,
  CardHeader,
  Chip,
  f7,
  Icon,
  Link,
  List,
  ListInput,
  Navbar,
  Page,
  SkeletonBlock,
} from "framework7-react";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { getListRegistration, sendEmail } from "../../js/api";
import { REGISTRATIONS_STATUS } from "../../js/constant";
import AdmLayout from "./adm-layout";
const RegistrationList = (props) => {
  const [tableData, setTableData] = useState([]);
  const [tableLoading, setTableLoading] = useState(true);
  const [limit, setLimit] = useState(20);
  const [keyword, setKeyword] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  useEffect(() => {
    reload();
    props.f7router.on("routeChanged", (e) => {
      if (e.path == "/quanly") {
        reload();
      }
    });
    return () => {
      props.f7router.off("routeChanged");
    };
  }, []);

  const reload = async () => {
    const resp = await getListRegistration({ limit, keyword });
    setTableData(resp.data?.list || []);
    setTableLoading(false);
  };
  const sellectAll = (e) => {
    let selectedRows = [];
    if (e.target.checked) {
      tableData.forEach((item) => {
        selectedRows.push(item.id);
      });
    }
    setSelectedRows(selectedRows);
  };
  const rowSellectedChange = (id, isSelected) => {
    let ids = [...selectedRows];
    if (isSelected) {
      ids.push(id);
    } else {
      let index = ids.indexOf(id);
      ids.splice(index, 1);
    }
    setSelectedRows(ids);
  };
  const processSendEmail = async () => {
    f7.dialog.preloader("Đang gửi email thông tin cư sĩ tới công an phường");
    const resp = await sendEmail({ ids: selectedRows });
    if (resp.error == 0) {
      f7.toast
        .create({ text: "Gửi thông tin thành công", closeTimeout: 3000 })
        .open();
      setSelectedRows([]);
    } else {
      f7.dialog.alert("Có lỗi xảy ra!(" + resp.message + ")");
    }
    f7.dialog.close();
  };

  const getStatus = (item) => {
    switch (item.status) {
      case REGISTRATIONS_STATUS.NEW:
        if (moment(item.endTime).isBefore(moment())) {
          return <Chip text="Không duyệt" style={{ height: "24px" }} />;
        } else {
          return (
            <Chip text="Chờ duyệt" style={{ height: "24px" }} color="orange" />
          );
        }
      case REGISTRATIONS_STATUS.APPROVED:
        if (moment(item.startTime).isAfter(moment())) {
          return (
            <Chip
              outline
              text="Chưa đến"
              style={{ height: "24px" }}
              color="orange"
            />
          );
        } else if (moment(item.endTime).isAfter(moment())) {
          return (
            <Chip
              text="Đã rời đi"
              outline
              style={{ height: "24px" }}
              color="blue"
            />
          );
        } else {
          return (
            <Chip
              outline
              text="Đang ở lại"
              style={{ height: "24px" }}
              color="green"
            />
          );
        }
      default:
        return <Chip text="Không duyệt" style={{ height: "24px" }} />;
    }
  };

  return (
    <AdmLayout {...props}>
      <Page>
        <Navbar title="Danh sách cư sĩ đăng ký" />
        {/* <BlockTitle>About My App</BlockTitle> */}
        <Block style={{ marginBottom: "10px", marginTop: "15px" }}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              reload();
            }}
          >
            <div style={{ display: "flex", alignItems: "stretch" }}>
              <List
                // inlineLabels
                noHairlinesMd
                style={{ margin: 0, flex: 1 }}
              >
                <ListInput
                  onChange={(e) => setKeyword(e.target.value)}
                  placeholder="Tìm theo tên hoặc CMND"
                  type="search"
                ></ListInput>
              </List>
              <Button
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "0 10px 10px 0",
                }}
                fill
                onClick={reload}
              >
                <Icon material="search"></Icon>
              </Button>
            </div>
          </form>
        </Block>
        <Card>
          <CardHeader
            className="no-border"
            style={{
              padding: 0,
              justifyContent: "flex-end",
              marginRight: "10px",
            }}
          >
            <Button
              style={{ float: "right" }}
              fill
              small
              disabled={selectedRows.length == 0}
              onClick={processSendEmail}
            >
              Gửi thông tin tạm trú
            </Button>
          </CardHeader>
          <div
            className="data-table data-table-init card"
            style={{ margin: "0" }}
          >
            <table>
              <thead>
                <tr>
                  <th className="checkbox-cell">
                    <label className="checkbox">
                      <input
                        type="checkbox"
                        onChange={sellectAll}
                        checked={selectedRows.length == tableData.length}
                      />
                      <i className="icon-checkbox"></i>
                    </label>
                  </th>
                  <th className="label-cell">Họ và tên</th>
                  <th className="numeric-cell">Năm sinh</th>
                  <th className="label-cell">Tình trạng</th>
                </tr>
              </thead>
              <tbody>
                {tableLoading && (
                  <>
                    {[1, 2, 3].map((key) => (
                      <tr key={key}>
                        <td className="checkbox-cell skeleton-text skeleton-effect-wave">
                          <SkeletonBlock
                            style={{
                              width: "100%",
                              height: "15px",
                            }}
                          />
                        </td>
                        <td className="label-cell skeleton-text skeleton-effect-wave">
                          <SkeletonBlock
                            style={{
                              width: "100%",
                              height: "15px",
                            }}
                          />
                        </td>
                        <td className="numeric-cell skeleton-text skeleton-effect-wave">
                          <SkeletonBlock
                            style={{
                              width: "100%",
                              height: "15px",
                            }}
                          />
                        </td>
                        <td className="numeric-cell skeleton-text skeleton-effect-wave">
                          <SkeletonBlock
                            style={{
                              width: "100%",
                              height: "15px",
                            }}
                          />
                        </td>
                      </tr>
                    ))}
                  </>
                )}
                {tableData.map((item) => {
                  return (
                    <tr key={item.id}>
                      <td className="checkbox-cell">
                        <label className="checkbox">
                          <input
                            type="checkbox"
                            checked={selectedRows.includes(item.id)}
                            onChange={(e) =>
                              rowSellectedChange(item.id, e.target.checked)
                            }
                          />
                          <i className="icon-checkbox"></i>
                        </label>
                      </td>
                      <td className="label-cell">
                        <Link href={`/quanly/cusi/${item.id}`}>
                          {item.fullname}
                        </Link>
                      </td>
                      <td className="numeric-cell">
                        {moment(item.birthday).format("yyyy")}
                      </td>
                      <td
                        className="label-cell1"
                        style={{ textAlign: "center" }}
                      >
                        {getStatus(item)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {/* {tableLoading && <Progressbar></Progressbar>} */}
          </div>
        </Card>
      </Page>
    </AdmLayout>
  );
};

export default RegistrationList;

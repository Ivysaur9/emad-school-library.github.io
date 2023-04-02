import { Button, Input, Row, Col, Select, Form } from "antd";
import * as React from "react";
import { bookClassList } from "./books";
import "./styles.css";

export default function BookSearch({ handleBookSearch }: any) {
  const [state, setState] = React.useState({
    bookID: null,
    class: "",
    bookName: "",
    authorName: "",
  });

  function handleChange(evt: { target: { value: any; name: any } }) {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value,
    });
  }

  function handleClassChange(value: any) {
    setState({
      ...state,
      class: value,
    });
  }

  return (
    <Row dir="rtl" style={{ margin: "12px 6vw" }}>
      <Col xs={24} sm={12} md={8} lg={6} xl={4}>
        <Row>
          <label style={{ alignSelf: "center" }}>التصنيف</label>
        </Row>
        <Row>
          <Select
            placeholder="اختر التصنيف"
            style={
              {
                // minWidth: "20%",
                // margin: "8px 4px 8px 16px",
              }
            }
            onChange={handleClassChange}
            options={[{ label: "غير مصنف", value: "none" }, ...bookClassList]}
            value={state.class}
          />
        </Row>
      </Col>
      <Col xs={24} sm={12} md={8} lg={6} xl={4}>
        <Row>
          <label style={{ alignSelf: "center" }}>رقم الكتاب</label>
        </Row>
        <Row>
          <Input
            placeholder="أدخل رقم الكتاب"
            // style={{ width: "20%", margin: "8px 4px 8px 16px" }}
            name="bookID"
            value={state.bookID}
            onChange={handleChange}
          />
        </Row>
      </Col>
      <Col xs={24} sm={12} md={8} lg={6} xl={4}>
        <Row>
          <label style={{ alignSelf: "center" }}>اسم الكتاب</label>
        </Row>
        <Row>
          <Input
            placeholder="أدخل اسم الكتاب أو جزء منه"
            // style={{ width: "20%", margin: "8px 4px 8px 16px" }}
            name="bookName"
            value={state.bookName}
            onChange={handleChange}
          />
        </Row>
      </Col>
      <Col xs={24} sm={12} md={8} lg={6} xl={4}>
        <Row>
          <label style={{ alignSelf: "center" }}>اسم المؤلف</label>
        </Row>
        <Row>
          <Input
            placeholder="أدخل اسم المؤلف أو جزء منه"
            // style={{ width: "20%", margin: "8px 4px 8px 16px" }}
            name="authorName"
            value={state.authorName}
            onChange={handleChange}
          />
        </Row>
      </Col>
      <Button
        shape="round"
        // type="primary"
        style={{
          // width: "10%",
          margin: "28px 12px 0px 4px",
          color: "blue",
          borderColor: "blue",
          // cursor: "pointer",
        }}
        // disabled={state.authorName === "" && state.bookName === ""}
        onClick={() => {
          handleBookSearch({
            class: state.class,
            bookName: state.bookName,
            authorName: state.authorName,
            bookID: state.bookID,
          });
        }}
      >
        بحث
      </Button>
      <Button
        shape="round"
        danger
        style={{
          // width: "10%",
          margin: "28px 4px 0px 12px",
          color: "green",
          borderColor: "green",
          // color: "red",
          // borderColor: "red",
          // cursor: "pointer",
        }}
        disabled={
          state.authorName === "" &&
          state.bookName === "" &&
          state.class === "" &&
          state.bookID === null
        }
        onClick={() => {
          setState({ bookName: "", authorName: "", class: "", bookID: null });
          handleBookSearch({
            bookName: "",
            authorName: "",
            class: "",
            bookID: null,
          });
        }}
      >
        تفريغ الحقول
      </Button>
    </Row>
  );
}

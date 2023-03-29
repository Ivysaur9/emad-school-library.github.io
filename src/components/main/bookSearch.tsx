import { Button, Input, Row, Col, Select, Form } from "antd";
import * as React from "react";
import { bookClassList } from "./books";
import "./styles.css";

export default function BookSearch({ handleBookSearch }: any) {
  const [state, setState] = React.useState({
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
    <Row dir="rtl" style={{ marginBottom: "12px" }}>
      <Col xs={24} sm={24} md={12} lg={8} xl={6}>
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
            options={bookClassList}
          />
        </Row>
      </Col>
      <Col xs={24} sm={24} md={12} lg={8} xl={6}>
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
      <Col xs={24} sm={24} md={12} lg={8} xl={6}>
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
        disabled={state.authorName === "" && state.bookName === ""}
        onClick={() => {
          setState({ bookName: "", authorName: "", class: "" });
          handleBookSearch({
            bookName: "",
            authorName: "",
          });
        }}
      >
        تفريغ الحقول
      </Button>
    </Row>
  );
}

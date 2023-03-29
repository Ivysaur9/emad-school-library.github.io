import { Button, Input, Row, Col } from "antd";
import * as React from "react";

export default function BookSearch({ handleBookSearch }: any) {
  const [state, setState] = React.useState({
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

  return (
    <Row dir="rtl" style={{ marginBottom: "12px" }}>
      <Input
        placeholder="اسم الكتاب"
        style={{ width: "25%", margin: "12px" }}
        name="bookName"
        value={state.bookName}
        onChange={handleChange}
      />
      <Input
        placeholder="اسم المؤلف"
        style={{ width: "25%", margin: "12px" }}
        name="authorName"
        value={state.authorName}
        onChange={handleChange}
      />
      <Button
        shape="round"
        // type="primary"
        style={{
          width: "10%",
          margin: "12px",
          color: "blue",
          borderColor: "blue",
          // cursor: "pointer",
        }}
        // disabled={state.authorName === "" && state.bookName === ""}
        onClick={() => {
          handleBookSearch({
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
          width: "10%",
          margin: "12px",
          color: "green",
          borderColor: "green",
          // color: "red",
          // borderColor: "red",
          // cursor: "pointer",
        }}
        disabled={state.authorName === "" && state.bookName === ""}
        onClick={() => {
          setState({ bookName: "", authorName: "" });
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

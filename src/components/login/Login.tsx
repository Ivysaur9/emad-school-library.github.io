import { SetStateAction, useState } from "react";

// import Form from "react-bootstrap/Form";

// import Button from "react-bootstrap/Button";
import { AutoComplete, Button, Checkbox, Form, Input } from "antd";
const onFinish = (values: any) => {
  console.log("Success:", values);
};
const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event: { preventDefault: () => void }) {
    event.preventDefault();
  }

  return (
    <div className="Login" dir="rtl">
      {/* <Form onSubmit={handleSubmit}>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            type="email"
            value={email}
            onChange={(e: { target: { value: SetStateAction<string> } }) =>
              setEmail(e.target.value)
            }
          />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e: { target: { value: SetStateAction<string> } }) =>
              setPassword(e.target.value)
            }
          />
        </Form.Group>
        <Button type="submit" disabled={!validateForm()}>
          Login
        </Button>
      </Form> */}
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
          //   margin: "auto",
          // margin-top: "40vh",
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="اسم المستخدم"
          name="username"
          rules={[
            {
              required: true,
              message: "الرجاء ادخال اسم المستخدم",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="كلمة المرور"
          name="password"
          rules={[
            {
              required: true,
              message: "الرجاء ادخال كلمة السر الخاصة بك",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          {/* <Checkbox>Remember me</Checkbox> */}
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            دخول
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

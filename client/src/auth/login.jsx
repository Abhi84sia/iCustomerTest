import React from "react";
import { Alert, Button, Card, Form, Input, Spin, Typography } from "antd";
import { Link } from "react-router-dom";
import userLogin from "../hookes/userLogin";

const Login = () => {
  const { error, loading, loginuser } = userLogin();

  const handleLogin = async (values) => {
    await loginuser(values);
  };

  return (
    <div className="home-page">
      <Card className="form-container">
        <div className="form-wrapper">
          {/* Form */}
          <div className="form-inner">
            <Typography.Title level={3} strong className="title">
              Sign In
            </Typography.Title>
            <Typography.Text type="secondary" strong className="slogan">
              Unlock your World
            </Typography.Text>
            <Form layout="vertical" onFinish={handleLogin} autoComplete="off">
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Please input your Email!" },
                  { type: "email", message: "Incorrect Email Address" },
                ]}
              >
                <Input size="large" placeholder="Enter Your Email" />
              </Form.Item>
              <Form.Item
                label="Password"
                name="password"
                rules={[
                  { required: true, message: "Please input your Password!" },
                ]}
              >
                <Input.Password
                  size="large"
                  placeholder="Enter Your password"
                />
              </Form.Item>

              {error && (
                <Alert
                  description={error}
                  type="error"
                  showIcon
                  closable
                  className="alert"
                />
              )}

              <Form.Item>
                <Button
                  type={`${loading ? "" : "primary"}`}
                  htmlType="submit"
                  size="large"
                  className="btn"
                >
                  {loading ? <Spin /> : "Sign In"}
                </Button>
              </Form.Item>
              <Form.Item>
                <Link to="/">
                  <Button size="large" className="btn">
                    Create Account
                  </Button>
                </Link>
              </Form.Item>
            </Form>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Login;

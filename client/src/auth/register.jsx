import React from "react";
import { Alert, Button, Card, Flex, Form, Input, Spin, Typography } from "antd";
import { Link } from "react-router-dom";
import userSignup from "../hookes/userSignup";

const Register = () => {
  const { loading, error, registerUser } = userSignup();
  const handleRegister = (values) => {
    registerUser(values);
  };

  return (
    <div className="home-page">
      <Card className="form-container">
        <Flex align="center">
          {/* Form */}
          <Flex vertical flex={1}>
            <Typography.Title level={3} strong className="title">
              Create an Account
            </Typography.Title>
            <Typography.Text type="secondary" strong className="slogan">
              Join for exclusive access
            </Typography.Text>
            <Form
              layout="vertical"
              onFinish={handleRegister}
              autoComplete="off"
            >
              <Form.Item
                label="Full Name"
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Please input your full name",
                  },
                ]}
              >
                <Input size="large" placeholder="Enter Your Full Name" />
              </Form.Item>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please input your Email!",
                  },
                  {
                    type: "email",
                    message: "Incorrect Email Address",
                  },
                ]}
              >
                <Input size="large" placeholder="Enter Your Email" />
              </Form.Item>
              <Form.Item
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your Password!",
                  },
                  {
                    min: 6, // This ensures the password is at least 6 characters
                    message:
                      "Password must be at least 6 words or characters long",
                  },
                ]}
              >
                <Input.Password
                  size="large"
                  placeholder="Enter Your password"
                />
              </Form.Item>

              <Form.Item
                label="Password"
                name="passwordConfirm"
                rules={[
                  {
                    required: true,
                    message: "Please input your Confirm Password!",
                  },
                  {
                    min: 6, // This ensures the password is at least 6 characters
                    message:
                      "Password must be at least 6 words or characters long",
                  },
                ]}
              >
                <Input.Password
                  size="large"
                  placeholder="Re-enter Your password"
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
                  {loading ? <Spin /> : "Create Account"}
                </Button>
              </Form.Item>
              <Form.Item>
                <Link to="/login">
                  <Button size="large" className="btn">
                    Sign In
                  </Button>
                </Link>
              </Form.Item>
            </Form>
          </Flex>
        </Flex>
      </Card>
    </div>
  );
};

export default Register;

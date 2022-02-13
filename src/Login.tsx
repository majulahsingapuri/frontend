import { Button, Row, Space, Spin, Form, Input, message } from "antd";
import React, { useContext } from "react";
import { Navigate, useLocation, } from "react-router-dom";
import { AuthContext, AuthState } from "./AuthContext";
import api from "./api"
import { LoginRequest } from "./types";
import { GoogleLogin, GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';

export const Login = () => {
  const { state } = useContext(AuthContext);
  const location = useLocation();
  const next = location.pathname;

  const googleSuccess = (response: GoogleLoginResponse | GoogleLoginResponseOffline) => {
    if (response.code) {
      api.googleLogin({code: response.code}).then((response) =>{
        sessionStorage.setItem("Token", response.key)
        window.location.href = "/";
        message.success("Success!", 0.75)
      }).catch((err) => {
        console.log(err)
      });
    }
  }

  const googleFailure = () => {
    message.error("Please Check Log in Credentials", 0.75)
  }

  const SignInEmailClicked = (values: LoginRequest) => {
    api.emailLogin(values).then((response) => {
      sessionStorage.setItem("Token", response.key)
      window.location.href = "/";
      message.success("Success!", 0.75)
    }).catch((_) => {
      message.error("Please Check Log in Credentials", 0.75)
    });
  }

  switch (state) {
    case AuthState.LOADING:
      return (
        <Row justify="center" style={{ padding: 24 }}>
          <Spin size="large" />
        </Row>
      );
    case AuthState.UNAUTHENTICATED:
      return (
        <Row justify="center" style={{ padding: 24 }}>
          <Space size="small" direction="vertical" align="center">
            <Form
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              initialValues={{ remember: true }}
              onFinish={SignInEmailClicked}
              autoComplete="off"
            >
              <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: 'Please input your email!' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
            <GoogleLogin
              clientId={`${process.env.REACT_APP_GOOGLE_CLIENT_ID}`}
              buttonText="Login"
              onSuccess={googleSuccess}
              onFailure={googleFailure}
              cookiePolicy={'none'}
              isSignedIn={true}
              responseType="code"
              accessType="offline"
              uxMode="redirect"
              redirectUri="/callback/google/"
            />
          </Space>
        </Row>
      );
    case AuthState.AUTHENTICATED:
      return <Navigate to={next} />;
  }
};

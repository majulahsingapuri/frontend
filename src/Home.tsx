import { Page } from "./Page";
import {
  Space,
  Typography,
} from "antd";
import React, { useContext } from "react";
import { AuthContext } from "./AuthContext";

export const Home = () => {
    const { firstName } = useContext(AuthContext);
  
    return (
      <Page title="sample">
        <Space direction="vertical" size="middle" className="w-100">
            <Typography.Title level={2}>Welcome, {firstName}!</Typography.Title>
        </Space>
      </Page>
    );
  };
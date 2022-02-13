import { Layout } from "antd";
import React from "react";
import { Sidebar } from "./Sidebar";

export const Base: React.FC = ({ children }) => {
  return (
    <Layout>
      <Layout.Sider breakpoint="lg" collapsedWidth={0} trigger={null}>
        <Sidebar />
      </Layout.Sider>
      {children}
    </Layout>
  );
};
import React, { ReactNode, useState } from "react";
import {
  Drawer,
  Layout,
  LayoutProps,
  PageHeader,
  PageHeaderProps,
} from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { Sidebar } from "./Sidebar";

type PageProps = {
  title?: ReactNode;
  subTitle?: ReactNode;
  headerProps?: PageHeaderProps;
  contentProps?: LayoutProps;
};

export const Page: React.FC<PageProps> = ({
  children,
  title,
  subTitle,
  headerProps = {},
  contentProps = {},
}) => {
  const { extra: headerExtra, ...remainingHeaderProps } = headerProps;
  const [navVisible, setNavVisible] = useState(false);
  return (
    <Layout className="site-layout">
      <Drawer
        closable={false}
        placement="left"
        visible={navVisible}
        bodyStyle={{ backgroundColor: "#001529", padding: "0" }}
        onClose={() => setNavVisible(false)}
        width={200}
      >
        <Sidebar />
      </Drawer>
      <PageHeader
        title={title}
        subTitle={subTitle}
        backIcon={<MenuOutlined />}
        onBack={() => setNavVisible(true)}
        extra={
          <>
            {headerExtra}
          </>
        }
        {...remainingHeaderProps}
      />
      <Layout.Content className="page-content" {...contentProps}>
        {children}
      </Layout.Content>
    </Layout>
  );
};

import { Menu } from "antd";
import { Link } from "react-router-dom";
import React, { useContext } from "react";
import api from "./api";
import { AuthContext } from "./AuthContext";

export const Sidebar = () => {
  const { email } = useContext(AuthContext);

  return (
    <div className="sidebar">
      <div>
        <h1 className="sidebar-brand">sample</h1>
        <Menu theme="dark" mode="inline">
          <Menu.Item key="home">
            <Link to="/">Home Page</Link>
          </Menu.Item>
        </Menu>
      </div>
      <Menu theme="dark" mode="inline">
        <Menu.SubMenu title={email} key="email">
          <Menu.Item key="logout" onClick={api.logout}>
            <span>Sign out</span>
          </Menu.Item>
        </Menu.SubMenu>
      </Menu>
    </div>
  );
};
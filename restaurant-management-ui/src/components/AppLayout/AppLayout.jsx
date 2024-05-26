import { useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Layout, theme } from "antd";
import Sidebar from "../Navbar/Sidebar/Sidebar";
import SideDataBar from "../Navbar/SideDataBar/SideDataBar";
import { Outlet } from "react-router-dom";
const { Header, Sider, Content } = Layout;

const AppLayout = () => {
  const initialThemeMode = localStorage.getItem("theme-mode") === "true";
  const [dark, setDark] = useState(initialThemeMode);

  const [collapsed, setCollapsed] = useState(false);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <SideDataBar collapsed={collapsed} dark={dark} />
        <Sidebar dark={dark} setDark={setDark} />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 12,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;

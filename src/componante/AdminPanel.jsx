import React, { useState } from 'react';
import {
  AppstoreOutlined,
  DeleteOutlined,
  HomeFilled,
  ShopOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined
} from '@ant-design/icons';
import { Layout, Menu, Button, Typography, theme } from 'antd';
import { useNavigate, Outlet, Navigate } from 'react-router-dom';

const { Header, Content, Footer, Sider } = Layout;
const { Title } = Typography;

const menuItems = [
  { key: '1', icon: <AppstoreOutlined />, label: 'Add Products', path: 'add-products' },
  { key: '2', icon: <DeleteOutlined />, label: 'Remove Products', path: 'remove-products' },
  { key: '3', icon: <ShopOutlined />, label: 'Edit Products', path: 'edit-products' },
  { key: '4', icon: <HomeFilled />, label: 'Back To Home', path: '/' },
];

const Sidebar = ({ collapsed, setCollapsed }) => {
  const navigate = useNavigate();

  return (
    <Sider
      collapsed={collapsed}
      onCollapse={setCollapsed}
      breakpoint="md"
      width={200}
      style={{ minHeight: '100vh' }}
    >
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['1']}
        onClick={({ key }) => {
          const item = menuItems.find(i => i.key === key);
          if (item) navigate(item.path);
        }}
        items={menuItems}
      />
    </Sider>
  );
};

const AdminPanel = () => {
  const CurrentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (!CurrentUser || CurrentUser.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  const [collapsed, setCollapsed] = useState(false);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout hasSider>
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer, display: 'flex', alignItems: 'center', paddingLeft: 16 }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{ fontSize: '16px' }}
          />
        </Header>
        <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
          <div style={{ padding: 24, textAlign: 'center', background: colorBgContainer, borderRadius: borderRadiusLG }}>
            <Title>Admin Panel</Title>
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          React App ©{new Date().getFullYear()} ITI Project
        </Footer>
      </Layout>
    </Layout>
  );
};

export default AdminPanel;

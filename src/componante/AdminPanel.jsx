import React from 'react';
import {
  AppstoreOutlined,
  DeleteOutlined,
  HomeFilled,
  ShopOutlined,
  UploadOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Layout, Menu, theme,Typography } from 'antd';
import { useNavigate,Outlet } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';

const { Header, Content, Footer, Sider} = Layout;
const {Title} = Typography
const siderStyle = {
  overflow: 'auto',
  height: '100vh',
  position: 'sticky',
  insetInlineStart: 0,
  top: 0,
  bottom: 0,
  scrollbarWidth: 'thin',
  scrollbarGutter: 'stable',
};

const menuItems = [
  { key: '1', icon: <AppstoreOutlined />, label: 'Add Products', path: 'add-products' },
  { key: '2', icon: <DeleteOutlined />, label: 'Remove Products', path: 'remove-products' },
  { key: '3', icon: <ShopOutlined />, label: 'Edit Products', path: 'edit-products' },
  { key: '4', icon: <HomeFilled />, label: 'Back To Home', path: '/' },
];

const Sidebar = () => {
  const navigate = useNavigate();
  
  return (
    <Sider style={siderStyle}>
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
  
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout hasSider>
      <Sidebar />
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
          <div style={{ padding: 24, textAlign: 'center', background: colorBgContainer, borderRadius: borderRadiusLG }}>
          <Title>Admin Panel</Title>
        <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>React App ©{new Date().getFullYear()} ITI Project</Footer>
      </Layout>
    </Layout>
  );
};

export default AdminPanel;

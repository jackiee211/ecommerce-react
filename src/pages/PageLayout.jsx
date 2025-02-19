import React, { useState } from 'react';
import { LaptopOutlined, NotificationOutlined, UserOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, Button, theme } from 'antd';
import Navbar from '../componante/Navbar';
import Products from './Products';
import HeroAds from '../componante/HeroAds/HeroAds';
import { Outlet } from 'react-router-dom';

const { Content, Sider } = Layout;

const items2 = [UserOutlined, LaptopOutlined, NotificationOutlined].map((icon, index) => {
  const key = String(index + 1);
  return {
    key: `sub${key}`,
    icon: React.createElement(icon),
    label: `subnav ${key}`,
    children: new Array(4).fill(null).map((_, j) => {
      const subKey = index * 4 + j + 1;
      return {
        key: subKey,
        label: `option${subKey}`,
      };
    }),
  };
});

const PageLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>
      <Navbar />
      <Layout>
        <Layout
        >


          <Content
            style={{
              margin: '40px 0',
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              height:"500px"
            }}
          >
            <HeroAds />
          </Content>

          <Content
            style={{
              minHeight: 280,
              // background: colorBgContainer,
              // borderRadius: borderRadiusLG,
              display:"flex",
              flexWrap:"wrap",
              justifyContent:"center"
            }}
          >
            <h1>Navigate Through Our Products!</h1>
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default PageLayout;

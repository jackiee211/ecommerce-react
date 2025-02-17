import React, { useState } from 'react';
import { LaptopOutlined, NotificationOutlined, UserOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, Button, theme } from 'antd';
import Navbar from '../componante/Navbar';
import Products from './Products';
import HeroAds from '../componante/HeroAds/HeroAds';

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
        <Sider
          width={200}
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          breakpoint="lg" // Collapse on large screens and smaller
          collapsedWidth="0" // Fully hide sidebar on small screens
          style={{
            background: colorBgContainer,
          }}
        >
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{
              height: '100%',
              borderRight: 0,
            }}
            items={items2}
          />
        </Sider>

        <Layout
          style={{
            padding: '0 24px 24px',
          }}
        >


          <Content
            style={{
              padding: "100px 20px",
              margin: 0,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <HeroAds />
          </Content>
            <Breadcrumb
              items={[
                {
                  title: 'Home',
                },
                {
                  title: 'Products',
                },

              ]}
              style={{
                margin: '16px 0',
              }}
            />

          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <h1>Navigate Through Our Products!</h1>
            <Products />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default PageLayout;

import React, { useState } from 'react';

import { Layout, Menu } from 'antd';
import { Route, Switch, Link } from 'react-router-dom';

import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined
} from '@ant-design/icons';

import ModuleRoutes from './module-routes.js';

import './dashboard-base.scss'

const { Header, Sider, Content } = Layout;

export default function DashboardBase() {
  const [collapsed, setCollapsed] = useState(false);

  function toggle() {
    setCollapsed(!collapsed);
  }

  function getRoutes(routes) {
    let setRoutes = routes.map((prop, key) => {
      if (prop.path) {
        return <Route path={prop.path} component={prop.component} key={key} />;
      } else {
        return null;
      }
    });
    return setRoutes;
  }

  return (
    <Layout className='main-layout'>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className='logo' />
        <Menu
          theme='light'
          mode='inline'
          defaultSelectedKeys={[ModuleRoutes[0].label]}
        >
          <Menu>
            {ModuleRoutes.map(el => {
              return (
                <Menu.Item key={el.label}>
                  {el.icon && React.createElement(el.icon)}
                  <Link to={el.path}>{el.label}</Link>
                </Menu.Item>
              );
            })}
          </Menu>
        </Menu>
      </Sider>
      <Layout className='site-layout'>
        <Header className='site-layout-background' style={{ padding: 0 }}>
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: 'trigger',
              onClick: toggle
            }
          )}
        </Header>
        <Content
          className='site-layout-background'
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280
          }}
        >
          <Switch>{getRoutes(ModuleRoutes)}</Switch>
        </Content>
      </Layout>
    </Layout>
  );
}

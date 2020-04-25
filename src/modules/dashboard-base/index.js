import React, { useState } from 'react';

import { Layout, Menu } from 'antd';
import { Route, Switch, Link } from 'react-router-dom';

import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';

import ModuleRoutes from './module-routes.js';

import './dashboard-base.scss';

const { Sider } = Layout;

export default function DashboardBase() {
  const [collapsed, setCollapsed] = useState(false);

  function toggle() {
    setCollapsed(!collapsed);
  }

  function getRoutes(routes) {
    let setRoutes = routes.reduce((prev, prop) => {
      if (prop.path) {
        return [
          ...prev,
          <Route
            exact
            path={prop.path}
            component={prop.component}
            key={prop.path}
          />
        ];
      } else if (prop.children) {
        return [...prev, ...getRoutes(prop.children)];
      } else {
        return prev;
      }
    }, []);
    console.log(setRoutes);
    return setRoutes;
  }

  const renderGrouped = groupedItem => {
    return (
      <Menu.ItemGroup key={groupedItem.label} title={groupedItem.label}>
        {renderRoutes(groupedItem.children)}
      </Menu.ItemGroup>
    );
  };

  const renderRoutes = routes => {
    return routes.map(el => {
      if (el.children && el.children.length > 0) {
        return renderGrouped(el);
      }
      return (
        <Menu.Item key={el.label}>
          {el.icon && React.createElement(el.icon)}
          <Link to={el.path}>{el.label}</Link>
        </Menu.Item>
      );
    });
  };

  return (
    <Layout className='main-layout'>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        theme='light'
        className='custom-sider'
      >
        <Link to='/'>
          <div className='logo'>
            {!collapsed && (
              <>
                <span className='main'>COVID</span>
                <span>.Control</span>
              </>
            )}
            {collapsed && <span className='main pad-sm'>COV</span>}
          </div>
        </Link>

        <Menu
          theme='light'
          mode='inline'
          defaultSelectedKeys={[ModuleRoutes[0].label]}
        >
          {renderRoutes(ModuleRoutes)}
        </Menu>
      </Sider>
      <Layout className='site-layout'>
        {React.createElement(
          collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
          {
            className: 'trigger',
            onClick: toggle
          }
        )}
        <Switch>{getRoutes(ModuleRoutes)}</Switch>
      </Layout>
    </Layout>
  );
}

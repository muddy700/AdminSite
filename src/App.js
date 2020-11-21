import { DashboardOutlined , UserAddOutlined , TeamOutlined , UserOutlined , SettingOutlined , MenuFoldOutlined , MenuUnfoldOutlined } from '@ant-design/icons';
import { Layout , Menu , Breadcrumb } from 'antd'
import React , { useState } from 'react'
import './index.css'

const { Header, Content, Footer, Sider } = Layout
const { SubMenu } = Menu

  const  App = () => {

    const [collapsed , setCollapsed ] = useState(false)

    const toggle = () => {
      setCollapsed(!collapsed)
    }

   return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} trigger={null}>
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1" icon={<DashboardOutlined />}>
              Dashboard
            </Menu.Item>
            <Menu.Item key="2" icon={<UserAddOutlined />}>
              Add User
            </Menu.Item>
            <SubMenu key="sub1" icon={<TeamOutlined />} title="View Users">
              <Menu.Item key="3">All Users</Menu.Item>
              <Menu.Item key="4">By Id</Menu.Item>
            </SubMenu>
            <Menu.Item key="5" icon={<UserOutlined />}>
              Profile
            </Menu.Item>
            <Menu.Item key="6" icon={<SettingOutlined />}>
              Change Password
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }} >
            {
              React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                className: 'trigger',
                onClick: toggle,
              })
            }
          </Header>
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
              Bill is a cat.
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Footer Goes Here</Footer>
        </Layout>
      </Layout>
    )
}

export default App;

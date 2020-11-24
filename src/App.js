import { DashboardOutlined , UserAddOutlined , TeamOutlined , UserOutlined , KeyOutlined , MenuFoldOutlined , MenuUnfoldOutlined } from '@ant-design/icons';
import { Layout , Menu , Breadcrumb , Drawer , message , Form } from 'antd'
import { UsersList , SingleUser } from './components/usersList'
import { Dashboard } from './components/dashboard'
import { Settings } from './components/settings'
import { UserForm } from './components/userForm'
import { Profile } from './components/profile'
import React , { useState } from 'react'
import './index.css'
// import API from  './api'

const { Header, Content, Footer, Sider } = Layout
const { SubMenu } = Menu
let Id = 0

  const  App = () => {

    const initialUsers = [
      { key : '1' , user_id: 1, username: 'Muddy',  email: 'mo@gmail.com', password: '1234', enabled: 'False' }, 
      { key : '2' , user_id: 2, username: 'Muddy',  email: 'mo@gmail.com', password: '1234', enabled: 'False' }, 
      { key : '3' , user_id: 3, username: 'Muddy',  email: 'mo@gmail.com', password: '1234', enabled: 'False' }, 
      { key : '4' , user_id: 4, username: 'Muddy',  email: 'mo@gmail.com', password: '1234', enabled: 'False' }, 
      { key : '5' , user_id: 5, username: 'Muddy',  email: 'mo@gmail.com', password: '1234', enabled: 'True' }, 
      { key : '6' , user_id: 6, username: 'Muddy',  email: 'mo@gmail.com', password: '1234', enabled: 'True' }, 
      { key : '7' , user_id: 7, username: 'Muddy',  email: 'mo@gmail.com', password: '1234', enabled: 'True' }, 
      { key : '8' , user_id: 8, username: 'Muddy',  email: 'mo@gmail.com', password: '1234', enabled: 'True' }, 
      { key : '9' , user_id: 9, username: 'Muddy',  email: 'mo@gmail.com', password: '1234', enabled: 'True' }, 
      { key : '10' , user_id: 10, username: 'Muddy',  email: 'mo@gmail.com', password: '1234', enabled: 'True' }, 
      { key : '11' , user_id: 11, username: 'Muddy',  email: 'mo@gmail.com', password: '1234', enabled: 'True' }, 
    ]

    const loggedIn = { 
      firstName : 'MOHAMED' , 
      lastName : 'MOHAMED' , 
      userName : 'User-007' ,
      department : 'CSE' ,
      position : 'Admin' ,
      phone : '0789 101 112' ,
      email : 'user@gmail.com' , 
      password : '1234'
    }
    
    // const user ={ key : '1' , user_id: 1, username: 'Muddy',  email: 'mo@gmail.com', password: '1234', enabled: 'false' }
    const [editingMode, setEditingMode] = useState(false)
    const [collapsed , setCollapsed ] = useState(false)
    const [activeUser , setActiveUser] = useState({})
    const [users, setUsers] = useState(initialUsers)
    const [render , setRender ] = useState(1)
    const [form] = Form.useForm()
    const [loggedUser, setloggedUser] = useState(loggedIn)
    // const [visible , setvisible ] = useState(false)


    const onFinish = () => {
      if(editingMode) { 
        const newUsersList = users.map((data) => {
          if(data.user_id === activeUser.user_id) {
            return {...data , username : activeUser.username , email : activeUser.email , enabled : activeUser.enabled , password : activeUser.password}
          }
          else { return data}
        })
        setUsers(newUsersList)
        // setRender(3)
        setEditingMode(false)
      }

      else{
        
        Id += 1
        setUsers([...users , {...activeUser , key : Id , user_id : Id}])
        message.success('User Added Successful')
      }
      setActiveUser({ })
      form.resetFields()
    }

    const toggle = () => {
      setCollapsed(!collapsed)
    }

    const handleMenuClick = (menu) => {
      setRender(menu.key)
    }

    const editUserInfo = (value) => {

        const selected = users.find((data) => data.user_id === value)
        setActiveUser(selected)
        setEditingMode(true)
        form.setFieldsValue({ username : selected.username , email : selected.email , enabled : selected.enabled , password : selected.password , comfirmPassword : selected.password})
      }

      const onClose = () => {
        setEditingMode(false)
        setActiveUser({})
        form.resetFields()
      }

      const userform = <UserForm activeUser={activeUser} setActiveUser={setActiveUser} onFinish={onFinish} form={form} users={users} editingMode={editingMode} />
      const allUsers = <UsersList users={users} setUsers={setUsers}  editUserInfo={editUserInfo} />
      const dashboard = <Dashboard users={users} />
      const settings = <Settings loggedUser={loggedUser} setloggedUser={setloggedUser} />
      const byId = <SingleUser />
      const profile = <Profile loggedUser={loggedUser} />

      const draw = <Drawer
          title="Editing Mode"
          placement="right"
          closable={false}
          onClose={onClose}
          visible={editingMode}
          getContainer={false}
          style={{ position: 'absolute' }}
          width="550" >
          {userform}
        </Drawer>


    const components = {
      1 : dashboard , 
      2 : userform , 
      3 : allUsers , 
      4 : byId , 
      5 : profile , 
      6 : settings
    }

   return (
      <Layout style={{ minHeight: '100vh'}}>
        <Sider collapsible collapsed={collapsed} trigger={null}>
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1" icon={<DashboardOutlined />} onClick={handleMenuClick}>
              Dashboard
            </Menu.Item>
            <Menu.Item key="2" icon={<UserAddOutlined />} onClick={handleMenuClick}>
              Add User
            </Menu.Item>
            <SubMenu key="sub1" icon={<TeamOutlined />} title="View Users">
              <Menu.Item key="3" onClick={handleMenuClick}>All Users</Menu.Item>
              <Menu.Item key="4" onClick={handleMenuClick}>By Id</Menu.Item>
            </SubMenu>
            <Menu.Item key="5" icon={<UserOutlined />} onClick={handleMenuClick}>
              Profile
            </Menu.Item>
            <Menu.Item key="6" icon={<KeyOutlined />} onClick={handleMenuClick}>
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
              {components[render]}
              {draw}
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' , backgroundColor : 'darkgrey'}}>Footer Goes Here</Footer>
        </Layout>
      </Layout>
    )
}

export default App;

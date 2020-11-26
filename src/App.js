import { DashboardOutlined , UserAddOutlined , TeamOutlined , LockOutlined , UserOutlined , MenuFoldOutlined , MenuUnfoldOutlined } from '@ant-design/icons';
import { Layout , Menu , Breadcrumb , Drawer , Image , message , Form } from 'antd'
import { UsersList , SingleUser } from './components/usersList'
import { Dashboard } from './components/dashboard'
import { Settings } from './components/settings'
import { UserForm } from './components/userForm'
import { Profile } from './components/profile'
import React , { useState , useEffect } from 'react'
import dp from './images/dp.jpg'
import './index.css'
import API, {fetchAllUsers, createUser , editUser } from  './api'

const { Header, Content, Footer, Sider } = Layout
const { SubMenu } = Menu

  const  App = () => {

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
    const [activeId , setActiveId] = useState('')
    const [users, setUsers] = useState([])
    const [render , setRender ] = useState(1)
    const [form] = Form.useForm()
    const [loggedUser, setloggedUser] = useState(loggedIn)

    const pullUsers = async () => {
      try{
         const users = await fetchAllUsers()
         setUsers(users)
      }catch(err){
         if(err && err.response.data){
           // error from the server
           message.error('Server Error')
         }else if (err.request){
           // netwoerk errors
           message.error('Network Error')
         }else{
           // Any other errors
           message.error('Other Error')
         }
          // console.log('hyo => ' + err)
          // message.error('No Internet Connection')
        }
    }

    useEffect(() => {
      pullUsers()
    } , [])

    const onFinish = async (activeUser) => {
      // e.preventDefault()

      if(editingMode) { 
        const {comfirmPassword , ...rest} = activeUser
        try {
          const response = await editUser(activeId , rest)
          console.log(response)
          pullUsers()
          
        } catch (error) {
          
        }
      }
      else{
        try {
          const {comfirmPassword , ...rest} = activeUser
          const user = await createUser(rest)
          setUsers([...users, user])
          console.log(user)
          form.resetFields()
        } catch (error) {
          if(error && error.response.data)
           alert(JSON.stringify(error.response.data))
        }
      }
    }

    const addUser = async () => {
        let res = await API.post('users/create' , {username : "Moudy"})
        console.log(res)
        if(res.status === 200){
          message.success('I GOT IT!')
        }
        pullUsers()
    }

    const toggle = () => {
      setCollapsed(!collapsed)
    }

    const handleMenuClick = (menu) => {
      setRender(menu.key)
    }

    const editUserInfo = (value) => {

        const selected = users.find((data) => data.user_id === value)
        setActiveId(selected.user_id)
        setEditingMode(true)
        form.setFieldsValue({ username : selected.username , email : selected.email , enabled : selected.enabled , password : selected.password , comfirmPassword : selected.password})
      }

      const onClose = () => {
        setEditingMode(false)
        setActiveId('')
        form.resetFields()
      }

      const userform = <UserForm activeId={activeId} setActiveId={setActiveId} onFinish={onFinish} form={form} users={users} editingMode={editingMode} />
      const allUsers = <UsersList users={users} pullUsers={pullUsers}  editUserInfo={editUserInfo} />
      const dashboard = <Dashboard users={users} addUser={addUser} />
      const settings = <Settings loggedUser={loggedUser} setloggedUser={setloggedUser} />
      const byId = <SingleUser />
      const profile = <Profile loggedUser={loggedUser} />
      const toggleButton = collapsed ? <MenuUnfoldOutlined className="trigger" onClick={toggle} /> : <MenuFoldOutlined className="trigger"  onClick={toggle} />

      const draw = <Drawer
          title="Editing Mode"
          placement="right"
          closable={false}
          onClose={onClose}
          visible={editingMode}
          getContainer={false}
          style={{ position: 'absolute' }}
          width="1100" >
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
          <div className="logo"> <Image height={120} src={dp} /> </div>
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
            <Menu.Item key="6" icon={<LockOutlined />} onClick={handleMenuClick}>
              Change Password
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }} >
            {toggleButton}
            User Management Site
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

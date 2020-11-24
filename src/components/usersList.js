import { DeleteFilled, EditFilled } from '@ant-design/icons';
import '../index.css'
// import axios from 'axios'
// import  API from '../api'
import React , { useState } from 'react'
import { Card , Table , Button , Popconfirm, InputNumber, message , Space} from 'antd'


export const UsersList = (props) => {
    const columns = [{
        title: 'User ID',
        dataIndex: 'user_id',
    },
    {
        title: 'UserName',
        dataIndex: 'username',
    },
    {
        title: 'Email',
        dataIndex: 'email',
    },
    {
        title: 'Password',
        dataIndex: 'password',
    },
    {
        title: 'Enabled',
        dataIndex: 'enabled',
    },
    {
        title: 'Action1',
        dataIndex: 'action1',
        render : (text , record) =>
        users.length >=1 ? (
            // <Popconfirm title="Sure to delete?" onConfirm={() => deleteSingleUser(record.key)}>
            //   <Button type="primary" onClick={() => editUserInfo(record.user_id)}> <EditFilled /> </Button>
              <Button type="primary" onClick={() => editUserInfo(record.user_id)}> <EditFilled /> </Button>
            /* </Popconfirm> */
        ) : null,
    },
    {
        title: 'Action2',
        dataIndex: 'action2',
        render : (text , record) =>
        users.length >=1 ? (
            <Popconfirm title="Sure to delete?" onConfirm={() => deleteSingleUser(record.key)}>
              <Button type="danger"> <DeleteFilled /> </Button>
            </Popconfirm>
        ) : null,
    },
]
    

const { users , setUsers , editUserInfo } = props
const [selectedRowKeys, setSelectedRowKeys] = useState([])
const [loading , setloading ] = useState(false)
const [selectedUsers , setselectedUsers ] = useState([])

const onSelectChange = (selectedRowKeys) => {
      setSelectedRowKeys(selectedRowKeys)
      const selected = users.filter((data) => selectedRowKeys.includes(data.key))
      const selectedIds = selected.map((data) => {return data.user_id})
      setselectedUsers(selectedIds)
    }
    
    const deleteSingleUser = (value) => {
         setloading(true)
         setTimeout(() => {
             const remainingUsers = users.filter((data) => data.key !== value)
             setUsers(remainingUsers)
            //  setselectedUsers([])
            //  setSelectedRowKeys([])
            message.success('1 User Deleted')
             setloading(false)
         }, 500)
    }

    const deleteUsers = () => {
      setloading(true)
      setTimeout(  () => {
      const remainingUsers = users.filter((data) => !selectedUsers.includes(data.user_id))
      setUsers(remainingUsers)
      const deleted = selectedUsers.length
      message.success(deleted + ' Users Deleted')
      setselectedUsers([])
      setSelectedRowKeys([])
      setloading(false)
    } , 300)
    }

    const hasSelected = selectedUsers.length > 0
    const selectedSize = selectedUsers.length
    const tableTitle = selectedUsers.length === 1 ? ' User Selected' : ' Users Selected'
     const rowSelection = {

         selectedRowKeys,
         onChange: onSelectChange,
     }

    return(
        <Card title="All Users">
            <Button type="primary" disabled={!hasSelected} onClick={deleteUsers} loading={loading}>Delete</Button>
            <span style={{ marginLeft: 8 }} >{hasSelected ? selectedSize + tableTitle : '' } </span>
            <Table rowSelection={rowSelection} columns={columns} dataSource={users} pagination={{defaultPageSize : 5}}/>
        </Card>
    )
}


export const SingleUser = () => {
    return(
        <Space>
            <Card title="Search By Id" style={{ width : 200}}>
                <InputNumber placeholder="Enter User Id" />
            </Card>
            {/* <Table /> */}
        </Space>
    )
}
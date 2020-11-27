import { DeleteFilled, EditFilled } from '@ant-design/icons';
import '../index.css'
import  { deleteUser , getSingleUser , deleteMult} from '../api'
import React , { useState } from 'react'
import { Card , Table , Button , Popconfirm, message , Input , Tag} from 'antd'

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
        render : (text , record) => (
            <Tag color={record.enabled ? 'green' : 'red'} >{record.enabled ? 'Enabled' : "Disabled"}</Tag>
        )
    },
    {
        title: 'Action1',
        dataIndex: 'action1',
        render : (text , record) =>
        users.length >=1 ? (
              <Button type="primary" onClick={() => editUserInfo(record.user_id)}> <EditFilled /> </Button>
        ) : null,
    },
    {
        title: 'Action2',
        dataIndex: 'action2',
        render : (text , record) =>
        users.length >=1 ? (
            <Popconfirm title="Sure to delete?" onConfirm={() => deleteSingleUser(record.user_id)}>
              <Button type="danger"> <DeleteFilled /> </Button>
            </Popconfirm>
        ) : null,
    },
]

const { users , setUsers , editUserInfo , showUserForm } = props
const [selectedRowKeys, setSelectedRowKeys] = useState([])
const [loading , setloading ] = useState(false)
const [selectedUsers , setselectedUsers ] = useState([])
const [found, setfound] = useState('')
const [searchingMode, setsearchingMode] = useState(false)
const { Search } = Input

const onSelectChange = (selectedRowKeys) => {
      setSelectedRowKeys(selectedRowKeys)
      const selected = users.filter((data) => selectedRowKeys.includes(data.user_id))
      const selectedIds = selected.map((data) => {return data.user_id})
      setselectedUsers(selectedIds)
    }
    
    const deleteSingleUser = async (value) => {
        setloading(true)
        try{
            let res = await deleteUser(value)

            if(res.status === 200){
                message.success('One User Deletd Successfull.....!!!!')
                setloading(false)
                const usersList = users.filter((user) => user.user_id !== value)
                setUsers(usersList)
            }
        }
        catch (err){
            message.error('User Not Deleted')
        }
    }
    
const deleteUsers = async () => {
        setloading(true)
        try {
            let res = await deleteMult(selectedUsers)
            
            if(res[setselectedUsers.length -1].status === 200) {
        
                const remainingUsers = users.filter((user) => !selectedUsers.includes(user.user_id))
                setUsers(remainingUsers)
                const deleted = selectedUsers.length
                message.success(deleted + ' Users Deleted')
                setselectedUsers([])
                setSelectedRowKeys([])
                setloading(false)
            }
        } catch (error) {
            message.error('Some Error Occured')
            
        }
}

const findById = async (value) =>{
    setsearchingMode(true)
    try{
            const res = await getSingleUser(value)
            if(res.status === 200) {
                const data = res.data
                setfound({...found , username : data.username , user_id : data.user_id , email : data.email , enabled : data.enabled , password : data.password , key : data.user_id })
                setsearchingMode(false)
         }
        }
        catch (err){
            message.error('User Not Found')
            setfound('')
            setsearchingMode(false)
        }
    }
    
    const hasSelected = selectedUsers.length > 0
    const selectedSize = selectedUsers.length
    const tableTitle = selectedUsers.length === 1 ? ' User Selected' : ' Users Selected'
    const trigger = loading ? loading : hasSelected

        const rowSelection = {
            selectedRowKeys,
            onChange: onSelectChange,
        }
        
        return(
            <Card title="All Users">
            <Button type="primary" disabled={!trigger} onClick={deleteUsers} loading={loading}>Delete</Button>
            <span style={{ marginLeft: 8 }} >{hasSelected ? selectedSize + tableTitle : '' } </span>
            <Search placeholder="Input User Id Then Press Enter"  onSearch={findById} loading={searchingMode}  style={{width : 255, marginLeft : 400}}/>
            <Button type="primary" style={{float : "right"}} onClick={showUserForm}>Create New User</Button>
            <Card hidden={!found.user_id}>{!found ? ' User Not Found' : found.user_id + ' == ' + found.username + ' == ' + found.email + ' == ' + found.password + ' == ' + found.enabled} </Card>
            <Table rowSelection={rowSelection} columns={columns} dataSource={users} pagination={{defaultPageSize : 5}} rowKey={(record) => record.user_id} />
        </Card>
    )
}

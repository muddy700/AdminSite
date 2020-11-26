import { DeleteFilled, EditFilled } from '@ant-design/icons';
import '../index.css'
import  API from '../api'
import React , { useState } from 'react'
import { Card , Table , Button , Popconfirm, InputNumber, message , Space, Tag} from 'antd'


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
    

const { users , pullUsers , editUserInfo } = props
const [selectedRowKeys, setSelectedRowKeys] = useState([])
const [loading , setloading ] = useState(false)
const [selectedUsers , setselectedUsers ] = useState([])
const [found, setfound] = useState('')

const onSelectChange = (selectedRowKeys) => {
      setSelectedRowKeys(selectedRowKeys)
      const selected = users.filter((data) => selectedRowKeys.includes(data.user_id))
      const selectedIds = selected.map((data) => {return data.user_id})
      setselectedUsers(selectedIds)
    }
    
    const deleteSingleUser = async (value) => {
        setloading(true)
        try{
            let res = await API.delete(`users/${value}`);
            if(res.status === 200){
                message.success('DELETED.......!!!!')
                // console.log(res)
                setloading(false)
                setselectedUsers([])
                setSelectedRowKeys([])
            }
            // console.log(res)
            pullUsers()
        }
        catch (err){
            message.error('User Not Deleted')
        }
    }

    const deleteUsers = async () => {
      setloading(true)
      let res = []
      for( let x = 0 ; x < selectedUsers.length ; x++){
        res[x]  = await API.delete(`users/${selectedUsers[x]}`)
      }
      console.log(res)
      pullUsers()

      setTimeout(  () => {
      const deleted = selectedUsers.length
      message.success(deleted + ' Users Deleted')
      setselectedUsers([])
      setSelectedRowKeys([])
      setloading(false)
    } , 300)

    }
    const findById = async (value) =>{
        // console.log(value)
        try{
            let res = await API.get(`users/${value}`)
            if(res.status === 200) {
                // console.log(res.data)
                const data = res.data
                // console.log('Entered ' + value + ' Got ' + data.user_id + ' en ' + data.enabled)
                // message.success('name : ' + data.username )
                setfound({...found , username : data.username , user_id : data.user_id , email : data.email , enabled : data.enabled , password : data.password , key : data.user_id })
                // console.log(data.username)
         }
        }
        catch (err){
            message.error('User Not Found')
        }
        
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
            <InputNumber placeholder="Enter User Id" onChange={findById} style={{width : 200 }} />
            <Card>{found.user_id} == {found.username} == {found.email} == {found.password} == {found.enabled} </Card>
            <Table rowSelection={rowSelection} columns={columns} dataSource={users} pagination={{defaultPageSize : 5}} rowKey={(record) => record.user_id}/>
        </Card>
    )
}


export const SingleUser = () => {
    return(
        <Space>
            <Card title="Search By Id" style={{ width : 200}}>
            </Card>
        </Space>
    )
}
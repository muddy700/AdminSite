import React from 'react'
import { Card, Typography , Space } from 'antd'
// import Title from 'antd/lib/skeleton/Title'
import '../index.css'

export const Dashboard = (props) => {
    const { users } = props
    const { Title } = Typography
    const enabled = users.filter((data) => data.enabled === 'True')
    
    return(
        <Space>
            <Card title="Registered Users" style={{width : 300 , backgroundColor : 'lightgrey' , textAlign : 'center'}}>
                <Title level={2}> {users.length} </Title>
            </Card>
            <Card title="Enabled Users" style={{width : 300 , backgroundColor : 'lightgrey' , textAlign : 'center'}}>
                <Title level={2}> {enabled.length} </Title>
            </Card>
            <Card title="Disabled Users" style={{width : 300 , backgroundColor : 'lightgrey' , textAlign : 'center'}}>
                <Title level={2}> {users.length -enabled.length} </Title>
            </Card>
            <Card title="Online Users" style={{width : 300 , backgroundColor : 'lightgrey' , textAlign : 'center' }}>
                <Title level={2}> 0 </Title>
            </Card>
        </Space>
    )
}
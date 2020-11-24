import React from 'react'
import { Card, Typography , Space } from 'antd'
// import Title from 'antd/lib/skeleton/Title'
import '../index.css'

export const Dashboard = (props) => {
    const { users } = props
    const { Title } = Typography
    const enabled = users.filter((data) => data.enabled === 'True')
    const cardStyle = {width : 300 , backgroundColor : 'lightgrey' , textAlign : 'center'}
    
    return(
        <Space size={40}>
            <Card hoverable title="Registered Users" style={cardStyle}>
                <Title level={2}> {users.length} </Title>
            </Card>
            <Card hoverable title="Enabled Users" style={cardStyle}>
                <Title level={2}> {enabled.length} </Title>
            </Card>
            <Card hoverable title="Disabled Users" style={cardStyle}>
                <Title level={2}> {users.length -enabled.length} </Title>
            </Card>
            <Card hoverable title="Online Users" style={cardStyle}>
                <Title level={2}> 0 </Title>
            </Card>
        </Space>
    )
}
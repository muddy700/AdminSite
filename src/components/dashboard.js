import React from 'react'
import { Card, Typography , Space , Spin , Button } from 'antd'
import { LoadingOutlined } from '@ant-design/icons';
import '../index.css'

export const Dashboard = (props) => {
    const { users , addUser  } = props
    const { Title } = Typography
    const enabled = users.filter((data) => data.enabled === 'True')
    const cardStyle = {width : 300 , backgroundColor : 'lightgrey' , textAlign : 'center'}
    const antIcon = <LoadingOutlined style={{ fontSize: 30 }} spin />;
    const spinner = <Spin indicator={antIcon} />
    const hasData = users.length > 0
    
    return(
        <Card loading={!hasData} bordered={false} style={{widows : 1300}}>
        <Space size={30} >
        <Button type="primary" onClick={addUser} >Add</Button>
            <Card hoverable title="Registered Users" style={cardStyle} >
                <Title level={2}>{users.length}  </Title>
            </Card>
            <Card hoverable title="Enabled Users" style={cardStyle}>
                <Title level={2}>{hasData ? enabled.length : spinner } </Title>
            </Card>
            <Card hoverable title="Disabled Users" style={cardStyle}>
                <Title level={2}> {hasData ?  users.length -enabled.length : spinner } </Title>
            </Card>
            <Card hoverable title="Online Users" style={cardStyle}>
                <Title level={2}> 0 </Title>
            </Card>
        </Space> </Card>
    )
}
import { Card , Form,  Button, Select , Typography, Input, Row, Col} from 'antd';
import '../index.css'

const layout = {
    labelCol: {
        span: 8
    },
    wrapperCol: {
        span: 16
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 20,
        span: 16
    },
};


export const UserForm = (props) => {
    const { activeUser , setActiveUser , onFinish , users , form , editingMode } = props
    const { Title } = Typography
    const colStyle = { marginLeft : 60}
    const rowStyle = { marginTop : 10}

    const onNameChange = (value) => {
           setActiveUser({...activeUser , username : value })
       }
    const onEmailChange = (value) => {
        setActiveUser({...activeUser , email : value})
    }
    const onStatusChange = (value) => {
        setActiveUser({...activeUser , enabled : value})
    }
    const onPasswordChange = (value) => {
        setActiveUser({...activeUser , password : value})
    }
    return(

        <Card title={editingMode ? 'Edit User Info' : "Fill User Details"} >
            <Form  {...layout} name="basic" initialValues={{ remember: false }} onFinish={(e) => onFinish(e)}  form={form}>
            <Row  style={rowStyle}>
                <Col span={10} >
                    <Form.Item label="UserId"  name="UserId" >
                        <Title level={4}>{editingMode ? activeUser.user_id : users.length +1} </Title>
                    </Form.Item>
                </Col>
                <Col span={10} style={colStyle}>
                    <Form.Item label="UserName" name="username" rules={[{ required : true , message : 'UserName Required!'}]} hasFeedback>
                        <Input placeholder="Enter UserName" onChange={(e) => onNameChange(e.target.value)} />
                    </Form.Item>
                </Col>
            </Row>
            <Row style={rowStyle}>
                <Col span={10} >
                    <Form.Item label="Email" name="email" rules={[{ required : true , type : 'email' , message : 'Email Required!'}]} hasFeedback>
                        <Input placeholder="Enter Email" onChange={(e) => onEmailChange(e.target.value)} />
                    </Form.Item>
                </Col>
                <Col span={10} style={colStyle}>
                    <Form.Item label="Enabled" name="enabled" rules={[{ required : true , message : 'Status Required!'}]} hasFeedback>
                        <Select placeholder="---Select Option---" name="enabled" onChange={onStatusChange} >
                            <option value={true}>True</option>
                            <option value={false}>False</option>
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
            <Row style={rowStyle}>
                <Col span={10} >
                    <Form.Item label="Password" name="password" rules={[{ required : true , message : 'Password Required!'}  ,
                        () => ({ validator(rule, value) { if (!value || value.length >= 5 ) { return Promise.resolve(); }
                        return Promise.reject('Password Is Too Short!'); }, })]} hasFeedback>
                        <Input.Password placeholder="Enter password" onChange={(e) => onPasswordChange(e.target.value)} />         
                    </Form.Item>
                </Col>
                <Col span={10} style={colStyle}>
                    <Form.Item label="Comfirm Password" name="comfirmPassword" rules={[{ required : true , message : 'Password Required!'} , 
                        ({ getFieldValue }) => ({ validator(rule, value) { if (!value || getFieldValue('password') === value) { return Promise.resolve(); }
                        return Promise.reject('Passwords Did Not Match!'); }, }),]} dependencies={['password']} hasFeedback > 
                        <Input.Password placeholder="Re-Enter password" />         
                    </Form.Item>
                </Col>
            </Row>
                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit" >Add</Button>
                </Form.Item>
            </Form>

        </Card>
    )
}
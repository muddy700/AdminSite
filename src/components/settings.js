import {Card , Form , Button , Input , message, Row, Col} from 'antd'
import React , { useState} from 'react'
import '../index.css'

const tailLayout = {
    wrapperCol: {
        offset: 20,
        span: 16
    },
};

export const Settings = (props) => {
    
    const{ loggedUser , setloggedUser} = props
    const [newPass, setnewPass] = useState('')
    const [form] =Form.useForm()
    const colStyle = { marginLeft : 80}
    const rowStyle = { marginTop : 12}

    const onFinish = () => {
        form.resetFields()
        setloggedUser({...loggedUser , password : newPass})
        message.success('Password Changed SuccessFull')
    }
    const handleNewPassword = (value) => {
        setnewPass(value)
    }
    
    return(
        <Card title="Change  Password" >
            <Form   name="basic2" initialValues={{ remember: false }} onFinish={onFinish}  form={form}>
                <Row style={rowStyle}>
                    <Col span={22} style={colStyle}>

                <Form.Item label="Old Password" name="oldPass" rules={[{ required : true , message : 'Password Required!'} , 
                    () => ({ validator(rule, value) { if ( !value || value === loggedUser.password ) { return Promise.resolve(); }
                    return Promise.reject('Wrong Password!'); }, }) ]} hasFeedback>
                    <Input.Password placeholder="Enter Old Password"/>         
                </Form.Item>
                    </Col>
                </Row>
                <Row style={rowStyle}>
                    <Col span={10} style={colStyle}>

                <Form.Item label="New Password" name="newPass" rules={[{ required : true , message : 'Password Required!'} ,
                    () => ({ validator(rule, value) { if ( !value || value.length >= 5 ) { return Promise.resolve(); }
                    return Promise.reject('Password Is Too Short!'); }, })]} hasFeedback>
                    <Input.Password placeholder="Enter New Password" onChange={(e) => handleNewPassword(e.target.value)} />         
                </Form.Item>
                    </Col>
                    <Col span={10} style={colStyle}>

                <Form.Item label="Repeat New Password" name="reNewPass" rules={[ { required : true , message : 'Password Required!'} , 
                     ({ getFieldValue }) => ({ validator(rule, value) { if (!value || getFieldValue('newPass') === value) { return Promise.resolve(); }
                    return Promise.reject('Passwords Did Not Match!'); }, }),]} dependencies={['newPass']} hasFeedback >
                    <Input.Password placeholder="Re-Enter New Password"/>         
                </Form.Item>
                    </Col>
                </Row>
                 <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit" >Save</Button>
                </Form.Item>
            </Form>
        </Card>
    )
}
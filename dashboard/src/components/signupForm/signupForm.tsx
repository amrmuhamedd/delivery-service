import React from 'react'
import { Form , Input , Button} from "antd"
import {UserOutlined , LockOutlined} from '@ant-design/icons';
import {Link} from 'react-router-dom'
import Logo from "../ui/logo/logo";
interface Iprops {
    handleFinish : (values :any) => void
}
function SignupForm({handleFinish} : Iprops) {
  return (
        <div className='auth-form'>
           <Logo />
        <Form onFinish={handleFinish}>
             <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: 'Please input your Username!',
              },
            ]}
          >
            <Input  placeholder="write your Username" />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                type : 'email',
                message: 'Please input your real email!',
              },
            ]}
          >
            <Input  placeholder="write your email" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                min : 8,
                message: 'Please input your Password!',
              },
            ]}
          >
            <Input
              type="password"
              placeholder="write your Password"
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              signup 
            </Button>
            Already have account <Link to="/login">login</Link>
          </Form.Item>
     </Form>
     </div>
  )
}

export default SignupForm
import { Form , Input , Button} from "antd"
import {UserOutlined , LockOutlined} from '@ant-design/icons';
import {Link} from 'react-router-dom'
import './loginform.scss'
import Logo from "../ui/logo/logo";
interface Iprops {
    handleFinish : (values :any) => void
}
function LoginForm({handleFinish} : Iprops) {
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
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your Password!',
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
        Or <Link to="/signup">register now!</Link>
      </Form.Item>
 </Form>
 </div>
  )
}

export default LoginForm
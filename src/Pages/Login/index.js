import './style.scss';
import { Form, Input, Button, message } from 'antd';
import {MailOutlined, UserOutlined, GoogleOutlined, FacebookOutlined, GithubOutlined, SmileOutlined} from '@ant-design/icons'
import { useNavigate  } from 'react-router-dom';
import { checkLogin } from '../../Utils/Fetch';

function Login(){
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const success = () => {
    messageApi.open({
      icon: <SmileOutlined />,
      content: 'Hello Friend',
      duration: 3,
      className: 'message'
    });
  };

  const error = () => {
    messageApi.open({
      type: 'error',
      content: 'Wrong email or password!',
      duration: 3,
    });
  };

  const onFinish = async (values) =>{
    const login = await checkLogin('http://localhost:3002/company',values.email, values.password);
    if(login){
      localStorage.setItem('token',login.token)
      success();
      setTimeout(()=>{
        navigate('/');
      },1000)
    }
    else{
      error();
    }
  }

  const handleNavi = ()=>{
    navigate('/register');
  }

  return (
    <div className="login">
      {contextHolder}
      <div className='login__overlay'></div>
      <div className='login__form'>
        <h2 className='login__title'>LOGIN</h2>
        <h5 className='login__slogan'>Join Us Today and Start Your Journey to Success!</h5>
        <div className='login__icon'>
          <GoogleOutlined className='login__icon__i'/>
          <FacebookOutlined className='login__icon__i'/>
          <GithubOutlined className='login__icon__i'/>
        </div>
        <Form onFinish={onFinish}>
          <Form.Item
            name="email"
            className='login__form__item'
            rules={[
              {
                required: true,
                message: 'Please input your email!',
              },
              {
                pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: 'Wrong email!',
              },
            ]}
          >
            <Input size='large' placeholder='Input your Email' className='login__form__item__input login__form__item__input__mail' addonAfter={<MailOutlined />}/>
          </Form.Item>

          <Form.Item
            name="password"
            className='login__form__item'
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              }
            ]}
          >
            <Input.Password size='large' className='login__form__item__input login__form__item__input__pass' placeholder='Input password'/>
          </Form.Item>
          <h5 className='login__form__text'>Don't have an account. <span onClick={handleNavi} className='login__form__text__bold'>Register here!</span></h5>
          <Form.Item className='login__form__b'>
            <Button className='login__form__b__button' htmlType="submit">Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default Login;
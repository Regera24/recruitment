import './style.scss';
import { Form, Input, Button, message } from 'antd';
import {MailOutlined, UserOutlined, GoogleOutlined, FacebookOutlined, GithubOutlined, SmileOutlined} from '@ant-design/icons'
import { useNavigate  } from 'react-router-dom';
import { fetchData, addData } from '../../Utils/Fetch';
import { useState, useEffect} from 'react';
function Register(){
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [data,setData] = useState([]); 

  useEffect(()=>{
    const getData = async()=>{
      const response = await fetchData('https://recruit-j7xv.onrender.com/company');
      setData(response);
    }
    getData();
  },[])

  const success = () => {
    messageApi.open({
      icon: <SmileOutlined />,
      content: 'Sign up successfully',
      duration: 3,
      className: 'message'
    });
  };

  const error = () => {
    messageApi.open({
      type: 'error',
      content: 'Email has already been registered!',
      duration: 3,
    });
  };

  const onFinish = (values) =>{
    if(data.length > 0 ){
      const exist = data.filter((item)=>item.email===values.email);
      if(exist.length===0){
        const last = data[data.length - 1].id;
        const newAcc = {
          email: values.email,
          password: values.password,
          name: values.username,
          id: last + 1
        }
        addData('https://recruit-j7xv.onrender.com/company',newAcc);
        success();
        setTimeout(()=>{
          navigate('/login');
        },1000)
      }
      else{
        error();
      }
    }
  }

  const handleNavi = ()=>{
    navigate('/login');
  }

  return (
    <div className="register">
      {contextHolder}
      <div className='register__overlay'></div>
      <div className='register__form'>
        <h2 className='register__title'>SIGN UP</h2>
        <h5 className='register__slogan'>Join Us Today and Start Your Journey to Success!</h5>
        <div className='register__icon'>
          <GoogleOutlined className='register__icon__i'/>
          <FacebookOutlined className='register__icon__i'/>
          <GithubOutlined className='register__icon__i'/>
        </div>
        <Form onFinish={onFinish}>
          <Form.Item
            name="email"
            className='register__form__item'
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
            <Input size='large' placeholder='Input your Email' className='register__form__item__input register__form__item__input__mail' addonAfter={<MailOutlined />}/>
          </Form.Item>

          <Form.Item
            name="username"
            className='register__form__item'
            rules={[
              {
                required: true,
                message: 'Please input your username!',
              },
            ]}
          >
            <Input size='large' placeholder='Input Username' className='register__form__item__input register__form__item__input__user' addonAfter={<UserOutlined />}/>
          </Form.Item>

          <Form.Item
            name="password"
            className='register__form__item'
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              }
            ]}
          >
            <Input.Password size='large' className='register__form__item__input register__form__item__input__pass' placeholder='Input password'/>
          </Form.Item>
          <h5 className='register__form__text'>You've already had an account. <span onClick={handleNavi} className='register__form__text__bold'>Sign in here!</span></h5>
          <Form.Item className='register__form__b'>
            <Button className='register__form__b__button' htmlType="submit">Register
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default Register;
import logo from '../png/logo-no-background.png';
import logo2 from '../png/bgbg.png';
import './style.scss';
import { Button , Input, notification } from 'antd';
import { SearchOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { Link} from 'react-router-dom';
import { useState, useEffect} from 'react';
import { useNavigate  } from 'react-router-dom';
function Header(props){
  const [api, contextHolder] = notification.useNotification();
  const {collapsed} = props;
  const [keyword,setKeyWord] = useState();
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const warn = ()=>{
    notification.warning({
      placement: 'topRight',
      message: 'Warning',
      description:
        'Please input your keywords',
    });
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  }
  const handleBackHome = ()=>{
    navigate('/');
  }
  const handleChange = (e)=>{
    setKeyWord(e.target.value);
  }
  const handleNavi = ()=>{
    if(keyword){
      navigate(`/search/${keyword}`)
    }
    else{
      warn();
    }
  }
  return (
    <div className="header">
      {contextHolder}
      <div className={collapsed ? 'header__logo header__logo--close' : 'header__logo'}>
        <img onClick={handleBackHome} src={collapsed ? logo2 : logo} alt='img'></img>
      </div>
      <div className='header__search'>
          <div className='header__search__bar'>
            <Input onChange={handleChange} size='large' addonAfter={<SearchOutlined onClick={handleNavi} className='header__search__bar__icon' />}/>
          </div>
      </div>
      {
        token ?
        <div className='header__icon'>
          <Link to='/user'>
            <div className='header__icon__ic header__icon__ic__user'> <UserOutlined /> </div>
          </Link>
          <div onClick={handleLogout} className='header__icon__ic header__icon__ic__log'> <LogoutOutlined /> </div>
        </div>
        :
        <div className='header__func'>
          <Link to='/login'>
            <Button className='header__func__reg'>Login</Button>
          </Link>
          <Link to='/register'>
            <Button className='header__func__log'>Register</Button>
          </Link>
      </div>
      }
    </div>
  )
}

export default Header;
import {HomeOutlined, UserOutlined, SettingOutlined, MenuUnfoldOutlined, MenuFoldOutlined  } from '@ant-design/icons';
import { Button, Menu, Switch, Avatar, Badge } from 'antd';
import {SunOutlined, MoonOutlined,DashboardOutlined,FormOutlined, SnippetsOutlined   } from '@ant-design/icons';
import React, { useState, useContext, useEffect } from 'react';
import { fetchData } from '../../Utils/Fetch';
import {useNavigate} from 'react-router-dom';
import './style.scss'
function SideBar(props){
  const { toggleCollapsed, collapsed } = props;
  const navigate = useNavigate();
  const Navi = (link) =>{
    navigate(link);
  }

  const [user, setUser] = useState();
  const token = localStorage.getItem('token');
  useEffect(()=>{
    const getUser = async ()=>{
      if(token){
        const response = await fetchData(`https://recruit-j7xv.onrender.com/company?token=${token}`);
        setUser(response[0]);
        console.log(response[0]);
      }
    }
    getUser();
  },[])

  const items = [
    {
      key:'1',
      icon: collapsed ? <MenuUnfoldOutlined className='sidebar__icon' /> : <MenuFoldOutlined className='sidebar__icon'  />,
      label: 'Side Bar',
      onClick: toggleCollapsed,
      className:'menu-item-color',
    },
    {
      key: '2',
      icon: <HomeOutlined className='sidebar__icon' />,
      label: 'Home',
      className:'menu-item-color',
      onClick: ()=>Navi('/')
    },
    {
      key: '3',
      icon:<UserOutlined className='sidebar__icon' /> ,
      label: 'User',
      className:'menu-item-color',
      onClick: ()=>Navi('/user')
    },
    {
      key: '6',
      icon:<DashboardOutlined  className='sidebar__icon' /> ,
      label: 'Dashboard',
      className:'menu-item-color',
      onClick: ()=>Navi('/dashboard')
    },
    {
      key: '8',
      icon:<FormOutlined   className='sidebar__icon' /> ,
      label: 'Manage',
      className:'menu-item-color',
      onClick: ()=>Navi('/managejobs')
    },
    {
      key:'4',
      icon:<SettingOutlined className='sidebar__icon'/>,
      label:'Settings',
      className:'menu-item-color',
    },
  ]

  return (
    <div
      style={{
        width: 150,
        display:'flex'
      }}
    >
      <Menu
        style={{ height: '100%'}}
        triggerSubMenuAction='click'
        mode='inline'
        items={items}
      />
    </div>
  )
}
export default SideBar;
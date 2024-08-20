import Header from '../Header';
import Footer from '../Footer';
import { Outlet } from 'react-router-dom';
import SideBar from '../SideBar';
import {Layout} from 'antd'
import {useEffect, useState} from 'react';
import './style.scss';
function DLayout(){
  const { Sider} = Layout;

  const [collapsed, setCollapsed] = useState(true);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <Header style={{marginLeft:'10%'}} collapsed={collapsed}/>
      <div className='outer' style={{display:'flex', zIndex:1}}>
        <Sider collapsed={collapsed} width={150} theme='light' className='sider' >
          <SideBar collapsed={collapsed} toggleCollapsed={toggleCollapsed} />
        </Sider>
        <Outlet/>
      </div>
      <Footer/>
    </div>
  )
}

export default DLayout;
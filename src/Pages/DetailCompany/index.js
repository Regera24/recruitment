import './style.scss';
import { fetchData, updateData } from '../../Utils/Fetch';
import { useState, useEffect} from 'react';
import {Col, Image, Row} from 'antd';
import { Form,  Spin } from 'antd';
import { useParams } from 'react-router-dom';
import DCHead from './DCHead';
import DCBody from './DCBody';
function DCompany(){
  const params = useParams();
  const [company, setCompany] = useState({});
  const token = localStorage.getItem('token');
  const [form] = Form.useForm();
  const [spin,setSpin] = useState(false);

  useEffect(()=>{
    window.scrollTo(0, 0);
    const getCompany = async ()=>{
      const response = await fetchData(`https://recruit-j7xv.onrender.com/company?id=${params.id}`);
      setCompany(response[0]);
      form.setFieldsValue(response[0]);
    }
    getCompany();
  },[form, token])

  return (
    (company ? (
      <>
        <div className="user company">
          <DCHead company={company}/>
          <DCBody company={company} form={form} />
        </div>
      </>
    ): 
      <div className='spin'>
        <Spin size='large' ></Spin>
      </div>
    )
  )
}

export default DCompany;
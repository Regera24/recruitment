import './style.scss';
import { fetchData, updateData } from '../../Utils/Fetch';
import { useState, useEffect} from 'react';
import {Col, Image, Row,Button} from 'antd';
import { Form, Input, Checkbox,  Spin } from 'antd';
import { FacebookOutlined, InstagramOutlined, TwitterOutlined, GithubOutlined, GoogleOutlined,LinkedinOutlined} from '@ant-design/icons';
import { useParams } from 'react-router-dom';
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
          <div className='user__header'>
            <div className='user__header__image'>
              <Image
                width={300}
                height={200}
                src={company.img}
              />
            </div>
            <div className='user__header__name'>
              <h2 style={{marginBottom:'10px'}}>{company.companyName}</h2>
              <h5 style={{marginLeft:'20px', marginTop:'5px'}}>{company.email}</h5>
            </div>
          </div>
          <div className='user__body'>
            <Form
            form={form}
            initialValues={company}
            disabled={true}
            >
              <h2 style={{marginTop:'0px',marginLeft:'20px'}}>Basic Information</h2>
              <Row gutter={[16,16]}>
                <Col span={12}>
                  <Form.Item name='companyName'>
                    <Input addonBefore='Company Name'/>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name='email'>
                    <Input addonBefore='Email'/>
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={[16,16]}>
                <Col span={12}>
                  <Form.Item name='phone'>
                    <Input  addonBefore='Phone Number'/>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name='address'>
                    <Input addonBefore='Address'/>
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={[16,16]}>
                <Col span={12}>
                  <Form.Item name='workingTime'>
                    <Input addonBefore='Working Time'/>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name='website'>
                    <Input addonBefore='Website'/>
                  </Form.Item>
                </Col>
              </Row>

              <h2 style={{marginTop:'0px',marginLeft:'20px'}}>BIO</h2>
              <Form.Item name='description'>
                <Input.TextArea rows={7} placeholder='Write something about yourself'/>
              </Form.Item>

              <h2 style={{marginTop:'0px',marginLeft:'20px'}}>Social Connection</h2>
              <div style={{display:'flex'}}>
                <div style={{color:'blue'}} className='user__body__icon user__body__icon__fb'>
                  <FacebookOutlined style={{marginRight:'5px', fontSize:'20px'}}  /> Facebook
                </div>
                <div style={{color:'#f77084'}} className='user__body__icon user__body__icon__ins'>
                  <InstagramOutlined style={{marginRight:'5px', fontSize:'20px'}}  /> Instagram
                </div>
                <div style={{color:'#4db8ee'}} className='user__body__icon user__body__icon__tw'>
                  <TwitterOutlined style={{marginRight:'5px', fontSize:'20px'}} /> Twitter
                </div>
              </div>
              <div style={{display:'flex'}}>
                <div style={{color:'#551a8b'}} className='user__body__icon user__body__icon__gh'>
                  <GithubOutlined style={{marginRight:'5px', fontSize:'20px'}}  />  Github
                </div>
                <div style={{color:'#f53e2d'}} className='user__body__icon user__body__icon__gg'>
                  <GoogleOutlined style={{marginRight:'5px', fontSize:'20px'}}  />  Google
                </div>
                <div style={{color:'#2180ff'}} className='user__body__icon user__body__icon__lk'>
                  <LinkedinOutlined style={{marginRight:'5px', fontSize:'20px'}}  />  LinkedIn
                </div>
              </div>
            </Form>
          </div>
          {
            spin && (
              <div className='spin'>
                <Spin size='large' ></Spin>
              </div>
            )
          }
        </div>
      </>
    ): <div></div>)
  )
}

export default DCompany;
import './style.scss'
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { fetchData, addData } from '../../Utils/Fetch';
import {Row, Col, Button, Form, Input, Spin, notification } from 'antd'
import { Link } from 'react-router-dom';
import {DollarOutlined, FormOutlined, EnvironmentOutlined, CloseOutlined} from '@ant-design/icons';
function Search(){
  let {keyword} = useParams();
  const [job, setJob] = useState([]);
  const [company,setCompany] = useState([]);
  const [company2,setCompany2] = useState([]);
  const [detail, setDetail] = useState([]);
  const [city, setCity] = useState([]);
  const [tag, setTag] = useState([]);
  const [open, setOpen] = useState(false);
  const [lastcv, setLastcv] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [api, contextHolder] = notification.useNotification();

  const success = () => {
    api.success({
      message: 'Apply Successfully',
      description:
        'Your CV has been sent to recuiters',
      duration: 2,
    });
  };

  const failed = () =>{
    api.error({
      message: 'Apply Failed',
      description:
        'An error occured, please try again',
      duration: 2,
    });
  }

  useEffect(()=>{
    window.scrollTo(0, 0);
    const getData = async()=>{
      const res = await fetchData(`http://localhost:3002/jobs?q=${keyword}`)
      setJob(res);
      setDetail(res[0]);
      const res2 = await fetchData(`http://localhost:3002/company?q=${keyword}`)
      setCompany(res2);
      const res3 = await fetchData(`http://localhost:3002/company`)
      setCompany2(res3);
      const res4 = await fetchData(`http://localhost:3002/city`)
      setCity(res4);
      const res5 = await fetchData(`http://localhost:3002/tags`)
      setTag(res5);
      const res6 = await fetchData(`http://localhost:3002/cv`)
      setLastcv(res6.length+1);
    }
    getData();
  },[keyword, isLoading])

  const handleFinish = async (values)=>{
    const today = new Date();
    const now = new Date();
    const day = today.getDate(); 
    const month = today.getMonth() + 1; 
    const year = today.getFullYear();
    const currentHours = now.getHours();
    const currentMinutes = now.getMinutes();
    const seconds = now.getSeconds();
    const time = day + '-' + month + '-' + year +" " + currentHours + ":" + currentMinutes + ":" + seconds; 
    const newCV = {
      id: lastcv,
      idCompany: detail.idCompany,
      idJob: detail.id,
      ...values,
      statusRead: false,
      createAt: time,
    }
    setIsLoading(true);
    const res = await addData('http://localhost:3002/cv',newCV);
    setTimeout(()=>{
      setIsLoading(false);
      setOpen(false);
      if(res){
        success();
      }else{
        failed();
      }
    },3000)
  }

  const onCancel = () =>{
    setOpen(false);
  }

  return (
    <div className='search'>
      {contextHolder}
        <Row className='search__outer'>
          <Col className='search__left' span={12}>
          <h1>Search Results : </h1>
            <div className='search__job'>
              <h2>Reference Job : </h2>
              {
                (job && company && company2.length>0 && tag.length>0 && city.length>0 && detail) && (
                  <ul className='search__job__list'>
                    {
                      job.map((item)=>{
                        return (
                          <li className='search__job__list__item' key={item.id}>
                              <h4 className='search__job__list__item__title'>
                                  {item.name} - {company2.filter((com)=>com.id===item.idCompany)[0].companyName}
                              </h4>
                              <div className='search__job__list__item__location'>
                                {
                                  item.city.reduce((acc,item,index)=>{
                                    if(index===0) return acc + city[index+1].name;
                                    return acc + ', ' + city[index+1].name 
                                  },'')
                                }
                              </div>
                              <div className='search__job__list__item__tag'>
                                {
                                  item.tags.reduce((acc,item,index)=>{
                                    if(index===0) return acc + tag[index+1].name;
                                    return acc + ', ' + tag[index+1].name 
                                  },'')
                                }
                              </div>
                              <div className='search__job__list__item__button'>
                                <Button onClick={()=>{setDetail(item)}} className='search__job__list__item__button__btn'>Details</Button>
                              </div>
                          </li>
                        )
                      })
                    }
                  </ul>
                )
              }
            </div>
            <div className='search__com'>
              <h2>Reference Company : </h2>
              {
                (job && company && company2.length>0) && (
                  <ul style={{listStyle:'circle', marginLeft:'20px'}} className='search__job__list'>
                    {
                      company.length > 0 ? (
                        company.map((item)=>{
                          return (
                            <li className='search__job__list__item__c' key={item.id}>
                              <Link to={`/company/${item.id}`}>
                                <h4 className='search__job__list__item__title'>
                                    {item.companyName}
                                </h4>
                              </Link>
                            </li>
                          )
                        })
                      ) : <h3 style={{paddingLeft:'50px'}}>No Results</h3>
                    }
                  </ul>
                )
              }
            </div>
          </Col>

          {
            (detail && company2.length>0 && tag.length>0) && (
              <Col className='search__right' span={12}>
                <div className='search__details'>
                    <div className='img'>
                      <img src={(company2.filter((item)=>item.id===detail.idCompany)[0].img)}></img>
                    </div>
                    <h2>{detail.name}</h2>
                    <h4>{(company2.filter((item)=>item.id===detail.idCompany)[0].companyName)}</h4>
                    <h4>Job Tags: 
                      {
                        detail.tags.reduce((acc,item,index)=>{
                          if(index===0) return acc + tag[index+1].name;
                          return acc + ', ' + tag[index+1].name 
                        },'   ')
                      }
                    </h4>
                    <h3>Details Job:</h3>
                    <div className='search__details__item'>
                      <DollarOutlined style={{color:'green',fontSize:'20px'}} />
                      <h4>Salary: {detail.salary}</h4>
                    </div>
                    <div className='search__details__item'>
                      <FormOutlined style={{color:'blue',fontSize:'20px'}} />
                      <h4>Description: {detail.description}</h4>
                    </div>
                    <div className='search__details__item'>
                      <EnvironmentOutlined  style={{color:'red',fontSize:'20px'}} />
                      <h4>
                        {
                          detail.city.reduce((acc,item,index)=>{
                            if(index===0) return acc + city[index+1].name;
                            return acc + ', ' + city[index+1].name 
                          },'')
                        }
                      </h4>
                    </div>
                    <div className='search__job__list__item__button'>
                        <Button onClick={()=>{setOpen(true)}} className='search__job__list__item__button__btn'>Apply Now</Button>
                    </div>
                </div>
              </Col>
            )
          }
        </Row>
        {
          open && lastcv && (
            <>
              <div className='overlay'></div>
              <div className='detail'>
                <h2>CV Information</h2>
                <Form 
                  labelCol={{
                    span: 5,
                  }}
                  wrapperCol={{
                    span: 19,
                  }}
                  onFinish={handleFinish}
                >
                  <Form.Item
                    label='Your Name'
                    name='name'
                    rules={[{ required: true, message: 'Please input your name' }]}
                  >
                    <Input/>
                  </Form.Item>

                  <Form.Item
                    label='Phone'
                    name='phone'
                    rules={[{ required: true, message: 'Please input your phone' },
                      {pattern:/^\d{9,12}$/, message:'Wrong phone format'}
                    ]}
                  >
                    <Input/>
                  </Form.Item>

                  <Form.Item
                    label='Email'
                    name='email'
                    rules={[{ required: true, message: 'Please input email' },
                      { pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: 'Wrong email format'}
                    ]}
                  >
                    <Input/>
                  </Form.Item>

                  <Form.Item
                    label='Address'
                    name='city'
                    rules={[{ required: true, message: 'Please input your address' }]}
                  >
                    <Input/>
                  </Form.Item>

                  <Form.Item
                    label='Link Project'
                    name='linkProject'
                    rules={[{ required: true, message: 'Please input Project link' }]}
                  >
                    <Input/>
                  </Form.Item>

                  <Form.Item
                    label='Description'
                    name='description'
                    rules={[{ required: true, message: 'Please input description' }]}
                  >
                    <Input.TextArea style={{height:'120px'}} />
                  </Form.Item>
                  
                  <Row className='jobmanage__edit__inline'>
                    <Col>
                      <Form.Item>
                        <Button onClick={onCancel} className='jobmanage__edit__inline__button'>Cancel</Button>
                      </Form.Item>
                    </Col>
                    <Col>
                      <Form.Item>
                        <Button htmlType='submit' className='jobmanage__edit__inline__button'>Apply</Button>
                      </Form.Item>
                    </Col>
                  </Row>
                </Form>
                <div onClick={onCancel} className='detail__close'>
                  <CloseOutlined />
                </div>
              </div>
            </>
            
          )
        }
        {
          isLoading && 
            <>
              <Spin className='spin' size="large" />
            </>
        }
    </div>
  )
}

export default Search;
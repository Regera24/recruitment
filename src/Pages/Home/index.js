import { Carousel, Row, Col, Button, Select, Table } from 'antd';
import './style.scss'
import { useState, useEffect} from 'react';
import { fetchData } from '../../Utils/Fetch';
import { Link } from 'react-router-dom';
import logo from '../../Components/png/logo-no-background.png'
import {SearchOutlined, RocketOutlined, MessageOutlined} from '@ant-design/icons';
import avt1 from '../../Components/png/avt1.jpg'
import avt2 from '../../Components/png/avt2.jpg'
import avt3 from '../../Components/png/avt3.jpg'
import left from '../../Components/png/left_img.png';
import right from '../../Components/png/righttt.png';
function Home(){
  const [job, setJob] = useState([]);
  const [data, setData] = useState([]);
  const [company, setCompany] = useState([]);
  const [location, setLocation] = useState([]);
  const [options, setOptions] = useState([]);
  const [loptions,setLoptions] = useState([]);
  const [filterTag, setFilterTag] = useState([]);
  const [filterloca, setFilterLoca] = useState([]);
  const [datasource,setDatasource] = useState([]);

  useEffect(()=>{
    window.scrollTo(0, 0);
    const api = 'https://recruit-j7xv.onrender.com/jobs';
    const api2 = 'https://recruit-j7xv.onrender.com/company';
    const api3 = 'https://recruit-j7xv.onrender.com/city';
    const api4 = 'https://recruit-j7xv.onrender.com/tags';
    const getData = async() =>{
      const response = await fetchData(api);
      setJob(response);
      setData(response.slice(0, 12));
    }
    const getData2 = async() =>{
      const response = await fetchData(api2);
      setCompany(response);
    }
    const getData3 = async() =>{
      const response = await fetchData(api3);
      setLocation(response);
      setLoptions(response.map((item)=>{
        return {
          label: item.name,
          value: item.id
        }
      }))
    }
    const getData4 = async() =>{
      const response = await fetchData(api4);
      setOptions(response.map((item)=>{
        return {
          label: item.name,
          value: item.id
        }
      }))
    }
    getData();
    getData2();
    getData3();
    getData4();
  },[])

  useEffect(()=>{
    if(job.length>0 && company.length>0 && location.length>0){
      setDatasource(job.map((item)=>{
        return {
          key: item.id,
          cname: <Link style={{color:' rgb(105, 168, 187)',fontWeight:'500'}} to={'/company/'+item.idCompany}>{company[item.idCompany-1].companyName}</Link>,
          jtitle: item.name,
          salary: item.salary,
          location: item.city.map((ct,index)=>{
            if(index!==item.city.length-1) return location[ct-1].name +", "
            else return location[ct-1].name
          })
        }
      }));
    }
  },[job, company,location])

  const columns = [
    {
      title: 'Company Name',
      dataIndex: 'cname',
      key: 'cname',
      with:'25%',
      textWrap: 'word-break',
      ellipsis: true,
    },
    {
      title: 'Job title',
      dataIndex: 'jtitle',
      key: 'jtitle',
      with:'25%',
      textWrap: 'word-break',
      ellipsis: true,
    },
    {
      title: 'Offer',
      dataIndex: 'salary',
      key: 'salary',
      with:'20%',
      textWrap: 'word-break',
      ellipsis: true,
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
      with:'30%',
      textWrap: 'word-break',
      ellipsis: true,
    }
  ];

  const handleChange1 = (value)=>{
    setFilterTag(value);
  }
  const handleChange2 = (value)=>{
    setFilterLoca(value);
  }
  const handleFilter = ()=>{
    if(filterTag.length===0 && filterloca.length===0){
      setDatasource(job.map((item)=>{
        return {
          key: item.id,
          cname: <Link style={{color:' rgb(105, 168, 187)',fontWeight:'500'}} to={'/company/'+item.idCompany}>{company[item.idCompany-1].companyName}</Link>,
          jtitle: item.name,
          salary: item.salary,
          location: item.city.map((ct,index)=>{
            if(index!==item.city.length-1) return location[ct-1].name +", "
            else return location[ct-1].name
          })
        }
      }));
    }
      else if (filterTag.length === 0 && filterloca.length !== 0) {
        const filteredData = job.reduce((acc, item) => {
          for (let i = 0; i < item.city.length; i++) {
            if (filterloca.includes(item.city[i])) {
              acc.push({
                key: item.id,
                cname: <Link style={{color:' rgb(105, 168, 187)',fontWeight:'500'}} to={'/company/'+item.idCompany}>{company[item.idCompany-1].companyName}</Link>,
                jtitle: item.name,
                salary: item.salary,
                location: item.city.map((ct, index) => {
                  if (index !== item.city.length - 1) return location[ct - 1].name + ", ";
                  else return location[ct - 1].name;
                }).join('')
              });
              break; 
            }
          }
          return acc;
        }, []);
      
        setDatasource(filteredData);
      }
      else if (filterTag.length !== 0 && filterloca.length === 0) {
        const filteredData = job.reduce((acc, item) => {
          for (let i = 0; i < item.tags.length; i++) {
            if (filterTag.includes(item.tags[i])) {
              acc.push({
                key: item.id,
                cname: <Link style={{color:' rgb(105, 168, 187)',fontWeight:'500'}} to={'/company/'+item.idCompany}>{company[item.idCompany-1].companyName}</Link>,
                jtitle: item.name,
                salary: item.salary,
                location: item.city.map((ct, index) => {
                  if (index !== item.city.length - 1) return location[ct - 1].name + ", ";
                  else return location[ct - 1].name;
                }).join('')
              });
              break; 
            }
          }
          return acc;
        }, []);
      
        setDatasource(filteredData);
      }
      else{
        const filteredData = job.reduce((acc, item) => {
          for (let i = 0; i < item.tags.length; i++) {
            if (filterTag.includes(item.tags[i])) {
              for (let i = 0; i < item.city.length; i++) {
                if (filterloca.includes(item.city[i])) {
                  acc.push({
                    key: item.id,
                    cname: <Link style={{color:' rgb(105, 168, 187)',fontWeight:'500'}} to={'/company/'+item.idCompany}>{company[item.idCompany-1].companyName}</Link>,
                    jtitle: item.name,
                    salary: item.salary,
                    location: item.city.map((ct, index) => {
                      if (index !== item.city.length - 1) return location[ct - 1].name + ", ";
                      else return location[ct - 1].name;
                    }).join('')
                  });
                  break; 
                }
              }
            }
          }
          return acc;
      }, []);
      setDatasource(filteredData);
  }
}

  return (
    <div className="home">
      <div className='home__inner'>
        <div className='home__intro'>
            <div className='home__intro__image'>
              <img alt='img' className='home__intro__image__img' src={logo}></img>
            </div>
            <h2 className='home__intro__slogan'>
              We provide the best <span className='home__intro__slogan__b'>strategy</span> <br></br>
              to grow up your <span className='home__intro__slogan__b'>business</span>
            </h2>
            <Button className='home__intro__button'>DISCOVER MORE</Button>
        </div>

        <div className='home__read'>
            <h1>Website Value</h1>
            <div className='home__read__inner'>
              <Row className='home__read__item__left home__read__item'>
                <Col span={10}> 
                  <img src={left}></img>
                </Col>
                <Col span={3}></Col>
                <Col span={11} className='home__read__item__left__text home__read__item__text'>
                  <h2>Innovative job search</h2>
                  <p>Discover opportunities tailored to your career goals. Find the right match for your professional aspirations and take the next step in your career journey with confidence.</p>
                </Col>
              </Row>
              <Row className='home__read__item__right home__read__item'>
                <Col span={11} className='home__read__item__right__text home__read__item__text'>
                  <h2>Streamline the hiring process</h2>
                  <p>Enhance your recruitment efforts with our efficient tools and resources. Simplify candidate evaluation, reduce time-to-hire, and ensure you find the best talent for your team.</p>
                </Col>
                <Col span={3}></Col>
                <Col span={10}>
                  <img src={right}></img>
                </Col>
              </Row>   
            </div>
        </div>

        <div className='home__process'>
          <h2>Recruit Process</h2>
          <p className='home__process__text'>From posting jobs to screening candidates, manage everything in one place. Focus on building a strong team while we support you to make informed decisions.</p>
          <Row className='home__process__list'>
            <Col className='home__process__list__item' span={4}>
              <div className='home__process__list__item__inner'>
                <RocketOutlined className='home__process__list__item__inner__icon' />
                <h3>Create JD</h3>
                <p>Godard pabst prism fam cuche.</p>
              </div>
            </Col>
            <Col className='home__process__list__item' span={4}>
              <div className='home__process__list__item__inner'>
                <RocketOutlined className='home__process__list__item__inner__icon' />
                <h3>Post Job</h3>
                <p>Godard pabst prism fam cuche.</p>
              </div>
            </Col>
            <Col className='home__process__list__item' span={4}>
              <div className='home__process__list__item__inner'>
                <RocketOutlined className='home__process__list__item__inner__icon' />
                <h3>Find Person</h3>
                <p>Godard pabst prism fam cuche.</p>
              </div>
            </Col>
            <Col className='home__process__list__item' span={4}>
              <div className='home__process__list__item__inner'>
                <RocketOutlined className='home__process__list__item__inner__icon' />
                <h3>Get CV</h3>
                <p>Godard pabst prism fam cuche.</p>
              </div>
            </Col>
            <Col className='home__process__list__item' span={4}>
              <div className='home__process__list__item__inner'>
                <RocketOutlined className='home__process__list__item__inner__icon' />
                <h3>Contact</h3>
                <p>Godard pabst prism fam cuche.</p>
              </div>
            </Col>
            <Col className='home__process__list__item' span={4}>
              <div className='home__process__list__item__inner'>
                <RocketOutlined className='home__process__list__item__inner__icon' />
                <h3>Complete</h3>
                <p>Godard pabst prism fam cuche.</p>
              </div>
            </Col>
          </Row>
        </div>

        {
          (options.length > 0 && job.length > 0 && company.length > 0 && datasource.length > 0) && (
            <div className='home__filter'>
              <h2 className='home__filter__title'>Filter Jobs</h2>
              <div className='home__filter__select'>
                <Select
                  mode="multiple"
                  placeholder="Please select job tags"
                  style={{ width: '48%' , height:'50px'}}
                  options={options}
                  allowClear
                  className='home__filter__select__tag'
                  onChange={handleChange1}
                />
                <Select
                  mode="multiple"
                  placeholder="Please select locations"
                  style={{ width: '48%' , height:'50px'}}
                  options={loptions}
                  allowClear
                  className='home__filter__select__location'
                  onChange={handleChange2}
                />
                <Button onClick={handleFilter} className='home__filter__select__button' style={{ width: '4%' , height:'50px'}}>
                  <SearchOutlined />
                </Button>
              </div>
              <div className='home__filter__table'>
                <Table dataSource={datasource} columns={columns} pagination />
              </div>
            </div>
          )
        }

       <div style={{backgroundColor:"#e8eff9", width:'100%', display:'flex', alignContent:"center", justifyContent:"center"}}>
       <div className="home__carousel">
          <h2 className='home__carousel__hint'>Job hints</h2>
          {
            (data.length > 0 && company.length > 0 && location.length > 0 ? <>
              <Carousel autoplay className='home__carousel__cr'>
                {
                  data.map((item,index)=>{
                    return <div key={index} className='home__carousel__cr__item'>
                      <Row>
                        <Col span={12}>
                          <div className='home__carousel__cr__item__image'>
                            <img alt='img' className='home__carousel__cr__item__image__img' src={company[item.idCompany-1].img}></img>
                          </div>
                        </Col>
                        <Col style={{paddingLeft:'10px'}} span={12}>
                          <h3 className='home__carousel__cr__item__cpn'>Company: {company[item.idCompany-1].companyName}</h3>
                          <h4 className='home__carousel__cr__item__pos'>Position: {item.name}</h4>
                          <h4 className='home__carousel__cr__item__salary'>Salary: {item.salary}</h4>
                          <h4 className='home__carousel__cr__item__location'>Location: {item.city.map((city,index)=>{
                            if(index !== item.city.length-1) return location[city+1].name +", "
                            else return location[city+1].name;
                          })}</h4>
                        <Link>
                          <Button className='home__carousel__cr__item__button'>Details</Button>
                        </Link>
                        </Col>
                      </Row>
                    </div>
                  })
                }
              </Carousel>
            </> : <div></div>) 
          }
        </div>
       </div>
        <div className='home__feedback'>
          <h3>What do they say</h3>
          <p>Hear from our users who have found success with our platform. Join the community that trusts us to deliver results.</p>
          <Row className='home__feedback__inner'>
            <Col className='pd' span={8}>
              <div className='home__feedback__inner__item'>
                <MessageOutlined className='home__feedback__inner__item__icon' />
                <p>I found the platform incredibly intuitive and efficient. It’s a game-changer for anyone looking to improve their productivity.</p>
                <div className='home__feedback__inner__item__author'>
                  <img src={avt1}></img>
                  <div className='home__feedback__inner__item__author__right'>
                    <h4>John Wick</h4>
                    <p style={{color:'red'}}>Software Engineer</p>
                  </div>
                </div>
              </div>
            </Col>
            <Col className='pd' span={8}>
              <div className='home__feedback__inner__item'>
                <MessageOutlined className='home__feedback__inner__item__icon' />
                <p>As a human resource professional, this platform made hiring much simpler. It really helped speed up our recruitment process.</p>
                <div className='home__feedback__inner__item__author'>
                  <img src={avt2}></img>
                  <div className='home__feedback__inner__item__author__right'>
                    <h4>Jasmine Nguyen</h4>
                    <p style={{color:'red'}}>Human Resource</p>
                  </div>
                </div>
              </div>
            </Col>
            <Col className='pd' span={8}>
              <div className='home__feedback__inner__item'>
                <MessageOutlined className='home__feedback__inner__item__icon' />
                <p>The interface is user-friendly, and I could quickly connect with clients. It’s a great tool for managing my work.</p>
                <div className='home__feedback__inner__item__author'>
                  <img src={avt3}></img>
                  <div className='home__feedback__inner__item__author__right'>
                    <h4>James Maddie</h4>
                    <p style={{color:'red'}}>Freelancer</p>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  )
}

export default Home;
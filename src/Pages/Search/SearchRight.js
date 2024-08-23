import { Col, Button } from "antd";
import {DollarOutlined, FormOutlined, EnvironmentOutlined } from '@ant-design/icons';
function SearchRight(props){
  const { company2, detail, city, tag, setOpen} = props;
  return (
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

export default SearchRight;
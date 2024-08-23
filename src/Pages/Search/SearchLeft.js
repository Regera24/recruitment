import { Col, Button } from "antd";
import { Link } from "react-router-dom";

function SearchLeft(props){
  const { job, company2, city, tag, setDetail, company} = props;
  return (
    <Col className='search__left' span={12}>
          <h1>Search Results : </h1>
            <div className='search__job'>
              <h2>Reference Job : </h2>
                  <ul className='search__job__list'>
                  {(job.length>0 && company && company2) ? 
                    (
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
                    )
                    : <h3 style={{paddingLeft:'50px'}}>No Results</h3> }
                  </ul>
                
            </div>
            <div className='search__com'>
              <h2>Reference Company : </h2>
              {
                (job && company && company2.length>0) && (
                  <ul style={{listStyle:'circle'}} className='search__job__list'>
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
                      ) : <h3 style={{paddingLeft:'50px', marginLeft:'0px'}}>No Results</h3>
                    }
                  </ul>
                )
              }
            </div>
          </Col>
  )
}

export default SearchLeft;
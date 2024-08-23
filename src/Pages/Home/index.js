import './style.scss'
import { useState, useEffect} from 'react';
import { fetchData } from '../../Utils/Fetch';
import { Link } from 'react-router-dom';
import Intro from './Intro';
import Read from './Read';
import Process from './Process';
import Filter from './Filter';
import Hint from './Hint';
import Feedback from './Feedback';

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
        <Intro/>
        <Read/>
        <Process/>

        {
          (options.length > 0 && job.length > 0 && company.length > 0 && datasource.length > 0) && (
            <Filter options={options} loptions={loptions} handleChange1={handleChange1} handleChange2={handleChange2} handleFilter={handleFilter} datasource={datasource}/>
          )
        }

        {
          (data.length > 0 && company.length > 0 && location.length > 0 ? <>
            <Hint company={company} data={data} location={location}/>
          </> : <div></div>) 
        }

        <Feedback/>
      
      </div>
    </div>
  )
}

export default Home;
import './style.scss'
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { fetchData, addData } from '../../Utils/Fetch';
import {Row, Spin, notification } from 'antd'
import SearchLeft from './SearchLeft';
import SearchRight from './SearchRight';
import ApplyForm from './ApplyForm';
import Loading from './Loading';
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
      const res = await fetchData(`https://recruit-j7xv.onrender.com/jobs?q=${keyword}`)
      setJob(res);
      setDetail(res[0]);
      const res2 = await fetchData(`https://recruit-j7xv.onrender.com/company?q=${keyword}`)
      setCompany(res2);
      const res3 = await fetchData(`https://recruit-j7xv.onrender.com/company`)
      setCompany2(res3);
      const res4 = await fetchData(`https://recruit-j7xv.onrender.com/city`)
      setCity(res4);
      const res5 = await fetchData(`https://recruit-j7xv.onrender.com/tags`)
      setTag(res5);
      const res6 = await fetchData(`https://recruit-j7xv.onrender.com/cv`)
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
    const res = await addData('https://recruit-j7xv.onrender.com/cv',newCV);
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
      {
        ( tag.length>0 && city.length>0) ? (
          <>
        <Row className='search__outer'>
          <SearchLeft company={company} company2={company2} city={city} tag={tag} job={job} setDetail={setDetail} />

          {
            (detail && company2.length>0 && tag.length>0) && (
              <SearchRight detail={detail} city={city} tag={tag} company2={company2} setOpen={setOpen} />
            )
          }
        </Row>
        {
          open && lastcv && (
            <ApplyForm handleFinish={handleFinish} onCancel={onCancel} />
          )
        }
        {
          isLoading && 
            <>
              <Spin className='spin' size="large" />
            </>
        }
          </>
        ) : <Loading/> }
    </div>
  )
}

export default Search;
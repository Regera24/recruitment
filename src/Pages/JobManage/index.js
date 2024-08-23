import { Badge, Avatar, Switch, Button, notification} from 'antd';
import {useState, useEffect} from 'react';
import { fetchData, updateData, addData } from '../../Utils/Fetch';
import './style.scss'
import { useNavigate} from 'react-router-dom';
import JMTable from './JMTable';
import Edit from './Edit';
import Create from './Create';
import CV from './CV';
import Loading from './Loading';
import CVTable from './CVTable';
function JobManage(){
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const [tagdata,setTagData] = useState([]);
  const [job,setJob] = useState([]);
  const token = localStorage.getItem('token');
  const [citydata, setCity] = useState([]);
  const [j,setJ] = useState([]);
  const [modal, setModal] = useState(false);
  const [options, setOptions] = useState([]);
  const [loptions,setLoptions] = useState([]);
  const [edit, setEdit] = useState({});
  const [loading, setLoading] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const [modal2, setModal2] = useState(false);
  const [lastID,setLastID] = useState(999);
  const [cv, setCV] = useState([]);
  const [cvsource, setCVSource] = useState([]);
  const [detail, setDatail] = useState(false);
  const [cvd, setCVD] = useState();
  const [update,setUpdate] = useState(true);


  const success = () => {
    api['success']({
      message: 'Save changes successfully!',
      description:
        'Your data has been changed.',
      duration: 2,
    });
  };

  const success2 = () => {
    api['success']({
      message: 'Create job successfully!',
      description:
        'New job has been added into data.',
      duration: 2,
    });
  };

  const warn = () => {
    api['warning']({
      message: 'Nothing change!',
      description:
        'Nothing change, please check it again!.',
      duration: 2,
    });
  };

  useEffect(()=>{
    window.scrollTo(0, 0);
  },[])

  useEffect(()=>{
    const getUser = async ()=>{
      if(token){
        const response = await fetchData(`https://recruit-j7xv.onrender.com/company?token=${token}`);
        setUser(response[0]);
        const response2 = await fetchData(`https://recruit-j7xv.onrender.com/jobs?idCompany=${response[0].id}`);
        setJ(response2);
        const response3 = await fetchData(`https://recruit-j7xv.onrender.com/cv?idCompany=${response[0].id}`);
        setCV(response3);
        setCVSource(response3.map((item,index)=>{
          return {
            key: index,
            cname: item.name,
            ajob: item.idJob,
            aAt: item.createAt, 
            status: item.statusRead,
            city: item.city
          }
        }))
        setJob(response2.map((item,index)=>{
          return {
            key:index,
            name: item.name,
            salary: item.salary,
            city: item.city,
            status: item.status,
            tags: item.tags,
            updateAt: item.updateAt,
            createAt: item.createAt,
            edit: 'Edit'
          }
        }));
      }
    }
    const getTag = async ()=>{
      if(token){
        const response = await fetchData(`https://recruit-j7xv.onrender.com/tags`);
        setOptions(response.map((item)=>{
          return {
            label: item.name,
            value: item.id
          }
        }))
        setTagData(response);
      }
    }
    const getCity = async ()=>{
      if(token){
        const response = await fetchData(`https://recruit-j7xv.onrender.com/city`);
        setCity(response);
        setLoptions(response.map((item)=>{
          return {
            label: item.name,
            value: item.id
          }
        }))
      }
    }
    const getLastID = async ()=>{
      const response = await fetchData(`https://recruit-j7xv.onrender.com/jobs`);
      setLastID(response[response.length-1].id);
    }

    getLastID();
    getCity();
    getTag();
    getUser();
  },[loading,update,modal,modal2,detail])

  const handleUser = () => {
    navigate('/user');
  }

  const handleSwitch = (checked,index) =>{
    const oldData = j[index.key];
    const id = oldData.id;
    updateData('https://recruit-j7xv.onrender.com/jobs',id,{...oldData,status:checked});
    setUpdate(!update)
  }

  const handleSwitch2 = (checked,index) =>{
    const oldData = cv[index.key];
    const id = oldData.id;
    updateData('https://recruit-j7xv.onrender.com/cv',id,{...oldData,statusRead:checked});
    setUpdate(!update)
  }

  const handleEdit = (index,value)=>{
    const oldData = j[value.key];
    let fromMon = "";
    let i = 1;
    while(oldData.salary[i]!=' '){
      fromMon += oldData.salary[i];
      i++;
    }
    i+=4;
    const toMon = oldData.salary.substring(i,oldData.salary.length);
    setEdit({
      ...oldData,
      fromMon: parseInt(fromMon),
      toMon:parseInt(toMon)
    }); 
    setModal(!modal);
  }

  const handleClose = ()=>{
    setModal(!modal);
  }

  const handleFinish = (values)=>{
    let check = true;
    for (const key in values) {
      if (values[key] != undefined) {
        check = false;
      }
    }
    if(check==false){
      const today = new Date();
      const now = new Date();
      const day = today.getDate(); 
      const month = today.getMonth() + 1; 
      const year = today.getFullYear();
      const currentHours = now.getHours();
      const currentMinutes = now.getMinutes();
      const seconds = now.getSeconds();
      const time = day + '-' + month + '-' + year +" " + currentHours + ":" + currentMinutes + ":" + seconds; 
      const newData = {
        id: edit.id,
        idCompany: edit.idCompany,
        name: values.name || edit.name,
        salary: '$'+(values.fromMon || edit.fromMon)+' - '+ '$'+(values.toMon || edit.toMon),
        city: values.city || edit.city,
        status: values.status || edit.status,
        tags: values.tags || edit.tags,
        createAt: edit.createAt,
        description: values.description || edit.description,
        updateAt: time
      }
        updateData('https://recruit-j7xv.onrender.com/jobs',newData.id,newData);
        setLoading(true);
        setTimeout(() => {
        setLoading(false);
        setModal(!modal);
        success();
      }, 2000);
    }
    else{
        setLoading(true);
        setTimeout(() => {
        setLoading(false);
        warn();
      }, 2000);
    }
  }
  

  const handleCreate = ()=>{
    setModal2(true);
  }

  const handleClose2 = ()=>{
    setModal2(false);
  }

  const handleDetail = (index,value)=>{
    setCVD(cv[value.key]);
    const oldData = cv[value.key];
    const id = oldData.id;
    updateData('https://recruit-j7xv.onrender.com/cv',id,{...oldData,statusRead:true});
    setUpdate(!update);
    setDatail(true);
  }

  const handleClose3 = ()=>{
    setDatail(false);
  }

  const handleFinish2 = (values)=>{
      const today = new Date();
      const now = new Date();
      const day = today.getDate(); 
      const month = today.getMonth() + 1; 
      const year = today.getFullYear();
      const currentHours = now.getHours();
      const currentMinutes = now.getMinutes();
      const seconds = now.getSeconds();
      const time = day + '-' + month + '-' + year +" " + currentHours + ":" + currentMinutes + ":" + seconds; 
      const newData = {
        id: lastID+1,
        idCompany: user.id,
        name: values.name,
        salary: '$'+(values.fromMon)+' - '+ '$'+(values.toMon),
        city: values.city,
        status: true,
        tags: values.tags,
        createAt: time,
        description: values.description,
        updateAt: time
      }
        addData('https://recruit-j7xv.onrender.com/jobs',newData);
        setLoading(true);
        setTimeout(() => {
        setLoading(false);
        setModal2(!modal2);
        success2();
      }, 2000);
  }

  const columns2 = [
    {
      title:'Candidate Name',
      dataIndex: 'cname',
      key: 'cname',
      align:'center'
    },
    {
      title: 'Applied Job',
      dataIndex: 'ajob',
      key: 'ajob',
      align:'center',
      render:(ajob)=> j.filter((item,index)=> item.id === ajob)[0].name
    },
    {
      title:'City',
      dataIndex: 'city',
      key: 'city',
      align:'center',
    },
    {
      title:'Applied At',
      dataIndex: 'aAt',
      key: 'aAt',
      align:'center',
    },
    {
      title:'Status',
      dataIndex:'status',
      align:'center',
      key:'status',
      render: (status,index) => <Switch onChange={(checked)=>handleSwitch2(checked,index)} checkedChildren="Read" unCheckedChildren="Unread" defaultChecked={status} />
    },
    {
      title:'View Details',
      dataIndex:'details',
      align:'center',
      key: 'details',
      render: (index,value)=> <Button onClick={()=>handleDetail(index,value)}>Details</Button>
    }
  ]

  return (
      <div className='jobmanage'>
        {(user && job && tagdata && citydata && cvsource && cv && j && columns2 ? 
        <>
        {contextHolder}
       <div onClick={handleUser} className='jobmanage__user'>
          <Badge className='jobmanage__user__avt' color='green' dot size='default'> <Avatar className='jobmanage__user__avt__bg' size={50} src={user.img}></Avatar> </Badge>
          <h2 className='jobmanage__user__name'>{user.companyName}</h2>
        </div>

        <JMTable job={job} handleCreate={handleCreate} handleEdit={handleEdit} handleSwitch={handleSwitch} tagdata={tagdata} citydata={citydata} />

        {
          (modal && edit) && (
           <Edit edit={edit} handleClose={handleClose} handleFinish={handleFinish}  options={options} loptions={loptions}/>
          )
        }
        {
          (modal2 && lastID!=999) && (
            <Create modal2={modal2} options={options} loptions={loptions} handleClose2={handleClose2} handleFinish2={handleFinish2}/>
          )
        }

        <CVTable columns2={columns2} cvsource={cvsource} cv={cv} j={j}/>

        {
          detail && (
            <CV cvd={cvd} handleClose3={handleClose3} j={j}/>
          )
        }

        {
          loading && (
           <Loading/>
          )
        }
        </>
        : <Loading/> )}
    </div>
  )
}

export default JobManage;
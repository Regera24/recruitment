import { Badge, Avatar, Table, Tag, Switch, Button, Form, Input, Select, InputNumber, Row, Col, Spin, notification} from 'antd';
import {useState, useEffect} from 'react';
import { fetchData, updateData, addData } from '../../Utils/Fetch';
import './style.scss'
import { useNavigate} from 'react-router-dom';
import {
  DollarOutlined,
  CloseOutlined
} from '@ant-design/icons';
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
    const getUser = async ()=>{
      if(token){
        const response = await fetchData(`http://localhost:3002/company?token=${token}`);
        setUser(response[0]);
        const response2 = await fetchData(`http://localhost:3002/jobs?idCompany=${response[0].id}`);
        setJ(response2);
        const response3 = await fetchData(`http://localhost:3002/cv?idCompany=${response[0].id}`);
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
        const response = await fetchData(`http://localhost:3002/tags`);
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
        const response = await fetchData(`http://localhost:3002/city`);
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
      const response = await fetchData(`http://localhost:3002/jobs`);
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
    updateData('http://localhost:3002/jobs',id,{...oldData,status:checked});
    setUpdate(!update)
  }

  const handleSwitch2 = (checked,index) =>{
    const oldData = cv[index.key];
    const id = oldData.id;
    updateData('http://localhost:3002/cv',id,{...oldData,statusRead:checked});
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
        updateData('http://localhost:3002/jobs',newData.id,newData);
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
  
  const columns = [
    {
      title:'Job Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title:'Offer',
      dataIndex: 'salary',
      key: 'salary',
    },
    {
      title:'Tags',
      dataIndex: 'tags',
      key: 'tags',
      render: tags => tags.map((item,index)=>{
        return <Tag key={index} color='success'>{tagdata[item-1].name}</Tag>
      })
    },
    {
      title:'Location',
      dataIndex: 'city',
      key: 'city',
      render: city => city.map((item,index)=>{
        return <Tag key={index} color='success'>{citydata[item-1].name}</Tag>
      })
    },
    {
      title:'Create At',
      dataIndex: 'createAt',
      key: 'createAt',
    },
    {
      title:'Last Update',
      dataIndex: 'updateAt',
      key: 'updateAt',
    },
    {
      title: 'Status',
      dataIndex:'status',
      key:'status',
      render: (status,index) => <Switch onChange={(checked)=>handleSwitch(checked,index)} checkedChildren="End" unCheckedChildren="Start" defaultChecked={status} />
    },
    {
      title: 'Edit',
      dataIndex:'edit',
      key: 'edit',
      render: (index,value)=> <Button onClick={()=>handleEdit(index,value)}>Edit</Button>
    }
  ];

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
    updateData('http://localhost:3002/cv',id,{...oldData,statusRead:true});
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
        addData('http://localhost:3002/jobs',newData);
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
    (user && job && tagdata && citydata ? 
      <div className='jobmanage'>
        {contextHolder}
       <div onClick={handleUser} className='jobmanage__user'>
          <Badge className='jobmanage__user__avt' color='green' dot size='default'> <Avatar className='jobmanage__user__avt__bg' size={50} src={user.img}></Avatar> </Badge>
          <h2 className='jobmanage__user__name'>{user.companyName}</h2>
        </div>
        <div className='jobmanage__table'>
          <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
            <h2 className='jobmanage__table__title'>Jobs List</h2>
            <Button onClick={handleCreate} className='jobmanage__table__create'>Create Job</Button>
          </div>
          <div className='jobmanage__table__tb'>
            <Table dataSource={job} columns={columns}></Table>
          </div>
        </div>

        {
          (modal && edit) && (
            <>
              <div className='jobmanage__edit'>
                <h2 className='jobmanage__edit__title'>Edit Job</h2>
                <Form 
                  onFinish={handleFinish}
                  labelCol={{
                    span: 3,
                  }}
                  wrapperCol={{
                    span: 21,
                  }}
                >
                  <Form.Item
                    label='Job Name'
                    name='name'
                  >
                    <Input defaultValue={edit.name}/>
                  </Form.Item>

                  <Form.Item
                    label='Salary From'
                    name='fromMon'
                  >
                    <InputNumber defaultValue={edit.fromMon} addonAfter={<DollarOutlined />}/> 
                  </Form.Item>

                  <Form.Item
                    label='Salary To'
                    name='toMon'
                  >
                    <InputNumber defaultValue={edit.toMon} addonAfter={<DollarOutlined />}/> 
                  </Form.Item>

                  <Form.Item
                    label='Tags'
                    name='tags'
                  >
                    <Select
                      mode="multiple"
                      placeholder="Please select job tags"
                      options={options}
                      allowClear
                      defaultValue={edit.tags}
                    />
                  </Form.Item>

                  <Form.Item
                    label='City'
                    name='city'
                  >
                    <Select
                      mode="multiple"
                      placeholder="Please select locations"
                      options={loptions}
                      defaultValue={edit.city}
                      allowClear
                    />
                  </Form.Item>
                  
                  <Form.Item
                    label='Description'
                    name='description'
                  >
                    <Input.TextArea defaultValue={edit.description} style={{height:'120px'}} />
                  </Form.Item>
                  
                  <Row className='jobmanage__edit__inline'>
                    <Col>
                      <Form.Item>
                        <Button onClick={handleClose} className='jobmanage__edit__inline__button'>Cancel</Button>
                      </Form.Item>
                    </Col>
                    <Col>
                      <Form.Item>
                        <Button htmlType='submit' className='jobmanage__edit__inline__button'>Save Changes</Button>
                      </Form.Item>
                    </Col>
                  </Row>
                </Form>
                <div onClick={handleClose} className='jobmanage__edit__close'>
                  <CloseOutlined />
                </div>
            </div>
        <div className='overlay'></div>
            </>
          )
        }
        {
          (modal2 && lastID!=999) && (
            <>
              <div className='jobmanage__edit'>
                <h2 className='jobmanage__edit__title'>Create Job</h2>
                <Form 
                  onFinish={handleFinish2}
                  labelCol={{
                    span: 4,
                  }}
                  wrapperCol={{
                    span: 20,
                  }}
                >
                  <Form.Item
                    label='Job Name'
                    name='name'
                    rules={[{ required: true, message: 'Please input job name!' }]}
                  >
                    <Input/>
                  </Form.Item>

                  <Form.Item
                    label='Salary From'
                    name='fromMon'
                    rules={[{ required: true, message: 'Please input salary' }]}
                  >
                    <InputNumber addonAfter={<DollarOutlined />}/> 
                  </Form.Item>

                  <Form.Item
                    label='Salary To'
                    name='toMon'
                    rules={[{ required: true, message: 'Please input salary' }]}
                  >
                    <InputNumber addonAfter={<DollarOutlined />}/> 
                  </Form.Item>

                  <Form.Item
                    label='Tags'
                    name='tags'
                    rules={[{ required: true, message: 'Please select tags' }]}
                  >
                    <Select
                      mode="multiple"
                      placeholder="Please select job tags"
                      options={options}
                      allowClear
                    />
                  </Form.Item>

                  <Form.Item
                    label='Location'
                    name='city'
                    rules={[{ required: true, message: 'Please select location' }]}
                  >
                    <Select
                      mode="multiple"
                      placeholder="Please select locations"
                      options={loptions}
                      allowClear
                    />
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
                        <Button onClick={handleClose2} className='jobmanage__edit__inline__button'>Cancel</Button>
                      </Form.Item>
                    </Col>
                    <Col>
                      <Form.Item>
                        <Button htmlType='submit' className='jobmanage__edit__inline__button'>Create</Button>
                      </Form.Item>
                    </Col>
                  </Row>
                </Form>
                <div onClick={handleClose2} className='jobmanage__edit__close'>
                  <CloseOutlined />
                </div>
            </div>
          <div className='overlay'></div>
        </>
          )
        }

        <div className='cvmanage'>
          <h2 className='cvmanage__title'>CV List</h2>
          <div className='cvmanage__table'>
            {
              (cvsource && cv && j) && <Table columns={columns2} dataSource={cvsource}></Table>
            }
          </div>
        </div>

        {
          detail && (
            <>
              <div className='overlay'></div>
              <div className='detail'>
                <h2>Job details</h2>
                <Form 
                  labelCol={{
                    span: 5,
                  }}
                  wrapperCol={{
                    span: 19,
                  }}
                >
                  <Form.Item
                    label='Candidate Name'
                    name='name'
                  >
                    <Input defaultValue={cvd.name}/>
                  </Form.Item>

                  <Form.Item
                    label='Job Name'
                    name='idJob'
                  >
                    <Input defaultValue={(j.filter((item)=>item.id===cvd.idJob))[0].name}/>
                  </Form.Item>

                  <Form.Item
                    label='Phone'
                    name='phone'
                  >
                    <Input defaultValue={cvd.phone}/>
                  </Form.Item>

                  <Form.Item
                    label='Email'
                    name='email'
                  >
                    <Input defaultValue={cvd.email}/>
                  </Form.Item>

                  <Form.Item
                    label='Location'
                    name='city'
                  >
                    <Input defaultValue={cvd.city}/>
                  </Form.Item>

                  <Form.Item
                    label='Link Project'
                    name='linkProject'
                  >
                    <Input defaultValue={cvd.linkProject}/>
                  </Form.Item>

                  <Form.Item
                    label='Applied At'
                    name='createAt'
                  >
                    <Input defaultValue={cvd.createAt}/>
                  </Form.Item>

                  <Form.Item
                    label='Description'
                    name='description'
                  >
                    <Input.TextArea defaultValue={cvd.description} style={{height:'120px'}} />
                  </Form.Item>
                  
                  <Row className=''>
                    <Col span={24} style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
                      <Form.Item>
                        <Button onClick={handleClose3} className='detail__button'>Close</Button>
                      </Form.Item>
                    </Col>
                  </Row>
                </Form>
                <div onClick={handleClose3} className='detail__close'>
                  <CloseOutlined />
                </div>
              </div>
            </>
          )
        }

        {
          loading && (
            <>
              <div className='overlay'></div>
              <div className='spin'> <Spin size="large" /></div>
            </>
          )
        }
    </div>
    : 
    <div></div>
    )
  )
}

export default JobManage;
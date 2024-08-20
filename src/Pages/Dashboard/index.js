import './style.scss'
import { useState, useEffect } from 'react';
import { fetchData } from '../../Utils/Fetch';
import {Avatar, Badge, Row, Col, Table, Tag } from 'antd';
import {Pie, Area, Tiny, Liquid, Line, Bar} from '@ant-design/plots'
import { useNavigate } from 'react-router-dom';
import {
  CheckCircleOutlined,
  SyncOutlined,
} from '@ant-design/icons';
function Dashboard(){
  const [user, setUser] = useState();
  const [number,setNumber] = useState({});
  const token = localStorage.getItem('token');
  const [datasource,setDatasource] = useState([]);
  const [job, setJob] = useState([]);
  const [cvr, setCVR] = useState([]);
  const [total, setTotal] = useState([]);
  const [da, setDa] = useState([]);
  const navigate = useNavigate();
  const handleUser = () => {
    navigate('/user');
  }

  useEffect(()=>{
    window.scrollTo(0, 0);
    const getUser = async ()=>{
      if(token){
        const response = await fetchData(`https://recruit-j7xv.onrender.com/company?token=${token}`);
        setUser(response[0]);
        const response1 = await fetchData(`https://recruit-j7xv.onrender.com/jobs?idCompany=${response[0].id}`)
        setNumber({
          data: [
            {
              type: 'Number of Employees',
              value: response[0].quantityPeople
            },
            {
              type: 'Number of Jobs',
              value: response1.length
            }
          ],
          colorField: 'type',
          angleField:'value',
          label: {
            text: 'value',
            position: 'outside',
          },
          autoFit: false,
          height: 300,
          legend: {
            color: {
              title: false,
              position: 'right',
              rowPadding: 5,
            },
          },
        }
        );

        const response3 = await fetchData(`https://recruit-j7xv.onrender.com/jobs?idCompany=${response[0].id}`);
        setJob([response3]);
        const response4 = await fetchData(`https://recruit-j7xv.onrender.com/cv?idCompany=${response[0].id}`);
        setDa(response3.map((job,index)=>{
          let count = 0;
          for(let i =0 ; i < response4.length; i++){
            if(response4[i].idJob === job.id){
              ++count;
            }
          }
          return {
            id: job.id,
            name: job.name,
            num: count
          }
        }))
        setTotal(response4.length);
        let count = 0;
        for(let i =0 ; i < response4.length; i++){
          if(response4[i].statusRead){
            ++count;
          }
        }
        setCVR(count);
        setDatasource(response3.map((item,index)=>{
          return {
            key: index,
            jobName: item.name,
            createAt: item.createAt,
            lastUpdate: item.updateAt,
            status: item.status
          }
        }))
      }
    }
    getUser();
  },[])

  const data2 = [
    {
      year: '2017',
      value: 10,
      name: 'Front-End',
    },
    {
      year: '2017',
      value: 12,
      name: 'Back-End',
    },
    {
      year: '2017',
      value: 7,
      name: 'Unity',
    },
    {
      year: '2018',
      value: 3,
      name: 'Front-End',
    },
    {
      year: '2018',
      value: 2,
      name: 'Back-End',
    },
    {
      year: '2018',
      value: 1,
      name: 'Unity',
    },
    {
      year: '2019',
      value: 1,
      name: 'Front-End',
    },
    {
      year: '2019',
      value: 7,
      name: 'Back-End',
    },
    {
      year: '2019',
      value: 1,
      name: 'Unity',
    },
    {
      year: '2020',
      value: 3,
      name: 'Front-End',
    },
    {
      year: '2020',
      value: 4,
      name: 'Back-End',
    },
    {
      year: '2020',
      value: 3.5,
      name: 'Unity',
    },
    {
      year: '2021',
      value: 3,
      name: 'Front-End',
    },
    {
      year: '2021',
      value: 5,
      name: 'Back-End',
    },
    {
      year: '2021',
      value: 5,
      name: 'Unity',
    },
    {
      year: '2022',
      value: 2,
      name: 'Front-End',
    },
    {
      year: '2022',
      value: 2,
      name: 'Back-End',
    },
    {
      year: '2022',
      value: 6,
      name: 'Unity',
    },
    {
      year: '2023',
      value: 5,
      name: 'Front-End',
    },
    {
      year: '2023',
      value: 5,
      name: 'Back-End',
    },
    {
      year: '2023',
      value: 5,
      name: 'Unity',
    },
    {
      year: '2024',
      value: 6,
      name: 'Front-End',
    },
    {
      year: '2024',
      value: 7,
      name: 'Back-End',
    },
    {
      year: '2024',
      value: 8,
      name: 'Unity',
    },
  ];

  const config2 = {
    data: data2,
    xField: 'year',
    yField: 'value',
    seriesField: 'name',
    colorField:'name',
    stack: {
      orderBy: 'maxIndex',
      reverse: true,
    },
    autoFit: false,
    height: 300,
  }

  const config3 = {
    data: data2,
    xField: 'year',
    yField: 'value',
    seriesField: 'name',
    colorField:'name',
    autoFit: false,
    height: 300,
    normalize: true,
    stack: true,
    legend: false
  }

  const config4 = {
    percent: 0.64,
    outline: {
      border: 4,
      distance: 8,
    },
    shape: 'diamond',
    wave: {
      length: 128,
    },
    pattern: {
      type: 'line'
    },
  };

  const columns = [
    {
      title:'Job Name',
      dataIndex: 'jobName',
      key: 'jobName',
      align:'center'
    },
    {
      title:'Create At',
      dataIndex: 'createAt',
      key: 'createAt',
      align:'center'
    },
    {
      title:'Last Update',
      dataIndex: 'lastUpdate',
      key: 'lastUpdate',
      align:'center'
    },
    {
      title: 'Status',
      dataIndex:'status',
      key:'status',
      align:'center',
      render: (status) => status ? <Tag icon={<SyncOutlined spin />}  color='processing'>Processing</Tag> : <Tag icon={<CheckCircleOutlined />} color='success'>Completed</Tag>
    }
  ];

  const [data, setData] = useState([]);

  useEffect(() => {
    asyncFetch();
  }, []);

  useEffect(() => {
    asyncFetch();
  }, []);

  const asyncFetch = () => {
    fetch('https://gw.alipayobjects.com/os/bmw-prod/1d565782-dde4-4bb6-8946-ea6a38ccf184.json')
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => {
        console.log('fetch data failed', error);
      });
  };
  const config = {
    data,
    padding: 'auto',
    xField: 'Date',
    yField: 'scales',
  }
  const config5 ={
    data: da,
    xField: 'name',
    yField: 'num',
    shapeField: 'hollow',
    colorField: 'name',
    legend: {
      color: { size: 72, autoWrap: true, maxRows: 3, cols: 6 },
    },
  }

  const config6 = {
    percent: cvr/total,
    outline: {
      border: 4,
      distance: 8,
    },
    wave: {
      length: 128,
    },
    shape: 'pin',
    style: {
      backgroundFill: 'pink',
    },
  };

  return (
    user ? 
      <div className='dashboard'>
        <div onClick={handleUser} className='dashboard__user'>
          <Badge className='dashboard__user__avt' color='green' dot size='default'> <Avatar className='dashboard__user__avt__bg' size={50} src={user.img}></Avatar> </Badge>
          <h2 className='dashboard__user__name'>{user.companyName}</h2>
        </div>

        <div className='dashboard__chart'>
          <Row gutter={[10, 10]}>
            <Col span={9}>
              <div className='dashboard__chart__c dashboard__chart__c__pie'>
                <h3>Employees/Jobs</h3>
                <div>
                  <Pie {...number}/>
                </div>
              </div>
            </Col>

            <Col span={6}>
              <div className='dashboard__chart__c dashboard__chart__c__liquid'>
              <h3>Candidate Percent</h3>
                <div>
                <Liquid {...config4} />
                </div>
              </div>
            </Col>
           
            <Col span={9}>
              <div className='dashboard__chart__c dashboard__chart__c__area'>
              <h3>Increasing/Decreasing Position</h3>
                <div>
                  <Area {...config2}/>
                </div>
              </div>
            </Col>

            <Col span={14}>
              <div className='dashboard__chart__c dashboard__chart__c__c2'>
              <h3>Applied CV</h3>
                <div>
                  <Bar {...config5}/>
                </div>
              </div>
            </Col>

            <Col span={10}>
              <div className='dashboard__chart__c dashboard__chart__c__c2'>
              <h3>Unread/Total</h3>
                <div>
                  <Liquid {...config6} />
                </div>
              </div>
            </Col>

            <Col span={12}>
              <div className='dashboard__chart__tb'>
                <h3>Job Processing</h3>
                <div>
                  <Table pagination={{ pageSize: 8 }} columns={columns} dataSource={datasource}></Table>
                </div>
              </div>
            </Col>
            <Col span={12}>
              <div className='dashboard__chart__tb'>
                <h3>Average Salary</h3>
                <div>
                  <Line {...config} />
                </div>
              </div>
            </Col>
          </Row>
        </div>

      </div> : 
    <div></div>
  )
}

export default Dashboard;
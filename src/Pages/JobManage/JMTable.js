import { Button, Table, Switch, Tag } from 'antd';

function JMTable(props){
  const { job, handleCreate, handleEdit, handleSwitch, tagdata, citydata } = props;

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

  return (
    <div className='jobmanage__table'>
      <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
        <h2 className='jobmanage__table__title'>Jobs List</h2>
        <Button onClick={handleCreate} className='jobmanage__table__create'>Create Job</Button>
      </div>
      <div className='jobmanage__table__tb'>
        <Table dataSource={job} columns={columns}></Table>
      </div>
    </div>
  )
}

export default JMTable;
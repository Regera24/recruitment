import { Table } from 'antd';
function CVTable(props){
  const { cvsource, cv, j, columns2 } = props;
  return (
    <div className='cvmanage'>
      <h2 className='cvmanage__title'>CV List</h2>
      <div className='cvmanage__table'>
        {
          (cvsource && cv && j) && <Table columns={columns2} dataSource={cvsource}></Table>
        }
      </div>
    </div>
  )
}

export default CVTable;
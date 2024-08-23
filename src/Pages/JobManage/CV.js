import { Col, Row, Form, Input, Button } from 'antd';
import { CloseOutlined} from '@ant-design/icons';

function CV(props){
  const { cvd, j, handleClose3 } = props;
  return (
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

export default CV;
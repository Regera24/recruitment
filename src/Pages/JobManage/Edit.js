import { Col , Row, Form, Input, Select, InputNumber, Button } from 'antd';
import { CloseOutlined, DollarOutlined } from '@ant-design/icons';
function Edit(props){
  const { handleFinish, edit, options, loptions, handleClose } = props;
  return (
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

export default Edit;
import { Col , Row, Form, Input, Select, InputNumber, Button, Modal } from 'antd';
import { CloseOutlined, DollarOutlined } from '@ant-design/icons';

function Create(props){
  const { handleClose2, handleFinish2, options, loptions} = props;
  return (
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

export default Create;
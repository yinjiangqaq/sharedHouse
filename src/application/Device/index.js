import React, { useState } from 'react';
import { MainContainer } from './style';
import moment, { months } from 'moment';
import {
  Form,
  Input,
  Button,
  Row,
  Col,
  Select,
  DatePicker,
  Popconfirm,
  Table,
  Space,
} from 'antd';
const { RangePicker } = DatePicker;
const { Option } = Select;
const onFinish = (values) => {
  console.log('Success:', values);
};

const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};
function Device() {
  //负责当前需要处理的订单，所以没有订单状态的选择下拉框
  let now = moment();
  //订单不通过的理由
  const [rejectReason, setRejectReason] = useState('');
  const handleCancel = (e) => {
    console.log(rejectReason);
    setRejectReason('');
  };
  const handleOk = (record) => {
    //拿到这行的数据,以及此时的rejectReason,发送给接口
    console.log('驳回', record, rejectReason);
  };
  const columns = [
    {
      title: '订单ID',
      dataIndex: 'caseId',
      key: 'caseId',
    },
    {
      title: '公共设施名称',
      dataIndex: 'device',
      key: 'device',
    },
    {
      title: '顾客名称',
      dataIndex: 'customer',
      key: 'customer',
    },
    {
      title: '订单时间',
      dataIndex: 'time',
      key: 'time',
    },

    {
      title: '订单操作',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <a>通过</a>
          <Popconfirm
            title={
              <div>
                <div>需要提供不通过的理由</div>
                <Input.TextArea
                  placeholder="请输入不通过的理由"
                  value={rejectReason}
                  onChange={(e) => {
                    //单独inputTextArea，需要采用value+onchange回调，来实现输入值的双向绑定和更新
                    setRejectReason(e.target.value);
                  }}
                  rows={3}
                ></Input.TextArea>
              </div>
            }
            onCancel={handleCancel}
            onConfirm={(e) => handleOk(record)}
            okText="确认"
            cancelText="取消"
          >
            <a href="#">驳回</a>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const data = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    },
  ];

  const [form] = Form.useForm();
  const dateFormat = 'YYYY/MM/DD'; //日期格式
  return (
    <MainContainer>
      <Form form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
        <Row gutter={24}>
          <Col span={6}>
            <Form.Item label="日期" name="time">
              <RangePicker
                defaultValue={[
                  moment(
                    `${now.year()}/${now.month()}/${now.date() - 1}`,
                    dateFormat
                  ),
                  moment(
                    `${now.year()}/${now.month()}/${now.date()}`,
                    dateFormat
                  ),
                ]}
                format={dateFormat}
              />
            </Form.Item>
          </Col>
          <Col span={5}>
            <Form.Item label="订单ID" name="caseId">
              <Input placeholder="请输入订单id"></Input>
            </Form.Item>
          </Col>
          <Col span={5}>
            <Form.Item label="公共设施名称" name="name">
              <Input placeholder="请输入公共设施名称"></Input>
            </Form.Item>
          </Col>

          <Col offset={1} span={3}>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
            </Form.Item>
          </Col>
          {/* <Col span={6} >
            <Form.Item label="邮箱" name="email">
              <Input placeholder="请输入用户邮箱"></Input>
            </Form.Item>
          </Col> */}
        </Row>
      </Form>
      <Table columns={columns} dataSource={data} />
    </MainContainer>
  );
}

export default React.memo(Device);

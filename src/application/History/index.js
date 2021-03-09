import React from 'react';
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
function History() {
  let now = moment();
  const columns = [
    {
      title: '订单ID',
      dataIndex: 'caseId',
      key: 'caseId',
    },
    {
      title: '订单名称',
      dataIndex: 'caseName',
      key: 'caseName',
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
          <a>详情</a>
          <a>扣除信用分</a>
        </Space>
      ),
    },
  ];

  const data = [
    //到时候数据需要做一层转换
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

  const STATE = [
    {
      label: '未完成',
      value: 0,
    },
    {
      label: '通过',
      value: 1,
    },
    {
      label: '驳回',
      value: 2,
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
          <Col span={6} offset={1}>
            <Form.Item label="订单ID" name="caseId">
              <Input placeholder="请输入订单id"></Input>
            </Form.Item>
          </Col>
          <Col span={6} offset={1}>
            <Form.Item label="状态" name="state">
              <Select placeholder="请选择订单的状态">
                {STATE.map((item, index) => {
                  return (
                    <Option key={index} value={item.value}>
                      {item.label}
                    </Option>
                  );
                })}
              </Select>
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

export default React.memo(History);

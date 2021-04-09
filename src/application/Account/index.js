import React from 'react';
import { MainContainer } from './style';
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
function Account() {
  const columns = [
    {
      title: '用户名',
      dataIndex: 'userName',
      key: 'userName',
    },
    {
      title: '用户ID',
      dataIndex: 'userId',
      key: 'userId',
    },
    {
      title: '用户邮箱',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: '用户权限',
      dataIndex: 'permission',
      key: 'permission',
    },

    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <a>Invite {record.name}</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];
  //拿取用户列表数据
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

  return (
    <MainContainer>
      <Form form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
        <Row gutter={24}>
          <Col span={6}>
            <Form.Item label="用户名称" name="userName">
              <Input placeholder="请输入用户名"></Input>
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="用户ID" name="userId">
              <Input placeholder="请输入用户id"></Input>
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="邮箱" name="email">
              <Input placeholder="请输入用户邮箱"></Input>
            </Form.Item>
          </Col>
          <Col offset={1} span={3}>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <Table columns={columns} dataSource={data} />
    </MainContainer>
  );
}

export default React.memo(Account);

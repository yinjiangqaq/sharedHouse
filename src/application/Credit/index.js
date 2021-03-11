import React from 'react';
import { MainContainer } from './style';
import moment, { months } from 'moment';
import { creditLess } from '../../common/constant';
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
function Credit() {
  //负责当前需要处理的订单，所以没有订单状态的选择下拉框
  let now = moment();
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
      title: '订单ID',
      dataIndex: 'caseId',
      key: 'caseId',
    },
    {
      title: '违规行为',
      dataIndex: 'creditLess',
      key: 'creditLess',
      render: (text, record) => {
        // return creditLess.filter((item) => item.value === record.creditLess)[0]
        //   .label;
        let temp = creditLess.filter(
          (item) => item.value === record.creditless
        );
        return temp.length > 0 ? temp[0].label : '';
      },
    },

    {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <a>通过</a>
          <a>驳回</a>
        </Space>
      ),
    },
  ];

  const data = [
    {
      key: '1',
      caseId: 1,

      userId: 1,
      creditless: 10,
      userName: '小林',
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
            <Form.Item label="用户ID" name="userId">
              <Input placeholder="请输入用户id"></Input>
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="订单ID" name="caseId">
              <Input placeholder="请输入订单id"></Input>
            </Form.Item>
          </Col>
          <Col span={7}>
            <Form.Item label="违规行为" name="creditLess">
              <Select placeholder="请选择违规行为">
                {
                  //违规的行为，所以不存在0
                  creditLess
                    .filter((item) => item.value !== 0)
                    .map((item, index) => {
                      return (
                        <Option key={index} value={item.value}>
                          {item.label}
                        </Option>
                      );
                    })
                }
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
        </Row>
      </Form>
      <Table columns={columns} dataSource={data} />
    </MainContainer>
  );
}

export default React.memo(Credit);

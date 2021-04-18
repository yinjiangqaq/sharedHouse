import React, { useState, useEffect } from 'react';
import { MainContainer } from './style';
import {
  Form,
  Input,
  Button,
  Row,
  Col,
  Table,
  Space,
  message,
  Spin,
} from 'antd';
import { getUserList } from '../../api/user/index';
import { role } from '../../common/constant';

function Account() {
  const [currentPage, setCurrentPage] = useState(1);
  const columns = [
    {
      title: '用户名',
      align: 'center',
      dataIndex: 'userName',
      key: 'userName',
    },
    {
      title: '用户ID',
      align: 'center',
      dataIndex: 'userId',
      key: 'userId',
    },
    {
      title: '用户邮箱',
      align: 'center',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: '用户角色',
      align: 'center',
      dataIndex: 'role',
      key: 'role',
      render: (text, record) => {
        {
          let temp = role.filter((item) => item.value === record.role);
          return temp.length > 0 ? temp[0].label : '暂无身份';
        }
      },
    },
    {
      title: '用户信用',
      align: 'center',
      dataIndex: 'credit',
      key: 'credit',
    },
  ];
  const data = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      role: 1,
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      role: 1,
      address: 'London No. 1 Lake Park',
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      role: 1,
      address: 'Sidney No. 1 Lake Park',
    },
  ];
  const [form] = Form.useForm();
  const [tableData, setTableData] = useState(data); //表格数据
  const [caseSum, setCaseSum] = useState(1); //订单总数
  const [tableSpinning, setTableSpinning] = useState(false);
  const onFinish = (values) => {
    if (!values.pageNum) {
      values.pageNum = 1;
      setCurrentPage(1);
    }
    console.log('Success:', values);
    setTableSpinning(true);
    getUserList(values)
      .then((res) => {
        console.log(res.data);
        setTableData(res.data.caseData);
        setCaseSum(res.data.sum);
        setTableSpinning(false);
      })
      .catch((err) => {
        message.error(err.message);
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  //拿取用户列表数据
  useEffect(() => {
    onFinish({
      pageNum: 1,
      userName: '',
      userId: undefined,
      email: '',
    });
  }, []);
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
      <Spin tip="加载中..." spinning={tableSpinning}>
        <Table
          columns={columns}
          dataSource={tableData}
          bordered
          pagination={{
            total: caseSum,
            current: currentPage,
            onChange: (pageNum, pageSize) => {
              console.log(pageNum);
              setCurrentPage(pageNum);
              //分页
              onFinish({ ...form.getFieldValue(), pageNum: pageNum });
            },
          }}
        />
      </Spin>
    </MainContainer>
  );
}

export default React.memo(Account);

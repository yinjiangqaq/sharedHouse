import React, { useState, useEffect } from 'react';
import { MainContainer } from './style';
import moment, { months } from 'moment';
import { creditLess } from '../../common/constant';
import { getUserCreditList } from '../../api/user/index';
import {
  Form,
  Input,
  Button,
  Row,
  Col,
  Select,
  message,
  Spin,
  Table,
  Space,
} from 'antd';

const { Option } = Select;

function Credit() {
  //负责当前需要处理的订单，所以没有订单状态的选择下拉框
  //展示图片
  const showPicture = (file) => {
    window.open(file, '_blank');
  };
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
      title: '订单ID',
      align: 'center',
      dataIndex: 'caseId',
      key: 'caseId',
    },
    {
      title: '违规行为',
      align: 'center',
      dataIndex: 'creditLess',
      key: 'creditLess',
      render: (text, record) => {
        // return creditLess.filter((item) => item.value === record.creditLess)[0]
        //   .label;
        let temp = creditLess.filter(
          (item) => item.value === record.creditLess
        );
        return temp.length > 0 ? temp[0].label : '';
      },
    },
    {
      title: '违规图片',
      align: 'center',
      dataIndex: 'file',
      key: 'file',
      render: (text, record) => {
        return (
          <Button onClick={() => showPicture(record.file)}>点击查看原图</Button>
        );
      },
    },
    // {
    //   title: '操作',
    //   key: 'action',
    //   render: (text, record) => (
    //     <Space size="middle">
    //       <a>通过</a>
    //       <a>驳回</a>
    //     </Space>
    //   ),
    // },
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
  const [currentPage, setCurrentPage] = useState(1);
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
    getUserCreditList(values)
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
      userId: undefined,
      caseId: undefined,
      creditLess: 20,
    });
  }, []);
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
              <Select placeholder="请选择违规行为" defaultValue={20}>
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

export default React.memo(Credit);

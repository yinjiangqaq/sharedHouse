import React, { useState, useEffect } from 'react';
import { MainContainer } from './style';
import moment, { months } from 'moment';
import { timestampToTime } from '../../common/util';
import {
  Form,
  Input,
  Button,
  Row,
  Col,
  Select,
  message,
  Spin,
  DatePicker,
  Popconfirm,
  Table,
  Space,
} from 'antd';
import { findRoomCase, roomCaseAction } from '../../api/roomConfig/index';
const { RangePicker } = DatePicker;
const { Option } = Select;

function Room() {
  //负责当前需要处理的订单，所以没有订单状态的选择下拉框
  //订单不通过的理由
  const [rejectReason, setRejectReason] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const handleCancel = (e) => {
    console.log(rejectReason);
    setRejectReason('');
  };

  const columns = [
    {
      title: '订单ID',
      align: 'center',
      dataIndex: 'caseId',
      key: 'caseId',
    },
    {
      title: '公寓名称',
      align: 'center',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '顾客名称',
      align: 'center',
      dataIndex: 'customer',
      key: 'customer',
    },
    {
      title: '订单时间',
      align: 'center',
      dataIndex: 'time',
      key: 'time',
      render: (text, record) => {
        return <Space size="middle">{timestampToTime(record.time)}</Space>;
      },
    },

    {
      title: '订单操作',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <a onClick={() => allowCase(record)}>通过</a>
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
      time: 1618243200,
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '2',
      name: 'Jim Green',
      time: 1618243200,
      age: 42,
      address: 'London No. 1 Lake Park',
    },
    {
      key: '3',
      name: 'Joe Black',
      time: 1618243200,
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    },
  ];

  const [form] = Form.useForm();
  const dateFormat = 'YYYY/MM/DD'; //日期格式
  const [tableData, setTableData] = useState(data); //表格数据
  const [caseSum, setCaseSum] = useState(1); //订单总数
  const [tableSpinning, setTableSpinning] = useState(false);
  const onFinish = (values) => {
    if (!values.pageNum) {
      values.pageNum = currentPage;
    }
    //将moment转换为s的时间戳,但是不能直接改到rangePicker选中的两个moment对象的引用
    //需要重新复制一个对象
    let inputValues = { ...values };
    if (!!!values.time) {
      inputValues.time = [0, 9999999999];
    } else {
      inputValues.time = [0, 9999999999];
      inputValues.time[0] = parseInt(+values.time[0] / 1000);
      inputValues.time[1] = parseInt(+values.time[1] / 1000);
    }
    console.log('Success:', inputValues);
    setTableSpinning(true);
    findRoomCase(inputValues)
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
  //初始化
  useEffect(() => {
    onFinish({
      time: undefined,
      caseId: undefined,
      name: '',
      pageNum: 1,
      state: 0, //只查未完成的订单
    });
  }, []);
  //确认驳回
  const handleOk = (record) => {
    //拿到这行的数据,以及此时的rejectReason,发送给接口
    let params = {
      caseId: record.caseId,
      state: 2,
      reason: rejectReason,
    };
    roomCaseAction(params)
      .then((res) => {
        if (res.status === 200) {
          message.info('驳回订单成功');
          onFinish({
            // time: undefined,
            // caseId: undefined,
            // name: '',
            // pageNum: 1,
            // state: 0, //只查未完成的订单
            ...form.getFieldValue(),
            pageNum: currentPage,
            state: 0, //只查未完成的订单
          });
        }
      })
      .catch((err) => {
        message.error('通过订单失败');
      });
  };
  //通过
  const allowCase = (record) => {
    let params = {
      caseId: record.caseId,
      state: 1,
      reason: '无',
    };
    roomCaseAction(params)
      .then((res) => {
        if (res.status === 200) {
          message.info('通过订单成功');
          onFinish({
            // time: undefined,
            // caseId: undefined,
            // name: '',
            // pageNum: 1,
            // state: 0, //只查未完成的订单
            ...form.getFieldValue(),
            pageNum: currentPage,
            state: 0, //只查未完成的订单
          });
        }
      })
      .catch((err) => {
        message.error('通过订单失败');
      });
  };
  return (
    <MainContainer>
      <Form form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
        <Row gutter={24}>
          <Col span={6}>
            <Form.Item label="日期" name="time">
              <RangePicker />
            </Form.Item>
          </Col>
          <Col span={5}>
            <Form.Item label="订单ID" name="caseId">
              <Input placeholder="请输入订单id"></Input>
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="公寓名称" name="name">
              <Input placeholder="请输入公寓名称"></Input>
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
              onFinish({ ...form.getFieldValue(), pageNum: pageNum, state: 0 });
            },
          }}
        />
      </Spin>
    </MainContainer>
  );
}

export default React.memo(Room);

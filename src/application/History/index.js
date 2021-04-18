import React, { useState, useEffect } from 'react';
import { MainContainer } from './style';
import moment, { months } from 'moment';
import CaseForm from '../../components/caseForm';
import { timestampToTime, timestampToMoment } from '../../common/util';
import { STATE, modalState } from '../../common/constant';
import { findCase, deduceCredit } from '../../api/history/index';
import {
  Form,
  Input,
  Button,
  Modal,
  Row,
  message,
  Spin,
  Col,
  Select,
  DatePicker,
  Table,
  Space,
} from 'antd';
const { RangePicker } = DatePicker;
const { Option } = Select;

function History() {
  const [caseFormData, setCaseFormData] = useState(null); //每一条订单数据
  const [isCaseModalVisible, setIsCaseModalVisible] = useState(
    modalState.INITIAL
  );
  const [currentPage, setCurrentPage] = useState(1);

  const showDetailModal = (record) => {
    setCaseFormData(record);
    setIsCaseModalVisible(modalState.DETAIL);
  };
  // const showChangeModal = (record) => {
  //   setCaseFormData(record);
  //   setIsCaseModalVisible(modalState.CHANGE);
  // };
  //取消
  const handleCancel = () => {
    setIsCaseModalVisible(modalState.INITIAL);
  };
  const handleOk = () => {
    console.log(isCaseModalVisible); //判单当前的状态
    console.log('父组件的formData', caseFormData);
    deduceCredit(caseFormData)
      .then((res) => {
        if (res.status === 200) {
          message.info('扣除信用分成功');
        }
      })
      .catch((err) => {
        message.error('扣除信用分失败');
      });
    setIsCaseModalVisible(modalState.INITIAL);
  };

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
      render: (text, record) => {
        return <Space size="middle">{timestampToTime(record.time)}</Space>;
      },
    },
    {
      title: '订单状态',
      dataIndex: 'state',
      key: 'state',
      render: (text, record) => {
        return (
          <Space size="middle">
            {STATE.find((item) => item.value === record.state).label}
          </Space>
        );
      },
    },
    {
      title: '订单操作',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <a onClick={() => showDetailModal(record)}>详情</a>
        </Space>
      ),
    },
  ];

  const data = [
    //到时候数据需要做一层转换
    {
      key: '1',
      caseId: 1,
      caseName: '平安里',
      time: 1618243200,
      creditless: 10,
      state: 1,
      customer: '小林',
    },
    {
      key: '2',
      caseId: 2,
      caseName: '健身房',
      time: 1618243200,
      creditless: 20,
      state: 2,
      customer: '小李',
    },
  ];
  const [tableData, setTableData] = useState(data); //表格数据
  const [caseSum, setCaseSum] = useState(1); //订单总数
  const [tableSpinning, setTableSpinning] = useState(false);
  //查询操作
  const onFinish = (values) => {
    if (!values.pageNum) {
      values.pageNum = 1;
      setCurrentPage(1);
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
    findCase(inputValues)
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
      pageNum: 1,
      state: 1,
    });
  }, []);
  const [form] = Form.useForm();
  const dateFormat = 'YYYY/MM/DD'; //日期格式
  return (
    <MainContainer>
      <Form form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
        <Row gutter={24}>
          <Col span={6}>
            <Form.Item label="日期" name="time">
              <RangePicker
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
              <Select placeholder="请选择订单的状态" defaultValue={1}>
                {STATE.filter((item) => item.value !== 0).map((item, index) => {
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
      <Modal
        title="订单详情"
        visible={isCaseModalVisible > 0}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            取消
          </Button>,
          <Button type="primary" onClick={handleOk}>
            更改
          </Button>,
        ]}
      >
        <CaseForm
          formData={caseFormData}
          modalState={isCaseModalVisible}
          toParent={setCaseFormData}
        ></CaseForm>
      </Modal>
    </MainContainer>
  );
}

export default React.memo(History);

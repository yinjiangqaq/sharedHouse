import React, { useState } from 'react';
import { MainContainer } from './style';
import moment, { months } from 'moment';
import EquipmentForm from '../../components/equipmentForm';
import { setType, modalState } from '../../common/constant';
import {
  Form,
  Input,
  Button,
  Modal,
  Row,
  Col,
  Select,
  DatePicker,
  Table,
  Space,
} from 'antd';
import { changeConfirmLocale } from 'antd/lib/modal/locale';
const { RangePicker } = DatePicker;
const { Option } = Select;

function CommonEquipment() {
  //负责当前需要处理的订单，所以没有订单状态的选择下拉框
  let now = moment();
  const columns = [
    {
      title: '公共设施名称',
      dataIndex: 'device',
      key: 'device',
    },
    {
      title: '价格/RMB',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: '套餐形式',
      dataIndex: 'setType',
      key: 'setType',
      render: (text, record) => {
        return setType.filter((item) => item.value === record.setType)[0].label;
      },
    },
    {
      title: '联系人',
      dataIndex: 'owner',
      key: 'owner',
    },
    {
      title: '联系方式',
      dataIndex: 'contact',
      key: 'contact',
    },
    {
      title: '公共设施地址',
      dataIndex: 'address',
      key: 'address',
      ellipsis: true,
    },
    {
      title: '公共设施描述',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
    },
    {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <a onClick={() => showDetailModal(record)}>详情</a>
          <a onClick={() => showChangeModal(record)}>更改</a>
        </Space>
      ),
    },
  ];

  const data = [
    {
      device: '健身房',
      price: '20',
      setType: 1,
      owner: 'Jack',
      contact: '121212121',
      address: '平安里一楼西区',
      description:
        '健身房配置有更衣洗浴设施，有氧，固定功能力量区、自由力量区等等',
    },
    {
      device: '健身房',
      price: '2000',
      setType: 3,
      owner: 'Jack',
      contact: '121212121',
      address: '平安里一楼西区',
      description:
        '健身房配置有更衣洗浴设施，有氧，固定功能力量区、自由力量区等等',
    },
    {
      device: '健身房',
      price: '200',
      setType: 2,
      owner: 'Jack',
      contact: '12sadasdasd',
      address: '平安里一楼西区',
      description:
        '健身房配置有更衣洗浴设施，有氧，固定功能力量区、自由力量区等等',
    },
  ];

  const [form] = Form.useForm();
  const dateFormat = 'YYYY/MM/DD'; //日期格式
  //查询表单
  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  //对话框的显示 
  const [isModalVisible, setIsModalVisible] = useState(modalState.INITIAL);

  const [formData, setFormData] = useState(null);
  const showModal = () => {
    setFormData(null); //重新置为空
    setIsModalVisible(modalState.ADD);
  };
  //新增公寓配置
  const handleOk = () => {
    console.log(isModalVisible); //判单当前的状态
    console.log('父组件的formData', formData);
    setIsModalVisible(modalState.INITIAL);
  };
  //取消
  const handleCancel = () => {
    setIsModalVisible(modalState.INITIAL);
  };
  const showChangeModal = (record) => {
    //console.log(record);
    setFormData(record);
    // setIsChangeModalVisible(true);
    setIsModalVisible(modalState.CHANGE);
  };

  const showDetailModal = (record) => {
    setFormData(record);
    setIsModalVisible(modalState.DETAIL);
  };
  return (
    <MainContainer>
      <Form form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
        <Row gutter={24}>
          <Col span={6}>
            <Form.Item label="公共设施名称" name="device">
              <Input placeholder="公共设施名称"></Input>
            </Form.Item>
          </Col>
          <Col span={6} offset={1}>
            <Form.Item label="房东姓名" name="name">
              <Input placeholder="请输入房东姓名"></Input>
            </Form.Item>
          </Col>

          <Col offset={1} span={2}>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
            </Form.Item>
          </Col>
          {/* 新增公寓配置 */}
          <Col span={1}>
            <Form.Item>
              <Button type="default" onClick={showModal}>
                新增
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <Table columns={columns} dataSource={data} />
      <Modal
        title="公共设施配置"
        visible={isModalVisible > 0}
        // onOk={handleOk}
        onCancel={handleCancel}
        footer={
          isModalVisible === 3
            ? null
            : [
                <Button key="back" onClick={handleCancel}>
                  取消
                </Button>,
                <Button type="primary" onClick={handleOk}>
                  {isModalVisible === 1 ? '新增' : '更改'}
                </Button>,
              ]
        }
      >
        <EquipmentForm
          formData={formData}
          modalState={isModalVisible}
          toParent={setFormData}
          isCommon
        ></EquipmentForm>
      </Modal>
    </MainContainer>
  );
}

export default React.memo(CommonEquipment);

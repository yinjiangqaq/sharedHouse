import React, { useState } from 'react';
import { MainContainer } from './style';
import moment, { months } from 'moment';
import EquipmentForm from '../../components/equipmentForm';
import {  modalState } from '../../common/constant';
import {
  Form,
  Input,
  Button,
  Modal,
  Row,
  Col,
  Table,
  Space,
} from 'antd';


function Equipment() {
  //负责当前需要处理的订单，所以没有订单状态的选择下拉框
  let now = moment();
  const columns = [
    {
      title: '公寓名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '价格',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: '房东',
      dataIndex: 'owner',
      key: 'owner',
    },
    {
      title: '联系方式',
      dataIndex: 'contact',
      key: 'contact',
    },
    {
      title: '公寓地址',
      dataIndex: 'address',
      key: 'address',
      ellipsis: true,
    },
    {
      title: '公寓描述',
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
      name: '平安里',
      price: '123',
      owner: 'Jack',
      contact: '121212121',
      address: 'London No. 1 Lake Park',
      description:
        '一个主卧，两个副卧，有电视，空调，洗衣机，吹风机，还有厨房，浴室，还有阳台',
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
  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

 //对话框的显示 
 const [isModalVisible, setIsModalVisible] = useState(modalState.INITIAL);

 const [formData, setFormData] = useState(null);
 const showAddModal = () => {
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
            <Form.Item label="公寓名称" name="name">
              <Input placeholder="请输入公寓名称"></Input>
            </Form.Item>
          </Col>
          <Col span={6} offset={1}>
            <Form.Item label="房东姓名" name="owner">
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
              <Button type="default" onClick={showAddModal}>
                新增
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <Table columns={columns} dataSource={data} />
      <Modal
        title="公寓配置"
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
          isCommon={false}
        ></EquipmentForm>
      </Modal>
    </MainContainer>
  );
}

export default React.memo(Equipment);

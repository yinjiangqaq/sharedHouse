import React, { useState } from 'react';
import { MainContainer } from './style';
import moment, { months } from 'moment';
import EquipmentForm from '../../components/equipmentForm';
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
      title: 'Action',
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

  //对话框的显示  0 新增，1更改，2详情
  const [isModalVisible, setIsModalVisible] = useState(0);

  const [formData, setFormData] = useState(null);
  const showModal = () => {
    setFormData(null); //重新置为空
    setIsModalVisible(1);
  };
  //新增公寓配置
  const handleOk = () => {
    console.log(isModalVisible); //判单当前的状态

    setIsModalVisible(0);
  };
  //取消
  const handleCancel = () => {
    setIsModalVisible(0);
  };
  const showChangeModal = (record) => {
    //console.log(record);
    setFormData(record);
    // setIsChangeModalVisible(true);
    setIsModalVisible(2);
  };

  const showDetailModal = (record) => {
    setFormData(record);
    setIsModalVisible(3);
  };
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
            <Form.Item label="用户ID" name="userId">
              <Input placeholder="请输入用户名或者用户id"></Input>
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
        ></EquipmentForm>
      </Modal>
    </MainContainer>
  );
}

export default React.memo(Equipment);

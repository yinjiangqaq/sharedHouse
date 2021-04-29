import React, { useState, useEffect } from 'react';
import { MainContainer } from './style';
import moment, { months } from 'moment';
import EquipmentForm from '../../components/equipmentForm';
import { setType, modalState } from '../../common/constant';
import {
  addDevice,
  findDevice,
  changeDevice,
  deleteDevice,
} from '../../api/deviceConfig/index';
import {
  Form,
  Input,
  Button,
  Modal,
  Row,
  message,
  Popconfirm,
  Spin,
  Col,
  Table,
  Space,
} from 'antd';

function CommonEquipment() {
  //负责当前需要处理的订单，所以没有订单状态的选择下拉框
  let now = moment();
  const columns = [
    {
      title: '公共设施名称',
      dataIndex: 'device',
      key: 'device',
    },
    // {
    //   title: '价格/RMB',
    //   dataIndex: 'price',
    //   key: 'price',
    // },
    {
      title: '收费形式',
      dataIndex: 'setType',
      key: 'setType',
      render: (text, record) => {
        let temp = setType.filter((item) => item.value === record.setType)[0];
        return temp ? temp.label : '';
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
          <Popconfirm
            placement="topRight"
            title="确认要删除这项公共设施配置吗？"
            onConfirm={() => {
              //删除对应的项
              deleteRecord(record);
            }}
            okText="确认"
            cancelText="取消"
          >
            <a>删除</a>
          </Popconfirm>
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
  const [tableData, setTableData] = useState(data);

  const [tableSpinning, setTableSpinning] = useState(false);

  const deleteRecord = (record) => {
    deleteDevice({ address: record.address, setType: record.setType })
      .then((res) => {
        if (res.status === 200) {
          message.info('删除成功');
          onFinish(form.getFieldValue());
        }
      })
      .catch((err) => {
        message.error(err.message);
      });
  };
  const onFinish = (values) => {
    console.log('Success:', values);
    setTableSpinning(true);
    findDevice(values)
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data);
          res.data.map((item) =>
            item.PriceList.map((item1) => {
              item1.time[0] = moment(item1.time[0], 'HH'); //转化为moment
              item1.time[1] = moment(item1.time[1], 'HH');
            })
          );
          setTableData(res.data);
          setTableSpinning(false);
        }
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
    onFinish({ device: '', name: '' });
  }, []);
  //对话框的显示
  const [isModalVisible, setIsModalVisible] = useState(modalState.INITIAL);

  const [formData, setFormData] = useState(null);
  const showModal = () => {
    setFormData(null); //重新置为空
    setIsModalVisible(modalState.ADD);
  };
  //新增公寓配置
  const handleOk = () => {
    //console.log(isModalVisible); //判单当前的状态
    console.log('父组件的formData', formData);
    let tempFormData = { ...formData };
    //不要改到原来对象的引用
    if (formData && formData.PriceList && formData.PriceList.length > 0) {
      tempFormData.PriceList = formData.PriceList.map((item) => {
        return {
          time:
            item.time && item.time.length > 0
              ? [item.time[0].hour(), item.time[1].hour()]
              : [],
          price: item.price,
        };
      });
    }
    //新增
    if (isModalVisible === 1) {
      addDevice(tempFormData)
        .then((res) => {
          if (res.status === 200) {
            message.info('新增成功');
            //查找当前查询表单对应的数据
            onFinish(form.getFieldValue());
            setIsModalVisible(modalState.INITIAL); //只有更改成功和新增成功才会关闭对话框，优化用户体验
          }
        })
        .catch((err) => {
          message.error(err.message);
        });
    } else if (isModalVisible === 2) {
      //更改配置
      changeDevice(tempFormData)
        .then((res) => {
          if (res.status === 200) {
            message.info('更改成功');
            console.log(form);
            onFinish(form.getFieldValue());
            setIsModalVisible(modalState.INITIAL);
          }
        })
        .catch((err) => {
          message.error(err.message);
        });
    }
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
            <Form.Item label="联系人姓名" name="name">
              <Input placeholder="请输入联系人姓名"></Input>
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
      <Spin tip="加载中..." spinning={tableSpinning}>
        <Table columns={columns} dataSource={tableData} bordered />
      </Spin>
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

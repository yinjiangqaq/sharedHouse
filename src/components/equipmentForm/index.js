import React, { useState } from 'react';
import styled from 'styled-components';
import { Form, Input, Row, Col, Select } from 'antd';
import { setType } from '../../common/constant';
export const Container = styled.div`
  background: #fff;
`;
const { Option } = Select;

function EquipmentForm(props) {
  let { formData, modalState, toParent, isCommon } = props;
  //toparent拿到父组件的setFormData,从而可以子组件更新数据给父组件
  //console.log(formData);
  //console.log(isCommon);
  const [form] = Form.useForm();
  // console.log(form);
  if (formData !== null) {
    form.setFieldsValue(formData);
  } else {
    form.resetFields();
  }

  const formDataChange = (changedValues, allValues) => {
    // console.log(allValues);
    toParent(allValues);
  };
  return (
    <Form
      form={form}
      layout="vertical"
      hideRequiredMark
      onValuesChange={formDataChange}
      //   initialValues={formData}
    >
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name={isCommon ? 'device' : 'name'}
            label={isCommon ? '公共设施名称' : '公寓名称'}
            rules={
              isCommon
                ? [{ required: true, message: '请输入公共设施名称' }]
                : [{ required: true, message: '请输入公寓名称' }]
            }
          >
            <Input
              placeholder={isCommon ? '请输入公共设施名称' : '请输入公寓名称'}
              disabled={modalState === 3 || modalState === 2}
              //   defaultValue={formData.name}
            />
          </Form.Item>
        </Col>
        <Col span={isCommon ? 6 : 12}>
          <Form.Item
            name="price"
            label="价格明细"
            rules={[
              {
                pattern: /^\d+$/,
                message: '只能输入数字',
              },
              {
                required: true,
                message: '请输入价格',
              },
            ]}
          >
            <Input
              prefix="￥"
              suffix={isCommon ? '' : '/每晚'}
              placeholder={
                isCommon ? '请输入公共设施的价格' : '请输入公寓的价格'
              }
              disabled={modalState === 3}
            />
          </Form.Item>
        </Col>
        {isCommon ? (
          <Col span={6}>
            <Form.Item name="setType" label=" ">
              <Select disabled={modalState === 2 || modalState === 3}>
                {setType.map((item, index) => {
                  return <Option value={item.value}>{item.label}</Option>;
                })}
              </Select>
            </Form.Item>
          </Col>
        ) : (
          ''
        )}
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="owner"
            label={isCommon ? '联系人' : '房东'}
            rules={
              isCommon
                ? [{ required: true, message: '请输入联系人姓名' }]
                : [{ required: true, message: '请输入房东姓名' }]
            }
          >
            <Input
              style={{ width: '100%' }}
              placeholder={isCommon ? '请输入联系人姓名' : '请输入房东姓名'}
              disabled={modalState === 3}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="contact"
            label="联系方式"
            rules={[{ required: true, message: '请输入联系方式' }]}
          >
            <Input
              style={{ width: '100%' }}
              placeholder="请输入联系方式"
              disabled={modalState === 3}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Form.Item
            name="address"
            label="详细地址"
            rules={[{ required: true, message: '请输入详细地址' }]}
          >
            <Input
              style={{ width: '100%' }}
              placeholder="请输入详细地址"
              disabled={modalState === 3}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            name="description"
            label={isCommon ? '公共设施介绍' : '公寓介绍'}
            rules={
              isCommon
                ? [
                    {
                      required: true,
                      message: '请输入公共设施介绍',
                    },
                  ]
                : [
                    {
                      required: true,
                      message: '请输入公寓介绍',
                    },
                  ]
            }
          >
            <Input.TextArea
              rows={4}
              placeholder={isCommon ? '请输入公共设施介绍' : '请输入公寓介绍'}
              disabled={modalState === 3}
            />
          </Form.Item>
        </Col>
      </Row>
      {/* 公寓配置服务信息 */}
    </Form>
  );
}

export default React.memo(EquipmentForm);

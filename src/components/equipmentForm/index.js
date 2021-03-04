import React, { useState } from 'react';
import styled from 'styled-components';
import { Form, Input, Row, Col } from 'antd';
export const Container = styled.div`
  background: #fff;
`;

function EquipmentForm(props) {
  let { formData, modalState } = props;
  console.log(formData);
  const [form] = Form.useForm();
  console.log(form);
  if (formData !== null) {
    console.log(11111);
    form.setFieldsValue(formData);
  } else {
    form.resetFields();
  }
  return (
    <Form
      form={form}
      layout="vertical"
      hideRequiredMark
      //   initialValues={formData}
    >
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="name"
            label="公寓名称"
            rules={[{ required: true, message: '请输入公寓名称' }]}
          >
            <Input
              placeholder="请输入公寓名称"
              disabled={modalState === 3}
              //   defaultValue={formData.name}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="price"
            label="价格明细"
            rules={[
              {
                required: true,
                message: '请输入公寓的价格',
              },
            ]}
          >
            <Input
              prefix="￥"
              suffix="/每晚"
              placeholder="请输入公寓的价格"
              disabled={modalState === 3}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="owner"
            label="房东"
            rules={[{ required: true, message: '请输入房东姓名' }]}
          >
            <Input
              style={{ width: '100%' }}
              placeholder="请输入房东姓名"
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
              placeholder="请输入房东联系方式"
              disabled={modalState === 3}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Form.Item
            name="address"
            label="公寓详细地址"
            rules={[{ required: true, message: '请输入公寓的详细地址' }]}
          >
            <Input
              style={{ width: '100%' }}
              placeholder="请输入公寓的详细地址"
              disabled={modalState === 3}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            name="description"
            label="公寓介绍"
            rules={[
              {
                required: true,
                message: '请输入公寓的介绍',
              },
            ]}
          >
            <Input.TextArea
              rows={4}
              placeholder="请输入公寓的介绍"
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

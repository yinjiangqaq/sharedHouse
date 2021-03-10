import React, { useState } from 'react';
import styled from 'styled-components';
import { Form, Input, Row, Col } from 'antd';
export const Container = styled.div`
  background: #fff;
`;

function CaseForm(props) {
  let { formData } = props;

  const [form] = Form.useForm();
  if (formData !== null) {
    form.setFieldsValue(formData);
  } else {
    form.resetFields();
  }
  return (
    <Form
      form={form}
      layout="vertical"
      hideRequiredMark
      // onValuesChange={formDataChange}
      //   initialValues={formData}
    >
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name="caseId" label="订单ID">
            <Input disabled />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="caseName" label="订单名称">
            <Input disabled />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name="customer" label="顾客名称">
            <Input disabled />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="time" label="订单时间">
            <Input disabled />
          </Form.Item>
        </Col>
      </Row>
      {/* 公寓配置服务信息 */}
    </Form>
  );
}

export default React.memo(CaseForm);

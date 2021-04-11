import React, { useState } from 'react';
import styled from 'styled-components';
import { Form, Input, Row, Col, Select } from 'antd';
import { creditLess } from '../../common/constant';
import TextArea from 'antd/lib/input/TextArea';
const { Option } = Select;

export const Container = styled.div`
  background: #fff;
`;

function CaseForm(props) {
  let { formData, modalState, toParent } = props;

  const [form] = Form.useForm();
  if (formData !== null) {
    form.setFieldsValue(formData);
  } else {
    form.resetFields();
  }
  const formDataChange = (changedValues, allValues) => {
    console.log(allValues);
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
      <Row gutter={16}>
        {formData.state === 1 ? (
          <Col span={12}>
            <Form.Item name="creditless" label="信用分扣除">
              <Select placeholder="请选择该订单存在的违规行为">
                {creditLess.map((item, index) => {
                  return (
                    <Option key={index} value={item.value}>
                      {item.label}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
          </Col>
        ) : (
          <Col span={12}>
            <Form.Item name="rejectReason" label="驳回理由">
              <Input.TextArea disabled />
            </Form.Item>
          </Col>
        )}
      </Row>
      {/* 公寓配置服务信息 */}
    </Form>
  );
}

export default React.memo(CaseForm);

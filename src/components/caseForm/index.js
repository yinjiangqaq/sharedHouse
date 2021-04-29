import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Form, Input, Row, Col, Select, Upload, Button, message } from 'antd';
import { UploadOutlined, StarOutlined } from '@ant-design/icons';
import { creditLess } from '../../common/constant';
import { baseUrl } from '../../api/config';
import { getToken } from '../../common/util';
const { Option } = Select;
export const Container = styled.div`
  background: #fff;
`;

function CaseForm(props) {
  let { formData, modalState, toParent } = props;
  const caseState = formData.state;
  //图片的地址
  const [picUrl, setPicUrl] = useState(null);
  const [form] = Form.useForm();
  useEffect(() => {
    if (formData !== null) {
      if (formData.file && typeof formData.file === 'string') {
        //初始化
        setPicUrl(formData.file);
      } else if (
        formData.file &&
        typeof formData.file === 'object' &&
        formData.file.file.status === 'done'
      ) {
        setPicUrl(formData.file.file.response.data.file);
      }
    }
  });//不设置只执行一次，实现更新
  if (formData !== null) {
    form.setFieldsValue(formData);
  } else {
    form.resetFields();
  }

  const formDataChange = (changedValues, allValues) => {
    console.log(allValues);
    if (!allValues.state) {
      //防止丢了之前的订单状态而导致的前端页面显示的bug
      allValues.state = caseState;
    }
    toParent(allValues);
  };

  //上传图片之前的操作
  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('仅支持JPG/PNG文件');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('图片必须小于2MB!');
    }
    return isJpgOrPng && isLt2M;
  };
  //上传的onchange操作
  const onChange = ({ file, fileList }) => {
    if (file.status === 'done') {
      //form.setFieldsValue({ file: `${file.response.data.file}` });
      setPicUrl(file.response.data.file);
      message.success('图片上传成功');
    }
  };
  //展示图片
  const showPicture = () => {
    window.open(picUrl, '_blank');
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
            <Form.Item name="creditLess" label="信用分扣除">
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
            <Form.Item name="reason" label="驳回理由">
              <Input.TextArea disabled />
            </Form.Item>
          </Col>
        )}
        {formData.state === 1 ? (
          <Col span={5}>
            {/* 这里真正的企业开发的上传是需要带上token的，因为有token校验的中间件 */}
            <Form.Item name="file" label="上传违规图片">
              <Upload
                name="file"
                headers={{ Authorization: `${getToken()}` }}
                action={`${baseUrl}api/upload`}
                beforeUpload={beforeUpload}
                onChange={onChange}
                showUploadList={false}
              >
                <Button icon={<UploadOutlined />}>上传</Button>
              </Upload>
            </Form.Item>
          </Col>
        ) : (
          ''
        )}
        <Col span={7}>
          {formData.file ? (
            <Form.Item label=" ">
              <Button onClick={showPicture}>点击查看原图</Button>
            </Form.Item>
          ) : (
            ''
          )}
        </Col>
      </Row>
    </Form>
  );
}

export default React.memo(CaseForm);

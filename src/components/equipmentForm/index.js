import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  Form,
  Input,
  Row,
  Col,
  Select,
  Upload,
  Button,
  message,
  DatePicker,
  TimePicker,
  Space,
} from 'antd';
import {
  UploadOutlined,
  MinusCircleOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { setType } from '../../common/constant';
import { baseUrl } from '../../api/config';
import { getToken } from '../../common/util';
export const Container = styled.div`
  background: #fff;
`;
const { Option } = Select;
const { RangePicker } = DatePicker;

function EquipmentForm(props) {
  let { formData, modalState, toParent, isCommon } = props;
  //toparent拿到父组件的setFormData,从而可以子组件更新数据给父组件
  //console.log(formData);
  const [choosesetType, setChooseSetType] = useState(null); //选择的套餐类型
  //图片的地址
  const [picUrl, setPicUrl] = useState(null);
  const [form] = Form.useForm();
  const dateFormat = 'YYYY/MM/DD'; //日期格式
  //初始化图片地址，只执行一次,然后表单数据要实时更新
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
      setChooseSetType(formData.setType);
    } else {
      setChooseSetType(null); //如果是新增，回到原始值
    }
  }); //不设置只执行一次，实现更新
  //表单实时更新
  if (formData !== null) {
    form.setFieldsValue(formData);
  } else {
    form.resetFields();
  }
  const formDataChange = (changedValues, allValues) => {
    // console.log(allValues);
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
      setPicUrl(file.response.data.file);
      message.success('图片上传成功');
    }
  };
  //展示图片
  const showPicture = () => {
    window.open(picUrl, '_blank');
  };
  //选择框change操作
  const handleSelectChange = (item) => {
    setChooseSetType(item);
  };
  return (
    <Form
      form={form}
      layout="vertical"
      hideRequiredMark
      onValuesChange={formDataChange}
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
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          {isCommon ? (
            <Form.Item name="setType" label="套餐类型">
              <Select
                disabled={modalState === 2 || modalState === 3}
                placeholder="请选择套餐类型"
                onChange={handleSelectChange}
              >
                {setType.map((item, index) => {
                  return <Option value={item.value}>{item.label}</Option>;
                })}
              </Select>
            </Form.Item>
          ) : (
            <Form.Item
              name="price"
              label="默认价格"
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
                suffix={'/每晚'}
                placeholder={'请输入公寓的价格'}
                disabled={modalState === 3}
              />
            </Form.Item>
          )}
        </Col>
      </Row>
      {isCommon ? (
        ''
      ) : (
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="roomType"
              label="户型"
              rules={[{ required: true, message: '请输入公寓户型' }]}
            >
              <Input
                placeholder="请输入公寓的户型"
                disabled={modalState === 3}
              />
            </Form.Item>
          </Col>
          <Col span={5}>
            <Form.Item name="file" label="公寓图片">
              <Upload
                name="file"
                headers={{ Authorization: `${getToken()}` }}
                action={`${baseUrl}api/upload`}
                beforeUpload={beforeUpload}
                onChange={onChange}
                showUploadList={false}
              >
                <Button disabled={modalState === 3} icon={<UploadOutlined />}>
                  上传
                </Button>
              </Upload>
            </Form.Item>
          </Col>
          {/* 有图片会显示 */}
          <Col span={7}>
            {formData && formData.file ? (
              <Form.Item label=" ">
                <Button onClick={showPicture}>点击查看原图</Button>
              </Form.Item>
            ) : (
              ''
            )}
          </Col>
        </Row>
      )}

      {/* 公寓动态表单，动态设置特殊日期单价 */}
      {!isCommon && (modalState === 2 || modalState === 3) ? (
        <Row gutter={16}>
          <Form.List name="PriceList">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, fieldKey, ...restField }) => (
                  <Space
                    key={key}
                    style={{ display: 'flex', marginBottom: 8 }}
                    align="baseline"
                  >
                    <Form.Item
                      {...restField}
                      name={[name, 'time']}
                      fieldKey={[fieldKey, 'time']}
                      rules={[{ required: true, message: '时间必填' }]}
                    >
                      <RangePicker
                        format={dateFormat}
                        disabled={modalState === 3}
                      />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, 'price']}
                      fieldKey={[fieldKey, 'price']}
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
                        placeholder="请输入价格"
                        disabled={modalState === 3}
                      />
                    </Form.Item>
                    {modalState === 3 ? (
                      ''
                    ) : (
                      <MinusCircleOutlined onClick={() => remove(name)} />
                    )}
                  </Space>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                    disabled={modalState === 3}
                  >
                    增加特殊时段公寓单价
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </Row>
      ) : (
        ''
      )}
      {/* 公共设施管理按时的 */}
      {choosesetType === 0 ? (
        <Row gutter={16}>
          <Form.List name="PriceList">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, fieldKey, ...restField }) => (
                  <Space
                    key={key}
                    style={{ display: 'flex', marginBottom: 8 }}
                    align="baseline"
                  >
                    <Form.Item
                      {...restField}
                      name={[name, 'time']}
                      fieldKey={[fieldKey, 'time']}
                      rules={[{ required: true, message: '时间必填' }]}
                    >
                      <TimePicker.RangePicker
                        format="HH"
                        disabled={modalState === 3}
                      />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, 'price']}
                      fieldKey={[fieldKey, 'price']}
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
                        placeholder="请输入价格"
                        disabled={modalState === 3}
                      />
                    </Form.Item>
                    {/* 详情没有减号 */}
                    {modalState === 3 ? (
                      ''
                    ) : (
                      <MinusCircleOutlined onClick={() => remove(name)} />
                    )}
                  </Space>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                    disabled={modalState === 3}
                  >
                    设置时段价格
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </Row>
      ) : !!choosesetType === false ? (
        ''
      ) : (
        <Row gutter={16}>
          <Form.Item
            name="price"
            label="价格"
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
              suffix={`/${
                !!setType.find((item) => item.value === choosesetType)
                  ? setType.find((item) => item.value === choosesetType).label2
                  : ''
              }`}
              placeholder={'请输入公寓的价格'}
              disabled={modalState === 3}
            />
          </Form.Item>
        </Row>
      )}
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

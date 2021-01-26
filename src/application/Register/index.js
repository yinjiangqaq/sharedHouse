import { Form, Input, Button, Row, Col } from 'antd';
import React, { useEffect, useState } from 'react';
import { RegisterWrap } from './style';
import Image from '../../assets/imgs/IU.jpeg';
const onFinish = (values) => {
  console.log('Success:', values);
};

const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};
const getVerifyCode = () => {
  console.log('获取邮箱验证码');
};

function Register(props) {
  const [form] = Form.useForm(); //拿到表单实例
  //邮箱输入正确之后，邮箱验证码按钮启用的校验逻辑
  const [checkEmail, setCheckEmail] = useState(false);

  //使用的时候，放在form 表单的 onValuesChange字段里面,但是推荐还是使用validator这个主流的方法
  const valuesChange = (changeValues, allValues) => {
    //changeValue改变的字段的值，allValues全部字段的值
    if (
      /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(changeValues['email'])
    ) {
      setCheckEmail(true);
    }
  };

  return (
    <RegisterWrap style={{ backgroundImage: `url(${Image})` }}>
      <div className="RegisterContainer">
        <div className="FormTitle">注册账号</div>
        <Form
          name="basic"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          form={form}
          onValuesChange={valuesChange}
        >
          <Form.Item
            name="email"
            rules={[
              {
                pattern: /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/,
                message: '请输入正确的邮箱地址',
                //自定义校验钩子，检验通过和校验不通过的钩子，设置邮箱验证码按钮启用的state为true
                // validator: (rule, values) => {
                //   //console.log(values);
                //   if (
                //     /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(values)
                //   ) {
                //     setCheckEmail(true);
                //     return Promise.resolve();
                //   }
                //   return Promise.reject('请输入正确的邮箱地址');
                // },
              },
              {
                required: true,
                message: '请输入邮箱地址',
              },
            ]}
          >
            <Input placeholder="请输入邮箱" size="large" />
          </Form.Item>
          <Form.Item
            name="verifycode"
            rules={[
              {
                required: true,
                message: '请输入邮箱验证码',
              },
            ]}
          >
            <Row>
              <Col style={{ width: `100%` }}>
                <Input placeholder="请输入邮箱验证码" size="large" />
                <Button
                  type="default"
                  disabled={!checkEmail}
                  className="verifyCodeButton"
                  onClick={getVerifyCode}
                >
                  获取邮箱验证码
                </Button>
              </Col>
            </Row>
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/,
                message: '密码只能由8-16个字母和数字的组成',
              },
              {
                required: true,
                message: '请设置相应的密码',
              },
            ]}
          >
            <Input placeholder="设置密码" size="large" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="registerButton">
              注册
            </Button>
          </Form.Item>
        </Form>
      </div>
    </RegisterWrap>
  );
}

export default React.memo(Register);

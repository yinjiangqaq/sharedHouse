import { Form, Input, Button } from 'antd';
import React from 'react';
import { LoginWrap } from './style';
import { NavLink, useHistory } from 'react-router-dom';

function Login(props) {
  //react hook 路由跳转的方式， navlink和history.push
  let history = useHistory();
  const onFinish = (values) => {
    console.log('Success:', values);
    history.push('project');
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <LoginWrap>
      <div className="LoginContainer">
        <div className="FormTitle">共享公寓后台管理系统</div>
        <Form
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            name="username"
            rules={[
              {
                pattern: /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/,
                message: '请输入正确的邮箱地址',
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
            <Input.Password placeholder="请输入密码" size="large" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              登录
            </Button>
            <NavLink to="/register" className="register-button">
              现在注册！
            </NavLink>
          </Form.Item>
        </Form>
      </div>
    </LoginWrap>
  );
}

export default React.memo(Login);

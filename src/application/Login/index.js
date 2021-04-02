import { Form, Input, Button, message } from 'antd';
import React from 'react';
import { LoginWrap } from './style';
import { NavLink, useHistory } from 'react-router-dom';
import { login } from '../../api/user/index';
import { setToken } from '../../common/util';
function Login(props) {
  //react hook 路由跳转的方式， navlink和history.push
  let history = useHistory();
  const onFinish = (values) => {
    //记住login发送http请求，用的是axios，这个login()函数返回的是promise实例，需要自己做后续操作,成功或者失败
    login(values).then((res) => {
      console.log(res);
      if (res.code === 0) {
        setToken(res.data); //cookie上设置token
        message.info('登录成功');
        history.push('/');
      }
    });
    //
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
            name="email"
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

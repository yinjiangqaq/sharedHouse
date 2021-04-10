import { Form, Input, Button, Row, Col, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { RegisterWrap } from './style';
//import Image from '../../assets/imgs/IU.jpeg';
import { getEmailVerifyCode, register } from '../../api/admin/index';
const onFinish = (values) => {
  console.log('Success:', values);
  //注册
  register(values)
    .then((res) => {
      console.log(res);
      if (res.code === 0) {
        message.info(res.msg);
        window.location.hash = 'login'; //跳转到登录界面，还是走登录
      } else {
        message.error(res.msg);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

function Register(props) {
  const [form] = Form.useForm(); //拿到表单实例
  //邮箱输入正确之后，邮箱验证码按钮启用的校验逻辑
  const [checkEmail, setCheckEmail] = useState(false); //邮箱验证是否通过

  const [showNumber, setShowNumber] = useState(false); //倒计时按钮的显示

  let [count, setCount] = useState(60); //倒计时

  //使用的时候，放在form 表单的 onValuesChange字段里面,但是推荐还是使用validator这个主流的方法
  const valuesChange = (changeValues, allValues) => {
    //changeValue改变的字段的值，allValues全部字段的值
    if (
      /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(changeValues['email'])
    ) {
      setCheckEmail(true);
    }
  };

  const countDown = () => {
    // console.log(count)
    if (count === 1) {
      setCount(60);
      setShowNumber(false); //倒计时按钮不显示显示,前面的setTimeout执行结束，就没了，所以定时器就结束了，如果是setInterval实现记得清除定时器
    } else {
      setCount(count--); //更新count，单纯count--只是在这里会更新，但是外面没有拿到更新的值
      setTimeout(() => countDown(), 1000);
    }
  };
  const getVerifyCode = () => {
    console.log('获取邮箱验证码');
    setShowNumber(true); //倒计时按钮显示
    countDown();
    //拿到当前表单中的邮箱
    // console.log(form.getFieldValue());
    getEmailVerifyCode(form.getFieldValue())
      .then((res) => {
        console.log(res);
        if (res.code === -1) {
          message.error(res.msg);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //动态渲染倒计时按钮
  const renderButton = () => {
    if (!showNumber) {
      return (
        <Button
          type="default"
          disabled={!checkEmail}
          className="verifyCodeButton"
          onClick={getVerifyCode}
        >
          获取邮箱验证码
        </Button>
      );
    } else {
      return (
        <Button className="verifyCodeButton" type="default">
          {count}秒后重新获取
        </Button>
      );
    }
  };
  return (
    <RegisterWrap
      style={
        {
          //backgroundImage: `url(${Image})`
        }
      }
    >
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
                {renderButton()}
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

import React from 'react';
import styled from 'styled-components';
import style from '../../assets/global-style';
import { Menu, Dropdown } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 4px;
  height: 50px !important;
  overflow: hidden;
  position: relative;
  background: #fff;
  -webkit-box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  border-bottom: 1px solid #e9e9e9;
  z-index: 1;
  padding: 0 50px 0 20px;
  .left-menu {
    display: flex;
  }
  .logo {
    width: 38px;
    height: 38px;
    margin-left: 10px;
  }
  .products {
    line-height: 38px;
  }
  .dropDown button {
    border: none;
  }
`;

function BaseHeader() {
  const handleLogOut = () => {
    //退出登录的方法，后台返回成功之后，前端清理菜单缓存，重定向到登录界面

    window.location.href = window.location.origin + '/#/login';
  };
  const menu = (
    <Menu>
      <Menu.Item key="0">
        <a onClick={handleLogOut}>退出登录</a>
      </Menu.Item>
      <Menu.Divider />
    </Menu>
  );
  return (
    <Header>
      <div className="left-menu">
        <div className="logo"></div>
        <div className="products">共享公寓管理后台</div>
      </div>

      <div className="right-menu">
        <Dropdown.Button
          trigger={['click']}
          className="dropDown"
          overlay={menu}
          placement="bottomCenter"
          icon={<UserOutlined />}
        ></Dropdown.Button>
      </div>
    </Header>
  );
}

export default React.memo(BaseHeader);

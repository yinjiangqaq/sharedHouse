import React, { useEffect, useCallback, useContext, useState } from 'react';
import styled from 'styled-components';
import { Menu, Dropdown, message } from 'antd';
// import shallowEqual from 'shallowequal';
import { UserOutlined } from '@ant-design/icons';
import { logout } from '../../api/user';
import { removeToken } from '../../common/util';
import { getUserInfo } from '../../api/user/index';
//StoreContext是之前根目录下的index.js的StoreContext绑定的全局上下文，在任何一个组件，都可以通过这种方式访问到
//加上useContext(StoreContext)
import { useDispatch, useMappedState, StoreContext } from 'redux-react-hook';

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

function BaseHeader(props) {
  //用户信息
  const store = useContext(StoreContext); //拿到全局上下文绑定的store对象
  const handleLogOut = () => {
    //退出登录的方法，后台返回成功之后，前端清理菜单缓存，重定向到登录界面
    logout()
      .then((res) => {
        if (res.code === 0) {
          //删除token
          removeToken();
          window.location.hash = 'login';
        }
      })
      .catch((err) => {
        console.log(err)
        message.error(err.message);
      });
  };
  // const mapState = useCallback((state) => ({
  //   userInfo: state.userInfo,
  // }));
  // const { userInfo } = useMappedState(mapState, shallowEqual);
  const dispatch = useDispatch();
  const [userInfo, setUserInfo] = useState('未登录'); //需要一个状态userInfo,来做响应式更新。不然userInfo一刷新就没了
  useEffect(() => {
    //首次渲染进行，就不会再执行两次了
    //首次进来调用获取用户信息的接口
    getUserInfo()
      .then((res) => {
        console.log(res);
        if (!store.getState().userInfo.username) {
          dispatch({
            type: 'SET_USERINFO',
            userInfo: res.data,
          });
          setUserInfo(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });

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
        >
          {userInfo.username}
        </Dropdown.Button>
      </div>
    </Header>
  );
}

export default React.memo(BaseHeader);

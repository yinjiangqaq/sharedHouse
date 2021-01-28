import React from 'react';
import BaseHeader from '../../components/baseHeader';
import BaseSider from '../../components/baseSider';
import { renderRoutes } from 'react-router-config';
import { Layout, Breadcrumb } from 'antd';
import { BreadcrumbContainer } from './style';
const { Content } = Layout;
function Project(props) {
  const { route } = props;
  //拿到每个路由的具体的面包屑路径
  const getModelName = () => {
    if (window.location.hash.slice(1) === '/project') {
      //默认跳账号管理
      window.location.hash = '#/project/account';
      return [];
    } else {
      return route.children.find(
        (item) => item.path === window.location.hash.slice(1)
      ).label;
    }
  };

  const MENU = [
    {
      id: 0,
      name: '客户管理',
      children: [
        {
          id: 1,
          name: '账号管理',
          label: 'account',
        },
        {
          id: 2,
          name: '信用管理',
          label: 'credit',
        },
      ],
    },
    {
      id: 3,
      name: '租赁管理',
      children: [
        {
          id: 4,
          name: '房屋租赁管理',
          label: 'room',
        },
        {
          id: 5,
          name: '公共资源租赁管理',
          label: 'common',
        },
      ],
    },
  ];
  //根据当前路径显示相对应的菜单项

  const GetCurrKeys = () => {
    if (window.location.hash.slice(1) === '/project') return ['0-0'];
    else {
      const target = window.location.hash.slice(1).split('/');
      let res = [];
      MENU.map((item, index) => {
        item.children.map((subItem, subIndex) => {
          if (target.includes(subItem.label)) {
            res.push(`${index}-${subIndex}`);
          }
        });
      });
      return res;
    }
  };
  return (
    <Layout style={{ height: '100%' }}>
      <BaseHeader></BaseHeader>
      <Layout>
        <BaseSider menu={MENU} currKeys={GetCurrKeys()}></BaseSider>
        <Content
          style={{
            margin: '20px',
            backgroundColor: '#fff',
            border: 'solid 1px #e9e9e9',
          }}
        >
          <BreadcrumbContainer>
            <Breadcrumb>
              {getModelName().map((item, index) => {
                return <Breadcrumb.Item key={index}>{item}</Breadcrumb.Item>;
              })}
            </Breadcrumb>
          </BreadcrumbContainer>
          {renderRoutes(route.children)}
        </Content>
      </Layout>
    </Layout>
  );
}

export default React.memo(Project);

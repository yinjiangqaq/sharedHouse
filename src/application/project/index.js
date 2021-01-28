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
    return route.children.find(
      (item) => item.path === window.location.hash.slice(1)
    ).label;
  };
  const MENU = [
    {
      id: 0,
      name: '用户管理',
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
  return (
    <Layout style={{ height: '100%' }}>
      <BaseHeader></BaseHeader>
      <Layout>
        <BaseSider menu={MENU}></BaseSider>
        <Content
          style={{
            margin: '20px',
            backgroundColor: '#fff',
            border: 'solid 1px #e9e9e9',
          }}
        >
          <BreadcrumbContainer>
            <Breadcrumb>
              {getModelName().map((item) => {
                return <Breadcrumb.Item>{item}</Breadcrumb.Item>;
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

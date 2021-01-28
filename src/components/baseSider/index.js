import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { Layout, Menu } from 'antd';
const { SubMenu } = Menu;
const { Sider } = Layout;

export const Container = styled.div`
  background: #fff;
  .site-layout-background {
    background: #fff;
  }
`;

function BaseSider(props) {
  const { menu, currKeys } = props;
  //console.log(currKeys);
  //当前展开的keys数组
  const currOpenKeys = [currKeys[0].split('-')[0]];
  return (
    <Container>
      <Sider width={210} className="site-layout-background">
        <Menu
          mode="inline"
          style={{ height: '100%' }}
          selectedKeys={currKeys}
          defaultOpenKeys={currOpenKeys}
        >
          {menu.map((menuItem, index) => {
            return (
              <SubMenu title={menuItem.name} key={`${index}`}>
                {menuItem.children.map((submenu, subIndex) => {
                  if (submenu.children && submenu.children.length) {
                    submenu.children.map((ssubmenu, ssubIndex) => {
                      return (
                        <SubMenu
                          title={submenu.name}
                          key={`${index}-${subIndex}`}
                        >
                          <Menu.Item key={`${index}-${subIndex}-${ssubIndex}`}>
                            <NavLink to={`/project/${ssubmenu.label}`}>
                              {ssubmenu.name}
                            </NavLink>
                          </Menu.Item>
                        </SubMenu>
                      );
                    });
                  } else {
                    return (
                      <Menu.Item key={`${index}-${subIndex}`}>
                        <NavLink to={`/project/${submenu.label}`}>
                          {submenu.name}
                        </NavLink>
                      </Menu.Item>
                    );
                  }
                })}
              </SubMenu>
            );
          })}
        </Menu>
      </Sider>
    </Container>
  );
}

export default React.memo(BaseSider);

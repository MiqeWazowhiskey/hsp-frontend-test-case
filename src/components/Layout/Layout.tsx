import React, { useState} from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
     UserOutlined,
    UnorderedListOutlined} from '@ant-design/icons';
import { Layout as LayoutAnt, Menu, Button, theme } from 'antd';
import {NavLink, useNavigate} from "react-router-dom";

const { Header,
        Sider,
        Content} = LayoutAnt;

interface LayoutProps {
    children:  React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({children}) => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const navigation = useNavigate();
    return (

        <LayoutAnt className='w-screen h-full lg:h-screen'>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="demo-logo-vertical" />
                <Menu
                    theme="dark"
                    mode="inline"
                    className='text-lg'
                    defaultSelectedKeys={['/']}
                    selectedKeys={[location.pathname]}
                    items={
                        [
                            {
                                key: '/',
                                icon: <UserOutlined/>,
                                label: 'Dashboard',
                                onClick: () => {
                                    navigation('/');
                                }
                            },
                            {
                                key: '/users',
                                icon: <UnorderedListOutlined/>,
                                label: 'Users',
                                onClick: () => {
                                    navigation('/users');
                                }
                            }
                        ]
                    }
                />
            </Sider>
            <LayoutAnt>
                <Header
                    className={'lg:h-[8%] md:h-[5%] h-[3%]'}
                    style={{
                    padding: 0,
                    background: colorBgContainer,
                    display:'flex',
                    justifyContent:'space-between',
                    alignItems:'center',
                }}>
                    <Button
                        type="text"
                        icon={collapsed ?
                            <MenuUnfoldOutlined
                                style={{
                                    fontSize: '32px',
                                }}
                            /> :
                            <MenuFoldOutlined
                                style={{
                                    fontSize: '32px',
                                }}
                            />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />
                  <NavLink to={'/'}>
                      {/*There were conflict about path, so that I need to specify the path */}
                      <img src='../../../public/logo.png'  alt="logo" className='w-64 p-3 hidden lg:flex object-contain' />
                  </NavLink>

                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        minHeight: 280,
                        background: colorBgContainer
                    }}
                    className={'lg:p-[24] p-[12]'}
                >

                    {children}


                </Content>
            </LayoutAnt>
        </LayoutAnt>
    );
};
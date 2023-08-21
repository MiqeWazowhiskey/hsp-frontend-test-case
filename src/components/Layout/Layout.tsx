import React, { useState} from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
     UserOutlined,
    UnorderedListOutlined} from '@ant-design/icons';
import { Layout as LayoutAnt, Menu, Button, theme } from 'antd';

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

    return (

        <LayoutAnt className='w-screen h-screen'>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="demo-logo-vertical" />
                <Menu
                    theme="dark"
                    mode="inline"
                    className='text-xl'
                    defaultSelectedKeys={['1']}>
                    <Menu.Item key="1" icon={<UserOutlined />}> Dashboard </Menu.Item>
                    <Menu.Item key="2" icon={<UnorderedListOutlined />}> Users </Menu.Item>
                </Menu>
            </Sider>
            <LayoutAnt>
                <Header style={{
                    padding: 0,
                    background: colorBgContainer,
                    display:'flex',
                    justifyContent:'space-between',
                    height:'8%',
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
                    <img src='logo.png'  alt="logo" className='w-64 p-3  object-contain' />

                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                    }}
                >
                    {children}
                </Content>
            </LayoutAnt>
        </LayoutAnt>
    );
};
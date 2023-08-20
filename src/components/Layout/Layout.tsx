import React, { useState} from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
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
            <Sider trigger={null} collapsible collapsed={collapsed} width='12%' >
                <div className="demo-logo-vertical" />
                <Menu
                    theme="dark"
                    mode="inline"
                    className='text-2xl'
                    defaultSelectedKeys={['1']}
                    items={[
                        {
                            key: '1',
                            icon: <UserOutlined />,
                            label: 'nav 1',
                        },
                        {
                            key: '2',
                            icon: <VideoCameraOutlined />,
                            label: 'nav 2',
                        },
                        {
                            key: '3',
                            icon: <UploadOutlined />,
                            label: 'nav 3',
                        },
                    ]}
                />
            </Sider>
            <LayoutAnt>
                <Header style={{ padding: 0, background: colorBgContainer }}>
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
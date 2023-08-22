import Layout from "../../components/Layout";
import React from 'react';
import {Table, Button, Space} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import {User} from "../../Model/User.ts";
import {useDeleteUser, useGetUsers} from "../../Service/UserService.ts";
import {NavLink, useNavigate} from "react-router-dom";
import {set} from "react-hook-form";

const columns: ColumnsType<User> = [
    {
        title: 'Name',
        dataIndex: 'name',
    },
    {
        title: 'Username',
        dataIndex: 'username',
    },
    {
        title: 'Email',
        dataIndex: 'email',
    },
    {
        title: 'Register Date',
        dataIndex: 'registerDate',
    },
    {
        title: 'Total Hours',
        dataIndex: 'totalHour',
    },
    {
        title: 'Street',
        dataIndex: ['address', 'street'], // Access nested property
    },
    {
        title: 'Suite',
        dataIndex: ['address', 'suite'], // Access nested property
    },
    {
        title: 'City',
        dataIndex: ['address', 'city'], // Access nested property
    },
    {
        title: 'Zipcode',
        dataIndex: ['address', 'zipcode'], // Access nested property
    },
    {
        title: 'Phone',
        dataIndex: 'phone',
    },
    {
        title: 'Website',
        dataIndex: 'website',
    },
    {
        title: 'Company Name',
        dataIndex: ['company', 'name'], // Access nested property
    },
    {
        title: 'Company Catch Phrase',
        dataIndex: ['company', 'catchPhrase'], // Access nested property
    },
    {
        title: 'Company BS',
        dataIndex: ['company', 'bs'], // Access nested property
    },
];


export const Users: React.FC = () => {
    const {data,isSuccess} = useGetUsers();
    const[selected,setSelected]= React.useState<number[]>([]);
    const {mutate} = useDeleteUser();
    const locate = useNavigate();
    const handleRowClick = (id: string) => {
        locate('/edit/'+id)
    }
    const rowSelection = {
        onChange: (selectedRowKeys: React.Key[], selectedRows: User[]) => {
            if(selectedRows.length>0) {
                setSelected(selectedRowKeys as number[]);
            }
            else{
                setSelected([]);
            }
            console.log(selectedRowKeys);
        },
        getCheckboxProps: (record: User) => ({
            disabled: record.name === 'Disabled User',
            name: record.name,
        }),
    };

    return isSuccess && (
        <Layout>
            <Space className='flex flex-row gap-2 mb-5'>
                <Button type="primary" className='bg-[#1677ff]' size={'middle'}>
                    <NavLink to={'/add'} className={'text-sm'}>Add User</NavLink>
                </Button>
                <Button
                    danger
                    size={'middle'}
                    type='primary'
                    className={`${selected.length>0?'block':'hidden'} `}
                    onClick={()=>{selected?.length && mutate(selected);setSelected([]) }}
                >
                    <p className={'text-sm'}> Delete All</p>
                </Button>
            </Space>
            <Table
                rowKey={(record) => record.id}
                rowSelection={{
                    type: "checkbox",
                    ...rowSelection,
                }}
                columns={columns}
                dataSource={data}
                pagination={{pageSize:8}}
                onRow={(record: User) => ({
                    onClick: () => handleRowClick(record.id), // Handle row click
                })}
            />
        </Layout>
    );
};


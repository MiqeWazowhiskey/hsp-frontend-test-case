import Layout from "../../components/Layout";
import React from 'react';
import {Table, Button, Space, Alert} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import {User} from "../../Model/User.ts";
import {useDeleteUser, useGetUsers} from "../../Service/UserService.ts";
import {NavLink, useNavigate} from "react-router-dom";

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
        render: (date: number) => {
            const text = '' + date; // Convert to string
            const formattedDate = '' + text.substring(0,4) + '/' + text.substring(6,8) + '/' + text.substring(4,6);  // Format date
            return <span>{formattedDate}</span>;
        },
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
    const queryParams = new URLSearchParams(location.search);

    const handleRowClick = (user: User) => {
        locate('/edit/'
                + user.id
                + '?name='+user.name
                + '&username='+user.username
                + '&email='+user.email
                + '&registerDate='+user.registerDate
                + '&totalHour='+user.totalHour
                + '&street='+user.address.street
                + '&suite='+user.address.suite
                + '&city='+user.address.city
                + '&zipcode='+user.address.zipcode
                + '&phone='+user.phone
                + '&website='+user.website
                + '&companyName='+user.company.name
                + '&companyCatchPhrase='+user.company.catchPhrase
                + '&companyBs='+user.company.bs
        );
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
            <Space className='flex mb-5 w-full justify-between'>
                <div className={'flex flex-row gap-2 '}>
                    <NavLink to={'/add'} className={'text-sm'}>
                        <Button type="primary" className='bg-[#1677ff]' size={'middle'}>
                            Add User
                        </Button>
                    </NavLink>
                    <Button
                        danger
                        size={'middle'}
                        type='primary'
                        className={`${selected.length>0?'block':'hidden'} `}
                        onClick={()=>{
                            selected?.length && mutate(selected);
                            setSelected([]);
                        }}
                    >
                        <p className={'text-sm'}> Delete All</p>
                    </Button>
                </div>
                {queryParams.get('success') && <Alert message="Success" type="success" showIcon className={' w-fit '}/>}
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
                    onClick: () => handleRowClick(record), // Handle row click
                })}
            />
        </Layout>
    );
};


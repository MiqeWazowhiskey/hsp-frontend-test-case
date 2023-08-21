import Layout from "../../components/Layout";


import React from 'react';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import {User} from "../../Model/User.ts";
import {useGetUsers} from "../../api/users.ts";

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




const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: User[]) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: (record: User) => ({
        disabled: record.name === 'Disabled User',
        name: record.name,
    }),
};

export const Users: React.FC = () => {
    const {data,isSuccess} = useGetUsers();
    return isSuccess && (
        <Layout>
            <Table
                rowSelection={{
                    type: "checkbox",
                    ...rowSelection,
                }}
                columns={columns}
                dataSource={data?.data.users}
                pagination={{ defaultPageSize: 10, showSizeChanger: true, pageSizeOptions:["6","10","12"]}}
            />
        </Layout>
    );
};

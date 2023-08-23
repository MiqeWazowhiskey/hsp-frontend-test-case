import Layout from "../../components/Layout";
import Card from "../../components/Card";
import React from "react";
import {CalendarOutlined, MailOutlined, UserOutlined} from "@ant-design/icons";
import {CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis} from 'recharts';
import {useGetSortedUserByHour, useGetUsers} from "../../Service/UserService.ts";
import {NavLink} from "react-router-dom";
import {User} from "../../Model/User.ts";

export const Dashboard: React.FC = () => {

    const {data: hourlyData} = useGetSortedUserByHour();
    // I am going to use raw data just because of to show my frontend skills
    const{data: allUsers} = useGetUsers();

    const data = [{name: '2019', uv: 80, pv: 2400, amt: 2400},
        {name: '2020', uv: 55, pv: 2400, amt: 2400},
        {name: '2021', uv: 44, pv: 2400, amt: 2400},
        {name: '2022', uv: 60, pv: 2400, amt: 2400},
        {name: '2023', uv: allUsers?.length || 32 , pv: 2400, amt: 2400}];

    const navLinkGenerator = (user: User) => {
        return 'edit/'
            + user.id
            + '?name=' + user.name
            + '&username=' + user.username
            + '&email=' + user.email
            + '&registerDate=' + user.registerDate
            + '&totalHour=' + user.totalHour
            + '&street=' + user.address.street
            + '&suite=' + user.address.suite
            + '&city=' + user.address.city
            + '&zipcode=' + user.address.zipcode
            + '&phone=' + user.phone
            + '&website=' + user.website
            + '&companyName=' + user.company.name
            + '&companyCatchPhrase=' + user.company.catchPhrase
            + '&companyBs=' + user.company.bs;
    }
    return (
        <Layout>
            <div className={'flex lg:flex-row flex-col gap-4'}>
                <Card title='Mostly Active Users' className='lg:w-1/2 w-full min-h-2/3'>
                    <div className='text-2xl flex lg:flex-row flex-col gap-4'>
                        {hourlyData && hourlyData.slice(0,3).map((user, index) => {
                            return (
                                <NavLink
                                    className={'lg:w-1/3 w-full text-center hover:scale-105 transition-all hover:text-black'}
                                    to={navLinkGenerator(user)}
                                >
                                    <Card key={index} title={''}>
                                        <UserOutlined className={'text-5xl border-4 rounded-full p-5 text-[#164E63] border-[#164E63] mb-4'}/>
                                        <h2 className={'text-xl font-bold mb-2'}> {user.username}</h2>
                                        <p className={'text-sm font-light mb-2'}> {user.email} </p>
                                        <p className={'text-sm font-light mb-2'}> {user.name} </p>
                                        <p className={'text-sm font-light mb-2'}> {user.registerDate} </p>
                                        <p className={'text-sm font-light mb-2'}> {user.company.name} </p>
                                        <p className={'text-md font-normal'}> Total Hour : {user.totalHour} </p>
                                    </Card>
                                </NavLink>
                            )
                        })}
                    </div>
                </Card>

                <Card title='Last Registered' className='lg:w-1/2 w-full min-h-full'>
                    <div className='text-2xl flex flex-col gap-4'>
                        {allUsers && allUsers
                            .sort((a, b) => {
                                const dateA: number = new Date(a.registerDate).getTime();
                                const dateB: number = new Date(b.registerDate).getTime();
                                return dateA - dateB;
                            }).slice(0,3).map((user, index) => {
                            return (
                                <NavLink to={navLinkGenerator(user)} className={'w-full text-center hover:scale-105 transition-all hover:text-black'} >
                                    <Card key={index} title={''}>
                                        <div className={'flex flex-col lg:flex-row justify-center gap-5 mb-4'}>
                                            <UserOutlined/>
                                            <p className={'lg:text-sm text-xs font-bold mb-2'}> {user.name} </p>
                                            <MailOutlined/>
                                            <p className={'lg:text-sm text-xs font-bold mb-2'}> {user.email} </p>
                                            <CalendarOutlined />
                                            <p className={'lg:text-sm text-xs font-light mb-2'}>
                                                {
                                                    user.registerDate.toString().substring(0,4)
                                                    + '/'
                                                    + user.registerDate.toString().substring(6,8)
                                                    + '/'
                                                    + user.registerDate.toString().substring(4,6)
                                                }
                                            </p>
                                        </div>
                                    </Card>
                                </NavLink>
                            )
                        })}
                    </div>
                </Card>

            </div>
            <Card title={`Total Users : ${allUsers?.length}`} className={'ml-auto mr-auto h-1/3 w-full mt-5 hidden lg:flex'}>
                <div className={'w-full flex justify-center'}>
                <LineChart width={800} height={180} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                    <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                </LineChart>
                </div>
            </Card>
        </Layout>
    );
}



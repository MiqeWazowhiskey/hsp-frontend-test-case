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
            <div className={'p-5 flex flex-col w-full h-full'}>
            <div className={'h-1/2 flex lg:flex-row flex-col w-full gap-4 items-center'}>
                <Card title='Mostly Active Users' className='lg:w-1/2 w-full h-full flex flex-col justify-center'>
                    <div className='text-2xl flex lg:flex-row flex-col gap-4'>
                        {hourlyData && hourlyData.slice(0,3).map((user, index) => {
                            return (
                                <NavLink  key={index}
                                    className={'lg:w-[31.5%] w-full text-center hover:scale-105 transition-all hover:text-black'}
                                    to={navLinkGenerator(user)}
                                >
                                    <Card title={''} className={'h-full'}>
                                        <UserOutlined className={'text-3xl text-[#164E63] mb-2'}/>
                                        <h2 className={'text-lg font-bold mb-2'}> {user.username}</h2>
                                        <p className={'text-sm font-light mb-2'}> {user.name} </p>
                                        <p className={'text-sm font-light mb-2'}> {user.phone} </p>
                                        <p className={'text-sm font-light mb-2'}> {user.address.city} </p>
                                        <p className={'text-sm font-normal'}> Total Hour : {user.totalHour} </p>
                                    </Card>
                                </NavLink>
                            )
                        })}
                    </div>
                </Card>

                <Card title='Last Registered' className='lg:w-1/2 w-full h-full flex flex-col justify-center'>
                    <div className='text-lg flex flex-col gap-2'>
                        {allUsers && allUsers
                            .sort((a, b) => {
                                const dateA: number = new Date(a.registerDate).getTime();
                                const dateB: number = new Date(b.registerDate).getTime();
                                return dateB - dateA;
                            }).slice(0,3).map((user, index) => {
                            return (
                                <NavLink key={index} to={navLinkGenerator(user)} className={'w-full text-center hover:scale-105 transition-all hover:text-black'} >
                                    <Card  title={''} className={''}>
                                        <div className={'flex flex-col lg:flex-row justify-center'}>
                                            <div className={'w-1/4'}>
                                                <UserOutlined/>
                                                <p className={' text-xs font-bold'}> {user.name} </p>
                                            </div>
                                            <div className={'w-2/4 '}>
                                                <MailOutlined/>
                                                <p className={'text-xs font-bold'}> {user.email} </p>
                                            </div>
                                            <div className={'w-1/4 '}>
                                                <CalendarOutlined />
                                                <p className={'text-xs font-light'}>
                                                    {
                                                        user.registerDate.toString().substring(0,4)
                                                        + '/'
                                                        + user.registerDate.toString().substring(6,8)
                                                        + '/'
                                                        + user.registerDate.toString().substring(4,6)
                                                    }
                                                </p>
                                            </div>
                                        </div>
                                    </Card>
                                </NavLink>
                            )
                        })}
                    </div>
                </Card>
            </div>
                <Card title={`Total Users : ${allUsers?.length}`} className={'ml-auto mr-auto h-1/2 w-[95%] mt-5 hidden lg:block'}>
                    <div className={'w-full flex justify-center'}>
                        <LineChart width={500} height={180} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                            <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                        </LineChart>
                    </div>
                </Card>
            </div>
        </Layout>
    );
}



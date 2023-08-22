import {NavLink} from "react-router-dom";
import {RollbackOutlined} from "@ant-design/icons";

export const ErrorPage = () => {
    return (
        <div className={'w-screen h-screen bg-[#0A3342] flex flex-col justify-between overflow-hidden'}>
            <h1 className={'text-end w-full p-10 text-9xl text-white'}>404 Not Found</h1>
            <p className={'text-5xl text-white text-end w-full pr-10'}>
                There is nothing to see here
            </p>
            <div className={'w-full mt-[2%] '}>
                <NavLink to={'/'} className={'hover:text-blue-200 text-white  w-fit pr-10 flex items-center ml-auto'}>
                    Home <RollbackOutlined className={'ml-2'}/>
                </NavLink>
            </div>
            <img src='../../../public/error.png' alt={'404'} className={'w-[40%] h-fit mt-[1%] ml-[5%]'}/>
        </div>
    )
}
import Layout from "../../components/Layout";
import {Button, Form, Input} from "antd";
import {useParams} from "react-router-dom";
import {useGetUserById, useUpdateUser} from "../../Service/UserService.ts";
import {FieldValues, useForm} from "react-hook-form";
import {FormItem} from "react-hook-form-antd";
import {yupResolver} from "@hookform/resolvers/yup";
import {userSchema} from "../../Schemas/UserSchema.ts";

export const Edit = () => {
    //id from url
    const {id} = useParams();

    //initial user id
    let getUser = -1;


    if(id){
        console.log(id)
        getUser = parseInt(id);
    }

    const {data, isSuccess: successGet} = useGetUserById(getUser);
    const {mutate,  isSuccess: successUpdate  } = useUpdateUser();


    const date = data && new Date(data.registerDate);
    const defaultValues = data && {
        name:  data.name,
        username:  data.username,
        email:  data.email,
        totalHour:  data.totalHour,
        registerDate:   `${date!.getFullYear()}-${String(date!.getMonth() + 1).padStart(2, '0')}-${String(date!.getDate()).padStart(2, '0')}`,
        address: {
            street:  data.address.street,
            suite:  data.address.suite,
            city:  data.address.city,
            zipcode:  data.address.zipcode,
        },
        phone:  data.phone,
        website:  data.website,
        company: {
            name:  data.company.name,
            catchPhrase:  data.company.catchPhrase,
            bs:  data.company.bs,
        },
    };



    const {
        handleSubmit,
        control
    } = useForm({
        mode: 'onBlur',
        // @ts-ignore
        resolver: yupResolver(userSchema),
        defaultValues: defaultValues
    } );

    function formatDateToNumeric(date:Date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Adding 1 because months are zero-indexed
        const day = String(date.getDate()).padStart(2, '0');
        const numericFormat = `${year}${month}${day}00`;
        return parseInt(numericFormat, 10);
    }

    const onSubmit = (data:FieldValues) => {
        const requestBody = {
            id: getUser,
            name: data.name,
            username: data.username,
            email: data.email,
            totalHour: data.totalHour,
            registerDate: formatDateToNumeric(new Date(data.registerDate)),
            address: {
                street: data.address.street,
                suite: data.address.suite,
                city: data.address.city,
                zipcode: data.address.zipcode,
            },
            phone: data.phone,
            website: data.website,
            company: {
                name: data.company.name,
                catchPhrase: data.company.catchPhrase,
                bs: data.company.bs,
            },

        }
        mutate({id: getUser, user: requestBody});
    };

    return successGet && (
        <Layout>
            <h3 className={'flex justify-between text-2xl font-bold text-[#0A3342]'}>
                User Details
                {successUpdate && <span className={'ml-auto font-light text-red-500'}> Saved Successfully</span>}
            </h3>

            <Form onFinish={handleSubmit((values) => {
                onSubmit(values);
            })}>
                <div id={'InputContainer'} className="grid grid-cols-12 m-auto mt-[1%] gap-4">
                    <div className="col-span-3">
                        <label> Username </label>
                        <FormItem control={control} name={'username'}>
                            <Input
                                placeholder="Username"
                                className=" text-xl mt-3 border-b-2 border-[#0A3342] focus:outline-none focus:border-b-blue-600 focus:scale-105 transition-all"
                            />
                        </FormItem>
                    </div>

                    <div className="col-span-3">
                        <label> Name </label>
                        <FormItem control={control} name={'name'}>
                            <Input
                                placeholder="Name"
                                className=" text-xl mt-3 border-b-2 border-[#0A3342] focus:outline-none focus:border-b-blue-600 focus:scale-105 transition-all"
                            />
                        </FormItem>

                    </div>

                    <div className="col-span-3">
                        <label> Email </label>
                        <FormItem control={control} name={'email'}>
                            <Input
                                type={'email'}
                                placeholder="Email"
                                className=" text-xl mt-3 border-b-2 border-[#0A3342] focus:outline-none focus:border-b-blue-600 focus:scale-105 transition-all"
                            />
                        </FormItem>
                    </div>

                    <div className="col-span-3">
                        <label> Total Hours </label>
                        <FormItem control={control} name={'totalHour'}>
                            <Input
                                placeholder="Total Hours"
                                className=" text-xl mt-3 border-b-2 border-[#0A3342] focus:outline-none focus:border-b-blue-600 focus:scale-105 transition-all"
                            />
                        </FormItem>
                    </div>

                    <div className="col-span-3">
                        <label> Street </label>
                        <FormItem control={control} name={'address.street'}>
                            <Input
                                placeholder="Street"
                                className=" text-xl mt-3 border-b-2 border-[#0A3342] focus:outline-none focus:border-b-blue-600 focus:scale-105 transition-all"
                            />
                        </FormItem>
                    </div>
                    <div className="col-span-3">
                        <label> Suite </label>
                        <FormItem control={control} name={'address.suite'}>
                            <Input
                                placeholder="Suite"
                                className=" text-xl mt-3 border-b-2 border-[#0A3342] focus:outline-none focus:border-b-blue-600 focus:scale-105 transition-all"
                            />
                        </FormItem>
                    </div>
                    <div className="col-span-3">
                        <label> City </label>
                        <FormItem control={control} name={'address.city'}>
                            <Input
                                placeholder="City"
                                className=" text-xl mt-3 border-b-2 border-[#0A3342] focus:outline-none focus:border-b-blue-600 focus:scale-105 transition-all"
                            />
                        </FormItem>
                    </div>
                    <div className="col-span-3">
                        <label> Zip Code </label>
                        <FormItem control={control} name={'address.zipcode'}>
                            <Input
                                placeholder="Zipcode"
                                className=" text-xl mt-3 border-b-2 border-[#0A3342] focus:outline-none focus:border-b-blue-600 focus:scale-105 transition-all"
                            />
                        </FormItem>
                    </div>
                    <div className="col-span-3">
                        <label> Phone </label>
                        <FormItem control={control} name={'phone'}>
                            <Input
                                placeholder="Phone"
                                className=" text-xl mt-3 border-b-2 border-[#0A3342] focus:outline-none focus:border-b-blue-600 focus:scale-105 transition-all"
                            />
                        </FormItem>
                    </div>
                    <div className="col-span-3">
                        <label> Website </label>
                        <FormItem control={control} name={'website'}>
                            <Input
                                placeholder="Website"
                                className=" text-xl mt-3 border-b-2 border-[#0A3342] focus:outline-none focus:border-b-blue-600 focus:scale-105 transition-all"
                            />
                        </FormItem>
                    </div>
                    <div className="col-span-3">
                        <label> Company Name </label>
                        <FormItem control={control} name={'company.name'}>
                            <Input
                                placeholder="Company Name"
                                className=" text-xl mt-3 border-b-2 border-[#0A3342] focus:outline-none focus:border-b-blue-600 focus:scale-105 transition-all"
                            />
                        </FormItem>
                    </div>
                    <div className="col-span-3">
                        <label> Company Catch Phrase </label>
                        <FormItem control={control} name={'company.catchPhrase'}>
                            <Input
                                placeholder="Company Catch Phrase"
                                className=" text-xl mt-3 border-b-2 border-[#0A3342] focus:outline-none focus:border-b-blue-600 focus:scale-105 transition-all"
                            />
                        </FormItem>
                    </div>
                    <div className="col-span-3">
                        <label> Company BS </label>
                        <FormItem control={control} name={"company.bs"}>
                            <Input
                                id={'Companybs'}
                                placeholder="Company BS"
                                className=" text-xl mt-3 border-b-2 border-[#0A3342] focus:outline-none focus:border-b-blue-600 focus:scale-105 transition-all"
                            />
                        </FormItem>
                    </div>
                    <div className=" col-span-3 ">
                        <label> Register Date </label>
                        <FormItem control={control} name={'registerDate'}>
                            <Input
                                type={'date'}
                                className="w-full h-[53%] text-xl mt-3 border-b-2 border-[#0A3342] focus:outline-none focus:border-b-blue-600 focus:scale-105 transition-all"
                            />
                        </FormItem>
                    </div>
                </div>

                <div id={'buttonContainer'} className={'w-full flex justify-end mt-[2%]'}>
                    <Button htmlType="submit" type='primary' className='bg-[#1677ff] w-1/6' size={'middle'}>
                        Save
                    </Button>
                </div>

            </Form>
        </Layout>
    );
};

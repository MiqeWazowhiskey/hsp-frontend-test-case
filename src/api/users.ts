import axios from "axios";
import {urlGenerator} from "./urlGenerator.ts";
import {User} from "../Model/User.ts";


//response type
interface Response {
    users: User[];
}

//get all
export const fetchUser = async () => {
    try {
        const res = await axios.get<User[]>(urlGenerator( "users"));
        return res.data;
    } catch (error) {
        console.error(error);
    }
}


//get by id
export const fetchUserById = async (id:number) => {
    try {
        const res = await axios.get<User>(urlGenerator( `users/${id}`));
        return res.data;
    } catch (error) {
        console.error(error);
    }
}

//delete
export const deleteUser = async (ids:number[]) => {
    const deletePromises = ids.map(async (val) => {
        return await axios.delete<Response>(
            urlGenerator(`users/${val}` )
        );
    });
    try {
        await Promise.all(deletePromises).then(r => r);
    }
    catch (error) {
        console.error(error);
    }
}

//put
export const updateUser = async (id: number,user: User) => {
    try {
        await axios.put<Response>(
            urlGenerator(`users/${id}`),user
        );
    } catch (error) {
        console.error(error);
    }
}

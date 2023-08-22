import axios from "axios";
import {urlGenerator} from "./urlGenerator.ts";
import {User} from "../Model/User.ts";


interface Response {
    users: User[];
}
export const fetchUser = async () => {
    try {
        const res = await axios.get<User[]>(urlGenerator( "/users"));
        return res.data;
    } catch (error) {
        console.error(error);
    }
}
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

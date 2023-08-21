import axios from "axios";
import {urlGenerator} from "./urlGenerator.ts";
import {User} from "../Model/User.ts";
import {useQuery} from "@tanstack/react-query";


interface Response {
    users: User[];
}
const fetchUser = async () => {
    try {
        return await axios.get<Response>(urlGenerator({"users": ""}, "/data"));
    } catch (error) {
        console.error(error);
    }
}
export function useGetUsers() {
    return useQuery({
        queryKey: ["users"],
        queryFn: fetchUser,
    });
}
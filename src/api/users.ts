import axios from "axios";
import React from "react";
import {urlGenerator} from "./urlGenerator.ts";

interface user {
    id: number;
    name: string;
    username: string;
    email: string;
    registerDate: number;
    totalHour: number;
    address: {
        street: string;
        suite: string;
        city: string;
        zipcode: string;
    };
    phone: string;
    website: string;
    company: {
        name: string;
        catchPhrase: string;
        bs: string;
    };
}
const GetUsers = async () => {
    const [users, setUsers] = React.useState<user[]>([]);
    try {
        const response = await axios.get<user[]>(urlGenerator({"users":""}, "/data"));
        if (response.status === 200) {
            setUsers(response.data);
        }
    } catch (error) {
        console.error(error);
    }

    return users;
}

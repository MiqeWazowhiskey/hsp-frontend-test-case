import axios from "axios";
import React, {useEffect} from "react";
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
export const GetUsers = () => {
    const [users, setUsers] = React.useState<user[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get<user[]>(urlGenerator({"users":""}, "/data"));
                if (response.status === 200) {
                    setUsers(response.data);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);
    return users;
}
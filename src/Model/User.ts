export interface User {
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
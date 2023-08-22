import * as Yup from 'yup';

export const userSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    username: Yup.string().required('Username is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    registerDate: Yup.date().required('Register Date is required'),
    totalHour: Yup.number().required('Total Hour is required'),
    address: Yup.object().shape({
        street: Yup.string().required('Street is required'),
        suite: Yup.string().required('Suite is required'),
        city: Yup.string().required('City is required'),
        zipcode: Yup.string().required('Zipcode is required'),
    }),
    phone: Yup.string().required('Phone is required'),
    website: Yup.string().required('Website is required'),
    company: Yup.object().shape({
        name: Yup.string().required('Company Name is required'),
        catchPhrase: Yup.string().required('Catch Phrase is required'),
        bs: Yup.string().required('BS is required'),
    }),
});


import { Alert, Button, Input, Option, Typography } from '@material-tailwind/react'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import React, { useState } from 'react'
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { ApiResponse, createUser } from '../api';

interface FormData {
    full_name: string;
    contact_number: string;
    email: string;
    day: string;
    month: string;
    year: string;
    password: string;
    confirm_password: string;
}

const schema = yup.object({
    full_name: yup
        .string()
        .required("Full Name is required")
        .matches(/^[A-Za-z ]+$/, "Full Name must not contain symbols"),
    contact_number: yup
        .string()
        .required("Contact Number is required")
        .matches(
            /^(\+1\s?)?(\(\d{3}\)|\d{3})[-.\s]?\d{3}[-.\s]?\d{4}$/,
            "Must be a valid Canadian phone number"
        ),
    email: yup.string().required("Email is required").email("Sorry, this email address is not valid. Please try again."),
    day: yup.string().required("Day is required"),
    month: yup.string().required("Month is required"),
    year: yup
        .string()
        .required("Year is required")
        .matches(/^\d{4}$/, "Year must be valid")
        .test("isPast", "Year must be a past date", (value) => {
            return new Date(`${value}-01-01`) < new Date();
        }),
    password: yup
        .string()
        .required("Password is required"),
    // .matches(/[A-Z]/, "Must contain at least one uppercase letter")
    // .matches(/[a-z]/, "Must contain at least one lowercase letter")
    // .matches(/[0-9]/, "Must contain at least one number"),
    // .min(8, "Password must be at least 8 characters long"),
    confirm_password: yup
        .string()
        .required("Confirm Password is required")
        .oneOf([yup.ref("password")], "Password and Confirm Password must match"),
});

const RegistrationForm: React.FC = () => {

    const [apiResponse, setApiResponse] = useState<ApiResponse | null>(true);


    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: yupResolver(schema),
    });

    console.log('errors->', errors)

    const onSubmit = async (data: FormData) => {
        const date_of_birth = `${data.day}-${data.month}-${data.year}`;
        const payload = {
            full_name: data.full_name,
            contact_number: data.contact_number,
            email: data.email,
            date_of_birth: date_of_birth,
            password: data.password,
        };
        const response = await createUser(payload);
        setApiResponse(response);
        console.log('payload->', payload)
    }

    return (
        <>

            {/* <Alert
                className={`absolute w-[27rem] ${apiResponse?.title === "Success" ? "bg-green-700" : "bg-red-700"}`}
            >
                <p>{apiResponse?.description || 'Hello'}</p>
            </Alert> */}
            <div className="min-h-screen flex font-lato mt-12 justify-center">
                {
                    apiResponse &&
                    <Alert className={`absolute md:right-10 lg:right-20 w-[27rem] ${apiResponse.title == "Success" ? "bg-[#CDFADC]" : "bg-[#FFC0C0]"}`}>{apiResponse?.description}</Alert>
                }
                <form onSubmit={handleSubmit(onSubmit)} className='max-w-lg w-full'>
                    <h1 className="pl-7 sm:pl-0 text-xl font-semibold text-gray-800 mb-4">Create Your Account</h1>
                    {/* {apiResponse && ( */}
                    {/* )} */}
                    <div className='shadow-[0_4px_30px_0px_#00000014] rounded-lg p-7 sm:p-10'>
                        <div className="flex flex-col gap-4">
                            <div className='flex flex-col gap-2'>
                                <Typography variant="paragraph" className="text-input-label text-[16px] font-bold">
                                    Full Name
                                </Typography>
                                <Input
                                    error={errors?.full_name ? true : undefined}
                                    {...register("full_name")}
                                    size="lg"
                                    variant='outlined'
                                    label='Full Name'
                                    placeholder="Full Name"
                                    required
                                />
                                <Typography
                                    variant="small"
                                    color="red"
                                    className="flex items-center font-normal text-xs"
                                >
                                    {errors?.full_name?.message}
                                </Typography>
                            </div>
                            <div className='flex flex-col gap-2'>
                                <Typography variant="paragraph" className="text-input-label text-[16px] font-bold">
                                    Contact Number
                                </Typography>
                                <Input
                                    size="lg"
                                    error={errors?.contact_number ? true : undefined}
                                    {...register("contact_number")}
                                    variant='outlined'
                                    label='Contact Number'
                                    placeholder="Contact Number"
                                    required
                                />
                                <Typography
                                    variant="small"
                                    color="red"
                                    className="flex items-center font-normal text-xs"
                                >
                                    {errors?.contact_number?.message}
                                </Typography>
                            </div>
                            <div className='flex flex-col gap-2'>
                                <Typography variant="paragraph" className="text-input-label text-[16px] font-bold">
                                    Birth Date
                                </Typography>
                                <div className="flex flex-row gap-6">
                                    <select
                                        {...register("day")}
                                        className={`col-start-1 h-11 w-full row-start-1 rounded-md bg-white py-1.5 pl-3 pr-8 text-base outline outline-1 -outline-offset-1 ${errors?.day?.message ? 'outline-red-500' : 'outline-blue-gray-200'} focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-black sm:text-sm/6`}
                                    >
                                        <option value="">Day *</option>
                                        {
                                            [...Array(31)].map((_, i) => (
                                                <option key={i} value={i + 1 + ""}>
                                                    {i + 1}
                                                </option>
                                            ))
                                        }
                                    </select>
                                    <select
                                        {...register("month")}
                                        className={`col-start-1 h-11 w-full row-start-1 rounded-md bg-white py-1.5 pl-3 pr-8 text-base outline outline-1 -outline-offset-1 ${errors?.month?.message ? 'outline-red-500' : 'outline-blue-gray-200'} focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-black sm:text-sm/6`}
                                    >
                                        <option value="">Month *</option>
                                        {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map(
                                            (month, index) => (
                                                <option key={index} value={month}>
                                                    {month}
                                                </option>
                                            )
                                        )}
                                    </select>
                                    <select
                                        {...register("year")}
                                        className={`col-start-1 h-11 w-full row-start-1 rounded-md bg-white py-1.5 pl-3 pr-8 text-base outline outline-1 -outline-offset-1 ${errors?.year?.message ? 'outline-red-500' : 'outline-blue-gray-200'} focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-black sm:text-sm/6`}
                                    >
                                        <option value="">Year *</option>
                                        {[...Array(100)].map((_, i) => (
                                            <option key={i} value={2024 - i}>
                                                {2024 - i}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <Typography
                                    variant="small"
                                    color="red"
                                    className="flex items-center font-normal text-xs"
                                >
                                    {errors?.day?.message || errors?.month?.message || errors?.year?.message}
                                </Typography>
                            </div>
                            <div className='flex flex-col gap-2'>
                                <Typography variant="paragraph" className="text-input-label text-[16px] font-bold">
                                    Email
                                </Typography>
                                <Input
                                    size="lg"
                                    error={errors?.email ? true : undefined}
                                    {...register("email")}
                                    variant='outlined'
                                    label='Email'
                                    placeholder="Email"
                                    required
                                />
                                <Typography
                                    variant="small"
                                    color="red"
                                    className="flex items-center font-normal text-xs"
                                >
                                    {errors?.email?.message}
                                </Typography>
                            </div>
                            <div className='flex flex-col gap-2'>
                                <Typography variant="paragraph" className="text-input-label text-[16px] font-bold">
                                    Password
                                </Typography>
                                <Input
                                    size="lg"
                                    error={errors?.password ? true : undefined}
                                    type='password'
                                    {...register("password")}
                                    variant='outlined'
                                    label='Password'
                                    placeholder="Password"
                                    required
                                />
                                <Typography
                                    variant="small"
                                    color="red"
                                    className="flex items-center font-normal text-xs"
                                >
                                    {errors?.password?.message}
                                </Typography>
                            </div>
                            <div className='flex flex-col gap-2'>
                                <Typography variant="paragraph" className="text-input-label text-[16px] font-bold">
                                    Confirm Password
                                </Typography>
                                <Input
                                    size="lg"
                                    error={errors?.confirm_password ? true : undefined}
                                    type='password'
                                    {...register("confirm_password")}
                                    variant='outlined'
                                    label='Confirm Password'
                                    placeholder="Confirm Password"
                                    required
                                />
                                <Typography
                                    variant="small"
                                    color="red"
                                    className="flex items-center font-normal text-xs"
                                >
                                    {errors?.confirm_password?.message}
                                </Typography>
                            </div>
                        </div>
                    </div>
                    <div className='flex justify-center items-center mt-11 gap-4'>
                        <Button variant='outlined' className='border-primary w-36 text-primary capitalize font-lato font-bold text-md' type='submit'>Cancel</Button>
                        <Button className='bg-primary w-36 capitalize font-lato font-bold text-md' type='submit'>Submit</Button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default RegistrationForm
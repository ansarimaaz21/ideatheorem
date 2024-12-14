import { Button, Input, Option, Typography } from '@material-tailwind/react'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import React, { useState } from 'react'
import Select from 'react-tailwindcss-select';

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
    // day: yup.string().required("Day is required"),
    // month: yup.string().required("Month is required"),
    // year: yup
    //     .string()
    //     .required("Year is required")
    //     .matches(/^\d{4}$/, "Year must be valid")
    //     .test("isPast", "Year must be a past date", (value) => {
    //         return new Date(`${value}-01-01`) < new Date();
    //     }),
    password: yup
        .string()
        .required("Password is required")
        .matches(/[A-Z]/, "Must contain at least one uppercase letter")
        .matches(/[a-z]/, "Must contain at least one lowercase letter")
        .matches(/[0-9]/, "Must contain at least one number")
        .min(8, "Password must be at least 8 characters long"),
    confirm_password: yup
        .string()
        .required("Confirm Password is required")
        .oneOf([yup.ref("password")], "Password and Confirm Password must match"),
});

const RegistrationForm: React.FC = () => {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: yupResolver(schema),
    });

    console.log('errors->', errors)

    const onSubmit = async (data) => {
        const date_of_birth = `${data.day}-${data.month}-${data.year}`;
        const payload = {
            full_name: data.full_name,
            contact_number: data.contact_number,
            email: data.email,
            date_of_birth: date_of_birth,
            password: data.password,
        };
        console.log('payload->', payload)
    }

    const options = [
        { value: "fox", label: "🦊 Fox" },
        { value: "Butterfly", label: "🦋 Butterfly" },
        { value: "Honeybee", label: "🐝 Honeybee" }
    ];

    const [animal, setAnimal] = useState(null);

    const handleChange = value => {
        console.log("value:", value);
        setAnimal(value);
    };

    return (
        <div className="min-h-screen flex font-lato mt-12 justify-center">
            <div className='max-w-lg w-full'>
                <h1 className="pl-7 sm:pl-0 text-xl font-semibold text-gray-800 mb-4">Create Your Account</h1>
                <form onSubmit={handleSubmit(onSubmit)} className='shadow-[0_4px_30px_0px_#00000014] rounded-lg p-7 sm:p-10'>
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
                            <div className="flex flex-row">
                                {/* <div className=""> */}
                                {/* <Select size='lg' label="Day" className=''>
                                        {
                                            [...Array(31)].map((_, i) => (
                                                <Option key={i} value={i + 1 + ""}>
                                                    {i + 1}
                                                </Option>
                                            ))
                                        }
                                    </Select> */}
                                <select
                                    id="country"
                                    name="country"
                                    autoComplete="country-name"
                                    className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                >
                                    <option>United States</option>
                                    <option>Canada</option>
                                    <option>Mexico</option>
                                </select>
                                {/* <ChevronDownIcon
                                    aria-hidden="true"
                                    className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                                /> */}
                                {/* </div> */}
                                {/* </div> */}
                                {/* <div className="min-w-2">
                                    <Select label="Day" className=''>
                                        {
                                            [...Array(31)].map((_, i) => (
                                                <Option key={i} value={i + 1 + ""}>
                                                    {i + 1}
                                                </Option>
                                            ))
                                        }
                                    </Select>
                                </div>
                                <div className="min-w-2">
                                    <Select label="Day" className=''>
                                        {
                                            [...Array(31)].map((_, i) => (
                                                <Option key={i} value={i + 1 + ""}>
                                                    {i + 1}
                                                </Option>
                                            ))
                                        }
                                    </Select>
                                </div> */}
                                {/* <div className="w-32">
                                    <Select label="Day">
                                        {
                                            [...Array(31)].map((_, i) => (
                                                <Option key={i} value={i + 1 + ""}>
                                                    {i + 1}
                                                </Option>
                                            ))
                                        }
                                    </Select>
                                </div>
                                <div className="w-32">
                                    <Select label="Day">
                                        {
                                            [...Array(31)].map((_, i) => (
                                                <Option key={i} value={i + 1 + ""}>
                                                    {i + 1}
                                                </Option>
                                            ))
                                        }
                                    </Select>
                                </div> */}
                            </div>
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
                            <Button type='submit'>Submit</Button>
                        </div>
                    </div>
                </form>
            </div >
        </div >
    )
}

export default RegistrationForm
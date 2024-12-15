import axios from "axios";

export interface UserPayload {
    full_name: string;
    contact_number: string;
    email: string;
    date_of_birth: string;
    password: string;
}

export interface ApiResponse {
    dev_message: string,
    title: string;
    description: string;
}

export const createUser = async (payload: UserPayload): Promise<ApiResponse> => {
    try {
        const response = await axios.post<ApiResponse>(
            "https://fullstack-test-navy.vercel.app/api/users/create",
            payload
        );
        return response.data;
    } catch (error: any) {
        return {
            dev_message: "error",
            title: "Error",
            description: error?.response?.data?.description || "Something went wrong.",
        };
    }
};

import axiosRequest from "../axios/axios_interceptors";


export const GET_APIS = async (url: string, token: string) => {
        let response = await axiosRequest.post(`admin/${url}`,"",
            {
                headers: {
                    'Authorization': `Bearer ${token}`}
            });
        let res = response?.data;
        return res;
};

export const LOGIN_APIS = async (url: string, data: string) => {
        let response = await axiosRequest.post(`admin/${url}`, data);
        let res = response?.data;
        return res;
};

export const POSTAPIS_WITH_AUTH = async (url: string, data: string, token?: string) => {
        let response = await axiosRequest.post(`admin/${url}`, data, {
            headers:
            {
                'Authorization': `Bearer ${token}`
            }
        });
        let res = response?.data;
        return res;
};



import axios from "axios";
import { useFetchUserData } from "../utilities/userDataHook";

// const baseUrl = "http://ec2-3-109-68-73.ap-south-1.compute.amazonaws.com:8889/";
export const baseUrl = "http://localhost:8889/";
export const REACT_APP_SITE_KEY = "6LfV4VEnAAAAAOOh8h0apgx7KfDh1q7rlzf26Hw-";
export const APP_SECRET_KEY = "6LfV4VEnAAAAAMp8DlhiznIdU9u9QEwAQtE1I6k6";

axios.defaults.withCredentials = true;

export const GET_APIS = async (url: string, token: string) => {
    try {
        let response = await axios.post(`${baseUrl}admin/${url}`, "",
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'X-Frame': 'SAMEORIGIN',
                    'X-XSS-Protection': '1; mode=block',
                    'X-Content-Type-Options': 'nosniff',
                    'Strict-Transport-Security': 'max-age=63072000; includeSubdomains; preload',
                }
            });
        let res = response?.data;
        return res;
    } catch (e: any) {
        return e;
    };
};

export const LOGIN_APIS = async (url: string, data: string) => {
    try {
        let response = await axios.post(`${baseUrl}admin/${url}`, data);
        let res = response?.data;
        return res;
    } catch (e: any) {
        return e;
    }
};

export const POSTAPIS_WITH_AUTH = async (url: string, data: string, token?: string) => {
    try {
        let response = await axios.post(`${baseUrl}admin/${url}`, data, {
            headers:
            {
                'Authorization': `Bearer ${token}`,
                'X-Frame': 'SAMEORIGIN',
                'X-XSS-Protection': '1; mode=block',
                'X-Content-Type-Options': 'nosniff',
                'Strict-Transport-Security': 'max-age=63072000; includeSubdomains; preload',
                'Content-Type': 'application/json; charset=utf-8'
            }
        });
        let res = response?.data;
        return res;
    } catch (e: any) {
        return e;
    }
};


export const verifyToken = async (token: any) => {
    try {
        let response = await axios.post(`${baseUrl}admin/verify-token`, { token });
        return response.data;
    } catch (e: any) {
        return e;
    }
}

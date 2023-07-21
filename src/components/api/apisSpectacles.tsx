import axios from "axios";
import { LogoutModal } from "../common/logoutModal/logoutModal";

// const baseUrl = "http://ec2-3-109-68-73.ap-south-1.compute.amazonaws.com:8889/";
const baseUrl = "http://localhost:8889/";

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
        throw Error(e);
    };
};

export const LOGIN_APIS = async (url: string, data: string) => {
    try {
        let response = await axios.post(`${baseUrl}admin/${url}`, data);
        let res = response?.data;
        return res;
    } catch (e: any) {
        throw Error(e);
    }
};

export const SESSION_GET_APIS = async (url: string) => {
    try {
        let response = await axios.get(`${baseUrl}${url}`);
        let res = response?.data;
        return res;
    } catch (e: any) {
        throw Error(e);
    }
};
export const POSTAPIS_WITH_AUTH = async (url: string, data: string, token: string) => {
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
        throw Error(e);
    }
};

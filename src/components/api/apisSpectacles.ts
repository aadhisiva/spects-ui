import axios from "axios";

const baseUrl = "http://localhost:8889/";

export const GET_APIS = async (url: string) => {
    try{
        let response = await axios.post(`${baseUrl}admin/${url}`);
        let res = response?.data;
        return res;
    } catch(e){
        return e;
    }
};

export const LOGIN_APIS = async (url: string, data: string) => {
    try{
        let response = await axios.post(`${baseUrl}admin/${url}`, data);
        let res = response?.data;
        return res;
    } catch(e){
        return e;
    }
};

export const DECRYPT_APIS = async (data: string) => {
    try{
        return await axios.post(`${baseUrl}admin/decrypt`, data);
    } catch(e){
        return e;
    }
};
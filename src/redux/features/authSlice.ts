import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ILoginInfo, ILoginIntialState } from "../../type";
import { baseUrl } from "../../api/apisSpectacles";
import {sessionService} from "redux-react-session";

const initialState: ILoginIntialState = {
    user: {success: false},
    isError: false,
    isSuccess: false,
    isOtpVerfity: false,
    isLoading: false,
    message: "",
    isLoginCLick: false
}

export const LoginUser = createAsyncThunk("user/LoginUser", async(user: ILoginInfo, thunkAPI) => {
    try {
        const response = await axios.post(`${baseUrl}admin/login`, user);
        return response.data;
    } catch (error: any) {
        if(error.response){
            const message = error.response.data.msg;
            return thunkAPI.rejectWithValue(message);
        }
    }
});

export const getMe = createAsyncThunk("user/getMe", async(_: string, thunkAPI) => {
    try {
        const response = await axios.get(`${baseUrl}admin/getMe`);
        return response.data;
    } catch (error: any) {
        if(error.response){
            const message = error.response.data.msg;
            return thunkAPI.rejectWithValue(message);
        }
    }
});

export const verifyOTP = createAsyncThunk("user/verifyOtp", async(data: ILoginInfo, thunkAPI) => {
    try {
        const response = await axios.post(`${baseUrl}admin/otp_check`, data);
        sessionService.saveSession(response.data);
        return response.data;
    } catch (error: any) {
        if(error.response){
            const message = error.response.data.msg;
            return thunkAPI.rejectWithValue(message);
        }
    }
});

export const LogOut = createAsyncThunk("user/LogOut", async() => {
    await axios.post(`${baseUrl}admin/logout`);
});

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers:{
        reset: (state) => initialState
    },
    extraReducers:(builder) =>{
        builder.addCase(LoginUser.pending, (state) =>{
        });
        builder.addCase(LoginUser.fulfilled, (state, action) =>{
            state.isLoginCLick = true;
            state.user = action.payload?.data;
        });
        builder.addCase(LoginUser.rejected, (state, action) =>{
            state.message = action.payload;
        })

        // verify Otp
        builder.addCase(verifyOTP.pending, (state) =>{
            state.isLoading = true;
        });
        builder.addCase(verifyOTP.fulfilled, (state, action) =>{
            state.isLoading = false;
            state.isOtpVerfity = true;
            state.user = action.payload;
        });
        builder.addCase(verifyOTP.rejected, (state, action) =>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })

        // Get User Login
        builder.addCase(getMe.pending, (state) =>{
            state.isLoading = true;
        });
        builder.addCase(getMe.fulfilled, (state, action) =>{
            state.isLoading = false;
            state.user = action.payload;
        });
        builder.addCase(getMe.rejected, (state, action) =>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
    }
});

export const {reset} = authSlice.actions;
export default authSlice.reducer;
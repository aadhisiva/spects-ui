import { combineReducers } from "redux";
import authReducer from "../features/authSlice";

export const rootReducers = combineReducers(
    {
        auth: authReducer
    }
);
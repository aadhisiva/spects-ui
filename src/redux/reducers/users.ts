import { INITIATE_LOGIN, LOGIN_SUCCESS, LOGIN_FAILED, VERIFY_OTP_SUCCESS, VERIFY_OTP_FAILED } from "../actionTypes";

const initialState = {
    isUserVerified: false,
    userInfo: {},
    error: {}
};

export default function user(state = initialState, action: any) {
    switch (action.type) {
        case LOGIN_SUCCESS: {
            console.log("user-LOGIN_SUCCESS");
            return { ...state, isUserVerified: true };
        }
        case LOGIN_FAILED:
            return { ...state, error: action.payload };
        case VERIFY_OTP_SUCCESS:
            return { ...state, userInfo: action.payload };
        case VERIFY_OTP_FAILED:
            return { ...state, error: action.payload };
        default:
            return state;
    }
}

export function test(state = initialState, action: any) {
    switch (action.type) {
        case LOGIN_SUCCESS: {
            console.log("test-LOGIN_SUCCESS");
            return { ...state, error: action.payload };
        }
        default:
            return state;
    }
}

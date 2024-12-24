import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CounterState {
    RoleName?: string;
    RoleId?: string;
    Mobile?: string;
    Access?: any;
    useAuth?: boolean;
}

const initialState: CounterState = {
    RoleName: "",
    RoleId: "",
    Mobile: "",
    Access: {},
    useAuth: false
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        userLoggedIn: (state, action: PayloadAction<any>) => {
            const {RoleName, Mobile, Access, RoleId} = action.payload;
            state.RoleName = RoleName;
            state.RoleId = RoleId;
            state.Mobile = Mobile;
            state.Access = Access;
            state.useAuth = true;
        },
        userLoggedOut: (state) => {
            state.RoleName = "";
            state.RoleId = "";
            state.Mobile = "";
            state.Access = {};
            state.useAuth = false;
        }
    },
});

export const { userLoggedIn, userLoggedOut } = userSlice.actions;
export default userSlice.reducer;

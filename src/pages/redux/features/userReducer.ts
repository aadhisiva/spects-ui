import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CounterState {
    RoleName?: string;
    RoleId?: string;
    Mobile?: string;
    UserId?: string;
    Token?: string;
    Access?: any;
    useAuth?: boolean;
    sidebarShow: boolean,
    sidebarUnfoldable: boolean,
    theme: string,
}

const initialState: CounterState = {
    RoleName: "",
    RoleId: "",
    Mobile: "",
    UserId: "",
    Token: "",
    Access: {},
    useAuth: false,
    sidebarShow: true,
    sidebarUnfoldable: false,
    theme: 'light',
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        userLoggedIn: (state, action: PayloadAction<any>) => {
            const {RoleName, Mobile, Access, RoleId, UserId, Token} = action.payload;
            state.RoleName = RoleName;
            state.RoleId = RoleId;
            state.Mobile = Mobile;
            state.UserId = UserId;
            state.Token = Token;
            state.Access = Access;
            state.useAuth = true;
            state.sidebarShow = true;
            state.sidebarUnfoldable = false;
        },
        userLoggedOut: (state) => {
            state.RoleName = "";
            state.RoleId = "";
            state.Mobile = "";
            state.UserId = "";
            state.Token = "";
            state.Access = {};
            state.useAuth = false;
            state.sidebarShow = true;
            state.sidebarUnfoldable = false;
        },
        sideBarOpen : (state, action: PayloadAction<any>) => {
            state.sidebarShow = action.payload;
        },
        sideBarUnfoldableOpen : (state, action: PayloadAction<any>) => {
            state.sidebarUnfoldable = action.payload;
        }
    },
});

export const { userLoggedIn, userLoggedOut, sideBarOpen, sideBarUnfoldableOpen } = userSlice.actions;
export default userSlice.reducer;

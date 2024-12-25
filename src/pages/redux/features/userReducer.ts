import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CounterState {
    RoleName?: string;
    RoleId?: string;
    Mobile?: string;
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
            const {RoleName, Mobile, Access, RoleId} = action.payload;
            state.RoleName = RoleName;
            state.RoleId = RoleId;
            state.Mobile = Mobile;
            state.Access = Access;
            state.useAuth = true;
            state.sidebarShow = true;
            state.sidebarUnfoldable = false;
        },
        userLoggedOut: (state) => {
            state.RoleName = "";
            state.RoleId = "";
            state.Mobile = "";
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

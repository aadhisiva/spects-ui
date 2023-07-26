import { AnyAction, configureStore } from '@reduxjs/toolkit';
import authReducer from "../redux/features/authSlice";
import { Dispatch } from 'react';
import { sessionReducer, sessionService } from 'redux-react-session';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    session: sessionReducer
  },
});
export default store;

export const dispatchStore = store.dispatch as typeof store.dispatch | Dispatch<AnyAction>
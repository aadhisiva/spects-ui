import { Dispatch } from 'react';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { AnyAction, configureStore} from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist'
import { rootReducers } from './reducers';
import thunk from 'redux-thunk';

const persistConfig = {
  key: 'root',
  storage,
};


const persistedReducer = persistReducer(persistConfig, rootReducers);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk],
});
export default store;

export const dispatchStore = store.dispatch as typeof store.dispatch | Dispatch<AnyAction>
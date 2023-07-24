// the concept of the reducers is to interact our store ,and change when we need it
import { combineReducers } from "redux";
import user from "./users";

//session
import { sessionReducer } from "redux-react-session";
import { RESET_APP } from "../actionTypes";

const appReducer = combineReducers({
    session: sessionReducer,
    user,
});

const rootReducer = (state: any, action: any) => {
    // Clear all data in redux store to initial.
    if (action.type === RESET_APP)
        state = undefined;

    return appReducer(state, action);
};

export default rootReducer;

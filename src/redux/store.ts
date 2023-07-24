import { legacy_createStore as createStore, applyMiddleware, Dispatch } from "redux";
import thunk from 'redux-thunk';
import rootReducer from './reducers'
import { sessionService } from "redux-react-session";
import { composeWithDevTools } from "redux-devtools-extension";


const middleware = [thunk];
const initialState = {}

const store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

const sessionServiceOptions = {
    driver: "COOKIES",
    validateSession: (session: any) => {
        console.log("##session: ", session);
        // return api.invokeRemoteSessionValidationThroughAxios(session).then(response => response.isSessionValid);
        // sessionService.deleteSession()
        // return false;
        return session ? true : false;
    },
    refreshOnCheckAuth: true,
    expires: 1000 * 60 * 1, // milliseconds * seconds * minutes * hours * days
    redirectPath: "/signin",
}

sessionService.initSessionService(store, sessionServiceOptions)
    .then(() => console.log('Redux React Session is ready and a session was refreshed from your storage'))
    .catch(() => console.log('Redux React Session is ready and there is no session in your storage'));

export default store
export const dispatchStore = store.dispatch as typeof store.dispatch | Dispatch<any>
export type IStoreType = ReturnType<typeof rootReducer>;
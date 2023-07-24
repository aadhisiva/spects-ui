import { Dispatch, useEffect, useState } from "react";
import axios from "axios";
import { sessionService } from "redux-react-session";
import { ILoginInfo } from "../../type";
import {AnyAction} from "redux";
import {
    INITIATE_LOGIN,
    LOGIN_FAILED,
    LOGIN_SUCCESS,
    VERIFY_OTP,
    VERIFY_OTP_SUCCESS,
    VERIFY_OTP_FAILED
} from "../actionTypes";
import { NotificationError, NotificationSuccess } from "../../components/common/Notifications/Notifications";
//api
import { baseUrl } from "../../api/apisSpectacles";

//------------explanations for me-------------------
//setSubmitting (false)-finishing the cycle
//values -values that user enter
//history -redirect the user tu user page history = useHistory();
//setFieldError -errors
//------------end-------------------

export const loginUser = (values: ILoginInfo) => {
    //values from
    return (dispatch: Dispatch<AnyAction>) => {
        dispatch({
            type: INITIATE_LOGIN
        });

        axios.post(`${baseUrl}admin/login`, values)
            .then((response) => {
                console.log("data here => 0", response);
                const { data } = response;
                if (data?.code !== 200) {
                    NotificationError(data?.message);
                } else {

                    dispatch({
                        type: LOGIN_SUCCESS,
                        payload: data
                    });
                    NotificationSuccess(data?.message);
                }
                
            })
            .catch((err) => {
                console.error(err);
                dispatch({
                    type: LOGIN_FAILED,
                    payload: err
                })
            });
        //complete submission
    };
};

export type TLoginUser = typeof loginUser;

export const verifyOTP = (values: ILoginInfo, navigate: () => void) => {
    //values from
    return (dispatch: Dispatch<AnyAction>) => {
        dispatch({
            type: VERIFY_OTP
        });

        axios.post(`${baseUrl}admin/otp_check`, values)
            .then((response) => {
                // console.log("data here => 0", response.data);
                const { data } = response;
                if(data.code !== 200){
                    NotificationSuccess(data?.message);
                    return;
                }
                sessionService
                    .saveSession(data?.data?.token)
                    .then(() => {
                        sessionService
                            .saveUser(data?.data)
                            .then(() => {
                                dispatch({
                                    type: VERIFY_OTP_SUCCESS,
                                    payload: data?.data
                                })
                                NotificationSuccess(data?.message);
                                console.log("data here => 0", response.data, navigate);
                                navigate();
                            })
                            .catch((err) => console.error(err));
                    }).catch((err) => console.error(err));
            })
            .catch((err) => {
                console.error(err);
                dispatch({
                    type: VERIFY_OTP_FAILED,
                    payload: err
                })
            });
        //complete submission
    };
};

//
// export const signupUser = (
//     // credentials,
//     // history,
//     // setFieldError,
//     // setSubmitting
// ) => {
//     return async (dispatch) => {
//         // const response = await axios.get(
//         //     url,
//         //     credentials,
//         //     {
//         //         headers: {
//         //             "Content-Type": "application/json",
//         //         },
//         //     },
//         // );
//         //
//         // const {data} = response;
//         // console.log("here : .>", data.status);
//         //
//         // if (data.status === 400) {
//         //     const {message} = data;
//         //     if (message.includes("Email")) {
//         //         setFieldError("email", message);
//         //     }
//         //     //complete submission
//         //     setSubmitting(false);
//         // } else if (data.status === 200) {
//         //     //login user after signup
//         //     const {email, password} = credentials;
//         //     console.log("from signup=>", email, password);
//         //
//         //     dispatch(
//         //         loginUser(
//         //             {email, password},
//         //             history,
//         //             setFieldError,
//         //             setSubmitting,
//         //         ),
//         //     );
//         // }
//     };
// };

// export const Userinfo = () => {
//     const [apiData, setApiData] = useState([]);

//     // an alternative for componentDidMount
//     useEffect(() => {
//         axios
//             .get("https://jsonplaceholder.typicode.com/users")
//             .then((json_result) => setApiData(json_result.data))
//             // or
//             //.then(json_result => handleState(json_result.data))
//             .catch((error) => console.log(error));
//     }, []); // an empty array dependency (makes the useEffect to run only once, to avoid infinite loop)

//     return (
//         <div>
//             {/*{apiData.map((item) => {*/}
//             {/*    return <div key={item.id}>{item.name}</div>;*/}
//             {/*})}*/}
//         </div>
//     );
// };

// export const logoutUser = (history) => {
//     return () => {
//         sessionService.deleteSession();
//         sessionService.deleteUser();
//         history.push("/");
//     };
// };

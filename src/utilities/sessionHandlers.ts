import { sessionService } from "redux-react-session";
// import moment from "moment";
type Timeout = ReturnType<typeof setTimeout>

let timer: Timeout;

// export const SESSION_TIME_OUT = 1000 * 60 * 0.5; // milliseconds[[1-1000]] * seconds[1-60] * minutes[1-60] * hours[1-24] * days[any-number]
export const SESSION_TIME_OUT = 1000 * 60 * 10; // milliseconds[[1-1000]] * seconds[1-60] * minutes[1-60] * hours[1-24] * days[any-number]
export const clearSession = () => {
    sessionService.deleteSession();
    sessionService.deleteUser();
}

export const readSessionKey = async () => {
    const sessionInfo = await sessionService.loadUser();
    return sessionInfo || null;
}

// export const calculateRemainActiveTime = (timers: number ) => {

// }

// export const startTimer = (timeOut: number) => {
//     if (timer) {
//         clearTimeout(timer)
//     }
//     timer = setTimeout(() => {

//         sessionService.
//         const diff = moment.duration(moment().diff(moment(lastInteractionTime)));
//         let timeOutInterval = props.timeOutInterval ? props.timeOutInterval : 6000;
//         if (isLogout) {
//             clearTimeout(timer)
//         } else {
//             if (diff._milliseconds < timeOutInterval) {
//                 startTimer();
//                 props.onActive();
//             } else {
//                 props.onIdle();
//                 setShowModal(true)
//             }
//         }

//     }, props.timeOutInterval ? props.timeOutInterval : 6000)
// }
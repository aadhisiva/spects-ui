import { notification } from 'antd'

export const NotificationSuccess = (message: string) => notification.success({
    message: message,
    duration: 3
});
export const NotificationError = (message: string) => notification.error({
    message: message,
    duration: 3
});
export const NotificationInfo = (message: string) => notification.info({
    message: message,
    duration: 3
});
export const NotificationWarning = (message: string) => notification.warning({
    message: message,
    duration: 3
});

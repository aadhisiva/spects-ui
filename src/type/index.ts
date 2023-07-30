export interface ILoginInfo {
    mobile_number: string,
    type: string,
    otp?: string,
}

export interface ILoginIntialState {
    user: any | null,
    isError: boolean,
    isSuccess: boolean,
    isLoading: boolean,
    message: string | unknown,
    isLoginCLick: boolean,
    isOtpVerfity: boolean,
    loginTime: any
};

export interface IStateValues {
    auth: object
  }

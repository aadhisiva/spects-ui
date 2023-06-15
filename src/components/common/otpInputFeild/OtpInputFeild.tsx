import React from 'react'
import { Form, Input } from "antd";

type InputFeildI = {
    type: string,
    tabIndex: number,
    onChange: (e: any) => void,
    onKeyUp: (e: any) => void,
    name: string,
    autoComplete: string,
    value: string | number,
    maxLength: number,
}
export const OtpInputFeild: React.FC<InputFeildI> = ({
    type,
    tabIndex,
    onChange,
    name,
    autoComplete,
    value,
    maxLength,
    onKeyUp,
}) => {
    return (
        <div>
            <Input
                type={type}
                maxLength={maxLength}
                onKeyUp={onKeyUp}
                tabIndex={tabIndex}
                onChange={onChange}
                name={name}
                autoComplete={autoComplete}
                value={value}
            />
        </div>
    )
};



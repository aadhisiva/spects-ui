import React from 'react'
import { Form, Input } from "antd";

type InputFeildI = {
    type?: string,
    tabIndex?: number,
    onChange?: any,
    name?: string,
    label?: string,
    value?: string,
    disabled?: boolean
    required?: boolean
}
export const ReUseInputFeild: React.FC<InputFeildI> = ({
    type,
    tabIndex,
    onChange,
    name,
    label,
    value,
    disabled,
    required
}) => {
    return (
        <div>
            <Form.Item
                label={label}
                name={name}
                rules={required ? [{ required: true, message: `Please input your ${label}!` }]: []}
            >
                <Input
                    type={type? type : "text"}
                    tabIndex={tabIndex}
                    onChange={onChange}
                    name={name}
                    value={value}
                    disabled={disabled}
                />
            </Form.Item>
        </div>
    )
};



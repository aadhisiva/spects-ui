import React from 'react'
import { Form, Input } from "antd";

type InputFeildI = {
    type: string,
    tabIndex: number,
    onChange: any,
    name: string,
    autoComplete: string,
    label: string,
    value: string,
}
export const InputFeild: React.FC<InputFeildI> = ({
    type,
    tabIndex,
    onChange,
    name,
    autoComplete,
    label,
    value
}) => {
    return (
        <div>
            <Form.Item
                labelCol={{ span: 10 }}
                wrapperCol={{ span: 12 }}
                label={label}
                name={name}
                rules={[{ required: true, message: 'Please input your Role!' }]}
            >
                <Input
                    type={type}
                    tabIndex={tabIndex}
                    onChange={onChange}
                    name={name}
                    autoComplete={autoComplete}
                    value={value}
                />
            </Form.Item>
        </div>
    )
};



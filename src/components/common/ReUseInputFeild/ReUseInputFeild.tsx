import React from 'react'
import { Form, Image, Input } from "antd";

type InputFeildI = {
    type?: string,
    tabIndex?: number,
    onChange?: any,
    name?: string,
    label?: string,
    value?: string | any,
    disabled?: boolean
    required?: boolean,
    readOnly?: boolean,
    regex?: boolean
    expression?: any
    image?: boolean
    imageValue?: string,
};

export const ReUseInputFeild: React.FC<InputFeildI> = ({
    type,
    tabIndex,
    onChange,
    name,
    label,
    value,
    disabled,
    required,
    regex,
    expression,
    image,
    imageValue,
    readOnly= false
}) => {

    const rulesFunction = () => {
        if(name == 'refractionist_name' || name == 'name'){
            return [
                {
                required: true,
                message: `${label} is required`,
            },{
                pattern: /^[A-Za-z\s]*$/,
                message: `Please enter a valid ${label}`,
            }]
        } else if(name == 'refractionist_mobile' || name == 'mobile_number'){
            return [
                {
                required: true,
                message: `${label} is required`,
            },{
                pattern: /^[0-9|null]{1,10}$/,
                message: `Please enter a valid ${label}`,
            }]
        } else {
            let exres = /^[A-Za-z0-9()\s]*$/.test(value) !== true;
            return exres ? [
                {
                pattern: /^[A-Za-z0-9()\s]*$/,
                message: `Please enter a valid ${label}`,
            }] : []
        }
    }
    return (
        <div>
            <Form.Item
                label={label}
                name={name}
                rules={rulesFunction()}
            >
                {!image &&
                <Input
                    readOnly={readOnly}
                    type={type? type : "text"}
                    tabIndex={tabIndex}
                    onChange={onChange}
                    name={name}
                    value={value}
                    disabled={disabled}
                />
                }
                {image && <Image preview={false} src={`data:image/png;base64,${imageValue}`} alt='Applicant Image' height={300} width={300} />}
            </Form.Item>
        </div>
    )
};



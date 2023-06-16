import React from 'react'
import { Form, Select } from 'antd';
import { Option } from 'antd/es/mentions';
import classNames from 'classnames';
import styles from "./SelectItems.module.scss";

type SelectTypesI = {
    placeholder?: string,
    onChange?: (e: any) => void,
    name?: NamedCurve,
    hasFeedback?: boolean,
    selectItems?: string[]
}

export const SelectItems: React.FC<SelectTypesI> = ({
    placeholder,
    onChange,
    name,
    hasFeedback,
    selectItems
}) => {
    return (
        <div className={classNames(styles.selectTypesPage, "selectType-page")}>
            <div className={styles.selecttypes}>
                <Form.Item name={name}
                    hasFeedback={hasFeedback}
                    validateStatus="success"
                    rules={[{ required: true }]}
                >
                    <Select
                        placeholder={placeholder}
                        onChange={onChange}
                    // defaultValue={"----Select----"}
                    >
                        <Option value="">----Select----</Option>
                        {selectItems?.map((obj, i) => (
                            <Option key={String(i)} value={`${obj}`}>{obj}</Option>
                        ))}
                    </Select>
                </Form.Item>
            </div>
        </div>
    );
};


import React from 'react'
import { Form, Select } from 'antd';
import { Option } from 'antd/es/mentions';
import classNames from 'classnames';
import styles from "./SelectItems.module.scss";
import { useLocale } from 'antd/es/locale';
import { useLocation } from 'react-router';

type SelectTypesI = {
    placeholder?: string,
    onChange?: (e: any) => void,
    name?: NamedCurve,
    hasFeedback?: boolean,
    selectItems?: any[],
    disabled?: boolean
}

export const SelectItems: React.FC<SelectTypesI> = ({
    placeholder,
    onChange,
    name,
    hasFeedback,
    selectItems,
    disabled
}) => {
    const location = useLocation();

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
                        disabled={disabled}
                    // defaultValue={"----Select----"}
                    >
                        {location.pathname == "/reports-list"? (
                            <>
                            <Option value="">----Select----</Option>
                            {(selectItems || [])?.map((obj, i) => (
                                <Option key={String(i)} value={obj}>{obj}</Option>
                            ))}
                            </>
                            ): (
                                <>
                                <Option value="">----Select----</Option>
                                {(selectItems || [])?.map((obj, i) => (
                                    <Option key={String(i)} value={`${obj.option}`}>{obj.option.replace(/\W/g, "").replace(/\d/g, "")}</Option>
                                ))}
                                </>
                            )}
                    </Select>
                </Form.Item>
            </div>
        </div>
    );
};
// .replace(/\W/g, "").replace(/\d/g, "")

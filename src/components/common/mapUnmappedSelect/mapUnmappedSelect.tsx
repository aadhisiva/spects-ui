import React, { useState } from 'react'
import styles from "./mapUnmappedSelect.module.scss";
import classNames from 'classnames';
// import "./SelectItems.custom.scss";
import { Col, Select } from 'antd';

type ImapUnmappedSelect = {
    handleChange?: (v: any) => void;
    value?: any;
    count?: any
}

const MapUnmappedSelect: React.FC<ImapUnmappedSelect> = ({
    handleChange,
    value,
    count
}) => {

    return (
        <div className={classNames(styles.selectTypesPage, "selectType-page")}>
                <Select
                    defaultValue="all"
                    value={value}
                    style={{ width: 150 }}
                    onChange={handleChange}
                    options={[
                        { value: "all", label: 'Select All' },
                        { value: 'mapped', label: 'Assigned' },
                        { value: 'unMapped', label: 'UnAssigned' },
                    ]}
                />{" "}
                <span style={{ fontSize: '15px', fontWeight: 'bold'}}>
                : {(value == 'mapped' || value == "unMapped")? count : 0}
                </span>
        </div>
    )
}

export default MapUnmappedSelect;

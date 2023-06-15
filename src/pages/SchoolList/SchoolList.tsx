import React, { useState } from 'react';
import { Button, Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import styles from "./SchoolList.module.scss";
import classNames from "classnames";
import "./SchoolList.custom.scss";
import { useNavigate } from 'react-router';
import { TitleBarComponent } from '../../components/common/titleBar';

interface DataType {
    key: string,
    school_name: string;
    school_address: string;
    email: string;
    contact_number: string;
};

const columns: ColumnsType<DataType> = [
    {
        title: 'School Name',
        dataIndex: 'school_name',
        key: 'school_name',
    },
    {
        title: 'School Address',
        dataIndex: 'school_address',
        key: 'school_address',
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: 'Contact Number',
        dataIndex: 'contact_number',
        key: 'contact_number',
    },
    {
        title: 'Action',
        key: 'action',
        render: () => (
            <Button type='primary'>
                View
            </Button>
        )
    },
];

const originData: DataType[] = [];
for (let i = 0; i < 20; i++) {
  originData.push({
    key: i.toString(),
    school_name: `Edward ${i}`,
    school_address: `Edward ${i}`,
    email: "32",
    contact_number: `London Park no. ${i}`,
  });
};

export const SchoolList: React.FC = () => {
    const[data, setState] =useState(originData);
    const navigate = useNavigate();
    const handleClick = () => {
        navigate("/student-tracking")
    }
    return (
        <>
            <TitleBarComponent title={"Schools List"} image={true} />
            <div className={classNames(styles.schoolListPage, "school-page-list")}>
                <div className={styles.table}>
                    <Table columns={columns} dataSource={data} />
                    <Button type='primary' onClick={handleClick}>Next</Button>
                </div>
            </div>
        </>
    )
}

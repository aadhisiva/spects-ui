import React from 'react';
import { Button, Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import styles from "./Students.module.scss";
import classNames from "classnames";
import "./Students.custom.scss";
import { useNavigate } from 'react-router';
import { TitleBarComponent } from '../../components/common/titleBar';

interface DataType {
    key: string,
    student_name: string;
    gender: string;
    father_name: string;
    contact_number: string;
    reftactive_errors: string;
    sats_id: string;
    name_of_school: string;
};


const data: DataType[] = [
    {
        key: '1',
        student_name: 'John Brown',
        gender: "32",
        father_name: 'New York No. 1 Lake Park',
        reftactive_errors: 'developer',
        contact_number: '884757248',
        sats_id: 'developer',
        name_of_school: 'developer',
    },
    {
        key: '1',
        student_name: 'John Brown',
        gender: "32",
        father_name: 'New York No. 1 Lake Park',
        reftactive_errors: 'developer',
        contact_number: '884757248',
        sats_id: 'developer',
        name_of_school: 'developer',
    },
    {
        key: '1',
        student_name: 'John Brown',
        gender: "32",
        father_name: 'New York No. 1 Lake Park',
        reftactive_errors: 'developer',
        contact_number: '884757248',
        sats_id: 'developer',
        name_of_school: 'developer',
    },
    {
        key: '1',
        student_name: 'John Brown',
        gender: "32",
        father_name: 'New York No. 1 Lake Park',
        reftactive_errors: 'developer',
        contact_number: '884757248',
        sats_id: 'developer',
        name_of_school: 'developer',
    },
    {
        key: '1',
        student_name: 'John Brown',
        gender: "32",
        father_name: 'New York No. 1 Lake Park',
        reftactive_errors: 'developer',
        contact_number: '884757248',
        sats_id: 'developer',
        name_of_school: 'developer',
    },
];

export const StudentsTable: React.FC = () => {
    const columns: ColumnsType<DataType> = [
        {
            title: 'Student Name',
            dataIndex: 'student_name',
            key: 'student_name',
        },
        {
            title: 'Gender',
            dataIndex: 'gender',
            key: 'gender',
        },
        {
            title: 'Father Name',
            dataIndex: 'father_name',
            key: 'father_name',
        },
        {
            title: 'Contact Number',
            dataIndex: 'contact_number',
            key: 'contact_number',
        },
        {
            title: 'Refractive Errors',
            dataIndex: 'reftactive_errors',
            key: 'reftactive_errors',
        },
        {
            title: 'SATS Id',
            dataIndex: 'sats_id',
            key: 'sats_id',
        },
        {
            title: 'Name of school/camp',
            key: 'name_of_school',
            dataIndex: 'name_of_school',
        },
        {
            title: 'Action',
            key: 'action',
            render: () => (
                <Button onClick={() => handleClick("/student-details")} type='primary'>
                    View
                </Button>
            )
        },
    ];
    const navigate = useNavigate();
    const handleClick = (path: string) => {
        navigate(path)
    }
    return (
        <>
            <TitleBarComponent title={"Students List"} image={true} />
            <div className={classNames(styles.StudentPage, "student-page-list")}>
                <div className={styles.table}>
                    <Table columns={columns} dataSource={data} />
                    <Button type='primary' onClick={() => handleClick("/beneficiary-list")}>Next</Button>
                </div>
            </div>
        </>
    )
}

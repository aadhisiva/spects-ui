import React from 'react';
import { Button, Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import styles from "./BenficiaryList.module.scss";
import classNames from "classnames";
import "./BenficiaryList.custom.scss";
import { useNavigate } from 'react-router';
import { TitleBarComponent } from '../../components/common/titleBar';

interface DataType {
    key: string,
    beneficiary_name: string;
    gender: string;
    taluk: string;
    district: string;
    contact_number: string;
    village: string;
    order_status: string;
};


const data: DataType[] = [
    {
        key: "1",
        beneficiary_name: "panja bramhi",
        gender: "M",
        taluk: "Badvel",
        district: "Kadapa",
        contact_number: "87867676766",
        village: "Error",
        order_status: "Order Pending",
    },
    {
        key: "1",
        beneficiary_name: "panja bramhi",
        gender: "M",
        taluk: "Badvel",
        district: "Kadapa",
        contact_number: "87867676766",
        village: "Error",
        order_status: "Order Pending",
    },
    {
        key: "1",
        beneficiary_name: "panja bramhi",
        gender: "M",
        taluk: "Badvel",
        district: "Kadapa",
        contact_number: "87867676766",
        village: "Error",
        order_status: "Order Pending",
    },
    {
        key: "1",
        beneficiary_name: "panja bramhi",
        gender: "M",
        taluk: "Badvel",
        district: "Kadapa",
        contact_number: "87867676766",
        village: "Error",
        order_status: "Order Pending",
    },
    {
        key: "1",
        beneficiary_name: "panja bramhi",
        gender: "M",
        taluk: "Badvel",
        district: "Kadapa",
        contact_number: "87867676766",
        village: "Error",
        order_status: "Order Pending",
    },
    {
        key: "1",
        beneficiary_name: "panja bramhi",
        gender: "M",
        taluk: "Badvel",
        district: "Kadapa",
        contact_number: "87867676766",
        village: "Error",
        order_status: "Order Pending",
    },
    {
        key: "1",
        beneficiary_name: "panja bramhi",
        gender: "M",
        taluk: "Badvel",
        district: "Kadapa",
        contact_number: "87867676766",
        village: "Error",
        order_status: "Order Pending",
    },
    {
        key: "1",
        beneficiary_name: "panja bramhi",
        gender: "M",
        taluk: "Badvel",
        district: "Kadapa",
        contact_number: "87867676766",
        village: "Error",
        order_status: "Order Pending",
    },

];

export const BeneficiaryList: React.FC = () => {
    const columns: ColumnsType<DataType> = [
        {
            title: 'Beneficiary Name',
            dataIndex: 'beneficiary_name',
            key: 'beneficiary_name',
        },
        {
            title: 'Gender',
            dataIndex: 'gender',
            key: 'gender',
        },
        {
            title: 'Taluk',
            dataIndex: 'taluk',
            key: 'taluk',
        },
        {
            title: 'District',
            dataIndex: 'district',
            key: 'district',
        },
        {
            title: 'Contact Number',
            dataIndex: 'contact_number',
            key: 'contact_number',
        },
        {
            title: 'Village',
            dataIndex: 'village',
            key: 'village',
        },
        {
            title: 'Order Status',
            key: 'order_status',
            dataIndex: 'order_status',
        },
        {
            title: 'Action',
            key: 'action',
            render: () => (
                <Button onClick={(e) => handleClick("/beneficiary-details")} type='primary'>
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
            <TitleBarComponent title={"Beneficiary List"} image={true} />
            <div className={classNames(styles.benificaryListPage, "benificiary-page-list")}>
                <div className={styles.table}>
                    <Table columns={columns} dataSource={data} />
                    <Button type='primary' onClick={(e) => handleClick("/user-details")}>Next</Button>
                </div>
            </div>
        </>
    )
}

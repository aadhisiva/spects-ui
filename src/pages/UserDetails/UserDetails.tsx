import React from 'react'
import { TitleBarComponent } from '../../components/common/titleBar'
import classNames from "classnames";
import styles from "./UserDetails.module.scss";
import "./UserDetails.custom.scss";
import { Button, Col, Row, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useNavigate } from 'react-router';


interface DataType {
    key: string,
    refractionist_name: string;
    assigned_village: string;
    contact_number: string;
};

const data: DataType[] = [
    {
        key: "1",
        refractionist_name: "panja bramhi",
        assigned_village: "chintalacheruvu",
        contact_number: "Badvel",
    },
    {
        key: "1",
        refractionist_name: "panja bramhi",
        assigned_village: "chintalacheruvu",
        contact_number: "Badvel",
    },
    {
        key: "1",
        refractionist_name: "panja bramhi",
        assigned_village: "chintalacheruvu",
        contact_number: "Badvel",
    },
];

export const UserDetails = () => {
    const columns: ColumnsType<DataType> = [
        {
            title: 'Refractionist Name',
            dataIndex: 'refractionist_name',
            key: 'refractionist_name',
        },
        {
            title: 'Assigned Village/Ward',
            dataIndex: 'assigned_village',
            key: 'assigned_village',
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
                <Button onClick={handleAddUser} type='primary'>
                    Edit
                </Button>
            )
        },
    ];
    const navigate = useNavigate();

    const handleBack = () => {
        navigate("/add-user");
    };

    const handleAddUser = () => {
        navigate("/add-user");
    };

    return (
        <>
            <TitleBarComponent title={"Refractionist Assignment"} image={true} />
            <div className={classNames(styles.userDeatilsPage, "user-details-page")}>
                <div className={styles.table}>
                    <Row>
                        <Col sm={12} xs={12} className={styles.userTitle}>
                            <span className={styles.title}>Refractionist Details</span>
                        </Col>
                        <Col sm={12} xs={12} className={styles.addUser}>
                            <span className={styles.title}>
                                <Button onClick={handleAddUser} className={styles.button}>Add User</Button>
                            </span>
                        </Col>
                    </Row>
                    <div className={styles.tableBorder}>
                        <Table columns={columns} dataSource={data} />
                    </div>
                </div>
                <div className={styles.footerRow}>
                    <Row>
                        <Col sm={12} xs={12} className={styles.footerLeft}>
                            <Button>Back</Button>
                        </Col>
                        <Col sm={12} xs={12} className={styles.footerRight}>
                            <Button onClick={handleBack}>Submit</Button>
                        </Col>
                    </Row>
                </div>
            </div>
        </>
    )
};


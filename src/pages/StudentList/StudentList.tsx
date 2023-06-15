import React from 'react';
import { Button, Col, Row } from 'antd';
import styles from "./StudentList.module.scss";
import classNames from 'classnames';
import { TitleBarComponent } from '../../components/common/titleBar';

interface DataType {
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
        student_name: 'John Brown',
        gender: "Kadapa",
        father_name: 'New York No. 1 Lake Park',
        contact_number: "7777777777",
        reftactive_errors: "error",
        sats_id: "7777777777",
        name_of_school: "7777777777",
    },
    {
        student_name: 'John Brown',
        gender: "Kadapa",
        father_name: 'New York No. 1 Lake Park',
        contact_number: "7777777777",
        reftactive_errors: "error",
        sats_id: "7777777777",
        name_of_school: "7777777777",
    },
    {
        student_name: 'John Brown',
        gender: "Kadapa",
        father_name: 'New York No. 1 Lake Park',
        contact_number: "7777777777",
        reftactive_errors: "error",
        sats_id: "7777777777",
        name_of_school: "7777777777",
    },
    {
        student_name: 'John Brown',
        gender: "Kadapa",
        father_name: 'New York No. 1 Lake Park',
        contact_number: "7777777777",
        reftactive_errors: "error",
        sats_id: "7777777777",
        name_of_school: "7777777777",
    },
    {
        student_name: 'John Brown',
        gender: "Kadapa",
        father_name: 'New York No. 1 Lake Park',
        contact_number: "7777777777",
        reftactive_errors: "error",
        sats_id: "7777777777",
        name_of_school: "7777777777",
    },
   
];

export const StudentList: React.FC = () => {
    return (
        <>
            <TitleBarComponent title={"Students List"} image={true} />
            {/* <div className={classNames(styles.studentTracking, "student-page")}>
            <Table columns={Columns} dataSource={data} />;
        </div> */}
            <div className={classNames(styles.studentListPage, "student-page")}>
                <Row justify={"start"} align={"middle"} className={styles.header}>
                    <Col sm={3} xs={3} className={styles.headerTitle}>Student Name</Col>
                    <Col sm={3} xs={3} className={styles.headerTitle}>Gender</Col>
                    <Col sm={3} xs={3} className={styles.headerTitle}>Father Name</Col>
                    <Col sm={3} xs={3} className={styles.headerTitle}>Contact Number</Col>
                    <Col sm={3} xs={3} className={styles.headerTitle}>Refractive Errors</Col>
                    <Col sm={3} xs={3} className={styles.headerTitle}>SATS Id</Col>
                    <Col sm={3} xs={3} className={styles.headerTitle}>Name of school/camp</Col>
                    <Col sm={3} xs={3} className={styles.headerTitle}>Action</Col>
                </Row>
                <div className={styles.bodyContainer}>
                    {(data || []).map((obj, i) => (
                        <div key={i}>
                            <Row justify={"start"} align={"middle"} className={styles.bodyData}>
                                <Col sm={3} xs={3} className={styles.bodyTitle}>{obj.student_name}</Col>
                                <Col sm={3} xs={3} className={styles.bodyTitle}>{obj.gender}</Col>
                                <Col sm={3} xs={3} className={styles.bodyTitle}>{obj.father_name}</Col>
                                <Col sm={3} xs={3} className={styles.bodyTitle}>{obj.contact_number}</Col>
                                <Col sm={3} xs={3} className={styles.bodyTitle}>{obj.reftactive_errors}</Col>
                                <Col sm={3} xs={3} className={styles.bodyTitle}>{obj.sats_id}</Col>
                                <Col sm={3} xs={3} className={styles.bodyTitle}>{obj.name_of_school}</Col>
                                <Col sm={3} xs={3} className={styles.bodyTitle}>
                                    <Button type='primary'>View</Button>
                                </Col>
                            </Row>
                            <hr className={styles.divider} />
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};


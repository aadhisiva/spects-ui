import React, { useEffect, useMemo, useState } from 'react';
import { Button, Col, DatePicker, Form, Input, Row, Select, Table } from 'antd';
import type { ColumnsType, TableProps } from 'antd/es/table';
import styles from "./ReportsTable.module.scss";
import classNames from "classnames";
import "./ReportsTable.custom.scss";
import { useNavigate } from 'react-router';
import { TitleBarComponent } from '../../components/common/titleBar';
import { Option } from 'antd/es/mentions';
import { SearchOutlined } from "@ant-design/icons";
// import DummyData from "../dommy.json";
import { FilterValue, SorterResult } from 'antd/es/table/interface';
import { NotificationSuccess } from '../../components/common/Notifications/Notifications';
import { ModalModify } from '../../components/common/ModalModify';
import { SelectItems } from '../../components/common/SelectItems';
import SelectRowsPerPage from '../../components/common/SelectItems/SelectRowsPerPage';

const { RangePicker } = DatePicker;
interface DataType {
    key: string,
    type: string;
    refractionist_name: string;
    details: string;
    date: string;
    email: string;
    contact_number: string;
    m_f_name: string;
    status: string;
};

let DummyData: DataType[] = [];
for (let i = 0; i < 10000; i++) {
    DummyData.push({
        key: `${i}`,
        type: `school ${i}`,
        refractionist_name: `subb reddy ${i}`,
        details: `school ${i}`,
        date: "2022/02/10",
        email: 'aadhi@gmial.com',
        contact_number: `5655767${i}`,
        m_f_name: `reddamm ${i}`,
        status: `order_pending${i}`
    });
}

export const ReportsTable: React.FC = () => {
    const [filteredInfo, setFilteredInfo] = useState<Record<string, FilterValue | null>>({});
    const [sortedInfo, setSortedInfo] = useState<SorterResult<DataType>>({});
    const [currentPage, setCurrentPage] = useState(1);
    const [tableData, setTableData] = useState<DataType[]>(DummyData);
    const [visible, setVisisble] = useState(false);
    const [formData, setFormData] = useState({});
    const [selctedData, setSelectedData] = useState({
        type: "",
        district: "",
        taluka: "",
        sub_center: "",
        refractionist: "",
        deatils: "",
        dates: "",
    });
    const selectDataTypes = ["district", "taluka", "Sub center", "state", "admin"]
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [queryString, setQueryString] = useState<string>("");
    const navigate = useNavigate();

    // console.log("tableData", tableData)
    const handleChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter) => {
        console.log('Various parameters', pagination, filters, sorter);
        setCurrentPage(Number(pagination?.current));
        setRowsPerPage(Number(pagination.pageSize));
        setFilteredInfo(filters);
        setSortedInfo(sorter as SorterResult<DataType>);
    };

    const columns: ColumnsType<DataType> = [
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
            filteredValue: [queryString],
            onFilter: (value: any, record) => {
                return (
                    String(record.type).toLowerCase().includes(value.toLowerCase()) ||
                    String(record.refractionist_name).toLowerCase().includes(value.toLowerCase()) ||
                    String(record.contact_number).toLowerCase().includes(value.toLowerCase()) ||
                    String(record.m_f_name).toLowerCase().includes(value.toLowerCase()) ||
                    String(record.email).toLowerCase().includes(value.toLowerCase()) ||
                    String(record.details).toLowerCase().includes(value.toLowerCase()) ||
                    String(record.status).toLowerCase().includes(value.toLowerCase()) ||
                    String(record.date).toLowerCase().includes(value.toLowerCase())
                );
            },
            sorter: (a, b) => a.type.length - b.type.length,
            sortOrder: sortedInfo.columnKey === 'type' ? sortedInfo.order : null,
            ellipsis: true,
        },
        {
            title: 'Refractionist Name',
            dataIndex: 'refractionist_name',
            key: 'refractionist_name',
            sorter: (a, b) => a.refractionist_name.length - b.refractionist_name.length,
            sortOrder: sortedInfo.columnKey === 'refractionist_name' ? sortedInfo.order : null,
            ellipsis: true,
        },
        {
            title: 'Deatils',
            dataIndex: 'details',
            key: 'details',
            sorter: (a, b) => a.details.length - b.details.length,
            sortOrder: sortedInfo.columnKey === 'details' ? sortedInfo.order : null,
            ellipsis: true,
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
            sorter: (a, b) => a.date.length - b.date.length,
            sortOrder: sortedInfo.columnKey === 'date' ? sortedInfo.order : null,
            ellipsis: true,
        },
        {
            title: 'Mother/Father Name',
            dataIndex: 'm_f_name',
            key: 'm_f_name',
            sorter: (a, b) => a.m_f_name.length - b.m_f_name.length,
            sortOrder: sortedInfo.columnKey === 'm_f_name' ? sortedInfo.order : null,
            ellipsis: true,
        },
        {
            title: 'Contact Number',
            dataIndex: 'contact_number',
            key: 'contact_number',
            sorter: (a, b) => a.contact_number.length - b.contact_number.length,
            sortOrder: sortedInfo.columnKey === 'contact_number' ? sortedInfo.order : null,
            ellipsis: true,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            sorter: (a, b) => a.email.length - b.email.length,
            sortOrder: sortedInfo.columnKey === 'email' ? sortedInfo.order : null,
            ellipsis: true,
        },
        {
            title: 'Status',
            key: 'status',
            dataIndex: 'status',
            sorter: (a, b) => a.status.length - b.status.length,
            sortOrder: sortedInfo.columnKey === 'status' ? sortedInfo.order : null,
            ellipsis: true,
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => {
                return (
                    <Button onClick={() => handleModifyForm(record)} type='primary'>
                        view
                    </Button>
                )
            }
        },
    ];

    const handleClick = (path: string) => {
        navigate(path)
    };

    const onSave = (values: object) => {
        console.log('Received values of form: ', values);
        setVisisble(false);
    };


    const handleModifyForm = (row: object) => {
        setVisisble(true);
        setFormData(row);

    };
    const FormOpen = () => {
        return <ModalModify
            state={formData}
            visible={visible}
            onCancel={() => setVisisble(false)}
            onSave={onSave}
        />
    };
    const handleCh = (value: string) => {
        NotificationSuccess("success");
        setRowsPerPage(Number(value))
    };
    console.log("formData", selctedData)
    const onHandleSelectItemChange = (type: string, value: any) => {
        setSelectedData((prev) => ({
            ...prev,
            [type]: value
        }))
    };
    const onChangeDate = (va: any, da: any) => {
        console.log('value', da)
        setSelectedData((prev) => ({
            ...prev,
            dates: da
        }))
    };

    const onFinish = (values: string) => {
        console.log(values);
        NotificationSuccess(`Success`);
    };

    const handleSearchQueryString = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQueryString(e.target.value);
    };
    const validateMessages = {
        required: '${label} is required!',
        types: {
            email: '${label} is not a valid email!',
            number: '${label} is not a valid number!',
        },
        number: {
            range: '${label} must be between ${min} and ${max}',
        },
    };

    return (
        <>
            {visible ? FormOpen() : ("")}
            <TitleBarComponent title={"Reports List"} image={true} />
            <div className={classNames(styles.reportsTable, "report-page-list")}>
                <div className={styles.table}>
                    <Row>
                        <Col sm={3} xs={24} className={styles.statisticsContainer}>
                            <div className={styles.statistics}>
                                <span className={styles.title}>Filters</span>
                            </div>
                        </Col>
                    </Row>
                    <Form
                        name="nest-messages"
                        onFinish={onFinish}
                        validateMessages={validateMessages}>
                        <Row className={styles.selectItemsContainer}>
                            <Col sm={6} xs={24}>
                                <SelectItems
                                    placeholder="Select Types"
                                    name="type"
                                    selectItems={selectDataTypes}
                                    hasFeedback={!selctedData.type ? false : true}
                                    onChange={(value) => onHandleSelectItemChange('type', value)}
                                />
                            </Col>
                            <Col sm={6} xs={24}>
                                <SelectItems
                                    placeholder="Select Deatils"
                                    name="deatils"
                                    selectItems={selectDataTypes}
                                    hasFeedback={!selctedData.deatils ? false : true}
                                    onChange={(value) => onHandleSelectItemChange('deatils', value)}
                                />
                            </Col>
                            <Col sm={6} xs={24}>
                                <SelectItems
                                    placeholder="Select District"
                                    name="district"
                                    selectItems={selectDataTypes}
                                    hasFeedback={!selctedData.district ? false : true}
                                    onChange={(value) => onHandleSelectItemChange('district', value)}
                                />
                            </Col>
                            <Col sm={6} xs={24}>
                                <SelectItems
                                    placeholder="Select Taluka"
                                    name="taluka"
                                    selectItems={selectDataTypes}
                                    hasFeedback={!selctedData.taluka ? false : true}
                                    onChange={(value) => onHandleSelectItemChange('taluka', value)}
                                />
                            </Col>
                            <Col sm={6} xs={24}>
                                <SelectItems
                                    placeholder="Select Sub Center"
                                    name="sub_center"
                                    selectItems={selectDataTypes}
                                    hasFeedback={!selctedData.sub_center ? false : true}
                                    onChange={(value) => onHandleSelectItemChange('sub_center', value)}
                                />
                            </Col>
                            <Col sm={6} xs={24}>
                                <SelectItems
                                    placeholder="Select Refractionist"
                                    name="refractionist"
                                    selectItems={selectDataTypes}
                                    hasFeedback={!selctedData.refractionist ? false : true}
                                    onChange={(value) => onHandleSelectItemChange('refractionist', value)}
                                />
                            </Col>
                            <Col sm={6} xs={24}>
                                <div className={styles.selecttypes}>
                                    <Form.Item
                                        name={"From and To Date"}
                                        hasFeedback={!selctedData.dates ? false : true}
                                        rules={[{ required: true }]}>
                                        <RangePicker
                                            format="YYYY-MM-DD"
                                            placeholder={['From Date', 'To Date']}
                                            onChange={onChangeDate}
                                        />
                                    </Form.Item>
                                </div>
                            </Col>
                            <Col sm={6} xs={24}>
                                <div className={styles.selecttypes}>
                                    <Button type="primary" htmlType="submit">
                                        Search
                                    </Button>
                                </div>
                            </Col>
                        </Row>
                    </Form>
                    {/* search and select rows */}
                    <Row>
                        <Col sm={18} xs={12} className={styles.slectRows}>
                            <SelectRowsPerPage
                                handleCh={handleCh}
                            />
                        </Col>
                        <Col sm={6} xs={12} className={styles.searchContainer}>
                            <Form.Item name="q">
                                <Input
                                    placeholder="ID, Title, Content, etc."
                                    allowClear
                                    prefix={<SearchOutlined />}
                                    onChange={(e) => handleSearchQueryString(e)}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Table
                        columns={columns}
                        dataSource={tableData}
                        pagination={{
                            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                            current: currentPage,
                            pageSize: rowsPerPage,
                            total: tableData.length

                        }}
                        onChange={handleChange}
                    />
                    <Button type='primary' onClick={(e) => handleClick("/beneficiary-list")}>Next</Button>
                </div>
            </div>
        </>
    )
}

import React, { useEffect, useMemo, useState } from 'react';
import { Button, Col, Form, Input, Radio, RadioChangeEvent, Row, Select, Table, } from 'antd';
import type { ColumnsType, TableProps } from 'antd/es/table';
import styles from "./Taluka.module.scss";
import classNames from 'classnames';
import "./Taluka.custom.scss";
import { useLocation, useNavigate } from 'react-router';
import { SearchOutlined } from "@ant-design/icons";
import { FilterValue, SorterResult } from 'antd/es/table/interface';
import { TabsPosition } from 'antd/es/tabs';
import { Option } from 'antd/es/mentions';
import { findLoginName, validateMessages } from '../../../utilities/reUsableFun';
import { GET_APIS } from '../../../components/api/apisSpectacles';
import { NotificationError, NotificationSuccess } from '../../../components/common/Notifications/Notifications';
import { TitleBarComponent } from '../../../components/common/titleBar';
import { SelectItems } from '../../../components/common/SelectItems';
import SelectRowsPerPage from '../../../components/common/SelectItems/SelectRowsPerPage';
import { ModalModify } from '../../../components/common/ModalModify';

interface DataType {
    key: string,
    refractionist_name: string;
    name: string;
    refractionist_mobile: string;
    district: string;
    taluka: string;
    sub_centre: string;
    village: string;
};

export const TalukaTable: React.FC = () => {
    const [loginBY, setLoginBy] = useState(findLoginName());
    const [mode, setMode] = useState<TabsPosition>('top');
    const [editmode, setEditMode] = useState('');
    const [rural_urban, setRuralOrUrban] = useState("");
    const [filteredInfo, setFilteredInfo] = useState<Record<string, FilterValue | null>>({});
    const [sortedInfo, setSortedInfo] = useState<SorterResult<DataType>>({});
    const [currentPage, setCurrentPage] = useState(1);
    const [tableData, setTableData] = useState<DataType[]>([]);
    const [visible, setVisisble] = useState(false);
    const [formData, setFormData] = useState({});
    const [selctedData, setSelectedData] = useState({
        designation: "",
        district: "",
        taluka: "",
        sub_centre: "",
        village: ""
    })
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [queryString, setQueryString] = useState<string>("");
    const [districtData, setDistrictData] = useState([]);
    const [talukaData, setTalukaData] = useState<[]>([]);
    const [subCentreData, setSubCentreData] = useState([]);
    const [villageData, setVillageData] = useState([]);

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        (async () => {
            let data = await GET_APIS(`district_officer?id=${loginBY.unique_id}&type=${rural_urban}`);
            if (data.code == 200) {
                setSelectedData((prev) => ({
                    ...prev,
                    district: data.data[0].district
                }))
                setTableData(data?.data)
            } else {
                NotificationError(data.message)
            }
        })();
    }, [rural_urban]);

    const handleChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter) => {
        setCurrentPage(Number(pagination?.current));
        setRowsPerPage(Number(pagination.pageSize));
        setFilteredInfo(filters);
        setSortedInfo(sorter as SorterResult<DataType>);
    };

    const columns: ColumnsType<DataType> = [
        // {
        //     title: 'Designation',
        //     dataIndex: 'refractionist_name',
        //     key: 'refractionist_name',
        //     filteredValue: [queryString],
        //     onFilter: (value: any, record) => {
        //         return (
        //             String(record.refractionist_name).toLowerCase().includes(value.toLowerCase()) ||
        //             // String(record.name).toLowerCase().includes(value.toLowerCase()) ||
        //             String(record.refractionist_mobile).toLowerCase().includes(value.toLowerCase()) ||
        //             String(record.district).toLowerCase().includes(value.toLowerCase()) ||
        //             String(record.sub_centre).toLowerCase().includes(value.toLowerCase()) ||
        //             String(record.taluka).toLowerCase().includes(value.toLowerCase())
        //         );
        //     },
        //     sorter: (a, b) => a.refractionist_name.length - b.refractionist_name.length,
        //     sortOrder: sortedInfo.columnKey === 'refractionist_name' ? sortedInfo.order : null,
        //     ellipsis: true,
        // },
        // {
        //     title: 'Name',
        //     dataIndex: 'name',
        //     key: 'name',
        //     sorter: (a, b) => a.name.length - b.name.length,
        //     sortOrder: sortedInfo.columnKey === 'name' ? sortedInfo.order : null,
        //     ellipsis: true,
        // },
        {
            title: 'Refractionist Mobile Number',
            dataIndex: 'refractionist_mobile',
            key: 'refractionist_mobile',
            sorter: (a, b) => a.refractionist_mobile.length - b.refractionist_mobile.length,
            sortOrder: sortedInfo.columnKey === 'refractionist_mobile' ? sortedInfo.order : null,
            onFilter: (value: any, record) => {
                return (
                    String(record.refractionist_name).toLowerCase().includes(value.toLowerCase()) ||
                    // String(record.name).toLowerCase().includes(value.toLowerCase()) ||
                    String(record.refractionist_mobile).toLowerCase().includes(value.toLowerCase()) ||
                    String(record.district).toLowerCase().includes(value.toLowerCase()) ||
                    String(record.sub_centre).toLowerCase().includes(value.toLowerCase()) ||
                    String(record.taluka).toLowerCase().includes(value.toLowerCase())
                );
            },
            ellipsis: true,
        },
        {
            title: 'District',
            dataIndex: 'district',
            key: 'district',
            sorter: (a, b) => a.district.length - b.district.length,
            sortOrder: sortedInfo.columnKey === 'district' ? sortedInfo.order : null,
            ellipsis: true,
            render: (_, record) => {
                return _.replace(/\W/g, "").replace(/\d/g, "");
            }
        },
        {
            title: 'Taluka',
            dataIndex: 'taluka',
            key: 'taluka',
            sorter: (a, b) => a.taluka.length - b.taluka.length,
            sortOrder: sortedInfo.columnKey === 'taluka' ? sortedInfo.order : null,
            ellipsis: true,
            render: (_, record) => {
                return _.replace(/\W/g, "").replace(/\d/g, "");
            }
        },
        {
            title: 'Sub Centre',
            key: 'sub_centre',
            dataIndex: 'sub_centre',
            sorter: (a, b) => a.sub_centre.length - b.sub_centre.length,
            sortOrder: sortedInfo.columnKey === 'sub_centre' ? sortedInfo.order : null,
            ellipsis: true,
            render: (_, record) => {
                return _.replace(/\W/g, "").replace(/\d/g, "");
            }
        },
        {
            title: 'Village',
            key: 'village',
            dataIndex: 'village',
            sorter: (a, b) => a.village.length - b.village.length,
            sortOrder: sortedInfo.columnKey === 'village' ? sortedInfo.order : null,
            ellipsis: true,
            render: (_, record) => {
                return _.replace(/\W/g, "").replace(/\d/g, "");
            }
        },
        {
            title: 'Designation',
            dataIndex: 'refractionist_name',
            key: 'refractionist_name',
            sorter: (a, b) => a.refractionist_name.length - b.refractionist_name.length,
            sortOrder: sortedInfo.columnKey === 'refractionist_name' ? sortedInfo.order : null,
            ellipsis: true,
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => {
                return (
                    <Button onClick={() => handleModifyForm(record)} type='primary'>
                        Modify
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
        setEditMode("Edit")
    };

    const handleAddNewUser = () => {
        setVisisble(true);
        setFormData("");
        setEditMode("")
    };
    const FormOpen = () => {
        return <ModalModify
            editMode={editmode ? true : false}
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
    const onFinish = async (values: any) => {
        const { district, taluka, sub_centre, village } = values;
        let data = await GET_APIS(`search_data?type=${rural_urban}&district=${selctedData.district}&taluka=${taluka}&sub_centre=${sub_centre}`);
        if (data.code == 200) {
            console.log("Datasda", data.data);
            setTableData(data?.data);
        } else {
            NotificationError(data.message)
        }
        NotificationSuccess(`Success`);
    };
    const onHandleSelectItemChange = (type: string, value: string) => {
        setSelectedData((prev) => ({
            ...prev,
            [type]: value
        }))
    };

    const handleSearchQueryString = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQueryString(e.target.value);
    };
    const handleModeChange = (e: RadioChangeEvent) => {
        setRuralOrUrban(e.target.value);
    };

    useEffect(() => {
        (async () => {
            if (selctedData.sub_centre) {
                let data = await GET_APIS(`all_district_wise?id=${loginBY.unique_id}&type=${rural_urban}&district=${selctedData.district}&sub=${selctedData.sub_centre}`);
                setVillageData(data.data);
            }
        })();
    }, [selctedData.sub_centre]);

    useEffect(() => {
        (async () => {
            if (selctedData.taluka) {
                let data = await GET_APIS(`all_district_wise?id=${loginBY.unique_id}&type=${rural_urban}&district=${selctedData.district}&taluka=${selctedData.taluka}`);
                setSubCentreData(data.data);
            }
        })();
    }, [selctedData.taluka]);
    const ModifiedData = Array.from(new Set(tableData.map((item: any) => item.taluka)));

    return (
        <>
            {visible ? FormOpen() : ("")}
            <div className={classNames(styles.talukaPage, "taluka-page-list")}>
                <div className={styles.table}>
                    <Row>
                        <Col sm={3} xs={24} className={styles.statisticsContainer}>
                            <div className={styles.statistics}>
                                <span className={styles.title}>Filters</span>
                            </div>
                        </Col>
                        <Col sm={4} xs={24} className={styles.statisticsContainer}>
                            <Radio.Group defaultValue="" buttonStyle="solid" onChange={handleModeChange}>
                                <Radio.Button value="rural">Rural</Radio.Button>
                                <Radio.Button value="urban">Urban</Radio.Button>
                            </Radio.Group>
                        </Col>
                    </Row>
                    <Form
                        name="nest-messages"
                        onFinish={onFinish}
                        validateMessages={validateMessages}
                    >
                        <Row className={styles.selectItemsContainer}>
                                <Col sm={6} xs={24}>
                                    <div className={styles.selecttypes}>
                                        <Form.Item name="taluka"
                                            hasFeedback={!selctedData.taluka ? false : true}
                                            validateStatus="success"
                                            rules={[{ required: true }]}
                                        >
                                            <Select
                                                placeholder="Select Taluka"
                                                disabled={rural_urban ? false : true}
                                                onChange={(value) => onHandleSelectItemChange('taluka', value)}
                                            >
                                                <Option value="">----Select----</Option>
                                                {(ModifiedData || [])?.map((obj: any, i) => (
                                                    <Option key={String(i)} value={`${obj}`}>{obj.replace(/\W/g, "").replace(/\d/g, "")}</Option>
                                                ))}
                                            </Select>
                                        </Form.Item>
                                    </div>
                                </Col>
                            <Col sm={6} xs={24}>
                                <SelectItems
                                    placeholder="Select Sub Center"
                                    name="sub_centre"
                                    disabled={rural_urban ? false : true}
                                    selectItems={subCentreData || []}
                                    hasFeedback={!selctedData.sub_centre ? false : true}
                                    onChange={(value) => onHandleSelectItemChange('sub_centre', value)}
                                />
                            </Col>
                            {/* <Col sm={6} xs={24}>
                                <SelectItems
                                    placeholder="Select Village"
                                    name="village"
                                    selectItems={villageData || []}
                                    hasFeedback={!selctedData.sub_center ? false : true}
                                    onChange={(value) => onHandleSelectItemChange('village', value)}
                                />
                            </Col> */}
                            <Col sm={6} xs={24}>
                                <div className={styles.selecttypes}>
                                    <Button disabled={rural_urban ? false : true} type="primary" htmlType="submit">
                                        Search
                                    </Button>
                                </div>
                            </Col>
                        </Row>
                    </Form>
                    {/* search and select rows */}
                    <Row>
                        <Col sm={4} xs={12} className={styles.slectRows}>
                            <SelectRowsPerPage
                                handleCh={handleCh}
                            />
                        </Col>
                        <Col sm={5} xs={12} className={styles.headerRow}>
                            <span>{location.state}</span>
                        </Col>
                        <Col sm={9} xs={12} className={styles.searchContainer}>
                            <Button type='primary' onClick={handleAddNewUser}>Add New</Button>
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
                        style={{ tableLayout: 'auto' }}
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

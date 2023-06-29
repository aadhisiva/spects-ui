import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Row, Select, Table, } from 'antd';
import type { ColumnsType, TableProps } from 'antd/es/table';
import styles from "./Taluka.module.scss";
import classNames from 'classnames';
import "./Taluka.custom.scss";
import { useLocation, useNavigate } from 'react-router';
import { FilterValue, SorterResult } from 'antd/es/table/interface';
import { TabsPosition } from 'antd/es/tabs';
import { Option } from 'antd/es/mentions';
import { findLoginName } from '../../../utilities/reUsableFun';
import { GET_APIS, LOGIN_APIS } from '../../../components/api/apisSpectacles';
import { NotificationError, NotificationSuccess } from '../../../components/common/Notifications/Notifications';
import SelectRowsPerPage from '../../../components/common/SelectItems/SelectRowsPerPage';
import { ModalModify } from '../../../components/common/ModalModify';
import Search from 'antd/es/input/Search';

interface DataType {
    key: string,
    name: string;
    mobile_number: string;
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
    const [districtSelect, setDistrictSelect] = useState([]);
    const [visible, setVisisble] = useState(false);
    const [formData, setFormData] = useState({});
    const [districtOption, setDistrict] = useState("");
    const [talukaOption, setTalukaOption] = useState("");
    const [talukaSelect, setTalukaSelect] = useState([]);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [queryString, setQueryString] = useState<string>("");
    const [editId, setEditId] = useState([]);

    const navigate = useNavigate();
    const location = useLocation();

    const GetTablData = async () => {
        let data = await GET_APIS(`talukas_data?type=${rural_urban}`);
        if (data.code == 200) {
            setTableData(data?.data)
        } else {
            NotificationError(data.message)
        }
    }
    useEffect(() => {
        (async () => {
            await GetTablData();
        })();
    }, [rural_urban]);

    useEffect(() => {
        (async () => {
            let data = await GET_APIS(`talukas_data?type=${rural_urban}&district=${districtOption}`);

            if (data.code == 200) {
                setTableData(data?.data)
            } else {
                NotificationError(data.message)
            }
        })();
    }, [districtOption]);

    useEffect(() => {
        (async () => {
            let data = await GET_APIS(`talukas_data?type=${rural_urban}&district=${districtOption}&taluka=${talukaOption}`);
            if (data.code == 200) {
                setTableData(data?.data)
            } else {
                NotificationError(data.message)
            }
        })();
    }, [talukaOption]);

    const handleChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter) => {
        setCurrentPage(Number(pagination?.current));
        setRowsPerPage(Number(pagination.pageSize));
        setFilteredInfo(filters);
        setSortedInfo(sorter as SorterResult<DataType>);
    };
    const columns: ColumnsType<DataType> = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            filteredValue: [queryString],
            onFilter: (value: any, record) => {
                return (
                    String(record.name).toLowerCase().includes(value.toLowerCase()) ||
                    String(record.mobile_number).toLowerCase().includes(value.toLowerCase()) ||
                    String(record.district).toLowerCase().includes(value.toLowerCase())
                );
            },
            sorter: (a, b) => a.name?.length - b.name?.length,
            sortOrder: sortedInfo.columnKey === 'name' ? sortedInfo.order : null,
            ellipsis: true,
            render: (_, record) => {
                return !_? "N/A" : _;
            }
        },
        {
            title: 'Mobile Number',
            dataIndex: 'mobile_number',
            key: 'mobile_number',
            sorter: (a, b) => a.mobile_number?.length - b.mobile_number?.length,
            sortOrder: sortedInfo.columnKey === 'mobile_number' ? sortedInfo.order : null,
            ellipsis: true,
            render: (_, record) => {
                return !_? "N/A" : _;
            }
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

    const onSave = async (values: any) => {
        delete values?.district;
        delete values?.rural_urban;
        let body: any = { ...values, ...{ unique_id: editId } };
        let result = await LOGIN_APIS("update_taluka_data", body);
        if (result.code == 200) {
            await GetTablData();
        } else {
            NotificationError("Update Failed")
        }
        setVisisble(false);
    };

    const handleModifyForm = (row: any) => {
        setVisisble(true);
        setEditId(row.id)
        setFormData(row);
        setEditMode("Edit")
    };

    // const handleAddNewUser = () => {
    //     setVisisble(true);
    //     setFormData("");
    //     setEditMode("")
    // };
    const FormOpen = () => {
        return <ModalModify
            districtsData={districtSelect}
            editMode={editmode ? true : false}
            state={formData}
            setRuralOrUrban={(e)=> setRuralOrUrban(e)}
            visible={visible}
            onCancel={() => setVisisble(false)}
            onSave={onSave}
        />
    };
    const handleCh = (value: string) => {
        NotificationSuccess("success");
        setRowsPerPage(Number(value))
    };
   
    useEffect(() => {
        (async () => {
            let data = await GET_APIS(`all_district_wise?type=${rural_urban}`);
            setDistrictSelect(data.data);
        })();
    }, [rural_urban]);
    useEffect(() => {
        (async () => {
            let data = await GET_APIS(`all_district_wise?type=${rural_urban}&district=${districtOption}`);
            setTalukaSelect(data.data);
        })();
    }, [districtOption]);

    const handleClickClearFilters = () => {
        setDistrict("");
        setRuralOrUrban("");
        setTalukaOption("");
    };

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
                    </Row>
                    <Row className={styles.selectItemsContainer}>
                        <Col sm={6} xs={24}>
                            <div className={styles.selecttypes}>
                                <Form.Item name={"rural_urban"}
                                >
                                    <Select
                                        defaultValue={""}
                                        placeholder="Rural/Urban"
                                        onChange={(value) => setRuralOrUrban(value)}
                                    >
                                        <Option value="">--select--</Option>
                                        <Option value="rural">Rural</Option>
                                        <Option value="urban">Urban</Option>
                                    </Select>
                                </Form.Item>
                            </div>
                        </Col>
                        <Col sm={6} xs={24}>
                            <div className={styles.selecttypes}>
                                <Form.Item name={"district"}
                                >
                                    <Select
                                        placeholder="Select District"
                                        disabled={rural_urban ? false : true}
                                        onChange={(value) => setDistrict(value)}
                                    >
                                        {(districtSelect || [])?.map((obj: any, i) => (
                                            <Option key={String(i)} value={`${obj.option}`}>{obj.option.replace(/\W/g, "").replace(/\d/g, "")}</Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </div>
                        </Col>
                        <Col sm={6} xs={24}>
                            <div className={styles.selecttypes}>
                                <Form.Item name={"taluka"}
                                >
                                    <Select
                                        placeholder="Select Taluka"
                                        disabled={districtOption ? false : true}
                                        onChange={(value) => setTalukaOption(value)}
                                    >
                                        {(talukaSelect || [])?.map((obj: any, i) => (
                                            <Option key={String(i)} value={`${obj.option}`}>{obj.option.replace(/\W/g, "").replace(/\d/g, "")}</Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </div>
                        </Col>
                        <Col sm={6} xs={24}>
                            <div className={styles.selecttypes}>
                                <Button type="primary" onClick={handleClickClearFilters}>
                                    Clear Filters
                                </Button>
                            </div>
                        </Col>
                    </Row>
                    {/* search and select rows */}
                    <Row>
                        <Col sm={4} xs={12} className={styles.slectRows}>
                            <SelectRowsPerPage
                                handleCh={handleCh}
                            />
                        </Col>
                        <Col sm={12} xs={12} className={styles.headerRow}>
                            <span>{"Taluka Health Officer"}</span>
                        </Col>
                        <Col sm={8} xs={12} className={styles.searchContainer}>
                                <Search 
                                allowClear
                                placeholder="input search" 
                                enterButton
                                onSearch={(e) => setQueryString(e)}
                                />

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
                </div>
            </div>
        </>
    )
}

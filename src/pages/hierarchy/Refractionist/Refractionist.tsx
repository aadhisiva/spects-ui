import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Row, Select, Spin, Table, } from 'antd';
import type { ColumnsType, TableProps } from 'antd/es/table';
import styles from "./Refractionist.module.scss";
import classNames from 'classnames';
import "./Refractionist.custom.scss";
import { useLocation, useNavigate } from 'react-router';
import { FilterValue, SorterResult } from 'antd/es/table/interface';
import { TabsPosition } from 'antd/es/tabs';
import { Option } from 'antd/es/mentions';
import { GET_APIS, POSTAPIS_WITH_AUTH } from '../../../api/apisSpectacles';
import { NotificationError, NotificationSuccess } from '../../../components/common/Notifications/Notifications';
import SelectRowsPerPage from '../../../components/common/SelectItems/SelectRowsPerPage';
import { ModalModify } from '../../../components/common/ModalModify';
import Search from 'antd/es/input/Search';
import { useTranslation } from 'react-i18next';
import { useFetchUserData } from '../../../utilities/userDataHook';

interface DataType {
    key: string,
    refractionist_name: string;
    refractionist_mobile: string;
    district: string;
    taluka: string;
    sub_centre: string;
    village: string;
    rural_urban: string;
};

export const RefractionistTable: React.FC = () => {
    const [editmode, setEditMode] = useState('');
    const { t } = useTranslation();
    const [loading, setLoading] = useState(true);

    const [originalTableData, setOriginalTableData] = useState<DataType[]>([]);
    const [copyOfOriginalTableData, setCopyOfOriginalTableData] = useState<DataType[]>([]);

    const [rural_urban, setRuralOrUrban] = useState("");
    const [filteredInfo, setFilteredInfo] = useState<Record<string, FilterValue | null>>({});
    const [sortedInfo, setSortedInfo] = useState<SorterResult<DataType>>({});
    const [currentPage, setCurrentPage] = useState(1);
    const [districtSelect, setDistrictSelect] = useState<DataType[]>([]);
    const [visible, setVisisble] = useState(false);
    const [formData, setFormData] = useState({});
    const [districtOption, setDistrict] = useState("");
    const [talukaOption, setTalukaOption] = useState("");
    const [talukaSelect, setTalukaSelect] = useState<DataType[]>([]);
    const [subCentreOption, setSubCentreOption] = useState("");
    const [subCentreSelect, setSubCentreSelect] = useState<DataType[]>([]);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [queryString, setQueryString] = useState<string>("");
    const [editId, setEditId] = useState([]);

    // auth user
    const [userData] = useFetchUserData()
    const token = userData?.userData?.token;
    const type = userData?.userData?.type;

    const unique_id: any = { unique_id: userData?.userData?.unique_id, type: userData?.userData?.type };

    const GetTablData = async () => {
        let { data } = await POSTAPIS_WITH_AUTH(`getUser_data`, unique_id, token);
        if (type == "district_officer") {
            let uniqueBody: any = Array.from(new Set(data?.map((obj: any) => obj.district)));
            let bodyData: any = {
                districts: uniqueBody
            };
            let result = await POSTAPIS_WITH_AUTH(`all_masters`, bodyData, token);
            if (result.code == 200) {
                setLoading(false);
                setOriginalTableData(result?.data);
                setCopyOfOriginalTableData(result?.data);
            } else {
                NotificationError(result.message)
            }
        } else if (type == "taluka") {
            let uniqueBody: any = Array.from(new Set(data?.map((obj: any) => obj.taluka)));
            let bodyData: any = {
                talukas: uniqueBody
            };
            let result = await POSTAPIS_WITH_AUTH(`all_masters`, bodyData, token);
            if (result.code == 200) {
                setLoading(false);
                setOriginalTableData(result?.data);
                setCopyOfOriginalTableData(result?.data);
            } else {
                NotificationError(result.message)
            }
        } else {
            let result = await GET_APIS(`all_masters`, token);
            if (result.code == 200) {
                setLoading(false);
                setOriginalTableData(result?.data);
                setCopyOfOriginalTableData(result?.data);
            } else {
                NotificationError(result.message)
            }
        }
    };

    useEffect(() => {
        (async () => {
            await GetTablData();
        })();
    }, []);

    const handleChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter) => {
        setCurrentPage(Number(pagination?.current));
        setRowsPerPage(Number(pagination.pageSize));
        setFilteredInfo(filters);
        setSortedInfo(sorter as SorterResult<DataType>);
    };

    const columns: ColumnsType<DataType> = [
        {
            title: t('TABLE_REFRACTIONIST_NAME'),
            dataIndex: 'refractionist_name',
            key: 'refractionist_name',
            sorter: (a, b) => a.refractionist_name?.length - b.refractionist_name?.length,
            sortOrder: sortedInfo.columnKey === 'refractionist_name' ? sortedInfo.order : null,
            ellipsis: true,
            render: (_, record) => {
                return !_ ? "N/A" : _;
            }
        },
        {
            title: t("TABLE_REFRACTIONIST_MOBILE"),
            dataIndex: 'refractionist_mobile',
            key: 'refractionist_mobile',
            filteredValue: [queryString],
            sorter: (a, b) => a.refractionist_mobile?.length - b.refractionist_mobile?.length,
            sortOrder: sortedInfo.columnKey === 'refractionist_mobile' ? sortedInfo.order : null,
            onFilter: (value: any, record) => {
                return (
                    String(record.refractionist_name).toLowerCase().includes(value.toLowerCase()) ||
                    String(record.refractionist_mobile).toLowerCase().includes(value.toLowerCase()) ||
                    String(record.district).toLowerCase().includes(value.toLowerCase()) ||
                    String(record.sub_centre).toLowerCase().includes(value.toLowerCase()) ||
                    String(record.taluka).toLowerCase().includes(value.toLowerCase())
                );
            },
            ellipsis: true,
            render: (_, record) => {
                return !_ ? "N/A" : _;
            }
        },
        {
            title: t('TABLE_DISTRICT'),
            dataIndex: 'district',
            key: 'district',
            sorter: (a, b) => a.district.length - b.district.length,
            sortOrder: sortedInfo.columnKey === 'district' ? sortedInfo.order : null,
            ellipsis: true,
            render: (_, record) => {
                return _?.replace(/\W/g, "").replace(/\d/g, "");
            }
        },
        {
            title: t('TABLE_TALUKA'),
            dataIndex: 'taluka',
            key: 'taluka',
            sorter: (a, b) => a.taluka.length - b.taluka.length,
            sortOrder: sortedInfo.columnKey === 'taluka' ? sortedInfo.order : null,
            ellipsis: true,
            render: (_, record) => {
                return _?.replace(/\W/g, "").replace(/\d/g, "");
            }
        },
        {
            title: t("TABLE_SUBCENTRE"),
            key: 'sub_centre',
            dataIndex: 'sub_centre',
            sorter: (a, b) => a.sub_centre.length - b.sub_centre.length,
            sortOrder: sortedInfo.columnKey === 'sub_centre' ? sortedInfo.order : null,
            ellipsis: true,
            render: (_, record) => {
                return _?.replace(/\W/g, "").replace(/\d/g, "");
            }
        },
        {
            title: t("TABLE_VILLAGE_WARD"),
            key: 'village',
            dataIndex: 'village',
            sorter: (a, b) => a.village.length - b.village.length,
            sortOrder: sortedInfo.columnKey === 'village' ? sortedInfo.order : null,
            ellipsis: true,
        },
        {
            title: t("TABLE_ACTION"),
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

    useEffect(() => {
        let filterData = originalTableData;
        // filter rural/urban
        if (rural_urban) {
            filterData = filterData.filter(obj => obj.rural_urban === rural_urban);
        };
        // filter rural/urban and district
        if (rural_urban && districtOption) {
            filterData = filterData.filter(obj => obj.rural_urban === rural_urban
                && obj.district === districtOption);
        };
        // filter rural/urban and district and taluka
        if (rural_urban && districtOption && talukaOption) {
            filterData = filterData.filter(obj => obj.rural_urban === rural_urban
                && obj.district === districtOption && obj.taluka === talukaOption);
        };
        // filter rural/urban and district and taluka and sub centre
        if (rural_urban && districtOption && talukaOption && subCentreOption) {
            filterData = filterData.filter(obj => obj.rural_urban === rural_urban
                && obj.district === districtOption && obj.taluka === talukaOption && obj.sub_centre === subCentreOption);
        };
        setCopyOfOriginalTableData(filterData);
    }, [rural_urban, districtOption, talukaOption, subCentreOption])


    const onSave = async (values: any) => {
        setLoading(true);
        setVisisble(false);
        delete values?.district;
        delete values?.rural_urban;
        delete values?.sub_centre;
        delete values?.taluka;
        delete values?.village;
        let body: any = { ...values, ...{ user_unique_id: editId } };
        let result = await POSTAPIS_WITH_AUTH("update_data", body, token);
        if (result.code == 200) {
            await GetTablData();
            setLoading(false);
        } else {
            NotificationError("Update Failed")
        }
        setVisisble(false);
    };

    const handleModifyForm = (row: any) => {
        setVisisble(true);
        setEditId(row.user_unique_id)
        setFormData(row);
        setEditMode("Edit")
    };

    const FormOpen = () => {
        return <ModalModify
            districtsData={districtSelect}
            editMode={editmode ? true : false}
            state={formData}
            setRuralOrUrban={(e) => setRuralOrUrban(e)}
            visible={visible}
            onCancel={() => setVisisble(false)}
            onSave={onSave}
        />
    };
    const handleCh = (value: string) => {
        NotificationSuccess("success");
        setRowsPerPage(Number(value))
    };

    const handleClickClearFilters = () => {
        setDistrict("");
        setRuralOrUrban("");
        setTalukaOption("");
        setSubCentreOption("");
    };


    const handleRuralOrUrban = (value: string) => {
        if (value !== rural_urban) {
            setRuralOrUrban(value);
            let reset = copyOfOriginalTableData.filter(obj => obj.rural_urban === value);
            setDistrictSelect(reset);
        };
    };

    const handleSelectedDistrict = (value: string) => {
        if (value !== districtOption) {
            setDistrict(value);
            let reset = districtSelect.filter(obj => obj.district === value);
            setTalukaSelect(reset);
        };
    };

    const handleSelectedTaluka = (value: string) => {
        if (value !== talukaOption) {
            setTalukaOption(value);
            let reset = talukaSelect.filter(obj => obj.taluka === value);
            setSubCentreSelect(reset);
        };
    };

    const handleSubCentreOption = (value: string) => {
        if (value !== subCentreOption) {
            setSubCentreOption(value);
        };
    };

    const renderRefractionistData = () => (
        <>
            {visible ? FormOpen() : ("")}
            <div className={classNames(styles.refractionistPage, "refractionist-page-list")}>
                <div className={styles.table}>
                    <Row>
                        <Col sm={3} xs={24} className={styles.statisticsContainer}>
                            <div className={styles.statistics}>
                                <span className={styles.title}>{t("FILTERS")}</span>
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
                                        onChange={handleRuralOrUrban}
                                    >
                                        <Option value="Rural">Rural</Option>
                                        <Option value="Urban">Urban</Option>
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
                                        onChange={handleSelectedDistrict}
                                    >
                                        {(Array.from(new Set(districtSelect.map(obj => obj.district))) || [])?.map((obj: any, i) => (
                                            <Option key={String(i)} value={`${obj}`}>{obj?.replace(/\W/g, "")?.replace(/\d/g, "")}</Option>
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
                                        onChange={handleSelectedTaluka}
                                    >
                                        {(Array.from(new Set(talukaSelect.map(obj => obj.taluka))) || [])?.map((obj: any, i) => (
                                            <Option key={String(i)} value={`${obj}`}>{obj?.replace(/\W/g, "")?.replace(/\d/g, "")}</Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </div>
                        </Col>
                        <Col sm={6} xs={24}>
                            <div className={styles.selecttypes}>
                                <Form.Item name={"sub_centre"}
                                >
                                    <Select
                                        placeholder="Select Sub Centre"
                                        disabled={talukaOption ? false : true}
                                        onChange={handleSubCentreOption}
                                    >
                                        {(Array.from(new Set(subCentreSelect.map(obj => obj.sub_centre))) || [])?.map((obj: any, i) => (
                                            <Option key={String(i)} value={`${obj}`}>{obj}</Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </div>
                        </Col>
                        <Col sm={6} xs={24}>
                            <div className={styles.selecttypes}>
                                <Button type="primary" onClick={handleClickClearFilters}>
                                    {t("CLEAR_FILTERS")}
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
                            <span>{t("REFRACTIONIST")}</span>
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
                        dataSource={copyOfOriginalTableData}
                        pagination={{
                            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                            current: currentPage,
                            pageSize: rowsPerPage,
                            total: copyOfOriginalTableData.length
                        }}
                        onChange={handleChange}
                    />
                </div>
            </div>
        </>
    )

    return (
        <>
            <Spin spinning={loading}>{renderRefractionistData()}</Spin>
        </>
    )
}

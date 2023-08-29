import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row, Select, Spin, Table } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import styles from "./District.module.scss";
import classNames from "classnames";
import "./District.custom.scss";
import { FilterValue, SorterResult } from "antd/es/table/interface";
import { GET_APIS, POSTAPIS_WITH_AUTH } from "../../../api/apisSpectacles";
import {
  NotificationError,
  NotificationSuccess,
} from "../../../components/common/Notifications/Notifications";
import SelectRowsPerPage from "../../../components/common/SelectItems/SelectRowsPerPage";
import { ModalModify } from "../../../components/common/ModalModify";
import Search from "antd/es/input/Search";
import _ from "lodash";
import { useTranslation } from "react-i18next";
import { useFetchUserData } from "../../../utilities/userDataHook";
import { RURAL_OR_URBAN_FILTER_OPTIONS } from "../../../utilities";

const { Option } = Select;
interface DataType {
  key: string;
  name: string;
  mobile_number: string;
  rural_urban: string;
  district: string;
  taluka: string;
  sub_centre: string;
  village: string;
}

export const DistrictOfficerTable: React.FC = () => {
  const [editmode, setEditMode] = useState("");
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);

  const [originalTableData, setOriginalTableData] = useState<DataType[]>([]);
  const [copyOfOriginalTableData, setCopyOfOriginalTableData] = useState<
    DataType[]
  >([]);

  const [rural_urban, setRuralOrUrban] = useState("");
  const [filteredInfo, setFilteredInfo] = useState<
    Record<string, FilterValue | null>
  >({});
  const [sortedInfo, setSortedInfo] = useState<SorterResult<DataType>>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [districtSelect, setDistrictSelect] = useState<DataType[]>([]);
  const [visible, setVisisble] = useState(false);
  const [formData, setFormData] = useState({});
  const [districtOption, setDistrict] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [queryString, setQueryString] = useState<string>("");
  const [editId, setEditId] = useState([]);

  // auth user
  const [userData] = useFetchUserData();
  const token = userData?.userData?.token;

  const GetTablData = async () => {
    let data = await GET_APIS(`districts_data`, token);
    if (data.code == 200) {
      setLoading(false);
      setOriginalTableData(data?.data || []);
      setCopyOfOriginalTableData(data?.data || []);
    } else {
      NotificationError(data.message);
    }
  };

  useEffect(() => {
    (async () => {
      await GetTablData();
    })();
  }, []);

  const handleChange: TableProps<DataType>["onChange"] = (
    pagination,
    filters,
    sorter
  ) => {
    setCurrentPage(Number(pagination?.current));
    setRowsPerPage(Number(pagination.pageSize));
    setFilteredInfo(filters);
    setSortedInfo(sorter as SorterResult<DataType>);
  };
  const columns: ColumnsType<DataType> = [
    {
      title: t("TABLE_NAME"),
      dataIndex: "name",
      key: "name",
      filteredValue: [queryString],
      // onFilter: (value: any, record) => {
      //   return (
      //     String(record.name).toLowerCase().includes(value.toLowerCase()) ||
      //     String(record.mobile_number)
      //       .toLowerCase()
      //       .includes(value.toLowerCase()) ||
      //     String(record.district).toLowerCase().includes(value.toLowerCase())
      //   );
      // },
      sorter: (a, b) => a.name?.length - b.name?.length,
      sortOrder: sortedInfo.columnKey === "name" ? sortedInfo.order : null,
      ellipsis: true,
      render: (_, record) => {
        return !_ ? "N/A" : _;
      },
    },
    {
      title: t("TABLE_MOBILE"),
      dataIndex: "mobile_number",
      key: "mobile_number",
      sorter: (a, b) => a.mobile_number?.length - b.mobile_number?.length,
      sortOrder:
        sortedInfo.columnKey === "mobile_number" ? sortedInfo.order : null,
      ellipsis: true,
      render: (_, record) => {
        return !_ ? "N/A" : _;
      },
    },
    {
      title: t("RURAL_URBAN"),
      dataIndex: "rural_urban",
      key: "rural_urban",
      sorter: (a, b) => a.rural_urban?.length - b.rural_urban?.length,
      sortOrder:
        sortedInfo.columnKey === "rural_urban" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: t("TABLE_DISTRICT"),
      dataIndex: "district",
      key: "district",
      sorter: (a, b) => a.district.length - b.district.length,
      sortOrder: sortedInfo.columnKey === "district" ? sortedInfo.order : null,
      ellipsis: true,
      render: (_, record) => {
        return _?.replace(/\W/g, "")?.replace(/\d/g, "");
      },
    },
    {
      title: t("TABLE_ACTION"),
      key: "action",
      render: (_, record) => {
        return (
          <Button onClick={() => handleModifyForm(record)} type="primary">
            {t("MODIFY")}
          </Button>
        );
      },
    },
  ];

  // filter data
  useEffect(() => {
    let filterData = originalTableData;
    // filter rural/urban
    if (rural_urban) {
      filterData = filterData.filter((obj) => obj.rural_urban === rural_urban);
    }
    // filter rural/urban and district
    if (rural_urban && districtOption) {
      filterData = filterData.filter(
        (obj) =>
          obj.rural_urban === rural_urban && obj.district === districtOption
      );
    }
    setCopyOfOriginalTableData(filterData);
  }, [rural_urban, districtOption]);

  const onSave = async (values: any) => {
    setVisisble(false);
    let newValues = {
      name: values.name,
      mobile_number: values?.mobile_number,
      district: values?.district,
    };
    let body: any = { ...{ code: editId }, ...newValues };
    setLoading(true);
    let result = await POSTAPIS_WITH_AUTH("update_districts_Data", body, token);
    if (result.code == 200) {
      await GetTablData();
      setLoading(false);
    } else {
      NotificationError("Update Failed");
    }
  };

  const handleModifyForm = (row: any) => {
    setVisisble(true);
    setEditId(row.district_code);
    setFormData(row);
    setEditMode("Edit");
  };

  const FormOpen = () => {
    return (
      <ModalModify
        editMode={editmode ? true : false}
        state={formData}
        setRuralOrUrban={(e) => setRuralOrUrban(e)}
        visible={visible}
        onCancel={() => setVisisble(false)}
        onSave={onSave}
      />
    );
  };
  const handleCh = (value: string) => {
    setRowsPerPage(Number(value));
  };

  const handleClickClearFilters = () => {
    setDistrict("");
    setRuralOrUrban("");
  };

  const handleRuralOrUrban = (value: string) => {
    if (value !== rural_urban) {
      setRuralOrUrban(value);
      setDistrict("");
      const reset = originalTableData.filter(
        (obj) => obj.rural_urban === value
      );
      setDistrictSelect(reset);
    }
  };

  const handleSelectedDistrict = (value: string) => {
    if (value !== districtOption) {
      setDistrict(value);
    }
  };

  const rednerDistrictsData = () => (
    <>
      {visible ? FormOpen() : ""}
      <div className={classNames(styles.districtPage, "district-page-list")}>
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
                <Form.Item>
                  <Select
                    placeholder="Rural/Urban"
                    onChange={handleRuralOrUrban}
                    value={rural_urban}
                    defaultValue={''}
                  >
                    <Option value={''}>Select Rural/Urban</Option>
                    {(RURAL_OR_URBAN_FILTER_OPTIONS || []).map((name) => (
                      <Option key={name} value={name}>
                        {name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>
            </Col>
            <Col sm={6} xs={24}>
              <div className={styles.selecttypes}>
                <Form.Item>
                  <Select
                    placeholder="Select District"
                    disabled={rural_urban ? false : true}
                    onChange={handleSelectedDistrict}
                    value={districtOption}
                  >
                    <Option value={''}>Select District</Option>
                    {(districtSelect || [])?.map((obj: any, i) => (
                      <Option
                        key={`${obj.district}_${obj.rural_urban}`}
                        value={obj.district}
                      >
                        {obj?.district?.replace(/\W/g, "")?.replace(/\d/g, "")}
                      </Option>
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
              <SelectRowsPerPage handleCh={handleCh} />
            </Col>
            <Col sm={12} xs={12} className={styles.headerRow}>
              <span>{t("DISTRICT_HEALTH_OFFICER")}</span>
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
            columns={columns}
            bordered
            dataSource={copyOfOriginalTableData}
            rowKey={(record) => `${record.district}_${record.rural_urban}`}
            pagination={{
              showTotal: (total, range) =>
                `${range[0]}-${range[1]} of ${total} items`,
              current: currentPage,
              pageSize: rowsPerPage,
              total: copyOfOriginalTableData?.length || 0,
            }}
            onChange={handleChange}
          />
        </div>
      </div>
    </>
  );

  return <>{<Spin spinning={loading}>{rednerDistrictsData()}</Spin>}</>;
};

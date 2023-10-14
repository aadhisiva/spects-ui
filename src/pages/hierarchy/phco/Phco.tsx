import React, { useEffect, useState } from "react";
import { Button, Col, Row, Select, Spin, Table, Tooltip, message } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import styles from "./Phco.module.scss";
import classNames from "classnames";
import "./Phco.custom.scss";
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
import {
  MAKE_NULL_TO_VALUES,
  NO,
  RURAL_OR_URBAN_FILTER_OPTIONS,
  YES,
} from "../../../utilities";
import { Option } from "antd/es/mentions";
import MapUnmappedSelect from "../../../components/common/mapUnmappedSelect/mapUnmappedSelect";

interface DataType {
  key: string;
  name: string;
  mobile_number: string;
  district: string;
  taluka: string;
  sub_centre: string;
  village: string;
  rural_urban: string;
  health_facility: string;
}

export const PhcoTable: React.FC = () => {
  // translation
  const { t } = useTranslation();
  // loading
  const [loading, setLoading] = useState(true);
  const [visible, setVisisble] = useState(false);
  // table data
  const [originalTableData, setOriginalTableData] = useState<DataType[]>([]);
  const [copyOfOriginalTableData, setCopyOfOriginalTableData] = useState<
    DataType[]
  >([]);

  const [formData, setFormData] = useState({});
  const [editmode, setEditMode] = useState("");
  const [queryString, setQueryString] = useState<string>("");
  const [editId, setEditId] = useState([]);
  // antd table content
  const [filteredInfo, setFilteredInfo] = useState<
    Record<string, FilterValue | null>
  >({});
  const [sortedInfo, setSortedInfo] = useState<SorterResult<DataType>>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  // select values
  const [rural_urban, setRuralOrUrban] = useState("");
  const [talukaOption, setTalukaOption] = useState("");
  const [districtOption, setDistrict] = useState("");
  const [phcoOption, setPhcoOption] = useState("");
  // selected values
  const [districtSelect, setDistrictSelect] = useState<DataType[]>([]);
  const [talukaSelect, setTalukaSelect] = useState<DataType[]>([]);
  const [phcoSelected, setPhcoSelected] = useState<DataType[]>([]);

  const [mapped, setMapped] = useState("all");
  // auth user
  const [userData] = useFetchUserData();
  const token = userData?.userData?.token;
  const type = userData?.userData?.type;
  // login data
  const checkUserLogin = type == "district_officer";
  const talukaLogin = type == "taluka";
  const bodyData: any = {
    codes: userData?.userData?.codes,
    type: userData?.userData?.type,
  };

  const GetTablData = async () => {
    if (checkUserLogin) {
      let result = await POSTAPIS_WITH_AUTH(`phco_data`, bodyData, token);
      if (result.code == 200) {
        setLoading(false);
        setOriginalTableData(result?.data);
        setCopyOfOriginalTableData(result?.data);
      } else {
        NotificationError(result.message);
      }
    } else if (talukaLogin) {
      let result = await POSTAPIS_WITH_AUTH(`phco_data`, bodyData, token);
      if (result.code == 200) {
        setLoading(false);
        setOriginalTableData(result?.data);
        setCopyOfOriginalTableData(result?.data);
      } else {
        NotificationError(result.message);
      }
    } else {
      let result = await GET_APIS(`phco_data`, token);
      if (result.code == 200) {
        let uniqueData: any = _.uniqBy(result?.data, "health_facility");
        setLoading(false);
        setOriginalTableData(uniqueData);
        setCopyOfOriginalTableData(uniqueData);
      } else {
        NotificationError(result.message);
      }
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
      onFilter: (value: any, record) => {
        return (
          String(record.name).toLowerCase().includes(value.toLowerCase()) ||
          String(record.mobile_number)
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(record.district).toLowerCase().includes(value.toLowerCase())
        );
      },
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
        return _.replace(/\W/g, "").replace(/\d/g, "");
      },
    },
    {
      title: t("TABLE_TALUKA"),
      dataIndex: "taluka",
      key: "taluka",
      sorter: (a, b) => a.taluka.length - b.taluka.length,
      sortOrder: sortedInfo.columnKey === "taluka" ? sortedInfo.order : null,
      ellipsis: true,
      render: (_, record) => {
        return _.replace(/\W/g, "").replace(/\d/g, "");
      },
    },
    {
      title: t("PHCO"),
      dataIndex: "health_facility",
      key: "health_facility",
      sorter: (a, b) => a.health_facility.length - b.health_facility.length,
      sortOrder:
        sortedInfo.columnKey === "health_facility" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: t("TABLE_ACTION"),
      key: "action",
      render: (_, record) => {
        return (
          <div className={styles.tableActions}>
            <Button onClick={() => handleModifyForm(record)} type="primary">
              {t("MODIFY")}
            </Button>
            <Tooltip title={"Remove Refractionist details"}>
              <Button onClick={() => handleDeleteRecord(record)} type="primary">
                {t("REMOVE_USER")}
              </Button>
            </Tooltip>
          </div>
        );
      },
    },
  ];

  const handleDeleteRecord = async (row: any) => {
    let bodyData: any = {
      type,
      district: NO,
      taluka: NO,
      phc: YES,
      refractionist: NO,
      code: row.health_facility_code,
    };
    setLoading(true);
    let result = await POSTAPIS_WITH_AUTH(MAKE_NULL_TO_VALUES, bodyData, token);
    if (result.code == 200) {
      setTimeout(async () => {
        await GetTablData();
        setLoading(false);
      }, 2000);
    } else {
      return message.error("Update Failed");
    }
  };

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
    // filter rural/urban and district and taluka
    if (rural_urban && districtOption && talukaOption) {
      filterData = filterData.filter(
        (obj) =>
          obj.rural_urban === rural_urban &&
          obj.district === districtOption &&
          obj.taluka === talukaOption
      );
    }
    // filter rural/urban and district and taluka and phco(health facility)
    if (rural_urban && districtOption && talukaOption && phcoOption) {
      filterData = filterData.filter(
        (obj) =>
          obj.rural_urban === rural_urban &&
          obj.district === districtOption &&
          obj.taluka === talukaOption &&
          obj.health_facility === phcoOption
      );
    }
    setCopyOfOriginalTableData(filterData);
  }, [rural_urban, districtOption, talukaOption, phcoOption]);

  const onSave = async (values: any) => {
    setLoading(true);
    setVisisble(false);
    let newValues = {
      name: values.name,
      mobile_number: values?.mobile_number,
      health_facility: values?.health_facility,
    };
    let body: any = { ...{ code: editId }, ...newValues };
    let result = await POSTAPIS_WITH_AUTH("update_phco_data", body, token);
    if (result.code == 200) {
      setTimeout(async () => {
        await GetTablData();
        setLoading(false);
      }, 2000);
    } else {
      NotificationError("Update Failed");
    }
    setVisisble(false);
  };

  const handleModifyForm = (row: any) => {
    setVisisble(true);
    setEditId(row.health_facility_code);
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
    NotificationSuccess("success");
    setRowsPerPage(Number(value));
  };

  const handleClickClearFilters = () => {
    setDistrict("");
    setRuralOrUrban("");
    setTalukaOption("");
    setPhcoOption("");
  };

  const handleRuralOrUrban = (value: string) => {
    if (value !== rural_urban) {
      setRuralOrUrban(value);
      setDistrict("");
      setTalukaOption("");
      setPhcoOption("");
      let reset = originalTableData.filter((obj) => obj.rural_urban === value);
      setDistrictSelect(reset);
    }
  };

  const handleSelectedDistrict = (value: string) => {
    if (value !== districtOption) {
      setDistrict(value);
      setTalukaOption("");
      setPhcoOption("");
      let reset = districtSelect.filter((obj) => obj.district === value);
      setTalukaSelect(reset);
    }
  };

  const handleSelectedTaluka = (value: string) => {
    if (value !== talukaOption) {
      setTalukaOption(value);
      setPhcoOption("");
      let reset = talukaSelect.filter((obj) => obj.taluka === value);
      setPhcoSelected(reset);
    }
  };
  const handlePhcoSelectMethod = (value: string) => {
    if (value !== phcoOption) {
      setPhcoOption(value);
    }
  };

  const handleChangeMapOrUnMap = (value: string) => {
    setMapped(value);
    if (value == "all") {
      setCopyOfOriginalTableData(originalTableData);
    } else if (value == "mapped") {
      let data = originalTableData.filter((obj) => obj.mobile_number);
      setCopyOfOriginalTableData(data);
    } else {
      let data = originalTableData.filter((obj) => !obj.mobile_number);
      setCopyOfOriginalTableData(data);
    }
  };

  const renderTalukaData = () => (
    <>
      {visible ? FormOpen() : ""}
      <div className={classNames(styles.phcoPage, "phco-page-list")}>
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
                <Select
                  showSearch
                  allowClear
                  style={{ width: "100%" }}
                  placeholder="Rural/Urban"
                  onChange={handleRuralOrUrban}
                  value={rural_urban}
                  defaultValue={""}
                >
                  <Option value={""}>Select Rural/Urban</Option>
                  {(RURAL_OR_URBAN_FILTER_OPTIONS || []).map((name) => (
                    <Option key={name} value={name}>
                      {name}
                    </Option>
                  ))}
                </Select>
              </div>
            </Col>
            <Col sm={6} xs={24}>
              <div className={styles.selecttypes}>
                <Select
                  showSearch
                  allowClear
                  style={{ width: "100%" }}
                  searchValue=""
                  placeholder="Select District"
                  disabled={rural_urban ? false : true}
                  onChange={handleSelectedDistrict}
                  defaultValue={""}
                  value={districtOption}
                >
                  <Option value={""}>Select District</Option>
                  {(
                    Array.from(
                      new Set(districtSelect.map((obj) => obj.district))
                    ) || []
                  )?.map((obj: any, i) => (
                    <Option key={String(i)} value={`${obj}`}>
                      {obj.replace(/\W/g, "").replace(/\d/g, "")}
                    </Option>
                  ))}
                </Select>
              </div>
            </Col>
            <Col sm={6} xs={24}>
              <div className={styles.selecttypes}>
                <Select
                  showSearch
                  allowClear
                  style={{ width: "100%" }}
                  placeholder="Select Taluka"
                  disabled={districtOption ? false : true}
                  onChange={handleSelectedTaluka}
                  defaultValue={""}
                  value={talukaOption}
                >
                  <Option value={""}>Select Taluka</Option>
                  {(
                    Array.from(
                      new Set(talukaSelect.map((obj) => obj.taluka))
                    ) || []
                  )?.map((obj: any, i) => (
                    <Option key={String(i)} value={`${obj}`}>
                      {obj?.replace(/\W/g, "")?.replace(/\d/g, "")}
                    </Option>
                  ))}
                </Select>
              </div>
            </Col>
            <Col sm={6} xs={24}>
              <div className={styles.selecttypes}>
                <Select
                  showSearch
                  allowClear
                  style={{ width: "100%" }}
                  placeholder="Select Phc"
                  disabled={talukaOption ? false : true}
                  onChange={handlePhcoSelectMethod}
                  defaultValue={""}
                  value={phcoOption}
                >
                  <Option value={""}>Select PHC</Option>
                  {(phcoSelected || [])?.map((obj: any, i) => (
                    <Option key={String(i)} value={`${obj.health_facility}`}>
                      {obj.health_facility}
                    </Option>
                  ))}
                </Select>
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
            <Col sm={4} xs={12} className={styles.slectRows}>
              <MapUnmappedSelect
                handleChange={handleChangeMapOrUnMap}
                value={mapped}
                count={copyOfOriginalTableData.length}
              />
            </Col>
            <Col sm={8} xs={12} className={styles.headerRow}>
              <span>{t("PHCO_HEALTH_OFFICER")}</span>
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
            style={{ tableLayout: "auto" }}
            columns={columns}
            bordered
            dataSource={copyOfOriginalTableData}
            pagination={{
              showTotal: (total, range) =>
                `${range[0]}-${range[1]} of ${total} items`,
              current: currentPage,
              pageSize: rowsPerPage,
              total: copyOfOriginalTableData.length,
            }}
            onChange={handleChange}
          />
        </div>
      </div>
    </>
  );

  return <>{<Spin spinning={loading}>{renderTalukaData()}</Spin>}</>;
};

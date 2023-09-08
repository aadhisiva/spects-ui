import React, { useEffect, useState } from "react";
import { Button, Col, Popover, Row, Select, Spin, Table, Tooltip } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import styles from "./Refractionist.module.scss";
import classNames from "classnames";
import "./Refractionist.custom.scss";
import { FilterValue, SorterResult } from "antd/es/table/interface";
import { GET_APIS, POSTAPIS_WITH_AUTH } from "../../../api/apisSpectacles";
import {
  NotificationError,
  NotificationSuccess,
} from "../../../components/common/Notifications/Notifications";
import SelectRowsPerPage from "../../../components/common/SelectItems/SelectRowsPerPage";
import { ModalModify } from "../../../components/common/ModalModify";
import Search from "antd/es/input/Search";
import { useTranslation } from "react-i18next";
import { useFetchUserData } from "../../../utilities/userDataHook";
import { RURAL_OR_URBAN_FILTER_OPTIONS } from "../../../utilities";
import { Option } from "antd/es/mentions";

interface DataType {
  key: string;
  refractionist_name: string;
  refractionist_mobile: string;
  district: string;
  taluka: string;
  sub_centre: string;
  village: string;
  rural_urban: string;
  health_facility: string;
}

export const RefractionistTable: React.FC = () => {
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
  // edit content
  const [editmode, setEditMode] = useState<boolean>();
  const [editId, setEditId] = useState([]);
  const [formData, setFormData] = useState({});
  // antd table content
  const [filteredInfo, setFilteredInfo] = useState<
    Record<string, FilterValue | null>
  >({});
  const [queryString, setQueryString] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortedInfo, setSortedInfo] = useState<SorterResult<DataType>>({});
  // select values
  const [rural_urban, setRuralOrUrban] = useState("");
  const [talukaOption, setTalukaOption] = useState("");
  const [districtOption, setDistrict] = useState("");
  const [subCentreOption, setSubCentreOption] = useState("");
  const [phcoOption, setPhcoOption] = useState("");
  // selected content
  const [districtSelect, setDistrictSelect] = useState<DataType[]>([]);
  const [talukaSelect, setTalukaSelect] = useState<DataType[]>([]);
  const [subCentreSelect, setSubCentreSelect] = useState<DataType[]>([]);
  const [phcoSelected, setPhcoSelected] = useState<DataType[]>([]);

  // auth user
  const [userData] = useFetchUserData();
  const token = userData?.userData?.token;
  const type = userData?.userData?.type;

  // const unique_id: any = {
  //   unique_id: userData?.userData?.unique_id,
  //   type: userData?.userData?.type,
  // };

  const bodyData: any = {
    codes: userData?.userData?.codes,
    type: userData?.userData?.type,
  };

  const GetTablData = async () => {
    // let { data } = await POSTAPIS_WITH_AUTH(`getUser_data`, unique_id, token);
    if (type == "district_officer") {
      // let uniqueBody: any = Array.from(
      //   new Set(data?.map((obj: any) => obj.district))
      // );
      // let bodyData: any = {
      //   districts: uniqueBody,
      // };
      let result = await POSTAPIS_WITH_AUTH(`all_masters`, bodyData, token);
      if (result.code == 200) {
        setLoading(false);
        setOriginalTableData(result?.data);
        setCopyOfOriginalTableData(result?.data);
      } else {
        NotificationError(result.message);
      }
    } else if (type == "taluka") {
      // let uniqueBody: any = Array.from(
      //   new Set(data?.map((obj: any) => obj.taluka))
      // );
      // let bodyData: any = {
      //   talukas: uniqueBody,
      // };
      let result = await POSTAPIS_WITH_AUTH(`all_masters`, bodyData, token);
      if (result.code == 200) {
        setLoading(false);
        setOriginalTableData(result?.data);
        setCopyOfOriginalTableData(result?.data);
      } else {
        NotificationError(result.message);
      }
    } else if (type == "phco") {
      // let uniqueBody: any = Array.from(
      //   new Set(data?.map((obj: any) => obj.health_facility))
      // );
      // let bodyData: any = {
      //   health_facility: uniqueBody,
      // };
      let result = await POSTAPIS_WITH_AUTH(`all_masters`, bodyData, token);
      if (result.code == 200) {
        setLoading(false);
        setOriginalTableData(result?.data);
        setCopyOfOriginalTableData(result?.data);
      } else {
        NotificationError(result.message);
      }
    } else {
      let result = await GET_APIS(`all_masters`, token);
      if (result.code == 200) {
        setLoading(false);
        setOriginalTableData(result?.data);
        setCopyOfOriginalTableData(result?.data);
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
      title: t("TABLE_REFRACTIONIST_NAME"),
      dataIndex: "refractionist_name",
      key: "refractionist_name",
      sorter: (a, b) =>
        a.refractionist_name?.length - b.refractionist_name?.length,
      sortOrder:
        sortedInfo.columnKey === "refractionist_name" ? sortedInfo.order : null,
      ellipsis: true,
      render: (_, record) => {
        return !_ ? "N/A" : _;
      },
    },
    {
      title: t("TABLE_REFRACTIONIST_MOBILE"),
      dataIndex: "refractionist_mobile",
      key: "refractionist_mobile",
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
        return _?.replace(/\W/g, "").replace(/\d/g, "");
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
        return _?.replace(/\W/g, "").replace(/\d/g, "");
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
      title: t("TABLE_SUBCENTRE"),
      key: "sub_centre",
      dataIndex: "sub_centre",
      sorter: (a, b) => a.sub_centre.length - b.sub_centre.length,
      sortOrder:
        sortedInfo.columnKey === "sub_centre" ? sortedInfo.order : null,
      ellipsis: true,
    },
    // {
    //   title: t("TABLE_VILLAGE_WARD"),
    //   key: "village",
    //   dataIndex: "village",
    //   sorter: (a, b) => a.village.length - b.village.length,
    //   sortOrder: sortedInfo.columnKey === "village" ? sortedInfo.order : null,
    //   ellipsis: true,
    // },
    {
      title: t("TABLE_ACTION"),
      key: "action",
      render: (_, record) => {
        return (
          <div className={styles.tableActions}>
            <Button onClick={() => handleModifyForm(record)} type="primary">
            {t("MODIFY")}
            </Button>
            {/* <Tooltip title={"add multiple refractionists with same village"}>
              <Button onClick={() => handleAddForm(record)} type="primary">
              {t("ADD")}
              </Button>
            </Tooltip> */}
          </div>
        );
      },
    },
  ];

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
    // filter rural/urban and district and taluka and sub centre
    if (rural_urban && districtOption && talukaOption && subCentreOption) {
      filterData = filterData.filter(
        (obj) =>
          obj.rural_urban === rural_urban &&
          obj.district === districtOption &&
          obj.taluka === talukaOption &&
          obj.sub_centre === subCentreOption
      );
    }
    setCopyOfOriginalTableData(filterData);
  }, [rural_urban, districtOption, talukaOption, subCentreOption, phcoOption]);

  // const onEditSave = async (values: any) => {
  //   setLoading(true);
  //   setVisisble(false);
  //   delete values?.district;
  //   delete values?.rural_urban;
  //   delete values?.sub_centre;
  //   delete values?.taluka;
  //   delete values?.village;
  //   let body: any = { ...values, ...{ user_unique_id: editId } };
  //   let result = await POSTAPIS_WITH_AUTH("update_data", body, token);
  //   if (result.code == 200) {
  //     await GetTablData();
  //     setLoading(false);
  //   } else {
  //     NotificationError("Update Failed");
  //   }
  //   setVisisble(false);
  // };
  const onEditSave = async (values: any) => {
    setLoading(true);
    setVisisble(false);
    let body: any = { ...values, ...{code: editId} };
    let result = await POSTAPIS_WITH_AUTH("update_data", body, token);
    if (result.code == 200) {
      await GetTablData();
      setLoading(false);
    } else {
      NotificationError("Update Failed");
    }
    setVisisble(false);
  };

  const onAddSave = async (values: any) => {
    setLoading(true);
    setVisisble(false);
    let body: any = { ...values, ...{code: editId} };
    let result = await POSTAPIS_WITH_AUTH(
      "add_new_data_with_exist",
      body,
      token
    );
    if (result.code == 200) {
      await GetTablData();
      setLoading(false);
    } else {
      NotificationError("Created Failed");
    }
    setVisisble(false);
  };

  const handleModifyForm = (row: any) => {
    setVisisble(true);
    setEditId(row.sub_centre_code);
    setFormData(row);
    setEditMode(true);
  };
  const handleAddForm = (row: any) => {
    setVisisble(true);
    setEditId(row.sub_centre_code);
    setFormData(row);
    setEditMode(false);
  };

  let renderItems = copyOfOriginalTableData.filter(obj => {
    if(queryString === "") {
      return obj;
    } else {
      return (
        String(obj.refractionist_name).toLowerCase().includes(queryString.toLowerCase()) ||
        String(obj.refractionist_mobile).toLowerCase().includes(queryString.toLowerCase()) ||
        String(obj.district).toLowerCase().includes(queryString.toLowerCase()) ||
        String(obj.taluka).toLowerCase().includes(queryString.toLowerCase()) ||
        String(obj.rural_urban).toLowerCase().includes(queryString.toLowerCase()) ||
        String(obj.sub_centre).toLowerCase().includes(queryString.toLowerCase()) ||
        String(obj.health_facility).toLowerCase().includes(queryString.toLowerCase()) 
      )
    }
  });

  const FormOpen = () => {
    return (
      <>
        {editmode ? (
          <ModalModify
            editMode={editmode}
            state={formData}
            setRuralOrUrban={(e) => setRuralOrUrban(e)}
            visible={visible}
            onCancel={() => setVisisble(false)}
            onSave={onEditSave}
          />
        ) : (
          <ModalModify
            editMode={editmode}
            state={formData}
            setRuralOrUrban={(e) => setRuralOrUrban(e)}
            visible={visible}
            onCancel={() => setVisisble(false)}
            onSave={onAddSave}
          />
        )}
      </>
    );
  };
  const handleCh = (value: string) => {
    NotificationSuccess("success");
    setRowsPerPage(Number(value));
  };

  const handleClickClearFilters = () => {
    setRuralOrUrban("");
    setDistrict("");
    setTalukaOption("");
    setPhcoOption("");
    setSubCentreOption("");
  };

  const handleRuralOrUrban = (value: string) => {
    if (value !== rural_urban) {
      setRuralOrUrban(value);
      setDistrict("");
      setTalukaOption("");
      setPhcoOption("");
      setSubCentreOption("");
      let reset = originalTableData.filter((obj) => obj.rural_urban === value);
      setDistrictSelect(reset);
    }
  };

  const handleSelectedDistrict = (value: string) => {
    if (value !== districtOption) {
      setDistrict(value);
      setTalukaOption("");
      setPhcoOption("");
      setSubCentreOption("");
      let reset = districtSelect.filter((obj) => obj.district === value);
      setTalukaSelect(reset);
    }
  };

  const handleSelectedTaluka = (value: string) => {
    if (value !== talukaOption) {
      setTalukaOption(value);
      setPhcoOption("");
      setSubCentreOption("");
      let reset = talukaSelect.filter((obj) => obj.taluka === value);
      setPhcoSelected(reset);
    }
  };

  const handleSelectedPhco = (value: string) => {
    if (value !== phcoOption) {
      setPhcoOption(value);
      setSubCentreOption("");
      let reset = phcoSelected.filter((obj) => obj.health_facility === value);
      setSubCentreSelect(reset);
    }
  };

  const handleSubCentreOption = (value: string) => {
    if (value !== subCentreOption) {
      setSubCentreOption(value);
    }
  };

  const renderRefractionistData = () => (
    <>
      {visible ? FormOpen() : ""}
      <div
        className={classNames(
          styles.refractionistPage,
          "refractionist-page-list"
        )}
      >
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
                  style={{ width: "100%" }}
                  placeholder="Rural/Urban"
                  onChange={handleRuralOrUrban}
                  defaultValue={""}
                  value={rural_urban}
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
                  style={{ width: "100%" }}
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
                      {obj?.replace(/\W/g, "")?.replace(/\d/g, "")}
                    </Option>
                  ))}
                </Select>
              </div>
            </Col>
            <Col sm={6} xs={24}>
              <div className={styles.selecttypes}>
                <Select
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
                  style={{ width: "100%" }}
                  placeholder="Select Phc"
                  disabled={talukaOption ? false : true}
                  onChange={handleSelectedPhco}
                  defaultValue={""}
                  value={phcoOption}
                >
                  <Option value={""}>Select PHC</Option>
                  {(
                    Array.from(
                      new Set(phcoSelected.map((obj) => obj.health_facility))
                    ) || []
                  )?.map((obj: any, i) => (
                    <Option key={String(i)} value={`${obj}`}>
                      {obj}
                    </Option>
                  ))}
                </Select>
              </div>
            </Col>
            <Col sm={6} xs={24}>
              <div className={styles.selecttypes}>
                <Select
                  style={{ width: "100%" }}
                  placeholder="Select Sub Centre"
                  disabled={phcoOption ? false : true}
                  onChange={handleSubCentreOption}
                  defaultValue={""}
                  value={subCentreOption}
                >
                  <Option value={""}>Select Sub Centre</Option>
                  {(
                    Array.from(
                      new Set(subCentreSelect.map((obj) => obj.sub_centre))
                    ) || []
                  )?.map((obj: any, i) => (
                    <Option key={String(i)} value={`${obj}`}>
                      {obj}
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
            style={{ tableLayout: "auto" }}
            bordered
            columns={columns}
            dataSource={renderItems}
            pagination={{
              showTotal: (total, range) =>
                `${range[0]}-${range[1]} of ${total} items`,
              current: currentPage,
              pageSize: rowsPerPage,
              total: renderItems.length || 0,
            }}
            onChange={handleChange}
          />
        </div>
      </div>
    </>
  );

  return (
    <>
      <Spin spinning={loading}>{renderRefractionistData()}</Spin>
    </>
  );
};

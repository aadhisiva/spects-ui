import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  DatePicker,
  Empty,
  Form,
  Input,
  Row,
  Select,
  Spin,
  Table,
  message,
} from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import styles from "./ReportsTable.module.scss";
import classNames from "classnames";
import "./ReportsTable.custom.scss";
import { useNavigate } from "react-router";
import { TitleBarComponent } from "../../../components/common/titleBar";
import { FilterValue, SorterResult } from "antd/es/table/interface";
import { NotificationError } from "../../../components/common/Notifications/Notifications";
import SelectRowsPerPage from "../../../components/common/SelectItems/SelectRowsPerPage";
import { GET_APIS, POSTAPIS_WITH_AUTH } from "../../../api/apisSpectacles";
import { ViewTableData } from "../../../components/common/ViewTableData";
import { useTranslation } from "react-i18next";
import { useFetchUserData } from "../../../utilities/userDataHook";
import * as XLSX from "xlsx";
import DistrictSelectItems from "../hierarchyFilters/district";
import {
  DISTRICT_LOGIN,
  PHCO_LOGIN,
  REFRACTIONIST_LOGIN,
  STATE_ADMIN_LOGIN,
  TALUKA_LOGIN,
} from "../../../utilities";
import StateSelectItems from "../hierarchyFilters/state";
import TalukaSelectItems from "../hierarchyFilters/taluka";
import PhcoSelectItems from "../hierarchyFilters/phco";
import RefractionistSelectItems from "../hierarchyFilters/refractionist";

const { Search } = Input;
const { Option } = Select;
const { RangePicker } = DatePicker;
interface DataType {
  key: string;
  type: string;
  refractionist_name: string;
  details: string;
  district: string;
  taluka: string;
  sub_centre: string;
  village: string;
  status: string;
  school_institute_name: string;
  phone_number: string;
  name: string;
  order_number: string;
  health_facility: string;
  created_at: string;
}

interface publicObjType {
  district: string;
  name: string;
  details: string;
  phone_number: string;
  refractionist_name: string;
  status: string;
  sub_centre: string;
  taluka: string;
  type: string;
  village: string;
  health_facility: string;
  order_number: string;
  created_at: string;
}

export const ReportsTable: React.FC = () => {
  const [filteredInfo, setFilteredInfo] = useState<
    Record<string, FilterValue | null>
  >({});
  const [sortedInfo, setSortedInfo] = useState<SorterResult<DataType>>({});
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [visible, setVisible] = useState(false);
  const [formData, setFormData] = useState({});
  // select items
  const [selectedDates, setSelectedDates] = useState("");
  const [refraDeatilsSelect, setRefraDetailsSelect] = useState<publicObjType[]>(
    []
  );
  const [statusSelect, setStatusSelect] = useState<publicObjType[]>([]);
  const [talukaSelect, setTalukaSelect] = useState<publicObjType[]>([]);
  const [villageSelect, setVillageSelect] = useState<publicObjType[]>([]);
  const [subCentreSelect, setSubCentreSelect] = useState<publicObjType[]>([]);
  const [districtSelect, setDistrictSelect] = useState<publicObjType[]>([]);
  const [phcoSelected, setPhcoSelected] = useState<publicObjType[]>([]);

  /** data */
  const [originalTableData, setOriginalTableData] = useState<DataType[]>([]);
  const [copyOfOriginalTableData, setCopyOfOriginalTableData] = useState<
    DataType[]
  >([]);

  /** Fitler actions */
  const [talukaOption, setTalukaOption] = useState("");
  const [refraType, setRefraTypes] = useState("");
  const [refraDeatils, setRefraDetails] = useState("");
  const [districtOption, setDistrictOption] = useState("");
  const [villageOption, setVillageOption] = useState("");
  const [subCentreOption, setSubCentreOption] = useState("");
  const [statusOption, setStatusOption] = useState("");
  const [phcoOption, setPhcoOption] = useState("");

  const [rowsPerPage, setRowsPerPage] = useState(100);
  const [queryString, setQueryString] = useState<string>("");

  /* naviagte */
  const navigate = useNavigate();

  /* custom pagination */
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

  // auth user
  const [userData] = useFetchUserData();
  const token = userData?.userData?.token;
  const type = userData?.userData?.type;
  const codes = userData?.userData?.codes;

  // const bodyData: any = {
  //   codes: userData?.userData?.codes,
  //   type: userData?.userData?.type,
  // };

  /* first rendering only  */
  useEffect(() => {
    (async () => {
      let data = await GET_APIS("uniqueDistricts", token);
      if (data?.code) {
        // setLoading(false);
        setDistrictSelect(data?.data);
      } else {
        NotificationError(data.message);
      }
      // }
    })();
  }, []);

  // // filter operation
  // useEffect(() => {
  //   // filter logic
  //   let filteredData = originalTableData;
  //   if (refraType) {
  //     filteredData = filteredData?.filter((obj) =>
  //       refraType !== "all" ? obj.type === refraType : obj
  //     );
  //   }
  //   // filter types and district
  //   if (refraType && districtOption) {
  //     filteredData = filteredData?.filter((obj) =>
  //       refraType !== "all"
  //         ? obj.type === refraType
  //         : obj && obj.district === districtOption
  //     );
  //   }
  //   // filter types and district and taluka
  //   if (refraType && districtOption && talukaOption) {
  //     filteredData = filteredData?.filter((obj) =>
  //       refraType !== "all"
  //         ? obj.type === refraType
  //         : obj &&
  //           obj.district === districtOption &&
  //           obj.taluka === talukaOption
  //     );
  //   }
  //   // filter types and district and taluka and phco(health_facility)
  //   if (refraType && districtOption && talukaOption && phcoOption) {
  //     filteredData = filteredData?.filter((obj) =>
  //       refraType !== "all"
  //         ? obj.type === refraType
  //         : obj &&
  //           obj.district === districtOption &&
  //           obj.taluka === talukaOption &&
  //           obj.health_facility === phcoOption
  //     );
  //   }
  //   // filter types and district and taluka and phco(health_facility) and sub centre
  //   if (
  //     refraType &&
  //     districtOption &&
  //     talukaOption &&
  //     phcoOption &&
  //     subCentreOption
  //   ) {
  //     filteredData = filteredData?.filter((obj) =>
  //       refraType !== "all"
  //         ? obj.type === refraType
  //         : obj &&
  //           obj.district == districtOption &&
  //           obj.taluka === talukaOption &&
  //           obj.health_facility === phcoOption &&
  //           obj.sub_centre === subCentreOption
  //     );
  //   }
  //   // filter types and district and taluka and phco(health_facility) and sub centre and village
  //   if (
  //     refraType &&
  //     districtOption &&
  //     talukaOption &&
  //     phcoOption &&
  //     subCentreOption
  //     // &&
  //     // villageOption
  //   ) {
  //     filteredData = filteredData?.filter(
  //       (obj) =>
  //         refraType !== "all"
  //           ? obj.type === refraType
  //           : obj &&
  //             obj.district === districtOption &&
  //             obj.taluka === talukaOption &&
  //             obj.health_facility === phcoOption &&
  //             obj.sub_centre === subCentreOption
  //       // &&
  //       // obj.village === villageOption
  //     );
  //   }
  //   // filter types and district and taluka and phco(health_facility) and sub centre and village and dates
  //   if (
  //     refraType &&
  //     districtOption &&
  //     talukaOption &&
  //     phcoOption &&
  //     subCentreOption &&
  //     //  &&
  //     // villageOption
  //     selectedDates
  //   ) {
  //     filteredData = filteredData?.filter((obj) =>
  //       refraType !== "all"
  //         ? obj.type === refraType
  //         : obj &&
  //           obj.district === districtOption &&
  //           obj.taluka === talukaOption &&
  //           obj.health_facility === phcoOption &&
  //           obj.sub_centre === subCentreOption &&
  //           // &&
  //           // obj.village === villageOption
  //           obj.created_at.split("T")[0] >= selectedDates[0] &&
  //           obj.created_at.split("T")[0] <= selectedDates[1]
  //     );
  //   }
  //   // filter types and district and taluka and phco(health_facility) and sub centre and village and status
  //   if (
  //     refraType &&
  //     districtOption &&
  //     talukaOption &&
  //     phcoOption &&
  //     subCentreOption &&
  //     // villageOption &&
  //     selectedDates &&
  //     statusOption
  //   ) {
  //     filteredData = filteredData?.filter((obj) =>
  //       refraType !== "all"
  //         ? obj.type === refraType
  //         : obj &&
  //           obj.district === districtOption &&
  //           obj.taluka === talukaOption &&
  //           obj.health_facility === phcoOption &&
  //           obj.sub_centre === subCentreOption &&
  //           // obj.village === villageOption &&
  //           obj.created_at.split("T")[0] >= selectedDates[0] &&
  //           obj.created_at.split("T")[0] <= selectedDates[1] &&
  //           statusOption !== "all"
  //         ? obj.status === statusOption
  //         : obj
  //     );
  //   }
  //   // filter types and details and district and taluka and phco(health_facility) and sub centre and village and status
  //   if (
  //     refraType &&
  //     districtOption &&
  //     talukaOption &&
  //     phcoOption &&
  //     subCentreOption &&
  //     // villageOption &&
  //     selectedDates &&
  //     statusOption &&
  //     refraDeatils
  //   ) {
  //     filteredData = filteredData?.filter((obj) =>
  //       refraType !== "all"
  //         ? obj.type === refraType
  //         : obj &&
  //           obj.district === districtOption &&
  //           obj.taluka === talukaOption &&
  //           obj.health_facility === phcoOption &&
  //           obj.sub_centre === subCentreOption &&
  //           // obj.village === villageOption &&
  //           obj.created_at.split("T")[0] >= selectedDates[0] &&
  //           obj.created_at.split("T")[0] <= selectedDates[1] &&
  //           statusOption !== "all"
  //         ? obj.status === statusOption
  //         : obj && obj.details == refraDeatils
  //     );
  //   }

  //   setCopyOfOriginalTableData(filteredData);
  // }, [
  //   talukaOption,
  //   refraType,
  //   refraDeatils,
  //   districtOption,
  //   // villageOption,
  //   subCentreOption,
  //   statusOption,
  //   selectedDates,
  //   phcoOption,
  // ]);

  const columns: ColumnsType<DataType> = [
    {
      title: t("TABLE_REFRACTIONIST_NAME"),
      dataIndex: "refractionist_name",
      key: "refractionist_name",
      sorter: (a, b) =>
        a.refractionist_name.length - b.refractionist_name.length,
      sortOrder:
        sortedInfo.columnKey === "refractionist_name" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: t("TABLE_DETAILS"),
      dataIndex: "details",
      key: "details",
      sorter: (a, b) => a.details?.length - b.details?.length,
      sortOrder: sortedInfo.columnKey === "details" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: t("ORDER_NUMBER"),
      dataIndex: "order_number",
      key: "order_number",
      sorter: (a, b) => a.order_number?.length - b.order_number?.length,
      sortOrder:
        sortedInfo.columnKey === "order_number" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: t("TABLE_NAME"),
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name?.length - b.name?.length,
      sortOrder: sortedInfo.columnKey === "name" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: t("TABLE_MOBILE"),
      dataIndex: "phone_number",
      key: "phone_number",
      sorter: (a, b) => a.phone_number?.length - b.phone_number?.length,
      sortOrder:
        sortedInfo.columnKey === "phone_number" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: t("TABLE_DISTRICT"),
      dataIndex: "district",
      key: "district",
      sorter: (a, b) => a.district.length - b.district.length,
      sortOrder: sortedInfo.columnKey === "district" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: t("TABLE_TALUKA"),
      dataIndex: "taluka",
      key: "taluka",
      sorter: (a, b) => a.taluka.length - b.taluka.length,
      sortOrder: sortedInfo.columnKey === "taluka" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: t("PHC(Health Facility)"),
      dataIndex: "health_facility",
      key: "health_facility",
      sorter: (a, b) => a.health_facility.length - b.health_facility.length,
      sortOrder:
        sortedInfo.columnKey === "health_facility" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: t("TABLE_SUBCENTRE"),
      dataIndex: "sub_centre",
      key: "sub_centre",
      sorter: (a, b) => a.sub_centre.length - b.sub_centre.length,
      sortOrder:
        sortedInfo.columnKey === "sub_centre" ? sortedInfo.order : null,
      ellipsis: true,
    },
    // {
    //   title: t("TABLE_VILLAGE_WARD"),
    //   dataIndex: "village",
    //   key: "village",
    //   sorter: (a, b) => a.village.length - b.village.length,
    //   sortOrder: sortedInfo.columnKey === "village" ? sortedInfo.order : null,
    //   ellipsis: true,
    // },
    {
      title: t("TABLE_STATUS"),
      key: "status",
      dataIndex: "status",
      sorter: (a, b) => a.status.length - b.status.length,
      sortOrder: sortedInfo.columnKey === "status" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: t("TABLE_ACTION"),
      key: "action",
      render: (_, record) => {
        return (
          <Button onClick={() => handleModifyForm(record)} type="primary">
            {t("TABLE_VIEW")}
          </Button>
        );
      },
    },
  ];
  /* viewFormData */
  const handleModifyForm = async (row: any) => {
    setVisible(true);
    let body: any = { type: row.type, id: row.id };
    let result = await POSTAPIS_WITH_AUTH("eachDataIdWise", body, token);
    if (result?.code == 200) {
      setFormData(result?.data[0]);
    } else {
      message.warning("Something Went Wrong. Please Try Again");
    }
  };
  /* form Open */
  const FormOpen = () => {
    return (
      <ViewTableData
        state={formData}
        visible={visible}
        onCancel={() => setVisible(false)}
      />
    );
  };

  const handleCh = (value: string) => {
    setRowsPerPage(Number(value));
  };

  let renderItems = copyOfOriginalTableData.filter((obj) => {
    if (queryString === "") {
      return obj;
    } else {
      return (
        String(obj.type).toLowerCase().includes(queryString.toLowerCase()) ||
        String(obj.refractionist_name)
          .toLowerCase()
          .includes(queryString.toLowerCase()) ||
        String(obj.name).toLowerCase().includes(queryString.toLowerCase()) ||
        String(obj.phone_number)
          .toLowerCase()
          .includes(queryString.toLowerCase()) ||
        String(obj.district)
          .toLowerCase()
          .includes(queryString.toLowerCase()) ||
        String(obj.details).toLowerCase().includes(queryString.toLowerCase()) ||
        String(obj.status).toLowerCase().includes(queryString.toLowerCase()) ||
        String(obj.taluka).toLowerCase().includes(queryString.toLowerCase()) ||
        String(obj.health_facility)
          .toLowerCase()
          .includes(queryString.toLowerCase()) ||
        String(obj.sub_centre).toLowerCase().includes(queryString.toLowerCase())
      );
    }
  });

  const handleSlickSearchQuery = async (data: any) => {
    setLoading(true);
    let result = await POSTAPIS_WITH_AUTH("searchData", data, token);
    if (result.code == 200) {
      setOriginalTableData(result.data);
      setCopyOfOriginalTableData(result.data);
    }
    setLoading(false);
  };

  const handleClickDownloadToXlsx = () => {
    let newDate = new Date().toJSON().split("T")[0];
    const worksheet = XLSX.utils.json_to_sheet(copyOfOriginalTableData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, `spectacles_${newDate}.xlsx`);
  };

  const renderReports = () => {
    return (
      <>
        {visible ? FormOpen() : ""}
        <TitleBarComponent title={t("REPORTS_LIST")} image={true} />
        <div className={classNames(styles.reportsTable, "report-page-list")}>
          {type !== REFRACTIONIST_LOGIN ? (
            <div className={styles.informationContainer}>
              <Col sm={4} xs={24} className={styles.infoContainer}>
                <div className={styles.statistics}>
                  <span className={styles.title}>{t("INFORMATION")}</span>
                </div>
              </Col>
              <div className={styles.buttonContainer}>
                <Row>
                  {type == STATE_ADMIN_LOGIN ? (
                    <Col sm={12} xs={24}>
                      <Button
                        style={{ backgroundColor: "#AC8FF2" }}
                        className={styles.infoButtons}
                        onClick={() => navigate("/stateWiseAndDistrictWise")}
                      >
                        {t("STATE_DISTRICT_WISE")}
                      </Button>
                    </Col>
                  ) : type == DISTRICT_LOGIN ? (
                    <Col sm={12} xs={24} className={styles.infoButtons}>
                      <Button
                        style={{ backgroundColor: "#AC8FF2" }}
                        className={styles.infoButtons}
                        onClick={() => navigate("/stateWiseAndDistrictWise")}
                      >
                        {t("DISTRICT_TALUKA_WISE")}
                      </Button>
                    </Col>
                  ) : (
                    ""
                  )}
                  <Col sm={12} xs={24} className={styles.infoButtons}>
                    <Button
                      style={{ backgroundColor: "#62A76C" }}
                      className={styles.infoButtons}
                      onClick={() => navigate("/refractionistLoginReports")}
                    >
                      {t("REFRACTIONIST_REPORTS")}
                    </Button>
                  </Col>
                </Row>
              </div>
            </div>
          ) : (
            ""
          )}
          <div className={styles.table}>
            <Row>
              <Col sm={5} xs={24} className={styles.statisticsContainer}>
                <div className={styles.statistics}>
                  <span className={styles.title}>{t("DETAILED_REPORT")}</span>
                </div>
              </Col>
            </Row>
            {type == REFRACTIONIST_LOGIN ? (
              <RefractionistSelectItems
                styles={styles}
                handleSlickSearchQuery={handleSlickSearchQuery}
                handleClickDownloadToXlsx={handleClickDownloadToXlsx}
                originalTableData={originalTableData}
              />
            ) : (
              ""
            )}
            {type == STATE_ADMIN_LOGIN ? (
              <StateSelectItems
                styles={styles}
                handleSlickSearchQuery={handleSlickSearchQuery}
                handleClickDownloadToXlsx={handleClickDownloadToXlsx}
                originalTableData={originalTableData}
              />
            ) : (
              " "
            )}
            {type == DISTRICT_LOGIN ? (
              <DistrictSelectItems
                styles={styles}
                handleSlickSearchQuery={handleSlickSearchQuery}
                handleClickDownloadToXlsx={handleClickDownloadToXlsx}
                originalTableData={originalTableData}
              />
            ) : (
              " "
            )}
            {type == TALUKA_LOGIN ? (
              <TalukaSelectItems
                styles={styles}
                handleSlickSearchQuery={handleSlickSearchQuery}
                handleClickDownloadToXlsx={handleClickDownloadToXlsx}
                originalTableData={originalTableData}
              />
            ) : (
              " "
            )}
            {type == PHCO_LOGIN ? (
              <PhcoSelectItems
                styles={styles}
                handleSlickSearchQuery={handleSlickSearchQuery}
                handleClickDownloadToXlsx={handleClickDownloadToXlsx}
                originalTableData={originalTableData}
              />
            ) : (
              " "
            )}

            {/* search and select rows */}
            {copyOfOriginalTableData.length == 0 ? (
              <Empty />
            ) : (
              <React.Fragment>
                <Row>
                  <Col sm={17} xs={12} className={styles.slectRows}>
                    <SelectRowsPerPage isFixed={true} />
                  </Col>
                  <Col sm={7} xs={12} className={styles.searchContainer}>
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
                  dataSource={renderItems}
                  bordered
                  pagination={{
                    showTotal: (total, range) =>
                      `${range[0]}-${range[1]} of ${total} items`,
                    current: currentPage,
                    pageSize: rowsPerPage,
                    total: renderItems.length || 0,
                  }}
                  onChange={handleChange}
                />
              </React.Fragment>
            )}
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <Spin spinning={loading}>{renderReports()}</Spin>
    </>
  );
};

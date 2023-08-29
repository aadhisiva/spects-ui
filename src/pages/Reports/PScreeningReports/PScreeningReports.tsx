import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
  Spin,
  Table,
} from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import styles from "./PScreeningReports.module.scss";
import classNames from "classnames";
import "./PScreeningReports.module.scss";
import { useNavigate } from "react-router";
import { TitleBarComponent } from "../../../components/common/titleBar";
import { FilterValue, SorterResult } from "antd/es/table/interface";
import SelectRowsPerPage from "../../../components/common/SelectItems/SelectRowsPerPage";
import { POSTAPIS_WITH_AUTH } from "../../../api/apisSpectacles";
import { useTranslation } from "react-i18next";
import { useFetchUserData } from "../../../utilities/userDataHook";

const { Search } = Input;

interface DataType {
  key: string;
  district: string;
  taluka: string;
  sub_centre: string;
  village: string;
  total_secondary_screening_required: string;
  health_facility: string;
  total_primary_screening_completed: string;
}

export const PrimaryScreeningReports: React.FC = () => {
  const [filteredInfo, setFilteredInfo] = useState<
    Record<string, FilterValue | null>
  >({});
  const [sortedInfo, setSortedInfo] = useState<SorterResult<DataType>>({});
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);

  /** data */
  const [originalTableData, setOriginalTableData] = useState<DataType[]>([]);

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [queryString, setQueryString] = useState<string>("");

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
  let bodyData: any = { codes: userData?.userData?.codes };

  useEffect(() => {
    (async function () {
      let result = await POSTAPIS_WITH_AUTH(
        `get_phco_wise_data`,
        bodyData,
        token
      );
      if (result.code === 200) {
        setOriginalTableData(result.data);
      }
      setLoading(false);
    })();
  }, []);

  const columns: ColumnsType<DataType> = [
    {
      title: t("TABLE_DISTRICT"),
      dataIndex: "district",
      key: "district",
      sorter: (a, b) => a.district.length - b.district.length,
      sortOrder: sortedInfo.columnKey === "district" ? sortedInfo.order : null,
      ellipsis: true,
      filteredValue: [queryString],
      onFilter: (value: any, record) => {
        return (
          String(record.total_secondary_screening_required)
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(record.district).toLowerCase().includes(value.toLowerCase()) ||
          String(record.taluka).toLowerCase().includes(value.toLowerCase()) ||
          String(record.health_facility)
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(record.sub_centre)
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(record.village).toLowerCase().includes(value.toLowerCase())
        );
      },
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
    {
      title: t("TABLE_VILLAGE_WARD"),
      dataIndex: "village",
      key: "village",
      sorter: (a, b) => a.village.length - b.village.length,
      sortOrder: sortedInfo.columnKey === "village" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: t("total secondary screening required"),
      dataIndex: "total_secondary_screening_required",
      key: "village",
      sorter: (a, b) => a.village.length - b.village.length,
      sortOrder: sortedInfo.columnKey === "village" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: t("total primary screening completed"),
      dataIndex: "total_primary_screening_completed",
      key: "village",
      sorter: (a, b) => a.village.length - b.village.length,
      sortOrder: sortedInfo.columnKey === "village" ? sortedInfo.order : null,
      ellipsis: true,
    },
  ];

  /* form Open */
  const handleCh = (value: string) => {
    setRowsPerPage(Number(value));
  };

  const renderReports = () => {
    return (
      <>
        <TitleBarComponent title={t("PRIMARY-SCREENING-LIST")} image={true} />
        <div
          className={classNames(
            styles.PrimaryReportsPage,
            "primary-report-page-list"
          )}
        >
          <div className={styles.table}>
            {/* search and select rows */}
            <Row>
              <Col sm={17} xs={12} className={styles.slectRows}>
                <SelectRowsPerPage handleCh={handleCh} />
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
              bordered
              columns={columns}
              dataSource={originalTableData}
              pagination={{
                showTotal: (total, range) =>
                  `${range[0]}-${range[1]} of ${total} items`,
                current: currentPage,
                pageSize: rowsPerPage,
                total: originalTableData?.length || 0,
              }}
              onChange={handleChange}
            />
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

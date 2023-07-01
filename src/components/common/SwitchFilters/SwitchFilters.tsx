import { Button, Col, Form, Row, Select } from 'antd'
import React, { useEffect, useState } from 'react'
import { SelectItems } from '../SelectItems'
import { findLoginName, validateMessages } from '../../../utilities/reUsableFun';
import { GET_APIS } from '../../api/apisSpectacles';
import { NotificationError } from '../Notifications/Notifications';
import { Option } from 'antd/es/mentions';

type SwicthTypes = {
    selectDataTypes: any,
    selctedData: any,
    onHandleSelectItemChange: (type: string, value: string) => void,
    styles: any,
    type: any,
    onFinish: (a: any) => void
}
export const SwitchFilters: React.FC<SwicthTypes> = ({
    selctedData,
    selectDataTypes,
    onHandleSelectItemChange,
    styles,
    type,
    onFinish
}) => {
    const loginUser: any = findLoginName();
    const [districtData, setDistrictData] = useState([]);
    const [talukaData, setTalukaData] = useState<[]>([]);
    const [subCentreData, setSubCentreData] = useState([]);
    const [villageData, setVillageData] = useState([]);

    // useEffect(() => {
    //     (async () => {
    //         if(selctedData.district){
    //             let data = await GET_APIS(`all_district_wise?type=${type}&district=${selctedData.district}`);
    //             setTalukaData(data.data);
    //         }
    //     })();
    // }, [selctedData.district]);

    // useEffect(() => {
    //     (async () => {
    //         if(selctedData.district){
    //             let data = await GET_APIS(`all_district_wise?type=${type}&district=${selctedData.district}`);
    //             setTalukaData(data.data);
    //         }
    //     })();
    // }, [type]);


    // useEffect(() => {
    //     (async () => {
    //         if(selctedData.sub_centre){
    //             let data = await GET_APIS(`all_district_wise?type=${type}&district=${selctedData.district}&sub=${selctedData.sub_centre}`);
    //             setVillageData(data.data);
    //         }
    //     })();
    // }, [selctedData.sub_centre]);

    // useEffect(() => {
    //     (async () => {
    //         if(selctedData.taluka){
    //             let data = await GET_APIS(`all_district_wise?type=${type}&district=${selctedData.district}&taluka=${selctedData.taluka}`);
    //             setSubCentreData(data.data);
    //         }
    //     })();
    // }, [selctedData.taluka]);
    const ModifiedData = Array.from(new Set(selectDataTypes.map((item: any) => 'rural' && item.district )));
   
    return (
        <div>
            <Form
                name="nest-messages"
                onFinish={onFinish}
                validateMessages={validateMessages}
            >
                <Row className={styles.selectItemsContainer}>
                    {loginUser?.type == "State Admin" ? (
                        <>
                            <Col sm={6} xs={24}>
                                <div className={styles.selecttypes}>
                                <Form.Item name={"district"}
                                   hasFeedback={!selctedData.district ? false : true}
                                    validateStatus="success"
                                    rules={[{ required: true }]}
                                >
                                    <Select
                                        placeholder="Select District"
                                        onChange={(value) => onHandleSelectItemChange('district', value)}
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
                                    placeholder="Select Taluka"
                                    name="taluka"
                                    selectItems={talukaData || []}
                                    hasFeedback={!selctedData.taluka ? false : true}
                                    onChange={(value) => onHandleSelectItemChange('taluka', value)}
                                />
                            </Col>
                            <Col sm={6} xs={24}>
                                <SelectItems
                                    placeholder="Select Sub Center"
                                    name="sub_centre"
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
                        </>
                    ) : loginUser?.type == "District Officer" ? (
                        <>
                            <Col sm={6} xs={24}>
                                <SelectItems
                                    placeholder="Select Taluka"
                                    name="taluka"
                                    selectItems={[]}
                                    hasFeedback={!selctedData.taluka ? false : true}
                                // onChange={(value) => onHandleSelectItemChange('taluka', value)}
                                />
                            </Col>
                            <Col sm={6} xs={24}>
                                <SelectItems
                                    placeholder="Select Sub Center"
                                    name="sub_center"
                                    selectItems={[]}
                                    hasFeedback={!selctedData.sub_center ? false : true}
                                // onChange={(value) => onHandleSelectItemChange('sub_center', value)}
                                />
                            </Col>
                            <Col sm={6} xs={24}>
                                <SelectItems
                                    placeholder="Select Village"
                                    name="village"
                                    selectItems={[]}
                                    hasFeedback={!selctedData.sub_center ? false : true}
                                // onChange={(value) => onHandleSelectItemChange('sub_center', value)}
                                />
                            </Col>
                        </>
                    ) : loginUser?.type == "Taluka" ? (
                        <>
                            <Col sm={6} xs={24}>
                                <SelectItems
                                    placeholder="Select Sub Center"
                                    name="sub_center"
                                    selectItems={selectDataTypes}
                                    hasFeedback={!selctedData.sub_center ? false : true}
                                // onChange={(value) => onHandleSelectItemChange('sub_center', value)}
                                />
                            </Col>
                            <Col sm={6} xs={24}>
                                <SelectItems
                                    placeholder="Select Village"
                                    name="village"
                                    selectItems={selectDataTypes}
                                    hasFeedback={!selctedData.sub_center ? false : true}
                                // onChange={(value) => onHandleSelectItemChange('sub_center', value)}
                                />
                            </Col>
                        </>
                    ) : (
                        <>
                            <Col sm={6} xs={24}>
                                <SelectItems
                                    placeholder="Select Village"
                                    name="village"
                                    selectItems={selectDataTypes}
                                    hasFeedback={!selctedData.sub_center ? false : true}
                                // onChange={(value) => onHandleSelectItemChange('sub_center', value)}
                                />
                            </Col>
                        </>
                    )}
                    <Col sm={6} xs={24}>
                        <div className={styles.selecttypes}>
                            <Button type="primary" htmlType="submit">
                                Search
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Form>
        </div>
    )
}

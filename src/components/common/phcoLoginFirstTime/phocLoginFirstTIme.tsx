import React, { useState, useEffect } from "react";
import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  Modal,
  Popconfirm,
  Row,
  Select,
  Table,
  Typography,
  message,
} from "antd";
import { POSTAPIS_WITH_AUTH } from "../../../api/apisSpectacles";
import { useFetchUserData } from "../../../utilities/userDataHook";

message.config({
  top: 100,
  duration: 2,
  maxCount: 3,
  rtl: true,
  prefixCls: 'my-message',
});

interface IPhocLoginFirstTImeProps extends React.HTMLAttributes<HTMLElement> {
  open: boolean;
  setOpen: () => void;
  onSave: () => void;
}

interface Item {
  user_unique_id: string;
  health_facility: string;
  sub_centre: number;
  village: string;
  total_primary_screening_completed: string;
  total_secondary_screening_required: string;
}
interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: "number" | "text";
  record: Item;
  index: number;
  children: React.ReactNode;
}

const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === "number" ? <InputNumber /> : <Input />;

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            { required: true, message: `Please input your ${title}!` },
            {
                pattern: /^[0-9]{1,10}$/,
                message: `Please enter a valid ${title}`,
            }
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};
export const PhocLoginFirstTIme: React.FC<IPhocLoginFirstTImeProps> = ({
  open,
  setOpen,
  onSave,
}) => {
  const [form] = Form.useForm();
  const [data, setData] = useState<any>([]);
  const [editingKey, setEditingKey] = useState("");

  //redux session
  const [userData] = useFetchUserData();
  const token = userData?.userData?.token;

  const isEditing = (record: Item) => record.user_unique_id === editingKey;

  const edit = (record: Partial<Item> & { user_unique_id: React.Key }) => {
    form.setFieldsValue({ ...record });
    setEditingKey(record.user_unique_id);
  };
let bodyData: any = {codes: userData?.userData?.codes}
  useEffect(() => {
    (async function () {
      if (userData?.userData?.isIntialLogin == "Y") {
        let result = await POSTAPIS_WITH_AUTH(
          `get_phco_wise_data`,
          bodyData,
          token
        );
        if (result.code === 200) {
          setData(result.data);
        }
      }
    })();
  }, []);

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as Item;

      const newData = [...data];
      const index = newData.findIndex((item) => key === item.user_unique_id);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setData(newData);
        setEditingKey("");
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const columns = [
    {
      title: "PHC(Health Facility)",
      dataIndex: "health_facility",
      width: "20%",
    },
    {
      title: "Sub Centre",
      dataIndex: "sub_centre",
      width: "20%",
    },
    {
      title: "Village",
      dataIndex: "village",
      width: "20%",
    },
    {
      title: "Total Primary Screening Completed",
      dataIndex: "total_primary_screening_completed",
      width: "20%",
      editable: true,
    },
    {
      title: "Total Secondary Screening Required",
      dataIndex: "total_secondary_screening_required",
      width: "20%",
      editable: true,
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_: any, record: Item) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.user_unique_id)}
              style={{ marginRight: 8 }}
            >
              Save
            </Typography.Link>
          </span>
        ) : (
          <Typography.Link
            disabled={editingKey !== ""}
            onClick={() => edit(record)}
          >
            Edit
          </Typography.Link>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: Item) => ({
        record,
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });


  return (
    <div>
      <Modal
      style={{overflow: 'scroll'}}
        title="Assign Village Wise Screening"
        centered
        open={open}
        width={1000}
        footer={
          <Button
            onClick={ async () => {
              let checkDataFilledOrNot = data.filter((obj: Item) => 
                obj.total_primary_screening_completed === null || 
                obj.total_secondary_screening_required == null
                );
                let newBody: any = { screenings: data, ...bodyData}
                if(checkDataFilledOrNot?.length !== 0) return message.warning("Please Fill All Fields");
                let result = await POSTAPIS_WITH_AUTH('update_phco_screenings', newBody, token);
                if(result?.code == 200){
                  setOpen();
                  onSave();
                }
            }}
            type="primary"
          >
            Submit
          </Button>
        }
      >
        <Form form={form} component={false}>
          <Table
            components={{
              body: {
                cell: EditableCell,
              },
            }}
            bordered
            dataSource={data}
            columns={mergedColumns}
          />
        </Form>
      </Modal>
    </div>
  );
};

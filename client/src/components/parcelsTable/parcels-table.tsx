import { Button, Col, Modal, Row, Space, Table, Tag } from "antd";
import { useState, useEffect } from "react";
import type { ColumnsType } from "antd/es/table";
import "./parcel-table.scss";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";


type parcel = {
  _id: string;
  name: string;
  pickUpAddress: string;
  dropOffAddress: string;
  status: string;
  isPicked : boolean;
  pickupDate: string;
  picker : string;
  deliveryDate: string;
};

const ParcelTable = () => {
  const [tableData, setTableData] = useState<parcel[]>([]);
  const user = useSelector((state: RootState) => state.user)
  const handlePick = (id : string) => {
    axios({
      method : 'POST',
      url : `/parcels/pick/${id}`,
      headers : {
        Authorization : `bearer ${localStorage.getItem('token')}`
      }
    }).then(res => {
      fetchParcels()
    })
  };
  const handleUpdate = (id : string) => {};
  const columns: ColumnsType<parcel> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "pick-up Address",
      dataIndex: "pickUpAddress",
      key: "pickUpAddress",
    },
    {
      title: "drop Off Address",
      dataIndex: "dropOffAddress",
      key: "dropOffAddress",
    },
    {
      title: "pick up Date",
      dataIndex: "pickupDate",
      key: "pickupDate",
      render: (value: Date) => (value ? new Date(value).toLocaleString() : "-"),
    },
    {
      title: "delivery date",
      dataIndex: "deliveryDate",
      key: "deliveryDate",
      render: (value: Date) => (value ? new Date(value).toLocaleString() : "-"),
    },
    {
      title: "status",
      key: "status",
      dataIndex: "status",
      render: (_, status) => (
        <>
          <Tag
            color={
              status.status === "picked"
                ? "orange"
                : status.status === "notPicked"
                ? "cyan"
                : "green"
            }
            key={status.status}
          >
            {status.status.toUpperCase()}
          </Tag>
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button disabled ={record.isPicked} onClick={() => handlePick(record._id)} type = "primary">pick</Button>
          <Button disabled ={record.picker && record.picker !== user.id ? true : false} onClick={() => handleUpdate(record._id)} type = "default">update status</Button>
        </Space>
      ),
    },
  ];
const fetchParcels = () => {
  axios({
    method: "Get",
    url: `/parcels`,
  }).then((res) => {
    setTableData(res.data);
  });
}
  useEffect(() => {
    fetchParcels()
  }, []);

  return (
    <Row justify="center" align="middle" style={{ height: 500 }}>
      <Col span={18} className="parcelTable">
        <div className="table-header">
          <h2>parcels</h2>
        </div>
        <Table columns={columns} dataSource={tableData} />
      </Col>
    </Row>
  );
};

export default ParcelTable;

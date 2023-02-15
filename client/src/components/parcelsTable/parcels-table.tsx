import { Button, Col, Modal, Row, Space, Table, Tag } from "antd";
import { useState, useEffect } from "react";
import type { ColumnsType } from "antd/es/table";
import "./parcel-table.scss";
import axios from "axios";

interface DataType {
  _id: string;
  name: string;
  pickUpAddress: string;
  dropOffAddress: string;
  status: string;
  pickupDate: string;
  deliveryDate: string;
}

const columns: ColumnsType<DataType> = [
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
    render : (value : Date) => value ? new Date(value).toLocaleString() : "-" 
  },
  {
    title: "delivery date",
    dataIndex: "deliveryDate",
    key: "deliveryDate",
    render : (value : Date) => value ? new Date(value).toLocaleString() : "-" 
  },
  {
    title: "status",
    key: "status",
    dataIndex: "status",
    render: (_, status) => (
      <>
        <Tag
          color={status.status === "picked" ? "orange" : status.status === "notPicked" ? "cyan" : "green"}
          key={status.status}
        >
          {status.status.toUpperCase()}
        </Tag>
      </>
    ),
  },
];

type parcel = {
    _id: string;
    name: string;
    pickUpAddress: string;
    dropOffAddress: string;
    status: string;
    pickupDate: string;
    deliveryDate: string;
  }


const ParcelTable = () => {
  const [tableData, setTableData] = useState<parcel[]>([]);
  useEffect(() => {
    axios({
      method: "Get",
      url: `/parcels`,
    }).then((res) => {
      setTableData(res.data);
    });
  }, []);


  return (
    <Row justify="center" align="middle" style={{ height: 500 }}>
      <Col span={12} className="parcelTable">
        <div className="table-header">
          <h2>parcels</h2>
        </div>
        <Table columns={columns} dataSource={tableData} />
      </Col>
    </Row>
  );
};

export default ParcelTable;

import { Button, Col, Modal, Row, Space, Table, Tag } from "antd";
import { useState, useEffect } from "react";
import type { ColumnsType } from "antd/es/table";
import CreateParcelForm from "../parcel-form/parcel-form";
import "./parcel-table.scss";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

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
  const [modalOpen, setIsOpen] = useState<boolean>(false);
  const [tableData, setTableData] = useState<parcel[]>([]);
  const user = useSelector((state: RootState) => state.user);
  useEffect(() => {
    axios({
      method: "Get",
      url: `/parcels/user/${user.id}`,
    }).then((res) => {
      setTableData(res.data);
    });
  }, []);

  const handleAdd = (values: {}) => {
    console.log(values)
    axios({
      method: "POST",
      url: `/parcels/create`,
      headers: {
        Authorization: `bearer ${localStorage.getItem("token")}`,
      },
      data: values,
    }).then((res) => {
        setIsOpen(false)
      setTableData([...tableData, res.data]);
    });
  };
  return (
    <Row justify="center" align="middle" style={{ height: 500 }}>
      <Col span={12} className="parcelTable">
        <div className="table-header">
          <h2>My parcels</h2>
          <Button onClick={() => setIsOpen(true)}>Add parcel</Button>
        </div>
        <Table columns={columns} dataSource={tableData} />
        <Modal open={modalOpen} onCancel={() => setIsOpen(false)} footer={null}>
          <CreateParcelForm handleFinish={(values) => handleAdd(values)} />
        </Modal>
      </Col>
    </Row>
  );
};

export default ParcelTable;

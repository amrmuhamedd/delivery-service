import { Button, Col, Modal, Row, Space, Table, Tag } from "antd";
import { useState, useEffect } from "react";
import type { ColumnsType } from "antd/es/table";
import "./parcel-table.scss";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import UpdateParcelStatus from "../parcel-form/parcel-form";

export type parcel = {
  _id: string;
  name: string;
  pickUpAddress: string;
  dropOffAddress: string;
  status: string;
  isPicked: boolean;
  pickupDate: string;
  picker: string;
  deliveryDate: string;
};

const ParcelTable = () => {
  const [tableData, setTableData] = useState<parcel[]>([]);
  const [modalOpen, setIsOpen] = useState<boolean>(false);
  const [currentParcel, setCurrentParcel] = useState<parcel>({
    _id: "",
    name: "",
    pickUpAddress: "",
    dropOffAddress: "",
    status: "",
    isPicked: false,
    pickupDate: "",
    picker: "",
    deliveryDate: "",
  });

  const user = useSelector((state: RootState) => state.user);
  const handlePick = (id: string) => {
    axios({
      method: "POST",
      url: `/parcels/pick/${id}`,
      headers: {
        Authorization: `bearer ${localStorage.getItem("token")}`,
      },
    }).then((res) => {
      fetchParcels();
    });
  };
  const handleUpdateStatus = (values: {
    status: string;
    pickupDate: any;
    deliveryDate: any;
  }) => {
    axios({
      method: "PATCH",
      url: `/parcels/change-status`,
      headers: {
        Authorization: `bearer ${localStorage.getItem("token")}`,
      },
      params: {
        id: currentParcel._id,
        status: values.status,
        pickupDate: new Date(values.pickupDate.$d).toISOString(),
        deliveryDate: new Date(values.deliveryDate.$d).toISOString(),
      },
    }).then((res) => {
      fetchParcels();
      setIsOpen(false);
    });
  };
  const handleUpdate = (parcel: parcel) => {
    setIsOpen(true);
    setCurrentParcel(parcel);
  };
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
          <Button
            disabled={record.isPicked}
            onClick={() => handlePick(record._id)}
            type="primary"
          >
            pick
          </Button>
          <Button
            disabled={
              record.picker && record.picker !== user.id
                ? true
                : record.isPicked === false
                ? true
                : false
            }
            onClick={() => handleUpdate(record)}
            type="default"
          >
            update status
          </Button>
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
  };
  useEffect(() => {
    fetchParcels();
  }, []);

  return (
    <Row justify="center" align="middle" style={{ height: 500 }}>
      <Col span={18} className="parcelTable">
        <div className="table-header">
          <h2>parcels</h2>
        </div>
        <Table columns={columns} dataSource={tableData} />
      </Col>
      <Modal
        open={modalOpen}
        onCancel={() => {
          setIsOpen(false);
        }}
        footer={null}
      >
        {currentParcel && (
          <UpdateParcelStatus
            handleFinish={handleUpdateStatus}
            parcel={currentParcel}
          />
        )}
      </Modal>
    </Row>
  );
};

export default ParcelTable;

import { Form, Input, Button, Radio, DatePicker, Checkbox } from "antd";
import { parcel } from "../parcelsTable/parcels-table";
import "./parcel-form.scss";
import dayjs from 'dayjs';
import { useEffect } from "react";

interface Iprops {
  handleFinish: (values: any) => void;
  parcel: parcel;
}
function UpdateParcelStatus({ handleFinish, parcel }: Iprops) {
  const dateFormat = 'YYYY/MM/DD';
  const [form] = Form.useForm();
  useEffect(() => {
form.setFieldsValue({status : parcel?.status })
  },[parcel])
  return (
    <Form form={form} onFinish={handleFinish} className="update-parcel-form" >
      <Form.Item name="status" label = "parcel status">
        <Radio.Group>
          <Radio value="delivered"> delivered </Radio>
          <Radio value="picked"> picked </Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item name="pickupDate" label = "parcel pickup date">
        <DatePicker />
      </Form.Item>
      <Form.Item name="deliveryDate"  label = "parcel delivery date">
        <DatePicker />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="parcel-form-button">
          update
        </Button>
      </Form.Item>
    </Form>
  );
}

export default UpdateParcelStatus;

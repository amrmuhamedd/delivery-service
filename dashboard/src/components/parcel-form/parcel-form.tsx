
import { Form , Input , Button} from "antd"
import './parcel-form.scss'
interface Iprops {
    handleFinish : (values :any) => void
}
function CreateParcelForm({handleFinish} : Iprops) {
  return (
        <Form onFinish={handleFinish} className ="create-parcel-form">
             <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: 'Please input parcel Name!',
              },
            ]}
          >
            <Input  placeholder="write parcel name" />
          </Form.Item>
          <Form.Item
            name="pickUpAddress"
            rules={[
              {
                required: true,
                message: 'Please input pick up address!',
              },
            ]}
          >
            <Input  placeholder="write pick up address" />
          </Form.Item>
          <Form.Item
            name="dropOffAddress"
            rules={[
              {
                required: true,
                message: 'Please input drop off address',
              },
            ]}
          >
            <Input
              placeholder="write drop off address"
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="parcel-form-button">
              Create 
            </Button>
          </Form.Item>
     </Form>
  )
}

export default CreateParcelForm
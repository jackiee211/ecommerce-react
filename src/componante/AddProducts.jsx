import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  Popconfirm,
  Row,
  Select,
  message,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import {addProduct} from "../Redux/Actions/AddProduct"


const { TextArea } = Input;

const normFile = (e) => (Array.isArray(e) ? e : e?.fileList);

const AddProductForm = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.getProductsReducer.products);
  const [form] = Form.useForm();
  const [status, setStatus] = useState(null);
  const [ productCount ] = [products.length]
  const success = () => {
    messageApi.open({
      type: 'success',
      content: 'Product Added Successfully',
    });
  };

  const error = () => {
    messageApi.open({
      type: 'error',
      content: 'This is an error message',
    });
  };


  const onFinish = (values) => {
    console.log(values);
    if (!values.title || typeof values.title !== "string") {
          message.error("Product title must be set correctly and be a non-empty string!");
          return;
        }
        if (!isNaN(Number(values.title))) {
          message.error("Product title cannot be just a number!");
          return;
        }
        if (Number(values.price) <= 0) {
          message.error("Product price must be greater than zero!");
          return;
        }
        if (Number(values.stock) <= 0) {
          message.error("Product stock must be greater than zero!");
          return;
        }
        if (Number(values.discount) < 0) {
          message.error("Product discount cannot be negative!");
          return;
        }
    // axios
    //   .post(
    //     "https://dummyjson.com/products/add",
    //     {
    //       // id: products[products.length - 1].id ,
    //       title: values.name,
    //       category: values.category,
    //       price: values.price,
    //       discount: values.discount,
    //       description: values.description,
    //     },
    //     {
    //       headers: { "Content-Type": "application/json" },
    //     }
    //   )
    //   .then((response) => {
    //     setStatus("success"); // Show success message
    //     console.log("Product added:", response.data);

      //!  dispatch action to update Redux state

      dispatch(addProduct(values));
      success()
      form.resetFields();

      // })
      // .catch((error) => {
      //   setStatus("error"); // Show error message
      //   console.error("Error adding product:", error);
      // });
  };
  const titleValue = Form.useWatch("title", form);
  return (
    <>
    {contextHolder}
      <Row justify="center" align="middle" style={{ minHeight: "100vh", padding: "20px" }}>
        <Col sm={8} md={10} lg={12}>
          <Form form={form} layout="vertical" onFinish={onFinish}>
            <Row justify="center" style={{ minHeight: "100vh" }}>
              <Col sm={24} md={48}>
                <Form.Item label="Product Name" name="title" rules={[{ required: true, message: "Please enter the product name" }]}>
                  <Input />
                </Form.Item>
                <Form.Item label="Select Category" name="category" rules={[{ required: true, message: "Please select a category" }]}>
                  <Select>
                    {Array.from(new Set(products.map((product) => product.category))).map((category, index) => (
                      <Select.Option key={index} value={category}>
                        {category}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>

                <Form.Item label="Price" name="price" rules={[{ required: true, message: "Please enter the price" }]}>
                  <InputNumber  min={0}/>
                </Form.Item>

                <Form.Item label="stock" name="stock">
                  <InputNumber min={0} />
                </Form.Item>
                <Form.Item label="discount" name="discountPercentage">
                  <InputNumber min={0} />
                </Form.Item>
                <Form.Item label="Description" name="description">
                  <TextArea rows={4} />
                </Form.Item>
                <Form.Item>
                <Popconfirm
                  placement="rightBottom"
                  title="Confirm Product Addition"
                  description="Are you sure you want to add this product?"
                  onConfirm={() => form.submit()}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button 
                  type="primary"
                  disabled={!titleValue || titleValue.trim() === ""}
                  >
                    Add Product
                  </Button>
                </Popconfirm>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default AddProductForm;

import React, { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Upload,
  message,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const { TextArea } = Input;

const normFile = (e) => (Array.isArray(e) ? e : e?.fileList);

const addProductForm = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.getProductsReducer.products);
  const [form] = Form.useForm();
  const [status, setStatus] = useState(null);

  useEffect(() => {
    if (status === "success") {
      messageApi.success("Product added successfully!");
    } else if (status === "error") {
      messageApi.error("Error adding product.");
    }
  }, [status]);

  const onFinish = (values) => {
    axios
      .post(
        "https://dummyjson.com/products/add",
        {
          title: values.name,
          category: values.category,
          price: values.price,
          discount: values.discount,
          description: values.description,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((response) => {
        setStatus("success"); 
        console.log("Product added:", response.data);
      })
      .catch((error) => {
        setStatus("error"); 
        console.error("Error adding product:", error);
      });
  };

  return (
    <>
      {contextHolder}
      <Row justify="center" align="middle" style={{ minHeight: "100vh", padding: "20px" }}>
        <Col span={18}>
          <Form form={form} onFinish={onFinish} layout="vertical">
            <Row justify="center" style={{ minHeight: "100vh" }}>
              <Col sm={24} md={48}>
                <Form.Item label="Product Name" name="name" rules={[{ required: true, message: "Please enter the product name" }]}>
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
                  <InputNumber />
                </Form.Item>

                <Form.Item label="Discount" name="discount">
                  <InputNumber />
                </Form.Item>

                <Form.Item label="Description" name="description">
                  <TextArea rows={4} />
                </Form.Item>

                <Form.Item label="Product Image" name="image" valuePropName="fileList" getValueFromEvent={normFile}>
                  <Upload action="/upload.do" listType="picture-card">
                    <button style={{ border: 0, background: "none" }} type="button">
                      <PlusOutlined />
                      <div style={{ marginTop: 8 }}>Upload</div>
                    </button>
                  </Upload>
                </Form.Item>

                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Add Product
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default addProductForm;

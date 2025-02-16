import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Card, Col, Form, Input, InputNumber, Row, Select, message, Typography, Modal } from "antd";

const { Meta } = Card;
const { Text } = Typography;

const EditProductComponent = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.getProductsReducer.products);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    if (selectedProduct) {
      form.setFieldsValue(selectedProduct);
    }
  }, [selectedProduct, form]);

  const categories = [...new Set(products.map((product) => product.category))];

  const handleEdit = (values) => {
    if (values.title == "" || values.price == -values.price || values.stock == 0 || values.discount == 0 ) {
      message.error("Product data should be set correctly!!")
    }else{
      const updatedProduct = { ...selectedProduct, ...values };
      dispatch({ type: "UPDATE_PRODUCT", payload: updatedProduct });
  
      message.success("Product updated successfully!");
      setIsModalVisible(false);

    }
  };

  return (
    <>
      <Row gutter={[16, 16]}>
        {products.map((product) => (
          <Col  sm={24} md={12} lg={6} key={product.id} style={{ marginBottom: "10px" }}>
            <Card
              hoverable
              style={{
                height: "100%",
                borderRadius: "10px",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                overflow: "hidden",
                maxWidth: "250px",
              }}
              cover={
                <img
                  alt={product.title}
                  src={product.thumbnail}
                  style={{
                    height: "180px",
                    objectFit: "cover",
                    borderTopLeftRadius: "10px",
                    borderTopRightRadius: "10px",
                  }}
                />
              }
            >
              <Meta title={product.title} description={product.description} />
              
              <div style={{ marginTop: "10px" }}>
                <Text strong style={{ fontSize: "16px", color: "#1890ff" }}>
                  ${product.price}
                </Text>
                <Text type="secondary" style={{ marginLeft: "10px" }}>
                  {product.category}
                </Text>
              </div>

              <Button
                type="primary"
                block
                style={{ marginTop: "15px", borderRadius: "5px" }}
                onClick={() => {
                  setSelectedProduct(product);
                  setIsModalVisible(true);
                }}
              >
                Edit
              </Button>
            </Card>
          </Col>
        ))}
      </Row>
      <Modal
        title="Edit Product"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form form={form} onFinish={handleEdit} layout="vertical">
          <Form.Item label="Product Name" name="title">
            <Input />
          </Form.Item>

          <Form.Item label="Category" name="category">
            <Select>
              {categories.map((category) => (
                <Select.Option key={category} value={category}>
                  {category}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="Price" name="price">
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item label="stock" name="stock">
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item label="discount" name="discountPercentage">
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Update Product
            </Button>
            <Button style={{ marginLeft: "10px" }} onClick={() => setIsModalVisible(false)}>
              Cancel
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default EditProductComponent;

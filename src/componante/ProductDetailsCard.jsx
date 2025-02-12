import { Card, Typography, Button, Divider, InputNumber, Row, Col } from "antd";
import { ShoppingCartOutlined, ArrowLeftOutlined } from "@ant-design/icons";
const { Title, Text, Paragraph } = Typography;
import {  useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ProductDetailsCard = ({ product }) => {

    const navigate = useNavigate();
    const [quantity, setQuantity] = useState(1);
    const discountedPrice = product.price - (product.price * product.discountPercentage) / 100;
    const [totalPrice, setTotalPrice] = useState(0);
  
  useEffect(() => {
  
      if (product) {
          
       
          setTotalPrice(prevTotalPrice=>discountedPrice * quantity);
      }   
  }, [ quantity,discountedPrice]);

    return(
        <Card
                cover={
                  <img
                    alt={product.title}
                    src={product.thumbnail}
                    style={{
                      width: "100%",
                      height: "400px",
                      objectFit: "cover",
                      borderTopLeftRadius: "10px",
                      borderTopRightRadius: "10px",
                    }}
                  />
                }
                style={{ borderRadius: "10px", overflow: "hidden", boxShadow: "0px 4px 12px rgba(0,0,0,0.1)" }}
              >
                <Title level={2} style={{ color: "#333" }}>{product.title}</Title>
                <Text type="secondary" style={{ fontSize: "16px" }}>{product.category}</Text>
                <Divider />
        
                <Paragraph style={{ fontSize: "16px", lineHeight: "1.6" }}>{product.description}</Paragraph>
        
                <Row gutter={16} align="middle" style={{ marginBottom: "15px" }}>
                  <Col span={12}>
                    <Title level={3} style={{ color: "#1890ff", margin: 0 }}>Price: ${product.price.toFixed(2)}</Title>
                  </Col>
                  <Col span={12}>
                    <Title level={3} style={{ color: "red", margin: 0 }}>Discount: {product.discountPercentage}%</Title>
                  </Col>
                </Row>
        
                <Divider />
        
                {/*================================= Quantity Selector & Total Price=============================== */}
                <Row gutter={16} align="middle">
                  <Col span={12}>
                    <Text strong style={{ fontSize: "16px" }}>Quantity:</Text>
                    <InputNumber 
                      min={1} 
                      max={product.stock || 10} 
                      defaultValue={1} 
                      onChange={(value) => setQuantity(value)} 
                      style={{ marginLeft: "10px", width: "70px" }} 
                    />
                  </Col>
                  <Col span={12}>
                    <Title level={3} style={{ color: "#52c41a", margin: 0 }}>Total: ${totalPrice.toFixed(2)}</Title>
                  </Col>
                </Row>
        
                {/* ==========================Add to Cart Button =======================================*/}
                <Button
                  type="primary"
                  size="large"
                  icon={<ShoppingCartOutlined />}
                  style={{
                    marginTop: "20px",
                    borderRadius: "8px",
                    width: "100%",
                    backgroundColor: "#52c41a",
                    borderColor: "#52c41a",
                    fontSize: "16px",
                    fontWeight: "bold",
                  }}
                  onClick={() => console.log("Added to Cart:", { product, quantity })}
                >
                  Add to Cart
                </Button>
        
                {/* Back Button */}
                <Button
                  type="default"
                  size="large"
                  icon={<ArrowLeftOutlined />}
                  style={{
                    marginTop: "10px",
                    borderRadius: "8px",
                    width: "100%",
                    fontSize: "16px",
                  }}
                  onClick={() => navigate("/")}
                >
                  Back to Products
                </Button>
              </Card>
    );

};export default ProductDetailsCard;
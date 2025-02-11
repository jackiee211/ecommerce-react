


import React from 'react';
import { Card, Button, Typography } from 'antd';
import { Navigate, useNavigate } from 'react-router-dom';
const { Meta } = Card;
const { Text } = Typography;

const ProductCard = ({ product }) => {
  const navigate = useNavigate(); 
  return (
    <Card
      hoverable
      style={{
        height: "100%",
        borderRadius: "10px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        overflow: "hidden",
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
        onClick={() => navigate(`/productDetails/${product.id}`)}
      >
        View Details
      </Button>
    </Card>
  );
};

export default ProductCard;

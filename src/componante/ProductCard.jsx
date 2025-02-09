
import React from 'react';
import { Card } from 'antd';

const ProductCard = ({ product }) => {
  return (
    <Card
      hoverable
      style={{ width: 240 }}
      cover={<img alt={product.title} src={product.thumbnail} />}
    >
      <Card.Meta title={product.title} description={product.description} />
    </Card>
  );
};export default ProductCard;
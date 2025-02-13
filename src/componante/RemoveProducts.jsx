import { Card, Button, Typography, Row, Col,message, Popconfirm } from 'antd';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

const { Meta } = Card;
const { Text } = Typography;

const cancel = (e) => {
  console.log(e);
  message.error('Product Not Deleted');
};

export default function RemoveProduct() {
  const [messageApi, contextHolder] = message.useMessage();
  const success = () => {
    messageApi.open({
      type: 'success',
      content: 'Product Deleted Successfully',
    });
  };
    const dispatch = useDispatch();
    const products = useSelector((state) => state.getProductsReducer.products);

    const handleDelete = (id) => {
        dispatch({ type: 'DELETE_PRODUCT', payload: id });
        message.success('Product deleted successfully');
    };

    return (

        <div style={{width:"100%", display:"flex",justifyContent:"center",flexWrap:"wrap"}}>
            <h2 style={{width:"100%",marginBottom:"15px"}}>Product List</h2>
            <Row style={{width:"75%"}}>

            {products.length === 0 ? (
              <p>No products available.</p>
            ) : (
              products.map((product) => (
                  <Col sm={24} md={12} lg={6} style={{marginBottom:"10px"}} key={product.id}>
                    <Card
                    hoverable
                    style={{
                      height: "100%",
                      borderRadius: "10px",
                      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                      overflow: "hidden",
                      maxWidth:"250px",
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
              
                    <Popconfirm
                      title="Delete the task"
                      description="Are you sure to delete this Product?"
                      onConfirm={() => handleDelete(product.id)}
                      onCancel={cancel}
                      okText="Yes"
                      cancelText="No"
                    >
                    <Button
                    danger
                    block
                    style={{ marginTop: "15px", borderRadius: "5px" }}
                    >
                    Delete Product
                    </Button>
                      </Popconfirm>
                  </Card>
                  </Col>
                ))
              )}
              </Row>
        </div>
      );
}

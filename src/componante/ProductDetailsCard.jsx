import React, { useState, useEffect } from "react";
import { Card, Typography, Button, Divider, InputNumber, Row, Col, message } from "antd";
import { ShoppingCartOutlined, ArrowLeftOutlined, HeartOutlined, HeartFilled } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Title, Text, Paragraph } = Typography;

const ProductDetailsCard = ({ product }) => {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const discountedPrice = product.price - (product.price * (product.discountPercentage || 0)) / 100;
  const [totalPrice, setTotalPrice] = useState(discountedPrice);
  const [wishlist, setWishlist] = useState([]);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [cart, setCart] = useState([]);
  const [isInCart, setIsInCart] = useState(false);

  useEffect(() => {
    loadWishlist();
    loadCart();

    const handleStorageChange = () => {
      loadWishlist();
      loadCart();
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [product.id]);

  useEffect(() => {
    setTotalPrice(discountedPrice * quantity);
  }, [quantity, discountedPrice]);

  const loadWishlist = () => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const wishlist = currentUser?.wishlist || [];
    setWishlist(wishlist);
    setIsInWishlist(wishlist.some((item) => item.id === product.id));
  };

  const loadCart = () => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const cart = currentUser?.cart || [];
    setCart(cart);
    setIsInCart(cart.some((item) => item.id === product.id));
  };

  const toggleWishlist = () => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser) {
      message.error("You must be logged in to manage your wishlist.");
      return;
    }

    let updatedWishlist = [...(currentUser.wishlist || [])];

    if (isInWishlist) {
      updatedWishlist = updatedWishlist.filter((item) => item.id !== product.id);
    } else {
      updatedWishlist.push(product);
    }

    currentUser.wishlist = updatedWishlist;
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
    window.dispatchEvent(new Event("storage"));

    setWishlist(updatedWishlist);
    setIsInWishlist(!isInWishlist);
    message.success(isInWishlist ? "Removed from wishlist!" : "Added to wishlist!");
  };

  const addToCart = () => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser) {
      message.error("You must be logged in to add items to the cart.");
      return;
    }

    const updatedCart = [...(currentUser.cart || []), product];
    currentUser.cart = updatedCart;
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
    window.dispatchEvent(new Event("storage"));

    setCart(updatedCart);
    setIsInCart(true);
    message.success("Added to cart!");
  };

  const removeFromCart = () => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser) return;

    const updatedCart = currentUser.cart.filter((item) => item.id !== product.id);
    currentUser.cart = updatedCart;
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
    window.dispatchEvent(new Event("storage"));

    setCart(updatedCart);
    setIsInCart(false);
    message.success("Removed from cart!");
    
  };

  return (



    <Card
    hoverable
    style={{
      borderRadius: "12px",
      overflow: "hidden",
      boxShadow: "0px 5px 15px rgba(0,0,0,0.1)",
      transition: "transform 0.2s, box-shadow 0.2s",
      padding: "15px",
    }}
  >
    <Row gutter={[16, 16]} align="middle" wrap>
      {/* Left Side - Image */}
      <Col xs={24} md={10}>
        <img
          alt={product.title}
          src={product.thumbnail}
          style={{
            width: "100%",
            height: "300px",
            objectFit: "cover",
            borderRadius: "10px",
            transition: "transform 0.3s ease-in-out",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        />
      </Col>

      {/* Right Side - Product Info */}
      <Col xs={24} md={14}>
        {/* Product Title */}
        <Title level={3} style={{ color: "#333", marginBottom: "5px" }}>
          {product.title}
        </Title>

        {/* Category Label */}
        <Text
          type="secondary"
          style={{
            display: "inline-block",
            fontSize: "14px",
            backgroundColor: "#f5f5f5",
            padding: "4px 10px",
            borderRadius: "5px",
          }}
        >
          {product.category}
        </Text>

        <Divider />
        {/* Description */}
        <Paragraph style={{ fontSize: "16px", color: "#555", lineHeight: "1.6" }}>
          {product.description}
        </Paragraph>


        {/* Price & Discount */}
        <Row gutter={16} justify="space-between">
          <Col>
            <Title level={4} style={{ color: "#1890ff", margin: 0 }}>
              Price: ${product.price.toFixed(2)}
            </Title>
          </Col>
          <Col>
            <Title level={4} style={{ color: "red", margin: 0 }}>
              -{product.discountPercentage}%
            </Title>
          </Col>
        </Row>

        <Divider />

      

        {/* Wishlist & Cart Buttons */}
        <div style={{ display: "flex",justifyContent:"space-around", marginTop: "15px" }}>
          <Button
            shape="circle"
            icon={isInWishlist ? <HeartFilled style={{ color: "red" }} /> : <HeartOutlined />}
            onClick={toggleWishlist}
            style={{
              borderColor: isInWishlist ? "red" : "gray",
              color: isInWishlist ? "red" : "gray",
              transition: "all 0.2s",
            }}
          />
           <Button
                shape="circle"
                icon={<ShoppingCartOutlined style={{ color: isInCart ? "#ff4d4f" : "gray" }} />}
                onClick={() => (isInCart ? removeFromCart() : addToCart())}
                style={{
                  borderColor: isInCart ? "#ff4d4f" : "gray",
                  color: isInCart ? "#ff4d4f" : "gray",
                  transition: "all 0.2s",
                }}
              />

       
        </div>

        {/* Back Button */}
        <Button
          type="default"
          size="large"
          icon={<ArrowLeftOutlined />}
          style={{
            marginTop: "15px",
            borderRadius: "8px",
            width: "100%",
            fontSize: "16px",
          }}
          onClick={() => navigate("/")}
        >
          Back to Products
        </Button>
      </Col>
    </Row>
  </Card>
  


  );
};

export default ProductDetailsCard;

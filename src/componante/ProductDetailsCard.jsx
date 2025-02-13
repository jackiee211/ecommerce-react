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
          <Title level={3} style={{ color: "#1890ff", margin: 0 }}>
            Price: ${product.price.toFixed(2)}
          </Title>
        </Col>
        <Col span={12}>
          <Title level={3} style={{ color: "red", margin: 0 }}>
            Discount: {product.discountPercentage}%
          </Title>
        </Col>
      </Row>
      <Divider />

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
          <Title level={3} style={{ color: "#52c41a", margin: 0 }}>
            Total: ${totalPrice.toFixed(2)}
          </Title>
        </Col>
      </Row>

      <Button
        type="text"
        icon={isInWishlist ? <HeartFilled style={{ color: "red" }} /> : <HeartOutlined />}
        onClick={toggleWishlist}
        style={{ marginTop: "10px" }}
      >
        {isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
      </Button>

      {isInCart ? (
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
          onClick={removeFromCart}
        >
          Remove From Cart
        </Button>
      ) : (
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
          onClick={addToCart}
        >
          Add to Cart
        </Button>
      )}

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
};

export default ProductDetailsCard;

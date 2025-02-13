import React, { useState, useEffect } from "react";
import { Card, Button, Typography, message } from "antd";
import { HeartOutlined, HeartFilled, ShoppingCartOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Meta } = Card;
const { Text } = Typography;

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [isInCart, setIsInCart] = useState(false);

  // Load user data once
  const loadUserData = () => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser")) || {};
    const wishlist = currentUser.wishlist || [];
    const cart = currentUser.cart || [];

    setIsInWishlist(wishlist.some((item) => item.id === product.id));
    setIsInCart(cart.some((item) => item.id === product.id));
  };

  useEffect(() => {
    loadUserData();

    const handleStorageChange = () => {
      loadUserData();
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [product.id]);

  // General function to update localStorage
  const updateUserData = (key, action) => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (!currentUser) {
      message.error("You must be logged in to perform this action.");
      return;
    }

    let updatedList;
    if (action === "add") {
      updatedList = [...(currentUser[key] || []), product];
    } else {
      updatedList = currentUser[key].filter((item) => item.id !== product.id);
    }

    currentUser[key] = updatedList;
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
    window.dispatchEvent(new Event("storage"));

    if (key === "wishlist") setIsInWishlist(action === "add");
    if (key === "cart") setIsInCart(action === "add");

    message.success(action === "add" ? `Added to ${key}!` : `Removed from ${key}!`);
  };

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

      <div style={{ marginTop: "10px", display: "flex", justifyContent: "space-between" }}>
        <Text strong style={{ fontSize: "16px", color: "#1890ff" }}>
          ${product.price}
        </Text>
        <Text type="secondary">{product.category}</Text>
      </div>

      {/* Wishlist Button */}
      <Button
        type="text"
        icon={isInWishlist ? <HeartFilled style={{ color: "red" }} /> : <HeartOutlined />}
        onClick={() => updateUserData("wishlist", isInWishlist ? "remove" : "add")}
        style={{ marginTop: "10px" }}
      >
        {isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
      </Button>

      {/* Cart Button */}
      <Button
        type="text"
        icon={<ShoppingCartOutlined style={{ color: isInCart ? "red" : "inherit" }} />}
        onClick={() => updateUserData("cart", isInCart ? "remove" : "add")}
        style={{ marginTop: "10px" }}
      >
        {isInCart ? "Remove from Cart" : "Add to Cart"}
      </Button>

      {/* View Button */}
      <Button
        type="primary"
        block
        style={{ marginTop: "10px", borderRadius: "5px" }}
        onClick={() => navigate(`/productDetails/${product.id}`)}
      >
        View Details
      </Button>
    </Card>
  );
};

export default ProductCard;

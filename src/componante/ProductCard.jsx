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
  const [quantity, setQuantity] = useState(0);

  // Load user data once
  const loadUserData = () => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser")) || {};
    const wishlist = currentUser.wishlist || [];
    const cart = currentUser.cart || [];

    setIsInWishlist(wishlist.some((item) => item.id === product.id));
    const cartItem = cart.find((item) => item.id === product.id);
    if (cartItem) {
      setIsInCart(true);
      setQuantity(cartItem.quantity);
    } else {
      setIsInCart(false);
      setQuantity(0);
    }
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
    if (key === "cart") {
      updatedList = currentUser.cart || [];
      const itemIndex = updatedList.findIndex((item) => item.id === product.id);

      if (action === "add") {
        if (itemIndex > -1) {
          updatedList[itemIndex].quantity += 1;
          setQuantity(updatedList[itemIndex].quantity);
        } else {
          updatedList.push({ ...product, quantity: 1 });
          setQuantity(1);
        }
      } else {
        if (itemIndex > -1) {
          if (updatedList[itemIndex].quantity > 1) {
            updatedList[itemIndex].quantity -= 1;
            setQuantity(updatedList[itemIndex].quantity);
          } else {
            updatedList = updatedList.filter((item) => item.id !== product.id);
            setIsInCart(false);
            setQuantity(0);
          }
        }
      }
    } else {
      updatedList = action === "add" ? [...(currentUser[key] || []), product] : currentUser[key].filter((item) => item.id !== product.id);
    }

    currentUser[key] = updatedList;
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
    window.dispatchEvent(new Event("storage"));

    if (key === "wishlist") setIsInWishlist(action === "add");
    if (key === "cart") setIsInCart(action === "add" && !isInCart);

    message.success(action === "add" ? `Added to ${key}!` : `Removed from ${key}!`);
  };

  return (
    <Card
  hoverable
  style={{
    height: "100%",
    borderRadius: "12px",
    boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)",
    overflow: "hidden",
    transition: "transform 0.2s, box-shadow 0.2s",
  }}
  cover={
    <img
      alt={product.title}
      src={product.thumbnail}
      style={{
        height: "220px",
        objectFit: "cover",
        borderTopLeftRadius: "12px",
        borderTopRightRadius: "12px",
      }}
    />
  }
  onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
  onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
>
  <Meta title={product.title} />

  {/* Price & Category */}
  <div style={{ marginTop: "12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
    <Text strong style={{ fontSize: "18px", color: "#1890ff" }}>
      ${product.price}
    </Text>
    <Text
      type="secondary"
      style={{
        fontSize: "14px",
        backgroundColor: "#f0f0f0",
        padding: "3px 8px",
        borderRadius: "5px",
      }}
    >
      {product.category}
    </Text>
  </div>

  {/* Action Buttons */}
  <div style={{ marginTop: "15px" }}>
    {/* Wishlist Button */}

    <div style={{display:"flex",justifyContent:"space-around",alignItems:"center",marginBottom:"10px"}}>


    <Button
      shape="circle"
      icon={isInWishlist ? <HeartFilled style={{ color: "red" }} /> : <HeartOutlined />}
      onClick={() => updateUserData("wishlist", isInWishlist ? "remove" : "add")}
      style={{
        borderColor: isInWishlist ? "red" : "gray",
        color: isInWishlist ? "red" : "gray",
        transition: "all 0.2s",
      }}
    />

    {/* Cart Button */}
    <Button
      shape="circle"
      icon={<ShoppingCartOutlined style={{ color: isInCart ? "#ff4d4f" : "gray" }} />}
      onClick={() => updateUserData("cart", isInCart ? "remove" : "add")}
      style={{
        borderColor: isInCart ? "#ff4d4f" : "gray",
        color: isInCart ? "#ff4d4f" : "gray",
        transition: "all 0.2s",
      }}
    />
    </div>

    {/* View Details Button */}
    <Button
      type="primary"
      style={{
        borderRadius: "6px",
        background: "#1890ff",
        borderColor: "#1890ff",
        width: "100%",
        fontWeight: "bold",
      }}
      onClick={() => navigate(`/productDetails/${product.id}`)}
    >
      View Details
    </Button>
  </div>
</Card>

  );
};

export default ProductCard;
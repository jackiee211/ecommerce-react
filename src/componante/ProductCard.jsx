import React, { useState, useEffect } from "react";
import { Card, Button, Typography, message } from "antd";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Meta } = Card;
const { Text } = Typography;

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const [wishlist, setWishlist] = useState([]);
  const [isInWishlist, setIsInWishlist] = useState(false);

  // Load Wishlist from localStorage
  const loadWishlist = () => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser?.wishlist) {
      setWishlist(currentUser.wishlist);
      setIsInWishlist(currentUser.wishlist.some((item) => item.id === product.id));
    } else {
      setWishlist([]);
      setIsInWishlist(false);
    }
  };

  useEffect(() => {
    loadWishlist();

    const handleStorageChange = () => {
      loadWishlist();
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // Add to Wishlist
  const addToWishlist = () => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (!currentUser) {
      message.error("You must be logged in to add items to the wishlist.");
      return;
    }

    const updatedWishlist = [...(currentUser.wishlist || []), product];

    currentUser.wishlist = updatedWishlist;
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
    window.dispatchEvent(new Event("storage"));

    setWishlist(updatedWishlist);
    setIsInWishlist(true);
    message.success("Added to wishlist!");
  };

  // Remove from Wishlist
  const removeFromWishlist = () => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser) return;

    const updatedWishlist = currentUser.wishlist.filter((item) => item.id !== product.id);

    currentUser.wishlist = updatedWishlist;
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
    window.dispatchEvent(new Event("storage"));

    setWishlist(updatedWishlist);
    setIsInWishlist(false);
    message.success("Removed from wishlist!");
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
      {isInWishlist ? (
        <Button
          type="text"
          icon={<HeartFilled style={{ color: "red" }} />}
          onClick={removeFromWishlist}
          style={{ marginTop: "10px" }}
        >
          Remove from Wishlist
        </Button>
      ) : (
        <Button
          type="text"
          icon={<HeartOutlined />}
          onClick={addToWishlist}
          style={{ marginTop: "10px" }}
        >
          Add to Wishlist
        </Button>
      )}

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

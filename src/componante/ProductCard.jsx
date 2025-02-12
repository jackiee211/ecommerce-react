import React, { useState, useEffect } from "react";
import { Card, Button, Typography } from "antd";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Meta } = Card;
const { Text } = Typography;

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const [wishlist, setWishlist] = useState([]);

  // Function to load the wishlist from localStorage
  const loadWishlist = () => {
    const savedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(savedWishlist);
  };

  // Load wishlist when component mounts
  useEffect(() => {
    loadWishlist();

    // Listen for changes in localStorage
    const handleStorageChange = () => {
      loadWishlist();
    };

    window.addEventListener("storage", handleStorageChange);
    
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // Check if the product is already in the wishlist
  const isInWishlist = wishlist.some((item) => item.id === product.id);

  // Toggle wishlist status
  const toggleWishlist = () => {
    let updatedWishlist;

    if (isInWishlist) {
      updatedWishlist = wishlist.filter((item) => item.id !== product.id);
    } else {
      updatedWishlist = [...wishlist, product];
    }

    // Update localStorage (triggers storage event)
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));

    // Manually trigger update for current component
    setWishlist(updatedWishlist);
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
        onClick={toggleWishlist}
        style={{ marginTop: "10px" }}
      >
        {isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
      </Button>

      {/* View Details Button */}
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

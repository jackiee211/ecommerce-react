import React, { useState } from "react";
import { Menu, Button, Popconfirm } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import WishlistModal from "./WishList";
import CartModal from "./CartModal";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const items = [
    { key: "home", label: "Home", path: "/" },
    ...(currentUser?.role === "admin" ? [{ key: "admin", label: "Admin", path: "/admin" }] : []),
  ];

  const handleLogout = () => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    let users = JSON.parse(localStorage.getItem("users")) || [];

    if (currentUser) {

      users = users.map(user =>
        user.email === currentUser.email ? currentUser : user
      );


      localStorage.setItem("users", JSON.stringify(users));
    }


    localStorage.removeItem("currentUser");

    navigate("/login", { replace: true });
  };

  return (
    <Menu
      theme="dark"
      mode="horizontal"
      selectedKeys={[items.find(item => item.path === location.pathname)?.key]}
      onClick={({ key }) => {
        const item = items.find(i => i.key === key);
        if (item) navigate(item.path);
      }}
      style={{
        display: "flex",
        justifyContent: "space-between",
        position: "fixed",
        width: "100%",
        top: 0,
        zIndex: 1000,
        padding: "0 20px",
      }}
    >
      {items.map((item) => (
        <Menu.Item key={item.key}>{item.label}</Menu.Item>
      ))}

      <div style={{ marginLeft: "auto", paddingRight: "10px" }}>
        {currentUser ? (
          <>
            <span style={{ color: "white", marginRight: "10px" }}>
              Welcome, {currentUser.name}
            </span>
            <Button
              type="text"
              danger
              onClick={handleLogout}
              style={{
                color: "white",
                fontSize: "16px",
                transition: "color 0.3s ease-in-out",
                marginRight: "10px",
              }}
              onMouseEnter={(e) => (e.target.style.color = "#1890ff")}
              onMouseLeave={(e) => (e.target.style.color = "white")}
            >
              Logout
            </Button>

            {/* Wishlist Button (Logged In) */}
            <Button
              color="danger"
              variant="link"
              icon={<HeartOutlined />}
              style={{ marginLeft: "15px" }}
              onClick={() => setIsWishlistOpen(true)}
            >
              Wishlist
            </Button>
            <Button
                color="cyan"
                variant="link"
                icon={<ShoppingCartOutlined />}
                style={{ marginRight: "15px" }}
                onClick={() => setIsCartOpen(true)}
              >
                
              </Button>

            {/* Wishlist Modal */}
            <WishlistModal visible={isWishlistOpen} onClose={() => setIsWishlistOpen(false)} />
            <CartModal visible={isCartOpen} onClose={()=> setIsCartOpen(false)}/>
          </>
        ) : (
          <>
            {/* Wishlist Popconfirm (For Not Logged-in Users) */}
            <Popconfirm
              title="You need to log in to access your wishlist. Do you want to log in now?"
              onConfirm={() => navigate("/login")}
              onCancel={() => { }}
              okText="Yes"
              cancelText="No"
            >
              <Button
                color="danger"
                variant="link"
                icon={<HeartOutlined />}
                style={{ marginRight: "15px" }}
              >
                Wishlist
              </Button>
            </Popconfirm>

              <Button
                color="danger"
                variant="link"
                icon={<ShoppingCartOutlined />}
                style={{ marginRight: "15px" }}
              >
                Cart
              </Button>
            <Button
              type="text"
              style={{
                color: "white",
                fontSize: "16px",
                transition: "color 0.3s ease-in-out",
                marginRight: "10px",
              }}
              onMouseEnter={(e) => (e.target.style.color = "#1890ff")}
              onMouseLeave={(e) => (e.target.style.color = "white")}
              onClick={() => navigate("/login")}
            >
              Login
            </Button>

            <Button
              type="text"
              style={{
                color: "white",
                fontSize: "16px",
                transition: "color 0.3s ease-in-out",
              }}
              onMouseEnter={(e) => (e.target.style.color = "#1890ff")}
              onMouseLeave={(e) => (e.target.style.color = "white")}
              onClick={() => navigate("/register")}
            >
              Register
            </Button>
          </>
        )}
      </div>
    </Menu>
  );
};

export default Navbar;

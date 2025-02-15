import React, { useState } from "react";
import { Menu, Button, Drawer } from "antd";
import { MenuOutlined, HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";
import WishlistModal from "./WishList";
import CartModal from "./CartModal";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const items = [
    { key: "home", label: "Home", path: "/" },
    ...(currentUser?.role === "admin" ? [{ key: "admin", label: "Admin", path: "/admin" }] : []),
  ];

  const handleLogout = () => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    let users = JSON.parse(localStorage.getItem("users")) || [];

    if (currentUser) {
      users = users.map(user => (user.email === currentUser.email ? currentUser : user));
      localStorage.setItem("users", JSON.stringify(users));
    }

    localStorage.removeItem("currentUser");
    navigate("/login", { replace: true });
  };

  return (
    <>
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
        {/* Menu Items (Hidden on Small Screens) */}
        <div className="menu-items" style={{ display: "flex" }}>
          {items.map(item => (
            <Menu.Item key={item.key}>{item.label}</Menu.Item>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <Button
          type="text"
          icon={<MenuOutlined />}
          onClick={() => setDrawerOpen(true)}
          style={{ display: "none", color: "white" }}
          className="menu-toggle"
        />

        <div style={{ marginLeft: "auto", paddingRight: "10px", display: "flex", alignItems: "center" }}>
          {currentUser ? (
            <>
              <span style={{ color: "white", marginRight: "10px" }}>
                Welcome, {currentUser.name}
              </span>
              <Button
                type="text"
                danger
                onClick={handleLogout}
                style={{ color: "white", fontSize: "16px", marginRight: "10px" }}
              >
                Logout
              </Button>

              {/* Wishlist Button */}
              <Button
                type="text"
                icon={<HeartOutlined />}
                style={{ color: "white", fontSize: "18px", marginRight: "15px" }}
                onClick={() => setIsWishlistOpen(true)}
              />

              {/* Cart Button */}
              <Button
                type="text"
                icon={<ShoppingCartOutlined />}
                style={{ color: "white", fontSize: "18px", marginRight: "15px" }}
                onClick={() => setIsCartOpen(true)}
              />
            </>
          ) : (
            <>
              <Button
                type="text"
                icon={<HeartOutlined />}
                style={{ color: "white", fontSize: "18px", marginRight: "15px" }}
                onClick={() => navigate("/login")}
              />

              <Button
                type="text"
                icon={<ShoppingCartOutlined />}
                style={{ color: "white", fontSize: "18px", marginRight: "15px" }}
                onClick={() => navigate("/login")}
              />

              <Button
                type="text"
                style={{ color: "white", fontSize: "16px", marginRight: "10px" }}
                onClick={() => navigate("/login")}
              >
                Login
              </Button>

              <Button
                type="text"
                style={{ color: "white", fontSize: "16px" }}
                onClick={() => navigate("/register")}
              >
                Register
              </Button>
            </>
          )}
        </div>
      </Menu>

      {/* Wishlist Modal */}
      <WishlistModal visible={isWishlistOpen} onClose={() => setIsWishlistOpen(false)} />
      <CartModal visible={isCartOpen} onClose={() => setIsCartOpen(false)} />

      {/* Drawer for Collapsible Menu */}
      <Drawer
        title="Menu"
        placement="right"
        closable
        onClose={() => setDrawerOpen(false)}
        open={drawerOpen}
      >
        {items.map(item => (
          <Button key={item.key} type="text" block onClick={() => navigate(item.path)}>
            {item.label}
          </Button>
        ))}

        {currentUser ? (
          <>
            <Button type="text" danger block onClick={handleLogout}>
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button type="text" block onClick={() => navigate("/login")}>
              Login
            </Button>
            <Button type="text" block onClick={() => navigate("/register")}>
              Register
            </Button>
          </>
        )}
      </Drawer>

      {/* Responsive Styles */}
      <style>
        {`
          @media (max-width: 768px) {
            .menu-items {
              display: none;
            }
            .menu-toggle {
              display: block !important;
            }
          }
        `}
      </style>
    </>
  );
};

export default Navbar;

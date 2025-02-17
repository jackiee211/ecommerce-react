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
    localStorage.removeItem("currentUser");
    navigate("/login", { replace: true });
  };

  return (
    <>
      {/* Navbar for Large Screens */}
      <Menu
        theme="dark"
        mode="horizontal"
        selectedKeys={[location.pathname]}
        onClick={({ key }) => {
          const item = items.find(i => i.key === key);
          if (item) navigate(item.path);
        }}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "fixed",
          width: "100%",
          top: 0,
          zIndex: 1000,
          padding: "0 20px",
        }}
      >        
      {items.map(item => (
          <Menu.Item key={item.key}>{item.label}</Menu.Item>
        ))}

        {/* Right Side Icons */}
        <div style={{ marginLeft: "auto", paddingRight: "10px", display: "flex", alignItems: "center" }}>
          {currentUser ? (
            <>
              <span style={{ color: "white", marginRight: "10px" }}>
                Welcome, <span style={{color:"#1677FF"}}>{currentUser.name} !</span >
              </span>
              <Button type="text" danger onClick={handleLogout} style={{ color: "white", marginRight: "10px" }}>
                Logout
              </Button>
              <Button type="text" icon={<HeartOutlined />} style={{ color: "white", fontSize: "18px" }} onClick={() => setIsWishlistOpen(true)} />
              <Button type="text" icon={<ShoppingCartOutlined />} style={{ color: "white", fontSize: "18px" }} onClick={() => setIsCartOpen(true)} />
            </>
          ) : (
            <>
              <Button type="text" onClick={() => navigate("/login")} style={{ color: "white", marginRight: "10px" }}>
                Login
              </Button>
              <Button type="text" onClick={() => navigate("/register")} style={{ color: "white" }}>
                Register
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <Button
          type="text"
          icon={<MenuOutlined />}
          onClick={() => setDrawerOpen(true)}
          style={{ display: "none", color: "white" }}
          className="menu-toggle"
        />
      </Menu>

      {/* Mobile Drawer Menu */}
      <Drawer
        title="Menu"
        placement="right"
        closable
        onClose={() => setDrawerOpen(false)}
        open={drawerOpen}
      >
        {items.map(item => (
          <Button
            key={item.key}
            type="text"
            block
            onClick={() => {
              navigate(item.path);
              setDrawerOpen(false); // Close drawer after click
            }}
          >
            {item.label}
          </Button>
        ))}

        {currentUser ? (
          <Button type="text" danger block onClick={handleLogout}>
            Logout
          </Button>
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

      {/* Wishlist & Cart Modals */}
      <WishlistModal visible={isWishlistOpen} onClose={() => setIsWishlistOpen(false)} />
      <CartModal visible={isCartOpen} onClose={() => setIsCartOpen(false)} />

      {/* Responsive Styles */}
      <style>
        {`
          @media (max-width: 768px) {
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

import React, { useEffect, useState } from "react";
import { Menu, Button, Drawer } from "antd";
import { MenuOutlined, HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";
import WishlistModal from "./WishList";
import CartModal from "./CartModal";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const updateUser = () => {
      const user = JSON.parse(localStorage.getItem("currentUser"));
      setCurrentUser(user);
    };
  
    // Run once when component mounts
    updateUser();
  
    // Listen for storage updates
    window.addEventListener("storage", updateUser);
    return () => window.removeEventListener("storage", updateUser);
  }, []);
 

const cardItems= currentUser?.cart || []; 
const wishlistItems= currentUser?.wishlist || [];

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
        <div className="menu-items" style={{ display: "flex" }}>
          {items.map((item) => (
            <Menu.Item key={item.key} onClick={() => navigate(item.path)}>
              {item.label}
            </Menu.Item>
          ))}
          {currentUser && (
            <Menu.Item key="logout" onClick={handleLogout}>
              Logout
            </Menu.Item>
          )}
        </div>

        <Button
          type="text"
          icon={<MenuOutlined />}
          onClick={() => setDrawerOpen(true)}
          className="menu-toggle"
        />

        <div style={{ marginLeft: "auto", paddingRight: "10px", display: "flex", alignItems: "center" }}>
          {currentUser ? (
            <>
              <Button type="text" icon={<HeartOutlined />} style={{ color: "white", fontSize: "18px", marginRight: "5px" }} onClick={() => setIsWishlistOpen(true)} />
              <span style={{ color: "white", fontSize: "16px", marginRight: "15px" }}>{wishlistItems.length}</span>
              <Button type="text" icon={<ShoppingCartOutlined />} style={{ color: "white", fontSize: "18px", marginRight: "5px" }} onClick={() => setIsCartOpen(true)} />
              <span style={{ color: "white", fontSize: "16px", marginRight: "15px" }}>{cardItems.length}</span>
            </>
          ) : (
            <>
              <Button type="text" icon={<HeartOutlined />} style={{ color: "white", fontSize: "18px", marginRight: "15px" }} onClick={() => navigate("/login")} />
              <Button type="text" icon={<ShoppingCartOutlined />} style={{ color: "white", fontSize: "18px", marginRight: "15px" }} onClick={() => navigate("/login")} />
              <Button type="text" style={{ color: "white", fontSize: "16px", marginRight: "10px" }} onClick={() => navigate("/login")}>
                Login
              </Button>
              <Button type="text" style={{ color: "white", fontSize: "16px" }} onClick={() => navigate("/register")}>
                Register
              </Button>
            </>
          )}
        </div>
      </Menu>

      <Drawer title="Menu" placement="right" closable onClose={() => setDrawerOpen(false)} open={drawerOpen}>
        {items.map((item) => (
          <Button key={item.key} type="text" block onClick={() => navigate(item.path)}>
            {item.label}
          </Button>
        ))}
        {currentUser ? (
          <div>
            <Button type="text" danger block onClick={handleLogout}>
              Logout
            </Button>
            <Button type="text" danger block onClick={handleLogout}>
              Logout
            </Button>
          </div>
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

      <WishlistModal visible={isWishlistOpen} onClose={() => setIsWishlistOpen(false)} />
      <CartModal visible={isCartOpen} onClose={() => setIsCartOpen(false)} />

      <style>
        {`
          @media (max-width: 768px) {
            .menu-items {
              display: none !important; /* Hide Home, Admin, and Logout on Mobile */
            }
            .menu-toggle {
              display: block !important;
              color: white;
              /* Show Mobile Menu Button */
            }
          }
          @media (min-width: 768px) {
            .menu-items {
              display: block !important; /* Hide Home, Admin, and Logout on Mobile */
            }
            .menu-toggle {
              display: none !important;
              
            }
          }
        `}
      </style>
    </>
  );
};

export default Navbar;

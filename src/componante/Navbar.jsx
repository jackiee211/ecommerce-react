import React from "react";
import { Menu, Button } from "antd";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const items = [
    { key: "home", label: "Home", path: "/" },
    ...(currentUser?.role === "admin" ? [{ key: "admin", label: "Admin", path: "Admin" }] : []),
  ];

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/login", { replace: true });
  };

  return (
    <Menu
      theme="dark"
      mode="horizontal"
      selectedKeys={[location.pathname]}
      onClick={({ key }) => {
        const item = items.find((i) => i.key === key);
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
        <Menu.Item key={item.path}>{item.label}</Menu.Item>
      ))}

      <div style={{ marginLeft: "auto", paddingRight: "10px" }}>
        {currentUser ? (
        <>
          <span style={{ color: "white", marginRight: "10px" }}>
            Welcome, {currentUser.name}
          </span>
          <Button type="text" danger onClick={handleLogout}


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
          </>
     
        ) : (
          <>
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

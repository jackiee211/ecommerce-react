import React from "react";
import { Menu, Button } from "antd";
import { HeartOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import WishlistModal from "./WishList";

const items = [
  { key: "1", label: "Home", path: "/" },
  { key: "2", label: "Admin", path: "/admin" },
];

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: "#001529",
        padding: "",
        position: "fixed",
        top: 0,
        width: "100%",
        zIndex: 1000,
      }}
    >
      {/* Left Side - Menu */}
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={["1"]}
        onClick={({ key }) => {
          const item = items.find((i) => i.key === key);
          if (item) navigate(item.path);
        }}
        items={items}
        style={{
          flex: 1,
          background: "transparent",
          borderBottom: "none",
        }}
      />

      {/* Right Side - Wishlist Button */}
      <WishlistModal>
        <Button
          type="primary"
          icon={<HeartOutlined />}
          style={{
            marginRight: "15px",
          }}
        >
          Wishlist
        </Button>
      </WishlistModal>
    </div>
  );
};

export default Navbar;

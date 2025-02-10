import React from "react";
import { Menu } from "antd";
import { useNavigate } from "react-router-dom";

const items = [
  { key: "1", label: "Home", path: "/" },
  { key: "2", label: "Admin", path: "/admin" },
];

const Navbar = () => {
  const navigate = useNavigate();

  return (
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
        width: "100%",
        position: "fixed",
        top: 0,
        zIndex: 1000,
      }}
    />
  );
};

export default Navbar;

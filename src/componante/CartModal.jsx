import React, { useState, useEffect } from "react";
import { Modal, List, Button, message } from "antd";

const CartModal = ({ visible, onClose }) => {
  const [cart, setCart] = useState([]);

  // Function to load wishlist
  const loadCart = () => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser?.cart) {
      setCart(currentUser.cart);
    } else {
      setCart([]);
    }
  };

  useEffect(() => {
    if (visible) {
      loadCart();
    }

    const handleStorageChange = () => {
      loadCart();
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [visible]);

  const removeFromCart = (itemId) => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser) return;

    const updatedCart = currentUser.cart.filter(item => item.id !== itemId);
    currentUser.cart = updatedCart;

    localStorage.setItem("currentUser", JSON.stringify(currentUser));

    window.dispatchEvent(new Event("storage"));

    setCart(updatedCart);
    message.success("Item removed from Cart");
  };

  return (
    <Modal
      title="Your Cart"
      open={visible}
      onCancel={onClose}
      footer={null}
      destroyOnClose
    >
      {cart.length === 0 ? (
        <p>Your Cart is empty.</p>
      ) : (
        <List
          dataSource={cart}
          renderItem={(item) => (
            <List.Item
              actions={[
                <Button danger onClick={() => removeFromCart(item.id)}>Remove</Button>
              ]}
            >
              <span>{item.title || "Unknown Product"}</span>
            </List.Item>
          )}
        />
      )}
    </Modal>
  );
};

export default CartModal;
